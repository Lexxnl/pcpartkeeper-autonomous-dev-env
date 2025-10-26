import { useMemo } from 'react';
import {
  PageHeaderProps,
  UsePageHeaderOptions,
  UsePageHeaderReturn,
} from '../types';
import { validatePageHeaderProps, createDebugInfo } from '../utils/validators';
import { cn, createVariantClasses } from '../utils/classNames';
import { PAGE_HEADER_VARIANTS, PAGE_HEADER_BORDERS } from '../constants';
import { logger } from '../../../utils/logger';

/**
 * Custom hook for PageHeader logic
 * Separates business logic from presentation and provides validated props
 *
 * @param props - PageHeader props
 * @param options - Hook options
 * @returns Processed props and computed values
 *
 * @example
 * ```tsx
 * const { headerClasses, ariaAttributes, validatedProps } = usePageHeader({
 *   variant: 'elevated',
 *   hasBorder: true,
 *   'aria-label': 'Main page header'
 * });
 * ```
 */
export function usePageHeader(
  props: PageHeaderProps,
  options: UsePageHeaderOptions = {}
): UsePageHeaderReturn {
  const {
    validateAria = true,
    generateIds = false,
    debugMode = false,
  } = options;

  // Destructure props with defaults
  const {
    children,
    className = '',
    role = 'banner',
    'aria-label': ariaLabel,
    hasBorder = true,
    variant = 'default',
    hidden = false,
    ...restProps
  } = props;

  // Validate props if enabled
  const validatedProps = useMemo(() => {
    if (validateAria) {
      return validatePageHeaderProps(restProps);
    }
    return restProps;
  }, [restProps, validateAria]);

  // Generate unique IDs if enabled
  const generatedIds = useMemo(() => {
    if (!generateIds) return {};

    const baseId = `page-header-${Math.random().toString(36).substr(2, 9)}`;
    return {
      headerId: `${baseId}-header`,
      titleId: `${baseId}-title`,
      descriptionId: `${baseId}-description`,
      navigationId: `${baseId}-navigation`,
      actionsId: `${baseId}-actions`,
    };
  }, [generateIds]);

  // Generate header classes
  const headerClasses = useMemo(() => {
    const baseClasses = 'w-full';
    const variantClasses = createVariantClasses(
      baseClasses,
      variant,
      PAGE_HEADER_VARIANTS
    );
    const borderClasses = hasBorder
      ? PAGE_HEADER_BORDERS.default
      : PAGE_HEADER_BORDERS.none;

    return cn(variantClasses, borderClasses, className);
  }, [variant, hasBorder, className]);

  // Generate ARIA attributes
  const ariaAttributes = useMemo(() => {
    const attrs: Record<string, string> = {};

    if (ariaLabel) {
      attrs['aria-label'] = ariaLabel;
    }

    if (generateIds) {
      attrs.id = generatedIds.headerId;
    }

    // Add role if not default
    if (role !== 'banner') {
      attrs.role = role;
    }

    return attrs;
  }, [ariaLabel, role, generateIds, generatedIds.headerId]);

  // Create debug information if enabled
  const debugInfo = useMemo(() => {
    if (!debugMode) return undefined;

    return createDebugInfo(props, 'PageHeader');
  }, [debugMode, props]);

  // Return early if hidden
  if (hidden) {
    return {
      headerClasses: 'hidden',
      ariaAttributes: {},
      validatedProps: {},
      role,
      children: null,
      debugInfo,
    };
  }

  return {
    headerClasses,
    ariaAttributes,
    validatedProps,
    role,
    children,
    debugInfo,
  };
}

/**
 * Hook for managing PageHeader context
 * Provides shared state and utilities for sub-components
 *
 * @param context - Context configuration
 * @returns Context values and utilities
 */
export function usePageHeaderContext(
  context: {
    variant?: string;
    spacing?: string;
    debugMode?: boolean;
  } = {}
) {
  const {
    variant = 'default',
    spacing = 'normal',
    debugMode = false,
  } = context;

  const contextValue = useMemo(
    () => ({
      variant,
      spacing,
      debugMode,
      // Generate consistent IDs for all sub-components
      generateId: (suffix: string) =>
        `page-header-${suffix}-${Math.random().toString(36).substr(2, 6)}`,
      // Shared class generation utilities
      createClasses: (base: string, conditional: Record<string, string>) =>
        cn(base, Object.values(conditional).filter(Boolean)),
      // Debug logging
      log: (message: string, data?: any) => {
        if (debugMode) {
          logger.log(`[PageHeader] ${message}`, data);
        }
      },
    }),
    [variant, spacing, debugMode]
  );

  return contextValue;
}

/**
 * Hook for managing responsive behavior
 * Provides responsive utilities and breakpoint detection
 *
 * @param breakpoints - Breakpoints to monitor
 * @returns Responsive utilities
 */
export function usePageHeaderResponsive(
  breakpoints: string[] = ['sm', 'md', 'lg']
) {
  // This would typically use a media query hook in a real implementation
  // For now, we'll provide a mock implementation
  const currentBreakpoint = useMemo(() => {
    // In a real implementation, this would use window.matchMedia
    // For now, return 'lg' as default
    return 'lg';
  }, []);

  const isBreakpoint = useMemo(() => {
    return (breakpoint: string) => {
      const breakpointOrder = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
      const currentIndex = breakpointOrder.indexOf(currentBreakpoint);
      const targetIndex = breakpointOrder.indexOf(breakpoint);
      return currentIndex >= targetIndex;
    };
  }, [currentBreakpoint]);

  const responsiveClasses = useMemo(() => {
    return (baseClasses: string, responsiveMap: Record<string, string>) => {
      const classes = [baseClasses];

      Object.entries(responsiveMap).forEach(([breakpoint, classValue]) => {
        if (isBreakpoint(breakpoint)) {
          classes.push(classValue);
        }
      });

      return cn(...classes);
    };
  }, [isBreakpoint]);

  return {
    currentBreakpoint,
    isBreakpoint,
    responsiveClasses,
  };
}

/**
 * Hook for managing focus and keyboard navigation
 * Provides focus management utilities
 *
 * @param options - Focus management options
 * @returns Focus utilities
 */
export function usePageHeaderFocus(
  options: {
    trapFocus?: boolean;
    restoreFocus?: boolean;
    initialFocus?: string;
  } = {}
) {
  const { trapFocus = false, restoreFocus = true, initialFocus } = options;

  const focusUtils = useMemo(
    () => ({
      // Focus management
      focusElement: (selector: string) => {
        const element = document.querySelector(selector);
        if (element instanceof HTMLElement) {
          element.focus();
        }
      },

      // Focus trap (simplified implementation)
      trapFocus: (container: HTMLElement) => {
        if (!trapFocus) return;

        const focusableElements = container.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === 'Tab') {
            if (e.shiftKey) {
              if (document.activeElement === firstElement) {
                lastElement?.focus();
                e.preventDefault();
              }
            } else {
              if (document.activeElement === lastElement) {
                firstElement?.focus();
                e.preventDefault();
              }
            }
          }
        };

        container.addEventListener('keydown', handleKeyDown);

        return () => {
          container.removeEventListener('keydown', handleKeyDown);
        };
      },

      // Restore focus
      restoreFocus: (element: HTMLElement) => {
        if (restoreFocus) {
          element.focus();
        }
      },
    }),
    [trapFocus, restoreFocus]
  );

  return focusUtils;
}
