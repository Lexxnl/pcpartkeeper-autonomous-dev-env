import React from 'react';
import { TitleAreaProps } from '../../types';
import {
  cn,
  createVariantClasses,
  createSpacingClasses,
} from '../../utils/classNames';
import { validateTitleAreaProps } from '../../utils/validators';
import {
  TITLE_VARIANTS,
  TITLE_ALIGNMENTS,
  TITLE_SPACING,
} from '../../constants';

/**
 * TitleArea - Container for title-related components
 *
 * Provides consistent spacing and layout for title, description, and visual elements.
 * Supports different variants, alignments, and spacing options.
 *
 * @example
 * ```tsx
 * <TitleArea variant="large" align="center" spacing="loose">
 *   <Title>My Page Title</Title>
 *   <Description>Page description</Description>
 * </TitleArea>
 * ```
 *
 * @example
 * ```tsx
 * <TitleArea variant="medium" align="left">
 *   <LeadingVisual>
 *     <Icon className="h-5 w-5" />
 *   </LeadingVisual>
 *   <Title>Page with Icon</Title>
 *   <TrailingVisual>
 *     <Badge>New</Badge>
 *   </TrailingVisual>
 * </TitleArea>
 * ```
 */
const TitleArea = React.forwardRef<HTMLDivElement, TitleAreaProps>(
  (
    {
      children,
      className = '',
      variant = 'medium',
      align = 'left',
      spacing = 'normal',
      hidden = false,
      ...props
    },
    ref
  ) => {
    // Validate props in development
    if (process.env.NODE_ENV === 'development') {
      validateTitleAreaProps(props);
    }

    if (hidden) return null;

    // Generate classes
    const baseClasses = 'flex items-center';
    const variantClasses = createVariantClasses(
      baseClasses,
      variant,
      TITLE_VARIANTS
    );
    const alignmentClasses = createVariantClasses('', align, TITLE_ALIGNMENTS);
    const spacingClasses = createSpacingClasses('horizontal', spacing, 'gap');

    const classes = cn(
      variantClasses,
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

TitleArea.displayName = 'TitleArea';

export default TitleArea;
