import React from 'react';
import { ContextAreaProps } from '../../types';
import {
  cn,
  createVariantClasses,
  createSpacingClasses,
} from '../../utils/classNames';
import { validateComponentProps } from '../../utils/validators';
import { CONTEXT_VARIANTS, CONTEXT_SPACING } from '../../constants';

/**
 * ContextArea - Container for contextual information and navigation
 *
 * Provides consistent styling and layout for contextual information like breadcrumbs,
 * back links, status indicators, and other page context. Supports different variants and spacing.
 *
 * @example
 * ```tsx
 * <ContextArea variant="default" spacing="normal">
 *   <ParentLink href="/dashboard">← Back to Dashboard</ParentLink>
 * </ContextArea>
 * ```
 *
 * @example
 * ```tsx
 * <ContextArea variant="elevated" spacing="loose">
 *   <ContextBar>
 *     <Breadcrumbs>
 *       <a href="/">Home</a>
 *       <a href="/projects">Projects</a>
 *       <span>Current Project</span>
 *     </Breadcrumbs>
 *     <ContextAreaActions>
 *       <Button variant="invisible" size="small">
 *         <SettingsIcon className="h-4 w-4" />
 *       </Button>
 *     </ContextAreaActions>
 *   </ContextBar>
 * </ContextArea>
 * ```
 *
 * @example
 * ```tsx
 * <ContextArea variant="minimal" spacing="tight" className="border-b border-border-subtle">
 *   <div className="flex items-center gap-2 text-sm text-text-muted">
 *     <ClockIcon className="h-4 w-4" />
 *     <span>Last updated 2 hours ago</span>
 *   </div>
 * </ContextArea>
 * ```
 */
const ContextArea = React.forwardRef<HTMLDivElement, ContextAreaProps>(
  (
    {
      children,
      className = '',
      variant = 'default',
      spacing = 'normal',
      hidden = false,
      ...props
    },
    ref
  ) => {
    // Validate props in development
    if (process.env.NODE_ENV === 'development') {
      validateComponentProps(props, 'ContextArea');
    }

    if (hidden) return null;

    // Generate classes
    const baseClasses = 'w-full';
    const variantClasses = createVariantClasses('', variant, CONTEXT_VARIANTS);
    const spacingClasses = createSpacingClasses('vertical', spacing, 'gap');

    const classes = cn(baseClasses, variantClasses, spacingClasses, className);

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

ContextArea.displayName = 'ContextArea';

export default ContextArea;
