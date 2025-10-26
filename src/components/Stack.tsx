import React from 'react';

/**
 * Stack - Layout component for arranging children with consistent spacing
 *
 * A flexbox-based layout component for arranging children in vertical or horizontal stacks.
 * Provides convenient props for common layout patterns with responsive design support.
 *
 * @param {string} direction - Layout direction: 'vertical' or 'horizontal' or 'responsive' (horizontal on md+)
 * @param {string} align - Align items: 'start', 'center', 'end', 'stretch', 'baseline'
 * @param {string} justify - Justify content: 'start', 'center', 'end', 'between', 'around', 'evenly'
 * @param {number|string} gap - Gap between items (0-12, 'sm', 'md', 'lg', 'xl')
 * @param {boolean} wrap - Whether items should wrap
 * @param {string} as - HTML element to render (default: 'div')
 *
 * @example
 * <Stack direction="horizontal" gap="md" align="center">
 *   <Button>Action 1</Button>
 *   <Button>Action 2</Button>
 * </Stack>
 */

// Type definitions
interface StackProps {
  children: React.ReactNode;
  direction?: 'vertical' | 'horizontal' | 'responsive';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  gap?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  wrap?: boolean;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  [key: string]: unknown;
}

function Stack({
  children,
  direction = 'vertical',
  align = 'stretch',
  justify = 'start',
  gap = 4,
  wrap = false,
  as: Component = 'div',
  className = '',
  ...props
}: StackProps) {
  // Direction classes with responsive support
  const directionClasses = {
    vertical: 'flex-col',
    horizontal: 'flex-row',
    responsive: 'flex-col md:flex-row', // Mobile-first: vertical on mobile, horizontal on medium+
  };

  // Align classes
  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
    baseline: 'items-baseline',
  };

  // Justify classes
  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };

  // Semantic gap mapping for better consistency
  const semanticGaps = {
    xs: '1',
    sm: '2',
    md: '4',
    lg: '6',
    xl: '8',
  };

  // Get gap value (support both semantic and numeric)
  const gapValue =
    typeof gap === 'string' && semanticGaps[gap]
      ? semanticGaps[gap]
      : String(gap);

  // Build gap classes (numbers 0-12 are valid Tailwind gaps)
  const gapClass = `gap-${gapValue}`;

  // Wrap class
  const wrapClass = wrap ? 'flex-wrap' : '';

  // Combine all classes
  const classes =
    `flex ${directionClasses[direction]} ${alignClasses[align]} ${justifyClasses[justify]} ${gapClass} ${wrapClass} ${className}`.trim();

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}

export default Stack;
