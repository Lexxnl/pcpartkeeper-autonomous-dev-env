import React, { memo } from 'react';

/**
 * UnderlineNav - Navigation component with underline indicator
 *
 * A navigation component that displays tabs with an underline indicator for the active item.
 * Supports icons, counters, and both link and button modes.
 * Uses semantic design tokens for consistent theming.
 *
 * @example
 * <UnderlineNav aria-label="Main navigation">
 *   <UnderlineNav.Item aria-current="page" icon={<Icon />} counter="12">
 *     Overview
 *   </UnderlineNav.Item>
 *   <UnderlineNav.Item>
 *     Settings
 *   </UnderlineNav.Item>
 * </UnderlineNav>
 */

// Type definitions
interface UnderlineNavProps {
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

interface UnderlineNavItemProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  counter?: string | number;
  className?: string;
  'aria-current'?: 'page' | 'step' | 'location' | 'date' | 'time' | boolean;
  onClick?: () => void;
  href?: string;
}

const UnderlineNav = memo(
  ({
    children,
    className = '',
    'aria-label': ariaLabel,
  }: UnderlineNavProps) => {
    return (
      <nav className={`nav-border ${className}`} aria-label={ariaLabel}>
        <div className='flex space-x-6 sm:space-x-8'>{children}</div>
      </nav>
    );
  }
);

/**
 * UnderlineNavItem - Individual navigation item
 *
 * Represents a single tab in the UnderlineNav. Can render as either a link or button.
 * Supports icons, counters, and active state indication.
 */
const UnderlineNavItem = memo(
  ({
    children,
    icon,
    counter,
    className = '',
    'aria-current': ariaCurrent,
    onClick,
    href,
  }: UnderlineNavItemProps) => {
    const isActive = ariaCurrent === 'page';

    // Base classes for the navigation item
    const baseClasses =
      'py-3 px-1 border-b-2 font-medium text-sm flex items-center gap-2 text-text-primary focus:outline-none focus-visible:outline-2 focus-visible:outline-accent-primary focus-visible:outline-offset-2 transition-colors duration-200';

    // Active state uses orange accent border
    const activeClasses = 'border-nav-active-border';
    const inactiveClasses = 'border-transparent';

    const classes = `${baseClasses} ${
      isActive ? activeClasses : inactiveClasses
    } ${className}`;

    const content = (
      <div className='bg-transparent hover:bg-surface-hover active:bg-surface-active rounded-md px-2 py-1 -mx-2 -my-1 transition-colors duration-200 flex items-center gap-2'>
        {icon && <span className='flex-shrink-0 text-text-muted'>{icon}</span>}
        <span>{children}</span>
        {counter && <span className='badge ml-1'>{counter}</span>}
      </div>
    );

    // Render as link if href is provided
    if (href) {
      return (
        <a
          href={href}
          onClick={e => {
            e.preventDefault();
            if (onClick) onClick();
          }}
          className={classes}
          aria-current={ariaCurrent}
        >
          {content}
        </a>
      );
    }

    // Otherwise render as button
    return (
      <button
        type='button'
        onClick={onClick}
        className={classes}
        aria-current={ariaCurrent}
      >
        {content}
      </button>
    );
  }
);

// Create compound component type
interface UnderlineNavComponent
  extends React.MemoExoticComponent<React.FC<UnderlineNavProps>> {
  Item: React.MemoExoticComponent<React.FC<UnderlineNavItemProps>>;
}

// Attach sub-components with proper typing
const UnderlineNavWithItem = UnderlineNav as UnderlineNavComponent;
UnderlineNavWithItem.Item = UnderlineNavItem;

export default UnderlineNavWithItem;
