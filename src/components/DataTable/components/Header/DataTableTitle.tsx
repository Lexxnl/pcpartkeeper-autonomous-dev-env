import React from 'react';
import { DataTableTitleProps } from '../../types';
import cn, { createDataTableClasses } from '../../utils/classNames';

/**
 * DataTableTitle - Title component for DataTable header
 *
 * Displays the main title for the data table with consistent typography and styling.
 * Supports different semantic HTML elements and variants.
 *
 * @example
 * ```tsx
 * <DataTable.Title as="h1" variant="large">
 *   PC Parts Inventory
 * </DataTable.Title>
 * ```
 */
const DataTableTitle = React.forwardRef<HTMLElement, DataTableTitleProps>(
  (props, ref) => {
    const {
      children,
      className,
      as: Component = 'h2',
      variant = 'default',
      weight = 'semibold',
      hidden = false,
      ...rest
    } = props;

    if (hidden) {
      return null;
    }

    const titleClasses = createDataTableClasses('title', {
      variant,
      custom: className,
    });

    const variantClasses = {
      default: 'data-table-title',
      large: 'data-table-title-large',
      small: 'data-table-title-small',
    };

    const weightClasses = {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    };

    return (
      <Component
        ref={ref}
        className={cn(
          titleClasses,
          variantClasses[variant],
          weightClasses[weight]
        )}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

DataTableTitle.displayName = 'DataTableTitle';

export default DataTableTitle;
