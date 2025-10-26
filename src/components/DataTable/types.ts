import {
  ReactNode,
  ComponentType,
  HTMLAttributes,
  MouseEvent,
  KeyboardEvent,
} from 'react';

// ============================================================================
// BASE TYPES
// ============================================================================

export interface BaseComponentProps {
  children?: ReactNode;
  className?: string;
  hidden?: boolean;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'data-testid'?: string;
}

export interface ForwardedRefProps<T = HTMLElement> {
  ref?: React.Ref<T>;
}

// ============================================================================
// DATA TABLE CORE TYPES
// ============================================================================

export type SortDirection = 'asc' | 'desc' | 'none';
export type AlignDirection = 'start' | 'center' | 'end';
export type CellPadding = 'condensed' | 'normal' | 'spacious';
export type ResponsiveBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type SelectionMode = 'single' | 'multiple' | 'none';

export interface SortConfig {
  column: string;
  direction: SortDirection;
}

export interface PaginationConfig {
  pageSize: number;
  currentPage: number;
  totalItems: number;
  showPageSizeSelector?: boolean;
  pageSizeOptions?: number[];
}

export interface FilterConfig {
  column: string;
  value: unknown;
  operator:
    | 'equals'
    | 'contains'
    | 'startsWith'
    | 'endsWith'
    | 'gt'
    | 'lt'
    | 'gte'
    | 'lte';
}

// ============================================================================
// COLUMN DEFINITION TYPES
// ============================================================================

export interface Column<T = unknown> {
  key: string;
  header: string | ReactNode | ((column: Column<T>) => ReactNode);
  field?: keyof T | string;
  render?: (item: T, index: number, column: Column<T>) => ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  align?: AlignDirection;
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  hidden?: boolean | ResponsiveBreakpoint[];
  className?: string;
  headerClassName?: string;
  cellClassName?: string;
  sortBy?:
    | 'alphanumeric'
    | 'numeric'
    | 'date'
    | 'custom'
    | ((a: T, b: T) => number);
  filterBy?: (item: T, filterValue: unknown) => boolean;
  sticky?: boolean;
  resizable?: boolean;
}

// ============================================================================
// MAIN DATA TABLE TYPES
// ============================================================================

export interface DataTableProps<T = unknown>
  extends BaseComponentProps,
    ForwardedRefProps<HTMLDivElement> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  empty?: boolean;
  error?: string | ReactNode;
  sortable?: boolean;
  selectable?: SelectionMode;
  pagination?: PaginationConfig | boolean;
  cellPadding?: CellPadding;
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  compact?: boolean;
  stickyHeader?: boolean;
  stickyColumns?: number;
  virtualScrolling?: boolean;
  rowHeight?: number;
  onSort?: (sortConfig: SortConfig) => void;
  onSelect?: (selectedItems: T[], selectedIndices: number[]) => void;
  onRowClick?: (item: T, index: number, event: MouseEvent) => void;
  onRowDoubleClick?: (item: T, index: number, event: MouseEvent) => void;
  onRowKeyDown?: (item: T, index: number, event: KeyboardEvent) => void;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  onFilter?: (filters: FilterConfig[]) => void;
  getRowId?: (item: T, index: number) => string | number;
  getRowClassName?: (item: T, index: number) => string;
  getRowProps?: (item: T, index: number) => HTMLAttributes<HTMLTableRowElement>;
  emptyState?: ReactNode;
  loadingState?: ReactNode;
  errorState?: ReactNode;
}

// ============================================================================
// CONTAINER COMPONENT TYPES
// ============================================================================

export interface DataTableContainerProps
  extends BaseComponentProps,
    ForwardedRefProps<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  scrollable?: boolean;
  maxHeight?: string | number;
}

// ============================================================================
// HEADER COMPONENT TYPES
// ============================================================================

export interface DataTableHeaderProps
  extends BaseComponentProps,
    ForwardedRefProps<HTMLDivElement> {
  variant?: 'default' | 'minimal' | 'elevated';
  sticky?: boolean;
  border?: boolean;
  renderThead?: boolean;
}

