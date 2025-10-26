import React from 'react';
import { DataTableEmptyProps } from '../../types';
import cn, { createDataTableClasses } from '../../utils/classNames';

/**
 * DataTableEmpty - Empty state component for DataTable
 *
 * Renders an empty state when no data is available.
 * Supports different variants and custom content.
 *
 * @example
 * ```tsx
 * <DataTable.Empty
 *   title="No data found"
 *   description="Try adjusting your search criteria"
 *   action={<Button>Add Item</Button>}
 * />
 * ```
 */
const DataTableEmpty = React.forwardRef<HTMLDivElement, DataTableEmptyProps>(
  (props, ref) => {
    const {
      title = 'No data available',
      description = 'There are no items to display at this time.',
      icon,
      action,
      variant = 'default',
      className,
      hidden = false,
      ...rest
    } = props;

    if (hidden) {
      return null;
    }

    const emptyClasses = createDataTableClasses('empty', {
      variant,
      custom: className,
    });

    const defaultIcon = (
      <svg
        className='data-table-empty-icon'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
        />
      </svg>
    );

    return (
      <div ref={ref} className={emptyClasses} {...rest}>
        {icon || defaultIcon}
        <div className='data-table-empty-title'>{title}</div>
        <div className='data-table-empty-description'>{description}</div>
        {action && <div className='data-table-empty-action'>{action}</div>}
      </div>
    );
  }
);

DataTableEmpty.displayName = 'DataTableEmpty';

export default DataTableEmpty;
