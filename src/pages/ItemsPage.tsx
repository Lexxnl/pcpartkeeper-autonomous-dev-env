import React, { useMemo, useCallback, useEffect } from 'react';
import ItemsHeader from '../components/ItemsHeader';
import { DataTable } from '../components/DataTable';
import DataTableRowActions from '../components/DataTable/components/Actions/DataTableRowActions';
import ItemsFilters from '../components/ItemsFilters';
import EmptyState from '../components/EmptyState';
import { PlusIcon } from '../components/icons';
import { useItemsStore, useUIStore } from '../store';
import { useDebounce } from '../hooks/useDebounce';
import { MOCK_ITEMS, DEFAULT_FILTERS, ITEM_COLUMNS } from '../data/mockData';
import { PageErrorBoundary, DataTableErrorBoundary, FormErrorBoundary } from '../components/ErrorBoundaries';
import { Item } from '../store/types';
import { logger } from '../utils/logger';

// ============================================================================
// COMPONENT DEFINITIONS
// ============================================================================

/**
 * ItemsPage - Main page for managing PC parts inventory
 *
 * Features:
 * - Zustand store integration (no local state)
 * - Centralized mock data
 * - Granular error boundaries
 * - Memoized components for performance
 * - Type-safe implementation
 */
const ItemsPage: React.FC = React.memo(() => {
  // ====================================================================
  // STORE INTEGRATION
  // ====================================================================
  
  // Items store selectors and actions - OPTIMIZED: Using specific selectors to prevent unnecessary re-renders
  const items = useItemsStore(state => state.items);
  const filters = useItemsStore(state => state.filters);
  const setItems = useItemsStore(state => state.setItems);
  const setFilters = useItemsStore(state => state.setFilters);
  const getFilteredItems = useItemsStore(state => state.getFilteredItems);
  const deleteItem = useItemsStore(state => state.deleteItem);
  const deleteItems = useItemsStore(state => state.deleteItems);

  // UI store selectors and actions - OPTIMIZED: Using specific selectors
  const showFilters = useUIStore(state => state.showFilters);
  const selectedItems = useUIStore(state => state.selectedItems);
  const setShowFilters = useUIStore(state => state.setShowFilters);
  const setSelectedItems = useUIStore(state => state.setSelectedItems);
  const clearSelection = useUIStore(state => state.clearSelection);

  // ====================================================================
  // INITIALIZATION
  // ====================================================================
  
  // Initialize items on mount
  useEffect(() => {
    const initializeItems = async () => {
      try {
        if (items.length === 0) {
          setItems(MOCK_ITEMS);
        }
      } catch (error) {
        logger.error('Error initializing items:', error);
      }
    };

    initializeItems();
  }, [items.length, setItems]);

  // ====================================================================
  // COMPUTED VALUES
  // ====================================================================
  
  // Get filtered items from store - OPTIMIZED: Using store selector instead of useMemo
  const filteredItems = useItemsStore(state => state.getFilteredItems());

  // Extract unique categories and brands for filter options
  const categories = useMemo(() => {
    try {
      return Array.from(new Set(items.map(item => item.category))).sort();
    } catch (error) {
      logger.error('Error extracting categories:', error);
      return [];
    }
  }, [items]);

  const brands = useMemo(() => {
    try {
      return Array.from(new Set(items.map(item => item.brand))).sort();
    } catch (error) {
      logger.error('Error extracting brands:', error);
      return [];
    }
  }, [items]);

  // ====================================================================
  // EVENT HANDLERS
  // ====================================================================
  
  // Memoized event handlers with performance optimizations
  const handleAddItem = useCallback((): void => {
    // TODO: Implement add item modal/form
  }, []);

  const handleEditItem = useCallback((item: Item): void => {
    // TODO: Implement edit functionality
  }, []);

  const handleDeleteItem = useCallback(async (item: Item): Promise<void> => {
    try {
      await deleteItem(item.id);
    } catch (error) {
      logger.error('Error deleting item:', error);
    }
  }, [deleteItem]);

  const handleBulkDelete = useCallback(async (): Promise<void> => {
    try {
      if (selectedItems.length === 0) return;
      await deleteItems(selectedItems);
      clearSelection();
    } catch (error) {
      logger.error('Error bulk deleting items:', error);
    }
  }, [selectedItems, deleteItems, clearSelection]);

  // Debounced search to improve performance
  const debouncedSearchTerm = useDebounce(filters.searchTerm, 300);

  useEffect(() => {
    setFilters({ searchTerm: debouncedSearchTerm });
  }, [debouncedSearchTerm, setFilters]);

  const handleSearch = useCallback((term: string): void => {
    setFilters({ searchTerm: term });
  }, [setFilters]);

  const handleFiltersChange = useCallback(
    (newFilters: Partial<typeof DEFAULT_FILTERS>): void => {
      setFilters(newFilters);
    },
    [setFilters]
  );

  const toggleFilters = useCallback((): void => {
    setShowFilters(!showFilters);
  }, [showFilters, setShowFilters]);

  // Memoized columns with actions - defined AFTER event handlers
  const columnsWithActions = useMemo(() => {
    return [
      ...ITEM_COLUMNS,
      {
        key: 'actions',
        header: 'Actions',
        field: 'actions',
        sortable: false,
        width: 'auto',
        align: 'center' as const,
        render: (item: Item, index: number) => {
          const actions = [
            {
              key: 'edit',
              label: 'Edit',
              icon: <span className='text-sm' aria-hidden='true'>✏️</span> as React.ReactNode,
              onClick: () => handleEditItem(item),
              variant: 'default' as const,
            },
            {
              key: 'delete',
              label: 'Delete',
              icon: <span className='text-sm' aria-hidden='true'>🗑️</span> as React.ReactNode,
              onClick: () => handleDeleteItem(item),
              variant: 'danger' as const,
            },
          ];

          return (
            <DataTableRowActions
              item={item}
              index={index}
              actions={actions}
              variant='inline'
              align='center'
              className='flex flex-col sm:flex-row gap-component-sm sm:gap-component-md'
            />
          );
        },
      },
    ];
  }, [handleEditItem, handleDeleteItem]);

  // ====================================================================
  // RENDER
  // ====================================================================
  
  return (
    <PageErrorBoundary>
      <div className='min-h-screen bg-surface-page'>
        {/* 
          RESPONSIVE CONTAINER: Mobile-first approach with consistent padding
          - Mobile: 1rem (16px) padding for touch-friendly spacing
          - Tablet: 1.5rem (24px) for better breathing room
          - Desktop: 2rem (32px) for optimal content width
          - Large: 2.5rem (40px) for wide screens
        */}
        <div className='container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 md:py-8'>
          {/* Page Header - Mobile-first typography scaling */}
          <header className='mb-6 sm:mb-8' role='banner'>
            <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary mb-2 sm:mb-3'>
              PC Parts Inventory
            </h1>
            <p className='text-sm sm:text-base md:text-lg text-text-muted leading-relaxed'>
              Manage your computer components and inventory
            </p>
          </header>

          {/* Header Section - Responsive search and actions */}
          <section className='mb-6 sm:mb-8' aria-label='Search and actions'>
            <ItemsHeader
              searchTerm={filters.searchTerm}
              onSearchChange={(term) => setFilters({ searchTerm: term })}
              onSearch={handleSearch}
              onAddItem={handleAddItem}
              filteredCount={filteredItems.length}
              selectedCount={selectedItems.length}
              onBulkDelete={handleBulkDelete}
            />
          </section>

          {/* Filters Toggle - Accessible button with proper ARIA */}
          <section className='mb-4 sm:mb-6' aria-label='Filter controls'>
            <button
              onClick={toggleFilters}
              className='w-full sm:w-auto px-4 py-3 text-sm sm:text-base bg-surface-secondary text-text-primary rounded-lg hover:bg-surface-tertiary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-surface-page transition-all duration-200'
              aria-expanded={showFilters}
              aria-controls='filters-section'
              aria-describedby='filters-description'
            >
              <span className='flex items-center justify-center gap-2 sm:gap-3'>
                <span 
                  className='text-lg sm:text-xl transition-transform duration-200'
                  aria-hidden='true'
                >
                  {showFilters ? '−' : '+'}
                </span>
                <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
              </span>
            </button>
            <p id='filters-description' className='sr-only'>
              Toggle advanced filtering options to narrow down your search results
            </p>
          </section>

          {/* Filters Section - Responsive grid layout */}
          {showFilters && (
            <section 
              id='filters-section' 
              className='mb-6 sm:mb-8' 
              aria-label='Advanced filters'
              role='region'
            >
              <FormErrorBoundary>
                <ItemsFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  categories={categories}
                  brands={brands}
                />
              </FormErrorBoundary>
            </section>
          )}

          {/* Main Content - Responsive table or empty state */}
          <main role='main' aria-label='Inventory items'>
            {filteredItems.length > 0 ? (
              <DataTableErrorBoundary>
                <DataTable
                  data={filteredItems}
                  columns={columnsWithActions}
                  sortable={true}
                  selectable='multiple'
                  hoverable={true}
                  bordered={true}
                  striped={true}
                  compact={true}
                  cellPadding='condensed'
                  pagination={{
                    pageSize: 10,
                    currentPage: 1,
                    totalItems: filteredItems.length,
                    showPageSizeSelector: true,
                    pageSizeOptions: [5, 10, 25, 50],
                  }}
                  onSelect={items => setSelectedItems(items.map((item: Item) => item.id))}
                  getRowId={(item: Item) => item.id}
                />
              </DataTableErrorBoundary>
            ) : (
              <EmptyState
                title='No items found'
                description="Try adjusting your search terms or filters to find what you're looking for."
                icon={<PlusIcon className='w-8 h-8 text-text-muted' />}
                action={
                  <button
                    onClick={handleAddItem}
                    className='px-6 py-3 bg-accent-primary text-text-primary rounded-lg hover:bg-accent-primary-emphasis focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-surface-page transition-all duration-200 font-medium'
                    aria-label='Add your first inventory item'
                  >
                    Add First Item
                  </button>
                }
              />
            )}
          </main>
        </div>
      </div>
    </PageErrorBoundary>
  );
});

export default ItemsPage;
