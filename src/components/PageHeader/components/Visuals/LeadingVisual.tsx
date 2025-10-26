import React from 'react';
import { VisualProps } from '../../types';
import {
  cn,
  createSizeClasses,
  createSpacingClasses,
} from '../../utils/classNames';
import { validateComponentProps } from '../../utils/validators';
import {
  VISUAL_SIZES,
  VISUAL_SPACING,
  VISUAL_POSITIONS,
} from '../../constants';

/**
 * LeadingVisual - Visual element positioned at the start of content
 *
 * Provides consistent spacing and sizing for visual elements like icons, avatars,
 * or images that appear before text content. Supports different sizes and spacing options.
 *
 * @example
 * ```tsx
 * <LeadingVisual size="md" spacing="normal">
 *   <Icon className="h-5 w-5 text-accent-primary" />
 * </LeadingVisual>
 * ```
 *
 * @example
 * ```tsx
 * <LeadingVisual size="lg" spacing="loose">
 *   <Avatar
 *     src="/user-avatar.jpg"
 *     alt="User avatar"
 *     className="h-8 w-8 rounded-full"
 *   />
 * </LeadingVisual>
 * ```
 *
 * @example
 * ```tsx
 * <LeadingVisual size="sm" spacing="tight" className="flex-shrink-0">
 *   <div className="h-4 w-4 bg-accent-primary rounded-full flex items-center justify-center">
 *     <CheckIcon className="h-2 w-2 text-white" />
 *   </div>
 * </LeadingVisual>
 * ```
 */
const LeadingVisual = React.forwardRef<HTMLDivElement, VisualProps>(
  (
    {
      children,
      className = '',
      size = 'md',
      position = 'leading',
      spacing = 'normal',
      hidden = false,
      ...props
    },
    ref
  ) => {
    // Validate props in development
    if (process.env.NODE_ENV === 'development') {
      validateComponentProps(props, 'LeadingVisual');
    }

    if (hidden) return null;

    // Generate classes
    const baseClasses = 'flex-shrink-0 flex items-center justify-center';
    const sizeClasses = createSizeClasses('', size, VISUAL_SIZES);
    const spacingClasses = createSpacingClasses('horizontal', spacing, 'gap');

    const classes = cn(baseClasses, sizeClasses, spacingClasses, className);

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

LeadingVisual.displayName = 'LeadingVisual';

export default LeadingVisual;
