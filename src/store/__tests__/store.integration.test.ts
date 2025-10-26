/**
 * @file Store Integration Tests
 * @description Comprehensive integration tests for the Redux store
 * @version 2.0
 * @author PCPartKeeper Team
 */

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import store from '../index';
import itemsSlice from '../slices/itemsSlice';
import uiSlice from '../slices/uiSlice';
import userSlice from '../slices/userSlice';
import { Item, User } from '../types';

expect.extend(toHaveNoViolations);

// Mock components for testing
const TestComponent = () => {
  const items = store.getState().items.items;
  const user = store.getState().user.user;
  const theme = store.getState().ui.theme;

  return (
    <div>
      <h1>Test Component</h1>
      <div data-testid="items-count">{items.length}</div>
      <div data-testid="user-name">{user?.name || 'No user'}</div>
      <div data-testid="theme">{theme}</div>
      <button 
        data-testid="add-item" 
        onClick={() => store.dispatch(itemsSlice.actions.addItem({
          id: 1,
          name: 'Test Item',
          category: 'Test',
          brand: 'Test Brand',
          price: 100,
          quantity: 1,
          rating: 4.0,
          dateAdded: '2024-01-01',
          inStock: true,
        }))}
      >
        Add Item
      </button>
      <button 
        data-testid="toggle-theme" 
        onClick={() => store.dispatch(uiSlice.actions.toggleTheme())}
      >
        Toggle Theme
      </button>
      <button 
        data-testid="set-user" 
        onClick={() => store.dispatch(userSlice.actions.setUser({
          id: 1,
          email: 'test@example.com',
          name: 'Test User',
          avatar: '',
          role: 'user',
          preferences: {
            theme: 'light',
            language: 'en',
            timezone: 'UTC',
            dateFormat: 'MM/DD/YYYY',
            currency: 'USD',
            notifications: { email: true, push: true, sms: false },
          },
          profile: {
            bio: '',
            location: '',
            website: '',
            socialLinks: {},
          },
          settings: {
            privacy: { profileVisible: true, emailVisible: false, locationVisible: true },
            security: { twoFactorEnabled: false, emailVerified: true, phoneVerified: false },
          },
          lastLogin: '2024-01-01T00:00:00Z',
          loginCount: 1,
          sessionTimeout: 30,
          rememberMe: true,
          autoLogout: false,
          passwordChanged: '2024-01-01T00:00:00Z',
          accountStatus: 'active',
          subscription: { plan: 'free', status: 'active', expiresAt: '2024-12-31T23:59:59Z' },
          permissions: [],
          groups: [],
          tags: [],
          notes: '',
          metadata: {},
        }))}
      >
        Set User
      </button>
    </div>
  );
};

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

