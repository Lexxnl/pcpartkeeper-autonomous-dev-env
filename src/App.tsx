import React, { useEffect } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import {
  LazyItemsPageWithSuspense,
  LazyTestingPageWithSuspense,
} from './components/LazyComponents';
import { initializeStore, setupStoreSubscriptions } from './store';
import { useUIStore, useUserStore } from './store';
import PageHeader from './components/PageHeader';
import SearchBar from './components/SearchBar';
import UnderlineNav from './components/UnderlineNav';
import Avatar from './components/Avatar';
import { ListIcon, BeakerIcon } from './components/icons';
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


  // Initialize store and subscriptions
  useEffect(() => {
    initializeStore();
    const cleanupSubscriptions = setupStoreSubscriptions();
    return cleanupSubscriptions;
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
    <ErrorBoundary>
      <div className='min-h-screen bg-surface-page'>
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
                    searchTerm=''
                    onSearchChange={() => {}}
                    onSearch={() => {}}
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
              <UnderlineNav.Item
                href='#'
                onClick={() => setCurrentPage('items')}
                aria-current={currentPage === 'items' ? 'page' : undefined}
                icon={<ListIcon />}
              >
                <span className='hidden xs:inline'>Items Page</span>
                <span className='xs:hidden'>Items</span>
              </UnderlineNav.Item>
              <UnderlineNav.Item
                href='#'
                onClick={() => setCurrentPage('testing')}
                aria-current={currentPage === 'testing' ? 'page' : undefined}
                icon={<BeakerIcon />}
              >
                <span className='hidden xs:inline'>Testing Page</span>
                <span className='xs:hidden'>Testing</span>
              </UnderlineNav.Item>
              <UnderlineNav.Item
                href='#'
                onClick={() => setCurrentPage('datatable')}
                aria-current={currentPage === 'datatable' ? 'page' : undefined}
                icon={<ListIcon />}
              >
                <span className='hidden xs:inline'>DataTable Test</span>
                <span className='xs:hidden'>DataTable</span>
              </UnderlineNav.Item>
            </UnderlineNav>
          </PageHeader.Navigation>
        </PageHeader>

        {/* Page Content */}
        {renderPage()}

      </div>
    </ErrorBoundary>
  );
}

export default App;
