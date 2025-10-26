import React, { memo, useCallback } from 'react';

/**
 * Avatar - Simple user avatar component
 *
 * A simple avatar component that supports images and initials with circle or square shapes.
 * Uses semantic design tokens for consistent styling across the application.
 *
 * @example
 * ```jsx
 * // Basic avatar with image
 * <Avatar src="/path/to/image.jpg" alt="User name" size={40} />
 *
 * // Avatar with initials
 * <Avatar initials="JD" name="John Doe" size={32} />
 *
 * // Square avatar
 * <Avatar src="/image.jpg" shape="square" size={48} />
 * ```
 *
 * @param {Object} props - Component properties
 * @param {string} [props.src] - Image source URL
 * @param {string} [props.alt] - Alt text for image
 * @param {string} [props.initials] - User initials to display
 * @param {string} [props.name] - User name for accessibility
 * @param {number} [props.size=40] - Avatar size in pixels
 * @param {'circle'|'square'} [props.shape='circle'] - Avatar shape
 * @param {'default'|'primary'|'secondary'|'accent'} [props.variant='default'] - Color variant
 * @param {string} [props.className] - Additional CSS classes
 * @param {Function} [props.onClick] - Click handler
 * @param {string} [props.role] - ARIA role
 * @param {string} [props['aria-label']] - ARIA label
 * @param {string} [props['data-testid']] - Test ID
 *
 * @returns {JSX.Element} Rendered avatar component
 */

// Type definitions
interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  name?: string;
  size?: number;
  shape?: 'circle' | 'square';
  variant?: 'default' | 'primary' | 'secondary' | 'accent';
  className?: string;
  onClick?: () => void;
  role?: string;
  'aria-label'?: string;
  'data-testid'?: string;
  [key: string]: any;
}

const Avatar = memo<AvatarProps>(({
  src,
  alt,
  initials,
  name,
  size = 40,
  shape = 'circle',
  variant = 'default',
  className = '',
  onClick,
  role,
  'aria-label': ariaLabel,
  'data-testid': dataTestId,
  ...props
}) => {
  // Shape classes mapping
  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-none',
  };

  // Variant classes mapping
  const variantClasses = {
    default: 'bg-surface-tertiary text-text-secondary',
    primary: 'bg-action-primary text-white',
    secondary: 'bg-surface-secondary text-text-primary',
    accent: 'bg-accent-primary text-white',
  };

  // Calculate text size based on avatar size
  const getTextSize = (avatarSize: number): string => {
    if (avatarSize <= 24) return 'text-xs';
    if (avatarSize <= 32) return 'text-sm';
    if (avatarSize <= 48) return 'text-base';
    if (avatarSize <= 64) return 'text-lg';
    return 'text-xl';
  };

  // Base classes
  const baseClasses = `
    relative inline-flex items-center justify-center
    ${shapeClasses[shape]}
    ${variantClasses[variant]}
    ${getTextSize(size)}
    ${
      onClick
        ? 'cursor-pointer hover:opacity-80 transition-opacity duration-150'
        : ''
    }
    ${className}
  `.trim();

  // Determine content to display
  const renderContent = (): React.ReactNode => {
    if (src) {
      return (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          className={`w-full h-full object-cover ${shapeClasses[shape]}`}
          onError={e => {
            // Fallback to initials if image fails to load
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      );
    }

    if (initials) {
      return (
        <span className='font-medium select-none'>
          {initials.toUpperCase()}
        </span>
      );
    }

    // Default fallback
    return (
      <div className='w-full h-full bg-surface-hover flex items-center justify-center'>
        <span className='text-text-muted'>?</span>
      </div>
    );
  };

  // Generate accessible label
  const accessibleLabel =
    ariaLabel ||
    (name
      ? `${name} avatar`
      : initials
        ? `Avatar with initials ${initials}`
        : 'User avatar');

  return (
    <div
      className={baseClasses}
      style={{ width: `${size}px`, height: `${size}px` }}
      onClick={onClick}
      role={role || (onClick ? 'button' : undefined)}
      aria-label={accessibleLabel}
      data-testid={dataTestId}
      {...props}
    >
      {renderContent()}
    </div>
  );
});

Avatar.displayName = 'Avatar';

export default Avatar;
