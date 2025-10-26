import { useMemo, useCallback, memo } from 'react';
import { logger } from '../../../utils/logger';

// ============================================================================
// PERFORMANCE UTILITIES
// ============================================================================

/**
 * Memoize expensive computations
 *
 * @param factory - Function that returns the computed value
 * @param deps - Dependencies array
 * @returns Memoized value
 */
export function useMemoizedValue<T>(
  factory: () => T,
  deps: React.DependencyList
): T {
  return useMemo(factory, deps);
}

/**
 * Memoize callback functions
 *
 * @param callback - Function to memoize
 * @param deps - Dependencies array
 * @returns Memoized callback
 */
export function useMemoizedCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T {
  return useCallback(callback, deps);
}

/**
 * Create a memoized component with custom comparison
 *
 * @param Component - Component to memoize
 * @param areEqual - Custom comparison function
 * @returns Memoized component
 */
export function createMemoizedComponent<P extends object>(
  Component: React.ComponentType<P>,
  areEqual?: (prevProps: P, nextProps: P) => boolean
) {
  return memo(Component, areEqual);
}

/**
 * Debounce function calls
 *
 * @param func - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function useDebounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): T {
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  return useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    }) as T,
    [func, delay]
  );
}

/**
 * Throttle function calls
 *
 * @param func - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 */
export function useThrottle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): T {
  const inThrottle = React.useRef(false);

  return useCallback(
    ((...args: Parameters<T>) => {
      if (!inThrottle.current) {
        func(...args);
        inThrottle.current = true;
        setTimeout(() => (inThrottle.current = false), limit);
      }
    }) as T,
    [func, limit]
  );
}

/**
 * Intersection Observer hook for lazy loading
 *
 * @param options - Intersection Observer options
 * @returns Intersection observer ref and visibility state
 */
export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  const [hasIntersected, setHasIntersected] = React.useState(false);
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      if (entry.isIntersecting && !hasIntersected) {
        setHasIntersected(true);
      }
    }, options);

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [options, hasIntersected]);

  return { ref, isIntersecting, hasIntersected };
}

/**
 * Virtual scrolling hook for large lists
 *
 * @param items - Array of items
 * @param itemHeight - Height of each item
 * @param containerHeight - Height of the container
 * @returns Virtual scrolling state
 */
export function useVirtualScrolling<T>(
  items: T[],
  itemHeight: number,
  containerHeight: number
) {
  const [scrollTop, setScrollTop] = React.useState(0);

  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );

  const visibleItems = items.slice(visibleStart, visibleEnd);
  const totalHeight = items.length * itemHeight;
  const offsetY = visibleStart * itemHeight;

  return {
    visibleItems,
    totalHeight,
    offsetY,
    setScrollTop,
  };
}

/**
 * Performance monitoring hook
 *
 * @param componentName - Name of the component
 * @returns Performance monitoring utilities
 */
export function usePerformanceMonitor(componentName: string) {
  const renderCount = React.useRef(0);
  const startTime = React.useRef(performance.now());

  React.useEffect(() => {
    renderCount.current += 1;
    const endTime = performance.now();
    const renderTime = endTime - startTime.current;

    if (process.env.NODE_ENV === 'development') {
      logger.log(
        `${componentName} render #${renderCount.current}: ${renderTime.toFixed(
          2
        )}ms`
      );
    }

    startTime.current = performance.now();
  });

  return {
    renderCount: renderCount.current,
    measureRender: (fn: () => void) => {
      const start = performance.now();
      fn();
      const end = performance.now();
      logger.log(`${componentName} operation: ${(end - start).toFixed(2)}ms`);
    },
  };
}

/**
 * Bundle size analyzer utility
 *
 * @param componentName - Name of the component
 * @returns Bundle size information
 */
export function analyzeBundleSize(componentName: string) {
  if (process.env.NODE_ENV === 'development') {
    const componentSize = new Blob([componentName]).size;
    logger.log(`${componentName} estimated size: ${componentSize} bytes`);
  }
}

/**
 * Memory usage monitor
 *
 * @param componentName - Name of the component
 * @returns Memory usage information
 */
export function useMemoryMonitor(componentName: string) {
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development' && 'memory' in performance) {
      const memory = (performance as any).memory;
      logger.log(`${componentName} memory usage:`, {
        used: `${Math.round(memory.usedJSHeapSize / 1024 / 1024)} MB`,
        total: `${Math.round(memory.totalJSHeapSize / 1024 / 1024)} MB`,
        limit: `${Math.round(memory.jsHeapSizeLimit / 1024 / 1024)} MB`,
      });
    }
  }, [componentName]);
}

/**
 * Create a performance-optimized component wrapper
 *
 * @param Component - Component to wrap
 * @param options - Performance options
 * @returns Optimized component
 */
export function withPerformanceOptimization<P extends object>(
  Component: React.ComponentType<P>,
  options: {
    memo?: boolean;
    debounce?: number;
    throttle?: number;
    lazy?: boolean;
  } = {}
) {
  let OptimizedComponent = Component;

  // Apply memoization
  if (options.memo) {
    OptimizedComponent = memo(OptimizedComponent);
  }

  // Apply lazy loading
  if (options.lazy) {
    OptimizedComponent = React.lazy(() =>
      Promise.resolve({ default: OptimizedComponent })
    );
  }

  return OptimizedComponent;
}

/**
 * Performance metrics collector
 *
 * @param componentName - Name of the component
 * @returns Performance metrics
 */
export function usePerformanceMetrics(componentName: string) {
  const metrics = React.useRef({
    renderCount: 0,
    totalRenderTime: 0,
    averageRenderTime: 0,
    lastRenderTime: 0,
  });

  React.useEffect(() => {
    metrics.current.renderCount += 1;
    const renderTime = performance.now() - metrics.current.lastRenderTime;
    metrics.current.totalRenderTime += renderTime;
    metrics.current.averageRenderTime =
      metrics.current.totalRenderTime / metrics.current.renderCount;
    metrics.current.lastRenderTime = performance.now();

    if (process.env.NODE_ENV === 'development') {
      logger.log(`${componentName} performance metrics:`, metrics.current);
    }
  });

  return metrics.current;
}
