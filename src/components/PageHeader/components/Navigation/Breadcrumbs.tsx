import React from 'react';
import { BreadcrumbsProps } from '../../types';
import {
  cn,
  createVariantClasses,
  createTruncation,
} from '../../utils/classNames';
import { validateComponentProps } from '../../utils/validators';

/**
 * Breadcrumbs - Navigation breadcrumb component
 *
 * Renders breadcrumb navigation with consistent styling and proper ARIA attributes.
 * Supports different variants, custom separators, and item limiting.
 *
 * @example
 * ```tsx
 * <Breadcrumbs variant="default" separator=">">
 *   <a href="/">Home</a>
 *   <a href="/products">Products</a>
 *   <span>Current Page</span>
 * </Breadcrumbs>
 * ```
 *
 * @example
 * ```tsx
 * <Breadcrumbs variant="minimal" maxItems={3}>
 *   <a href="/">Home</a>
 *   <a href="/category">Category</a>
 *   <a href="/subcategory">Subcategory</a>
 *   <a href="/item">Item</a>
 *   <span>Current</span>
 * </Breadcrumbs>
 * ```
 *
 * @example
 * ```tsx
 * <Breadcrumbs
 *   variant="default"
 *   separator={<ChevronRightIcon className="h-4 w-4" />}
 *   className="text-sm"
 * >
 *   <a href="/dashboard" className="hover:underline">Dashboard</a>
 *   <a href="/projects" className="hover:underline">Projects</a>
 *   <span className="text-text-muted">Project Details</span>
 * </Breadcrumbs>
 * ```
 */
const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  (
    {
      children,
      className = '',
      separator = '/',
      variant = 'default',
      maxItems,
      hidden = false,
      ...props
    },
    ref
  ) => {
    // Validate props in development
    if (process.env.NODE_ENV === 'development') {
      validateComponentProps(props, 'Breadcrumbs');
    }

    if (hidden) return null;

    // Process children to limit items if maxItems is specified
    const processedChildren = React.useMemo(() => {
      if (!maxItems || !React.Children.count(children)) {
        return children;
      }

      const childrenArray = React.Children.toArray(children);
      if (childrenArray.length <= maxItems) {
        return children;
      }

      // Show first item, ellipsis, and last items
      const firstItem = childrenArray[0];
      const lastItems = childrenArray.slice(-(maxItems - 1));
      const ellipsis = <span className='text-text-muted'>…</span>;

      return [firstItem, ellipsis, ...lastItems];
    }, [children, maxItems]);

    // Generate classes
    const baseClasses = 'text-sm flex items-center space-x-2';
    const variantClasses =
      variant === 'minimal' ? 'text-text-muted' : 'text-text-secondary';

    const classes = cn(baseClasses, variantClasses, className);

    // Clone children and add separators
    const childrenWithSeparators = React.Children.map(
      processedChildren,
      (child, index) => {
        if (index === 0) return child;

        return (
          <React.Fragment key={index}>
            <span className='text-text-muted' aria-hidden='true'>
              {separator}
            </span>
            {child}
          </React.Fragment>
        );
      }
    );

    return (
      <nav
        ref={ref as any}
        className={classes}
        aria-label='Breadcrumb'
        {...props}
      >
        <ol className='flex items-center space-x-2'>
          {childrenWithSeparators}
        </ol>
      </nav>
    );
  }
);

Breadcrumbs.displayName = 'Breadcrumbs';

export default Breadcrumbs;
