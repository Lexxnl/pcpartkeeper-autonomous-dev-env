// ============================================================================
// SORTING UTILITIES
// ============================================================================

import { Column, SortDirection, SortConfig } from '../types';
import { logger } from '../../../utils/logger';

// ============================================================================
// SORT FUNCTIONS
// ============================================================================

/**
 * Sorts data based on column configuration and sort direction
 */
function sortData<T>(
  data: T[],
  columns: Column<T>[],
  sortConfig: SortConfig | null
): T[] {
  if (!sortConfig || sortConfig.direction === 'none') {
    return [...data];
  }

  // Safety check for columns
  if (!columns || !Array.isArray(columns)) {
    logger.error('sortData: columns must be an array', { columns });
    return [...data];
  }

  const column = columns.find(col => col.key === sortConfig.column);
  if (!column) {
    return [...data];
  }

  const sortedData = [...data].sort((a, b) => {
    let comparison = 0;

    if (column.sortBy === 'custom' && column.sortBy) {
      // Use custom sort function
      comparison = (column.sortBy as (a: T, b: T) => number)(a, b);
    } else {
      // Use default sort logic
      comparison = getDefaultSortComparison(a, b, column, sortConfig.column);
    }

    return sortConfig.direction === 'asc' ? comparison : -comparison;
  });

  return sortedData;
}

/**
 * Gets the default sort comparison for a column
 */
function getDefaultSortComparison<T>(
  a: T,
  b: T,
  column: Column<T>,
  columnKey: string
): number {
  const aValue = getNestedValue(a, column.field || columnKey);
  const bValue = getNestedValue(b, column.field || columnKey);

  if (aValue === null || aValue === undefined) return 1;
  if (bValue === null || bValue === undefined) return -1;

  // Handle different data types
  if (column.sortBy === 'numeric') {
    return compareNumbers(aValue, bValue);
  } else if (column.sortBy === 'date') {
    return compareDates(aValue, bValue);
  } else {
    return compareStrings(aValue, bValue);
  }
}

/**
 * Compares two values as numbers
 */
function compareNumbers(a: any, b: any): number {
  const numA = Number(a);
  const numB = Number(b);

  if (isNaN(numA) && isNaN(numB)) return 0;
  if (isNaN(numA)) return 1;
  if (isNaN(numB)) return -1;

  return numA - numB;
}

/**
 * Compares two values as dates
 */
function compareDates(a: any, b: any): number {
  const dateA = new Date(a);
  const dateB = new Date(b);

  if (isNaN(dateA.getTime()) && isNaN(dateB.getTime())) return 0;
  if (isNaN(dateA.getTime())) return 1;
  if (isNaN(dateB.getTime())) return -1;

  return dateA.getTime() - dateB.getTime();
}

/**
 * Compares two values as strings
 */
function compareStrings(a: any, b: any): number {
  const strA = String(a).toLowerCase();
  const strB = String(b).toLowerCase();

  return strA.localeCompare(strB);
}

/**
 * Gets nested value from object using dot notation
 */
function getNestedValue(obj: any, path: string | keyof any): any {
  if (typeof path === 'string' && path.includes('.')) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }
  return obj[path];
}

// ============================================================================
// SORT CONFIGURATION
// ============================================================================

/**
 * Creates a new sort configuration
 */
function createSortConfig(
  column: string,
  currentSort: SortConfig | null
): SortConfig {
  if (!currentSort || currentSort.column !== column) {
    return { column, direction: 'asc' };
  }

  const directionCycle: SortDirection[] = ['asc', 'desc', 'none'];
  const currentIndex = directionCycle.indexOf(currentSort.direction);
  const nextIndex = (currentIndex + 1) % directionCycle.length;

  return {
    column,
    direction: directionCycle[nextIndex],
  };
}

/**
 * Toggles sort direction for a column
 */
function toggleSortDirection(
  column: string,
  currentSort: SortConfig | null
): SortConfig {
  return createSortConfig(column, currentSort);
}

/**
 * Resets sort configuration
 */
function resetSortConfig(): SortConfig {
  return { column: '', direction: 'none' };
}

/**
 * Checks if a column is currently sorted
 */
function isColumnSorted(
  column: string,
  sortConfig: SortConfig | null
): boolean {
  return sortConfig?.column === column && sortConfig.direction !== 'none';
}

/**
 * Gets the current sort direction for a column
 */
function getColumnSortDirection(
  column: string,
  sortConfig: SortConfig | null
): SortDirection {
  if (sortConfig?.column === column) {
    return sortConfig.direction;
  }
  return 'none';
}

// ============================================================================
// SORT VALIDATION
// ============================================================================

/**
 * Validates if a column can be sorted
 */
function canSortColumn<T>(column: Column<T>): boolean {
  return column.sortable === true;
}

