import React from 'react';
import { ParentLinkProps } from '../../types';
import {
  cn,
  createVariantClasses,
  createSizeClasses,
} from '../../utils/classNames';
import { validateParentLinkProps } from '../../utils/validators';
import { PARENT_LINK_VARIANTS, PARENT_LINK_SIZES } from '../../constants';

/**
 * ParentLink - Link component for navigation back to parent pages
 *
 * Provides consistent styling and behavior for links that navigate back to parent
 * pages or sections. Supports different variants, sizes, and external link handling.
 *
 * @example
 * ```tsx
 * <ParentLink href="/dashboard" variant="default" size="md">
 *   ← Back to Dashboard
 * </ParentLink>
 * ```
 *
 * @example
 * ```tsx
 * <ParentLink
 *   href="/projects"
 *   variant="minimal"
 *   size="sm"
 *   external
 * >
 *   View All Projects
 * </ParentLink>
 * ```
 *
 * @example
 * ```tsx
 * <ParentLink
 *   href="/settings"
 *   variant="button"
 *   size="lg"
 *   className="inline-flex items-center gap-2"
 * >
 *   <SettingsIcon className="h-4 w-4" />
 *   Settings
 * </ParentLink>
 * ```
 */
const ParentLink = React.forwardRef<HTMLAnchorElement, ParentLinkProps>(
  (
    {
      children,
      href,
      className = '',
      variant = 'default',
      size = 'md',
      external = false,
      hidden = false,
      ...props
    },
    ref
  ) => {
    // Validate props in development
    if (process.env.NODE_ENV === 'development') {
      validateParentLinkProps(props);
    }

    if (hidden) return null;

    // Generate classes
    const baseClasses = 'inline-flex items-center';
    const variantClasses = createVariantClasses(
      '',
      variant,
      PARENT_LINK_VARIANTS
    );
    const sizeClasses = createSizeClasses('', size, PARENT_LINK_SIZES);

    const classes = cn(baseClasses, variantClasses, sizeClasses, className);

    // Handle external links
    const linkProps = external
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {};

    return (
      <a ref={ref} href={href} className={classes} {...linkProps} {...props}>
        {children}
      </a>
    );
  }
);

ParentLink.displayName = 'ParentLink';

export default ParentLink;
