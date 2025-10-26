import React from 'react';
import { ContextAreaActionsProps } from '../../types';
import { cn, createSpacingClasses } from '../../utils/classNames';
import { validateComponentProps } from '../../utils/validators';
import { CONTEXT_SPACING } from '../../constants';

/**
 * ContextAreaActions - Container for actions within context areas
 *
 * Provides consistent layout and spacing for action buttons and controls within
 * context areas. Supports different directions and spacing options.
 *
 * @example
 * ```tsx
 * <ContextAreaActions direction="horizontal" spacing="normal">
 *   <Button variant="invisible" size="small">
 *     <SettingsIcon className="h-4 w-4" />
 *   </Button>
 *   <Button variant="invisible" size="small">
 *     <ShareIcon className="h-4 w-4" />
 *   </Button>
 * </ContextAreaActions>
 * ```
 *
 * @example
 * ```tsx
 * <ContextAreaActions direction="vertical" spacing="tight">
 *   <Button variant="default" size="small">Edit</Button>
 *   <Button variant="default" size="small">Duplicate</Button>
 *   <Button variant="danger" size="small">Delete</Button>
 * </ContextAreaActions>
 * ```
 *
 * @example
 * ```tsx
 * <ContextAreaActions
 *   direction="horizontal"
 *   spacing="loose"
 *   className="flex-shrink-0"
 * >
 *   <div className="flex items-center gap-2">
 *     <StatusIndicator status="online" />
 *     <span className="text-sm text-text-muted">Online</span>
 *   </div>
 *   <Button variant="invisible" size="small">
 *     <MoreVerticalIcon className="h-4 w-4" />
 *   </Button>
 * </ContextAreaActions>
 * ```
 */
const ContextAreaActions = React.forwardRef<
  HTMLDivElement,
  ContextAreaActionsProps
>(
  (
    {
      children,
      className = '',
      direction = 'horizontal',
      spacing = 'normal',
      hidden = false,
      ...props
    },
    ref
  ) => {
    // Validate props in development
    if (process.env.NODE_ENV === 'development') {
      validateComponentProps(props, 'ContextAreaActions');
    }

    if (hidden) return null;

    // Generate classes
    const baseClasses = 'flex items-center';
    const directionClasses =
      direction === 'horizontal' ? 'flex-row' : 'flex-col';
    const spacingClasses = createSpacingClasses(direction, spacing, 'gap');

    const classes = cn(
      baseClasses,
      directionClasses,
      spacingClasses,
      className
    );

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

ContextAreaActions.displayName = 'ContextAreaActions';

export default ContextAreaActions;
