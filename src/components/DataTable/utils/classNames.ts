// ============================================================================
// CLASS NAME UTILITIES
// ============================================================================

import { ClassValue } from '../types';
import {
  BASE_CLASSES,
  STATE_CLASSES,
  RESPONSIVE_CLASSES,
  THEME_COLORS,
} from '../constants';

/**
 * Combines class names into a single string
 * Similar to clsx but optimized for our use case
 */
function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === 'string') {
      classes.push(input);
    } else if (typeof input === 'number') {
      classes.push(String(input));
    } else if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) classes.push(nested);
    } else if (typeof input === 'object' && input !== null) {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key);
      }
    }
  }

  return classes.join(' ');
}

/**
 * Creates conditional classes based on conditions
 */
function conditionalClasses(
  conditions: Record<string, boolean | undefined | null>
): string {
  return Object.entries(conditions)
    .filter(([, condition]) => condition)
    .map(([className]) => className)
    .join(' ');
}

/**
 * Creates variant classes for components
 */
function createVariantClasses<T extends string>(
  baseClass: string,
  variant: T | undefined,
  variants: Record<T, string>
): string {
  if (!variant || !variants[variant]) {
    return baseClass;
  }

  return cn(baseClass, variants[variant]);
}

/**
 * Creates responsive classes for hiding/showing elements
 */
function createResponsiveClasses(
  breakpoints: string[],
  type: 'hidden' | 'visible' = 'hidden'
): string {
  return breakpoints
    .map(
      bp =>
        RESPONSIVE_CLASSES[type][
          bp as keyof (typeof RESPONSIVE_CLASSES)[typeof type]
        ]
    )
    .join(' ');
}

/**
 * Creates data table specific class combinations
 */
function createDataTableClasses(
  baseClass: keyof typeof BASE_CLASSES,
  options: {
    variant?: string;
    state?: keyof typeof STATE_CLASSES;
    responsive?: string[];
    custom?: string;
  } = {}
): string {
  const classes = [BASE_CLASSES[baseClass]];

  if (options.variant) {
    classes.push(options.variant);
  }

  if (options.state) {
    classes.push(STATE_CLASSES[options.state]);
  }

  if (options.responsive) {
    classes.push(createResponsiveClasses(options.responsive));
  }

  if (options.custom) {
    classes.push(options.custom);
  }

  return cn(...classes);
}

/**
 * Creates theme-aware classes using semantic tokens
 */
function createThemeClasses(
  element: 'container' | 'header' | 'row' | 'cell' | 'button',
  variant: 'default' | 'hover' | 'active' | 'selected' | 'disabled' = 'default'
): string {
  const themeMap = {
    container: {
      default: cn(THEME_COLORS.surface.primary, THEME_COLORS.border.default),
      hover: THEME_COLORS.surface.hover,
      active: THEME_COLORS.surface.active,
    },
    header: {
      default: cn(THEME_COLORS.surface.secondary, THEME_COLORS.border.default),
      hover: THEME_COLORS.surface.hover,
    },
    row: {
      default: THEME_COLORS.surface.primary,
      hover: THEME_COLORS.surface.hover,
      selected: THEME_COLORS.surface.tertiary,
      striped: THEME_COLORS.surface.secondary,
    },
    cell: {
      default: THEME_COLORS.text.secondary,
      primary: THEME_COLORS.text.primary,
      muted: THEME_COLORS.text.muted,
      disabled: THEME_COLORS.text.disabled,
    },
    button: {
      default: cn(THEME_COLORS.surface.tertiary, THEME_COLORS.border.default),
      hover: THEME_COLORS.surface.hover,
      active: THEME_COLORS.surface.active,
      primary: THEME_COLORS.action.primary,
      danger: THEME_COLORS.action.danger,
    },
  };

  return themeMap[element]?.[variant] || '';
}

/**
 * Creates accessibility classes for focus states
 */
