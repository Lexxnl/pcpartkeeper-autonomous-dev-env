/**
 * @file User Slice Tests
 * @description Comprehensive unit tests for the user Redux slice
 * @version 2.0
 * @author PCPartKeeper Team
 */

import { configureStore } from '@reduxjs/toolkit';
import userSlice, { 
  setUser, 
  updateUser, 
  clearUser, 
  setLoading, 
  setError, 
  clearError,
  setPreferences,
  updatePreferences,
  setTheme,
  setLanguage,
  setTimezone,
  setDateFormat,
  setCurrency,
  setNotifications,
  updateNotificationSettings,
  setProfile,
  updateProfile,
  setAvatar,
  setBio,
  setLocation,
  setWebsite,
  setSocialLinks,
  updateSocialLinks,
  setPrivacySettings,
  updatePrivacySettings,
  setSecuritySettings,
  updateSecuritySettings,
  setTwoFactorEnabled,
  setEmailVerified,
  setPhoneVerified,
  setLastLogin,
  setLoginCount,
  incrementLoginCount,
  setSessionTimeout,
  setRememberMe,
  setAutoLogout,
  setPasswordChanged,
  setAccountStatus,
  setSubscription,
  updateSubscription,
  setPermissions,
  updatePermissions,
  setRole,
  setGroups,
  updateGroups,
  setTags,
  updateTags,
  setNotes,
  updateNotes,
  setMetadata,
  updateMetadata
} from '../slices/userSlice';
import { User, UserPreferences, UserProfile, UserSettings } from '../types';

// Mock store for testing
const createMockStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      user: userSlice.reducer,
    },
    preloadedState,
  });
};

// Mock data
const mockUser: User = {
  id: 1,
  email: 'test@example.com',
  name: 'John Doe',
  avatar: 'https://example.com/avatar.jpg',
  role: 'user',
  preferences: {
    theme: 'light',
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD',
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
  },
  profile: {
    bio: 'PC enthusiast',
    location: 'New York',
    website: 'https://johndoe.com',
    socialLinks: {
      twitter: 'https://twitter.com/johndoe',
      github: 'https://github.com/johndoe',
    },
  },
  settings: {
    privacy: {
      profileVisible: true,
      emailVisible: false,
      locationVisible: true,
    },
    security: {
      twoFactorEnabled: false,
      emailVerified: true,
      phoneVerified: false,
    },
  },
  lastLogin: '2024-01-15T10:30:00Z',
  loginCount: 42,
  sessionTimeout: 30,
  rememberMe: true,
  autoLogout: false,
  passwordChanged: '2024-01-01T00:00:00Z',
  accountStatus: 'active',
  subscription: {
    plan: 'free',
    status: 'active',
    expiresAt: '2024-12-31T23:59:59Z',
  },
  permissions: ['read:items', 'write:items'],
  groups: ['users', 'premium'],
  tags: ['enthusiast', 'builder'],
  notes: 'VIP customer',
  metadata: {
    source: 'web',
    referrer: 'google',
  },
};

