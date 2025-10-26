// ============================================================================
// PERFORMANCE MONITORING HOOK
// ============================================================================

import { useEffect, useRef, useCallback } from 'react';
import { logger } from '../utils/logger';

interface PerformanceMetrics {
  renderTime: number;
  memoryUsage: number;
  reRenderCount: number;
  lastUpdate: number;
}

interface UsePerformanceMonitorOptions {
  componentName: string;
  enabled?: boolean;
  logToConsole?: boolean;
  warnThreshold?: number; // ms
}

/**
 * Hook for monitoring component performance
 */
export function usePerformanceMonitor({
  componentName,
  enabled = true,
  logToConsole = false,
  warnThreshold = 16, // 16ms = 60fps
}: UsePerformanceMonitorOptions) {
  const renderStartTime = useRef(performance.now());
  const renderCount = useRef(0);
  const metrics = useRef<PerformanceMetrics>({
    renderTime: 0,
    memoryUsage: 0,
    reRenderCount: 0,
    lastUpdate: Date.now(),
  });

  // Track render start
  useEffect(() => {
    if (enabled) {
      renderStartTime.current = performance.now();
    }
  });

  // Track render completion
  useEffect(() => {
    if (enabled) {
      const renderTime = performance.now() - renderStartTime.current;
      renderCount.current += 1;

      metrics.current = {
        ...metrics.current,
        renderTime,
        reRenderCount: renderCount.current,
        lastUpdate: Date.now(),
      };

      // Get memory usage if available
      if ('memory' in performance) {
        const memory = (performance.memory as { usedJSHeapSize: number } | undefined);
        if (memory) {
          metrics.current.memoryUsage = Math.round(
            memory.usedJSHeapSize / 1024 / 1024
          );
        }
      }

      // Log performance warnings
      if (renderTime > warnThreshold) {
        logger.warn(
          `