import React from 'react';
import { DataTableRowProps } from '../../types';
import cn, { createDataTableClasses } from '../../utils/classNames';

/**
 * DataTableRow - Table row component
 *
 * Renders a table row with proper styling and accessibility attributes.
 * Supports selection, hover states, and click handlers.
 *
 * @example
 * ```tsx
 * <DataTable.Row
 *   item={item}
 *   index={0}
 *   selected={false}
 *   hoverable
 *   onClick={handleRowClick}
 * >
 *   <DataTable.Cell>{item.name}</DataTable.Cell>
 * </DataTable.Row>
 * ```
 */
const DataTableRow = React.forwardRef<
  HTMLTableRowElement,
  DataTableRowProps<any>
>((props, ref) => {
  const {
    children,
    className,
    item,
    index,
    selected = false,
    hoverable = true,
    striped = false,
    onClick,
    onDoubleClick,
    onKeyDown,
    getRowProps,
    hidden = false,
    ...rest
  } = props;

  if (hidden) {
    return null;
  }

  const rowClasses = createDataTableClasses('row', {
    custom: className,
  });

  const conditionalClasses = {
    'data-table-row-selected': selected,
    'data-table-row-hover': hoverable,
    'data-table-row-striped': striped,
    'data-table-row-clickable': onClick !== undefined,
  };

  const additionalProps =
    getRowProps && item !== undefined && index !== undefined
      ? getRowProps(item, index)
      : {};

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTableRowElement>) => {
    if (onKeyDown) {
      onKeyDown(e);
    }

    // Handle Enter and Space key presses for row selection
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick(e as any);
    }
  };

  return (
    <tr
      ref={ref}
      className={cn(rowClasses, conditionalClasses)}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onKeyDown={handleKeyDown}
      role='row'
      aria-selected={selected}
      aria-rowindex={index !== undefined ? index + 1 : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...additionalProps}
      {...rest}
    >
      {children}
    </tr>
  );
});

DataTableRow.displayName = 'DataTableRow';

export default DataTableRow;
