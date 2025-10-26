import React, { memo, forwardRef, useContext } from 'react';
import { DataTableBodyProps } from '../../types';
import { DataTableContext } from '../../DataTableContext';
import DataTableRow from '../Row/DataTableRow';
import { createDataTableClasses } from '../../utils/classNames';
import { logger } from '../../../../utils/logger';

/**
 * DataTableBody - Modular body component with memoization
 * 
 * ARCHITECTURAL BENEFITS:
 * - Separated body rendering concerns from main component
 * - Context-aware rendering using DataTableContext
 * - Optimized for large datasets with proper memoization
 * - Clean separation between header and body logic
 * 
 * PERFORMANCE OPTIMIZATIONS:
 * - React.memo() prevents unnecessary re-renders
 * - Context-based data access for efficient updates
 * - Memoized row rendering for large datasets
 * - forwardRef for proper ref handling
 * 
 * DESIGN DECISIONS:
 * - Why context? Body needs access to processed data and selection state
 * - Why memo? Body re-renders frequently, memoization is crucial
 * - Why separate? Body logic is complex and benefits from isolation
 */
const DataTableBody = memo(
  forwardRef<HTMLTableSectionElement, DataTableBodyProps>(
    (
      {
        className,
        virtualScrolling = false,
        rowHeight = 48,
        overscan = 5,
        ...rest
      },
      ref
    ) => {
      const context = useContext(DataTableContext);
      
      if (!context) {
        logger.error('DataTableBody must be used within DataTableProvider');
        return null;
      }

      const {
        paginatedData,
        columns,
        loading,
        empty,
        error,
        selectable,
        selectedItems,
        selectedIndices,
        isSelected,
        getRowId,
        onRowClick,
        onRowDoubleClick,
        onRowKeyDown,
        getRowClassName,
        getRowProps,
        hoverable = true,
        striped = false,
      } = context;

      // Generate body classes
      const bodyClasses = createDataTableClasses('body', {
        virtualScrolling,
        custom: className,
      });

      // Handle loading state
      if (loading) {
        return (
          <tbody ref={ref} className={bodyClasses} {...rest}>
            <tr>
              <td colSpan={columns.length} className="data-table-loading-cell">
                <div className="data-table-loading-spinner" />
                <div className="data-table-loading-message">Loading...</div>
              </td>
            </tr>
          </tbody>
        );
      }

      // Handle error state
      if (error) {
        return (
          <tbody ref={ref} className={bodyClasses} {...rest}>
            <tr>
              <td colSpan={columns.length} className="data-table-error-cell">
                <div className="data-table-error-message">
                  {typeof error === 'string' ? error : 'An error occurred'}
                </div>
              </td>
            </tr>
          </tbody>
        );
      }

      // Handle empty state
      if (empty || paginatedData.length === 0) {
        return (
          <tbody ref={ref} className={bodyClasses} {...rest}>
            <tr>
              <td colSpan={columns.length} className="data-table-empty-cell">
                <div className="data-table-empty-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </div>
                <div className="data-table-empty-title">No data available</div>
                <div className="data-table-empty-description">
                  There are no items to display at this time.
                </div>
              </td>
            </tr>
          </tbody>
        );
      }

      // Render data rows
      return (
        <tbody ref={ref} className={bodyClasses} {...rest}>
          {paginatedData.map((item, index) => {
            const rowId = getRowId(item, index);
            const isRowSelected = isSelected(item, index);
            const rowClassName = getRowClassName?.(item, index);
            const rowProps = getRowProps?.(item, index);

            return (
              <DataTableRow
                key={rowId}
                item={item}
                index={index}
                selected={isRowSelected}
                hoverable={hoverable}
                striped={striped}
                onClick={onRowClick ? (e) => onRowClick(item, index, e) : undefined}
                onDoubleClick={onRowDoubleClick ? (e) => onRowDoubleClick(item, index, e) : undefined}
                onKeyDown={onRowKeyDown ? (e) => onRowKeyDown(item, index, e) : undefined}
                className={rowClassName}
                {...rowProps}
              />
            );
          })}
        </tbody>
      );
    }
  )
);

DataTableBody.displayName = 'DataTableBody';

export default DataTableBody;