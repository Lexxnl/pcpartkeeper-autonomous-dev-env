// ============================================================================
// LAZY LOAD COMPONENT
// ============================================================================

import React, { Suspense, lazy, ComponentType, ReactNode } from 'react';
import LoadingIndicator from './LoadingIndicator';

interface LazyLoadProps {
  children: ReactNode;
  fallback?: ReactNode;
  delay?: number;
}

/**
 * LazyLoad component for lazy loading content
 * Improves initial page load performance by deferring non-critical content
 */
export const LazyLoad: React.FC<LazyLoadProps> = ({
  children,
  fallback = <LoadingIndicator text="Loading..." />,
  delay = 0,
}) => {
  const [showContent, setShowContent] = React.useState(delay === 0);

  React.useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [delay]);

  if (!showContent) {
    return <>{fallback}</>;
  }

  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
};

/**
 * Higher-order component for lazy loading components
 */
export function withLazyLoad<P extends object>(
  Component: ComponentType<P>,
  fallback?: ReactNode
) {
  const LazyComponent = lazy(() => Promise.resolve({ default: Component }));

  return React.forwardRef<any, P>((props, ref) => (
    <Suspense fallback={fallback || <LoadingIndicator text="Loading..." />}>
      <LazyComponent {...props} ref={ref} />
    </Suspense>
  ));
}

/**
 * Hook for lazy loading with intersection observer
 */
export function useLazyLoad(options: {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}) {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (options.triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!options.triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [options.threshold, options.rootMargin, options.triggerOnce]);

  return { ref, isVisible };
}