/**
 * Validates sort configuration
 */
function validateSortConfig(sortConfig: SortConfig): boolean {
  return (
    typeof sortConfig.column === 'string' &&
    ['asc', 'desc', 'none'].includes(sortConfig.direction)
  );
}

// ============================================================================
// MULTI-COLUMN SORTING
// ============================================================================

export interface MultiSortConfig {
  columns: Array<{
    column: string;
    direction: SortDirection;
    priority: number;
  }>;
}

/**
 * Sorts data with multiple columns
 */
function sortDataMulti<T>(
  data: T[],
  columns: Column<T>[],
  sortConfig: MultiSortConfig
): T[] {
  if (sortConfig.columns.length === 0) {
    return [...data];
  }

  // Safety check for columns
  if (!columns || !Array.isArray(columns)) {
    logger.error('sortDataMulti: columns must be an array', { columns });
    return [...data];
  }

  const sortedData = [...data].sort((a, b) => {
    for (const sort of sortConfig.columns.sort(
      (x, y) => x.priority - y.priority
    )) {
      if (sort.direction === 'none') continue;

      const column = columns.find(col => col.key === sort.column);
      if (!column) continue;

      const comparison = getDefaultSortComparison(a, b, column, sort.column);
      if (comparison !== 0) {
        return sort.direction === 'asc' ? comparison : -comparison;
      }
    }

    return 0;
  });

  return sortedData;
}

/**
 * Adds a column to multi-sort configuration
 */
function addColumnToMultiSort(
  column: string,
  direction: SortDirection,
  currentSort: MultiSortConfig
): MultiSortConfig {
  const existingIndex = currentSort.columns.findIndex(
    col => col.column === column
  );

  if (existingIndex >= 0) {
    // Update existing column
    const updatedColumns = [...currentSort.columns];
    updatedColumns[existingIndex] = {
      column,
      direction,
      priority: existingIndex,
    };
    return { columns: updatedColumns };
  } else {
    // Add new column
    const newColumn = {
      column,
      direction,
      priority: currentSort.columns.length,
    };
    return {
      columns: [...currentSort.columns, newColumn],
    };
  }
}

/**
 * Removes a column from multi-sort configuration
 */
function removeColumnFromMultiSort(
  column: string,
  currentSort: MultiSortConfig
): MultiSortConfig {
  return {
    columns: currentSort.columns.filter(col => col.column !== column),
  };
}

// ============================================================================
// SORT INDICATORS
// ============================================================================

/**
 * Gets the sort indicator for a column
 */
function getSortIndicator(
  column: string,
  sortConfig: SortConfig | null
): string {
  if (!isColumnSorted(column, sortConfig)) {
    return '↕';
  }

  return sortConfig.direction === 'asc' ? '↑' : '↓';
}

/**
 * Gets the sort indicator class for a column
 */
function getSortIndicatorClass(
  column: string,
  sortConfig: SortConfig | null
): string {
  if (!isColumnSorted(column, sortConfig)) {
    return 'data-table-sort-indicator';
  }

  return `data-table-sort-indicator data-table-sort-${sortConfig.direction}`;
}

// ============================================================================
// PERFORMANCE OPTIMIZATIONS
// ============================================================================

/**
 * Memoized sort function for better performance
 */
function createMemoizedSort<T>(columns: Column<T>[]) {
  const sortCache = new Map<string, T[]>();

  return function (data: T[], sortConfig: SortConfig | null): T[] {
    if (!sortConfig || sortConfig.direction === 'none') {
      return [...data];
    }

    // Safety check for columns
    if (!columns || !Array.isArray(columns)) {
      logger.error('createMemoizedSort: columns must be an array', {
        columns,
      });
      return [...data];
    }

    const cacheKey = `${sortConfig.column}-${sortConfig.direction}`;

    if (sortCache.has(cacheKey)) {
      return sortCache.get(cacheKey)!;
    }

    const sortedData = sortData(data, columns, sortConfig);
    sortCache.set(cacheKey, sortedData);

    return sortedData;
  };
}

/**
 * Clears the sort cache
 */
function clearSortCache<T>(
  memoizedSort: ReturnType<typeof createMemoizedSort<T>>
): void {
  // This would need to be implemented based on the cache structure
  // For now, we'll just return the function as-is
}

// ============================================================================
// EXPORT ALL SORTING UTILITIES
// ============================================================================

export {
  sortData,
  createSortConfig,
  toggleSortDirection,
  resetSortConfig,
  isColumnSorted,
  getColumnSortDirection,
  canSortColumn,
  validateSortConfig,
  sortDataMulti,
  addColumnToMultiSort,
  removeColumnFromMultiSort,
  getSortIndicator,
  getSortIndicatorClass,
  createMemoizedSort,
  clearSortCache,
};
