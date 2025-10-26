/**
 * @file Performance Tests
 * @description Comprehensive unit tests for performance utilities
 * @version 2.0
 * @author PCPartKeeper Team
 */

import {
  debounce,
  throttle,
  memoize,
  measurePerformance,
  createPerformanceMonitor,
  getMemoryUsage,
  getCpuUsage,
  formatBytes,
  formatDuration,
  createLazyLoader,
  createVirtualScroller,
  optimizeImages,
  compressData,
  decompressData,
  createCache,
  createRateLimiter,
  createBatchProcessor,
  createQueue,
  createWorkerPool,
  createScheduler
} from '../performance';

// Mock performance API
const mockPerformance = {
  now: jest.fn(() => Date.now()),
  mark: jest.fn(),
  measure: jest.fn(),
  getEntriesByType: jest.fn(() => []),
  getEntriesByName: jest.fn(() => []),
  clearMarks: jest.fn(),
  clearMeasures: jest.fn(),
};

Object.defineProperty(global, 'performance', {
  value: mockPerformance,
  writable: true,
});

// Mock requestAnimationFrame
global.requestAnimationFrame = jest.fn((callback) => {
  setTimeout(callback, 16); // ~60fps
  return 1;
});

global.cancelAnimationFrame = jest.fn();

// Mock setTimeout and clearTimeout
jest.useFakeTimers();

