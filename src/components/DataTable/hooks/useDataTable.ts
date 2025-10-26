// ============================================================================
// DATA TABLE HOOK
// ============================================================================

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import {
  UseDataTableOptions,
  UseDataTableReturn,
  SortConfig,
  FilterConfig,
  PaginationConfig,
} from '../types';
import {
  sortData,
  createSortConfig,
  isColumnSorted,
  getColumnSortDirection,
} from '../utils/sorting';
import {
  filterData,
  createFilterConfig,
  hasColumnFilter,
  getColumnFilterValue,
} from '../utils/filtering';
import {
  paginateData,
  calculatePaginationMetadata,
  createPaginationConfig,
  isPaginationNeeded,
} from '../utils/pagination';
import { DEFAULT_PAGINATION, DEFAULT_SORT_CONFIG } from '../constants';
import { logger } from '../../../utils/logger';

/**
 * Custom hook for DataTable logic and state management
 */
export function useDataTable<T>({
  data,
  columns,
  sortable = false,
  selectable = 'none',
  pagination = false,
  onSort,
  onSelect,
  onPageChange,
  onPageSizeChange,
  getRowId,
}: UseDataTableOptions<T>): UseDataTableReturn<T> {
  // Safety check for columns
  if (!columns || !Array.isArray(columns)) {
    logger.error('useDataTable: columns must be an array', { columns });
    // Return a default configuration to prevent crashes
    return {
      processedData: [],
      selectedItems: [],
      selectedIndices: [],
      sortConfig: null,
      paginatedData: [],
      paginationConfig: null,
      handleSort: () => {},
      handleSelect: () => {},
      handleSelectAll: () => {},
      handlePageChange: () => {},
      handlePageSizeChange: () => {},
      isSelected: () => false,
      isAllSelected: false,
      isPartiallySelected: false,
      getRowId: (item: T, index: number) => index,
    };
  }

  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================

  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [filters, setFilters] = useState<FilterConfig[]>([]);
  const [selectedItems, setSelectedItems] = useState<T[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [paginationConfig, setPaginationConfig] =
    useState<PaginationConfig | null>(
      pagination === true
        ? createPaginationConfig(data.length)
        : typeof pagination === 'object'
          ? pagination
          : null
    );

  // Refs for performance optimization
  const dataRef = useRef(data);
  const columnsRef = useRef(columns);

  // Update refs when props change
  useEffect(() => {
    dataRef.current = data;
    columnsRef.current = columns;
  }, [data, columns]);

  // ============================================================================
  // DATA PROCESSING
  // ============================================================================

  const processedData = useMemo(() => {
    if (!Array.isArray(data)) {
      return [];
    }
    let result = [...data];

    // Apply filters
    if (filters.length > 0) {
      result = filterData(result, columns, filters);
    }

    // Apply sorting
    if (sortConfig && sortConfig.direction !== 'none') {
      result = sortData(result, columns, sortConfig);
    }

    return result;
  }, [data, columns, filters, sortConfig]);

  const paginatedData = useMemo(() => {
    if (!paginationConfig || !isPaginationNeeded(paginationConfig)) {
      return processedData;
    }

    return paginateData(processedData, paginationConfig);
  }, [processedData, paginationConfig]);

  // ============================================================================
  // SORTING LOGIC
  // ============================================================================

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

  // ============================================================================
  // SELECTION LOGIC
  // ============================================================================

  const handleSelect = useCallback(
    (item: T, index: number, selected: boolean) => {
      if (selectable === 'none') return;

      const itemId = getRowId ? getRowId(item, index) : index;
      const currentIndex = selectedIndices.indexOf(index);

      if (selected) {
        if (selectable === 'single') {
          // Single selection - replace current selection
          setSelectedItems([item]);
          setSelectedIndices([index]);
        } else {
          // Multiple selection - add to current selection
          if (currentIndex === -1) {
            setSelectedItems(prev => [...prev, item]);
            setSelectedIndices(prev => [...prev, index]);
          }
        }
      } else {
        // Remove from selection
        setSelectedItems(prev => prev.filter((_, i) => i !== currentIndex));
        setSelectedIndices(prev => prev.filter(i => i !== index));
      }

      // Call external select handler if provided
      if (onSelect) {
        const newSelectedItems = selected
          ? selectable === 'single'
            ? [item]
            : [...selectedItems, item]
          : selectedItems.filter((_, i) => i !== currentIndex);

        const newSelectedIndices = selected
          ? selectable === 'single'
            ? [index]
            : [...selectedIndices, index]
          : selectedIndices.filter(i => i !== index);

        onSelect(newSelectedItems, newSelectedIndices);
      }
    },
    [selectable, selectedItems, selectedIndices, getRowId, onSelect]
  );

  const handleSelectAll = useCallback(
    (selected: boolean) => {
      if (selectable === 'none') return;

      if (selected) {
        setSelectedItems([...processedData]);
        setSelectedIndices(processedData.map((_, index) => index));
      } else {
        setSelectedItems([]);
        setSelectedIndices([]);
      }

      // Call external select handler if provided
      if (onSelect) {
        onSelect(
          selected ? [...processedData] : [],
          selected ? processedData.map((_, index) => index) : []
        );
      }
    },
    [selectable, processedData, onSelect]
  );

  // ============================================================================
  // PAGINATION LOGIC
  // ============================================================================

  const handlePageChange = useCallback(
    (page: number) => {
      if (!paginationConfig) return;

      const newConfig = { ...paginationConfig, currentPage: page };
      setPaginationConfig(newConfig);

      // Call external page change handler if provided
      if (onPageChange) {
        onPageChange(page);
      }
    },
    [paginationConfig, onPageChange]
  );

  const handlePageSizeChange = useCallback(
    (pageSize: number) => {
      if (!paginationConfig) return;

      const newConfig = { ...paginationConfig, pageSize, currentPage: 1 };
      setPaginationConfig(newConfig);

      // Call external page size change handler if provided
      if (onPageSizeChange) {
        onPageSizeChange(pageSize);
      }
    },
    [paginationConfig, onPageSizeChange]
  );

  // ============================================================================
  // UTILITY FUNCTIONS
  // ============================================================================

  const isSelected = useCallback(
    (item: T, index: number) => {
      if (selectable === 'none') return false;

      const itemId = getRowId ? getRowId(item, index) : index;
      return selectedIndices.includes(index);
    },
    [selectable, selectedIndices, getRowId]
  );

  const isAllSelected = useMemo(() => {
    if (selectable === 'none' || processedData.length === 0) return false;
    return selectedIndices.length === processedData.length;
  }, [selectable, processedData.length, selectedIndices.length]);

  const isPartiallySelected = useMemo(() => {
    if (selectable === 'none' || processedData.length === 0) return false;
    return (
      selectedIndices.length > 0 &&
      selectedIndices.length < processedData.length
    );
  }, [selectable, processedData.length, selectedIndices.length]);

  const getRowIdFromHook = useCallback(
    (item: T, index: number) => {
      if (getRowId) {
        return getRowId(item, index);
      }
      return index;
    },
    [getRowId]
  );

  // ============================================================================
  // EFFECTS
  // ============================================================================

  // Update pagination when data changes
  useEffect(() => {
    if (paginationConfig) {
      const newConfig = {
        ...paginationConfig,
        totalItems: processedData.length,
      };
      setPaginationConfig(newConfig);
    }
  }, [processedData.length]);

  // Clear selection when data changes
  useEffect(() => {
    setSelectedItems([]);
    setSelectedIndices([]);
  }, [data]);

  // ============================================================================
  // RETURN VALUES
  // ============================================================================

  return {
    // Data
    processedData,
    selectedItems,
    selectedIndices,
    sortConfig,

    // Pagination
    paginatedData,
    paginationConfig,

    // Actions
    handleSort,
    handleSelect,
    handleSelectAll,
    handlePageChange,
    handlePageSizeChange,

    // Utilities
    isSelected,
    isAllSelected,
    isPartiallySelected,
    getRowId: getRowIdFromHook,
  };
}

// ============================================================================
// EXPORT HOOK
// ============================================================================

export default useDataTable;
