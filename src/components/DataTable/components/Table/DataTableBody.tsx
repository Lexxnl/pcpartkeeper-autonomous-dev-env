import React from 'react';
import { DataTableBodyProps } from '../../types';
import cn, { createDataTableClasses } from '../../utils/classNames';

/**
 * DataTableBody - Table body section component
 *
 * Renders the tbody element with proper styling and accessibility attributes.
 * Supports virtual scrolling for large datasets.
 *
 * @example
 * ```tsx
 * <DataTable.Body virtualScrolling rowHeight={48}>
 *   {data.map(item => (
 *     <DataTable.Row key={item.id}>
 *       <DataTable.Cell>{item.name}</DataTable.Cell>
 *     </DataTable.Row>
 *   ))}
 * </DataTable.Body>
 * ```
 */
const DataTableBody = React.forwardRef<
  HTMLTableSectionElement,
  DataTableBodyProps
>((props, ref) => {
  const {
    children,
    className,
    virtualScrolling = false,
    rowHeight = 48,
    overscan = 5,
    hidden = false,
    ...rest
  } = props;

  if (hidden) {
    return null;
  }

  const bodyClasses = createDataTableClasses('body', {
    custom: className,
  });

  const virtualClasses = virtualScrolling ? 'data-table-body-virtual' : '';

  const style = virtualScrolling
    ? {
        height: `${rowHeight * 10}px`, // Approximate height for virtual scrolling
        overflow: 'auto',
      }
    : undefined;

  return (
    <tbody
      ref={ref}
      className={cn(bodyClasses, virtualClasses)}
      style={style}
      {...rest}
    >
      {children}
    </tbody>
  );
});

DataTableBody.displayName = 'DataTableBody';

export default DataTableBody;