describe('Performance Utilities', () => {
  describe('debounce', () => {
    it('delays function execution', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn();
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('cancels previous calls', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('passes arguments correctly', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn('arg1', 'arg2');
      jest.advanceTimersByTime(100);

      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
    });

    it('handles immediate execution', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100, true);

      debouncedFn();
      expect(mockFn).toHaveBeenCalledTimes(1);

      debouncedFn();
      expect(mockFn).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('throttle', () => {
    it('limits function execution rate', () => {
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 100);

      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(1);

      throttledFn();
      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(100);
      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('handles leading edge', () => {
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 100, { leading: true, trailing: false });

      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(1);

      throttledFn();
      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('handles trailing edge', () => {
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 100, { leading: false, trailing: true });

      throttledFn();
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('memoize', () => {
    it('caches function results', () => {
      const mockFn = jest.fn((x) => x * 2);
      const memoizedFn = memoize(mockFn);

      expect(memoizedFn(5)).toBe(10);
      expect(memoizedFn(5)).toBe(10);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('handles multiple arguments', () => {
      const mockFn = jest.fn((x, y) => x + y);
      const memoizedFn = memoize(mockFn);

      expect(memoizedFn(2, 3)).toBe(5);
      expect(memoizedFn(2, 3)).toBe(5);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('handles custom key generator', () => {
      const mockFn = jest.fn((obj) => obj.value * 2);
      const memoizedFn = memoize(mockFn, (obj) => obj.id);

      const obj1 = { id: 1, value: 5 };
      const obj2 = { id: 1, value: 10 };

      expect(memoizedFn(obj1)).toBe(10);
      expect(memoizedFn(obj2)).toBe(10); // Should use cached result
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('handles cache size limit', () => {
      const mockFn = jest.fn((x) => x * 2);
      const memoizedFn = memoize(mockFn, undefined, 2);

      memoizedFn(1);
      memoizedFn(2);
      memoizedFn(3); // Should evict cache for 1
      memoizedFn(1); // Should call function again
      memoizedFn(2); // Should use cached result

      expect(mockFn).toHaveBeenCalledTimes(4);
    });
  });

  describe('measurePerformance', () => {
    it('measures function execution time', async () => {
      const mockFn = jest.fn(async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
        return 'result';
      });

      const result = await measurePerformance(mockFn, 'test-operation');

      expect(result).toBe('result');
      expect(mockPerformance.mark).toHaveBeenCalledWith('test-operation-start');
      expect(mockPerformance.mark).toHaveBeenCalledWith('test-operation-end');
      expect(mockPerformance.measure).toHaveBeenCalledWith('test-operation', 'test-operation-start', 'test-operation-end');
    });

    it('handles synchronous functions', () => {
      const mockFn = jest.fn(() => 'result');
      const result = measurePerformance(mockFn, 'sync-operation');

      expect(result).toBe('result');
      expect(mockPerformance.mark).toHaveBeenCalledWith('sync-operation-start');
      expect(mockPerformance.mark).toHaveBeenCalledWith('sync-operation-end');
    });

    it('handles function errors', async () => {
      const mockFn = jest.fn(() => {
        throw new Error('Test error');
      });

      await expect(measurePerformance(mockFn, 'error-operation')).rejects.toThrow('Test error');
      expect(mockPerformance.mark).toHaveBeenCalledWith('error-operation-start');
      expect(mockPerformance.mark).toHaveBeenCalledWith('error-operation-end');
    });
  });

  describe('createPerformanceMonitor', () => {
    it('creates performance monitor', () => {
      const monitor = createPerformanceMonitor();

      expect(monitor).toHaveProperty('start');
      expect(monitor).toHaveProperty('end');
      expect(monitor).toHaveProperty('getMetrics');
      expect(monitor).toHaveProperty('reset');
    });

    it('tracks performance metrics', () => {
      const monitor = createPerformanceMonitor();

      monitor.start('test-operation');
      jest.advanceTimersByTime(100);
      monitor.end('test-operation');

      const metrics = monitor.getMetrics();
      expect(metrics).toHaveProperty('test-operation');
      expect(metrics['test-operation']).toHaveProperty('duration');
      expect(metrics['test-operation']).toHaveProperty('startTime');
      expect(metrics['test-operation']).toHaveProperty('endTime');
    });

    it('handles multiple operations', () => {
      const monitor = createPerformanceMonitor();

      monitor.start('op1');
      jest.advanceTimersByTime(50);
      monitor.end('op1');

      monitor.start('op2');
      jest.advanceTimersByTime(75);
      monitor.end('op2');

      const metrics = monitor.getMetrics();
      expect(metrics).toHaveProperty('op1');
      expect(metrics).toHaveProperty('op2');
      expect(metrics['op1'].duration).toBeLessThan(metrics['op2'].duration);
    });

    it('resets metrics', () => {
      const monitor = createPerformanceMonitor();

      monitor.start('test');
      monitor.end('test');
      expect(Object.keys(monitor.getMetrics())).toHaveLength(1);

      monitor.reset();
      expect(Object.keys(monitor.getMetrics())).toHaveLength(0);
    });
  });

  describe('getMemoryUsage', () => {
    it('returns memory usage information', () => {
      const usage = getMemoryUsage();

      expect(usage).toHaveProperty('used');
      expect(usage).toHaveProperty('total');
      expect(usage).toHaveProperty('percentage');
      expect(typeof usage.used).toBe('number');
      expect(typeof usage.total).toBe('number');
      expect(typeof usage.percentage).toBe('number');
    });
  });

  describe('getCpuUsage', () => {
    it('returns CPU usage information', async () => {
      const usage = await getCpuUsage();

      expect(usage).toHaveProperty('percentage');
      expect(typeof usage.percentage).toBe('number');
      expect(usage.percentage).toBeGreaterThanOrEqual(0);
      expect(usage.percentage).toBeLessThanOrEqual(100);
    });
  });

  describe('formatBytes', () => {
    it('formats bytes correctly', () => {
      expect(formatBytes(0)).toBe('0 Bytes');
      expect(formatBytes(1024)).toBe('1 KB');
      expect(formatBytes(1048576)).toBe('1 MB');
      expect(formatBytes(1073741824)).toBe('1 GB');
    });

    it('handles decimal places', () => {
      expect(formatBytes(1536, 2)).toBe('1.50 KB');
      expect(formatBytes(1572864, 2)).toBe('1.50 MB');
    });
  });

  describe('formatDuration', () => {
    it('formats duration correctly', () => {
      expect(formatDuration(0)).toBe('0ms');
      expect(formatDuration(1000)).toBe('1s');
      expect(formatDuration(60000)).toBe('1m');
      expect(formatDuration(3600000)).toBe('1h');
    });

    it('handles complex durations', () => {
      expect(formatDuration(3661000)).toBe('1h 1m 1s');
      expect(formatDuration(7322000)).toBe('2h 2m 2s');
    });
  });

  describe('createLazyLoader', () => {
    it('creates lazy loader', () => {
      const loader = createLazyLoader();

      expect(loader).toHaveProperty('load');
      expect(loader).toHaveProperty('isLoading');
      expect(loader).toHaveProperty('isLoaded');
      expect(loader).toHaveProperty('error');
    });

    it('loads resources lazily', async () => {
      const mockLoadFn = jest.fn().mockResolvedValue('loaded');
      const loader = createLazyLoader(mockLoadFn);

      expect(loader.isLoading()).toBe(false);
      expect(loader.isLoaded()).toBe(false);

      const promise = loader.load();
      expect(loader.isLoading()).toBe(true);

      const result = await promise;
      expect(result).toBe('loaded');
      expect(loader.isLoaded()).toBe(true);
      expect(loader.isLoading()).toBe(false);
    });

    it('handles loading errors', async () => {
      const mockLoadFn = jest.fn().mockRejectedValue(new Error('Load failed'));
      const loader = createLazyLoader(mockLoadFn);

      await expect(loader.load()).rejects.toThrow('Load failed');
      expect(loader.error()).toBe('Load failed');
      expect(loader.isLoaded()).toBe(false);
    });
  });

  describe('createVirtualScroller', () => {
    it('creates virtual scroller', () => {
      const scroller = createVirtualScroller({
        itemHeight: 50,
        containerHeight: 500,
        totalItems: 1000,
      });

      expect(scroller).toHaveProperty('getVisibleItems');
      expect(scroller).toHaveProperty('scrollTo');
      expect(scroller).toHaveProperty('update');
    });

    it('calculates visible items', () => {
      const scroller = createVirtualScroller({
        itemHeight: 50,
        containerHeight: 500,
        totalItems: 1000,
      });

      const visibleItems = scroller.getVisibleItems(0);
      expect(visibleItems).toHaveProperty('startIndex');
      expect(visibleItems).toHaveProperty('endIndex');
      expect(visibleItems).toHaveProperty('items');
      expect(visibleItems.items).toHaveLength(10); // 500 / 50
    });

    it('handles scrolling', () => {
      const scroller = createVirtualScroller({
        itemHeight: 50,
        containerHeight: 500,
        totalItems: 1000,
      });

      const visibleItems = scroller.getVisibleItems(100);
      expect(visibleItems.startIndex).toBe(2); // 100 / 50
      expect(visibleItems.endIndex).toBe(11); // 2 + 10 - 1
    });
  });

  describe('optimizeImages', () => {
    it('optimizes image data', async () => {
      const mockImageData = new ArrayBuffer(1000);
      const optimized = await optimizeImages(mockImageData, { quality: 0.8 });

      expect(optimized).toBeInstanceOf(ArrayBuffer);
      expect(optimized.byteLength).toBeLessThanOrEqual(mockImageData.byteLength);
    });

    it('handles different image formats', async () => {
      const jpegData = new ArrayBuffer(1000);
      const pngData = new ArrayBuffer(1000);

      const optimizedJpeg = await optimizeImages(jpegData, { format: 'jpeg' });
      const optimizedPng = await optimizeImages(pngData, { format: 'png' });

      expect(optimizedJpeg).toBeInstanceOf(ArrayBuffer);
      expect(optimizedPng).toBeInstanceOf(ArrayBuffer);
    });
  });

  describe('compressData', () => {
    it('compresses data', async () => {
      const data = new TextEncoder().encode('Hello, World!');
      const compressed = await compressData(data);

      expect(compressed).toBeInstanceOf(ArrayBuffer);
      expect(compressed.byteLength).toBeLessThan(data.byteLength);
    });

    it('handles different compression levels', async () => {
      const data = new TextEncoder().encode('Hello, World!');
      
      const lowCompression = await compressData(data, { level: 1 });
      const highCompression = await compressData(data, { level: 9 });

      expect(lowCompression.byteLength).toBeGreaterThan(highCompression.byteLength);
    });
  });

  describe('decompressData', () => {
    it('decompresses data', async () => {
      const data = new TextEncoder().encode('Hello, World!');
      const compressed = await compressData(data);
      const decompressed = await decompressData(compressed);

      expect(decompressed).toEqual(data);
    });

    it('handles corrupted data', async () => {
      const corruptedData = new ArrayBuffer(10);
      
      await expect(decompressData(corruptedData)).rejects.toThrow();
    });
  });

  describe('createCache', () => {
    it('creates cache with TTL', () => {
      const cache = createCache({ ttl: 1000 });

      expect(cache).toHaveProperty('get');
      expect(cache).toHaveProperty('set');
      expect(cache).toHaveProperty('delete');
      expect(cache).toHaveProperty('clear');
      expect(cache).toHaveProperty('size');
    });

    it('stores and retrieves values', () => {
      const cache = createCache();
      
      cache.set('key1', 'value1');
      expect(cache.get('key1')).toBe('value1');
      expect(cache.size()).toBe(1);
    });

    it('handles TTL expiration', () => {
      const cache = createCache({ ttl: 100 });

      cache.set('key1', 'value1');
      expect(cache.get('key1')).toBe('value1');

      jest.advanceTimersByTime(100);
      expect(cache.get('key1')).toBeUndefined();
    });

    it('handles max size limit', () => {
      const cache = createCache({ maxSize: 2 });

      cache.set('key1', 'value1');
      cache.set('key2', 'value2');
      cache.set('key3', 'value3'); // Should evict key1

      expect(cache.get('key1')).toBeUndefined();
      expect(cache.get('key2')).toBe('value2');
      expect(cache.get('key3')).toBe('value3');
    });
  });

  describe('createRateLimiter', () => {
    it('creates rate limiter', () => {
      const limiter = createRateLimiter({ maxRequests: 10, windowMs: 1000 });

      expect(limiter).toHaveProperty('check');
      expect(limiter).toHaveProperty('reset');
    });

    it('limits requests within window', () => {
      const limiter = createRateLimiter({ maxRequests: 2, windowMs: 1000 });

      expect(limiter.check()).toBe(true);
      expect(limiter.check()).toBe(true);
      expect(limiter.check()).toBe(false);
    });

    it('resets after window', () => {
      const limiter = createRateLimiter({ maxRequests: 1, windowMs: 1000 });

      expect(limiter.check()).toBe(true);
      expect(limiter.check()).toBe(false);

      jest.advanceTimersByTime(1000);
      expect(limiter.check()).toBe(true);
    });
  });

  describe('createBatchProcessor', () => {
    it('creates batch processor', () => {
      const processor = createBatchProcessor({
        batchSize: 10,
        flushInterval: 1000,
      });

      expect(processor).toHaveProperty('add');
      expect(processor).toHaveProperty('flush');
      expect(processor).toHaveProperty('onBatch');
    });

    it('processes items in batches', () => {
      const mockProcessFn = jest.fn();
      const processor = createBatchProcessor({
        batchSize: 3,
        flushInterval: 1000,
        onBatch: mockProcessFn,
      });

      processor.add('item1');
      processor.add('item2');
      processor.add('item3'); // Should trigger batch

      expect(mockProcessFn).toHaveBeenCalledWith(['item1', 'item2', 'item3']);
    });

    it('flushes on interval', () => {
      const mockProcessFn = jest.fn();
      const processor = createBatchProcessor({
        batchSize: 10,
        flushInterval: 1000,
        onBatch: mockProcessFn,
      });

      processor.add('item1');
      expect(mockProcessFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(1000);
      expect(mockProcessFn).toHaveBeenCalledWith(['item1']);
    });
  });

  describe('createQueue', () => {
    it('creates queue', () => {
      const queue = createQueue();

      expect(queue).toHaveProperty('enqueue');
      expect(queue).toHaveProperty('dequeue');
      expect(queue).toHaveProperty('peek');
      expect(queue).toHaveProperty('size');
      expect(queue).toHaveProperty('isEmpty');
    });

    it('handles queue operations', () => {
      const queue = createQueue();

      expect(queue.isEmpty()).toBe(true);
      expect(queue.size()).toBe(0);

      queue.enqueue('item1');
      queue.enqueue('item2');

      expect(queue.size()).toBe(2);
      expect(queue.isEmpty()).toBe(false);
      expect(queue.peek()).toBe('item1');

      expect(queue.dequeue()).toBe('item1');
      expect(queue.size()).toBe(1);
      expect(queue.peek()).toBe('item2');
    });
  });

  describe('createWorkerPool', () => {
    it('creates worker pool', () => {
      const pool = createWorkerPool({ size: 4 });

      expect(pool).toHaveProperty('execute');
      expect(pool).toHaveProperty('terminate');
      expect(pool).toHaveProperty('getStats');
    });

    it('executes tasks in workers', async () => {
      const pool = createWorkerPool({ size: 2 });
      const mockTask = jest.fn().mockResolvedValue('result');

      const result = await pool.execute(mockTask);
      expect(result).toBe('result');
      expect(mockTask).toHaveBeenCalled();
    });

    it('handles concurrent tasks', async () => {
      const pool = createWorkerPool({ size: 2 });
      const mockTask = jest.fn().mockResolvedValue('result');

      const promises = Array.from({ length: 5 }, () => pool.execute(mockTask));
      const results = await Promise.all(promises);

      expect(results).toHaveLength(5);
      expect(results.every(r => r === 'result')).toBe(true);
    });
  });

  describe('createScheduler', () => {
    it('creates scheduler', () => {
      const scheduler = createScheduler();

      expect(scheduler).toHaveProperty('schedule');
      expect(scheduler).toHaveProperty('cancel');
      expect(scheduler).toHaveProperty('pause');
      expect(scheduler).toHaveProperty('resume');
    });

    it('schedules tasks', () => {
      const scheduler = createScheduler();
      const mockTask = jest.fn();

      const taskId = scheduler.schedule(mockTask, 1000);
      expect(taskId).toBeDefined();

      jest.advanceTimersByTime(1000);
      expect(mockTask).toHaveBeenCalled();
    });

    it('cancels scheduled tasks', () => {
      const scheduler = createScheduler();
      const mockTask = jest.fn();

      const taskId = scheduler.schedule(mockTask, 1000);
      scheduler.cancel(taskId);

      jest.advanceTimersByTime(1000);
      expect(mockTask).not.toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('handles null and undefined values', () => {
      expect(() => debounce(null as any, 100)).toThrow();
      expect(() => throttle(undefined as any, 100)).toThrow();
      expect(() => memoize(null as any)).toThrow();
    });

    it('handles invalid parameters', () => {
      expect(() => debounce(jest.fn(), -100)).toThrow();
      expect(() => throttle(jest.fn(), 0)).toThrow();
      expect(() => memoize(jest.fn(), undefined, -1)).toThrow();
    });

    it('handles empty arrays and objects', () => {
      const cache = createCache();
      cache.set('key', []);
      expect(cache.get('key')).toEqual([]);

      cache.set('key', {});
      expect(cache.get('key')).toEqual({});
    });
  });

  describe('Performance', () => {
    it('handles large datasets efficiently', () => {
      const largeArray = Array.from({ length: 10000 }, (_, i) => i);
      const mockFn = jest.fn((x) => x * 2);
      const memoizedFn = memoize(mockFn);

      const startTime = performance.now();
      
      largeArray.forEach(item => {
        memoizedFn(item);
      });
      
      const endTime = performance.now();

      expect(endTime - startTime).toBeLessThan(100); // Should complete within 100ms
    });

    it('handles concurrent operations efficiently', async () => {
      const cache = createCache();
      const promises = Array.from({ length: 1000 }, (_, i) => 
        Promise.resolve(cache.set(`key${i}`, `value${i}`))
      );

      const startTime = performance.now();
      await Promise.all(promises);
      const endTime = performance.now();

      expect(endTime - startTime).toBeLessThan(50); // Should complete within 50ms
    });
  });
});
