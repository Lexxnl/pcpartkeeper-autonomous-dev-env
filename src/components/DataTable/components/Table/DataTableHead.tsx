import React from 'react';
import { DataTableHeadProps } from '../../types';
import cn, { createDataTableClasses } from '../../utils/classNames';

/**
 * DataTableHead - Table header section component
 *
 * Renders the thead element with proper styling and accessibility attributes.
 * Supports sticky positioning for better UX with long tables.
 *
 * @example
 * ```tsx
 * <DataTable.Head sticky>
 *   <DataTable.Row>
 *     <DataTable.HeaderCell>Name</DataTable.HeaderCell>
 *     <DataTable.HeaderCell>Email</DataTable.HeaderCell>
 *   </DataTable.Row>
 * </DataTable.Head>
 * ```
 */
const DataTableHead = React.forwardRef<
  HTMLTableSectionElement,
  DataTableHeadProps
>((props, ref) => {
  const {
    children,
    className,
    sticky = false,
    variant = 'default',
    hidden = false,
    ...rest
  } = props;

  if (hidden) {
    return null;
  }

  const headClasses = createDataTableClasses('head', {
    variant,
    custom: className,
  });

  const stickyClasses = sticky ? 'data-table-head-sticky' : '';

  return (
    <thead ref={ref} className={cn(headClasses, stickyClasses)} {...rest}>
      {children}
    </thead>
  );
});

DataTableHead.displayName = 'DataTableHead';

export default DataTableHead;
