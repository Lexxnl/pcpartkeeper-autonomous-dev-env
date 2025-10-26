/**
 * @file UI Slice Tests
 * @description Comprehensive unit tests for the UI Redux slice
 * @version 2.0
 * @author PCPartKeeper Team
 */

import { configureStore } from '@reduxjs/toolkit';
import uiSlice, { 
  setTheme, 
  toggleTheme, 
  setSidebarOpen, 
  toggleSidebar,
  setModalOpen,
  setModalContent,
  setNotification,
  clearNotification,
  setLoading,
  setError,
  clearError,
  setPageTitle,
  setBreadcrumbs,
  setActiveTab,
  setViewMode,
  setPageSize,
  setSortDirection,
  setFilterOpen,
  setSearchOpen,
  setMobileMenuOpen,
  toggleMobileMenu,
  setDrawerOpen,
  toggleDrawer,
  setTooltipOpen,
  setTooltipContent,
  setToast,
  clearToast,
  setConfirmDialog,
  clearConfirmDialog
} from '../slices/uiSlice';

// Mock store for testing
const createMockStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer,
    },
    preloadedState,
  });
};

describe('UI Slice', () => {
  describe('Initial State', () => {
    it('has correct initial state', () => {
      const store = createMockStore();
      const state = store.getState().ui;

      expect(state).toEqual({
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
    });
  });

  describe('Theme Management', () => {
    it('sets theme correctly', () => {
      const store = createMockStore();
      
      store.dispatch(setTheme('dark'));
      let state = store.getState().ui;
      expect(state.theme).toBe('dark');

      store.dispatch(setTheme('light'));
      state = store.getState().ui;
      expect(state.theme).toBe('light');
    });

    it('toggles theme correctly', () => {
      const store = createMockStore();
      
      store.dispatch(toggleTheme());
      let state = store.getState().ui;
      expect(state.theme).toBe('dark');

      store.dispatch(toggleTheme());
      state = store.getState().ui;
      expect(state.theme).toBe('light');
    });
  });

  describe('Sidebar Management', () => {
    it('sets sidebar open state', () => {
      const store = createMockStore();
      
      store.dispatch(setSidebarOpen(false));
      let state = store.getState().ui;
      expect(state.sidebarOpen).toBe(false);

      store.dispatch(setSidebarOpen(true));
      state = store.getState().ui;
      expect(state.sidebarOpen).toBe(true);
    });

    it('toggles sidebar correctly', () => {
      const store = createMockStore();
      
      store.dispatch(toggleSidebar());
      let state = store.getState().ui;
      expect(state.sidebarOpen).toBe(false);

      store.dispatch(toggleSidebar());
      state = store.getState().ui;
      expect(state.sidebarOpen).toBe(true);
    });
  });

  describe('Modal Management', () => {
    it('sets modal open state', () => {
      const store = createMockStore();
      
      store.dispatch(setModalOpen(true));
      let state = store.getState().ui;
      expect(state.modalOpen).toBe(true);

      store.dispatch(setModalOpen(false));
      state = store.getState().ui;
      expect(state.modalOpen).toBe(false);
    });

    it('sets modal content', () => {
      const store = createMockStore();
      const content = { type: 'confirm', message: 'Are you sure?' };
      
      store.dispatch(setModalContent(content));
      const state = store.getState().ui;
      expect(state.modalContent).toEqual(content);
    });
  });

  describe('Notification Management', () => {
    it('sets notification', () => {
      const store = createMockStore();
      const notification = { type: 'success', message: 'Item saved successfully' };
      
      store.dispatch(setNotification(notification));
      const state = store.getState().ui;
      expect(state.notification).toEqual(notification);
    });

    it('clears notification', () => {
      const store = createMockStore({
        ui: { 
          theme: 'light', sidebarOpen: true, modalOpen: false, modalContent: null,
          notification: { type: 'success', message: 'Test' }, loading: false, error: null,
          pageTitle: 'PCPartKeeper', breadcrumbs: [], activeTab: 'items', viewMode: 'table',
          pageSize: 10, sortDirection: 'asc', filterOpen: false, searchOpen: false,
          mobileMenuOpen: false, drawerOpen: false, tooltipOpen: false, tooltipContent: null,
          toast: null, confirmDialog: null
        }
      });
      
      store.dispatch(clearNotification());
      const state = store.getState().ui;
      expect(state.notification).toBeNull();
    });
  });

  describe('Loading and Error States', () => {
    it('sets loading state', () => {
      const store = createMockStore();
      
      store.dispatch(setLoading(true));
      let state = store.getState().ui;
      expect(state.loading).toBe(true);

      store.dispatch(setLoading(false));
      state = store.getState().ui;
      expect(state.loading).toBe(false);
    });

    it('sets error state', () => {
      const store = createMockStore();
      const error = 'Something went wrong';
      
      store.dispatch(setError(error));
      let state = store.getState().ui;
      expect(state.error).toBe(error);

      store.dispatch(clearError());
      state = store.getState().ui;
      expect(state.error).toBeNull();
    });
  });

  describe('Page Management', () => {
    it('sets page title', () => {
      const store = createMockStore();
      
      store.dispatch(setPageTitle('Items - PCPartKeeper'));
      const state = store.getState().ui;
      expect(state.pageTitle).toBe('Items - PCPartKeeper');
    });

    it('sets breadcrumbs', () => {
      const store = createMockStore();
      const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Items', href: '/items' },
        { label: 'CPU', href: '/items?category=CPU' }
      ];
      
      store.dispatch(setBreadcrumbs(breadcrumbs));
      const state = store.getState().ui;
      expect(state.breadcrumbs).toEqual(breadcrumbs);
    });

    it('sets active tab', () => {
      const store = createMockStore();
      
      store.dispatch(setActiveTab('settings'));
      const state = store.getState().ui;
      expect(state.activeTab).toBe('settings');
    });
  });

  describe('View Management', () => {
    it('sets view mode', () => {
      const store = createMockStore();
      
      store.dispatch(setViewMode('grid'));
      let state = store.getState().ui;
      expect(state.viewMode).toBe('grid');

      store.dispatch(setViewMode('table'));
      state = store.getState().ui;
      expect(state.viewMode).toBe('table');
    });

    it('sets page size', () => {
      const store = createMockStore();
      
      store.dispatch(setPageSize(25));
      const state = store.getState().ui;
      expect(state.pageSize).toBe(25);
    });

    it('sets sort direction', () => {
      const store = createMockStore();
      
      store.dispatch(setSortDirection('desc'));
      let state = store.getState().ui;
      expect(state.sortDirection).toBe('desc');

      store.dispatch(setSortDirection('asc'));
      state = store.getState().ui;
      expect(state.sortDirection).toBe('asc');
    });
  });

  describe('Filter and Search UI', () => {
    it('sets filter open state', () => {
      const store = createMockStore();
      
      store.dispatch(setFilterOpen(true));
      let state = store.getState().ui;
      expect(state.filterOpen).toBe(true);

      store.dispatch(setFilterOpen(false));
      state = store.getState().ui;
      expect(state.filterOpen).toBe(false);
    });

    it('sets search open state', () => {
      const store = createMockStore();
      
      store.dispatch(setSearchOpen(true));
      let state = store.getState().ui;
      expect(state.searchOpen).toBe(true);

      store.dispatch(setSearchOpen(false));
      state = store.getState().ui;
      expect(state.searchOpen).toBe(false);
    });
  });

  describe('Mobile Menu Management', () => {
    it('sets mobile menu open state', () => {
      const store = createMockStore();
      
      store.dispatch(setMobileMenuOpen(true));
      let state = store.getState().ui;
      expect(state.mobileMenuOpen).toBe(true);

      store.dispatch(setMobileMenuOpen(false));
      state = store.getState().ui;
      expect(state.mobileMenuOpen).toBe(false);
    });

    it('toggles mobile menu correctly', () => {
      const store = createMockStore();
      
      store.dispatch(toggleMobileMenu());
      let state = store.getState().ui;
      expect(state.mobileMenuOpen).toBe(true);

      store.dispatch(toggleMobileMenu());
      state = store.getState().ui;
      expect(state.mobileMenuOpen).toBe(false);
    });
  });

  describe('Drawer Management', () => {
    it('sets drawer open state', () => {
      const store = createMockStore();
      
      store.dispatch(setDrawerOpen(true));
      let state = store.getState().ui;
      expect(state.drawerOpen).toBe(true);

      store.dispatch(setDrawerOpen(false));
      state = store.getState().ui;
      expect(state.drawerOpen).toBe(false);
    });

    it('toggles drawer correctly', () => {
      const store = createMockStore();
      
      store.dispatch(toggleDrawer());
      let state = store.getState().ui;
      expect(state.drawerOpen).toBe(true);

      store.dispatch(toggleDrawer());
      state = store.getState().ui;
      expect(state.drawerOpen).toBe(false);
    });
  });

  describe('Tooltip Management', () => {
    it('sets tooltip open state', () => {
      const store = createMockStore();
      
      store.dispatch(setTooltipOpen(true));
      let state = store.getState().ui;
      expect(state.tooltipOpen).toBe(true);

      store.dispatch(setTooltipOpen(false));
      state = store.getState().ui;
      expect(state.tooltipOpen).toBe(false);
    });

    it('sets tooltip content', () => {
      const store = createMockStore();
      const content = { message: 'This is a tooltip', position: 'top' };
      
      store.dispatch(setTooltipContent(content));
      const state = store.getState().ui;
      expect(state.tooltipContent).toEqual(content);
    });
  });

  describe('Toast Management', () => {
    it('sets toast', () => {
      const store = createMockStore();
      const toast = { type: 'success', message: 'Operation completed' };
      
      store.dispatch(setToast(toast));
      const state = store.getState().ui;
      expect(state.toast).toEqual(toast);
    });

    it('clears toast', () => {
      const store = createMockStore({
        ui: { 
          theme: 'light', sidebarOpen: true, modalOpen: false, modalContent: null,
          notification: null, loading: false, error: null, pageTitle: 'PCPartKeeper',
          breadcrumbs: [], activeTab: 'items', viewMode: 'table', pageSize: 10,
          sortDirection: 'asc', filterOpen: false, searchOpen: false, mobileMenuOpen: false,
          drawerOpen: false, tooltipOpen: false, tooltipContent: null,
          toast: { type: 'success', message: 'Test' }, confirmDialog: null
        }
      });
      
      store.dispatch(clearToast());
      const state = store.getState().ui;
      expect(state.toast).toBeNull();
    });
  });

  describe('Confirm Dialog Management', () => {
    it('sets confirm dialog', () => {
      const store = createMockStore();
      const dialog = { 
        title: 'Delete Item', 
        message: 'Are you sure you want to delete this item?',
        onConfirm: jest.fn(),
        onCancel: jest.fn()
      };
      
      store.dispatch(setConfirmDialog(dialog));
      const state = store.getState().ui;
      expect(state.confirmDialog).toEqual(dialog);
    });

    it('clears confirm dialog', () => {
      const store = createMockStore({
        ui: { 
          theme: 'light', sidebarOpen: true, modalOpen: false, modalContent: null,
          notification: null, loading: false, error: null, pageTitle: 'PCPartKeeper',
          breadcrumbs: [], activeTab: 'items', viewMode: 'table', pageSize: 10,
          sortDirection: 'asc', filterOpen: false, searchOpen: false, mobileMenuOpen: false,
          drawerOpen: false, tooltipOpen: false, tooltipContent: null, toast: null,
          confirmDialog: { title: 'Test', message: 'Test', onConfirm: jest.fn(), onCancel: jest.fn() }
        }
      });
      
      store.dispatch(clearConfirmDialog());
      const state = store.getState().ui;
      expect(state.confirmDialog).toBeNull();
    });
  });

  describe('Complex State Updates', () => {
    it('handles multiple UI updates in sequence', () => {
      const store = createMockStore();
      
      // Update theme
      store.dispatch(setTheme('dark'));
      
      // Update sidebar
      store.dispatch(setSidebarOpen(false));
      
      // Update modal
      store.dispatch(setModalOpen(true));
      store.dispatch(setModalContent({ type: 'form', data: {} }));
      
      // Update notification
      store.dispatch(setNotification({ type: 'info', message: 'Processing...' }));
      
      // Update page info
      store.dispatch(setPageTitle('Settings'));
      store.dispatch(setBreadcrumbs([{ label: 'Home', href: '/' }]));
      
      // Update view
      store.dispatch(setViewMode('grid'));
      store.dispatch(setPageSize(20));
      
      const state = store.getState().ui;

      expect(state.theme).toBe('dark');
      expect(state.sidebarOpen).toBe(false);
      expect(state.modalOpen).toBe(true);
      expect(state.modalContent).toEqual({ type: 'form', data: {} });
      expect(state.notification).toEqual({ type: 'info', message: 'Processing...' });
      expect(state.pageTitle).toBe('Settings');
      expect(state.breadcrumbs).toEqual([{ label: 'Home', href: '/' }]);
      expect(state.viewMode).toBe('grid');
      expect(state.pageSize).toBe(20);
    });

    it('handles error state with other UI updates', () => {
      const store = createMockStore();
      
      store.dispatch(setError('Network error'));
      store.dispatch(setLoading(true));
      store.dispatch(setNotification({ type: 'error', message: 'Failed to load data' }));
      store.dispatch(setModalOpen(true));
      
      const state = store.getState().ui;

      expect(state.error).toBe('Network error');
      expect(state.loading).toBe(true);
      expect(state.notification).toEqual({ type: 'error', message: 'Failed to load data' });
      expect(state.modalOpen).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('handles null/undefined values gracefully', () => {
      const store = createMockStore();
      
      store.dispatch(setError(null));
      store.dispatch(setNotification(null));
      store.dispatch(setModalContent(null));
      store.dispatch(setBreadcrumbs([]));
      
      const state = store.getState().ui;

      expect(state.error).toBeNull();
      expect(state.notification).toBeNull();
      expect(state.modalContent).toBeNull();
      expect(state.breadcrumbs).toEqual([]);
    });

    it('handles invalid enum values', () => {
      const store = createMockStore();
      
      // @ts-ignore - Testing invalid values
      store.dispatch(setTheme('invalid'));
      // @ts-ignore - Testing invalid values
      store.dispatch(setViewMode('invalid'));
      // @ts-ignore - Testing invalid values
      store.dispatch(setSortDirection('invalid'));
      
      const state = store.getState().ui;

      // Should maintain previous values or default values
      expect(state.theme).toBe('light');
      expect(state.viewMode).toBe('table');
      expect(state.sortDirection).toBe('asc');
    });
  });

  describe('Performance', () => {
    it('handles rapid state updates efficiently', () => {
      const store = createMockStore();
      
      const startTime = performance.now();
      
      // Simulate rapid UI updates
      for (let i = 0; i < 100; i++) {
        store.dispatch(setLoading(i % 2 === 0));
        store.dispatch(setPageSize(i + 1));
        store.dispatch(setSortDirection(i % 2 === 0 ? 'asc' : 'desc'));
      }
      
      const endTime = performance.now();
      
      const state = store.getState().ui;
      expect(state.loading).toBe(false);
      expect(state.pageSize).toBe(100);
      expect(state.sortDirection).toBe('desc');
      expect(endTime - startTime).toBeLessThan(50); // Should complete within 50ms
    });
  });
});
