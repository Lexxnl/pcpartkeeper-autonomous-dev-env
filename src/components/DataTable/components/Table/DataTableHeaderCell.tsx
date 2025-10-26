import React from 'react';
import { DataTableHeaderCellProps } from '../../types';
import cn, { createDataTableClasses } from '../../utils/classNames';

/**
 * DataTableHeaderCell - Table header cell component
 *
 * Renders a table header cell with proper styling and accessibility attributes.
 * Supports sorting, alignment, and resizing functionality.
 *
 * @example
 * ```tsx
 * <DataTable.HeaderCell
 *   sortable
 *   sortDirection="asc"
 *   align="center"
 *   onSort={handleSort}
 * >
 *   Product Name
 * </DataTable.HeaderCell>
 * ```
 */
const DataTableHeaderCell = React.forwardRef<
  HTMLTableCellElement,
  DataTableHeaderCellProps
>((props, ref) => {
  const {
    children,
    className,
    column,
    sortable = false,
    sortDirection = 'none',
    align = 'start',
    resizable = false,
    sticky = false,
    onSort,
    onResize,
    hidden = false,
    ...rest
  } = props;

  if (hidden) {
    return null;
  }

  const headerCellClasses = createDataTableClasses('headerCell', {
    custom: className,
  });

  const conditionalClasses = {
    'data-table-header-cell-sortable': sortable,
    'data-table-header-cell-sorted': sortDirection !== 'none',
    'data-table-header-cell-resizable': resizable,
    'data-table-header-cell-sticky': sticky,
  };

  const alignClasses = {
    start: 'data-table-header-cell-start',
    center: 'data-table-header-cell-center',
    end: 'data-table-header-cell-end',
  };

  const handleClick = () => {
    if (sortable && onSort) {
      onSort(column?.key || '');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (sortable && onSort && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onSort(column?.key || '');
    }
  };

  return (
    <th
      ref={ref}
      className={cn(headerCellClasses, conditionalClasses, alignClasses[align])}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role='columnheader'
      aria-sort={
        sortDirection === 'asc'
          ? 'ascending'
          : sortDirection === 'desc'
            ? 'descending'
            : 'none'
      }
      tabIndex={sortable ? 0 : undefined}
      {...rest}
    >
      {children}
      {sortable && (
        <span className='data-table-sort-indicator'>
          {sortDirection === 'asc'
            ? '↑'
            : sortDirection === 'desc'
              ? '↓'
              : '↕'}
        </span>
      )}
    </th>
  );
});

DataTableHeaderCell.displayName = 'DataTableHeaderCell';

export default DataTableHeaderCell;
