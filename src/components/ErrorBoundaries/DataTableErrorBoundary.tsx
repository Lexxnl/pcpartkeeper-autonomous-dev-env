import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useUIStore } from '../../store';
import { logger } from '../../utils/logger';

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
 * DataTableErrorBoundary - Specialized error boundary for DataTable components
 * 
 * Catches errors specifically in DataTable rendering and provides
 * a tailored fallback UI for table-related errors.
 */
class DataTableErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to console in development
    if (process.env.NODE_ENV === 'development') {
      logger.error('DataTableErrorBoundary caught an error:', error, errorInfo);
    }

    // Add error notification to store
    try {
      const addNotification = useUIStore.getState().addNotification;
      addNotification({
        type: 'error',
        title: 'Table Error',
        message: 'There was an error displaying the table data. Please try refreshing.',
        duration: 8000,
      });
    } catch (storeError) {
      logger.error('Failed to add error notification:', storeError);
    }

    // Call custom error handler if provided
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

      // Default fallback UI for table errors
      return (
        <div className='min-h-64 bg-surface-page flex items-center justify-center p-4'>
          <div className='text-center max-w-md'>
            <div className='mb-4'>
              <svg
                className='mx-auto h-12 w-12 text-action-danger'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                />
              </svg>
            </div>

            <h3 className='text-lg font-semibold text-text-primary mb-2'>
              Table Error
            </h3>

            <p className='text-text-muted mb-4'>
              There was an error displaying the table data. This might be due to
              invalid data or a rendering issue.
            </p>

            <div className='space-y-2'>
              <button
                onClick={() => this.setState({ hasError: false })}
                className='btn-primary px-4 py-2 rounded-md font-medium transition-smooth'
              >
                Try Again
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className='mt-4 text-left'>
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

export default DataTableErrorBoundary;
