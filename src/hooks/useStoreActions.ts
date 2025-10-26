/**
 * useStoreActions Hook
 *
 * Provides a type-safe way to access store actions with automatic
 * memoization for better performance.
 */

import { useCallback } from 'react';
import { useItemsStore, useUIStore, useUserStore } from '../store';
import { AppStore } from '../store/types';

// ============================================================================
// TYPES
// ============================================================================

export type StoreAction<T extends any[] = any[], R = any> = (...args: T) => R;

export interface UseStoreActionsOptions {
  /** Whether to memoize the actions */
  memoize?: boolean;
}

// ============================================================================
// HOOK IMPLEMENTATION
// ============================================================================

/**
 * Custom hook for accessing store actions
 *
 * @param selector - Function to select actions from the store
 * @param options - Configuration options
 * @returns Selected actions from the store
 *
 * @example
 * ```tsx
 * const { setItems, addItem } = useStoreActions(state => ({
 *   setItems: state.setItems,
 *   addItem: state.addItem,
 * }));
 * ```
 */
export function useStoreActions<T>(
  selector: (state: AppStore) => T,
  options: UseStoreActionsOptions = {}
): T {
  const { memoize = true } = options;

  // For now, we'll use the items store as the main store
  const actions = useItemsStore(selector);

  if (!memoize) {
    return actions;
  }

  // Memoize actions if requested
  return useCallback(() => actions, [actions])();
}

// ============================================================================
// SPECIALIZED ACTION HOOKS
// ============================================================================

/**
 * Hook for accessing items actions
 */
export function useItemsActions() {
  return useItemsStore(state => ({
    setItems: state.setItems,
    addItem: state.addItem,
    updateItem: state.updateItem,
    deleteItem: state.deleteItem,
    deleteItems: state.deleteItems,
    setFilters: state.setFilters,
    setSortConfig: state.setSortConfig,
    clearFilters: state.clearFilters,
  }));
}

/**
 * Hook for accessing UI actions
 */
export function useUIActions() {
  return useUIStore(state => ({
    setCurrentPage: state.setCurrentPage,
    setShowFilters: state.setShowFilters,
    setSelectedItems: state.setSelectedItems,
    toggleItemSelection: state.toggleItemSelection,
    selectAllItems: state.selectAllItems,
    clearSelection: state.clearSelection,
    openModal: state.openModal,
    closeModal: state.closeModal,
    closeAllModals: state.closeAllModals,
    setLoading: state.setLoading,
    setError: state.setError,
    clearErrors: state.clearErrors,
    addNotification: state.addNotification,
    removeNotification: state.removeNotification,
    clearNotifications: state.clearNotifications,
  }));
}

/**
 * Hook for accessing user actions
 */
export function useUserActions() {
  return useUserStore(state => ({
    setUser: state.setUser,
    updateUser: state.updateUser,
    updatePreferences: state.updatePreferences,
    setLoading: state.setLoading,
    setError: state.setError,
    logout: state.logout,
  }));
}

// ============================================================================
// COMMON ACTION HOOKS
// ============================================================================

/**
 * Hook for item CRUD operations
 */
export function useItemCRUD() {
  return useStoreActions(state => ({
    addItem: state.addItem,
    updateItem: state.updateItem,
    deleteItem: state.deleteItem,
    deleteItems: state.deleteItems,
  }));
}

/**
 * Hook for item filtering operations
 */
export function useItemFilters() {
  return useStoreActions(state => ({
    setFilters: state.setFilters,
    clearFilters: state.clearFilters,
    setSortConfig: state.setSortConfig,
  }));
}

/**
 * Hook for selection operations
 */
export function useSelection() {
  return useStoreActions(state => ({
    setSelectedItems: state.setSelectedItems,
    toggleItemSelection: state.toggleItemSelection,
    selectAllItems: state.selectAllItems,
    clearSelection: state.clearSelection,
  }));
}

/**
 * Hook for modal operations
 */
export function useModals() {
  return useStoreActions(state => ({
    openModal: state.openModal,
    closeModal: state.closeModal,
    closeAllModals: state.closeAllModals,
  }));
}

/**
 * Hook for notification operations
 */
export function useNotifications() {
  return useStoreActions(state => ({
    addNotification: state.addNotification,
    removeNotification: state.removeNotification,
    clearNotifications: state.clearNotifications,
  }));
}

// ============================================================================
// UTILITY HOOKS
// ============================================================================

/**
 * Hook for getting all store actions
 */
export function useAllActions() {
  return useStoreActions(state => state);
}

/**
 * Hook for getting store state and actions
 */
export function useStoreStateAndActions<TState, TActions>(
  stateSelector: (state: AppStore) => TState,
  actionsSelector: (state: AppStore) => TActions
) {
  const state = useItemsStore(stateSelector);
  const actions = useStoreActions(actionsSelector);

  return { state, actions };
}
