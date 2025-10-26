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
 * FormErrorBoundary - Specialized error boundary for form components
 * 
 * Catches errors specifically in form rendering and validation,
 * providing a tailored fallback UI for form-related errors.
 */
class FormErrorBoundary extends Component<Props, State> {
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
      logger.error('FormErrorBoundary caught an error:', error, errorInfo);
    }

    // Add error notification to store
    try {
      const addNotification = useUIStore.getState().addNotification;
      addNotification({
        type: 'error',
        title: 'Form Error',
        message: 'There was an error with the form. Please check your input and try again.',
        duration: 6000,
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

      // Default fallback UI for form errors
      return (
        <div className='min-h-32 bg-surface-page flex items-center justify-center p-4'>
          <div className='text-center max-w-sm'>
            <div className='mb-3'>
              <svg
                className='mx-auto h-10 w-10 text-action-danger'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                />
              </svg>
            </div>

            <h3 className='text-base font-semibold text-text-primary mb-2'>
              Form Error
            </h3>

            <p className='text-sm text-text-muted mb-3'>
              There was an error with the form. Please check your input and try again.
            </p>

            <button
              onClick={() => this.setState({ hasError: false })}
              className='btn-primary px-3 py-2 text-sm rounded-md font-medium transition-smooth'
            >
              Try Again
            </button>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className='mt-3 text-left'>
                <summary className='text-xs text-text-muted cursor-pointer hover:text-text-secondary transition-colors'>
                  Error Details (Development)
                </summary>
                <pre className='mt-1 p-2 bg-surface-tertiary rounded text-xs text-text-muted overflow-auto'>
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

export default FormErrorBoundary;
