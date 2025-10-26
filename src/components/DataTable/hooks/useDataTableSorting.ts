import { useState, useCallback, useMemo } from 'react';
import { SortConfig, SortDirection } from '../types';
import { sortData, createSortConfig } from '../utils/sorting';

export interface UseDataTableSortingOptions<T> {
  data: T[];
  columns: any[];
  sortable?: boolean;
  onSort?: (sortConfig: SortConfig) => void;
}

export interface UseDataTableSortingReturn<T> {
  sortConfig: SortConfig | null;
  sortedData: T[];
  handleSort: (column: string) => void;
  isColumnSorted: (column: string) => boolean;
  getColumnSortDirection: (column: string) => SortDirection;
}

/**
 * Custom hook for DataTable sorting logic
 * 
 * ARCHITECTURAL BENEFITS:
 * - Separates sorting concerns from main component
 * - Provides clean, focused API for sorting functionality
 * - Memoizes expensive sorting operations
 * - Maintains consistent sorting state management
 * 
 * PERFORMANCE OPTIMIZATIONS:
 * - Memoized sorted data to prevent unnecessary re-sorts
 * - Optimized sort handlers with useCallback
 * - Efficient column sort state checks
 */
export function useDataTableSorting<T>({
  data,
  columns,
  sortable = false,
  onSort,
}: UseDataTableSortingOptions<T>): UseDataTableSortingReturn<T> {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  // Memoized sorted data to prevent unnecessary re-sorts
  const sortedData = useMemo(() => {
    if (!sortConfig || sortConfig.direction === 'none' || !sortable) {
      return data;
    }
    return sortData(data, columns, sortConfig);
  }, [data, columns, sortConfig, sortable]);

  // Optimized sort handler
  const handleSort = useCallback(
    (column: string) => {
      if (!sortable) return;

      const newSortConfig = createSortConfig(column, sortConfig);
      setSortConfig(newSortConfig);

      // Call external sort handler if provided
      if (onSort) {
        onSort(newSortConfig);
      }
    },
    [sortable, sortConfig, onSort]
  );

  // Check if a column is currently sorted
  const isColumnSorted = useCallback(
    (column: string) => {
      return sortConfig?.column === column && sortConfig.direction !== 'none';
    },
    [sortConfig]
  );

  // Get the current sort direction for a column
  const getColumnSortDirection = useCallback(
    (column: string): SortDirection => {
      if (sortConfig?.column === column) {
        return sortConfig.direction;
      }
      return 'none';
    },
    [sortConfig]
  );

  return {
    sortConfig,
    sortedData,
    handleSort,
    isColumnSorted,
    getColumnSortDirection,
  };
}

export default useDataTableSorting;
