/**
 * Custom Hooks
 *
 * Centralized export of all custom hooks for easy importing.
 * Provides a clean API for state management and async operations.
 */

// ============================================================================
// LOADING HOOKS
// ============================================================================

export {
  useLoading,
  useItemsLoading,
  useAddItemLoading,
  useUpdateItemLoading,
  useDeleteItemLoading,
  useBulkDeleteLoading,
  useAnyLoading,
  useAllLoadingStates,
} from './useLoading';

export type {
  UseLoadingOptions,
  UseLoadingReturn,
  LoadingKey,
} from './useLoading';

// ============================================================================
// ERROR HOOKS
// ============================================================================

export {
  useError,
  useItemsError,
  useAddItemError,
  useUpdateItemError,
  useDeleteItemError,
  useBulkDeleteError,
  useAnyError,
  useAllErrorStates,
  useClearAllErrors,
  useErrorBoundary,
} from './useError';

export type { UseErrorOptions, UseErrorReturn, ErrorKey } from './useError';

// ============================================================================
// ASYNC HOOKS
// ============================================================================

export {
  useAsync,
  useItemsAsync,
  useAddItemAsync,
  useUpdateItemAsync,
  useDeleteItemAsync,
  useBulkDeleteAsync,
  useMultipleAsync,
  useAsyncWithRetry,
} from './useAsync';

export type { UseAsyncOptions, UseAsyncReturn } from './useAsync';

// ============================================================================
// STORE HOOKS
// ============================================================================

export { useAppStore, useItemsStore, useUIStore, useUserStore } from '../store';

export { itemsSelectors, uiSelectors, userSelectors } from '../store';

// ============================================================================
// UTILITY HOOKS
// ============================================================================

/**
 * Hook for accessing store state with selector
 */
export { useStoreSelector } from './useStoreSelector';

/**
 * Hook for dispatching store actions
 */
export { useStoreActions } from './useStoreActions';

/**
 * Hook for form validation logic
 */
export { default as useValidation } from './useValidation';

export type { UseValidationOptions, UseValidationReturn } from './useValidation';
