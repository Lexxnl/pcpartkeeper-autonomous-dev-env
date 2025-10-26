// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

import {
  DataTableProps,
  Column,
  PaginationConfig,
  SortDirection,
  AlignDirection,
  SelectionMode,
  CellPadding,
  ResponsiveBreakpoint,
} from '../types';
import { VALIDATION_RULES, ERROR_MESSAGES } from '../constants';

// ============================================================================
// TYPE GUARDS
// ============================================================================

function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

function isObject(value: unknown): value is object {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

// ============================================================================
// DATA VALIDATION
// ============================================================================

function validateData(data: unknown): { isValid: boolean; error?: string } {
  if (!isArray(data)) {
    return { isValid: false, error: ERROR_MESSAGES.invalidData };
  }

  if (data.length > VALIDATION_RULES.maxRows) {
    return {
      isValid: false,
      error: `Data exceeds maximum of ${VALIDATION_RULES.maxRows} rows`,
    };
  }

  return { isValid: true };
}

function validateColumns(columns: unknown): { isValid: boolean; error?: string } {
  // Early return if columns is null or undefined
  if (columns === null || columns === undefined) {
    return { isValid: false, error: ERROR_MESSAGES.invalidColumns };
  }

  if (!isArray(columns)) {
    return { isValid: false, error: ERROR_MESSAGES.invalidColumns };
  }

  if (columns.length > VALIDATION_RULES.maxColumns) {
    return {
      isValid: false,
      error: `Columns exceed maximum of ${VALIDATION_RULES.maxColumns}`,
    };
  }

  // Use traditional for loop to avoid iteration errors
  for (let i = 0; i < columns.length; i++) {
    const columnValidation = validateColumn(columns[i]);
    if (!columnValidation.isValid) {
      return columnValidation;
    }
  }

  return { isValid: true };
}

function validateColumn(column: unknown): { isValid: boolean; error?: string } {
  if (!isObject(column)) {
    return { isValid: false, error: 'Column must be an object' };
  }

  const col = column as Record<string, unknown>;
  if (!isString(col.key) || col.key.trim() === '') {
    return { isValid: false, error: ERROR_MESSAGES.missingKey };
  }

  if (!col.field && !col.render) {
    return { isValid: false, error: ERROR_MESSAGES.missingField };
  }

  return { isValid: true };
}

// ============================================================================
// PAGINATION VALIDATION
// ============================================================================

function validatePaginationConfig(config: unknown): {
  isValid: boolean;
  error?: string;
} {
  if (!isObject(config)) {
    return { isValid: false, error: 'Pagination config must be an object' };
  }

  const cfg = config as Record<string, unknown>;
  if (isNumber(cfg.pageSize)) {
    if (
      cfg.pageSize < VALIDATION_RULES.minPageSize ||
      cfg.pageSize > VALIDATION_RULES.maxPageSize
    ) {
      return { isValid: false, error: ERROR_MESSAGES.invalidPageSize };
    }
  }

  if (isNumber(cfg.currentPage)) {
    if (cfg.currentPage < VALIDATION_RULES.minPage) {
      return { isValid: false, error: ERROR_MESSAGES.invalidPage };
    }
  }

  return { isValid: true };
}

// ============================================================================
// ENUM VALIDATION
// ============================================================================

function validateSortDirection(direction: unknown): direction is SortDirection {
  return isString(direction) && ['asc', 'desc', 'none'].includes(direction);
}

function validateAlignDirection(direction: unknown): direction is AlignDirection {
  return isString(direction) && ['start', 'center', 'end'].includes(direction);
}

function validateSelectionMode(mode: unknown): mode is SelectionMode {
  return isString(mode) && ['single', 'multiple', 'none'].includes(mode);
}

function validateCellPadding(padding: unknown): padding is CellPadding {
  return (
    isString(padding) && ['condensed', 'normal', 'spacious'].includes(padding)
  );
}

function validateResponsiveBreakpoint(
  breakpoint: unknown
): breakpoint is ResponsiveBreakpoint {
  return (
    isString(breakpoint) &&
    ['xs', 'sm', 'md', 'lg', 'xl', '2xl'].includes(breakpoint)
  );
}

// ============================================================================
// PROPS VALIDATION
// ============================================================================

function validateDataTableProps<T>(props: DataTableProps<T>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Validate data
  const dataValidation = validateData(props.data);
  if (!dataValidation.isValid) {
    errors.push(dataValidation.error!);
  }

  // Validate columns
  const columnsValidation = validateColumns(props.columns);
  if (!columnsValidation.isValid) {
    errors.push(columnsValidation.error!);
  }

  // Validate pagination if provided
  if (props.pagination && typeof props.pagination === 'object') {
    const paginationValidation = validatePaginationConfig(props.pagination);
    if (!paginationValidation.isValid) {
      errors.push(paginationValidation.error!);
    }
  }

  // Validate sortable
  if (props.sortable !== undefined && !isBoolean(props.sortable)) {
    errors.push('sortable must be a boolean');
  }

  // Validate selectable
  if (
    props.selectable !== undefined &&
    !validateSelectionMode(props.selectable)
  ) {
    errors.push(ERROR_MESSAGES.invalidSelectionMode);
  }

  // Validate cellPadding
  if (
    props.cellPadding !== undefined &&
    !validateCellPadding(props.cellPadding)
  ) {
    errors.push('cellPadding must be condensed, normal, or spacious');
  }

  // Validate striped
  if (props.striped !== undefined && !isBoolean(props.striped)) {
    errors.push('striped must be a boolean');
  }

  // Validate hoverable
  if (props.hoverable !== undefined && !isBoolean(props.hoverable)) {
    errors.push('hoverable must be a boolean');
  }

  // Validate bordered
  if (props.bordered !== undefined && !isBoolean(props.bordered)) {
    errors.push('bordered must be a boolean');
  }

  // Validate compact
  if (props.compact !== undefined && !isBoolean(props.compact)) {
    errors.push('compact must be a boolean');
  }

  // Validate stickyHeader
  if (props.stickyHeader !== undefined && !isBoolean(props.stickyHeader)) {
    errors.push('stickyHeader must be a boolean');
  }

  // Validate stickyColumns
  if (props.stickyColumns !== undefined && !isNumber(props.stickyColumns)) {
    errors.push('stickyColumns must be a number');
  }

  // Validate virtualScrolling
  if (
    props.virtualScrolling !== undefined &&
    !isBoolean(props.virtualScrolling)
  ) {
    errors.push('virtualScrolling must be a boolean');
  }

  // Validate rowHeight
  if (props.rowHeight !== undefined && !isNumber(props.rowHeight)) {
    errors.push('rowHeight must be a number');
  }

  // Validate callbacks
  if (props.onSort !== undefined && !isFunction(props.onSort)) {
    errors.push('onSort must be a function');
  }

  if (props.onSelect !== undefined && !isFunction(props.onSelect)) {
    errors.push('onSelect must be a function');
  }

  if (props.onRowClick !== undefined && !isFunction(props.onRowClick)) {
    errors.push('onRowClick must be a function');
  }

  if (
    props.onRowDoubleClick !== undefined &&
    !isFunction(props.onRowDoubleClick)
  ) {
    errors.push('onRowDoubleClick must be a function');
  }

  if (props.onRowKeyDown !== undefined && !isFunction(props.onRowKeyDown)) {
    errors.push('onRowKeyDown must be a function');
  }

  if (props.onPageChange !== undefined && !isFunction(props.onPageChange)) {
    errors.push('onPageChange must be a function');
  }

  if (
    props.onPageSizeChange !== undefined &&
    !isFunction(props.onPageSizeChange)
  ) {
    errors.push('onPageSizeChange must be a function');
  }

  if (props.onFilter !== undefined && !isFunction(props.onFilter)) {
    errors.push('onFilter must be a function');
  }

  if (props.getRowId !== undefined && !isFunction(props.getRowId)) {
    errors.push('getRowId must be a function');
  }

  if (
    props.getRowClassName !== undefined &&
    !isFunction(props.getRowClassName)
  ) {
    errors.push('getRowClassName must be a function');
  }

  if (props.getRowProps !== undefined && !isFunction(props.getRowProps)) {
    errors.push('getRowProps must be a function');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// ============================================================================
// COLUMN VALIDATION
// ============================================================================

function validateColumnProps<T>(column: Column<T>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Validate key
  if (!isString(column.key) || column.key.trim() === '') {
    errors.push(ERROR_MESSAGES.missingKey);
  }

  // Validate field or render
  if (!column.field && !column.render) {
    errors.push(ERROR_MESSAGES.missingField);
  }

  // Validate header
  if (!column.header) {
    errors.push('Column header is required');
  }

  // Validate sortable
  if (column.sortable !== undefined && !isBoolean(column.sortable)) {
    errors.push('Column sortable must be a boolean');
  }

  // Validate filterable
  if (column.filterable !== undefined && !isBoolean(column.filterable)) {
    errors.push('Column filterable must be a boolean');
  }

  // Validate align
  if (column.align !== undefined && !validateAlignDirection(column.align)) {
    errors.push(ERROR_MESSAGES.invalidAlignDirection);
  }

  // Validate width
  if (
    column.width !== undefined &&
    !isNumber(column.width) &&
    !isString(column.width)
  ) {
    errors.push('Column width must be a number or string');
  }

  // Validate minWidth
  if (
    column.minWidth !== undefined &&
    !isNumber(column.minWidth) &&
    !isString(column.minWidth)
  ) {
    errors.push('Column minWidth must be a number or string');
  }

  // Validate maxWidth
  if (
    column.maxWidth !== undefined &&
    !isNumber(column.maxWidth) &&
    !isString(column.maxWidth)
  ) {
    errors.push('Column maxWidth must be a number or string');
  }

  // Validate hidden
  if (column.hidden !== undefined) {
    if (!isBoolean(column.hidden) && !isArray(column.hidden)) {
      errors.push('Column hidden must be a boolean or array of breakpoints');
    }

    if (isArray(column.hidden)) {
      for (const breakpoint of column.hidden) {
        if (!validateResponsiveBreakpoint(breakpoint)) {
          errors.push(`Invalid breakpoint in hidden array: ${breakpoint}`);
        }
      }
    }
  }

  // Validate className
  if (column.className !== undefined && !isString(column.className)) {
    errors.push('Column className must be a string');
  }

  // Validate headerClassName
  if (
    column.headerClassName !== undefined &&
    !isString(column.headerClassName)
  ) {
    errors.push('Column headerClassName must be a string');
  }

  // Validate cellClassName
  if (column.cellClassName !== undefined && !isString(column.cellClassName)) {
    errors.push('Column cellClassName must be a string');
  }

  // Validate sortBy
  if (column.sortBy !== undefined) {
    const validSortBy =
      ['alphanumeric', 'numeric', 'date', 'custom'].includes(column.sortBy) ||
      isFunction(column.sortBy);
    if (!validSortBy) {
      errors.push(
        'Column sortBy must be alphanumeric, numeric, date, custom, or a function'
      );
    }
  }

  // Validate filterBy
  if (column.filterBy !== undefined && !isFunction(column.filterBy)) {
    errors.push('Column filterBy must be a function');
  }

  // Validate sticky
  if (column.sticky !== undefined && !isBoolean(column.sticky)) {
    errors.push('Column sticky must be a boolean');
  }

  // Validate resizable
  if (column.resizable !== undefined && !isBoolean(column.resizable)) {
    errors.push('Column resizable must be a boolean');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// ============================================================================
// ACCESSIBILITY VALIDATION
// ============================================================================

function validateAriaAttributes(props: Record<string, unknown>): {
  isValid: boolean;
  warnings: string[];
} {
  const warnings: string[] = [];

  // Check for required aria-label or aria-labelledby
  if (!props['aria-label'] && !props['aria-labelledby']) {
    warnings.push(
      'DataTable should have either aria-label or aria-labelledby for accessibility'
    );
  }

  // Check for conflicting aria attributes
  if (props['aria-label'] && props['aria-labelledby']) {
    warnings.push(
      'Both aria-label and aria-labelledby are provided, prefer aria-labelledby'
    );
  }

  // Check for proper role attributes
  if (props.role && !['table', 'grid', 'treegrid'].includes(props.role)) {
    warnings.push('DataTable role should be table, grid, or treegrid');
  }

  return {
    isValid: warnings.length === 0,
    warnings,
  };
}

// ============================================================================
// PERFORMANCE VALIDATION
// ============================================================================

function validatePerformanceProps<T>(props: DataTableProps<T>): {
  isValid: boolean;
  warnings: string[];
} {
  const warnings: string[] = [];

  // Check for large datasets without virtual scrolling
  if (props.data.length > 1000 && !props.virtualScrolling) {
    warnings.push(
      'Consider enabling virtual scrolling for large datasets (>1000 rows)'
    );
  }

  // Check for many columns without sticky columns
  if (props.columns.length > 10 && !props.stickyColumns) {
    warnings.push(
      'Consider using sticky columns for tables with many columns (>10)'
    );
  }

  // Check for missing getRowId with selection
  if (props.selectable && props.selectable !== 'none' && !props.getRowId) {
    warnings.push(
      'Consider providing getRowId for better selection performance'
    );
  }

  return {
    isValid: warnings.length === 0,
    warnings,
  };
}

// ============================================================================
// EXPORT ALL VALIDATORS
// ============================================================================

export {
  validateData,
  validateColumns,
  validateColumn,
  validatePaginationConfig,
  validateSortDirection,
  validateAlignDirection,
  validateSelectionMode,
  validateCellPadding,
  validateResponsiveBreakpoint,
  validateDataTableProps,
  validateColumnProps,
  validateAriaAttributes,
  validatePerformanceProps,
};
