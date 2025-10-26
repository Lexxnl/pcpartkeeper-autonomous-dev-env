import React, { memo, useCallback, useMemo } from 'react';
import { DataTableRowProps } from '../../types';
import { useDataTableContext } from '../../DataTableContext';
import DataTableCell from '../Cell/DataTableCell';
import { buildComponentClasses, createMemoComparison } from '../../utils/componentUtils';

/**
 * DataTableRow - Table row component with selection and interaction capabilities
 * 
 * ARCHITECTURAL DECISION: This component serves as the container for all cells in a row
 * and handles row-level interactions like selection, clicking, and keyboard navigation.
 * By separating row logic from cell logic, we achieve better performance through
 * targeted re-renders and cleaner separation of concerns.
 * 
 * PERFORMANCE OPTIMIZATION: The component uses React.memo with custom comparison
 * to prevent re-renders when only unrelated context values change. Event handlers
 * are memoized using useCallback to prevent child components from re-rendering.
 * 
 * SELECTION LOGIC: Handles both single and multiple selection modes with proper
 * accessibility attributes and keyboard navigation support.
 */
const DataTableRow = memo<DataTableRowProps<any>>(
  (props) => {
    const {
      item,
      index,
      selected = false,
      hoverable = true,
      striped = false,
      onClick,
      onDoubleClick,
      onKeyDown,
      getRowProps,
      className,
      children,
      ...rest
    } = props;

    const context = useDataTableContext();
    const {
      columns,
      selectable,
      hoverable: contextHoverable,
      striped: contextStriped,
      isSelected,
      getRowId,
      onRowClick,
      onRowDoubleClick,
      onRowKeyDown,
      onSelect,
    } = context;

    // Use context values as defaults, but allow props to override
    const finalHoverable = hoverable ?? contextHoverable;
    const finalStriped = striped ?? contextStriped;

    // Determine if this row is selected
    const isRowSelected = React.useMemo(() => {
      if (selected !== undefined) return selected;
      if (item && typeof index === 'number') {
        return isSelected(item, index);
      }
      return false;
    }, [selected, item, index, isSelected]);

    // Get row ID for accessibility
    const rowId = React.useMemo(() => {
      if (item && typeof index === 'number') {
        return getRowId(item, index);
      }
      return `row-${index}`;
    }, [item, index, getRowId]);

    // Memoized click handler
    const handleClick = useCallback((event: React.MouseEvent<HTMLTableRowElement>) => {
      if (onClick) {
        onClick(event);
      }
      
      if (onRowClick && item && typeof index === 'number') {
        onRowClick(item, index, event);
      }
    }, [onClick, onRowClick, item, index]);

    // Memoized double-click handler
    const handleDoubleClick = useCallback((event: React.MouseEvent<HTMLTableRowElement>) => {
      if (onDoubleClick) {
        onDoubleClick(event);
      }
      
      if (onRowDoubleClick && item && typeof index === 'number') {
        onRowDoubleClick(item, index, event);
      }
    }, [onDoubleClick, onRowDoubleClick, item, index]);

    // Memoized key down handler
    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLTableRowElement>) => {
      if (onKeyDown) {
        onKeyDown(event);
      }
      
      if (onRowKeyDown && item && typeof index === 'number') {
        onRowKeyDown(item, index, event);
      }
    }, [onKeyDown, onRowKeyDown, item, index]);

    // Get additional row props from function
    const additionalRowProps = React.useMemo(() => {
      if (getRowProps && item && typeof index === 'number') {
        return getRowProps(item, index);
      }
      return {};
    }, [getRowProps, item, index]);

    // Build row classes using centralized utility
    const rowClasses = buildComponentClasses(
      'data-table-row',
      {
        'data-table-row-selected': isRowSelected,
        'data-table-row-hoverable': finalHoverable,
        'data-table-row-striped': finalStriped,
        'data-table-row-clickable': onClick || onRowClick,
        'data-table-row-selectable': selectable !== 'none',
      },
      className
    );

    // Memoized checkbox toggle handler
    const handleCheckboxToggle = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      event.stopPropagation(); // Prevent row click
      if (onSelect && item && typeof index === 'number') {
        // Toggle selection
        const currentlySelected = isRowSelected;
        onSelect(
          currentlySelected 
            ? (context.selectedItems || []).filter((_, i) => i !== index)
            : [...(context.selectedItems || []), item]
        );
      }
    }, [onSelect, item, index, isRowSelected, context.selectedItems]);

    // Render cells if no children provided
    const rowContent = React.useMemo(() => {
      if (children !== undefined) {
        return children;
      }

      if (!item || !columns || typeof index !== 'number') {
        return null;
      }

      const dataCells = columns.map((column, cellIndex) => (
        <DataTableCell
          key={`${column.key}-${index}`}
          item={item}
          index={cellIndex}
          column={column}
        />
      ));

      // Add checkbox cell at the start if selectable is not 'none'
      if (selectable !== 'none') {
        return (
          <>
            <td
              className={buildComponentClasses(
                'data-table-cell',
                {
                  'data-table-cell-select': true,
                },
                'w-px'
              )}
              role="gridcell"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="checkbox"
                checked={isRowSelected}
                onChange={handleCheckboxToggle}
                onClick={(e) => e.stopPropagation()}
                aria-label={`Select row ${index + 1}`}
                className="data-table-select-checkbox"
                tabIndex={-1}
              />
            </td>
            {dataCells}
          </>
        );
      }

      return dataCells;
    }, [children, item, columns, index, selectable, isRowSelected, handleCheckboxToggle]);

    return (
      <tr
        className={rowClasses}
        role="row"
        aria-rowindex={typeof index === 'number' ? index + 1 : undefined}
        aria-selected={selectable !== 'none' ? isRowSelected : undefined}
        data-row-id={rowId}
        data-row-index={index}
        data-selected={isRowSelected}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onKeyDown={handleKeyDown}
        tabIndex={onClick || onRowClick ? 0 : undefined}
        {...additionalRowProps}
        {...rest}
      >
        {rowContent}
      </tr>
    );
  },
  createMemoComparison([
    'item',
    'index',
    'selected',
    'hoverable',
    'striped',
    'className',
    'children',
    'onClick',
    'onDoubleClick',
    'onKeyDown',
    'getRowProps'
  ])
);

DataTableRow.displayName = 'DataTableRow';

export default DataTableRow;
