/**
 * useAsync Hook
 *
 * Combines loading and error state management for async operations.
 * Provides a clean, consistent API for handling async operations across the app.
 */

import { useCallback } from 'react';
import { useLoading, UseLoadingOptions } from './useLoading';
import { useError, UseErrorOptions } from './useError';
import { logger } from '../utils/logger';

// ============================================================================
// TYPES
// ============================================================================

export interface UseAsyncOptions extends UseLoadingOptions, UseErrorOptions {
  /** Whether to clear error when starting a new operation */
  clearErrorOnStart?: boolean;
  /** Whether to show success notifications */
  showSuccessNotification?: boolean;
  /** Success notification message */
  successMessage?: string;
}

export interface UseAsyncReturn<T = unknown> {
  /** Current loading state */
  isLoading: boolean;
  /** Current error state */
  error: string | null;
  /** Whether there is an error */
  hasError: boolean;
  /** Execute an async operation with full state management */
  execute: (operation: () => Promise<T>) => Promise<T | null>;
  /** Clear both loading and error states */
  clear: () => void;
  /** Reset to initial state */
  reset: () => void;
}

// ============================================================================
// HOOK IMPLEMENTATION
// ============================================================================

/**
 * Custom hook for managing async operations with loading and error states
 *
 * @param options - Configuration options for the async hook
 * @returns Async operation management utilities
 *
 * @example
 * ```tsx
 * const { isLoading, error, execute } = useAsync({
 *   key: 'items',
 *   successMessage: 'Items loaded successfully'
 * });
 *
 * const handleFetchItems = () => {
 *   execute(async () => {
 *     const items = await apiService.items.getAll();
 *     setItems(items);
 *     return items;
 *   });
 * };
 * ```
 */
export function useAsync<T = unknown>(options: UseAsyncOptions): UseAsyncReturn<T> {
  const {
    clearErrorOnStart = true,
    showSuccessNotification = false,
    successMessage = 'Operation completed successfully',
    ...loadingOptions
  } = options;

  const loading = useLoading(loadingOptions);
  const error = useError(options);

  // Execute async operation with full state management
  const execute = useCallback(
    async (operation: () => Promise<T>): Promise<T | null> => {
      try {
        // Clear error if specified
        if (clearErrorOnStart) {
          error.clearError();
        }

        // Execute with loading state
        const result = await loading.executeWithLoading(operation);

        // Show success notification if specified
        if (showSuccessNotification && result !== null) {
          // This would typically use a notification system
        }

        return result;
      } catch (err) {
        error.handleError(err);
        return null;
      }
    },
    [clearErrorOnStart, showSuccessNotification, successMessage, loading, error]
  );

  // Clear both loading and error states
  const clear = useCallback(() => {
    loading.clearLoading();
    error.clearError();
  }, [loading, error]);

  // Reset to initial state
  const reset = useCallback(() => {
    clear();
  }, [clear]);

  return {
    isLoading: loading.isLoading,
    error: error.error,
    hasError: error.hasError,
    execute,
    clear,
    reset,
  };
}

// ============================================================================
// SPECIALIZED ASYNC HOOKS
// ============================================================================

/**
 * Hook for managing items async operations
 */
export function useItemsAsync() {
  return useAsync({
    key: 'items',
    onError: error => logger.error('Items error:', error),
    successMessage: 'Items loaded successfully',
  });
}

/**
 * Hook for managing add item async operations
 */
export function useAddItemAsync() {
  return useAsync({
    key: 'addItem',
    onError: error => logger.error('Add item error:', error),
    showSuccessNotification: true,
    successMessage: 'Item added successfully',
  });
}

/**
 * Hook for managing update item async operations
 */
export function useUpdateItemAsync() {
  return useAsync({
    key: 'updateItem',
    onError: error => logger.error('Update item error:', error),
    showSuccessNotification: true,
    successMessage: 'Item updated successfully',
  });
}

/**
 * Hook for managing delete item async operations
 */
export function useDeleteItemAsync() {
  return useAsync({
    key: 'deleteItem',
    onError: error => logger.error('Delete item error:', error),
    showSuccessNotification: true,
    successMessage: 'Item deleted successfully',
  });
}

/**
 * Hook for managing bulk delete async operations
 */
export function useBulkDeleteAsync() {
  return useAsync({
    key: 'bulkDelete',
    onError: error => logger.error('Bulk delete error:', error),
    showSuccessNotification: true,
    successMessage: 'Items deleted successfully',
  });
}

// ============================================================================
// UTILITY HOOKS
// ============================================================================

/**
 * Hook for managing multiple async operations
 */
export function useMultipleAsync<T extends Record<string, unknown>>(configs: {
  [K in keyof T]: UseAsyncOptions;
}) {
  const hooks = {} as { [K in keyof T]: UseAsyncReturn };

  for (const key in configs) {
    hooks[key] = useAsync(configs[key]);
  }

  return hooks;
}

/**
 * Hook for managing async operations with retry logic
 */
export function useAsyncWithRetry<T = unknown>(
  options: UseAsyncOptions & {
    maxRetries?: number;
    retryDelay?: number;
  }
): UseAsyncReturn<T> & { executeWithRetry: (operation: () => Promise<T>, retryCount?: number) => Promise<T | null> } {
  const { maxRetries = 3, retryDelay = 1000, ...asyncOptions } = options;
  const async = useAsync(asyncOptions);

  const executeWithRetry = useCallback(
    async (operation: () => Promise<T>, retryCount = 0): Promise<T | null> => {
      try {
        return await async.execute(operation);
      } catch (error) {
        if (retryCount < maxRetries) {
          console.log(
            `Retrying operation (${retryCount + 1}/${maxRetries})...`
          );
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          return executeWithRetry(operation, retryCount + 1);
        } else {
          throw error;
        }
      }
    },
    [async, maxRetries, retryDelay]
  );

  return {
    ...async,
    executeWithRetry,
  };
}
