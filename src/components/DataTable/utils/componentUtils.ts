import React from 'react';
import cn from './classNames';
import { BaseComponentProps } from '../types';

/**
 * Component Utilities - Centralized utilities for common component patterns
 * 
 * ARCHITECTURAL DECISION: This file centralizes common patterns used across
 * DataTable components to reduce code duplication and ensure consistency.
 * This includes className building, prop merging, and common event handlers.
 * 
 * PERFORMANCE OPTIMIZATION: These utilities are designed to be lightweight
 * and memoization-friendly, allowing components to use them without
 * performance concerns.
 */

// ============================================================================
// CLASSNAME UTILITIES
// ============================================================================

/**
 * Builds a consistent className string for DataTable components
 * 
 * @param baseClass - The base CSS class name
 * @param conditionalClasses - Object of conditional classes
 * @param customClass - Custom className from props
 * @returns Combined className string
 */
export function buildComponentClasses(
  baseClass: string,
  conditionalClasses: Record<string, boolean> = {},
  customClass?: string
): string {
  return cn(
    baseClass,
    conditionalClasses,
    customClass
  );
}

/**
 * Builds responsive className strings
 * 
 * @param baseClass - The base CSS class name
 * @param responsiveClasses - Object of responsive classes
 * @param customClass - Custom className from props
 * @returns Combined responsive className string
 */
export function buildResponsiveClasses(
  baseClass: string,
  responsiveClasses: Record<string, string> = {},
  customClass?: string
): string {
  return cn(
    baseClass,
    ...Object.values(responsiveClasses),
    customClass
  );
}

// ============================================================================
// PROP UTILITIES
// ============================================================================

/**
 * Merges component props with default values
 * 
 * @param defaultProps - Default prop values
 * @param props - Incoming props
 * @returns Merged props object
 */
export function mergeProps<T extends Record<string, any>>(
  defaultProps: Partial<T>,
  props: T
): T {
  return {
    ...defaultProps,
    ...props,
  };
}

/**
 * Extracts common props from component props
 * 
 * @param props - Component props
 * @returns Common props object
 */
export function extractCommonProps(props: BaseComponentProps) {
  const {
    children,
    className,
    hidden,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    'data-testid': dataTestId,
    ...rest
  } = props;

  return {
    commonProps: {
      children,
      className,
      hidden,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      'data-testid': dataTestId,
    },
    restProps: rest,
  };
}

// ============================================================================
// EVENT HANDLER UTILITIES
// ============================================================================

/**
 * Creates a memoized event handler
 * 
 * @param handler - Event handler function
 * @param deps - Dependencies array
 * @returns Memoized event handler
 */
export function createEventHandler<T extends (...args: any[]) => void>(
  handler: T,
  deps: React.DependencyList
): T {
  return React.useCallback(handler, deps) as T;
}

/**
 * Combines multiple event handlers into one
 * 
 * @param handlers - Array of event handlers
 * @returns Combined event handler
 */
export function combineEventHandlers<T extends (...args: any[]) => void>(
  ...handlers: (T | undefined)[]
): T | undefined {
  const validHandlers = handlers.filter(Boolean) as T[];
  
  if (validHandlers.length === 0) return undefined;
  if (validHandlers.length === 1) return validHandlers[0];
  
  return ((...args: Parameters<T>) => {
    validHandlers.forEach(handler => handler(...args));
  }) as T;
}

// ============================================================================
// STYLE UTILITIES
// ============================================================================

/**
 * Builds inline styles object
 * 
 * @param styles - Style properties
 * @returns Style object
 */
export function buildStyles(styles: React.CSSProperties): React.CSSProperties {
  return styles;
}

/**
 * Builds responsive styles
 * 
 * @param baseStyles - Base style properties
 * @param responsiveStyles - Responsive style overrides
 * @returns Combined style object
 */
export function buildResponsiveStyles(
  baseStyles: React.CSSProperties,
  responsiveStyles: Record<string, React.CSSProperties> = {}
): React.CSSProperties {
  return {
    ...baseStyles,
    ...Object.values(responsiveStyles).reduce((acc, styles) => ({
      ...acc,
      ...styles,
    }), {}),
  };
}

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

/**
 * Validates that required props are provided
 * 
 * @param props - Props object
 * @param required - Array of required prop names
 * @throws Error if required props are missing
 */
export function validateRequiredProps<T extends Record<string, any>>(
  props: T,
  required: (keyof T)[]
): void {
  const missing = required.filter(key => props[key] === undefined);
  
  if (missing.length > 0) {
    throw new Error(`Missing required props: ${missing.join(', ')}`);
  }
}

/**
 * Validates prop types
 * 
 * @param props - Props object
 * @param validators - Object of prop validators
 * @throws Error if prop validation fails
 */
export function validatePropTypes<T extends Record<string, any>>(
  props: T,
  validators: Record<keyof T, (value: any) => boolean>
): void {
  Object.entries(validators).forEach(([key, validator]) => {
    const value = props[key];
    if (value !== undefined && !validator(value)) {
      throw new Error(`Invalid prop type for '${key}': ${typeof value}`);
    }
  });
}

// ============================================================================
// PERFORMANCE UTILITIES
// ============================================================================

/**
 * Creates a memoized comparison function for React.memo
 * 
 * @param propNames - Array of prop names to compare
 * @returns Comparison function
 */
export function createMemoComparison<T extends Record<string, any>>(
  propNames: (keyof T)[]
) {
  return (prevProps: T, nextProps: T): boolean => {
    return propNames.every(key => prevProps[key] === nextProps[key]);
  };
}

/**
 * Creates a shallow comparison function for React.memo
 * 
 * @returns Shallow comparison function
 */
export function createShallowComparison<T extends Record<string, any>>() {
  return (prevProps: T, nextProps: T): boolean => {
    const prevKeys = Object.keys(prevProps);
    const nextKeys = Object.keys(nextProps);
    
    if (prevKeys.length !== nextKeys.length) return false;
    
    return prevKeys.every(key => prevProps[key] === nextProps[key]);
  };
}
