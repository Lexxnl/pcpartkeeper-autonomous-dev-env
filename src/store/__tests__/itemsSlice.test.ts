/**
 * @file Items Slice Tests
 * @description Comprehensive unit tests for the items Redux slice
 * @version 2.0
 * @author PCPartKeeper Team
 */

import { configureStore } from '@reduxjs/toolkit';
import itemsSlice, { 
  addItem, 
  updateItem, 
  deleteItem, 
  setItems, 
  setLoading, 
  setError,
  clearError,
  searchItems,
  filterItems,
  sortItems,
  selectItem,
  selectAllItems,
  clearSelection,
  bulkDeleteItems,
  setPagination,
  setSorting,
  setFiltering
} from '../slices/itemsSlice';
import { Item } from '../types';

// Mock store for testing
const createMockStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      items: itemsSlice.reducer,
    },
    preloadedState,
  });
};

// Mock data
const mockItems: Item[] = [
  {
    id: 1,
    name: 'Intel Core i7-13700K',
    category: 'CPU',
    brand: 'Intel',
    price: 399.99,
    quantity: 1,
    rating: 4.5,
    dateAdded: '2024-01-15',
    inStock: true,
  },
  {
    id: 2,
    name: 'NVIDIA RTX 4080',
    category: 'GPU',
    brand: 'NVIDIA',
    price: 1199.99,
    quantity: 2,
    rating: 4.8,
    dateAdded: '2024-01-16',
    inStock: true,
  },
  {
    id: 3,
    name: 'Corsair Vengeance 32GB',
    category: 'RAM',
    brand: 'Corsair',
    price: 149.99,
    quantity: 0,
    rating: 4.2,
    dateAdded: '2024-01-17',
    inStock: false,
  },
];

