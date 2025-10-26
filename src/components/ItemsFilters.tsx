import React from 'react';
import FormInput from './FormInput';
import ValidatedFormInput from './ValidatedFormInput';
import { commonRules } from '../utils/validation';
import { ItemFilters } from '../store/types';

// Use the centralized type from store
export type FilterOptions = ItemFilters;

export interface ItemsFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  categories: string[];
  brands: string[];
  className?: string;
}

/**
 * ItemsFilters - Filter controls for the Items page
 *
 * Features:
 * - Category filter
 * - Brand filter
 * - Price range filter
 * - Stock status filter
 * - Rating filter
 * - Responsive layout
 * - Memoized for performance
 */
export const ItemsFilters: React.FC<ItemsFiltersProps> = React.memo(({
  filters,
  onFiltersChange,
  categories,
  brands,
  className = '',
}) => {
  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const handlePriceRangeChange = (field: 'min' | 'max', value: string) => {
    onFiltersChange({
      ...filters,
      priceRange: {
        ...filters.priceRange,
        [field]: value,
      },
    });
  };

  return (
    <div className={`space-y-4 sm:space-y-6 ${className}`} role='region' aria-label='Filter options'>
      {/* Section Header */}
      <header>
        <h3 className='text-lg sm:text-xl font-semibold text-text-primary mb-1'>
          Filters
        </h3>
        <p className='text-sm sm:text-base text-text-muted'>
          Narrow down your search results using the options below
        </p>
      </header>

      {/* 
        RESPONSIVE GRID: Mobile-first approach with progressive enhancement
        - Mobile: Single column for easy scrolling and touch interaction
        - Tablet: 2 columns for better space utilization
        - Desktop: 3 columns for optimal layout
        - Price range spans full width on all breakpoints for better UX
      */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
        {/* Category Filter */}
        <div className='space-y-2'>
          <label 
            htmlFor='category-filter'
            className='block text-sm font-medium text-text-secondary'
          >
            Category
          </label>
          <select
            id='category-filter'
            value={filters.category}
            onChange={e => handleFilterChange('category', e.target.value)}
            className='w-full px-3 py-2.5 bg-surface-secondary border border-border-default rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary transition-all duration-200'
            aria-describedby='category-help'
          >
            <option value=''>All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <p id='category-help' className='sr-only'>
            Select a category to filter items by type
          </p>
        </div>

        {/* Brand Filter */}
        <div className='space-y-2'>
          <label 
            htmlFor='brand-filter'
            className='block text-sm font-medium text-text-secondary'
          >
            Brand
          </label>
          <select
            id='brand-filter'
            value={filters.brand}
            onChange={e => handleFilterChange('brand', e.target.value)}
            className='w-full px-3 py-2.5 bg-surface-secondary border border-border-default rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary transition-all duration-200'
            aria-describedby='brand-help'
          >
            <option value=''>All Brands</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
          <p id='brand-help' className='sr-only'>
            Select a brand to filter items by manufacturer
          </p>
        </div>

        {/* Price Range Filter - Full width for better UX */}
        <div className='sm:col-span-2 lg:col-span-3 space-y-3'>
          <div>
            <label className='block text-sm font-medium text-text-secondary mb-2'>
              Price Range
            </label>
            <p className='text-xs text-text-muted mb-3'>
              Enter minimum and maximum prices to filter by cost
            </p>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
            <ValidatedFormInput
              id='price-min'
              label=''
              type='number'
              value={filters.priceRange.min}
              onChange={value => handlePriceRangeChange('min', value)}
              placeholder='Min Price ($)'
              validationRules={commonRules.positiveNumber}
              validateOnBlur={true}
              validateOnChange={false}
            />
            <ValidatedFormInput
              id='price-max'
              label=''
              type='number'
              value={filters.priceRange.max}
              onChange={value => handlePriceRangeChange('max', value)}
              placeholder='Max Price ($)'
              validationRules={commonRules.positiveNumber}
              validateOnBlur={true}
              validateOnChange={false}
            />
          </div>
        </div>

        {/* Stock Status Filter */}
        <div className='space-y-2'>
          <label 
            htmlFor='stock-filter'
            className='block text-sm font-medium text-text-secondary'
          >
            Stock Status
          </label>
          <select
            id='stock-filter'
            value={filters.inStock === null ? '' : filters.inStock.toString()}
            onChange={e => {
              const value =
                e.target.value === '' ? null : e.target.value === 'true';
              handleFilterChange('inStock', value);
            }}
            className='w-full px-3 py-2.5 bg-surface-secondary border border-border-default rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary transition-all duration-200'
            aria-describedby='stock-help'
          >
            <option value=''>All Items</option>
            <option value='true'>In Stock</option>
            <option value='false'>Out of Stock</option>
          </select>
          <p id='stock-help' className='sr-only'>
            Filter items by their current stock availability
          </p>
        </div>

        {/* Rating Filter */}
        <div className='space-y-2'>
          <label 
            htmlFor='rating-filter'
            className='block text-sm font-medium text-text-secondary'
          >
            Minimum Rating
          </label>
          <select
            id='rating-filter'
            value={filters.rating === null ? '' : filters.rating.toString()}
            onChange={e => {
              const value =
                e.target.value === '' ? null : parseInt(e.target.value);
              handleFilterChange('rating', value);
            }}
            className='w-full px-3 py-2.5 bg-surface-secondary border border-border-default rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary transition-all duration-200'
            aria-describedby='rating-help'
          >
            <option value=''>All Ratings</option>
            <option value='5'>5 Stars</option>
            <option value='4'>4+ Stars</option>
            <option value='3'>3+ Stars</option>
            <option value='2'>2+ Stars</option>
            <option value='1'>1+ Stars</option>
          </select>
          <p id='rating-help' className='sr-only'>
            Filter items by their minimum star rating
          </p>
        </div>

        {/* Clear Filters Button - Full width for better accessibility */}
        <div className='sm:col-span-2 lg:col-span-3 pt-2'>
          <button
            onClick={() =>
              onFiltersChange({
                category: '',
                brand: '',
                priceRange: { min: '', max: '' },
                inStock: null,
                rating: null,
              })
            }
            className='w-full sm:w-auto px-6 py-3 text-sm sm:text-base bg-surface-tertiary text-text-secondary rounded-lg hover:bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-surface-page transition-all duration-200 font-medium'
            aria-label='Clear all active filters and reset to default state'
          >
            <span className='flex items-center justify-center gap-2'>
              <span aria-hidden='true'>↻</span>
              Clear All Filters
            </span>
          </button>
        </div>
      </div>
    </div>
  );
});

ItemsFilters.displayName = 'ItemsFilters';

export default ItemsFilters;
