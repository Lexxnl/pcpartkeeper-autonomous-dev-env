/**
 * Performance monitoring utilities
 * 
 * Provides tools for measuring and tracking performance metrics in the application.
 * Useful for identifying performance bottlenecks and optimizing code.
 */

/**
 * Measure the performance of a function execution
 * 
 * @param label - Label for the performance measure
 * @param fn - Function to measure
 * @returns The result of the function execution
 * 
 * @example
 * ```typescript
 * const result = measurePerformance('filterItems', () => {
 *   return items.filter(item => item.inStock);
 * });
 * // Logs: "filterItems: 2.45ms"
 * ```
 */
export const measurePerformance = <T>(label: string, fn: () => T): T => {
  if (import.meta.env.DEV) {
    performance.mark(`${label}-start`);
    const result = fn();
    performance.mark(`${label}-end`);
    performance.measure(label, `${label}-start`, `${label}-end`);
    const measure = performance.getEntriesByName(label)[0];
    console.log(`${label}: ${measure.duration.toFixed(2)}ms`);
    return result;
  } else {
    return fn();
  }
};

/**
 * Track web vitals performance metrics
 * 
 * Integration point for analytics services like Google Analytics.
 * Tracks Core Web Vitals and other performance metrics.
 * 
 * @example
 * ```typescript
 * // In main.tsx or App.tsx
 * trackWebVitals();
 * ```
 */
export const trackWebVitals = () => {
  // TODO: Implement web vitals tracking
  // Could integrate with:
  // - Google Analytics
  // - Sentry
  // - Custom analytics service
  
  if (import.meta.env.DEV) {
    console.log('Web vitals tracking would be enabled in production');
  }
};

/**
 * Create a performance mark
 * 
 * @param label - Label for the mark
 */
export const mark = (label: string) => {
  if (typeof performance !== 'undefined' && performance.mark) {
    performance.mark(label);
  }
};

/**
 * Measure performance between two marks
 * 
 * @param name - Name of the measure
 * @param startMark - Starting mark label
 * @param endMark - Ending mark label
 */
export const measure = (name: string, startMark: string, endMark: string) => {
  if (typeof performance !== 'undefined' && performance.measure) {
    try {
      performance.measure(name, startMark, endMark);
      const measure = performance.getEntriesByName(name)[0];
      if (measure && import.meta.env.DEV) {
        console.log(`${name}: ${measure.duration.toFixed(2)}ms`);
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn(`Failed to measure performance: ${name}`, error);
      }
    }
  }
};

/**
 * Clear all performance marks and measures
 */
export const clearPerformanceMarks = () => {
  if (typeof performance !== 'undefined' && performance.clearMarks) {
    performance.clearMarks();
    performance.clearMeasures();
  }
};

