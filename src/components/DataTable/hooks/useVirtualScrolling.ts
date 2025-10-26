// ============================================================================
// VIRTUAL SCROLLING HOOK
// ============================================================================

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';

interface VirtualScrollingOptions {
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
  data: any[];
}

interface VirtualScrollingReturn {
  visibleItems: any[];
  startIndex: number;
  endIndex: number;
  totalHeight: number;
  offsetY: number;
  scrollToIndex: (index: number) => void;
  scrollToTop: () => void;
  scrollToBottom: () => void;
}

/**
 * Hook for virtual scrolling to improve performance with large datasets
 */
export function useVirtualScrolling({
  itemHeight,
  containerHeight,
  overscan = 5,
  data,
}: VirtualScrollingOptions): VirtualScrollingReturn {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate visible range
  const visibleRange = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + overscan,
      data.length - 1
    );

    return {
      startIndex: Math.max(0, startIndex - overscan),
      endIndex: Math.min(data.length - 1, endIndex),
    };
  }, [scrollTop, itemHeight, containerHeight, overscan, data.length]);

  // Get visible items
  const visibleItems = useMemo(() => {
    return data.slice(visibleRange.startIndex, visibleRange.endIndex + 1);
  }, [data, visibleRange.startIndex, visibleRange.endIndex]);

  // Calculate total height and offset
  const totalHeight = data.length * itemHeight;
  const offsetY = visibleRange.startIndex * itemHeight;

  // Scroll handlers
  const scrollToIndex = useCallback((index: number) => {
    const targetScrollTop = index * itemHeight;
    setScrollTop(targetScrollTop);
    
    if (containerRef.current) {
      containerRef.current.scrollTop = targetScrollTop;
    }
  }, [itemHeight]);

  const scrollToTop = useCallback(() => {
    setScrollTop(0);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, []);

  const scrollToBottom = useCallback(() => {
    const maxScrollTop = totalHeight - containerHeight;
    setScrollTop(maxScrollTop);
    if (containerRef.current) {
      containerRef.current.scrollTop = maxScrollTop;
    }
  }, [totalHeight, containerHeight]);

  // Handle scroll events
  const handleScroll = useCallback((e: Event) => {
    const target = e.target as HTMLDivElement;
    setScrollTop(target.scrollTop);
  }, []);

  // Attach scroll listener
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  return {
    visibleItems,
    startIndex: visibleRange.startIndex,
    endIndex: visibleRange.endIndex,
    totalHeight,
    offsetY,
    scrollToIndex,
    scrollToTop,
    scrollToBottom,
  };
}
