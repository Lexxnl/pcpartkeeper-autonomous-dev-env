/**
 * Items Store Slice
 *
 * Manages PC parts inventory state including CRUD operations,
 * filtering, sorting, and data persistence.
 */

import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import {
  Item,
  ItemsSlice,
  CreateItemRequest,
  UpdateItemRequest,
  ItemFilters,
  SortConfig,
} from '../types';
import { apiService } from '../../services/apiService';
import { logger } from '../../utils/logger';

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialFilters: ItemFilters = {
  category: '',
  brand: '',
  priceRange: { min: '', max: '' },
  inStock: null,
  rating: null,
  searchTerm: '',
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Filter items based on current filter configuration
 */
const filterItems = (items: Item[], filters: ItemFilters): Item[] => {
  return items.filter(item => {
    // Search term filter
    const matchesSearch =
      filters.searchTerm === '' ||
      item.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(filters.searchTerm.toLowerCase());

    // Category filter
    const matchesCategory =
      filters.category === '' || item.category === filters.category;

    // Brand filter
    const matchesBrand = filters.brand === '' || item.brand === filters.brand;

    // Price range filter
    const matchesPriceRange = (() => {
      if (filters.priceRange.min === '' && filters.priceRange.max === '')
        return true;
      const minPrice =
        filters.priceRange.min === '' ? 0 : parseFloat(filters.priceRange.min);
      const maxPrice =
        filters.priceRange.max === ''
          ? Infinity
          : parseFloat(filters.priceRange.max);
      return item.price >= minPrice && item.price <= maxPrice;
    })();

    // Stock status filter
    const matchesStock =
      filters.inStock === null || item.inStock === filters.inStock;

    // Rating filter
    const matchesRating =
      filters.rating === null || item.rating >= filters.rating;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesBrand &&
      matchesPriceRange &&
      matchesStock &&
      matchesRating
    );
  });
};

/**
 * Sort items based on sort configuration
 */
const sortItems = (items: Item[], sortConfig: SortConfig | null): Item[] => {
  if (!sortConfig) return items;

  return [...items].sort((a, b) => {
    const aValue = a[sortConfig.field as keyof Item];
    const bValue = b[sortConfig.field as keyof Item];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortConfig.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }

    if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
      return sortConfig.direction === 'asc'
        ? aValue === bValue
          ? 0
          : aValue
            ? 1
            : -1
        : aValue === bValue
          ? 0
          : aValue
            ? -1
            : 1;
    }

    return 0;
  });
};

// ============================================================================
// STORE SLICE
// ============================================================================

export const useItemsStore = create<ItemsSlice>()(
  devtools(
    subscribeWithSelector((set, get) => ({
      // ====================================================================
      // STATE
      // ====================================================================

      items: [],
      filters: initialFilters,
      sortConfig: null,

      // ====================================================================
      // ACTIONS
      // ====================================================================

      setItems: (items: Item[]) => {
        set({ items });
      },

      addItem: async (itemData: CreateItemRequest, signal?: AbortSignal) => {
        try {
          const newItem = await apiService.items.create(itemData, signal);
          set(state => ({
            ...state,
            items: [...state.items, newItem],
          }));
        } catch (error) {
          if (error.name === 'AbortError') {
            throw error;
          }
          logger.error('Failed to add item:', error);
          throw error;
        }
      },

      updateItem: async (itemData: UpdateItemRequest, signal?: AbortSignal) => {
        try {
          const updatedItem = await apiService.items.update(itemData, signal);
          set(state => ({
            ...state,
            items: state.items.map(item =>
              item.id === itemData.id ? updatedItem : item
            ),
          }));
        } catch (error) {
          if (error.name === 'AbortError') {
            throw error;
          }
          logger.error('Failed to update item:', error);
          throw error;
        }
      },

      deleteItem: async (id: number, signal?: AbortSignal) => {
        try {
          await apiService.items.delete(id, signal);
          set(state => ({
            ...state,
            items: state.items.filter(item => item.id !== id),
          }));
        } catch (error) {
          if (error.name === 'AbortError') {
            throw error;
          }
          logger.error('Failed to delete item:', error);
          throw error;
        }
      },

      deleteItems: async (ids: number[], signal?: AbortSignal) => {
        try {
          await apiService.items.deleteMany(ids, signal);
          set(state => ({
            ...state,
            items: state.items.filter(item => !ids.includes(item.id)),
          }));
        } catch (error) {
          if (error.name === 'AbortError') {
            throw error;
          }
          logger.error('Failed to delete items:', error);
          throw error;
        }
      },

      setFilters: (newFilters: Partial<ItemFilters>) => {
        set(state => ({
          ...state,
          filters: { ...state.filters, ...newFilters },
        }));
      },

      setSortConfig: (config: SortConfig | null) => {
        set(state => ({
          ...state,
          sortConfig: config,
        }));
      },

      clearFilters: () => {
        set(state => ({
          ...state,
          filters: initialFilters,
        }));
      },

      // ====================================================================
      // SELECTORS
      // ====================================================================

      getFilteredItems: () => {
        const { items, filters, sortConfig } = get();
        const filtered = filterItems(items, filters);
        return sortItems(filtered, sortConfig);
      },

      getItemById: (id: number) => {
        const { items } = get();
        return items.find(item => item.id === id);
      },

      getItemsByCategory: (category: string) => {
        const { items } = get();
        return items.filter(item => item.category === category);
      },

      getItemsByBrand: (brand: string) => {
        const { items } = get();
        return items.filter(item => item.brand === brand);
      },
    })),
    {
      name: 'items-store',
      partialize: state => ({
        items: state.items,
        filters: state.filters,
        sortConfig: state.sortConfig,
      }),
    }
  )
);

// ============================================================================
// SELECTORS
// ============================================================================

export const itemsSelectors = {
  // Basic selectors
  items: (state: ItemsSlice) => state.items,
  filters: (state: ItemsSlice) => state.filters,
  sortConfig: (state: ItemsSlice) => state.sortConfig,

  // Computed selectors
  filteredItems: (state: ItemsSlice) => state.getFilteredItems(),
  totalItems: (state: ItemsSlice) => state.items.length,
  filteredCount: (state: ItemsSlice) => state.getFilteredItems().length,

  // Category and brand selectors
  categories: (state: ItemsSlice) =>
    Array.from(new Set(state.items.map(item => item.category))).sort(),
  brands: (state: ItemsSlice) =>
    Array.from(new Set(state.items.map(item => item.brand))).sort(),

  // Filter state selectors
  hasActiveFilters: (state: ItemsSlice) => {
    const { filters } = state;
    return (
      filters.category !== '' ||
      filters.brand !== '' ||
      filters.priceRange.min !== '' ||
      filters.priceRange.max !== '' ||
      filters.inStock !== null ||
      filters.rating !== null ||
      filters.searchTerm !== ''
    );
  },

  // Item lookup selectors
  getItemById: (state: ItemsSlice) => (id: number) => state.getItemById(id),
  getItemsByCategory: (state: ItemsSlice) => (category: string) =>
    state.getItemsByCategory(category),
  getItemsByBrand: (state: ItemsSlice) => (brand: string) =>
    state.getItemsByBrand(brand),
};
