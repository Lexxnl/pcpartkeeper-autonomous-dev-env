import React from 'react';

export interface LoadingIndicatorProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  className?: string;
}

/**
 * LoadingIndicator - A reusable loading spinner component
 *
 * Features:
 * - Multiple size variants
 * - Optional loading text
 * - Consistent dark theme styling
 * - Accessibility features
 */
export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  size = 'medium',
  text,
  className = '',
}) => {
  // Responsive size classes - Mobile-first approach
  const sizeClasses = {
    small: 'w-4 h-4 sm:w-5 sm:h-5',
    medium: 'w-6 h-6 sm:w-8 sm:h-8',
    large: 'w-8 h-8 sm:w-10 sm:h-10',
  };

  // Responsive text size classes
  const textSizeClasses = {
    small: 'text-xs sm:text-sm',
    medium: 'text-sm sm:text-base',
    large: 'text-base sm:text-lg',
  };

  return (
    <div
      className={`flex items-center justify-center py-4 sm:py-6 ${className}`}
      role='status'
      aria-live='polite'
      aria-label={text || 'Loading content'}
    >
      <div className='flex flex-col items-center space-y-2 sm:space-y-3'>
        {/* 
          RESPONSIVE LOADING SPINNER: Mobile-first approach
          - Mobile: Smaller spinner for better mobile UX
          - Desktop: Larger spinner for better visibility
          - Consistent animation and accessibility
        */}
        <div
          className={`
            ${sizeClasses[size]} 
            border-2 border-border-subtle border-t-accent-primary 
            rounded-full animate-spin
          `}
          aria-hidden='true'
        />
        
        {/* Loading Text - Responsive sizing */}
        {text && (
          <p className={`text-text-muted ${textSizeClasses[size]} font-medium text-center max-w-xs`}>
            {text}
          </p>
        )}
        
        {/* Screen reader fallback */}
        {!text && <span className='sr-only'>Loading content, please wait...</span>}
      </div>
    </div>
  );
};

export default LoadingIndicator;
