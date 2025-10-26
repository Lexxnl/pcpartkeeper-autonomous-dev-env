/**
 * Application-wide constants
 * 
 * Centralized configuration values for consistent use across the application.
 * These constants should be used instead of magic numbers or hardcoded values.
 */

/**
 * Pagination configuration
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 25, 50, 100],
  VIRTUALIZATION_THRESHOLD: 20,
} as const;

/**
 * Debounce delays for user input
 * These values determine how long to wait before processing user input
 */
export const DEBOUNCE_DELAYS = {
  SEARCH: 300,
  FILTER: 200,
  INPUT: 500,
} as const;

/**
 * Animation duration and easing configurations
 * Used for consistent UI animations across the application
 */
export const ANIMATIONS = {
  FADE_IN: 'fadeIn 0.2s ease-in-out',
  SLIDE_UP: 'slideUp 0.3s ease-out',
  SLIDE_DOWN: 'slideDown 0.3s ease-out',
} as const;

/**
 * Responsive breakpoints
 * Standard breakpoints used throughout the application for responsive design
 */
export const BREAKPOINTS = {
  XS: '475px',
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
} as const;

