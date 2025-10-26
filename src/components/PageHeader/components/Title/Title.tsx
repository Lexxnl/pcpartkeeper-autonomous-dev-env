import React from 'react';
import { TitleProps } from '../../types';
import { cn, createVariantClasses } from '../../utils/classNames';
import { validateTitleProps } from '../../utils/validators';
import { TITLE_WEIGHTS, TITLE_COLORS } from '../../constants';

/**
 * Title - Flexible title component with semantic HTML support
 *
 * Renders titles with proper semantic HTML elements and consistent styling.
 * Supports different variants, weights, and can be rendered as any heading element.
 *
 * @example
 * ```tsx
 * <Title as="h1" variant="default" weight="bold">
 *   Main Page Title
 * </Title>
 * ```
 *
 * @example
 * ```tsx
 * <Title as="h2" variant="muted" weight="semibold">
 *   Section Title
 * </Title>
 * ```
 *
 * @example
 * ```tsx
 * <Title as="div" variant="transparent">
 *   Custom Title Element
 * </Title>
 * ```
 */
const Title = React.forwardRef<HTMLElement, TitleProps>(
  (
    {
      children,
      className = '',
      as: Component = 'h2',
      variant = 'default',
      weight = 'semibold',
      hidden = false,
      ...props
    },
    ref
  ) => {
    // Validate props in development
    if (process.env.NODE_ENV === 'development') {
      validateTitleProps(props);
    }

    if (hidden) return null;

    // Generate classes
    const baseClasses = 'font-semibold';
    const weightClasses = createVariantClasses('', weight, TITLE_WEIGHTS);
    const colorClasses = createVariantClasses('', variant, TITLE_COLORS);

    const classes = cn(baseClasses, weightClasses, colorClasses, className);

    return (
      <Component ref={ref as any} className={classes} {...props}>
        {children}
      </Component>
    );
  }
);

Title.displayName = 'Title';

export default Title;