describe('User Slice', () => {
  describe('Initial State', () => {
    it('has correct initial state', () => {
      const store = createMockStore();
      const state = store.getState().user;

      expect(state).toEqual({
        user: null,
        loading: false,
        error: null,
      });
    });
  });

  describe('Basic User Operations', () => {
    it('sets user correctly', () => {
      const store = createMockStore();
      
      store.dispatch(setUser(mockUser));
      const state = store.getState().user;

      expect(state.user).toEqual(mockUser);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('updates user correctly', () => {
      const store = createMockStore({
        user: { user: mockUser, loading: false, error: null }
      });
      
      const updates = { name: 'Jane Doe', email: 'jane@example.com' };
      store.dispatch(updateUser(updates));
      const state = store.getState().user;

      expect(state.user?.name).toBe('Jane Doe');
      expect(state.user?.email).toBe('jane@example.com');
      expect(state.user?.id).toBe(1); // Other properties should remain unchanged
    });

    it('clears user correctly', () => {
      const store = createMockStore({
        user: { user: mockUser, loading: false, error: null }
      });
      
      store.dispatch(clearUser());
      const state = store.getState().user;

      expect(state.user).toBeNull();
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });
  });

  describe('Loading and Error States', () => {
    it('sets loading state', () => {
      const store = createMockStore();
      
      store.dispatch(setLoading(true));
      let state = store.getState().user;
      expect(state.loading).toBe(true);

      store.dispatch(setLoading(false));
      state = store.getState().user;
      expect(state.loading).toBe(false);
    });

    it('sets error state', () => {
      const store = createMockStore();
      const error = 'Authentication failed';
      
      store.dispatch(setError(error));
      let state = store.getState().user;
      expect(state.error).toBe(error);

      store.dispatch(clearError());
      state = store.getState().user;
      expect(state.error).toBeNull();
    });
  });

  describe('Preferences Management', () => {
    it('sets preferences', () => {
      const store = createMockStore({
        user: { user: mockUser, loading: false, error: null }
      });
      
      const newPreferences: UserPreferences = {
        theme: 'dark',
        language: 'es',
        timezone: 'America/New_York',
        dateFormat: 'DD/MM/YYYY',
        currency: 'EUR',
        notifications: {
          email: false,
          push: true,
          sms: true,
        },
      };
      
      store.dispatch(setPreferences(newPreferences));
      const state = store.getState().user;

      expect(state.user?.preferences).toEqual(newPreferences);
    });

    it('updates preferences', () => {
      const store = createMockStore({
        user: { user: mockUser, loading: false, error: null }
      });
      
      store.dispatch(updatePreferences({ theme: 'dark' }));
      const state = store.getState().user;

      expect(state.user?.preferences?.theme).toBe('dark');
      expect(state.user?.preferences?.language).toBe('en'); // Should remain unchanged
    });

    it('sets individual preference properties', () => {
      const store = createMockStore({
        user: { user: mockUser, loading: false, error: null }
      });
      
      store.dispatch(setTheme('dark'));
      store.dispatch(setLanguage('fr'));
      store.dispatch(setTimezone('Europe/Paris'));
      store.dispatch(setDateFormat('DD/MM/YYYY'));
      store.dispatch(setCurrency('EUR'));
      
      const state = store.getState().user;

      expect(state.user?.preferences?.theme).toBe('dark');
      expect(state.user?.preferences?.language).toBe('fr');
      expect(state.user?.preferences?.timezone).toBe('Europe/Paris');
      expect(state.user?.preferences?.dateFormat).toBe('DD/MM/YYYY');
      expect(state.user?.preferences?.currency).toBe('EUR');
    });

    it('sets notification settings', () => {
      const store = createMockStore({
        user: { user: mockUser, loading: false, error: null }
      });
      
      const notifications = {
        email: false,
        push: true,
        sms: true,
      };
      
      store.dispatch(setNotifications(notifications));
      const state = store.getState().user;

      expect(state.user?.preferences?.notifications).toEqual(notifications);
    });

    it('updates notification settings', () => {
      const store = createMockStore({
        user: { user: mockUser, loading: false, error: null }
      });
      
      store.dispatch(updateNotificationSettings({ email: false }));
      const state = store.getState().user;

      expect(state.user?.preferences?.notifications?.email).toBe(false);
      expect(state.user?.preferences?.notifications?.push).toBe(true); // Should remain unchanged
    });
  });

  describe('Profile Management', () => {
    it('sets profile', () => {
      const store = createMockStore({
        user: { user: mockUser, loading: false, error: null }
      });
      
      const newProfile: UserProfile = {
        bio: 'Updated bio',
        location: 'San Francisco',
        website: 'https://newsite.com',
        socialLinks: {
          twitter: 'https://twitter.com/newhandle',
          github: 'https://github.com/newhandle',
          linkedin: 'https://linkedin.com/in/newhandle',
        },
      };
      
      store.dispatch(setProfile(newProfile));
      const state = store.getState().user;

      expect(state.user?.profile).toEqual(newProfile);
    });

    it('updates profile', () => {
      const store = createMockStore({
        user: { user: mockUser, loading: false, error: null }
      });
      
      store.dispatch(updateProfile({ bio: 'New bio' }));
      const state = store.getState().user;

      expect(state.user?.profile?.bio).toBe('New bio');
      expect(state.user?.profile?.location).toBe('New York'); // Should remain unchanged
    });

    it('sets individual profile properties', () => {
      const store = createMockStore({
        user: { user: mockUser, loading: false, error: null }
      });
      
      store.dispatch(setAvatar('https://newavatar.com/image.jpg'));
      store.dispatch(setBio('New bio text'));
      store.dispatch(setLocation('Los Angeles'));
      store.dispatch(setWebsite('https://newwebsite.com'));
      
      const state = store.getState().user;

      expect(state.user?.avatar).toBe('https://newavatar.com/image.jpg');
      expect(state.user?.profile?.bio).toBe('New bio text');
      expect(state.user?.profile?.location).toBe('Los Angeles');
      expect(state.user?.profile?.website).toBe('https://newwebsite.com');
    });

    it('sets social links', () => {
      const store = createMockStore({
        user: { user: mockUser, loading: false, error: null }
      });
      
      const socialLinks = {
        twitter: 'https://twitter.com/newhandle',
        github: 'https://github.com/newhandle',
        linkedin: 'https://linkedin.com/in/newhandle',
        instagram: 'https://instagram.com/newhandle',
      };
      
      store.dispatch(setSocialLinks(socialLinks));
      const state = store.getState().user;

      expect(state.user?.profile?.socialLinks).toEqual(socialLinks);
    });

    it('updates social links', () => {
      const store = createMockStore({
        user: { user: mockUser, loading: false, error: null }
      });
      
      store.dispatch(updateSocialLinks({ twitter: 'https://twitter.com/updated' }));
      const state = store.getState().user;

      expect(state.user?.profile?.socialLinks?.twitter).toBe('https://twitter.com/updated');
      expect(state.user?.profile?.socialLinks?.github).toBe('https://github.com/johndoe'); // Should remain unchanged
    });
  });

  describe('Settings Management', () => {
    it('sets privacy settings', () => {
      const store = createMockStore({
        user: { user: mockUser, loading: false, error: null }
      });
      
      const privacySettings = {
        profileVisible: false,
        emailVisible: true,
        locationVisible: false,
      };
      
      store.dispatch(setPrivacySettings(privacySettings));
      const state = store.getState().user;

      expect(state.user?.settings?.privacy).toEqual(privacySettings);
    });

    it('updates privacy settings', () => {
      const store = createMockStore({
        user: { user: mockUser, loading: false, error: null }
      });
      
      store.dispatch(updatePrivacySettings({ profileVisible: false }));
      const state = store.getState().user;

      expect(state.user?.settings?.privacy?.profileVisible).toBe(false);
      expect(state.user?.settings?.privacy?.emailVisible).toBe(false); // Should remain unchanged
    });

    it('sets security settings', () => {
      const store = createMockStore({
        user: { user: mockUser, loading: false, error: null }
      });
      
      const securitySettings = {
        twoFactorEnabled: true,
        emailVerified: true,
        phoneVerified: true,
      };
      
      store.dispatch(setSecuritySettings(securitySettings));
      const state = store.getState().user;

      expect(state.user?.settings?.security).toEqual(securitySettings);
    });

    it('updates security settings', () => {
      const store = createMockStore({
        user: { user: mockUser, loading: false, error: null }
      });
      
      store.dispatch(updateSecuritySettings({ twoFactorEnabled: true }));
      const state = store.getState().user;

      expect(state.user?.settings?.security?.twoFactorEnabled).toBe(true);
      expect(state.user?.settings?.security?.emailVerified).toBe(true); // Should remain unchanged
    });

    it('sets individual security properties', () => {
      const store = createMockStore({
        user: { user: mockUser, loading: false, error: null }
      });
      
      store.dispatch(setTwoFactorEnabled(true));
      store.dispatch(setEmailVerified(false));
      store.dispatch(setPhoneVerified(true));
      
      const state = store.getState().user;

      expect(state.user?.settings?.security?.twoFactorEnabled).toBe(true);
      expect(state.user?.settings?.security?.emailVerified).toBe(false);
      expect(state.user?.settings?.security?.phoneVerified).toBe(true);
    });
  });

  describe('Session Management', () => {
    it('sets session properties', () => {
      const store = createMockStore({
        user: { user: mockUser, loading: false, error: null }
      });
      
      store.dispatch(setLastLogin('2024-01-20T15:30:00Z'));
      store.dispatch(setLoginCount(50));
      store.dispatch(setSessionTimeout(60));
      store.dispatch(setRememberMe(false));
      store.dispatch(setAutoLogout(true));
      
      const state = store.getState().user;

      expect(state.user?.lastLogin).toBe('2024-01-20T15:30:00Z');
      expect(state.user?.loginCount).toBe(50);
      expect(state.user?.sessionTimeout).toBe(60);
      expect(state.user?.rememberMe).toBe(false);
      expect(state.user?.autoLogout).toBe(true);
    });

    it('increments login count', () => {
      const store = createMockStore({
        user: { user: mockUser, loading: false, error: null }
      });
      
      store.dispatch(incrementLoginCount());
      const state = store.getState().user;

      expect(state.user?.loginCount).toBe(43); // 42 + 1
    });

    it('sets password changed date', () => {
      const store = createMockStore({
        user: { user: mockUser, loading: false, error: null }
      });
      
      const newDate = '2024-01-20T12:00:00Z';
      store.dispatch(setPasswordChanged(newDate));
      const state = store.getState().user;

      expect(state.user?.passwordChanged).toBe(newDate);
    });
  });

  describe('Account Management', () => {
    it('sets account status', () => {
      const store = createMockStore({
        user: { user: mockUser, loading: false, error: null }
      });
      
      store.dispatch(setAccountStatus('suspended'));
      const state = store.getState().user;

      expect(state.user?.accountStatus).toBe('suspended');
    });

    it('sets subscription', () => {
      const store = createMockStore({
        user: { user: mockUser, loading: false, error: null }
      });
      
      const subscription = {
        plan: 'premium',
        status: 'active',
        expiresAt: '2025-01-01T00:00:00Z',
      };
      
      store.dispatch(setSubscription(subscription));
      const state = store.getState().user;

      expect(state.user?.subscription).toEqual(subscription);
    });

    it('updates subscription', () => {
      const store = createMockStore({
        user: { user: mockUser, loading: false, error: null }
      });
      
      store.dispatch(updateSubscription({ plan: 'pro' }));
      const state = store.getState().user;

      expect(state.user?.subscription?.plan).toBe('pro');
      expect(state.user?.subscription?.status).toBe('active'); // Should remain unchanged
    });
  });

  describe('Permissions and Roles', () => {
    it('sets permissions', () => {
      const store = createMockStore({
        user: { user: mockUser, loading: false, error: null }
      });
      
      const permissions = ['read:items', 'write:items', 'delete:items', 'admin:all'];
      store.dispatch(setPermissions(permissions));
      const state = store.getState().user;

      expect(state.user?.permissions).toEqual(permissions);
    });

    it('updates permissions', () => {
      const store = createMockStore({
        user: { user: mockUser, loading: false, error: null }
      });
      
      store.dispatch(updatePermissions(['read:items', 'write:items', 'new:permission']));
      const state = store.getState().user;

      expect(state.user?.permissions).toEqual(['read:items', 'write:items', 'new:permission']);
    });

    it('sets role', () => {
      const store = createMockStore({
        user: { user: mockUser, loading: false, error: null }
      });
      
      store.dispatch(setRole('admin'));
      const state = store.getState().user;

      expect(state.user?.role).toBe('admin');
    });

    it('sets groups', () => {
      const store = createMockStore({
        user: { user: mockUser, loading: false, error: null }
      });
      
      const groups = ['users', 'premium', 'beta-testers'];
      store.dispatch(setGroups(groups));
      const state = store.getState().user;

      expect(state.user?.groups).toEqual(groups);
    });

    it('updates groups', () => {
      const store = createMockStore({
        user: { user: mockUser, loading: false, error: null }
      });
      
      store.dispatch(updateGroups(['users', 'premium', 'new-group']));
      const state = store.getState().user;

      expect(state.user?.groups).toEqual(['users', 'premium', 'new-group']);
    });
  });

  describe('Tags and Metadata', () => {
    it('sets tags', () => {
      const store = createMockStore({
        user: { user: mockUser, loading: false, error: null }
      });
      
      const tags = ['enthusiast', 'builder', 'reviewer', 'moderator'];
      store.dispatch(setTags(tags));
      const state = store.getState().user;

      expect(state.user?.tags).toEqual(tags);
    });

    it('updates tags', () => {
      const store = createMockStore({
        user: { user: mockUser, loading: false, error: null }
      });
      
      store.dispatch(updateTags(['enthusiast', 'builder', 'new-tag']));
      const state = store.getState().user;

      expect(state.user?.tags).toEqual(['enthusiast', 'builder', 'new-tag']);
    });

    it('sets notes', () => {
      const store = createMockStore({
        user: { user: mockUser, loading: false, error: null }
      });
      
      store.dispatch(setNotes('Updated notes about the user'));
      const state = store.getState().user;

      expect(state.user?.notes).toBe('Updated notes about the user');
    });

    it('updates notes', () => {
      const store = createMockStore({
        user: { user: mockUser, loading: false, error: null }
      });
      
      store.dispatch(updateNotes('Additional information'));
      const state = store.getState().user;

      expect(state.user?.notes).toBe('Additional information');
    });

    it('sets metadata', () => {
      const store = createMockStore({
        user: { user: mockUser, loading: false, error: null }
      });
      
      const metadata = {
        source: 'mobile',
        referrer: 'facebook',
        campaign: 'summer2024',
        version: '2.0',
      };
      
      store.dispatch(setMetadata(metadata));
      const state = store.getState().user;

      expect(state.user?.metadata).toEqual(metadata);
    });

    it('updates metadata', () => {
      const store = createMockStore({
        user: { user: mockUser, loading: false, error: null }
      });
      
      store.dispatch(updateMetadata({ source: 'mobile', version: '2.1' }));
      const state = store.getState().user;

      expect(state.user?.metadata?.source).toBe('mobile');
      expect(state.user?.metadata?.version).toBe('2.1');
      expect(state.user?.metadata?.referrer).toBe('google'); // Should remain unchanged
    });
  });

  describe('Complex State Updates', () => {
    it('handles multiple user updates in sequence', () => {
      const store = createMockStore();
      
      // Set initial user
      store.dispatch(setUser(mockUser));
      
      // Update basic info
      store.dispatch(updateUser({ name: 'Jane Doe' }));
      
      // Update preferences
      store.dispatch(setTheme('dark'));
      store.dispatch(setLanguage('es'));
      
      // Update profile
      store.dispatch(updateProfile({ bio: 'Updated bio' }));
      
      // Update settings
      store.dispatch(updatePrivacySettings({ profileVisible: false }));
      store.dispatch(setTwoFactorEnabled(true));
      
      // Update session
      store.dispatch(setLastLogin('2024-01-20T15:30:00Z'));
      store.dispatch(incrementLoginCount());
      
      // Update account
      store.dispatch(setRole('admin'));
      store.dispatch(updatePermissions(['admin:all']));
      
      const state = store.getState().user;

      expect(state.user?.name).toBe('Jane Doe');
      expect(state.user?.preferences?.theme).toBe('dark');
      expect(state.user?.preferences?.language).toBe('es');
      expect(state.user?.profile?.bio).toBe('Updated bio');
      expect(state.user?.settings?.privacy?.profileVisible).toBe(false);
      expect(state.user?.settings?.security?.twoFactorEnabled).toBe(true);
      expect(state.user?.lastLogin).toBe('2024-01-20T15:30:00Z');
      expect(state.user?.loginCount).toBe(43);
      expect(state.user?.role).toBe('admin');
      expect(state.user?.permissions).toEqual(['admin:all']);
    });

    it('handles error state with other updates', () => {
      const store = createMockStore({
        user: { user: mockUser, loading: false, error: null }
      });
      
      store.dispatch(setError('Update failed'));
      store.dispatch(setLoading(true));
      store.dispatch(updateUser({ name: 'Error User' }));
      
      const state = store.getState().user;

      expect(state.error).toBe('Update failed');
      expect(state.loading).toBe(true);
      expect(state.user?.name).toBe('Error User');
    });
  });

  describe('Edge Cases', () => {
    it('handles null/undefined values gracefully', () => {
      const store = createMockStore();
      
      store.dispatch(setUser(null));
      store.dispatch(setError(null));
      store.dispatch(setPreferences(null as any));
      store.dispatch(setProfile(null as any));
      
      const state = store.getState().user;

      expect(state.user).toBeNull();
      expect(state.error).toBeNull();
    });

    it('handles partial updates correctly', () => {
      const store = createMockStore({
        user: { user: mockUser, loading: false, error: null }
      });
      
      // Update only specific fields
      store.dispatch(updateUser({ name: 'New Name' }));
      store.dispatch(updatePreferences({ theme: 'dark' }));
      store.dispatch(updateProfile({ bio: 'New Bio' }));
      
      const state = store.getState().user;

      expect(state.user?.name).toBe('New Name');
      expect(state.user?.preferences?.theme).toBe('dark');
      expect(state.user?.preferences?.language).toBe('en'); // Should remain unchanged
      expect(state.user?.profile?.bio).toBe('New Bio');
      expect(state.user?.profile?.location).toBe('New York'); // Should remain unchanged
    });

    it('handles invalid data types gracefully', () => {
      const store = createMockStore({
        user: { user: mockUser, loading: false, error: null }
      });
      
      // @ts-ignore - Testing invalid data types
      store.dispatch(updateUser({ name: 123 }));
      // @ts-ignore - Testing invalid data types
      store.dispatch(updatePreferences({ theme: 456 }));
      
      const state = store.getState().user;

      // Should maintain previous values or handle gracefully
      expect(state.user?.name).toBe('John Doe');
      expect(state.user?.preferences?.theme).toBe('light');
    });
  });

  describe('Performance', () => {
    it('handles large user objects efficiently', () => {
      const largeUser = {
        ...mockUser,
        metadata: {
          ...mockUser.metadata,
          largeArray: Array.from({ length: 1000 }, (_, i) => `item-${i}`),
          largeObject: Object.fromEntries(
            Array.from({ length: 100 }, (_, i) => [`key-${i}`, `value-${i}`])
          ),
        },
      };

      const store = createMockStore();
      
      const startTime = performance.now();
      store.dispatch(setUser(largeUser));
      const endTime = performance.now();
      
      const state = store.getState().user;
      expect(state.user).toEqual(largeUser);
      expect(endTime - startTime).toBeLessThan(100); // Should complete within 100ms
    });

    it('handles rapid updates efficiently', () => {
      const store = createMockStore({
        user: { user: mockUser, loading: false, error: null }
      });
      
      const startTime = performance.now();
      
      // Simulate rapid updates
      for (let i = 0; i < 50; i++) {
        store.dispatch(updateUser({ name: `User ${i}` }));
        store.dispatch(setTheme(i % 2 === 0 ? 'light' : 'dark'));
        store.dispatch(incrementLoginCount());
      }
      
      const endTime = performance.now();
      
      const state = store.getState().user;
      expect(state.user?.name).toBe('User 49');
      expect(state.user?.preferences?.theme).toBe('dark');
      expect(state.user?.loginCount).toBe(92); // 42 + 50
      expect(endTime - startTime).toBeLessThan(50); // Should complete within 50ms
    });
  });
});
