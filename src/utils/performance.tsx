/**
 * Performance Optimization Utilities
 * 
 * Provides utilities for optimizing React component performance,
 * bundle splitting, and lazy loading strategies.
 */

import { ComponentType, lazy, Suspense, ReactNode } from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';

// ============================================================================
// LAZY LOADING UTILITIES
// ============================================================================

/**
 * Creates a lazy component with error boundary and loading fallback
 */
export function createLazyComponent<T extends ComponentType<unknown>>(
  importFn: () => Promise<{ default: T }>,
  fallback?: ReactNode
) {
  const LazyComponent = lazy(importFn);
  
  return function LazyComponentWithSuspense(props: React.ComponentProps<T>) {
    return (
      <ErrorBoundary>
        <Suspense fallback={fallback || <div>Loading...</div>}>
          <LazyComponent {...props} />
        </Suspense>
      </ErrorBoundary>
    );
  };
}

/**
 * Preloads a lazy component for better UX
 */
export function preloadComponent(importFn: () => Promise<unknown>) {
  return importFn();
}

/**
 * Creates a component that preloads on hover
 */
export function createHoverPreloadComponent<T extends ComponentType<unknown>>(
  importFn: () => Promise<{ default: T }>,
  fallback?: ReactNode
) {
  const LazyComponent = lazy(importFn);
  
  return function HoverPreloadComponent(props: React.ComponentProps<T>) {
    const handleMouseEnter = () => {
      preloadComponent(importFn);
    };

    return (
      <div onMouseEnter={handleMouseEnter}>
        <ErrorBoundary>
          <Suspense fallback={fallback || <div>Loading...</div>}>
            <LazyComponent {...props} />
          </Suspense>
        </ErrorBoundary>
      </div>
    );
  };
}

// ============================================================================
// MEMOIZATION UTILITIES
// ============================================================================

/**
 * Creates a memoized component with custom comparison function
 */
export function createMemoizedComponent<T extends ComponentType<unknown>>(
  Component: T,
  areEqual?: (prevProps: React.ComponentProps<T>, nextProps: React.ComponentProps<T>) => boolean
) {
  return React.memo(Component, areEqual);
}

/**
 * Creates a memoized callback with dependency array
 */
export function createMemoizedCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  deps: React.DependencyList
): T {
  return React.useCallback(callback, deps) as T;
}

/**
 * Creates a memoized value with dependency array
 */
export function createMemoizedValue<T>(factory: () => T, deps: React.DependencyList): T {
  return React.useMemo(factory, deps);
}

// ============================================================================
// BUNDLE OPTIMIZATION
// ============================================================================

/**
 * Dynamic import with retry logic
 */
export async function dynamicImportWithRetry<T>(
  importFn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await importFn();
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
  }
  
  throw lastError || new Error('Failed to load component after retries');
}

/**
 * Creates a component that loads with retry logic
 */
export function createRetryLazyComponent<T extends ComponentType<unknown>>(
  importFn: () => Promise<{ default: T }>,
  maxRetries: number = 3,
  fallback?: ReactNode
) {
  const LazyComponent = lazy(() => dynamicImportWithRetry(importFn, maxRetries));
  
  return function RetryLazyComponent(props: React.ComponentProps<T>) {
    return (
      <ErrorBoundary>
        <Suspense fallback={fallback || <div>Loading...</div>}>
          <LazyComponent {...props} />
        </Suspense>
      </ErrorBoundary>
    );
  };
}

// ============================================================================
// PERFORMANCE MONITORING
// ============================================================================

/**
 * Measures component render time
 */
export function measureRenderTime<T extends ComponentType<unknown>>(
  Component: T,
  componentName?: string
): T {
  return React.forwardRef<unknown, React.ComponentProps<T>>((props, ref) => {
    const startTime = performance.now();
    
    React.useEffect(() => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
    });
    
    return React.createElement(Component, { ...props, ref });
  }) as T;
}

