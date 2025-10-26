// ============================================================================
// MAIN COMPONENT EXPORTS
// ============================================================================

import React from 'react';
// Import main component
import DataTable from './DataTable';
import type { DataTableProps } from './types';
export type { DataTableProps } from './types';

// ============================================================================
// CONTAINER COMPONENT EXPORTS
// ============================================================================

import DataTableContainerComponent from './components/Container/DataTableContainer';
export type { DataTableContainerProps } from './types';

// ============================================================================
// HEADER COMPONENT EXPORTS
// ============================================================================

import DataTableHeaderComponent from './components/Header/DataTableHeader';
import DataTableTitleComponent from './components/Header/DataTableTitle';
import DataTableSubtitleComponent from './components/Header/DataTableSubtitle';
import DataTableActionsComponent from './components/Header/DataTableActions';
export type {
  DataTableHeaderProps,
  DataTableTitleProps,
  DataTableSubtitleProps,
  DataTableActionsProps,
} from './types';

// ============================================================================
// TABLE COMPONENT EXPORTS
// ============================================================================

import DataTableTableComponent from './components/Table/DataTableTable';
import DataTableHeadComponent from './components/Table/DataTableHead';
import DataTableBodyComponent from './components/Table/DataTableBody';
import DataTableRowComponent from './components/Table/DataTableRow';
import DataTableHeaderCellComponent from './components/Table/DataTableHeaderCell';
import DataTableCellComponent from './components/Table/DataTableCell';
export type {
  DataTableTableProps,
  DataTableHeadProps,
  DataTableBodyProps,
  DataTableRowProps,
  DataTableHeaderCellProps,
  DataTableCellProps,
} from './types';

// ============================================================================
// PAGINATION COMPONENT EXPORTS
// ============================================================================

import DataTablePaginationComponent from './components/Pagination/DataTablePagination';
import DataTablePageSizeComponent from './components/Pagination/DataTablePageSize';
export type { DataTablePaginationProps, DataTablePageSizeProps } from './types';

// ============================================================================
// LOADING COMPONENT EXPORTS
// ============================================================================

import DataTableSkeletonComponent from './components/Loading/DataTableSkeleton';
import DataTableLoadingComponent from './components/Loading/DataTableLoading';
export type { DataTableSkeletonProps, DataTableLoadingProps } from './types';

// ============================================================================
// EMPTY STATE COMPONENT EXPORTS
// ============================================================================

import DataTableEmptyComponent from './components/Empty/DataTableEmpty';
export type { DataTableEmptyProps } from './types';

// ============================================================================
// ACTION COMPONENT EXPORTS
// ============================================================================

import DataTableRowActionsComponent from './components/Actions/DataTableRowActions';
import DataTableBulkActionsComponent from './components/Actions/DataTableBulkActions';
export type {
  DataTableRowActionsProps,
  DataTableBulkActionsProps,
} from './types';

// ============================================================================
// HOOK EXPORTS
// ============================================================================

export { useDataTable } from './hooks/useDataTable';

// ============================================================================
// UTILITY EXPORTS
// ============================================================================

export {
  default as cn,
  conditionalClasses,
  createVariantClasses,
  createDataTableClasses,
  createThemeClasses,
  createFocusClasses,
  createAnimationClasses,
  createTransitionClasses,
  createResponsiveUtilityClasses,
  createStickyClasses,
  createZIndexClasses,
  createScrollbarClasses,
  createTruncationClasses,
  createSkeletonClasses,
} from './utils/classNames';

export {
  validateDataTableProps,
  validateColumnProps,
  validateAriaAttributes,
  validatePerformanceProps,
} from './utils/validators';

export {
  sortData,
  createSortConfig,
  toggleSortDirection,
  resetSortConfig,
  isColumnSorted,
  getColumnSortDirection,
  canSortColumn,
  validateSortConfig,
} from './utils/sorting';

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
} from './utils/filtering';

export {
  paginateData,
  calculatePaginationMetadata,
  createPaginationConfig,
  updatePaginationConfig,
  resetPagination,
  goToNextPage,
  goToPreviousPage,
  goToPage,
  goToFirstPage,
  goToLastPage,
  changePageSize,
  getAvailablePageSizes,
  generatePageNumbers,
  generateSmartPageNumbers,
  validatePaginationConfig,
  getPaginationSummary,
  getPaginationSummaryWithPages,
  isPaginationNeeded,
  getTotalPages,
} from './utils/pagination';

// ============================================================================
// CONSTANT EXPORTS
// ============================================================================

export * from './constants';

// ============================================================================
// COMPOUND COMPONENT API - No additional assignment needed as DataTable export is already compound
// ============================================================================

// Export the main component as default
export default DataTable;

// Export individual components as named exports
export const Container = DataTableContainerComponent;
export const Header = DataTableHeaderComponent;
export const Title = DataTableTitleComponent;
export const Subtitle = DataTableSubtitleComponent;
export const Actions = DataTableActionsComponent;
export const Table = DataTableTableComponent;
export const Head = DataTableHeadComponent;
export const Body = DataTableBodyComponent;
export const Row = DataTableRowComponent;
export const HeaderCell = DataTableHeaderCellComponent;
export const Cell = DataTableCellComponent;
export const Pagination = DataTablePaginationComponent;
export const PageSize = DataTablePageSizeComponent;
export const Skeleton = DataTableSkeletonComponent;
export const Loading = DataTableLoadingComponent;
export const Empty = DataTableEmptyComponent;
export const RowActions = DataTableRowActionsComponent;
export const BulkActions = DataTableBulkActionsComponent;

// Export the main component as named export too
export { DataTable };
