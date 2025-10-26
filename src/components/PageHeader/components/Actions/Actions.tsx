import React from 'react';
import { ActionsProps } from '../../types';
import {
  cn,
  createSpacingClasses,
  createVariantClasses,
} from '../../utils/classNames';
import { validateActionsProps } from '../../utils/validators';
import {
  ACTION_DIRECTIONS,
  ACTION_SPACING,
  ACTION_ALIGNMENTS,
} from '../../constants';

/**
 * Actions - Container for action buttons and controls
 *
 * Provides consistent layout and spacing for action buttons, controls, and interactive elements.
 * Supports different directions, alignments, and spacing options.
 *
 * @example
 * ```tsx
 * <Actions direction="horizontal" align="end" spacing="normal">
 *   <Button variant="invisible" size="small">Cancel</Button>
 *   <Button variant="primary" size="small">Save</Button>
 * </Actions>
 * ```
 *
 * @example
 * ```tsx
 * <Actions direction="vertical" align="start" spacing="tight" wrap>
 *   <Button variant="default">Edit</Button>
 *   <Button variant="default">Duplicate</Button>
 *   <Button variant="danger">Delete</Button>
 * </Actions>
 * ```
 *
 * @example
 * ```tsx
 * <Actions
 *   direction="horizontal"
 *   align="between"
 *   spacing="loose"
 *   className="w-full"
 * >
 *   <div className="flex items-center gap-2">
 *     <Button variant="invisible" size="small">
 *       <SettingsIcon className="h-4 w-4" />
 *     </Button>
 *     <Button variant="invisible" size="small">
 *       <ShareIcon className="h-4 w-4" />
 *     </Button>
 *   </div>
 *   <div className="flex items-center gap-2">
 *     <Button variant="default" size="small">Cancel</Button>
 *     <Button variant="primary" size="small">Save</Button>
 *   </div>
 * </Actions>
 * ```
 */
const Actions = React.forwardRef<HTMLDivElement, ActionsProps>(
  (
    {
      children,
      className = '',
      direction = 'horizontal',
      spacing = 'normal',
      align = 'end',
      wrap = false,
      hidden = false,
      ...props
    },
    ref
  ) => {
    // Validate props in development
    if (process.env.NODE_ENV === 'development') {
      validateActionsProps(props);
    }

    if (hidden) return null;

    // Generate classes
    const baseClasses = 'flex items-center';
    const directionClasses = createVariantClasses(
      '',
      direction,
      ACTION_DIRECTIONS
    );
    const spacingClasses = createSpacingClasses(direction, spacing, 'gap');
    const alignmentClasses = createVariantClasses('', align, ACTION_ALIGNMENTS);
    const wrapClasses = wrap ? 'flex-wrap' : '';

    const classes = cn(
      baseClasses,
      directionClasses,
      spacingClasses,
      alignmentClasses,
      wrapClasses,
      className
    );

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

Actions.displayName = 'Actions';

export default Actions;
