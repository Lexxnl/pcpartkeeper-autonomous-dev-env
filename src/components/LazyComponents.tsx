/**
 * Lazy Components
 *
 * Lazy-loaded components using React.lazy and Suspense for better performance.
 * Reduces initial bundle size by code-splitting large components.
 */

import React, { Suspense, lazy } from 'react';
import LoadingIndicator from './LoadingIndicator';
import ErrorBoundary from './ErrorBoundary';
import { logger } from '../utils/logger';

// ============================================================================
// LAZY COMPONENT IMPORTS
// ============================================================================

// Pages
export const LazyItemsPage = lazy(() => 
  import('../pages/ItemsPage').catch(err => {
    logger.error('Failed to load ItemsPage:', err);
    return Promise.resolve({ default: () => <div className="p-4 text-red-500 bg-red-50 border rounded">Loading failed—please refresh the page.</div> });
  })
);
export const LazyTestingPage = lazy(() => 
  import('../pages/TestingPage').catch(err => {
    logger.error('Failed to load TestingPage:', err);
    return Promise.resolve({ default: () => <div className="p-4 text-red-500 bg-red-50 border rounded">Loading failed—please refresh the page.</div> });
  })
);

// Large Components
export const LazyDataTableShowcase = lazy(() => 
  import('./DataTableShowcase').catch(err => {
    logger.error('Failed to load DataTableShowcase:', err);
    return Promise.resolve({ default: () => <div className="p-4 text-red-500 bg-red-50 border rounded">Loading failed—please refresh the page.</div> });
  })
);
export const LazyPageHeaderShowcase = lazy(
  () => import('./PageHeaderShowcase')
);
export const LazyAvatarShowcase = lazy(() => import('./AvatarShowcase'));
export const LazyUnderlineNavShowcase = lazy(
  () => import('./UnderlineNavShowcase')
);

// DataTable Components (large and complex)
export const LazyDataTable = lazy(() => import('./DataTable/DataTable'));

// PageHeader Components (large and complex)
// export const LazyPageHeader = lazy(() => import('./PageHeader')); // Not currently used

// Error Boundaries (loaded on demand)
export const LazyDataTableErrorBoundary = lazy(() => import('./ErrorBoundaries/DataTableErrorBoundary'));
export const LazyFormErrorBoundary = lazy(() => import('./ErrorBoundaries/FormErrorBoundary'));
export const LazyPageErrorBoundary = lazy(() => import('./ErrorBoundaries/PageErrorBoundary'));

// ============================================================================
// LOADING FALLBACK COMPONENTS
// ============================================================================

/**
 * Default loading fallback for lazy components
 */
const DefaultLoadingFallback: React.FC = () => (
  <div className='flex items-center justify-center p-8'>
    <LoadingIndicator size='large' />
  </div>
);

/**
 * Page loading fallback with skeleton
 */
const PageLoadingFallback: React.FC = () => (
  <div className='min-h-screen bg-surface-page'>
    <div className='container mx-auto px-4 py-8'>
      <div className='animate-pulse'>
        <div className='h-8 bg-surface-secondary rounded mb-4 w-1/3'></div>
        <div className='h-4 bg-surface-secondary rounded mb-6 w-1/2'></div>
        <div className='space-y-4'>
          <div className='h-4 bg-surface-secondary rounded'></div>
          <div className='h-4 bg-surface-secondary rounded w-5/6'></div>
          <div className='h-4 bg-surface-secondary rounded w-4/6'></div>
        </div>
      </div>
    </div>
  </div>
);

/**
 * Component loading fallback
 */
const ComponentLoadingFallback: React.FC = () => (
  <div className='flex items-center justify-center p-4'>
    <LoadingIndicator size='medium' />
  </div>
);

// ============================================================================
// LAZY COMPONENT WRAPPERS
// ============================================================================

/**
 * Lazy Items Page with error boundary and loading fallback
 */
export const LazyItemsPageWithSuspense: React.FC = () => (
  <ErrorBoundary>
    <Suspense fallback={<PageLoadingFallback />}>
      <LazyItemsPage />
    </Suspense>
  </ErrorBoundary>
);

/**
 * Lazy Testing Page with error boundary and loading fallback
 */
export const LazyTestingPageWithSuspense: React.FC = () => (
  <ErrorBoundary>
    <Suspense fallback={<PageLoadingFallback />}>
      <LazyTestingPage />
    </Suspense>
  </ErrorBoundary>
);

/**
 * Lazy DataTable Showcase with error boundary and loading fallback
 */
export const LazyDataTableShowcaseWithSuspense: React.FC = () => (
  <ErrorBoundary>
    <Suspense fallback={<ComponentLoadingFallback />}>
      <LazyDataTableShowcase />
    </Suspense>
  </ErrorBoundary>
);

/**
 * Lazy PageHeader Showcase with error boundary and loading fallback
 */
export const LazyPageHeaderShowcaseWithSuspense: React.FC = () => (
  <ErrorBoundary>
    <Suspense fallback={<ComponentLoadingFallback />}>
      <LazyPageHeaderShowcase />
    </Suspense>
  </ErrorBoundary>
);

/**
 * Lazy Avatar Showcase with error boundary and loading fallback
 */
export const LazyAvatarShowcaseWithSuspense: React.FC = () => (
  <ErrorBoundary>
    <Suspense fallback={<ComponentLoadingFallback />}>
      <LazyAvatarShowcase />
    </Suspense>
  </ErrorBoundary>
);

/**
 * Lazy UnderlineNav Showcase with error boundary and loading fallback
 */
export const LazyUnderlineNavShowcaseWithSuspense: React.FC = () => (
  <ErrorBoundary>
    <Suspense fallback={<ComponentLoadingFallback />}>
      <LazyUnderlineNavShowcase />
    </Suspense>
  </ErrorBoundary>
);

// ============================================================================
// UTILITY COMPONENTS
// ============================================================================

/**
 * Generic lazy component wrapper with customizable fallback
 */
interface LazyComponentWrapperProps {
  fallback?: React.ReactNode;
  errorBoundary?: boolean;
  children: React.ReactNode;
}

export const LazyComponentWrapper: React.FC<LazyComponentWrapperProps> = ({
  fallback = <DefaultLoadingFallback />,
  errorBoundary = true,
  children,
}) => {
  const content = <Suspense fallback={fallback}>{children}</Suspense>;

  return errorBoundary ? <ErrorBoundary>{content}</ErrorBoundary> : content;
};

/**
 * Preload a lazy component
 */
export const preloadLazyComponent = (importFn: () => Promise<any>) => {
  return importFn();
};

/**
 * Preload all lazy components
 */
export const preloadAllLazyComponents = async () => {
  const preloadPromises = [
    import('../pages/ItemsPage'),
    import('../pages/TestingPage'),
    import('./DataTableShowcase'),
    import('./PageHeaderShowcase'),
    import('./AvatarShowcase'),
    import('./UnderlineNavShowcase'),
  ];

  await Promise.all(preloadPromises);
};
