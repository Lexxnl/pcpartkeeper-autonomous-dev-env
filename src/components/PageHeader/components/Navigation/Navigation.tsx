import React from 'react';
import { NavigationProps } from '../../types';
import {
  cn,
  createVariantClasses,
  createSpacingClasses,
} from '../../utils/classNames';
import { validateComponentProps } from '../../utils/validators';
import { NAVIGATION_VARIANTS, NAVIGATION_ORIENTATIONS } from '../../constants';

/**
 * Navigation - Container for navigation elements
 *
 * Provides consistent styling and layout for navigation components like tabs,
 * breadcrumbs, and navigation menus. Supports different variants and orientations.
 *
 * @example
 * ```tsx
 * <Navigation variant="default" orientation="horizontal">
 *   <UnderlineNav>
 *     <UnderlineNav.Item>Overview</UnderlineNav.Item>
 *     <UnderlineNav.Item>Settings</UnderlineNav.Item>
 *   </UnderlineNav>
 * </Navigation>
 * ```
 *
 * @example
 * ```tsx
 * <Navigation variant="minimal" orientation="vertical" className="mt-4">
 *   <nav>
 *     <a href="/dashboard">Dashboard</a>
 *     <a href="/settings">Settings</a>
 *   </nav>
 * </Navigation>
 * ```
 *
 * @example
 * ```tsx
 * <Navigation as="aside" variant="pills" aria-label="Page navigation">
 *   <div className="flex space-x-2">
 *     <button className="px-3 py-1 rounded-full bg-action-primary text-text-inverse">Active</button>
 *     <button className="px-3 py-1 rounded-full">Inactive</button>
 *   </div>
 * </Navigation>
 * ```
 */
const Navigation = React.forwardRef<HTMLElement, NavigationProps>(
  (
    {
      children,
      className = '',
      as: Component = 'div',
      variant = 'default',
      orientation = 'horizontal',
      hidden = false,
      ...props
    },
    ref
  ) => {
    // Validate props in development
    if (process.env.NODE_ENV === 'development') {
      validateComponentProps(props, 'Navigation');
    }

    if (hidden) return null;

    // Generate classes
    const baseClasses = 'mt-4';
    const variantClasses = createVariantClasses(
      '',
      variant,
      NAVIGATION_VARIANTS
    );
    const orientationClasses = createVariantClasses(
      'flex',
      orientation,
      NAVIGATION_ORIENTATIONS
    );

    const classes = cn(
      baseClasses,
      variantClasses,
      orientationClasses,
      className
    );

    return (
      <Component ref={ref as any} className={classes} {...props}>
        {children}
      </Component>
    );
  }
);

Navigation.displayName = 'Navigation';

export default Navigation;
