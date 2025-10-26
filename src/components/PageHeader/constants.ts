// ============================================================================
// PAGE HEADER CONSTANTS
// ============================================================================

export const PAGE_HEADER_VARIANTS = {
  default: 'bg-surface-page',
  minimal: 'bg-transparent',
  elevated: 'bg-surface-page shadow-lg',
} as const;

export const PAGE_HEADER_BORDERS = {
  default: 'border-b border-border-default',
  minimal: 'border-b border-border-subtle',
  none: '',
} as const;

// ============================================================================
// TITLE COMPONENT CONSTANTS
// ============================================================================

export const TITLE_VARIANTS = {
  subtitle: 'text-lg',
  medium: 'text-xl',
  large: 'text-2xl',
  xl: 'text-3xl',
  '2xl': 'text-4xl',
} as const;

export const TITLE_WEIGHTS = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
} as const;

export const TITLE_COLORS = {
  default: 'text-text-primary',
  transparent: 'text-text-primary',
  muted: 'text-text-muted',
} as const;

export const TITLE_ALIGNMENTS = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
} as const;

export const TITLE_SPACING = {
  tight: 'gap-1',
  normal: 'gap-2',
  loose: 'gap-4',
} as const;

// ============================================================================
// DESCRIPTION CONSTANTS
// ============================================================================

export const DESCRIPTION_SIZES = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
} as const;

export const DESCRIPTION_COLORS = {
  default: 'text-text-muted',
  transparent: 'text-text-muted',
  muted: 'text-text-disabled',
} as const;

// ============================================================================
// NAVIGATION CONSTANTS
// ============================================================================

export const NAVIGATION_VARIANTS = {
  default: 'nav-border',
  minimal: 'border-b border-border-subtle',
  pills: 'bg-surface-tertiary rounded-lg p-1',
} as const;

export const NAVIGATION_ORIENTATIONS = {
  horizontal: 'flex-row space-x-6',
  vertical: 'flex-col space-y-2',
} as const;

// ============================================================================
// ACTION CONSTANTS
// ============================================================================

export const ACTION_DIRECTIONS = {
  horizontal: 'flex-row',
  vertical: 'flex-col',
} as const;

export const ACTION_SPACING = {
  tight: 'gap-1',
  normal: 'gap-2',
  loose: 'gap-4',
} as const;

export const ACTION_ALIGNMENTS = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
} as const;

// ============================================================================
// VISUAL CONSTANTS
// ============================================================================

export const VISUAL_SIZES = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
} as const;

export const VISUAL_SPACING = {
  tight: 'mr-1',
  normal: 'mr-2',
  loose: 'mr-3',
} as const;

export const VISUAL_POSITIONS = {
  leading: 'mr-2',
  trailing: 'ml-2',
} as const;

// ============================================================================
// CONTEXT CONSTANTS
// ============================================================================

export const CONTEXT_VARIANTS = {
  default: 'mb-2',
  minimal: 'mb-1',
  elevated: 'mb-4 p-3 bg-surface-secondary rounded-lg',
} as const;

export const CONTEXT_SPACING = {
  tight: 'gap-1',
  normal: 'gap-2',
  loose: 'gap-4',
} as const;

export const CONTEXT_ALIGNMENTS = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
} as const;

// ============================================================================
// PARENT LINK CONSTANTS
// ============================================================================

export const PARENT_LINK_VARIANTS = {
  default:
    'text-sm text-accent-primary hover:text-accent-primary-emphasis hover:underline transition-colors',
  minimal: 'text-sm text-text-muted hover:text-text-primary transition-colors',
  button:
    'inline-flex items-center px-3 py-1 text-sm bg-surface-tertiary text-text-primary rounded-md hover:bg-surface-hover transition-colors',
} as const;

export const PARENT_LINK_SIZES = {
  sm: 'text-xs px-2 py-1',
  md: 'text-sm px-3 py-1',
  lg: 'text-base px-4 py-2',
} as const;

// ============================================================================
// ARIA CONSTANTS
// ============================================================================

export const ARIA_ROLES = {
  banner: 'banner',
  header: 'header',
} as const;

export const ARIA_LABELS = {
  mainNavigation: 'Main navigation',
  breadcrumb: 'Breadcrumb',
  pageActions: 'Page actions',
  pageContext: 'Page context',
} as const;

// ============================================================================
// RESPONSIVE BREAKPOINTS
// ============================================================================

export const BREAKPOINTS = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ============================================================================
// ANIMATION CONSTANTS
// ============================================================================

export const ANIMATIONS = {
  transition: 'transition-all duration-200 ease-in-out',
  transitionFast: 'transition-all duration-150 ease-in-out',
  transitionSlow: 'transition-all duration-300 ease-in-out',
  hover: 'hover:scale-105',
  active: 'active:scale-95',
} as const;

// ============================================================================
// FOCUS CONSTANTS
// ============================================================================

export const FOCUS_STYLES = {
  ring: 'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-page',
  ringSubtle:
    'focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-primary focus-visible:ring-offset-1',
  ringNone: 'focus:outline-none',
} as const;
