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

// For now, we'll use individual stores instead of a combined store
// This is simpler and more performant for this use case
export const useAppStore = useItemsStore;

// ============================================================================
// STORE INITIALIZATION
// ============================================================================

/**
 * Initialize the store with default data
 * This should be called once when the app starts
 */
export const initializeStore = async () => {
  // Load initial data from API or localStorage
  try {
    // For now, we'll use mock data
    // In a real app, this would fetch from an API
    const mockItems = generateMockItems();
    useItemsStore.getState().setItems(mockItems);
  } catch (error) {
    logger.error('Failed to initialize store:', error);
  }
};

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

  // Subscribe to error changes for notifications
  const unsubscribeErrors = useUIStore.subscribe(
    state => state.errors,
    errors => {
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
  const unsubscribeLoading = useUIStore.subscribe(
    state => state.loading,
    loading => {
      const isLoading = Object.values(loading).some(loading => loading);
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

// Export individual stores for direct access
export { useItemsStore, useUIStore, useUserStore };

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
