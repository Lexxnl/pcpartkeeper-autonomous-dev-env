/**
 * @file useAsync Hook Tests
 * @description Comprehensive unit tests for the useAsync custom hook
 * @version 2.0
 * @author PCPartKeeper Team
 */

import { renderHook, act, waitFor } from '@testing-library/react';
import { useAsync } from '../useAsync';

// Mock async functions for testing
const mockSuccessFunction = jest.fn().mockResolvedValue('success data');
const mockErrorFunction = jest.fn().mockRejectedValue(new Error('test error'));
const mockSlowFunction = jest.fn().mockImplementation(
  () => new Promise(resolve => setTimeout(() => resolve('slow data'), 100))
);

describe('useAsync Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Functionality', () => {
    it('initializes with correct default state', () => {
      const { result } = renderHook(() => useAsync(mockSuccessFunction));

      expect(result.current.data).toBeUndefined();
      expect(result.current.error).toBeUndefined();
      expect(result.current.loading).toBe(false);
      expect(result.current.execute).toBeInstanceOf(Function);
    });

    it('executes async function and updates state correctly', async () => {
      const { result } = renderHook(() => useAsync(mockSuccessFunction));

      act(() => {
        result.current.execute();
      });

      expect(result.current.loading).toBe(true);
      expect(result.current.data).toBeUndefined();
      expect(result.current.error).toBeUndefined();

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.data).toBe('success data');
      expect(result.current.error).toBeUndefined();
      expect(mockSuccessFunction).toHaveBeenCalledTimes(1);
    });

    it('handles errors correctly', async () => {
      const { result } = renderHook(() => useAsync(mockErrorFunction));

      act(() => {
        result.current.execute();
      });

      expect(result.current.loading).toBe(true);

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.data).toBeUndefined();
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe('test error');
    });
  });

  describe('Immediate Execution', () => {
    it('executes immediately when immediate is true', async () => {
      const { result } = renderHook(() => 
        useAsync(mockSuccessFunction, { immediate: true })
      );

      expect(result.current.loading).toBe(true);
      expect(mockSuccessFunction).toHaveBeenCalledTimes(1);

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.data).toBe('success data');
    });

    it('handles immediate execution with error', async () => {
      const { result } = renderHook(() => 
        useAsync(mockErrorFunction, { immediate: true })
      );

      expect(result.current.loading).toBe(true);

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.data).toBeUndefined();
    });
  });

  describe('Dependencies and Re-execution', () => {
    it('re-executes when dependencies change', async () => {
      let dependency = 'initial';
      const mockFunction = jest.fn().mockResolvedValue(`data for ${dependency}`);

      const { result, rerender } = renderHook(
        ({ dep }) => useAsync(() => mockFunction(dep), { 
          immediate: true, 
          dependencies: [dep] 
        }),
        { initialProps: { dep: dependency } }
      );

      await waitFor(() => {
        expect(result.current.data).toBe('data for initial');
      });

      dependency = 'updated';
      rerender({ dep: dependency });

      await waitFor(() => {
        expect(result.current.data).toBe('data for updated');
      });

      expect(mockFunction).toHaveBeenCalledTimes(2);
    });

    it('does not re-execute when dependencies do not change', async () => {
      const dependency = 'stable';
      const mockFunction = jest.fn().mockResolvedValue('data');

      const { result, rerender } = renderHook(
        ({ dep }) => useAsync(() => mockFunction(dep), { 
          immediate: true, 
          dependencies: [dep] 
        }),
        { initialProps: { dep: dependency } }
      );

      await waitFor(() => {
        expect(result.current.data).toBe('data');
      });

      rerender({ dep: dependency });

      await waitFor(() => {
        expect(result.current.data).toBe('data');
      });

      expect(mockFunction).toHaveBeenCalledTimes(1);
    });
  });

  describe('Manual Execution', () => {
    it('allows manual execution with parameters', async () => {
      const mockFunction = jest.fn().mockResolvedValue('manual data');
      const { result } = renderHook(() => useAsync(mockFunction));

      act(() => {
        result.current.execute('param1', 'param2');
      });

      await waitFor(() => {
        expect(result.current.data).toBe('manual data');
      });

      expect(mockFunction).toHaveBeenCalledWith('param1', 'param2');
    });

    it('prevents multiple concurrent executions by default', async () => {
      const { result } = renderHook(() => useAsync(mockSlowFunction));

      act(() => {
        result.current.execute();
        result.current.execute(); // Second call should be ignored
      });

      expect(result.current.loading).toBe(true);

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(mockSlowFunction).toHaveBeenCalledTimes(1);
    });

    it('allows multiple concurrent executions when configured', async () => {
      const { result } = renderHook(() => 
        useAsync(mockSlowFunction, { allowConcurrent: true })
      );

      act(() => {
        result.current.execute();
        result.current.execute();
      });

      expect(result.current.loading).toBe(true);

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(mockSlowFunction).toHaveBeenCalledTimes(2);
    });
  });

  describe('State Management', () => {
    it('resets state when reset is called', async () => {
      const { result } = renderHook(() => useAsync(mockSuccessFunction));

      act(() => {
        result.current.execute();
      });

      await waitFor(() => {
        expect(result.current.data).toBe('success data');
      });

      act(() => {
        result.current.reset();
      });

      expect(result.current.data).toBeUndefined();
      expect(result.current.error).toBeUndefined();
      expect(result.current.loading).toBe(false);
    });

    it('preserves previous data when configured', async () => {
      const { result } = renderHook(() => 
        useAsync(mockSuccessFunction, { preservePreviousData: true })
      );

      act(() => {
        result.current.execute();
      });

      await waitFor(() => {
        expect(result.current.data).toBe('success data');
      });

      const mockErrorFunction2 = jest.fn().mockRejectedValue(new Error('new error'));

      act(() => {
        result.current.execute();
      });

      expect(result.current.data).toBe('success data'); // Previous data preserved
      expect(result.current.loading).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('handles different error types', async () => {
      const stringError = jest.fn().mockRejectedValue('string error');
      const { result } = renderHook(() => useAsync(stringError));

      act(() => {
        result.current.execute();
      });

      await waitFor(() => {
        expect(result.current.error).toBe('string error');
      });
    });

    it('handles timeout errors', async () => {
      const timeoutFunction = jest.fn().mockImplementation(
        () => new Promise(resolve => setTimeout(resolve, 200))
      );

      const { result } = renderHook(() => 
        useAsync(timeoutFunction, { timeout: 50 })
      );

      act(() => {
        result.current.execute();
      });

      await waitFor(() => {
        expect(result.current.error).toBeInstanceOf(Error);
        expect(result.current.error?.message).toContain('timeout');
      });
    });

    it('retries on failure when configured', async () => {
      let attemptCount = 0;
      const retryFunction = jest.fn().mockImplementation(() => {
        attemptCount++;
        if (attemptCount < 3) {
          return Promise.reject(new Error('retry error'));
        }
        return Promise.resolve('success after retry');
      });

      const { result } = renderHook(() => 
        useAsync(retryFunction, { 
          retryCount: 3, 
          retryDelay: 10 
        })
      );

      act(() => {
        result.current.execute();
      });

      await waitFor(() => {
        expect(result.current.data).toBe('success after retry');
      });

      expect(retryFunction).toHaveBeenCalledTimes(3);
    });
  });

  describe('Cleanup', () => {
    it('cancels pending requests on unmount', async () => {
      const { result, unmount } = renderHook(() => useAsync(mockSlowFunction));

      act(() => {
        result.current.execute();
      });

      expect(result.current.loading).toBe(true);

      unmount();

      // Wait for the slow function to complete
      await new Promise(resolve => setTimeout(resolve, 150));

      // The function should have been called but the component is unmounted
      expect(mockSlowFunction).toHaveBeenCalledTimes(1);
    });

    it('handles cleanup function when provided', async () => {
      const cleanup = jest.fn();
      const mockFunction = jest.fn().mockResolvedValue('data');

      const { result, unmount } = renderHook(() => 
        useAsync(mockFunction, { cleanup })
      );

      act(() => {
        result.current.execute();
      });

      await waitFor(() => {
        expect(result.current.data).toBe('data');
      });

      unmount();

      expect(cleanup).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined async function', () => {
      const { result } = renderHook(() => useAsync(undefined as any));

      expect(() => {
        act(() => {
          result.current.execute();
        });
      }).not.toThrow();
    });

    it('handles null async function', () => {
      const { result } = renderHook(() => useAsync(null as any));

      expect(() => {
        act(() => {
          result.current.execute();
        });
      }).not.toThrow();
    });

    it('handles synchronous function', async () => {
      const syncFunction = jest.fn().mockReturnValue('sync data');
      const { result } = renderHook(() => useAsync(syncFunction));

      act(() => {
        result.current.execute();
      });

      await waitFor(() => {
        expect(result.current.data).toBe('sync data');
      });

      expect(result.current.loading).toBe(false);
    });
  });

  describe('Performance', () => {
    it('does not cause unnecessary re-renders', async () => {
      let renderCount = 0;
      const mockFunction = jest.fn().mockResolvedValue('data');

      const { result } = renderHook(() => {
        renderCount++;
        return useAsync(mockFunction);
      });

      expect(renderCount).toBe(1);

      act(() => {
        result.current.execute();
      });

      expect(renderCount).toBe(2); // One for loading state

      await waitFor(() => {
        expect(result.current.data).toBe('data');
      });

      expect(renderCount).toBe(3); // One for data state
    });
  });
});
