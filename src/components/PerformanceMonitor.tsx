/**
 * Performance Monitor Component
 *
 * Monitors and displays performance metrics for the application.
 * Helps identify performance bottlenecks and optimization opportunities.
 */

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useUIStore } from '../store';
import { logger } from '../utils/logger';

// ============================================================================
// TYPES
// ============================================================================

interface PerformanceMetrics {
  renderTime: number;
  memoryUsage: number;
  bundleSize: number;
  componentCount: number;
  reRenderCount: number;
  lastUpdate: number;
}

interface PerformanceMonitorProps {
  /** Whether to show the monitor */
  visible?: boolean;
  /** Position of the monitor */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  /** Whether to log metrics to console */
  logToConsole?: boolean;
}

// ============================================================================
// PERFORMANCE MONITOR
// ============================================================================

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = React.memo(
  ({ visible = false, position = 'top-right', logToConsole = false }) => {
    const [metrics, setMetrics] = useState<PerformanceMetrics>({
      renderTime: 0,
      memoryUsage: 0,
      bundleSize: 0,
      componentCount: 0,
      reRenderCount: 0,
      lastUpdate: Date.now(),
    });

    const [isExpanded, setIsExpanded] = useState(false);
    const [renderStartTime, setRenderStartTime] = useState(0);

    // Track render time
    useEffect(() => {
      setRenderStartTime(performance.now());
    }, []);

    useEffect(() => {
      const renderTime = performance.now() - renderStartTime;

      setMetrics(prev => ({
        ...prev,
        renderTime,
        lastUpdate: Date.now(),
      }));

    }, [renderStartTime, logToConsole]);

    // Track re-renders separately to avoid infinite loops
    const renderCountRef = useRef(0);
    renderCountRef.current += 1;

    // Get memory usage
    const getMemoryUsage = useCallback(() => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        return {
          used: Math.round(memory.usedJSHeapSize / 1024 / 1024),
          total: Math.round(memory.totalJSHeapSize / 1024 / 1024),
          limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024),
        };
      }
      return { used: 0, total: 0, limit: 0 };
    }, []);

    // Update metrics periodically
    useEffect(() => {
      const interval = setInterval(() => {
        const memory = getMemoryUsage();

        setMetrics(prev => ({
          ...prev,
          memoryUsage: memory.used,
          lastUpdate: Date.now(),
        }));
      }, 1000);

      return () => clearInterval(interval);
    }, [getMemoryUsage]);

    if (!visible) return null;

    const positionClasses = {
      'top-left': 'top-4 left-4',
      'top-right': 'top-4 right-4',
      'bottom-left': 'bottom-4 left-4',
      'bottom-right': 'bottom-4 right-4',
    };

    return (
      <div className={`fixed ${positionClasses[position]} z-50`}>
        <div className='bg-surface-primary border border-border-subtle rounded-lg shadow-lg'>
          <div className='p-3'>
            <div className='flex items-center justify-between mb-2'>
              <h3 className='text-sm font-semibold text-text-primary'>
                Performance
              </h3>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className='text-text-muted hover:text-text-primary transition-colors'
              >
                {isExpanded ? '−' : '+'}
              </button>
            </div>

            <div className='space-y-1 text-xs text-text-muted'>
              <div>Render: {metrics.renderTime.toFixed(2)}ms</div>
              <div>Memory: {metrics.memoryUsage}MB</div>
              <div>Re-renders: {renderCountRef.current}</div>
            </div>

            {isExpanded && (
              <div className='mt-3 pt-3 border-t border-border-subtle space-y-1 text-xs text-text-muted'>
                <div>Bundle: {metrics.bundleSize}KB</div>
                <div>Components: {metrics.componentCount}</div>
                <div>
                  Last update:{' '}
                  {new Date(metrics.lastUpdate).toLocaleTimeString()}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

// ============================================================================
// PERFORMANCE HOOKS
// ============================================================================

/**
 * Hook for measuring component render performance
 */
export function useRenderPerformance(componentName: string) {
  const [renderTime, setRenderTime] = useState(0);
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;

      setRenderTime(duration);
      setRenderCount(prev => prev + 1);

      if (duration > 16) {
        // More than one frame
        logger.warn(
          `Slow render in ${componentName}: ${duration.toFixed(2)}ms`
        );
      }
    };
  });

  return { renderTime, renderCount };
}

/**
 * Hook for measuring async operation performance
 */
export function useAsyncPerformance() {
  const [operationTimes, setOperationTimes] = useState<Record<string, number>>(
    {}
  );

  const measureAsync = useCallback(
    async <T,>(
      operation: () => Promise<T>,
      operationName: string
    ): Promise<T> => {
      const startTime = performance.now();

      try {
        const result = await operation();
        const endTime = performance.now();
        const duration = endTime - startTime;

        setOperationTimes(prev => ({
          ...prev,
          [operationName]: duration,
        }));

        if (duration > 1000) {
          // More than 1 second
          logger.warn(
            `Slow async operation ${operationName}: ${duration.toFixed(2)}ms`
          );
        }

        return result;
      } catch (error) {
        const endTime = performance.now();
        const duration = endTime - startTime;

        logger.error(
          `Failed async operation ${operationName} after ${duration.toFixed(
            2
          )}ms:`,
          error
        );
        throw error;
      }
    },
    []
  );

  return { operationTimes, measureAsync };
}

// ============================================================================
// PERFORMANCE UTILITIES
// ============================================================================

/**
 * Higher-order component for measuring performance
 */
export function withPerformanceMonitoring<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  componentName: string
) {
  return React.memo((props: P) => {
    const { renderTime, renderCount } = useRenderPerformance(componentName);

    useEffect(() => {
      if (renderTime > 16) {
        logger.warn(
          `Performance warning: ${componentName} took ${renderTime.toFixed(
            2
          )}ms to render`
        );
      }
    }, [renderTime, componentName]);

    return <WrappedComponent {...props} />;
  });
}

/**
 * Utility for measuring function execution time
 */
export function measureExecutionTime<T>(fn: () => T, functionName: string): T {
  const startTime = performance.now();
  const result = fn();
  const endTime = performance.now();
  const duration = endTime - startTime;

  if (duration > 10) {
    // More than 10ms
    logger.warn(`Slow function ${functionName}: ${duration.toFixed(2)}ms`);
  }

  return result;
}

/**
 * Utility for measuring async function execution time
 */
export async function measureAsyncExecutionTime<T>(
  fn: () => Promise<T>,
  functionName: string
): Promise<T> {
  const startTime = performance.now();
  const result = await fn();
  const endTime = performance.now();
  const duration = endTime - startTime;

  if (duration > 100) {
    // More than 100ms
    logger.warn(
      `Slow async function ${functionName}: ${duration.toFixed(2)}ms`
    );
  }

  return result;
}
