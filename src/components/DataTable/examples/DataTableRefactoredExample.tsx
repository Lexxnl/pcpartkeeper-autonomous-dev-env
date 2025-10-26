import React, { useState, useMemo } from 'react';
import { DataTable } from '../DataTable';
import { MOCK_ITEMS, ITEM_COLUMNS } from '../../data/mockData';
import type { DataTableProps, Column } from '../types';
import { logger } from '../../../utils/logger';

/**
 * DataTable Example - Comprehensive usage example
 * 
 * This example demonstrates the DataTable component with:
 * - Proper virtualization for large datasets
 * - Consistent prop interfaces
 * - Centralized data management
 * - Performance optimizations
 * - TypeScript type safety
 */

interface ExampleItem {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  quantity: number;
  inStock: boolean;
  dateAdded: string;
  rating: number;
}

// ============================================================================
// EXAMPLE CONFIGURATION
// ============================================================================

const EXAMPLE_DATA: ExampleItem[] = MOCK_ITEMS;

const EXAMPLE_COLUMNS: Column<ExampleItem>[] = ITEM_COLUMNS;

// ============================================================================
// EXAMPLE COMPONENT
// ============================================================================

export const DataTableExample: React.FC = () => {
  // State management
  const [selectedItems, setSelectedItems] = useState<ExampleItem[]>([]);
  const [sortConfig, setSortConfig] = useState<{ column: string; direction: 'asc' | 'desc' | 'none' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Event handlers
  const handleSort = (config: { column: string; direction: 'asc' | 'desc' | 'none' }) => {
    setSortConfig(config);
    logger.log('Sort changed:', config);
  };

  const handleSelect = (items: ExampleItem[], indices: number[]) => {
    setSelectedItems(items);
    logger.log('Selection changed:', { items, indices });
  };

  const handleRowClick = (item: ExampleItem, index: number, event: React.MouseEvent) => {
    logger.log('Row clicked:', { item, index, event });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    logger.log('Page changed:', page);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page
    logger.log('Page size changed:', newPageSize);
  };

  // Memoized pagination config
  const paginationConfig = useMemo(() => ({
    pageSize,
    currentPage,
    totalItems: EXAMPLE_DATA.length,
    showPageSizeSelector: true,
    pageSizeOptions: [10, 25, 50, 100],
  }), [pageSize, currentPage]);

  // Example with small dataset (no virtualization)
  const SmallDatasetExample = () => (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Small Dataset (No Virtualization)</h3>
      <DataTable
        data={EXAMPLE_DATA.slice(0, 10)}
        columns={EXAMPLE_COLUMNS}
        sortable
        selectable="multiple"
        pagination={false}
        striped
        hoverable
        bordered
        onSort={handleSort}
        onSelect={handleSelect}
        onRowClick={handleRowClick}
        getRowId={(item) => item.id}
        getRowClassName={(item) => 
          item.inStock ? 'data-table-row-available' : 'data-table-row-unavailable'
        }
      />
    </div>
  );

  // Example with large dataset (with virtualization)
  const LargeDatasetExample = () => (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Large Dataset (With Virtualization)</h3>
      <DataTable
        data={EXAMPLE_DATA}
        columns={EXAMPLE_COLUMNS}
        sortable
        selectable="multiple"
        pagination={paginationConfig}
        virtualScrolling
        rowHeight={48}
        striped
        hoverable
        bordered
        stickyHeader
        onSort={handleSort}
        onSelect={handleSelect}
        onRowClick={handleRowClick}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        getRowId={(item) => item.id}
        getRowClassName={(item) => 
          item.inStock ? 'data-table-row-available' : 'data-table-row-unavailable'
        }
      />
    </div>
  );

  // Example with custom empty state
  const CustomEmptyStateExample = () => (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Custom Empty State</h3>
      <DataTable
        data={[]}
        columns={EXAMPLE_COLUMNS}
        emptyState={
          <div className="text-center py-8">
            <div className="text-4xl mb-4">📊</div>
            <h4 className="text-lg font-medium mb-2">No Data Available</h4>
            <p className="text-text-muted mb-4">There are no items to display at this time.</p>
            <button 
              className="px-4 py-2 bg-action-primary text-text-inverse rounded hover:bg-action-primary-hover"
              onClick={() => logger.log('Add data clicked')}
            >
              Add Data
            </button>
          </div>
        }
      />
    </div>
  );

  // Example with loading state
  const LoadingStateExample = () => {
    const [loading, setLoading] = useState(false);

    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Loading State</h3>
        <button 
          className="mb-4 px-4 py-2 bg-status-success text-text-inverse rounded hover:bg-status-success-dark"
          onClick={() => {
            setLoading(true);
            setTimeout(() => setLoading(false), 2000);
          }}
        >
          Toggle Loading
        </button>
        <DataTable
          data={EXAMPLE_DATA}
          columns={EXAMPLE_COLUMNS}
          loading={loading}
          loadingState={
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary mx-auto mb-4"></div>
              <p>Loading data...</p>
            </div>
          }
        />
      </div>
    );
  };

  return (
    <div className="p-layout-md max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">DataTable Examples</h1>
        <p className="text-text-muted mb-6">
          This demonstrates the DataTable component with improved architecture,
          performance optimizations, and better maintainability.
        </p>
        
        <div className="bg-status-info-light border border-status-info rounded-lg p-layout-sm mb-layout-md">
          <h4 className="font-semibold text-status-info-dark mb-2">Key Improvements:</h4>
          <ul className="list-disc list-inside text-status-info space-y-1">
            <li>Separated into smaller, focused subcomponents (Row, Header, Cell)</li>
            <li>Implemented react-window virtualization for large datasets</li>
            <li>Standardized prop interfaces (consistent onClick naming)</li>
            <li>Removed repeated logic and centralized utilities</li>
            <li>Maintained full TypeScript type safety</li>
            <li>Added comprehensive performance optimizations</li>
          </ul>
        </div>
      </div>

      <SmallDatasetExample />
      <LargeDatasetExample />
      <CustomEmptyStateExample />
      <LoadingStateExample />

      <div className="mt-layout-xl p-layout-sm bg-surface-secondary rounded-lg">
        <h4 className="font-semibold mb-2">Selection State:</h4>
        <p className="text-sm text-text-muted">
          Selected {selectedItems.length} items: {selectedItems.map(item => item.name).join(', ')}
        </p>
      </div>
    </div>
  );
};

export default DataTableExample;