function createFocusClasses(
  element: 'button' | 'row' | 'cell' | 'header',
  variant: 'default' | 'visible' | 'ring' = 'default'
): string {
  const focusMap = {
    button: {
      default:
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2',
      visible:
        'focus:outline-2 focus:outline-accent-primary focus:outline-offset-2',
      ring: 'focus:ring-2 focus:ring-accent-primary focus:ring-offset-2',
    },
    row: {
      default: 'focus:outline-none focus-visible:bg-surface-hover',
      visible: 'focus:outline-2 focus:outline-accent-primary',
      ring: 'focus:ring-1 focus:ring-accent-primary',
    },
    cell: {
      default: 'focus:outline-none',
      visible: 'focus:outline-1 focus:outline-accent-primary',
      ring: 'focus:ring-1 focus:ring-accent-primary',
    },
    header: {
      default:
        'focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-primary',
      visible: 'focus:outline-1 focus:outline-accent-primary',
      ring: 'focus:ring-1 focus:ring-accent-primary',
    },
  };

  return focusMap[element]?.[variant] || '';
}

/**
 * Creates animation classes for smooth transitions
 */
function createAnimationClasses(
  type: 'fade' | 'slide' | 'scale' | 'pulse' | 'spin',
  direction?: 'up' | 'down' | 'left' | 'right' | 'in' | 'out'
): string {
  const animationMap = {
    fade: 'animate-fade-in',
    slide: direction === 'up' ? 'animate-slide-up' : 'animate-slide-down',
    scale: 'animate-scale-in',
    pulse: 'animate-pulse',
    spin: 'animate-spin',
  };

  return animationMap[type] || '';
}

/**
 * Creates transition classes for smooth interactions
 */
function createTransitionClasses(
  properties: string[] = ['all'],
  duration: 'fast' | 'smooth' | 'slow' = 'smooth'
): string {
  const durationMap = {
    fast: 'transition-fast',
    smooth: 'transition-smooth',
    slow: 'transition-slow',
  };

  const propertyClasses = properties
    .map(prop => `transition-${prop}`)
    .join(' ');

  return cn(propertyClasses, durationMap[duration]);
}

/**
 * Creates responsive utility classes
 */
function createResponsiveUtilityClasses(
  property: string,
  values: Record<string, string>
): string {
  return Object.entries(values)
    .map(([breakpoint, value]) => {
      if (breakpoint === 'default') {
        return value;
      }
      return `${breakpoint}:${value}`;
    })
    .join(' ');
}

/**
 * Creates sticky positioning classes
 */
function createStickyClasses(
  position: 'top' | 'left' | 'right' | 'bottom',
  offset?: number
): string {
  const positionMap = {
    top: 'sticky top-0',
    left: 'sticky left-0',
    right: 'sticky right-0',
    bottom: 'sticky bottom-0',
  };

  const baseClass = positionMap[position];

  if (offset !== undefined) {
    const offsetClass = `top-${offset}`;
    return cn(baseClass, offsetClass);
  }

  return baseClass;
}

/**
 * Creates z-index classes for layering
 */
function createZIndexClasses(
  level: 'base' | 'dropdown' | 'sticky' | 'modal' | 'toast'
): string {
  const zIndexMap = {
    base: 'z-0',
    dropdown: 'z-10',
    sticky: 'z-20',
    modal: 'z-50',
    toast: 'z-50',
  };

  return zIndexMap[level] || 'z-0';
}

/**
 * Creates scrollbar classes for custom styling
 */
function createScrollbarClasses(
  variant: 'default' | 'thin' | 'none' | 'dark' = 'dark'
): string {
  const scrollbarMap = {
    default: 'scrollbar-default',
    thin: 'scrollbar-thin',
    none: 'scrollbar-none',
    dark: 'scrollbar-dark',
  };

  return scrollbarMap[variant] || 'scrollbar-dark';
}

/**
 * Creates truncation classes for text overflow
 */
function createTruncationClasses(lines: 1 | 2 | 3 | 'none' = 1): string {
  if (lines === 'none') {
    return 'truncate';
  }

  if (lines === 1) {
    return 'truncate';
  }

  return `truncate-${lines}`;
}

/**
 * Creates loading skeleton classes
 */
function createSkeletonClasses(
  variant: 'default' | 'text' | 'circular' | 'rectangular' = 'default'
): string {
  const skeletonMap = {
    default: 'skeleton',
    text: 'skeleton h-4 w-full',
    circular: 'skeleton rounded-full',
    rectangular: 'skeleton rounded',
  };

  return skeletonMap[variant] || 'skeleton';
}

// ============================================================================
// EXPORT ALL UTILITIES
// ============================================================================

export {
  cn,
  conditionalClasses,
  createVariantClasses,
  createResponsiveClasses,
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
};

export default cn;
