import React from 'react';
import SearchBar from './SearchBar';
import AddItemButton from './AddItemButton';
import Button from './Button';
import { LoadingSpinner } from './LoadingSpinner';

export interface ItemsHeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSearch: (term: string) => void;
  onAddItem: () => void;
  filteredCount: number;
  selectedCount: number;
  onBulkDelete: () => void;
  isBulkDeleting?: boolean;
}

/**
 * ItemsHeader - Header section for the Items page
 *
 * Features:
 * - Search functionality
 * - Add item button
 * - Bulk actions
 * - Item count display
 * - Responsive layout
 * - Memoized for performance
 */
export const ItemsHeader: React.FC<ItemsHeaderProps> = React.memo(({
  searchTerm,
  onSearchChange,
  onSearch,
  onAddItem,
  filteredCount,
  selectedCount,
  onBulkDelete,
  isBulkDeleting = false,
}) => {
  return (
    <div className='space-y-4 sm:space-y-6' role='search' aria-label='Search and filter inventory items'>
      {/* 
        RESPONSIVE LAYOUT: Mobile-first approach with proper stacking
        - Mobile: Stacked layout for better touch interaction
        - Tablet+: Horizontal layout for better space utilization
        - Search takes priority on mobile, actions on desktop
      */}
      <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 items-stretch sm:items-center justify-between'>
        {/* Search Section - Responsive width with proper focus management */}
        <div className='flex-1 min-w-0 sm:max-w-md lg:max-w-lg'>
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            onSearch={onSearch}
          />
        </div>

        {/* Actions Section - Responsive button layout */}
        <div className='flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center'>
          {/* Bulk Actions - Only show when items are selected */}
          {selectedCount > 0 && (
            <Button
              variant='danger'
              onClick={onBulkDelete}
              disabled={isBulkDeleting}
              loading={isBulkDeleting}
              className='w-full sm:w-auto whitespace-nowrap'
              aria-label={`Delete ${selectedCount} selected item${selectedCount === 1 ? '' : 's'}`}
            >
              <span className='flex items-center gap-2'>
                {isBulkDeleting ? (
                  <>
                    <LoadingSpinner size='small' />
                    <span className='text-sm sm:text-base'>Deleting...</span>
                  </>
                ) : (
                  <>
                    <span className='text-sm sm:text-base'>Delete Selected</span>
                    <span className='bg-action-danger-hover text-white px-2 py-0.5 rounded-full text-xs font-medium'>
                      {selectedCount}
                    </span>
                  </>
                )}
              </span>
            </Button>
          )}
          
          {/* Add Item Button - Always visible */}
          <AddItemButton onAddItem={onAddItem} />
        </div>
      </div>

      {/* Results Summary - Accessible status information */}
      <div 
        className='text-sm sm:text-base text-text-muted flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2'
        role='status'
        aria-live='polite'
        aria-label='Search results summary'
      >
        <span>
          <span className='font-medium text-text-primary'>{filteredCount}</span> items found
        </span>
        {selectedCount > 0 && (
          <>
            <span className='hidden sm:inline' aria-hidden='true'>•</span>
            <span className='text-accent-primary font-medium'>
              {selectedCount} selected
            </span>
          </>
        )}
      </div>
    </div>
  );
});

ItemsHeader.displayName = 'ItemsHeader';

export default ItemsHeader;
