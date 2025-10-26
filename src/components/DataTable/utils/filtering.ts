// ============================================================================
// FILTERING UTILITIES
// ============================================================================

import { Column, FilterConfig } from '../types';
import { logger } from '../../../utils/logger';

// ============================================================================
// FILTER FUNCTIONS
// ============================================================================

/**
 * Filters data based on filter configurations
 */
function filterData<T>(
  data: T[],
  columns: Column<T>[],
  filters: FilterConfig[]
): T[] {
  if (filters.length === 0) {
    return [...data];
  }

  // Safety check for columns
  if (!columns || !Array.isArray(columns)) {
    logger.error('filterData: columns must be an array', { columns });
    return [...data];
  }

  return data.filter(item => {
    return filters.every(filter => {
      const column = columns.find(col => col.key === filter.column);
      if (!column) return true;

      const value = getNestedValue(item, column.field || filter.column);
      return applyFilter(value, filter);
    });
  });
}

/**
 * Applies a single filter to a value
 */
function applyFilter(value: any, filter: FilterConfig): boolean {
  if (value === null || value === undefined) {
    return filter.operator === 'equals' && filter.value === null;
  }

  switch (filter.operator) {
    case 'equals':
      return value === filter.value;

    case 'contains':
      return String(value)
        .toLowerCase()
        .includes(String(filter.value).toLowerCase());

    case 'startsWith':
      return String(value)
        .toLowerCase()
        .startsWith(String(filter.value).toLowerCase());

    case 'endsWith':
      return String(value)
        .toLowerCase()
        .endsWith(String(filter.value).toLowerCase());

    case 'gt':
      return Number(value) > Number(filter.value);

    case 'lt':
      return Number(value) < Number(filter.value);

    case 'gte':
      return Number(value) >= Number(filter.value);

    case 'lte':
      return Number(value) <= Number(filter.value);

    default:
      return true;
  }
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
// FILTER CONFIGURATION
// ============================================================================

/**
 * Creates a new filter configuration
 */
function createFilterConfig(
  column: string,
  value: any,
  operator: FilterConfig['operator'] = 'contains'
): FilterConfig {
  return { column, value, operator };
}

/**
 * Updates an existing filter configuration
 */
function updateFilterConfig(
  filters: FilterConfig[],
  column: string,
  value: any,
  operator: FilterConfig['operator'] = 'contains'
): FilterConfig[] {
  const existingIndex = filters.findIndex(filter => filter.column === column);

  if (existingIndex >= 0) {
    // Update existing filter
    const updatedFilters = [...filters];
    updatedFilters[existingIndex] = { column, value, operator };
    return updatedFilters;
  } else {
    // Add new filter
    return [...filters, { column, value, operator }];
  }
}

/**
 * Removes a filter configuration
 */
function removeFilterConfig(
  filters: FilterConfig[],
  column: string
): FilterConfig[] {
  return filters.filter(filter => filter.column !== column);
}

/**
 * Clears all filter configurations
 */
function clearFilterConfigs(): FilterConfig[] {
  return [];
}

/**
 * Checks if a column has an active filter
 */
function hasColumnFilter(column: string, filters: FilterConfig[]): boolean {
  return filters.some(filter => filter.column === column);
}

/**
 * Gets the filter value for a column
 */
function getColumnFilterValue(column: string, filters: FilterConfig[]): any {
  const filter = filters.find(filter => filter.column === column);
  return filter?.value;
}

/**
 * Gets the filter operator for a column
 */
function getColumnFilterOperator(
  column: string,
  filters: FilterConfig[]
): FilterConfig['operator'] {
  const filter = filters.find(filter => filter.column === column);
  return filter?.operator || 'contains';
}

// ============================================================================
// FILTER VALIDATION
// ============================================================================

/**
 * Validates if a column can be filtered
 */
function canFilterColumn<T>(column: Column<T>): boolean {
  return column.filterable === true;
}

/**
 * Validates filter configuration
 */
function validateFilterConfig(filter: FilterConfig): boolean {
  return (
    typeof filter.column === 'string' &&
    filter.column.trim() !== '' &&
    [
      'equals',
      'contains',
      'startsWith',
      'endsWith',
      'gt',
      'lt',
      'gte',
      'lte',
    ].includes(filter.operator)
  );
}

/**
 * Validates all filter configurations
 */
function validateFilterConfigs(filters: FilterConfig[]): boolean {
  return filters.every(validateFilterConfig);
}

// ============================================================================
// SEARCH FUNCTIONALITY
// ============================================================================

/**
 * Creates a global search filter
 */
function createGlobalSearchFilter<T>(
  searchTerm: string,
  columns: Column<T>[]
): FilterConfig[] {
  if (!searchTerm.trim()) {
    return [];
  }

  // Safety check for columns
  if (!columns || !Array.isArray(columns)) {
    logger.error('createGlobalSearchFilter: columns must be an array', {
      columns,
    });
    return [];
  }

  const searchableColumns = columns.filter(col => col.filterable !== false);

  return searchableColumns.map(column => ({
    column: column.key,
    value: searchTerm,
    operator: 'contains' as const,
  }));
}

/**
 * Searches data across multiple columns
 */
function searchData<T>(
  data: T[],
  columns: Column<T>[],
  searchTerm: string
): T[] {
  if (!searchTerm.trim()) {
    return [...data];
  }

  // Safety check for columns
  if (!columns || !Array.isArray(columns)) {
    logger.error('searchData: columns must be an array', { columns });
    return [...data];
  }

  const searchFilters = createGlobalSearchFilter(searchTerm, columns);
  return filterData(data, columns, searchFilters);
}

// ============================================================================
// ADVANCED FILTERING
// ============================================================================

export interface AdvancedFilterConfig {
  column: string;
  operator: 'between' | 'in' | 'notIn' | 'isNull' | 'isNotNull';
  value: any;
  values?: any[];
}

/**
 * Applies advanced filter to data
 */
function applyAdvancedFilter<T>(
  data: T[],
  columns: Column<T>[],
  filter: AdvancedFilterConfig
): T[] {
  // Safety check for columns
  if (!columns || !Array.isArray(columns)) {
    logger.error('applyAdvancedFilter: columns must be an array', { columns });
    return data;
  }

  const column = columns.find(col => col.key === filter.column);
  if (!column) return data;

  return data.filter(item => {
    const value = getNestedValue(item, column.field || filter.column);

    switch (filter.operator) {
      case 'between':
        return value >= filter.value[0] && value <= filter.value[1];

      case 'in':
        return filter.values?.includes(value) || false;

      case 'notIn':
        return !filter.values?.includes(value) || false;

      case 'isNull':
        return value === null || value === undefined;

      case 'isNotNull':
        return value !== null && value !== undefined;

      default:
        return true;
    }
  });
}

// ============================================================================
// FILTER PRESETS
// ============================================================================

export const FILTER_PRESETS = {
  text: ['contains', 'startsWith', 'endsWith', 'equals'],
  number: ['equals', 'gt', 'lt', 'gte', 'lte'],
  date: ['equals', 'gt', 'lt', 'gte', 'lte'],
  boolean: ['equals'],
  select: ['equals', 'in', 'notIn'],
} as const;

/**
 * Gets available filter operators for a column type
 */
function getAvailableOperators(
  columnType: keyof typeof FILTER_PRESETS
): string[] {
  return FILTER_PRESETS[columnType] || FILTER_PRESETS.text;
}

// ============================================================================
// FILTER UI HELPERS
// ============================================================================

/**
 * Gets filter input type for a column
 */
function getFilterInputType<T>(column: Column<T>): string {
  if (column.sortBy === 'numeric') return 'number';
  if (column.sortBy === 'date') return 'date';
  if (
    column.field &&
    typeof column.field === 'string' &&
    column.field.includes('email')
  )
    return 'email';
  if (
    column.field &&
    typeof column.field === 'string' &&
    column.field.includes('url')
  )
    return 'url';
  return 'text';
}

/**
 * Gets filter placeholder for a column
 */
function getFilterPlaceholder<T>(column: Column<T>): string {
  const columnName =
    typeof column.header === 'string' ? column.header : 'Column';
  return `Filter by ${columnName.toLowerCase()}...`;
}

/**
 * Gets filter options for a column
 */
function getFilterOptions<T>(
  data: T[],
  column: Column<T>
): Array<{ value: any; label: string; count: number }> {
  const values = data.map(item =>
    getNestedValue(item, column.field || column.key)
  );
  const uniqueValues = [...new Set(values)];

  return uniqueValues.map(value => ({
    value,
    label: String(value),
    count: values.filter(v => v === value).length,
  }));
}

// ============================================================================
// PERFORMANCE OPTIMIZATIONS
// ============================================================================

/**
 * Memoized filter function for better performance
 */
function createMemoizedFilter<T>(columns: Column<T>[]) {
  const filterCache = new Map<string, T[]>();

  return function (data: T[], filters: FilterConfig[]): T[] {
    if (filters.length === 0) {
      return [...data];
    }

    // Safety check for columns
    if (!columns || !Array.isArray(columns)) {
      logger.error('createMemoizedFilter: columns must be an array', {
        columns,
      });
      return [...data];
    }

    const cacheKey = JSON.stringify(
      filters.sort((a, b) => a.column.localeCompare(b.column))
    );

    if (filterCache.has(cacheKey)) {
      return filterCache.get(cacheKey)!;
    }

    const filteredData = filterData(data, columns, filters);
    filterCache.set(cacheKey, filteredData);

    return filteredData;
  };
}

/**
 * Clears the filter cache
 */
function clearFilterCache<T>(
  memoizedFilter: ReturnType<typeof createMemoizedFilter<T>>
): void {
  // This would need to be implemented based on the cache structure
  // For now, we'll just return the function as-is
}

// ============================================================================
// EXPORT ALL FILTERING UTILITIES
// ============================================================================

export {
  filterData,
  createFilterConfig,
  updateFilterConfig,
  removeFilterConfig,
  clearFilterConfigs,
  hasColumnFilter,
  getColumnFilterValue,
  getColumnFilterOperator,
  canFilterColumn,
  validateFilterConfig,
  validateFilterConfigs,
  createGlobalSearchFilter,
  searchData,
  applyAdvancedFilter,
  getAvailableOperators,
  getFilterInputType,
  getFilterPlaceholder,
  getFilterOptions,
  createMemoizedFilter,
  clearFilterCache,
};