export interface DataTableTitleProps
  extends BaseComponentProps,
    ForwardedRefProps<HTMLElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span';
  variant?: 'default' | 'large' | 'small';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
}

export interface DataTableSubtitleProps
  extends BaseComponentProps,
    ForwardedRefProps<HTMLDivElement> {
  variant?: 'default' | 'muted' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
}

export interface DataTableActionsProps
  extends BaseComponentProps,
    ForwardedRefProps<HTMLDivElement> {
  direction?: 'horizontal' | 'vertical';
  spacing?: 'tight' | 'normal' | 'loose';
  align?: 'start' | 'center' | 'end';
  wrap?: boolean;
  sticky?: boolean;
}

// ============================================================================
// TABLE COMPONENT TYPES
// ============================================================================

export interface DataTableTableProps
  extends BaseComponentProps,
    ForwardedRefProps<HTMLTableElement> {
  variant?: 'default' | 'bordered' | 'striped' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  striped?: boolean;
  bordered?: boolean;
  compact?: boolean;
  stickyHeader?: boolean;
  stickyColumns?: number;
}

export interface DataTableHeadProps
  extends BaseComponentProps,
    ForwardedRefProps<HTMLTableSectionElement> {
  sticky?: boolean;
  variant?: 'default' | 'minimal';
}

export interface DataTableBodyProps
  extends BaseComponentProps,
    ForwardedRefProps<HTMLTableSectionElement> {
  virtualScrolling?: boolean;
  rowHeight?: number;
  overscan?: number;
}

export interface DataTableRowProps<T = unknown>
  extends BaseComponentProps,
    ForwardedRefProps<HTMLTableRowElement> {
  item?: T;
  index?: number;
  selected?: boolean;
  hoverable?: boolean;
  striped?: boolean;
  onClick?: (event: MouseEvent) => void;
  onDoubleClick?: (event: MouseEvent) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  getRowProps?: (item: T, index: number) => HTMLAttributes<HTMLTableRowElement>;
}

export interface DataTableHeaderCellProps
  extends BaseComponentProps,
    ForwardedRefProps<HTMLTableCellElement> {
  column?: Column;
  sortable?: boolean;
  sortDirection?: SortDirection;
  align?: AlignDirection;
  resizable?: boolean;
  sticky?: boolean;
  onSort?: (column: string) => void;
  onResize?: (column: string, width: number) => void;
}

export interface DataTableCellProps<T = unknown>
  extends BaseComponentProps,
    ForwardedRefProps<HTMLTableCellElement> {
  item?: T;
  index?: number;
  column?: Column<T>;
  align?: AlignDirection;
  sticky?: boolean;
  render?: (item: T, index: number, column: Column<T>) => ReactNode;
}

// ============================================================================
// PAGINATION COMPONENT TYPES
// ============================================================================

export interface DataTablePaginationProps
  extends BaseComponentProps,
    ForwardedRefProps<HTMLDivElement> {
  config: PaginationConfig;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  showPageSizeSelector?: boolean;
  showPageInfo?: boolean;
  showPageNumbers?: boolean;
  variant?: 'default' | 'minimal' | 'compact';
  align?: 'start' | 'center' | 'end' | 'between';
}

export interface DataTablePageSizeProps
  extends BaseComponentProps,
    ForwardedRefProps<HTMLSelectElement> {
  value: number;
  options: number[];
  onChange: (pageSize: number) => void;
  disabled?: boolean;
}

// ============================================================================
// LOADING COMPONENT TYPES
// ============================================================================

export interface DataTableSkeletonProps
  extends BaseComponentProps,
    ForwardedRefProps<HTMLDivElement> {
  rows?: number;
  columns?: number;
  cellPadding?: CellPadding;
  variant?: 'default' | 'minimal';
}

export interface DataTableLoadingProps
  extends BaseComponentProps,
    ForwardedRefProps<HTMLDivElement> {
  message?: string;
  variant?: 'spinner' | 'skeleton' | 'dots';
  size?: 'sm' | 'md' | 'lg';
}

// ============================================================================
// EMPTY STATE COMPONENT TYPES
// ============================================================================

