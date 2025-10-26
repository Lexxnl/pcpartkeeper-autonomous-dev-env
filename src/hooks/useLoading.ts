/**
 * useLoading Hook
 *
 * Provides a standardized way to manage loading states across the application.
 * Integrates with the global UI store for consistent loading state management.
 */

import React, { useCallback } from 'react';
import { useUIStore, uiSelectors } from '../store';

// ============================================================================
// TYPES
// ============================================================================

export type LoadingKey = keyof ReturnType<typeof uiSelectors.loading>;

export interface UseLoadingOptions {
  /** Key to track loading state in the global store */
  key: LoadingKey;
  /** Whether to automatically clear loading state on unmount */
  clearOnUnmount?: boolean;
  /** Callback to execute when loading starts */
  onLoadingStart?: () => void;
  /** Callback to execute when loading ends */
  onLoadingEnd?: () => void;
}

export interface UseLoadingReturn {
  /** Current loading state */
  isLoading: boolean;
  /** Set loading state */
  setLoading: (loading: boolean) => void;
  /** Execute an async operation with loading state management */
  executeWithLoading: <T>(operation: () => Promise<T>) => Promise<T>;
  /** Clear loading state */
  clearLoading: () => void;
}

// ============================================================================
// HOOK IMPLEMENTATION
// ============================================================================

/**
 * Custom hook for managing loading states
 *
 * @param options - Configuration options for the loading hook
 * @returns Loading state management utilities
 *
 * @example
 * ```tsx
 * const { isLoading, executeWithLoading } = useLoading({ key: 'items' });
 *
 * const handleFetchItems = () => {
 *   executeWithLoading(async () => {
 *     const items = await apiService.items.getAll();
 *     setItems(items);
 *   });
 * };
 * ```
 */
export function useLoading(options: UseLoadingOptions): UseLoadingReturn {
  const { key, clearOnUnmount = true, onLoadingStart, onLoadingEnd } = options;

  // Get loading state from store
  const isLoading = useUIStore(state => uiSelectors.isLoading(state)(key));
  const setLoading = useUIStore(state => state.setLoading);

  // Clear loading on unmount if specified
  React.useEffect(() => {
    return () => {
      if (clearOnUnmount) {
        setLoading(key, false);
      }
    };
  }, [key, clearOnUnmount, setLoading]);

  // Set loading state with callbacks
  const handleSetLoading = useCallback(
    (loading: boolean) => {
      setLoading(key, loading);

      if (loading) {
        onLoadingStart?.();
      } else {
        onLoadingEnd?.();
      }
    },
    [key, setLoading, onLoadingStart, onLoadingEnd]
  );

  // Execute async operation with loading state management
  const executeWithLoading = useCallback(
    async <T>(operation: () => Promise<T>): Promise<T> => {
      try {
        handleSetLoading(true);
        const result = await operation();
        return result;
      } finally {
        handleSetLoading(false);
      }
    },
    [handleSetLoading]
  );

  // Clear loading state
  const clearLoading = useCallback(() => {
    handleSetLoading(false);
  }, [handleSetLoading]);

  return {
    isLoading,
    setLoading: handleSetLoading,
    executeWithLoading,
    clearLoading,
  };
}

// ============================================================================
// SPECIALIZED LOADING HOOKS
// ============================================================================

/**
 * Hook for managing items loading state
 */
export function useItemsLoading() {
  return useLoading({
    key: 'items',
  });
}

/**
 * Hook for managing add item loading state
 */
export function useAddItemLoading() {
  return useLoading({
    key: 'addItem',
  });
}

/**
 * Hook for managing update item loading state
 */
export function useUpdateItemLoading() {
  return useLoading({
    key: 'updateItem',
  });
}

/**
 * Hook for managing delete item loading state
 */
export function useDeleteItemLoading() {
  return useLoading({
    key: 'deleteItem',
  });
}

/**
 * Hook for managing bulk delete loading state
 */
export function useBulkDeleteLoading() {
  return useLoading({
    key: 'bulkDelete',
  });
}

// ============================================================================
// GLOBAL LOADING HOOK
// ============================================================================

/**
 * Hook to check if any operation is currently loading
 */
export function useAnyLoading() {
  return useUIStore(uiSelectors.isAnyLoading);
}

/**
 * Hook to get all loading states
 */
export function useAllLoadingStates() {
  return useUIStore(uiSelectors.loading);
}
