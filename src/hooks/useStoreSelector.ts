/**
 * useStoreSelector Hook
 *
 * Provides a type-safe way to select data from the store with automatic
 * re-rendering when the selected data changes.
 */

import { useCallback } from 'react';
import { useItemsStore, useUIStore, useUserStore } from '../store';
import { AppStore } from '../store/types';
import { ItemsSlice, UISlice, UserSlice } from '../store/slices';

// ============================================================================
// TYPES
// ============================================================================

export type StoreSelector<T> = (state: AppStore) => T;

export interface UseStoreSelectorOptions {
  /** Whether to use shallow equality comparison */
  shallow?: boolean;
}

// ============================================================================
// HOOK IMPLEMENTATION
// ============================================================================

/**
 * Custom hook for selecting data from the store
 *
 * @param selector - Function to select data from the store
 * @param options - Configuration options
 * @returns Selected data from the store
 *
 * @example
 * ```tsx
 * const items = useStoreSelector(state => state.items);
 * const filteredItems = useStoreSelector(state => state.getFilteredItems());
 * ```
 */
export function useStoreSelector<T>(
  selector: StoreSelector<T>,
  options: UseStoreSelectorOptions = {}
): T {
  const { shallow = true } = options;

  // For now, we'll use the items store as the main store
  return useItemsStore(selector, shallow);
}

// ============================================================================
// SPECIALIZED SELECTORS
// ============================================================================

/**
 * Hook for selecting items data
 */
export function useItemsSelector<T>(selector: (state: ItemsSlice) => T): T {
  return useItemsStore(selector);
}

/**
 * Hook for selecting UI data
 */
export function useUISelector<T>(selector: (state: UISlice) => T): T {
  return useUIStore(selector);
}

/**
 * Hook for selecting user data
 */
export function useUserSelector<T>(selector: (state: UserSlice) => T): T {
  return useUserStore(selector);
}

// ============================================================================
// COMMON SELECTORS
// ============================================================================

/**
 * Hook for getting all items
 */
export function useItems() {
  return useItemsStore(state => state.items);
}

/**
 * Hook for getting filtered items
 */
export function useFilteredItems() {
  return useItemsStore(state => state.getFilteredItems());
}

/**
 * Hook for getting current page
 */
export function useCurrentPage() {
  return useUIStore(state => state.currentPage);
}

/**
 * Hook for getting selected items
 */
export function useSelectedItems() {
  return useUIStore(state => state.selectedItems);
}

/**
 * Hook for getting user
 */
export function useUser() {
  return useUserStore(state => state.user);
}

/**
 * Hook for getting loading states
 */
export function useLoadingStates() {
  return useUIStore(state => state.loading);
}

/**
 * Hook for getting error states
 */
export function useErrorStates() {
  return useUIStore(state => state.errors);
}

/**
 * Hook for getting notifications
 */
export function useNotifications() {
  return useUIStore(state => state.notifications);
}