describe('Store Integration', () => {
  describe('Store Configuration', () => {
    it('has correct initial state', () => {
      const state = store.getState();

      expect(state).toHaveProperty('items');
      expect(state).toHaveProperty('ui');
      expect(state).toHaveProperty('user');

      expect(state.items).toEqual({
        items: [],
        loading: false,
        error: null,
        searchTerm: '',
        filters: {
          category: '',
          brand: '',
          inStock: null,
          priceRange: { min: 0, max: 10000 },
        },
        sorting: {
          field: 'name',
          direction: 'asc',
        },
        pagination: {
          page: 1,
          pageSize: 10,
          total: 0,
        },
        selectedItems: [],
        selectedAll: false,
      });

      expect(state.ui).toEqual({
        theme: 'light',
        sidebarOpen: true,
        modalOpen: false,
        modalContent: null,
        notification: null,
        loading: false,
        error: null,
        pageTitle: 'PCPartKeeper',
        breadcrumbs: [],
        activeTab: 'items',
        viewMode: 'table',
        pageSize: 10,
        sortDirection: 'asc',
        filterOpen: false,
        searchOpen: false,
        mobileMenuOpen: false,
        drawerOpen: false,
        tooltipOpen: false,
        tooltipContent: null,
        toast: null,
        confirmDialog: null,
      });

      expect(state.user).toEqual({
        user: null,
        loading: false,
        error: null,
      });
    });

    it('has correct reducers', () => {
      const state = store.getState();

      expect(state.items).toBeDefined();
      expect(state.ui).toBeDefined();
      expect(state.user).toBeDefined();
    });
  });

  describe('Cross-Slice Interactions', () => {
    it('handles theme changes across slices', () => {
      const state = store.getState();
      expect(state.ui.theme).toBe('light');

      store.dispatch(uiSlice.actions.setTheme('dark'));
      const newState = store.getState();
      expect(newState.ui.theme).toBe('dark');
    });

    it('handles user preferences affecting UI state', () => {
      const user: User = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        avatar: '',
        role: 'user',
        preferences: {
          theme: 'dark',
          language: 'en',
          timezone: 'UTC',
          dateFormat: 'MM/DD/YYYY',
          currency: 'USD',
          notifications: { email: true, push: true, sms: false },
        },
        profile: {
          bio: '',
          location: '',
          website: '',
          socialLinks: {},
        },
        settings: {
          privacy: { profileVisible: true, emailVisible: false, locationVisible: true },
          security: { twoFactorEnabled: false, emailVerified: true, phoneVerified: false },
        },
        lastLogin: '2024-01-01T00:00:00Z',
        loginCount: 1,
        sessionTimeout: 30,
        rememberMe: true,
        autoLogout: false,
        passwordChanged: '2024-01-01T00:00:00Z',
        accountStatus: 'active',
        subscription: { plan: 'free', status: 'active', expiresAt: '2024-12-31T23:59:59Z' },
        permissions: [],
        groups: [],
        tags: [],
        notes: '',
        metadata: {},
      };

      store.dispatch(userSlice.actions.setUser(user));
      const state = store.getState();

      expect(state.user.user?.preferences?.theme).toBe('dark');
      expect(state.ui.theme).toBe('light'); // UI state should not be automatically synced
    });

    it('handles loading states across slices', () => {
      store.dispatch(itemsSlice.actions.setLoading(true));
      store.dispatch(uiSlice.actions.setLoading(true));
      store.dispatch(userSlice.actions.setLoading(true));

      const state = store.getState();

      expect(state.items.loading).toBe(true);
      expect(state.ui.loading).toBe(true);
      expect(state.user.loading).toBe(true);
    });

    it('handles error states across slices', () => {
      store.dispatch(itemsSlice.actions.setError('Items error'));
      store.dispatch(uiSlice.actions.setError('UI error'));
      store.dispatch(userSlice.actions.setError('User error'));

      const state = store.getState();

      expect(state.items.error).toBe('Items error');
      expect(state.ui.error).toBe('UI error');
      expect(state.user.error).toBe('User error');
    });
  });

  describe('Component Integration', () => {
    it('renders with store state', () => {
      render(
        <TestWrapper>
          <TestComponent />
        </TestWrapper>
      );

      expect(screen.getByText('Test Component')).toBeInTheDocument();
      expect(screen.getByTestId('items-count')).toHaveTextContent('0');
      expect(screen.getByTestId('user-name')).toHaveTextContent('No user');
      expect(screen.getByTestId('theme')).toHaveTextContent('light');
    });

    it('updates when store state changes', () => {
      render(
        <TestWrapper>
          <TestComponent />
        </TestWrapper>
      );

      // Add item
      fireEvent.click(screen.getByTestId('add-item'));
      expect(screen.getByTestId('items-count')).toHaveTextContent('1');

      // Toggle theme
      fireEvent.click(screen.getByTestId('toggle-theme'));
      expect(screen.getByTestId('theme')).toHaveTextContent('dark');

      // Set user
      fireEvent.click(screen.getByTestId('set-user'));
      expect(screen.getByTestId('user-name')).toHaveTextContent('Test User');
    });

    it('handles multiple state updates', () => {
      render(
        <TestWrapper>
          <TestComponent />
        </TestWrapper>
      );

      // Multiple updates
      fireEvent.click(screen.getByTestId('add-item'));
      fireEvent.click(screen.getByTestId('add-item'));
      fireEvent.click(screen.getByTestId('toggle-theme'));
      fireEvent.click(screen.getByTestId('set-user'));

      expect(screen.getByTestId('items-count')).toHaveTextContent('2');
      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
      expect(screen.getByTestId('user-name')).toHaveTextContent('Test User');
    });
  });

  describe('State Persistence', () => {
    it('maintains state across multiple dispatches', () => {
      const initialState = store.getState();

      // Multiple dispatches
      store.dispatch(itemsSlice.actions.addItem({
        id: 1,
        name: 'Item 1',
        category: 'Test',
        brand: 'Test Brand',
        price: 100,
        quantity: 1,
        rating: 4.0,
        dateAdded: '2024-01-01',
        inStock: true,
      }));

      store.dispatch(itemsSlice.actions.addItem({
        id: 2,
        name: 'Item 2',
        category: 'Test',
        brand: 'Test Brand',
        price: 200,
        quantity: 2,
        rating: 4.5,
        dateAdded: '2024-01-02',
        inStock: true,
      }));

      store.dispatch(uiSlice.actions.setTheme('dark'));
      store.dispatch(uiSlice.actions.setSidebarOpen(false));

      store.dispatch(userSlice.actions.setUser({
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        avatar: '',
        role: 'user',
        preferences: {
          theme: 'dark',
          language: 'en',
          timezone: 'UTC',
          dateFormat: 'MM/DD/YYYY',
          currency: 'USD',
          notifications: { email: true, push: true, sms: false },
        },
        profile: {
          bio: '',
          location: '',
          website: '',
          socialLinks: {},
        },
        settings: {
          privacy: { profileVisible: true, emailVisible: false, locationVisible: true },
          security: { twoFactorEnabled: false, emailVerified: true, phoneVerified: false },
        },
        lastLogin: '2024-01-01T00:00:00Z',
        loginCount: 1,
        sessionTimeout: 30,
        rememberMe: true,
        autoLogout: false,
        passwordChanged: '2024-01-01T00:00:00Z',
        accountStatus: 'active',
        subscription: { plan: 'free', status: 'active', expiresAt: '2024-12-31T23:59:59Z' },
        permissions: [],
        groups: [],
        tags: [],
        notes: '',
        metadata: {},
      }));

      const finalState = store.getState();

      expect(finalState.items.items).toHaveLength(2);
      expect(finalState.ui.theme).toBe('dark');
      expect(finalState.ui.sidebarOpen).toBe(false);
      expect(finalState.user.user?.name).toBe('Test User');
    });

    it('handles state updates in correct order', () => {
      const updates: string[] = [];

      // Subscribe to state changes
      const unsubscribe = store.subscribe(() => {
        const state = store.getState();
        updates.push(`items:${state.items.items.length},ui:${state.ui.theme},user:${state.user.user?.name || 'null'}`);
      });

      // Perform updates
      store.dispatch(itemsSlice.actions.addItem({
        id: 1,
        name: 'Item 1',
        category: 'Test',
        brand: 'Test Brand',
        price: 100,
        quantity: 1,
        rating: 4.0,
        dateAdded: '2024-01-01',
        inStock: true,
      }));

      store.dispatch(uiSlice.actions.setTheme('dark'));

      store.dispatch(userSlice.actions.setUser({
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        avatar: '',
        role: 'user',
        preferences: {
          theme: 'dark',
          language: 'en',
          timezone: 'UTC',
          dateFormat: 'MM/DD/YYYY',
          currency: 'USD',
          notifications: { email: true, push: true, sms: false },
        },
        profile: {
          bio: '',
          location: '',
          website: '',
          socialLinks: {},
        },
        settings: {
          privacy: { profileVisible: true, emailVisible: false, locationVisible: true },
          security: { twoFactorEnabled: false, emailVerified: true, phoneVerified: false },
        },
        lastLogin: '2024-01-01T00:00:00Z',
        loginCount: 1,
        sessionTimeout: 30,
        rememberMe: true,
        autoLogout: false,
        passwordChanged: '2024-01-01T00:00:00Z',
        accountStatus: 'active',
        subscription: { plan: 'free', status: 'active', expiresAt: '2024-12-31T23:59:59Z' },
        permissions: [],
        groups: [],
        tags: [],
        notes: '',
        metadata: {},
      }));

      unsubscribe();

      expect(updates).toHaveLength(3);
      expect(updates[0]).toBe('items:1,ui:light,user:null');
      expect(updates[1]).toBe('items:1,ui:dark,user:null');
      expect(updates[2]).toBe('items:1,ui:dark,user:Test User');
    });
  });

  describe('Error Handling', () => {
    it('handles errors in one slice without affecting others', () => {
      store.dispatch(itemsSlice.actions.setError('Items error'));
      store.dispatch(uiSlice.actions.setError('UI error'));

      const state = store.getState();

      expect(state.items.error).toBe('Items error');
      expect(state.ui.error).toBe('UI error');
      expect(state.user.error).toBeNull();
    });

    it('handles invalid actions gracefully', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      // @ts-ignore - Testing invalid action
      store.dispatch({ type: 'INVALID_ACTION' });

      const state = store.getState();

      // State should remain unchanged
      expect(state.items.items).toEqual([]);
      expect(state.ui.theme).toBe('light');
      expect(state.user.user).toBeNull();

      consoleSpy.mockRestore();
    });
  });

  describe('Performance', () => {
    it('handles large state updates efficiently', () => {
      const largeItems: Item[] = Array.from({ length: 1000 }, (_, i) => ({
        id: i + 1,
        name: `Item ${i + 1}`,
        category: 'Test',
        brand: 'Test Brand',
        price: Math.random() * 1000,
        quantity: Math.floor(Math.random() * 10),
        rating: Math.random() * 5,
        dateAdded: '2024-01-01',
        inStock: Math.random() > 0.5,
      }));

      const startTime = performance.now();
      store.dispatch(itemsSlice.actions.setItems(largeItems));
      const endTime = performance.now();

      const state = store.getState();
      expect(state.items.items).toHaveLength(1000);
      expect(endTime - startTime).toBeLessThan(100); // Should complete within 100ms
    });

    it('handles rapid state updates efficiently', () => {
      const startTime = performance.now();

      // Rapid updates
      for (let i = 0; i < 100; i++) {
        store.dispatch(uiSlice.actions.setTheme(i % 2 === 0 ? 'light' : 'dark'));
        store.dispatch(itemsSlice.actions.setLoading(i % 2 === 0));
        store.dispatch(userSlice.actions.setLoading(i % 2 === 0));
      }

      const endTime = performance.now();

      const state = store.getState();
      expect(state.ui.theme).toBe('dark');
      expect(state.items.loading).toBe(false);
      expect(state.user.loading).toBe(false);
      expect(endTime - startTime).toBeLessThan(50); // Should complete within 50ms
    });
  });

  describe('Accessibility', () => {
    it('is accessible', async () => {
      const { container } = render(
        <TestWrapper>
          <TestComponent />
        </TestWrapper>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Memory Management', () => {
    it('does not leak memory with frequent updates', () => {
      const initialMemory = process.memoryUsage().heapUsed;

      // Perform many updates
      for (let i = 0; i < 1000; i++) {
        store.dispatch(uiSlice.actions.setTheme(i % 2 === 0 ? 'light' : 'dark'));
        store.dispatch(itemsSlice.actions.setLoading(i % 2 === 0));
      }

      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }

      const finalMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = finalMemory - initialMemory;

      // Memory increase should be reasonable (less than 10MB)
      expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024);
    });
  });
});
