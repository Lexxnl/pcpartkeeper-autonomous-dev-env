import React, { memo, useCallback } from 'react';
import { DataTableHeaderCellProps, SortDirection } from '../../types';
import { useDataTableContext } from '../../DataTableContext';
import { buildComponentClasses, buildStyles, createMemoComparison } from '../../utils/componentUtils';

/**
 * DataTableHeaderCell - Table header cell component with sorting capabilities
 * 
 * ARCHITECTURAL DECISION: This component encapsulates all header cell logic including
 * sorting, resizing, and accessibility. By keeping this logic in the header cell
 * component rather than the parent, we achieve better separation of concerns and
 * make the component more reusable.
 * 
 * PERFORMANCE OPTIMIZATION: The component uses React.memo with custom comparison
 * to prevent re-renders when only unrelated context values change. The sort handler
 * is memoized using useCallback to prevent child components from re-rendering.
 * 
 * ACCESSIBILITY: Implements proper ARIA attributes for sortable columns including
 * aria-sort, aria-label, and keyboard navigation support.
 */
const DataTableHeaderCell = memo<DataTableHeaderCellProps>(
  (props) => {
    const {
      column,
      sortable,
      sortDirection = 'none',
      align,
      resizable = false,
      sticky = false,
      onSort,
      onResize,
      className,
      children,
      ...rest
    } = props;

    const context = useDataTableContext();
    const { sortConfig, sortable: contextSortable } = context;

    // Determine if this column is sortable
    const isSortable = sortable ?? (column?.sortable ?? contextSortable);
    
    // Get current sort state for this column
    const currentSortDirection = React.useMemo((): SortDirection => {
      if (!isSortable || !column) return 'none';
      
      if (sortConfig?.column === column.key) {
        return sortConfig.direction;
      }
      
      return 'none';
    }, [isSortable, column, sortConfig]);

    // Memoized sort handler to prevent unnecessary re-renders
    const handleSort = useCallback(() => {
      if (!isSortable || !column || !onSort) return;
      
      onSort(column.key);
    }, [isSortable, column, onSort]);

    // Memoized resize handler
    const handleResize = useCallback((event: React.MouseEvent) => {
      if (!resizable || !column || !onResize) return;
      
      event.preventDefault();
      event.stopPropagation();
      
      // Calculate new width based on mouse position
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
      const newWidth = event.clientX - rect.left;
      
      onResize(column.key, newWidth);
    }, [resizable, column, onResize]);

    // Build header cell classes using centralized utility
    const headerClasses = buildComponentClasses(
      'data-table-header-cell',
      {
        'data-table-header-cell-sortable': isSortable,
        'data-table-header-cell-sorted': currentSortDirection !== 'none',
        'data-table-header-cell-sort-asc': currentSortDirection === 'asc',
        'data-table-header-cell-sort-desc': currentSortDirection === 'desc',
        'data-table-header-cell-resizable': resizable,
        'data-table-header-cell-sticky': sticky,
        'data-table-header-cell-align-start': (align || column?.align) === 'start',
        'data-table-header-cell-align-center': (align || column?.align) === 'center',
        'data-table-header-cell-align-end': (align || column?.align) === 'end',
      },
      column?.headerClassName || className
    );

    // Build cell styles using centralized utility
    const cellStyles = React.useMemo(() => {
      const styles: React.CSSProperties = {};
      
      if (column?.width) {
        if (typeof column.width === 'number') {
          styles.width = `${column.width}px`;
        } else if (column.width === 'grow') {
          styles.flex = '1 1 0%';
        } else {
          styles.width = column.width;
        }
      }
      
      if (column?.minWidth) {
        styles.minWidth = typeof column.minWidth === 'number' 
          ? `${column.minWidth}px` 
          : column.minWidth;
      }
      
      if (column?.maxWidth) {
        styles.maxWidth = typeof column.maxWidth === 'number' 
          ? `${column.maxWidth}px` 
          : column.maxWidth;
      }
      
      if (sticky) {
        styles.position = 'sticky';
        styles.zIndex = 2;
      }
      
      return buildStyles(styles);
    }, [column?.width, column?.minWidth, column?.maxWidth, sticky]);

    // Render header content
    const headerContent = React.useMemo(() => {
      if (children !== undefined) {
        return children;
      }
      
      if (column?.header) {
        if (typeof column.header === 'function') {
          return column.header(column);
        }
        return column.header;
      }
      
      return column?.key || '';
    }, [children, column]);

    // Sort indicator component
    const SortIndicator = memo(() => {
      if (!isSortable) return null;
      
      return (
        <span 
          className="data-table-sort-indicator"
          aria-hidden="true"
        >
          {currentSortDirection === 'asc' && '↑'}
          {currentSortDirection === 'desc' && '↓'}
          {currentSortDirection === 'none' && '↕'}
        </span>
      );
    });

    return (
      <th
        className={headerClasses}
        style={cellStyles}
        role="columnheader"
        aria-sort={
          isSortable 
            ? currentSortDirection === 'asc' 
              ? 'ascending' 
              : currentSortDirection === 'desc' 
                ? 'descending' 
                : 'none'
            : undefined
        }
        aria-label={
          isSortable 
            ? `Sort by ${column?.key || 'column'}` 
            : undefined
        }
        tabIndex={isSortable ? 0 : undefined}
        onClick={isSortable ? handleSort : undefined}
        onKeyDown={
          isSortable 
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSort();
                }
              }
            : undefined
        }
        data-column-key={column?.key}
        data-sortable={isSortable}
        data-sort-direction={currentSortDirection}
        {...rest}
      >
        <div className="data-table-header-content">
          {headerContent}
          <SortIndicator />
        </div>
        
        {resizable && (
          <div
            className="data-table-resize-handle"
            onMouseDown={handleResize}
            role="separator"
            aria-label={`Resize ${column?.key || 'column'}`}
            tabIndex={0}
          />
        )}
      </th>
    );
  },
  createMemoComparison([
    'column',
    'sortable',
    'sortDirection',
    'align',
    'resizable',
    'sticky',
    'className',
    'children',
    'onSort',
    'onResize'
  ])
);

DataTableHeaderCell.displayName = 'DataTableHeaderCell';

export default DataTableHeaderCell;
