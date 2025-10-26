import React from 'react';
import { DataTableTableProps } from '../../types';
import cn, { createDataTableClasses } from '../../utils/classNames';
import { useDataTableContext } from '../../DataTableContext';

/**
 * DataTableTable - Main table element component
 *
 * Renders the HTML table element with proper styling and accessibility attributes.
 * Supports different variants and responsive behavior.
 *
 * @example
 * ```tsx
 * <DataTable.Table variant="bordered" striped hoverable>
 *   <DataTable.Head>
 *     <DataTable.Row>
 *       <DataTable.HeaderCell>Name</DataTable.HeaderCell>
 *     </DataTable.Row>
 *   </DataTable.Head>
 *   <DataTable.Body>
 *     <DataTable.Row>
 *       <DataTable.Cell>John Doe</DataTable.Cell>
 *     </DataTable.Row>
 *   </DataTable.Body>
 * </DataTable.Table>
 * ```
 */
const DataTableTable = React.forwardRef<HTMLTableElement, DataTableTableProps>(
  (props, ref) => {
    const {
      children,
      className,
      variant = 'default',
      size = 'md',
      hoverable = true,
      striped = false,
      bordered = false,
      compact = false,
      stickyHeader = false,
      stickyColumns = 0,
      hidden = false,
      ...rest
    } = props;

    // Get context values
    const context = useDataTableContext();
    const {
      processedData,
      columns,
      bordered: contextBordered,
      striped: contextStriped,
      hoverable: contextHoverable,
      compact: contextCompact,
      stickyHeader: contextStickyHeader,
    } = context;

    // Use context values as defaults, but allow props to override
    // Check if props were explicitly passed by comparing with default values
    const finalBordered =
      props.bordered !== undefined ? bordered : contextBordered;
    const finalStriped = props.striped !== undefined ? striped : contextStriped;
    const finalHoverable =
      props.hoverable !== undefined ? hoverable : contextHoverable;
    const finalCompact = props.compact !== undefined ? compact : contextCompact;
    const finalStickyHeader =
      props.stickyHeader !== undefined ? stickyHeader : contextStickyHeader;

    if (hidden) {
      return null;
    }

    const tableClasses = createDataTableClasses('table', {
      variant,
      custom: className,
    });

    const sizeClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    };

    const variantClasses = {
      default: 'data-table-table',
      bordered: 'data-table-table-bordered',
      striped: 'data-table-table-striped',
      minimal: 'data-table-table-minimal',
    };

    const conditionalClasses = {
      'data-table-table-striped': finalStriped,
      'data-table-table-bordered': finalBordered,
      'data-table-compact': finalCompact,
    };

    return (
      <table
        ref={ref}
        className={cn(
          tableClasses,
          sizeClasses[size],
          variantClasses[variant],
          conditionalClasses
        )}
        role='table'
        aria-label='Data table with sortable columns'
        aria-rowcount={processedData?.length || 0}
        aria-colcount={columns?.length || 0}
        tabIndex={0}
        {...rest}
      >
        {children}
      </table>
    );
  }
);

DataTableTable.displayName = 'DataTableTable';

export default DataTableTable;
