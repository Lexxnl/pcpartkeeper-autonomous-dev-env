import { lazy } from 'react';
import { logger } from '../../utils/logger';

// ============================================================================
// LAZY LOADED COMPONENTS
// ============================================================================

// Main PageHeader component
export const PageHeader = lazy(() => import('./PageHeader').catch(err => {
  logger.error('Failed to load PageHeader:', err);
  return Promise.resolve({ default: () => <div>Header loading failed</div> });
}));

// Title components
export const TitleArea = lazy(() => import('./components/Title/TitleArea'));
export const Title = lazy(() => import('./components/Title/Title'));
export const Description = lazy(() => import('./components/Title/Description'));

// Navigation components
export const Navigation = lazy(
  () => import('./components/Navigation/Navigation')
);
export const Breadcrumbs = lazy(
  () => import('./components/Navigation/Breadcrumbs')
);

// Action components
export const Actions = lazy(() => import('./components/Actions/Actions'));
export const LeadingAction = lazy(
  () => import('./components/Actions/LeadingAction')
);
export const TrailingAction = lazy(
  () => import('./components/Actions/TrailingAction')
);

// Visual components
export const LeadingVisual = lazy(
  () => import('./components/Visuals/LeadingVisual')
);
export const TrailingVisual = lazy(
  () => import('./components/Visuals/TrailingVisual')
);

// Context components
export const ContextArea = lazy(
  () => import('./components/Context/ContextArea')
);
export const ContextBar = lazy(() => import('./components/Context/ContextBar'));
export const ContextAreaActions = lazy(
  () => import('./components/Context/ContextAreaActions')
);
export const ParentLink = lazy(() => import('./components/Context/ParentLink'));

// ============================================================================
// LAZY COMPOUND COMPONENT
// ============================================================================

import { Suspense } from 'react';

// Loading fallback component
const LoadingFallback = ({ children }: { children: React.ReactNode }) => (
  <div className='animate-pulse bg-surface-tertiary rounded h-16 flex items-center px-5'>
    <div className='h-4 bg-surface-secondary rounded w-48'></div>
  </div>
);

// Lazy compound component with Suspense
export const LazyPageHeader = Object.assign(
  (props: any) => (
    <Suspense fallback={<LoadingFallback {...props} />}>
      <PageHeader {...props} />
    </Suspense>
  ),
  {
    TitleArea: (props: any) => (
      <Suspense
        fallback={
          <div className='animate-pulse bg-surface-tertiary rounded h-8 w-32'></div>
        }
      >
        <TitleArea {...props} />
      </Suspense>
    ),
    Title: (props: any) => (
      <Suspense
        fallback={
          <div className='animate-pulse bg-surface-tertiary rounded h-6 w-24'></div>
        }
      >
        <Title {...props} />
      </Suspense>
    ),
    Description: (props: any) => (
      <Suspense
        fallback={
          <div className='animate-pulse bg-surface-tertiary rounded h-4 w-48'></div>
        }
      >
        <Description {...props} />
      </Suspense>
    ),
    Navigation: (props: any) => (
      <Suspense
        fallback={
          <div className='animate-pulse bg-surface-tertiary rounded h-8 w-full'></div>
        }
      >
        <Navigation {...props} />
      </Suspense>
    ),
    Breadcrumbs: (props: any) => (
      <Suspense
        fallback={
          <div className='animate-pulse bg-surface-tertiary rounded h-4 w-32'></div>
        }
      >
        <Breadcrumbs {...props} />
      </Suspense>
    ),
    Actions: (props: any) => (
      <Suspense
        fallback={
          <div className='animate-pulse bg-surface-tertiary rounded h-8 w-24'></div>
        }
      >
        <Actions {...props} />
      </Suspense>
    ),
    LeadingAction: (props: any) => (
      <Suspense
        fallback={
          <div className='animate-pulse bg-surface-tertiary rounded h-8 w-16'></div>
        }
      >
        <LeadingAction {...props} />
      </Suspense>
    ),
    TrailingAction: (props: any) => (
      <Suspense
        fallback={
          <div className='animate-pulse bg-surface-tertiary rounded h-8 w-16'></div>
        }
      >
        <TrailingAction {...props} />
      </Suspense>
    ),
    LeadingVisual: (props: any) => (
      <Suspense
        fallback={
          <div className='animate-pulse bg-surface-tertiary rounded h-5 w-5'></div>
        }
      >
        <LeadingVisual {...props} />
      </Suspense>
    ),
    TrailingVisual: (props: any) => (
      <Suspense
        fallback={
          <div className='animate-pulse bg-surface-tertiary rounded h-5 w-5'></div>
        }
      >
        <TrailingVisual {...props} />
      </Suspense>
    ),
    ContextArea: (props: any) => (
      <Suspense
        fallback={
          <div className='animate-pulse bg-surface-tertiary rounded h-6 w-full'></div>
        }
      >
        <ContextArea {...props} />
      </Suspense>
    ),
    ContextBar: (props: any) => (
      <Suspense
        fallback={
          <div className='animate-pulse bg-surface-tertiary rounded h-6 w-full'></div>
        }
      >
        <ContextBar {...props} />
      </Suspense>
    ),
    ContextAreaActions: (props: any) => (
      <Suspense
        fallback={
          <div className='animate-pulse bg-surface-tertiary rounded h-6 w-20'></div>
        }
      >
        <ContextAreaActions {...props} />
      </Suspense>
    ),
    ParentLink: (props: any) => (
      <Suspense
        fallback={
          <div className='animate-pulse bg-surface-tertiary rounded h-4 w-24'></div>
        }
      >
        <ParentLink {...props} />
      </Suspense>
    ),
  }
);

export default LazyPageHeader;
