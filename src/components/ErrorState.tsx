import React from 'react';
import { AlertTriangleIcon, RefreshCwIcon } from '../components/icons';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

/**
 * ErrorState - A reusable error state component
 *
 * Features:
 * - Consistent error styling
 * - Optional retry functionality
 * - Accessibility features
 * - Flexible messaging
 */
export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'An error occurred while loading the content.',
  onRetry,
  className = '',
}) => {
  return (
    <div className={`text-center py-12 px-4 ${className}`}>
      <div className='max-w-md mx-auto'>
        <div className='mb-4 flex justify-center'>
          <div className='w-16 h-16 bg-action-danger bg-opacity-20 rounded-full flex items-center justify-center'>
            <AlertTriangleIcon className='w-8 h-8 text-action-danger' />
          </div>
        </div>

        <h3 className='text-lg font-semibold text-text-primary mb-2'>
          {title}
        </h3>

        <p className='text-text-muted mb-6'>{message}</p>

        {onRetry && (
          <button
            onClick={onRetry}
            className='inline-flex items-center px-4 py-2 bg-accent-primary text-text-primary rounded-md hover:bg-accent-primary-emphasis transition-colors'
          >
            <RefreshCwIcon className='w-4 h-4 mr-2' />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorState;
