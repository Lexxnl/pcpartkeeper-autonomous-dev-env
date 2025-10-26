import React, { Component, ErrorInfo, ReactNode } from 'react';
import { logger } from '../utils/logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * ErrorBoundary - Global error boundary component
 *
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 * Uses semantic design tokens for consistent theming.
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error in development
    logger.error('ErrorBoundary caught an error:', error, errorInfo);

    // Call custom error handler if provided
    // This allows parent components to handle errors properly without direct store access
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className='min-h-screen bg-surface-page flex items-center justify-center p-4'>
          <div className='card-section max-w-md w-full text-center'>
            <div className='mb-6'>
              <svg
                className='mx-auto h-16 w-16 text-action-danger'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
                />
              </svg>
            </div>

            <h1 className='text-xl font-semibold text-text-primary mb-2'>
              Something went wrong
            </h1>

            <p className='text-text-muted mb-6'>
              We're sorry, but something unexpected happened. Please try
              refreshing the page.
            </p>

            <div className='space-y-3'>
              <button
                onClick={() => window.location.reload()}
                className='btn-primary w-full px-4 py-2 rounded-md font-medium transition-smooth'
              >
                Refresh Page
              </button>

              <button
                onClick={() => this.setState({ hasError: false })}
                className='btn-default w-full px-4 py-2 rounded-md font-medium transition-smooth'
              >
                Try Again
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className='mt-6 text-left'>
                <summary className='text-sm text-text-muted cursor-pointer hover:text-text-secondary transition-colors'>
                  Error Details (Development)
                </summary>
                <pre className='mt-2 p-3 bg-surface-tertiary rounded text-xs text-text-muted overflow-auto'>
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
