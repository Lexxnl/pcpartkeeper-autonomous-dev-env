import React from 'react';

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

/**
 * EmptyState - A reusable empty state component
 *
 * Features:
 * - Consistent styling for empty states
 * - Optional icon and action button
 * - Accessibility features
 * - Flexible content
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  className = '',
}) => {
  return (
    <div
      className={`text-center py-layout-xl sm:py-layout-2xl lg:py-16 px-layout-sm sm:px-layout-md ${className}`}
      role='status'
      aria-live='polite'
    >
      {/* 
        RESPONSIVE EMPTY STATE: Mobile-first approach with proper spacing
        - Mobile: Compact layout with smaller icon and text
        - Desktop: More spacious layout for better visual hierarchy
        - Proper touch targets and accessibility
      */}
      <div className='max-w-sm sm:max-w-md lg:max-w-lg mx-auto'>
        {icon && (
          <div className='mb-layout-sm sm:mb-layout-md flex justify-center' aria-hidden='true'>
            <div className='w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-surface-tertiary rounded-full flex items-center justify-center shadow-sm'>
              {icon}
            </div>
          </div>
        )}

        <h3 className='text-lg sm:text-xl lg:text-2xl font-semibold text-text-primary mb-component-sm sm:mb-component-md leading-tight'>
          {title}
        </h3>

        {description && (
          <p className='text-sm sm:text-base lg:text-lg text-text-muted mb-layout-md sm:mb-layout-xl leading-relaxed max-w-md mx-auto'>
            {description}
          </p>
        )}

        {action && (
          <div className='flex justify-center'>
            <div className='w-full sm:w-auto'>
              {action}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
