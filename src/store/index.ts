/**
 * Main Store
 *
 * Combines all store slices into a single Zustand store
 * with proper TypeScript integration and devtools support.
 */

import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { AppStore } from './types';
import { useItemsStore } from './slices/itemsSlice';
import { useUIStore } from './slices/uiSlice';
import { useUserStore } from './slices/userSlice';
import { logger } from '../utils/logger';

// ============================================================================
// MAIN STORE
// ============================================================================

// Export individual stores for direct access
export { useItemsStore, useUIStore, useUserStore };

// ============================================================================
// MOCK DATA GENERATION
// ============================================================================

import { generateMockItems } from '../data/mockData';

// ============================================================================
// STORE SUBSCRIPTIONS
// ============================================================================

/**
 * Set up store subscriptions for side effects
 * Returns cleanup function to unsubscribe all listeners
 */
export const setupStoreSubscriptions = () => {
  const unsubscribes: (() => void)[] = [];

  // Subscribe to user authentication changes
  const unsubscribeUserAuth = useUserStore.subscribe(
    state => state.isAuthenticated,
    isAuthenticated => {
      if (isAuthenticated) {
        // Load user-specific data
      } else {
        // Clear user-specific data
        useItemsStore.getState().setItems([]);
        useUIStore.getState().clearSelection();
        useUIStore.getState().clearErrors();
        useUIStore.getState().clearNotifications();
      }
    }
  );
  unsubscribes.push(unsubscribeUserAuth);

  // Create stable selector functions to prevent memory leaks
  // These functions are created once and reused
  const createErrorSelector = () => (state: ReturnType<typeof useUIStore.getState>) => {
    return Object.entries(state.errors)
      .filter(([, error]) => error !== null)
      .map(([key]) => key)
      .join(',');
  };

  const createLoadingSelector = () => (state: ReturnType<typeof useUIStore.getState>) => {
    return Object.entries(state.loading)
      .filter(([, isLoading]) => isLoading)
      .map(([key]) => key)
      .join(',');
  };

  // Subscribe to error changes for notifications
  const errorSelector = createErrorSelector();
  const unsubscribeErrors = useUIStore.subscribe(
    errorSelector,
    (errorKeys) => {
      // Only process if we have errors
      if (!errorKeys) return;
      
      const errors = useUIStore.getState().errors;
      Object.entries(errors).forEach(([key, error]) => {
        if (error) {
          useUIStore.getState().addNotification({
            type: 'error',
            title: 'Error',
            message: error,
            duration: 5000,
          });
        }
      });
    }
  );
  unsubscribes.push(unsubscribeErrors);

  // Subscribe to loading state changes
  const loadingSelector = createLoadingSelector();
  const unsubscribeLoading = useUIStore.subscribe(
    loadingSelector,
    (loadingKeys) => {
      const isLoading = loadingKeys && loadingKeys.length > 0;
      if (isLoading) {
        // Show global loading indicator
      } else {
        // Hide global loading indicator
      }
    }
  );
  unsubscribes.push(unsubscribeLoading);

  // Return cleanup function
  return () => {
    unsubscribes.forEach(unsubscribe => unsubscribe());
  };
};

// ============================================================================
// EXPORTS
// ============================================================================

// Export selectors
export { itemsSelectors } from './slices/itemsSlice';
export { uiSelectors } from './slices/uiSlice';
export { userSelectors } from './slices/userSlice';

// Export types
export type { AppStore } from './types';
export type {
  Item,
  CreateItemRequest,
  UpdateItemRequest,
  ItemFilters,
} from './types';
export type { UIState, Notification } from './types';
export type { User, UserPreferences } from './types';
