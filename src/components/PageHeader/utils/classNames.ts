import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 * Handles conflicts and deduplication automatically
 *
 * @param inputs - Class values to merge
 * @returns Merged class string
 *
 * @example
 * ```tsx
 * cn('px-2 py-1', 'px-4', { 'bg-status-error': isActive })
 * // Returns: 'py-1 px-4 bg-status-error' (px-2 is overridden by px-4)
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Create conditional class names with better developer experience
 *
 * @param baseClasses - Base classes to always apply
 * @param conditions - Object of condition keys and their boolean values
 * @param conditionalClasses - Object mapping condition keys to class strings
 * @returns Merged class string
 *
 * @example
 * ```tsx
 * conditionalClasses(
 *   'px-2 py-1',
 *   { isActive: true, isDisabled: false },
 *   { isActive: 'bg-action-primary', isDisabled: 'opacity-50' }
 * )
 * // Returns: 'px-2 py-1 bg-action-primary'
 * ```
 */
export function conditionalClasses(
  baseClasses: string,
  conditions: Record<string, boolean | string | undefined>,
  conditionalClasses: Record<string, string>
): string {
  const classes = [baseClasses];

  Object.entries(conditions).forEach(([key, condition]) => {
    if (condition && conditionalClasses[key]) {
      classes.push(conditionalClasses[key]);
    }
  });

  return cn(...classes);
}

/**
 * Create variant-based class names with type safety
 *
 * @param baseClasses - Base classes to always apply
 * @param variant - The variant key
 * @param variants - Object mapping variant keys to class strings
 * @returns Merged class string
 *
 * @example
 * ```tsx
 * createVariantClasses('text-base', 'large', {
 *   small: 'text-sm',
 *   medium: 'text-base',
 *   large: 'text-lg'
 * })
 * // Returns: 'text-base text-lg'
 * ```
 */
export function createVariantClasses<T extends string>(
  baseClasses: string,
  variant: T,
  variants: Record<T, string>
): string {
  return cn(baseClasses, variants[variant]);
}

/**
 * Create responsive class names with breakpoint support
 *
 * @param baseClasses - Base classes
 * @param responsiveClasses - Object with breakpoint keys and class values
 * @returns Merged responsive class string
 *
 * @example
 * ```tsx
 * responsiveClasses('text-sm', {
 *   sm: 'text-base',
 *   md: 'text-lg',
 *   lg: 'text-xl'
 * })
 * // Returns: 'text-sm sm:text-base md:text-lg lg:text-xl'
 * ```
 */
export function responsiveClasses(
  baseClasses: string,
  responsiveClasses: Record<string, string>
): string {
  const classes = [baseClasses];

  Object.entries(responsiveClasses).forEach(([breakpoint, classValue]) => {
    if (classValue) {
      classes.push(`${breakpoint}:${classValue}`);
    }
  });

  return cn(...classes);
}

/**
 * Create spacing classes based on direction and spacing value
 *
 * @param direction - Direction of spacing
 * @param spacing - Spacing value
 * @param prefix - Class prefix (gap, space, p, m, etc.)
 * @returns Spacing class string
 *
 * @example
 * ```tsx
 * createSpacingClasses('horizontal', 'normal', 'gap')
 * // Returns: 'gap-2'
 *
 * createSpacingClasses('vertical', 'loose', 'space-y')
 * // Returns: 'space-y-4'
 * ```
 */
export function createSpacingClasses(
  direction: 'horizontal' | 'vertical',
  spacing: 'tight' | 'normal' | 'loose',
  prefix: string
): string {
  const spacingValues = {
    tight: '1',
    normal: '2',
    loose: '4',
  };

  const spacingValue = spacingValues[spacing];

  if (prefix === 'gap') {
    // For gap, horizontal is just gap-{value}, vertical is gap-y-{value}
    return direction === 'horizontal'
      ? `${prefix}-${spacingValue}`
      : `${prefix}-y-${spacingValue}`;
  } else {
    // For other prefixes like space-y, use the direction prefix
    const directionPrefix = direction === 'horizontal' ? 'x' : 'y';
    return `${prefix}-${directionPrefix}-${spacingValue}`;
  }
}

/**
 * Create size-based classes with consistent sizing
 *
 * @param baseClasses - Base classes
 * @param size - Size variant
 * @param sizeMap - Object mapping size keys to class values
 * @returns Merged size class string
 *
 * @example
 * ```tsx
 * createSizeClasses('h-4 w-4', 'lg', {
 *   sm: 'h-3 w-3',
 *   md: 'h-4 w-4',
 *   lg: 'h-6 w-6'
 * })
 * // Returns: 'h-4 w-4 h-6 w-6'
 * ```
 */
export function createSizeClasses<T extends string>(
  baseClasses: string,
  size: T,
  sizeMap: Record<T, string>
): string {
  return cn(baseClasses, sizeMap[size]);
}

/**
 * Create focus ring classes with consistent styling
 *
 * @param variant - Focus ring variant
 * @param offset - Ring offset value
 * @returns Focus ring class string
 *
 * @example
 * ```tsx
 * createFocusRing('default')
 * // Returns: 'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-page'
 * ```
 */
export function createFocusRing(
  variant: 'default' | 'subtle' | 'none' = 'default',
  offset: '1' | '2' = '2'
): string {
  const focusVariants = {
    default: `focus:outline-none focus-visible:ring-${offset} focus-visible:ring-accent-primary focus-visible:ring-offset-${offset} focus-visible:ring-offset-surface-page`,
    subtle: `focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-primary focus-visible:ring-offset-1`,
    none: 'focus:outline-none',
  };

  return focusVariants[variant];
}

/**
 * Create transition classes with consistent timing
 *
 * @param variant - Transition variant
 * @param properties - CSS properties to transition
 * @returns Transition class string
 *
 * @example
 * ```tsx
 * createTransition('default', 'colors')
 * // Returns: 'transition-colors duration-200 ease-in-out'
 * ```
 */
export function createTransition(
  variant: 'fast' | 'default' | 'slow' = 'default',
  properties: 'all' | 'colors' | 'opacity' | 'transform' = 'all'
): string {
  const durations = {
    fast: 'duration-150',
    default: 'duration-200',
    slow: 'duration-300',
  };

  const propertyMap = {
    all: 'transition-all',
    colors: 'transition-colors',
    opacity: 'transition-opacity',
    transform: 'transition-transform',
  };

  return cn(propertyMap[properties], durations[variant], 'ease-in-out');
}

/**
 * Create truncation classes with line clamping support
 *
 * @param lines - Number of lines to clamp to
 * @param variant - Truncation variant
 * @returns Truncation class string
 *
 * @example
 * ```tsx
 * createTruncation(2)
 * // Returns: 'overflow-hidden -webkit-box -webkit-box-orient-vertical -webkit-line-clamp-2'
 * ```
 */
export function createTruncation(
  lines: number = 1,
  variant: 'ellipsis' | 'clamp' = 'clamp'
): string {
  if (variant === 'ellipsis') {
    return lines === 1 ? 'truncate' : 'overflow-hidden';
  }

  if (lines === 1) {
    return 'truncate';
  }

  return cn(
    'overflow-hidden',
    'block',
    '-webkit-box',
    '-webkit-box-orient-vertical',
    `-webkit-line-clamp-${lines}`
  );
}

/**
 * Create responsive visibility classes
 *
 * @param hidden - Breakpoints to hide at
 * @param visible - Breakpoints to show at
 * @returns Visibility class string
 *
 * @example
 * ```tsx
 * createVisibility({ sm: true }, { md: true })
 * // Returns: 'hidden sm:block md:hidden'
 * ```
 */
export function createVisibility(
  hidden: Record<string, boolean> = {},
  visible: Record<string, boolean> = {}
): string {
  const classes: string[] = [];

  Object.entries(hidden).forEach(([breakpoint, isHidden]) => {
    if (isHidden) {
      classes.push(breakpoint === 'base' ? 'hidden' : `${breakpoint}:hidden`);
    }
  });

  Object.entries(visible).forEach(([breakpoint, isVisible]) => {
    if (isVisible) {
      classes.push(breakpoint === 'base' ? 'block' : `${breakpoint}:block`);
    }
  });

  return cn(...classes);
}