export interface DataTableEmptyProps
  extends BaseComponentProps,
    ForwardedRefProps<HTMLDivElement> {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  variant?: 'default' | 'minimal' | 'illustrated';
}

// ============================================================================
// ACTION COMPONENT TYPES
// ============================================================================

export interface DataTableRowActionsProps<T = unknown>
  extends BaseComponentProps,
    ForwardedRefProps<HTMLDivElement> {
  item: T;
  index: number;
  actions?: Array<{
    key: string;
    label: string;
    icon?: ReactNode;
    onClick: (item: T, index: number) => void;
    variant?: 'default' | 'danger' | 'primary';
    disabled?: boolean;
    hidden?: boolean;
  }>;
  variant?: 'dropdown' | 'inline' | 'overflow';
  align?: 'start' | 'center' | 'end';
}

export interface DataTableBulkActionsProps<T = unknown>
  extends BaseComponentProps,
    ForwardedRefProps<HTMLDivElement> {
  selectedItems: T[];
  selectedIndices: number[];
  actions?: Array<{
    key: string;
    label: string;
    icon?: ReactNode;
    onClick: (items: T[], indices: number[]) => void;
    variant?: 'default' | 'danger' | 'primary';
    disabled?: boolean;
    hidden?: boolean;
  }>;
  variant?: 'dropdown' | 'inline' | 'floating';
  align?: 'start' | 'center' | 'end';
}

// ============================================================================
// HOOK TYPES
// ============================================================================

export interface UseDataTableOptions<T = unknown> {
  data: T[];
  columns: Column<T>[];
  sortable?: boolean;
  selectable?: SelectionMode;
  pagination?: PaginationConfig | boolean;
  onSort?: (sortConfig: SortConfig) => void;
  onSelect?: (selectedItems: T[], selectedIndices: number[]) => void;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  getRowId?: (item: T, index: number) => string | number;
}

export interface UseDataTableReturn<T = unknown> {
  // Data
  processedData: T[];
  selectedItems: T[];
  selectedIndices: number[];
  sortConfig: SortConfig | null;

  // Pagination
  paginatedData: T[];
  paginationConfig: PaginationConfig | null;

  // Actions
  handleSort: (column: string) => void;
  handleSelect: (item: T, index: number, selected: boolean) => void;
  handleSelectAll: (selected: boolean) => void;
  handlePageChange: (page: number) => void;
  handlePageSizeChange: (pageSize: number) => void;

  // Utilities
  isSelected: (item: T, index: number) => boolean;
  isAllSelected: boolean;
  isPartiallySelected: boolean;
  getRowId: (item: T, index: number) => string | number;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | ClassValue[];

export interface VariantConfig<T extends string> {
  [key: string]: string;
}

export interface ConditionalClasses {
  [key: string]: string;
}

export interface ResponsiveConfig<T> {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
}

// ============================================================================
// COMPONENT REGISTRY TYPES
// ============================================================================

export interface DataTableComponents {
  Container: ComponentType<DataTableContainerProps>;
  Header: ComponentType<DataTableHeaderProps>;
  Title: ComponentType<DataTableTitleProps>;
  Subtitle: ComponentType<DataTableSubtitleProps>;
  Actions: ComponentType<DataTableActionsProps>;
  Table: ComponentType<DataTableTableProps>;
  Head: ComponentType<DataTableHeadProps>;
  Body: ComponentType<DataTableBodyProps>;
  Row: ComponentType<DataTableRowProps>;
  HeaderCell: ComponentType<DataTableHeaderCellProps>;
  Cell: ComponentType<DataTableCellProps>;
  Pagination: ComponentType<DataTablePaginationProps>;
  PageSize: ComponentType<DataTablePageSizeProps>;
  Skeleton: ComponentType<DataTableSkeletonProps>;
  Loading: ComponentType<DataTableLoadingProps>;
  Empty: ComponentType<DataTableEmptyProps>;
  RowActions: ComponentType<DataTableRowActionsProps>;
  BulkActions: ComponentType<DataTableBulkActionsProps>;
}
