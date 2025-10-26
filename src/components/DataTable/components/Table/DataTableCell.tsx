import React from 'react';
import { DataTableCellProps } from '../../types';
import cn, { createDataTableClasses } from '../../utils/classNames';

/**
 * DataTableCell - Table cell component
 *
 * Renders a table cell with proper styling and accessibility attributes.
 * Supports custom rendering, alignment, and sticky positioning.
 *
 * @example
 * ```tsx
 * <DataTable.Cell
 *   item={item}
 *   index={0}
 *   column={column}
 *   align="center"
 *   sticky
 * >
 *   {item.name}
 * </DataTable.Cell>
 * ```
 */
const DataTableCell = React.forwardRef<
  HTMLTableCellElement,
  DataTableCellProps<any>
>((props, ref) => {
  const {
    children,
    className,
    item,
    index,
    column,
    align = 'start',
    sticky = false,
    render,
    hidden = false,
    ...rest
  } = props;

  if (hidden) {
    return null;
  }

  const cellClasses = createDataTableClasses('cell', {
    custom: className,
  });

  const conditionalClasses = {
    'data-table-cell-sticky': sticky,
  };

  const alignClasses = {
    start: 'data-table-cell-start',
    center: 'data-table-cell-center',
    end: 'data-table-cell-end',
  };

  const content =
    render && item !== undefined && index !== undefined && column
      ? render(item, index, column)
      : children;

  return (
    <td
      ref={ref}
      className={cn(cellClasses, conditionalClasses, alignClasses[align])}
      data-label={column?.header || ''}
      {...rest}
    >
      {content}
    </td>
  );
});

DataTableCell.displayName = 'DataTableCell';

export default DataTableCell;
