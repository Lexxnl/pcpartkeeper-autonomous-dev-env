/**
 * Mock Data - Centralized data source
 * 
 * This file contains all mock data for the application, serving as a single
 * source of truth for development and testing purposes.
 */

import { Item } from '../store/types';

// ============================================================================
// MOCK DATA GENERATION
// ============================================================================

/**
 * Generate mock items for development and testing
 */
export const generateMockItems = (): Item[] => {
  const categories = [
    'CPU',
    'GPU',
    'RAM',
    'Storage',
    'Motherboard',
    'PSU',
    'Cooling',
    'Case',
    'Monitor',
    'Keyboard',
    'Mouse',
  ];
  
  const brands = [
    'Intel',
    'AMD',
    'NVIDIA',
    'Corsair',
    'Samsung',
    'ASUS',
    'MSI',
    'Gigabyte',
    'EVGA',
    'Cooler Master',
    'Fractal Design',
    'NZXT',
    'Logitech',
    'Razer',
    'SteelSeries',
  ];

  return Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `${brands[i % brands.length]} ${categories[i % categories.length]} ${i + 1}`,
    category: categories[i % categories.length],
    brand: brands[i % brands.length],
    price: Math.floor(Math.random() * 2000) + 50,
    quantity: Math.floor(Math.random() * 10) + 1,
    inStock: Math.random() > 0.2,
    dateAdded: new Date(2024, 0, i + 1).toISOString().split('T')[0],
    rating: Math.floor(Math.random() * 5) + 1,
  }));
};

// ============================================================================
// EXPORTED MOCK DATA
// ============================================================================

/**
 * Pre-generated mock items for consistent testing
 */
export const MOCK_ITEMS: Item[] = generateMockItems();

/**
 * Default filter options
 */
export const DEFAULT_FILTERS = {
  category: '',
  brand: '',
  priceRange: { min: '', max: '' },
  inStock: null,
  rating: null,
  searchTerm: '',
};

/**
 * Column definitions for DataTable
 */
export const ITEM_COLUMNS = [
  {
    key: 'name',
    header: 'Product Name',
    field: 'name',
    sortable: true,
    width: 'grow',
    minWidth: '200px',
  },
  {
    key: 'category',
    header: 'Category',
    field: 'category',
    sortable: true,
    width: 'auto',
  },
  {
    key: 'brand',
    header: 'Brand',
    field: 'brand',
    sortable: true,
    width: 'auto',
  },
  {
    key: 'price',
    header: 'Price',
    field: 'price',
    sortable: true,
    align: 'end',
    width: 'auto',
    render: (item: Item) => `$${item.price.toFixed(2)}`,
  },
  {
    key: 'quantity',
    header: 'Stock',
    field: 'quantity',
    sortable: true,
    align: 'center',
    width: 'auto',
    render: (item: Item) => `Stock: ${item.quantity}`,
  },
  {
    key: 'inStock',
    header: 'Available',
    field: 'inStock',
    sortable: true,
    align: 'center',
    width: 'auto',
    render: (item: Item) => item.inStock ? '✓ Available' : '✗ Out of Stock',
  },
  {
    key: 'rating',
    header: 'Rating',
    field: 'rating',
    sortable: true,
    align: 'center',
    width: 'auto',
    render: (item: Item) =>
      '★'.repeat(item.rating) + '☆'.repeat(5 - item.rating),
  },
  {
    key: 'dateAdded',
    header: 'Date Added',
    field: 'dateAdded',
    sortable: true,
    width: 'auto',
  },
];
