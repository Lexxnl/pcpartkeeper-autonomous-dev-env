import React, { memo } from 'react';
import { DataTableCellProps } from '../../types';
import { useDataTableContext } from '../../DataTableContext';
import { buildComponentClasses, buildStyles, createMemoComparison } from '../../utils/componentUtils';

/**
 * DataTableCell - Individual table cell component
 * 
 * ARCHITECTURAL DECISION: This component is memoized to prevent unnecessary re-renders
 * when only other cells in the same row change. This is crucial for performance in
 * large datasets where individual cell updates should not trigger full row re-renders.
 * 
 * The component uses the context pattern to access column configuration and styling
 * rather than prop drilling, which reduces the component's API surface and makes
 * it easier to maintain consistency across the table.
 * 
 * PERFORMANCE OPTIMIZATION: We use React.memo with a custom comparison function
 * that only re-renders when the actual cell data or column configuration changes,
 * not when unrelated context values change.
 */
const DataTableCell = memo<DataTableCellProps<any>>(
  (props) => {
    const {
      item,
      index,
      column,
      align,
      sticky,
      className,
      children,
      render,
      ...rest
    } = props;

    const context = useDataTableContext();
    const { cellPadding, compact } = context;

    // Use column from context if not provided as prop
    const cellColumn = column || context.columns[index];
    
    if (!cellColumn || !item) {
      return null;
    }

    // Determine cell content
    const cellContent = React.useMemo(() => {
      // Priority: children > render prop > column render > field value
      if (children !== undefined) {
        return children;
      }
      
      if (render) {
        return render(item, index, cellColumn);
      }
      
      if (cellColumn.render) {
        return cellColumn.render(item, index, cellColumn);
      }
      
      // Extract field value with proper typing
      const fieldValue = cellColumn.field 
        ? (item as any)[cellColumn.field]
        : undefined;
      
      return fieldValue ?? '';
    }, [children, render, cellColumn, item, index]);

    // Build cell classes using centralized utility
    const cellClasses = buildComponentClasses(
      'data-table-cell',
      {
        'data-table-cell-condensed': cellPadding === 'condensed',
        'data-table-cell-normal': cellPadding === 'normal',
        'data-table-cell-spacious': cellPadding === 'spacious',
        'data-table-cell-compact': compact,
        'data-table-cell-sticky': sticky,
        'data-table-cell-align-start': (align || cellColumn.align) === 'start',
        'data-table-cell-align-center': (align || cellColumn.align) === 'center',
        'data-table-cell-align-end': (align || cellColumn.align) === 'end',
      },
      cellColumn.cellClassName || className
    );

    // Build cell styles using centralized utility
    const cellStyles = React.useMemo(() => {
      const styles: React.CSSProperties = {};
      
      if (cellColumn.width) {
        if (typeof cellColumn.width === 'number') {
          styles.width = `${cellColumn.width}px`;
        } else if (cellColumn.width === 'grow') {
          styles.flex = '1 1 0%';
        } else {
          styles.width = cellColumn.width;
        }
      }
      
      if (cellColumn.minWidth) {
        styles.minWidth = typeof cellColumn.minWidth === 'number' 
          ? `${cellColumn.minWidth}px` 
          : cellColumn.minWidth;
      }
      
      if (cellColumn.maxWidth) {
        styles.maxWidth = typeof cellColumn.maxWidth === 'number' 
          ? `${cellColumn.maxWidth}px` 
          : cellColumn.maxWidth;
      }
      
      if (sticky) {
        styles.position = 'sticky';
        styles.zIndex = 1;
      }
      
      return buildStyles(styles);
    }, [cellColumn.width, cellColumn.minWidth, cellColumn.maxWidth, sticky]);

    return (
      <td
        className={cellClasses}
        style={cellStyles}
        role="gridcell"
        aria-colindex={index + 1}
        data-column-key={cellColumn.key}
        data-field={cellColumn.field}
        {...rest}
      >
        {cellContent}
      </td>
    );
  },
  createMemoComparison([
    'item',
    'index', 
    'column',
    'align',
    'sticky',
    'className',
    'children',
    'render'
  ])
);

DataTableCell.displayName = 'DataTableCell';

export default DataTableCell;
