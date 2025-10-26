import React, { memo, useMemo, useCallback } from 'react';
import { DataTableHeadProps } from '../../types';
import { useDataTableContext } from '../../DataTableContext';
import DataTableHeaderCell from './DataTableHeaderCell';
import { buildComponentClasses, createMemoComparison } from '../../utils/componentUtils';

/**
 * DataTableHeaderRow - Table header row component with sorting and selection capabilities
 * 
 * ARCHITECTURAL DECISION: This component renders just the header row content without
 * the <thead> wrapper, allowing it to be used properly within table structures.
 * This fixes DOM nesting issues and ensures proper HTML semantics.
 * 
 * PERFORMANCE OPTIMIZATION: The component uses React.memo with custom comparison
 * to prevent re-renders when only unrelated context values change. The sort handler
 * is memoized using useCallback to prevent child components from re-rendering.
 * 
 * SELECTION LOGIC: Handles "select all" functionality for multiple selection mode
 * with proper accessibility attributes and keyboard navigation support.
 */
const DataTableHeaderRow = memo<DataTableHeadProps>(
  (props) => {
    const {
      sticky = false,
      variant = 'default',
      className,
      children,
      ...rest
    } = props;

    const context = useDataTableContext();
    const {
      columns,
      selectable,
      sortable,
      sortConfig,
      isAllSelected,
      isPartiallySelected,
      handleSelectAll,
      handleSort,
    } = context;

    // Memoized select all handler
    const handleSelectAllClick = useCallback(() => {
      if (selectable === 'none' || !handleSelectAll) return;
      
      const newSelectionState = !isAllSelected;
      handleSelectAll(newSelectionState);
    }, [selectable, handleSelectAll, isAllSelected]);

    // Memoized sort handler
    const handleColumnSort = useCallback((columnKey: string) => {
      if (!sortable || !handleSort) return;
      
      handleSort(columnKey);
    }, [sortable, handleSort]);

    // Memoized header row to prevent unnecessary re-renders
    const headerRow = useMemo(() => {
      if (children !== undefined) {
        return children;
      }

      if (!columns || columns.length === 0) {
        return null;
      }

      return (
        <tr role="row">
          {/* Selection column */}
          {selectable !== 'none' && (
            <th
              className={buildComponentClasses(
                'data-table-header-cell',
                'data-table-header-cell-select',
                {
                  'data-table-header-cell-sticky': sticky,
                }
              )}
              role="columnheader"
              aria-label="Select all rows"
              scope="col"
              tabIndex={0}
              onClick={handleSelectAllClick}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelectAllClick();
                }
              }}
            >
              <input
                type="checkbox"
                checked={isAllSelected}
                ref={(input) => {
                  if (input) {
                    input.indeterminate = isPartiallySelected;
                  }
                }}
                onChange={handleSelectAllClick}
                aria-label="Select all rows"
                tabIndex={-1}
              />
            </th>
          )}

          {/* Data columns */}
          {columns.map((column, index) => (
            <DataTableHeaderCell
              key={column.key}
              column={column}
              sortable={sortable}
              sortDirection={
                sortConfig?.column === column.key ? sortConfig.direction : 'none'
              }
              sticky={sticky}
              onSort={handleColumnSort}
            />
          ))}
        </tr>
      );
    }, [
      children,
      columns,
      selectable,
      sortable,
      sortConfig,
      isAllSelected,
      isPartiallySelected,
      sticky,
      handleSelectAllClick,
      handleColumnSort,
    ]);

    return <>{headerRow}</>;
  },
  createMemoComparison([
    'sticky',
    'variant',
    'className',
    'children'
  ])
);

DataTableHeaderRow.displayName = 'DataTableHeaderRow';

export default DataTableHeaderRow;
