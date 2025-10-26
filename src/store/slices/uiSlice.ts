/**
 * UI Store Slice
 *
 * Manages UI state including navigation, modals, loading states,
 * errors, and notifications across the application.
 */

import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { UISlice, Notification } from '../types';

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialModals = {
  addItem: false,
  editItem: false,
  deleteItem: false,
  bulkDelete: false,
};

const initialLoading = {
  items: false,
  addItem: false,
  updateItem: false,
  deleteItem: false,
  bulkDelete: false,
};

const initialErrors = {
  items: null,
  addItem: null,
  updateItem: null,
  deleteItem: null,
  bulkDelete: null,
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Generate unique notification ID
 */
const generateNotificationId = (): string => {
  return `notification-${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 9)}`;
};

/**
 * Auto-dismiss notification after specified duration
 */
const scheduleNotificationDismiss = (
  id: string,
  duration: number,
  removeFn: (id: string) => void
) => {
  setTimeout(() => {
    removeFn(id);
  }, duration);
};

// ============================================================================
// STORE SLICE
// ============================================================================

export const useUIStore = create<UISlice>()(
  devtools(
    subscribeWithSelector((set, get) => ({
      // ====================================================================
      // STATE
      // ====================================================================

      currentPage: 'items',
      showFilters: false,
      selectedItems: [],
      modals: initialModals,
      loading: initialLoading,
      errors: initialErrors,
      notifications: [],

      // ====================================================================
      // NAVIGATION ACTIONS
      // ====================================================================

      setCurrentPage: page => {
        set({ currentPage: page });
      },

      // ====================================================================
      // FILTER ACTIONS
      // ====================================================================

      setShowFilters: show => {
        set({ showFilters: show });
      },

      // ====================================================================
      // SELECTION ACTIONS
      // ====================================================================

      setSelectedItems: items => {
        set({ selectedItems: items });
      },

      toggleItemSelection: id => {
        set(state => {
          const index = state.selectedItems.indexOf(id);
          if (index === -1) {
            return { selectedItems: [...state.selectedItems, id] };
          } else {
            return {
              selectedItems: state.selectedItems.filter(item => item !== id),
            };
          }
        });
      },

      selectAllItems: itemIds => {
        set({ selectedItems: [...itemIds] });
      },

      clearSelection: () => {
        set({ selectedItems: [] });
      },

      // ====================================================================
      // MODAL ACTIONS
      // ====================================================================

      openModal: modal => {
        set(state => ({
          modals: { ...state.modals, [modal]: true },
        }));
      },

      closeModal: modal => {
        set(state => ({
          modals: { ...state.modals, [modal]: false },
        }));
      },

      closeAllModals: () => {
        set({ modals: { ...initialModals } });
      },

      // ====================================================================
      // LOADING ACTIONS
      // ====================================================================

      setLoading: (key, loading) => {
        set(state => ({
          loading: { ...state.loading, [key]: loading },
        }));
      },

      // ====================================================================
      // ERROR ACTIONS
      // ====================================================================

      setError: (key, error) => {
        set(state => ({
          errors: { ...state.errors, [key]: error },
        }));
      },

      clearErrors: () => {
        set({ errors: { ...initialErrors } });
      },

      // ====================================================================
      // NOTIFICATION ACTIONS
      // ====================================================================

      addNotification: notificationData => {
        const id = generateNotificationId();
        const notification: Notification = {
          ...notificationData,
          id,
          timestamp: Date.now(),
        };

        set(state => ({
          notifications: [...state.notifications, notification],
        }));

        // Auto-dismiss if duration is specified
        if (notification.duration) {
          scheduleNotificationDismiss(
            id,
            notification.duration,
            get().removeNotification
          );
        }

        return id;
      },

      removeNotification: id => {
        set(state => ({
          notifications: state.notifications.filter(n => n.id !== id),
        }));
      },

      clearNotifications: () => {
        set({ notifications: [] });
      },
    })),
    {
      name: 'ui-store',
      partialize: state => ({
        currentPage: state.currentPage,
        showFilters: state.showFilters,
        selectedItems: state.selectedItems,
        modals: state.modals,
        loading: state.loading,
        errors: state.errors,
        notifications: state.notifications,
      }),
    }
  )
);

// ============================================================================
// SELECTORS
// ============================================================================

export const uiSelectors = {
  // Basic selectors
  currentPage: (state: UISlice) => state.currentPage,
  showFilters: (state: UISlice) => state.showFilters,
  selectedItems: (state: UISlice) => state.selectedItems,
  modals: (state: UISlice) => state.modals,
  loading: (state: UISlice) => state.loading,
  errors: (state: UISlice) => state.errors,
  notifications: (state: UISlice) => state.notifications,

  // Computed selectors
  selectedCount: (state: UISlice) => state.selectedItems.length,
  hasSelection: (state: UISlice) => state.selectedItems.length > 0,

  // Loading state selectors
  isLoading: (state: UISlice) => (key: keyof UISlice['loading']) =>
    state?.loading?.[key] || false,
  isAnyLoading: (state: UISlice) =>
    state?.loading
      ? Object.values(state.loading).some(loading => loading)
      : false,

  // Error state selectors
  hasError: (state: UISlice) => (key: keyof UISlice['errors']) =>
    state?.errors?.[key] !== null && state?.errors?.[key] !== undefined,
  hasAnyError: (state: UISlice) =>
    state?.errors
      ? Object.values(state.errors).some(error => error !== null)
      : false,
  getError: (state: UISlice) => (key: keyof UISlice['errors']) =>
    state?.errors?.[key] || null,

  // Modal state selectors
  isModalOpen: (state: UISlice) => (modal: keyof UISlice['modals']) =>
    state?.modals?.[modal] || false,
  isAnyModalOpen: (state: UISlice) =>
    state?.modals ? Object.values(state.modals).some(open => open) : false,

  // Notification selectors
  notificationsByType: (state: UISlice) => (type: Notification['type']) =>
    state?.notifications?.filter(n => n.type === type) || [],
  unreadNotifications: (state: UISlice) => state?.notifications || [],
  notificationCount: (state: UISlice) => state?.notifications?.length || 0,

  // Selection helpers
  isItemSelected: (state: UISlice) => (id: number) =>
    state?.selectedItems?.includes(id) || false,
  isAllSelected: (state: UISlice) => (itemIds: number[]) =>
    itemIds.length > 0 &&
    itemIds.every(id => state?.selectedItems?.includes(id) || false),
  isPartiallySelected: (state: UISlice) => (itemIds: number[]) => {
    const selectedCount = itemIds.filter(
      id => state?.selectedItems?.includes(id) || false
    ).length;
    return selectedCount > 0 && selectedCount < itemIds.length;
  },
};
