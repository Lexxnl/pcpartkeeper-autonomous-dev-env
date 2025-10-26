import React, { useEffect, useState, useCallback } from 'react';
import type { ErrorInfo } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import {
  LazyItemsPageWithSuspense,
  LazyTestingPageWithSuspense,
} from './components/LazyComponents';
import { setupStoreSubscriptions, useItemsStore } from './store';
import { useUIStore, useUserStore } from './store';
import { logger } from './utils/logger';
import PageHeader from './components/PageHeader';
import SearchBar from './components/SearchBar';
import UnderlineNav from './components/UnderlineNav';
import Avatar from './components/Avatar';
import { NAV_ITEMS } from './config/navigation';
import DataTableTest from './components/DataTableTest';

// Type definitions
interface AppProps {}

/**
 * App - Main application component
 *
 * Manages global layout with header navigation and page routing.
 * Uses semantic design tokens for consistent dark theme styling.
 * Implements lazy loading and performance monitoring.
 */
function App({}: AppProps) {
  // Store state
  const currentPage = useUIStore(state => state.currentPage);
  const setCurrentPage = useUIStore(state => state.setCurrentPage);
  const user = useUserStore(state => state.user);
  const setFilters = useItemsStore(state => state.setFilters);
  
  // Local state for search
  const [searchTerm, setSearchTerm] = useState('');

  // Initialize store with mock data if needed
  useEffect(() => {
    const initializeItems = async () => {
      try {
        // Only initialize if no items exist
        const currentItems = useItemsStore.getState().items;
        if (currentItems.length === 0) {
          const { generateMockItems } = await import('./data/mockData');
          const mockItems = generateMockItems();
          useItemsStore.getState().setItems(mockItems);
          logger.log('Store initialized successfully');
        }
      } catch (error) {
        logger.error('Failed to initialize store:', error);
      }
    };
    
    initializeItems();
  }, []); // Only run once on mount

  // Setup store subscriptions
  useEffect(() => {
    const cleanupSubscriptions = setupStoreSubscriptions();
    return cleanupSubscriptions;
  }, []);

  // Search handlers
  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
    setFilters({ searchTerm: term });
  }, []); // setFilters is a stable Zustand action

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    setFilters({ searchTerm: term });
    logger.log('Search executed:', term);
  }, []); // setFilters is a stable Zustand action

  // Error handler for ErrorBoundary
  const handleError = useCallback((error: Error, errorInfo: ErrorInfo) => {
    // Add error notification to store
    useUIStore.getState().addNotification({
      type: 'error',
      title: 'Application Error',
      message: 'Something went wrong. Please try refreshing the page.',
      duration: 10000,
    });
  }, []);

  /**
   * Render the current page based on state
   */
  const renderPage = (): React.ReactElement => {
    switch (currentPage) {
      case 'testing':
        return <LazyTestingPageWithSuspense />;
      case 'datatable':
        return <DataTableTest />;
      case 'items':
      default:
        return <LazyItemsPageWithSuspense />;
    }
  };

  return (
    <ErrorBoundary onError={handleError}>
      <div className='min-h-screen bg-surface-page'>
        {/* Skip Links for Accessibility */}
        <div className="skip-links">
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-surface-primary focus:text-text-primary focus:px-4 focus:py-2 focus:rounded focus:ring-2 focus:ring-accent-primary"
          >
            Skip to main content
          </a>
        </div>

        {/* PageHeader with Logo, SearchBar, and Navigation - Fully Responsive */}
        <PageHeader role='banner' aria-label='PC Part Keeper'>
          {/* Top Row: Logo, SearchBar, and Avatar - Responsive Layout */}
          <div className='w-full px-4 sm:px-6 lg:px-8 pt-4 sm:pt-5 pb-3'>
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
              {/* Logo on the left */}
              <PageHeader.TitleArea variant='large'>
                <PageHeader.Title as='h1'>PCPartKeeper</PageHeader.Title>
              </PageHeader.TitleArea>

              {/* Right: SearchBar and Avatar grouped together */}
              <div className='w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4'>
                {/* SearchBar - Full width on mobile, constrained on larger screens */}
                <div className='w-full sm:min-w-[20rem] md:min-w-[24rem] lg:w-96'>
                  <SearchBar
                    searchTerm={searchTerm}
                    onSearchChange={handleSearchChange}
                    onSearch={handleSearch}
                  />
                </div>

                {/* Avatar - Hidden on mobile, visible on larger screens */}
                <div className='hidden sm:flex items-center'>
                  <Avatar
                    initials={
                      user?.name
                        ?.split(' ')
                        .map(n => n[0])
                        .join('')
                        .toUpperCase() || 'U'
                    }
                    name={user?.name || 'User Profile'}
                    size={40}
                    variant='default'
                    onClick={() => {
                      // TODO: Implement profile menu
                    }}
                    aria-label='User profile menu'
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation at the bottom of PageHeader - Responsive with proper positioning */}
          <PageHeader.Navigation className='px-4 sm:px-6 lg:px-8 overflow-x-auto scrollbar-thin'>
            <UnderlineNav aria-label='Main navigation'>
              {NAV_ITEMS.map(item => (
                <UnderlineNav.Item
                  key={item.id}
                  href='#'
                  onClick={() => setCurrentPage(item.page)}
                  aria-current={currentPage === item.page ? 'page' : undefined}
                  icon={<item.icon />}
                >
                  <span className='hidden sm:inline'>{item.label}</span>
                  <span className='sm:hidden'>{item.shortLabel}</span>
                </UnderlineNav.Item>
              ))}
            </UnderlineNav>
          </PageHeader.Navigation>
        </PageHeader>

        {/* Page Content */}
        <main id="main-content" role="main" aria-label="Main page content">
          {renderPage()}
        </main>

      </div>
    </ErrorBoundary>
  );
}

export default App;
