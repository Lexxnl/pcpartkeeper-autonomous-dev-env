/**
 * useError Hook
 *
 * Provides a standardized way to manage error states across the application.
 * Integrates with the global UI store for consistent error handling and notifications.
 */

import { useCallback, useEffect } from 'react';
import { useUIStore, uiSelectors } from '../store';
import { logger } from '../utils/logger';

// ============================================================================
// TYPES
// ============================================================================

export type ErrorKey = keyof ReturnType<typeof uiSelectors.errors>;

export interface UseErrorOptions {
  /** Key to track error state in the global store */
  key: ErrorKey;
  /** Whether to automatically clear error state on unmount */
  clearOnUnmount?: boolean;
  /** Whether to show error notifications automatically */
  showNotifications?: boolean;
  /** Callback to execute when an error occurs */
  onError?: (error: string) => void;
  /** Callback to execute when error is cleared */
  onErrorClear?: () => void;
}

export interface UseErrorReturn {
  /** Current error state */
  error: string | null;
  /** Whether there is an error */
  hasError: boolean;
  /** Set error state */
  setError: (error: string | null) => void;
  /** Clear error state */
  clearError: () => void;
  /** Execute an async operation with error handling */
  executeWithErrorHandling: <T>(
    operation: () => Promise<T>
  ) => Promise<T | null>;
  /** Handle error from caught exceptions */
  handleError: (error: unknown) => void;
}

// ============================================================================
// HOOK IMPLEMENTATION
// ============================================================================

/**
 * Custom hook for managing error states
 *
 * @param options - Configuration options for the error hook
 * @returns Error state management utilities
 *
 * @example
 * ```tsx
 * const { error, hasError, executeWithErrorHandling } = useError({ key: 'items' });
 *
 * const handleFetchItems = () => {
 *   executeWithErrorHandling(async () => {
 *     const items = await apiService.items.getAll();
 *     setItems(items);
 *   });
 * };
 * ```
 */
export function useError(options: UseErrorOptions): UseErrorReturn {
  const {
    key,
    clearOnUnmount = true,
    showNotifications = true,
    onError,
    onErrorClear,
  } = options;

  // Get error state from store
  const error = useUIStore(state => uiSelectors.getError(state)(key));
  const hasError = useUIStore(state => uiSelectors.hasError(state)(key));
  const setError = useUIStore(state => state.setError);
  const addNotification = useUIStore(state => state.addNotification);

  // Clear error on unmount if specified
  useEffect(() => {
    return () => {
      if (clearOnUnmount) {
        setError(key, null);
      }
    };
  }, [key, clearOnUnmount, setError]);

  // Handle error state changes
  useEffect(() => {
    if (error) {
      onError?.(error);

      if (showNotifications) {
        addNotification({
          type: 'error',
          title: 'Error',
          message: error,
          duration: 5000,
        });
      }
    } else {
      onErrorClear?.();
    }
  }, [error, onError, onErrorClear, showNotifications, addNotification]);

  // Set error state
  const handleSetError = useCallback(
    (error: string | null) => {
      setError(key, error);
    },
    [key, setError]
  );

  // Clear error state
  const clearError = useCallback(() => {
    handleSetError(null);
  }, [handleSetError]);

  // Execute async operation with error handling
  const executeWithErrorHandling = useCallback(
    async <T>(operation: () => Promise<T>): Promise<T | null> => {
      try {
        // Clear any existing error
        clearError();

        const result = await operation();
        return result;
      } catch (error) {
        handleError(error);
        return null;
      }
    },
    [clearError]
  );

  // Handle error from caught exceptions
  const handleError = useCallback(
    (error: unknown) => {
      let errorMessage: string;

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else {
        errorMessage = 'An unexpected error occurred';
      }

      handleSetError(errorMessage);
    },
    [handleSetError]
  );

  return {
    error,
    hasError,
    setError: handleSetError,
    clearError,
    executeWithErrorHandling,
    handleError,
  };
}

// ============================================================================
// SPECIALIZED ERROR HOOKS
// ============================================================================

/**
 * Hook for managing items error state
 */
export function useItemsError() {
  return useError({
    key: 'items',
    onError: error => logger.error('Items error:', error),
  });
}

/**
 * Hook for managing add item error state
 */
export function useAddItemError() {
  return useError({
    key: 'addItem',
    onError: error => logger.error('Add item error:', error),
  });
}

/**
 * Hook for managing update item error state
 */
export function useUpdateItemError() {
  return useError({
    key: 'updateItem',
    onError: error => logger.error('Update item error:', error),
  });
}

/**
 * Hook for managing delete item error state
 */
export function useDeleteItemError() {
  return useError({
    key: 'deleteItem',
    onError: error => logger.error('Delete item error:', error),
  });
}

/**
 * Hook for managing bulk delete error state
 */
export function useBulkDeleteError() {
  return useError({
    key: 'bulkDelete',
    onError: error => logger.error('Bulk delete error:', error),
  });
}

// ============================================================================
// GLOBAL ERROR HOOKS
// ============================================================================

/**
 * Hook to check if any operation has an error
 */
export function useAnyError() {
  return useUIStore(uiSelectors.hasAnyError);
}

/**
 * Hook to get all error states
 */
export function useAllErrorStates() {
  return useUIStore(uiSelectors.errors);
}

/**
 * Hook to clear all errors
 */
export function useClearAllErrors() {
  const clearErrors = useUIStore(state => state.clearErrors);
  return clearErrors;
}

// ============================================================================
// ERROR BOUNDARY HOOK
// ============================================================================

/**
 * Hook for error boundary components
 */
export function useErrorBoundary() {
  const addNotification = useUIStore(state => state.addNotification);

  const handleError = useCallback(
    (error: Error, errorInfo: unknown) => {
      logger.error('Error boundary caught error:', error, errorInfo);

      addNotification({
        type: 'error',
        title: 'Application Error',
        message: 'Something went wrong. Please refresh the page.',
        duration: 10000,
      });
    },
    [addNotification]
  );

  return { handleError };
}
