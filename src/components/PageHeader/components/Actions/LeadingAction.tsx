import React from 'react';
import { ActionProps } from '../../types';
import { cn, createSpacingClasses } from '../../utils/classNames';
import { validateComponentProps } from '../../utils/validators';

/**
 * LeadingAction - Action positioned at the start of a container
 *
 * Provides consistent spacing and positioning for actions that appear at the beginning
 * of a container or before other content. Typically used for primary actions or navigation.
 *
 * @example
 * ```tsx
 * <LeadingAction spacing="normal">
 *   <Button variant="primary">
 *     <PlusIcon className="h-4 w-4" />
 *     Add Item
 *   </Button>
 * </LeadingAction>
 * ```
 *
 * @example
 * ```tsx
 * <LeadingAction spacing="tight">
 *   <Button variant="invisible" size="small">
 *     <ArrowLeftIcon className="h-4 w-4" />
 *     Back
 *   </Button>
 * </LeadingAction>
 * ```
 *
 * @example
 * ```tsx
 * <LeadingAction spacing="loose" className="flex-shrink-0">
 *   <div className="flex items-center gap-2">
 *     <Button variant="invisible" size="small">
 *       <EditIcon className="h-4 w-4" />
 *     </Button>
 *     <Button variant="invisible" size="small">
 *       <ShareIcon className="h-4 w-4" />
 *     </Button>
 *   </div>
 * </LeadingAction>
 * ```
 */
const LeadingAction = React.forwardRef<HTMLDivElement, ActionProps>(
  (
    {
      children,
      className = '',
      position = 'leading',
      spacing = 'normal',
      hidden = false,
      ...props
    },
    ref
  ) => {
    // Validate props in development
    if (process.env.NODE_ENV === 'development') {
      validateComponentProps(props, 'LeadingAction');
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

LeadingAction.displayName = 'LeadingAction';

export default LeadingAction;