/**
 * Creates a performance profiler component
 */
export function createPerformanceProfiler<T extends ComponentType<unknown>>(
  Component: T,
  id: string
): T {
  return React.forwardRef<unknown, React.ComponentProps<T>>((props, ref) => {
    return (
      <React.Profiler
        id={id}
        onRender={(id, phase, actualDuration, baseDuration, startTime, commitTime) => {
          if (process.env.NODE_ENV === 'development') {
            // console.log('Performance Profile:', {
            //   id,
            //   phase,
            //   actualDuration,
            //   baseDuration,
            //   startTime,
            //   commitTime,
            // });
          }
        }}
      >
        <Component {...props} ref={ref} />
      </React.Profiler>
    );
  }) as T;
}

// ============================================================================
// CODE SPLITTING UTILITIES
// ============================================================================

/**
 * Creates a route-based code splitter
 */
export function createRouteSplitter<T extends ComponentType<unknown>>(
  routes: Record<string, () => Promise<{ default: T }>>
) {
  return function RouteSplitter({ route, ...props }: { route: string } & React.ComponentProps<T>) {
    const LazyComponent = React.useMemo(() => {
      const importFn = routes[route];
      if (!importFn) {
        throw new Error(`Route "${route}" not found`);
      }
      return lazy(importFn);
    }, [route]);

    return (
      <ErrorBoundary>
        <Suspense fallback={<div>Loading route...</div>}>
          <LazyComponent {...props} />
        </Suspense>
      </ErrorBoundary>
    );
  };
}

/**
 * Creates a feature-based code splitter
 */
export function createFeatureSplitter<T extends ComponentType<unknown>>(
  features: Record<string, () => Promise<{ default: T }>>
) {
  return function FeatureSplitter({ 
    feature, 
    enabled = true, 
    ...props 
  }: { 
    feature: string; 
    enabled?: boolean; 
  } & React.ComponentProps<T>) {
    const LazyComponent = React.useMemo(() => {
      if (!enabled) return null;
      const importFn = features[feature];
      if (!importFn) {
        throw new Error(`Feature "${feature}" not found`);
      }
      return lazy(importFn);
    }, [feature, enabled]);

    if (!enabled || !LazyComponent) {
      return null;
    }

    return (
      <ErrorBoundary>
        <Suspense fallback={<div>Loading feature...</div>}>
          <LazyComponent {...props} />
        </Suspense>
      </ErrorBoundary>
    );
  };
}

// ============================================================================
// OPTIMIZATION HOOKS
// ============================================================================

/**
 * Hook for debounced state updates
 */
export function useDebouncedState<T>(
  initialValue: T,
  delay: number
): [T, T, (value: T) => void] {
  const [value, setValue] = React.useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = React.useState<T>(initialValue);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return [value, debouncedValue, setValue];
}

/**
 * Hook for throttled callbacks
 */
export function useThrottledCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
): T {
  const lastRun = React.useRef(Date.now());
  
  return React.useCallback(
    ((...args: Parameters<T>) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = Date.now();
      }
    }) as T,
    [callback, delay]
  );
}

/**
 * Hook for intersection observer (lazy loading)
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      options
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [options, hasIntersected]);

  return { ref, isIntersecting, hasIntersected };
}

// ============================================================================
// BUNDLE ANALYSIS
// ============================================================================

/**
 * Analyzes bundle size and provides recommendations
 */
export function analyzeBundleSize() {
  if (process.env.NODE_ENV === 'development') {
    const performanceEntries = performance.getEntriesByType('navigation');
    if (performanceEntries.length > 0) {
      const navEntry = performanceEntries[0] as PerformanceNavigationTiming;
    }
  }
}

/**
 * Monitors component re-renders
 */
export function useRenderCount(componentName?: string) {
  const renderCount = React.useRef(0);
  renderCount.current++;

  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // console.log(`${componentName || 'Component'} rendered ${renderCount.current} times`);
    }
  });

  return renderCount.current;
}