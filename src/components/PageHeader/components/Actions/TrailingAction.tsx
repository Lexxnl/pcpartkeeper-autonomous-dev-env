import React from 'react';
import { ActionProps } from '../../types';
import { cn, createSpacingClasses } from '../../utils/classNames';
import { validateComponentProps } from '../../utils/validators';

/**
 * TrailingAction - Action positioned at the end of a container
 *
 * Provides consistent spacing and positioning for actions that appear at the end
 * of a container or after other content. Typically used for secondary actions or controls.
 *
 * @example
 * ```tsx
 * <TrailingAction spacing="normal">
 *   <Button variant="default">
 *     Save
 *     <ArrowRightIcon className="h-4 w-4" />
 *   </Button>
 * </TrailingAction>
 * ```
 *
 * @example
 * ```tsx
 * <TrailingAction spacing="tight">
 *   <Button variant="invisible" size="small">
 *     <SettingsIcon className="h-4 w-4" />
 *   </Button>
 * </TrailingAction>
 * ```
 *
 * @example
 * ```tsx
 * <TrailingAction spacing="loose" className="flex-shrink-0">
 *   <div className="flex items-center gap-2">
 *     <Button variant="invisible" size="small">
 *       <DownloadIcon className="h-4 w-4" />
 *     </Button>
 *     <Button variant="invisible" size="small">
 *       <ShareIcon className="h-4 w-4" />
 *     </Button>
 *     <Button variant="primary" size="small">
 *       Publish
 *     </Button>
 *   </div>
 * </TrailingAction>
 * ```
 */
const TrailingAction = React.forwardRef<HTMLDivElement, ActionProps>(
  (
    {
      children,
      className = '',
      position = 'trailing',
      spacing = 'normal',
      hidden = false,
      ...props
    },
    ref
  ) => {
    // Validate props in development
    if (process.env.NODE_ENV === 'development') {
      validateComponentProps(props, 'TrailingAction');
    }

    if (hidden) return null;

    // Generate classes
    const baseClasses = 'flex items-center';
    const spacingClasses = createSpacingClasses('horizontal', spacing, 'gap');

    const classes = cn(baseClasses, spacingClasses, className);

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

TrailingAction.displayName = 'TrailingAction';

export default TrailingAction;