describe('Items Slice', () => {
  describe('Initial State', () => {
    it('has correct initial state', () => {
      const store = createMockStore();
      const state = store.getState().items;

      expect(state).toEqual({
        items: [],
        loading: false,
        error: null,
        searchTerm: '',
        filters: {
          category: '',
          brand: '',
          inStock: null,
          priceRange: { min: 0, max: 10000 },
        },
        sorting: {
          field: 'name',
          direction: 'asc',
        },
        pagination: {
          page: 1,
          pageSize: 10,
          total: 0,
        },
        selectedItems: [],
        selectedAll: false,
      });
    });
  });

  describe('Basic CRUD Operations', () => {
    it('adds item correctly', () => {
      const store = createMockStore();
      const newItem: Item = {
        id: 4,
        name: 'Samsung 980 PRO 1TB',
        category: 'Storage',
        brand: 'Samsung',
        price: 199.99,
        quantity: 5,
        rating: 4.7,
        dateAdded: '2024-01-18',
        inStock: true,
      };

      store.dispatch(addItem(newItem));
      const state = store.getState().items;

      expect(state.items).toHaveLength(1);
      expect(state.items[0]).toEqual(newItem);
    });

    it('updates item correctly', () => {
      const store = createMockStore({
        items: { items: mockItems, loading: false, error: null, searchTerm: '', filters: { category: '', brand: '', inStock: null, priceRange: { min: 0, max: 10000 } }, sorting: { field: 'name', direction: 'asc' }, pagination: { page: 1, pageSize: 10, total: 0 }, selectedItems: [], selectedAll: false }
      });

      const updatedItem = { ...mockItems[0], name: 'Intel Core i7-13700KF' };
      store.dispatch(updateItem(updatedItem));
      const state = store.getState().items;

      expect(state.items[0].name).toBe('Intel Core i7-13700KF');
    });

    it('deletes item correctly', () => {
      const store = createMockStore({
        items: { items: mockItems, loading: false, error: null, searchTerm: '', filters: { category: '', brand: '', inStock: null, priceRange: { min: 0, max: 10000 } }, sorting: { field: 'name', direction: 'asc' }, pagination: { page: 1, pageSize: 10, total: 0 }, selectedItems: [], selectedAll: false }
      });

      store.dispatch(deleteItem(1));
      const state = store.getState().items;

      expect(state.items).toHaveLength(2);
      expect(state.items.find(item => item.id === 1)).toBeUndefined();
    });

    it('sets items correctly', () => {
      const store = createMockStore();
      
      store.dispatch(setItems(mockItems));
      const state = store.getState().items;

      expect(state.items).toEqual(mockItems);
      expect(state.items).toHaveLength(3);
    });
  });

  describe('Loading and Error States', () => {
    it('sets loading state', () => {
      const store = createMockStore();
      
      store.dispatch(setLoading(true));
      let state = store.getState().items;
      expect(state.loading).toBe(true);

      store.dispatch(setLoading(false));
      state = store.getState().items;
      expect(state.loading).toBe(false);
    });

    it('sets error state', () => {
      const store = createMockStore();
      const errorMessage = 'Failed to fetch items';
      
      store.dispatch(setError(errorMessage));
      let state = store.getState().items;
      expect(state.error).toBe(errorMessage);

      store.dispatch(clearError());
      state = store.getState().items;
      expect(state.error).toBeNull();
    });
  });

  describe('Search Functionality', () => {
    it('sets search term', () => {
      const store = createMockStore();
      
      store.dispatch(searchItems('Intel'));
      const state = store.getState().items;

      expect(state.searchTerm).toBe('Intel');
    });

    it('clears search term', () => {
      const store = createMockStore({
        items: { items: mockItems, loading: false, error: null, searchTerm: 'Intel', filters: { category: '', brand: '', inStock: null, priceRange: { min: 0, max: 10000 } }, sorting: { field: 'name', direction: 'asc' }, pagination: { page: 1, pageSize: 10, total: 0 }, selectedItems: [], selectedAll: false }
      });
      
      store.dispatch(searchItems(''));
      const state = store.getState().items;

      expect(state.searchTerm).toBe('');
    });
  });

  describe('Filtering Functionality', () => {
    it('sets category filter', () => {
      const store = createMockStore();
      
      store.dispatch(filterItems({ category: 'CPU' }));
      const state = store.getState().items;

      expect(state.filters.category).toBe('CPU');
    });

    it('sets brand filter', () => {
      const store = createMockStore();
      
      store.dispatch(filterItems({ brand: 'Intel' }));
      const state = store.getState().items;

      expect(state.filters.brand).toBe('Intel');
    });

    it('sets inStock filter', () => {
      const store = createMockStore();
      
      store.dispatch(filterItems({ inStock: true }));
      const state = store.getState().items;

      expect(state.filters.inStock).toBe(true);
    });

    it('sets price range filter', () => {
      const store = createMockStore();
      
      store.dispatch(filterItems({ priceRange: { min: 100, max: 500 } }));
      const state = store.getState().items;

      expect(state.filters.priceRange).toEqual({ min: 100, max: 500 });
    });

    it('clears all filters', () => {
      const store = createMockStore({
        items: { 
          items: mockItems, 
          loading: false, 
          error: null, 
          searchTerm: '', 
          filters: { category: 'CPU', brand: 'Intel', inStock: true, priceRange: { min: 100, max: 500 } }, 
          sorting: { field: 'name', direction: 'asc' }, 
          pagination: { page: 1, pageSize: 10, total: 0 }, 
          selectedItems: [], 
          selectedAll: false 
        }
      });
      
      store.dispatch(filterItems({}));
      const state = store.getState().items;

      expect(state.filters).toEqual({
        category: '',
        brand: '',
        inStock: null,
        priceRange: { min: 0, max: 10000 },
      });
    });
  });

  describe('Sorting Functionality', () => {
    it('sets sorting field and direction', () => {
      const store = createMockStore();
      
      store.dispatch(sortItems({ field: 'price', direction: 'desc' }));
      const state = store.getState().items;

      expect(state.sorting.field).toBe('price');
      expect(state.sorting.direction).toBe('desc');
    });

    it('toggles sort direction when same field is selected', () => {
      const store = createMockStore({
        items: { items: mockItems, loading: false, error: null, searchTerm: '', filters: { category: '', brand: '', inStock: null, priceRange: { min: 0, max: 10000 } }, sorting: { field: 'name', direction: 'asc' }, pagination: { page: 1, pageSize: 10, total: 0 }, selectedItems: [], selectedAll: false }
      });
      
      store.dispatch(sortItems({ field: 'name', direction: 'asc' }));
      let state = store.getState().items;
      expect(state.sorting.direction).toBe('asc');

      store.dispatch(sortItems({ field: 'name', direction: 'desc' }));
      state = store.getState().items;
      expect(state.sorting.direction).toBe('desc');
    });
  });

  describe('Selection Functionality', () => {
    it('selects single item', () => {
      const store = createMockStore({
        items: { items: mockItems, loading: false, error: null, searchTerm: '', filters: { category: '', brand: '', inStock: null, priceRange: { min: 0, max: 10000 } }, sorting: { field: 'name', direction: 'asc' }, pagination: { page: 1, pageSize: 10, total: 0 }, selectedItems: [], selectedAll: false }
      });
      
      store.dispatch(selectItem(1));
      const state = store.getState().items;

      expect(state.selectedItems).toContain(1);
      expect(state.selectedAll).toBe(false);
    });

    it('deselects item when already selected', () => {
      const store = createMockStore({
        items: { items: mockItems, loading: false, error: null, searchTerm: '', filters: { category: '', brand: '', inStock: null, priceRange: { min: 0, max: 10000 } }, sorting: { field: 'name', direction: 'asc' }, pagination: { page: 1, pageSize: 10, total: 0 }, selectedItems: [1], selectedAll: false }
      });
      
      store.dispatch(selectItem(1));
      const state = store.getState().items;

      expect(state.selectedItems).not.toContain(1);
    });

    it('selects all items', () => {
      const store = createMockStore({
        items: { items: mockItems, loading: false, error: null, searchTerm: '', filters: { category: '', brand: '', inStock: null, priceRange: { min: 0, max: 10000 } }, sorting: { field: 'name', direction: 'asc' }, pagination: { page: 1, pageSize: 10, total: 0 }, selectedItems: [], selectedAll: false }
      });
      
      store.dispatch(selectAllItems());
      const state = store.getState().items;

      expect(state.selectedItems).toEqual([1, 2, 3]);
      expect(state.selectedAll).toBe(true);
    });

    it('clears selection', () => {
      const store = createMockStore({
        items: { items: mockItems, loading: false, error: null, searchTerm: '', filters: { category: '', brand: '', inStock: null, priceRange: { min: 0, max: 10000 } }, sorting: { field: 'name', direction: 'asc' }, pagination: { page: 1, pageSize: 10, total: 0 }, selectedItems: [1, 2], selectedAll: false }
      });
      
      store.dispatch(clearSelection());
      const state = store.getState().items;

      expect(state.selectedItems).toEqual([]);
      expect(state.selectedAll).toBe(false);
    });
  });

  describe('Bulk Operations', () => {
    it('deletes multiple items', () => {
      const store = createMockStore({
        items: { items: mockItems, loading: false, error: null, searchTerm: '', filters: { category: '', brand: '', inStock: null, priceRange: { min: 0, max: 10000 } }, sorting: { field: 'name', direction: 'asc' }, pagination: { page: 1, pageSize: 10, total: 0 }, selectedItems: [1, 2], selectedAll: false }
      });
      
      store.dispatch(bulkDeleteItems([1, 2]));
      const state = store.getState().items;

      expect(state.items).toHaveLength(1);
      expect(state.items[0].id).toBe(3);
      expect(state.selectedItems).toEqual([]);
    });
  });

  describe('Pagination', () => {
    it('sets pagination', () => {
      const store = createMockStore();
      
      store.dispatch(setPagination({ page: 2, pageSize: 5, total: 25 }));
      const state = store.getState().items;

      expect(state.pagination).toEqual({
        page: 2,
        pageSize: 5,
        total: 25,
      });
    });
  });

  describe('Complex State Updates', () => {
    it('handles multiple state updates in sequence', () => {
      const store = createMockStore();
      
      // Add items
      store.dispatch(setItems(mockItems));
      
      // Set search and filters
      store.dispatch(searchItems('Intel'));
      store.dispatch(filterItems({ category: 'CPU' }));
      
      // Set sorting
      store.dispatch(sortItems({ field: 'price', direction: 'desc' }));
      
      // Set pagination
      store.dispatch(setPagination({ page: 1, pageSize: 10, total: 3 }));
      
      // Select items
      store.dispatch(selectItem(1));
      
      const state = store.getState().items;

      expect(state.items).toEqual(mockItems);
      expect(state.searchTerm).toBe('Intel');
      expect(state.filters.category).toBe('CPU');
      expect(state.sorting.field).toBe('price');
      expect(state.sorting.direction).toBe('desc');
      expect(state.pagination.page).toBe(1);
      expect(state.selectedItems).toContain(1);
    });

    it('handles error state with other operations', () => {
      const store = createMockStore();
      
      store.dispatch(setError('Network error'));
      store.dispatch(setLoading(true));
      store.dispatch(searchItems('test'));
      
      const state = store.getState().items;

      expect(state.error).toBe('Network error');
      expect(state.loading).toBe(true);
      expect(state.searchTerm).toBe('test');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty arrays', () => {
      const store = createMockStore();
      
      store.dispatch(setItems([]));
      const state = store.getState().items;

      expect(state.items).toEqual([]);
      expect(state.items).toHaveLength(0);
    });

    it('handles null/undefined values gracefully', () => {
      const store = createMockStore();
      
      store.dispatch(setError(null));
      store.dispatch(searchItems(''));
      store.dispatch(filterItems({}));
      
      const state = store.getState().items;

      expect(state.error).toBeNull();
      expect(state.searchTerm).toBe('');
      expect(state.filters).toEqual({
        category: '',
        brand: '',
        inStock: null,
        priceRange: { min: 0, max: 10000 },
      });
    });

    it('handles invalid item IDs', () => {
      const store = createMockStore({
        items: { items: mockItems, loading: false, error: null, searchTerm: '', filters: { category: '', brand: '', inStock: null, priceRange: { min: 0, max: 10000 } }, sorting: { field: 'name', direction: 'asc' }, pagination: { page: 1, pageSize: 10, total: 0 }, selectedItems: [], selectedAll: false }
      });
      
      store.dispatch(deleteItem(999)); // Non-existent ID
      const state = store.getState().items;

      expect(state.items).toEqual(mockItems); // No change
    });
  });

  describe('Performance', () => {
    it('handles large datasets efficiently', () => {
      const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
        id: i + 1,
        name: `Item ${i + 1}`,
        category: 'Test',
        brand: 'Brand',
        price: Math.random() * 1000,
        quantity: Math.floor(Math.random() * 10),
        rating: Math.random() * 5,
        dateAdded: '2024-01-01',
        inStock: Math.random() > 0.5,
      }));

      const store = createMockStore();
      
      const startTime = performance.now();
      store.dispatch(setItems(largeDataset));
      const endTime = performance.now();

      const state = store.getState().items;
      expect(state.items).toHaveLength(1000);
      expect(endTime - startTime).toBeLessThan(100); // Should complete within 100ms
    });
  });
});
