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
 * TrailingVisual - Visual element positioned at the end of content
 *
 * Provides consistent spacing and sizing for visual elements like icons, badges,
 * or indicators that appear after text content. Supports different sizes and spacing options.
 *
 * @example
 * ```tsx
 * <TrailingVisual size="md" spacing="normal">
 *   <Badge variant="success">Active</Badge>
 * </TrailingVisual>
 * ```
 *
 * @example
 * ```tsx
 * <TrailingVisual size="sm" spacing="tight">
 *   <Icon className="h-4 w-4 text-text-muted" />
 * </TrailingVisual>
 * ```
 *
 * @example
 * ```tsx
 * <TrailingVisual size="lg" spacing="loose" className="flex-shrink-0">
 *   <div className="h-6 w-6 bg-accent-secondary rounded-full flex items-center justify-center">
 *     <span className="text-xs font-bold text-white">3</span>
 *   </div>
 * </TrailingVisual>
 * ```
 */
const TrailingVisual = React.forwardRef<HTMLDivElement, VisualProps>(
  (
    {
      children,
      className = '',
      size = 'md',
      position = 'trailing',
      spacing = 'normal',
      hidden = false,
      ...props
    },
    ref
  ) => {
    // Validate props in development
    if (process.env.NODE_ENV === 'development') {
      validateComponentProps(props, 'TrailingVisual');
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

TrailingVisual.displayName = 'TrailingVisual';

export default TrailingVisual;
