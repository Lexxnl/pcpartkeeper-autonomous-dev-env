import React, { createContext, useContext } from 'react';
import { DataTableProps, Column, SortConfig, PaginationConfig } from './types';

// ============================================================================
// DATA TABLE CONTEXT TYPES
// ============================================================================

export interface DataTableContextValue<T = unknown> {
  // Data
  data: T[];
  columns: Column<T>[];
  processedData: T[];

  // State
  loading: boolean;
  empty: boolean;
  error?: string;

  // Sorting
  sortConfig: SortConfig | null;
  sortable: boolean;
  onSort?: (columnKey: string, direction: 'asc' | 'desc' | 'none') => void;

  // Selection
  selectable: 'none' | 'single' | 'multiple';
  selectedItems: T[];
  selectedIndices: number[];
  onSelect?: (selectedItems: T[]) => void;

  // Pagination
  paginationConfig: PaginationConfig | null;
  paginatedData: T[];
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;

  // Styling
  cellPadding: 'condensed' | 'normal' | 'spacious';
  bordered: boolean;
  striped: boolean;
  hoverable: boolean;
  compact: boolean;
  responsive: boolean;
  stickyHeader: boolean;
  stickyColumns?: { left?: number; right?: number };

  // Virtual scrolling
  virtualized?: { rowHeight: number; overscan?: number };

  // Utility functions
  getRowId: (item: T, index: number) => string | number;
  isSelected: (item: T, index: number) => boolean;
  isAllSelected: () => boolean;
  isPartiallySelected: () => boolean;
}

// ============================================================================
// CONTEXT CREATION
// ============================================================================

const DataTableContext = createContext<DataTableContextValue | null>(null);

// ============================================================================
// CONTEXT PROVIDER
// ============================================================================

export interface DataTableProviderProps<T = unknown> {
  value: DataTableContextValue<T>;
  children: React.ReactNode;
}

export function DataTableProvider<T = unknown>({
  value,
  children,
}: DataTableProviderProps<T>) {
  return (
    <DataTableContext.Provider value={value as DataTableContextValue}>
      {children}
    </DataTableContext.Provider>
  );
}

// ============================================================================
// CONTEXT HOOK
// ============================================================================

export function useDataTableContext<T = unknown>(): DataTableContextValue<T> {
  const context = useContext(DataTableContext);

  if (!context) {
    throw new Error(
      'useDataTableContext must be used within a DataTableProvider'
    );
  }

  return context as DataTableContextValue<T>;
}

// ============================================================================
// CONTEXT CONSUMER
// ============================================================================

export const DataTableConsumer = DataTableContext.Consumer;

// Set displayName on the context itself, not the consumer
DataTableContext.displayName = 'DataTableContext';

// ============================================================================
// EXPORTS
// ============================================================================

export { DataTableContext };
export default DataTableContext;
