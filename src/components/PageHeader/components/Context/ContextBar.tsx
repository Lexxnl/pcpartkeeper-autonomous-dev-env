import React from 'react';
import { ContextBarProps } from '../../types';
import {
  cn,
  createSpacingClasses,
  createVariantClasses,
} from '../../utils/classNames';
import { validateComponentProps } from '../../utils/validators';
import { CONTEXT_ALIGNMENTS, CONTEXT_SPACING } from '../../constants';

/**
 * ContextBar - Horizontal container for context information and actions
 *
 * Provides consistent layout for contextual information and actions arranged horizontally.
 * Supports different alignments and spacing options for flexible layouts.
 *
 * @example
 * ```tsx
 * <ContextBar align="between" spacing="normal">
 *   <ParentLink href="/dashboard">← Back to Dashboard</ParentLink>
 *   <ContextAreaActions>
 *     <Button variant="invisible" size="small">
 *       <SettingsIcon className="h-4 w-4" />
 *     </Button>
 *   </ContextAreaActions>
 * </ContextBar>
 * ```
 *
 * @example
 * ```tsx
 * <ContextBar align="start" spacing="tight">
 *   <Breadcrumbs>
 *     <a href="/">Home</a>
 *     <a href="/projects">Projects</a>
 *     <span>Current Project</span>
 *   </Breadcrumbs>
 * </ContextBar>
 * ```
 *
 * @example
 * ```tsx
 * <ContextBar align="center" spacing="loose" className="py-2">
 *   <div className="flex items-center gap-4">
 *     <StatusBadge status="active">Active</StatusBadge>
 *     <span className="text-sm text-text-muted">Last updated 2 hours ago</span>
 *   </div>
 * </ContextBar>
 * ```
 */
const ContextBar = React.forwardRef<HTMLDivElement, ContextBarProps>(
  (
    {
      children,
      className = '',
      align = 'between',
      spacing = 'normal',
      hidden = false,
      ...props
    },
    ref
  ) => {
    // Validate props in development
    if (process.env.NODE_ENV === 'development') {
      validateComponentProps(props, 'ContextBar');
    }

    if (hidden) return null;

    // Generate classes
    const baseClasses = 'flex items-center';
    const alignmentClasses = createVariantClasses(
      '',
      align,
      CONTEXT_ALIGNMENTS
    );
    const spacingClasses = createSpacingClasses('horizontal', spacing, 'gap');

    const classes = cn(
      baseClasses,
      alignmentClasses,
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

ContextBar.displayName = 'ContextBar';

export default ContextBar;
