import React from 'react';
import { DataTableSkeletonProps } from '../../types';
import cn, { createDataTableClasses } from '../../utils/classNames';

/**
 * DataTableSkeleton - Skeleton loading component for DataTable
 *
 * Renders skeleton placeholders while data is loading.
 * Supports different variants and customizable row/column counts.
 *
 * @example
 * ```tsx
 * <DataTable.Skeleton rows={5} columns={4} variant="minimal" />
 * ```
 */
const DataTableSkeleton = React.forwardRef<
  HTMLDivElement,
  DataTableSkeletonProps
>((props, ref) => {
  const {
    rows = 5,
    columns = 4,
    cellPadding = 'normal',
    variant = 'default',
    className,
    hidden = false,
    ...rest
  } = props;

  if (hidden) {
    return null;
  }

  const skeletonClasses = createDataTableClasses('skeleton', {
    variant,
    custom: className,
  });

  const cellPaddingClasses = {
    condensed: 'data-table-cell-compact',
    normal: '',
    spacious: 'data-table-cell-spacious',
  };

  return (
    <div ref={ref} className={skeletonClasses} {...rest}>
      <table className='min-w-full divide-y divide-border-subtle'>
        <thead className='bg-surface-secondary'>
          <tr>
            {Array.from({ length: columns }, (_, i) => (
              <th
                key={i}
                className='px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider'
              >
                <div className='data-table-skeleton-cell h-4 w-20' />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='bg-surface-primary divide-y divide-border-subtle'>
          {Array.from({ length: rows }, (_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columns }, (_, colIndex) => (
                <td
                  key={colIndex}
                  className={cn(
                    'px-6 py-4 whitespace-nowrap text-sm',
                    cellPaddingClasses[cellPadding]
                  )}
                >
                  <div
                    className='data-table-skeleton-cell h-4'
                    style={{ width: `${Math.random() * 40 + 60}%` }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

DataTableSkeleton.displayName = 'DataTableSkeleton';

export default DataTableSkeleton;
