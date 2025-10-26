import React from 'react';
import { ArrowIcon } from './icons';
import { cn } from '@/lib/utils';
import { ChevronDownIcon } from './icons';

// NOTE: Button styling and functionality are final. Do not modify unless necessary.

/**
 * Button - Versatile button component with multiple variants
 *
 * A flexible button component supporting multiple variants, sizes, icons, and states.
 * Uses semantic design tokens from index.css for consistent theming.
 *
 * @param {string} variant - Button style variant: 'primary', 'default', 'invisible', 'danger'
 * @param {string} size - Button size: 'small', 'medium', 'large'
 * @param {boolean} disabled - Whether the button is disabled
 * @param {boolean} loading - Whether the button shows a loading spinner
 * @param {boolean} block - Whether the button takes full width
 * @param {boolean} hasArrow - Whether to show a trailing arrow icon
 * @param {ReactNode} leadingVisual - Icon or element to show before text
 * @param {ReactNode} trailingVisual - Icon or element to show after text
 */

// Type definitions
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'default' | 'invisible' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  block?: boolean;
  hasArrow?: boolean;
  loading?: boolean;
  leadingVisual?: React.ReactNode;
  trailingVisual?: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
}

interface LoadingSpinnerProps {
  className?: string;
}

// Loading spinner component
const LoadingSpinner = ({ className = 'h-4 w-4' }: LoadingSpinnerProps) => (
  <svg
    className={`animate-spin ${className}`}
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
  >
    <circle
      className='opacity-25'
      cx='12'
      cy='12'
      r='10'
      stroke='currentColor'
      strokeWidth='4'
    />
    <path
      className='opacity-75'
      fill='currentColor'
      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
    />
  </svg>
);

function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  block = false,
  hasArrow = false,
  loading = false,
  leadingVisual,
  trailingVisual,
  className = '',
  type = 'button',
  'aria-label': ariaLabel,
  ...props
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-page select-none';

  const variantClasses = {
    primary: 'btn-primary border border-transparent',
    default: 'btn-default',
    invisible: 'btn-invisible border border-transparent',
    danger: 'btn-danger',
  };

  // Responsive size classes - Mobile-first approach with proper touch targets
  // NOTE: Button styling and functionality are final. Do not modify unless necessary.
  const sizeClasses = {
    small: 'px-3 sm:px-2.5 h-8 sm:h-7 text-sm sm:text-xs gap-1.5 sm:gap-1',
    medium: 'px-4 sm:px-3 h-9 sm:h-8 text-base sm:text-sm gap-2 sm:gap-1.5',
    large: 'px-6 sm:px-4 h-10 sm:h-9 text-lg sm:text-base gap-2.5 sm:gap-2',
  };

  const blockClasses = block ? 'w-full' : '';
  const disabledClasses =
    disabled && !loading ? 'opacity-50 cursor-not-allowed' : '';

  const classes =
    `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${blockClasses} ${disabledClasses} ${className}`.trim();

  // Only truly disable if disabled prop is set, not when loading
  const isDisabled = disabled;

  // Prevent onClick when loading
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      onClick(e);
    }
  };

  const buttonContent = (
    <>
      {leadingVisual && (
        <span className='flex-shrink-0' aria-hidden='true'>
          {leadingVisual}
        </span>
      )}
      {children && <span className='truncate'>{children}</span>}
      {trailingVisual && (
        <span className='flex-shrink-0' aria-hidden='true'>
          {trailingVisual}
        </span>
      )}
      {hasArrow && !trailingVisual && (
        <span className='flex-shrink-0' aria-hidden='true'>
          <ArrowIcon className='h-4 w-4' />
        </span>
      )}
    </>
  );

  const loadingContent = (
    <>
      <LoadingSpinner className='h-4 w-4' />
      <span className='sr-only'>Loading...</span>
    </>
  );

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={isDisabled}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        {
          'opacity-50 cursor-not-allowed': disabled || loading,
          'w-full': block,
          'focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-primary': true,
        }
      )}
      role='button'
      aria-disabled={disabled || loading}
      aria-label={loading ? 'Loading' : ariaLabel}
      aria-busy={loading}
      {...props}
    >
      {loading ? loadingContent : buttonContent}
    </button>
  );
}


export default Button;
