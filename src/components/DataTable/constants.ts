// ============================================================================
// DATA TABLE CONSTANTS
// ============================================================================

import {
  CellPadding,
  ResponsiveBreakpoint,
  SelectionMode,
  SortDirection,
} from './types';

// ============================================================================
// DESIGN TOKENS
// ============================================================================

export const CELL_PADDING: Record<CellPadding, string> = {
  condensed: 'px-3 py-2',  // Default compact styling
  normal: 'px-3 py-2',     // Same as condensed (compact is now default)
  spacious: 'px-6 py-4',   // Spacious variant for more breathing room
};

export const TABLE_SIZES = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

export const ALIGN_CLASSES = {
  start: 'text-left',
  center: 'text-center',
  end: 'text-right',
};

export const RESPONSIVE_BREAKPOINTS: ResponsiveBreakpoint[] = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
];

export const BREAKPOINT_VALUES = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// ============================================================================
// DEFAULT CONFIGURATIONS
// ============================================================================

export const DEFAULT_PAGINATION = {
  pageSize: 25,
  currentPage: 1,
  totalItems: 0,
  showPageSizeSelector: true,
  pageSizeOptions: [10, 25, 50, 100],
};

export const DEFAULT_SORT_CONFIG = {
  column: '',
  direction: 'none' as SortDirection,
};

export const DEFAULT_SELECTION_MODE: SelectionMode = 'none';

export const DEFAULT_CELL_PADDING: CellPadding = 'condensed';

// ============================================================================
// COMPONENT VARIANTS
// ============================================================================

export const CONTAINER_VARIANTS = {
  default: 'data-table-container',
  bordered: 'data-table-container-bordered',
  elevated: 'data-table-container-elevated',
  minimal: 'data-table-container-minimal',
};

export const HEADER_VARIANTS = {
  default: 'data-table-header',
  minimal: 'data-table-header-minimal',
  elevated: 'data-table-header-elevated',
};

export const TABLE_VARIANTS = {
  default: 'data-table-table',
  bordered: 'data-table-table-bordered',
  striped: 'data-table-table-striped',
  minimal: 'data-table-table-minimal',
};

export const PAGINATION_VARIANTS = {
  default: 'data-table-pagination',
  minimal: 'data-table-pagination-minimal',
  compact: 'data-table-pagination-compact',
};

export const EMPTY_VARIANTS = {
  default: 'data-table-empty',
  minimal: 'data-table-empty-minimal',
  illustrated: 'data-table-empty-illustrated',
};

// ============================================================================
// ACCESSIBILITY CONSTANTS
// ============================================================================

export const ARIA_LABELS = {
  table: 'Data table',
  sortableColumn: 'Sort by column',
  selectableRow: 'Select row',
  selectAllRows: 'Select all rows',
  pagination: 'Table pagination',
  pageSize: 'Items per page',
  loading: 'Table is loading',
  empty: 'No data available',
  error: 'Error loading data',
};

export const KEYBOARD_SHORTCUTS = {
  selectAll: 'Ctrl+A',
  selectRow: 'Space',
  sortColumn: 'Enter',
  nextPage: 'ArrowRight',
  previousPage: 'ArrowLeft',
  firstPage: 'Home',
  lastPage: 'End',
};

// ============================================================================
// PERFORMANCE CONSTANTS
// ============================================================================

export const VIRTUAL_SCROLLING = {
  defaultRowHeight: 48,
  overscan: 5,
  threshold: 1000, // Enable virtual scrolling for 1000+ rows
};

export const DEBOUNCE_DELAYS = {
  search: 300,
  resize: 100,
  scroll: 16,
};

// ============================================================================
// VALIDATION CONSTANTS
// ============================================================================

export const VALIDATION_RULES = {
  minPageSize: 1,
  maxPageSize: 1000,
  minPage: 1,
  maxColumns: 50,
  maxRows: 100000,
};

export const ERROR_MESSAGES = {
  invalidData: 'Data must be an array',
  invalidColumns: 'Columns must be an array',
  invalidPageSize: 'Page size must be between 1 and 1000',
  invalidPage: 'Page number must be greater than 0',
  missingKey: 'Column must have a key property',
  missingField: 'Column must have either field or render property',
  invalidSortDirection: 'Sort direction must be asc, desc, or none',
  invalidAlignDirection: 'Align direction must be start, center, or end',
  invalidSelectionMode: 'Selection mode must be single, multiple, or none',
};

// ============================================================================
// CSS CLASS CONSTANTS
// ============================================================================

export const BASE_CLASSES = {
  container: 'data-table',
  header: 'data-table-header',
  title: 'data-table-title',
  subtitle: 'data-table-subtitle',
  actions: 'data-table-actions',
  table: 'data-table-table',
  head: 'data-table-head',
  body: 'data-table-body',
  row: 'data-table-row',
  headerCell: 'data-table-header-cell',
  cell: 'data-table-cell',
  pagination: 'data-table-pagination',
  empty: 'data-table-empty',
  loading: 'data-table-loading',
  skeleton: 'data-table-skeleton',
  rowActions: 'data-table-row-actions',
  bulkActions: 'data-table-bulk-actions',
};

