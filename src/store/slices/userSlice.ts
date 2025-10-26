/**
 * User Store Slice
 *
 * Manages user authentication state, profile information,
 * and user preferences across the application.
 */

import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { UserSlice, User, UserPreferences } from '../types';
import { apiService } from '../../services/apiService';

// ============================================================================
// INITIAL STATE
// ============================================================================

const defaultPreferences: UserPreferences = {
  theme: 'system',
  language: 'en',
  itemsPerPage: 10,
  defaultFilters: {
    category: '',
    brand: '',
    priceRange: { min: '', max: '' },
    inStock: null,
    rating: null,
    searchTerm: '',
  },
  notifications: {
    email: true,
    push: true,
    inApp: true,
  },
};

// ============================================================================
// STORE SLICE
// ============================================================================

export const useUserStore = create<UserSlice>()(
  devtools(
    subscribeWithSelector((set, get) => ({
      // ====================================================================
      // STATE
      // ====================================================================

      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      // ====================================================================
      // ACTIONS
      // ====================================================================

      setUser: user => {
        set({
          user,
          isAuthenticated: user !== null,
          error: null,
        });
      },

      updateUser: updates => {
        set(state => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }));
      },

      updatePreferences: async (preferences: Partial<UserPreferences>, signal?: AbortSignal) => {
        try {
          set({ loading: true, error: null });

          const updatedUser = await apiService.user.updatePreferences(preferences, signal);

          set(state => ({
            user: state.user
              ? {
                  ...state.user,
                  preferences: { ...state.user.preferences, ...preferences },
                }
              : null,
            loading: false,
          }));
        } catch (error) {
          if (error.name === 'AbortError') {
            throw error;
          }
          set({
            loading: false,
            error:
              error instanceof Error
                ? error.message
                : 'Failed to update preferences',
          });
          throw error;
        }
      },

      setLoading: loading => {
        set({ loading });
      },

      setError: error => {
        set({ error });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          loading: false,
          error: null,
        });
      },
    })),
    {
      name: 'user-store',
      partialize: state => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// ============================================================================
// SELECTORS
// ============================================================================

export const userSelectors = {
  // Basic selectors
  user: (state: UserSlice) => state.user,
  isAuthenticated: (state: UserSlice) => state.isAuthenticated,
  loading: (state: UserSlice) => state.loading,
  error: (state: UserSlice) => state.error,

  // User info selectors
  userName: (state: UserSlice) => state.user?.name || 'Guest',
  userEmail: (state: UserSlice) => state.user?.email || '',
  userAvatar: (state: UserSlice) => state.user?.avatar,
  userInitials: (state: UserSlice) => {
    if (!state.user?.name) return 'G';
    return state.user.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  },

  // Preferences selectors
  preferences: (state: UserSlice) =>
    state.user?.preferences || defaultPreferences,
  theme: (state: UserSlice) => state.user?.preferences?.theme || 'system',
  language: (state: UserSlice) => state.user?.preferences?.language || 'en',
  itemsPerPage: (state: UserSlice) =>
    state.user?.preferences?.itemsPerPage || 10,
  defaultFilters: (state: UserSlice) =>
    state.user?.preferences?.defaultFilters ||
    defaultPreferences.defaultFilters,
  notificationSettings: (state: UserSlice) =>
    state.user?.preferences?.notifications || defaultPreferences.notifications,

  // Computed selectors
  isGuest: (state: UserSlice) => !state.isAuthenticated,
  hasError: (state: UserSlice) => state.error !== null,
  lastLogin: (state: UserSlice) => state.user?.lastLogin,

  // Preference helpers
  getPreference: (state: UserSlice) => (key: keyof UserPreferences) =>
    state.user?.preferences?.[key] || defaultPreferences[key],

  // Notification helpers
  isNotificationEnabled:
    (state: UserSlice) => (type: keyof UserPreferences['notifications']) =>
      state.user?.preferences?.notifications?.[type] ??
      defaultPreferences.notifications[type],
};
