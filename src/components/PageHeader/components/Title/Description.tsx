import React from 'react';
import { DescriptionProps } from '../../types';
import {
  cn,
  createVariantClasses,
  createSizeClasses,
} from '../../utils/classNames';
import { validateComponentProps } from '../../utils/validators';
import { DESCRIPTION_SIZES, DESCRIPTION_COLORS } from '../../constants';

/**
 * Description - Flexible description component for page headers
 *
 * Renders descriptions with consistent styling and proper semantic markup.
 * Supports different variants, sizes, and responsive behavior.
 *
 * @example
 * ```tsx
 * <Description variant="default" size="md">
 *   This is a page description that provides context about the current page.
 * </Description>
 * ```
 *
 * @example
 * ```tsx
 * <Description variant="muted" size="sm">
 *   Last updated 2 hours ago
 * </Description>
 * ```
 *
 * @example
 * ```tsx
 * <Description variant="transparent" size="lg" className="max-w-2xl">
 *   A longer description that might span multiple lines and provide
 *   detailed information about the page content.
 * </Description>
 * ```
 */
const Description = React.forwardRef<HTMLDivElement, DescriptionProps>(
  (
    {
      children,
      className = '',
      variant = 'default',
      size = 'md',
      hidden = false,
      ...props
    },
    ref
  ) => {
    // Validate props in development
    if (process.env.NODE_ENV === 'development') {
      validateComponentProps(props, 'Description');
    }

    if (hidden) return null;

    // Generate classes
    const baseClasses = 'mt-1';
    const sizeClasses = createSizeClasses('', size, DESCRIPTION_SIZES);
    const colorClasses = createVariantClasses('', variant, DESCRIPTION_COLORS);

    const classes = cn(baseClasses, sizeClasses, colorClasses, className);

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

Description.displayName = 'Description';

export default Description;
