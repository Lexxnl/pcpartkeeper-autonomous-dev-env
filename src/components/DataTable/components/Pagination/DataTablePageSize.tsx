import React from 'react';
import { DataTablePageSizeProps } from '../../types';
import cn from '../../utils/classNames';

/**
 * DataTablePageSize - Page size selector component
 *
 * Renders a select dropdown for choosing the number of items per page.
 * Integrates with the pagination system.
 *
 * @example
 * ```tsx
 * <DataTable.PageSize
 *   value={25}
 *   options={[10, 25, 50, 100]}
 *   onChange={handlePageSizeChange}
 * />
 * ```
 */
const DataTablePageSize = React.forwardRef<
  HTMLSelectElement,
  DataTablePageSizeProps
>((props, ref) => {
  const {
    value,
    options,
    onChange,
    disabled = false,
    className,
    hidden = false,
    ...rest
  } = props;

  if (hidden) {
    return null;
  }

  return (
    <select
      ref={ref}
      value={value}
      onChange={e => onChange(Number(e.target.value))}
      disabled={disabled}
      className={cn(
        'px-3 py-2 text-sm border border-border-default rounded bg-surface-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      {...rest}
    >
      {options.map(option => (
        <option key={option} value={option}>
          {option} per page
        </option>
      ))}
    </select>
  );
});

DataTablePageSize.displayName = 'DataTablePageSize';

export default DataTablePageSize;