export const STATE_CLASSES = {
  selected: 'data-table-row-selected',
  hover: 'data-table-row-hover',
  striped: 'data-table-row-striped',
  loading: 'data-table-loading',
  empty: 'data-table-empty',
  error: 'data-table-error',
  sortable: 'data-table-header-sortable',
  sorted: 'data-table-header-sorted',
  resizable: 'data-table-header-resizable',
  sticky: 'data-table-sticky',
  compact: 'data-table-compact',
};

export const RESPONSIVE_CLASSES = {
  hidden: {
    xs: 'hidden xs:block',
    sm: 'hidden sm:block',
    md: 'hidden md:block',
    lg: 'hidden lg:block',
    xl: 'hidden xl:block',
    '2xl': 'hidden 2xl:block',
  },
  visible: {
    xs: 'block xs:hidden',
    sm: 'block sm:hidden',
    md: 'block md:hidden',
    lg: 'block lg:hidden',
    xl: 'block xl:hidden',
    '2xl': 'block 2xl:hidden',
  },
};

// ============================================================================
// ICON CONSTANTS
// ============================================================================

export const SORT_ICONS = {
  none: '↕',
  asc: '↑',
  desc: '↓',
};

export const PAGINATION_ICONS = {
  first: '⏮',
  previous: '◀',
  next: '▶',
  last: '⏭',
  more: '⋯',
};

export const ACTION_ICONS = {
  select: '☐',
  selected: '☑',
  partial: '☒',
  sort: '↕',
  filter: '🔍',
  more: '⋯',
  loading: '⟳',
};

// ============================================================================
// ANIMATION CONSTANTS
// ============================================================================

export const ANIMATIONS = {
  fadeIn: 'animate-fade-in',
  slideUp: 'animate-slide-up',
  slideDown: 'animate-slide-down',
  scaleIn: 'animate-scale-in',
  pulse: 'animate-pulse',
  spin: 'animate-spin',
};

export const TRANSITIONS = {
  fast: 'transition-fast',
  smooth: 'transition-smooth',
  slow: 'transition-slow',
};

// ============================================================================
// THEME CONSTANTS
// ============================================================================

export const THEME_COLORS = {
  surface: {
    primary: 'bg-surface-primary',
    secondary: 'bg-surface-secondary',
    tertiary: 'bg-surface-tertiary',
    hover: 'bg-surface-hover',
    active: 'bg-surface-active',
  },
  text: {
    primary: 'text-text-primary',
    secondary: 'text-text-secondary',
    muted: 'text-text-muted',
    placeholder: 'text-text-placeholder',
    disabled: 'text-text-disabled',
  },
  border: {
    default: 'border-border-default',
    subtle: 'border-border-subtle',
    muted: 'border-border-muted',
    emphasis: 'border-border-emphasis',
  },
  action: {
    primary: 'bg-action-primary',
    primaryHover: 'bg-action-primary-hover',
    primaryActive: 'bg-action-primary-active',
    danger: 'bg-action-danger',
    dangerHover: 'bg-action-danger-hover',
    dangerMuted: 'bg-action-danger-muted',
  },
  accent: {
    primary: 'text-accent-primary',
    primaryEmphasis: 'text-accent-primary-emphasis',
    secondary: 'text-accent-secondary',
    tertiary: 'text-accent-tertiary',
  },
};

// ============================================================================
// EXPORT ALL CONSTANTS
// ============================================================================

export const DATA_TABLE_CONSTANTS = {
  CELL_PADDING,
  TABLE_SIZES,
  ALIGN_CLASSES,
  RESPONSIVE_BREAKPOINTS,
  BREAKPOINT_VALUES,
  DEFAULT_PAGINATION,
  DEFAULT_SORT_CONFIG,
  DEFAULT_SELECTION_MODE,
  DEFAULT_CELL_PADDING,
  CONTAINER_VARIANTS,
  HEADER_VARIANTS,
  TABLE_VARIANTS,
  PAGINATION_VARIANTS,
  EMPTY_VARIANTS,
  ARIA_LABELS,
  KEYBOARD_SHORTCUTS,
  VIRTUAL_SCROLLING,
  DEBOUNCE_DELAYS,
  VALIDATION_RULES,
  ERROR_MESSAGES,
  BASE_CLASSES,
  STATE_CLASSES,
  RESPONSIVE_CLASSES,
  SORT_ICONS,
  PAGINATION_ICONS,
  ACTION_ICONS,
  ANIMATIONS,
  TRANSITIONS,
  THEME_COLORS,
} as const;
