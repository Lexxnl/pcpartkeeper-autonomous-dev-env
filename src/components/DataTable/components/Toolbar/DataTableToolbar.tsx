import React, { memo, forwardRef, useContext } from 'react';
import { DataTableActionsProps } from '../../types';
import { DataTableContext } from '../../DataTableContext';
import { createDataTableClasses } from '../../utils/classNames';
import { logger } from '../../../../utils/logger';

/**
 * DataTableToolbar - Modular toolbar component with memoization
 * 
 * ARCHITECTURAL BENEFITS:
 * - Separated toolbar concerns from main table component
 * - Context-aware toolbar using DataTableContext
 * - Clean, focused responsibility for toolbar rendering
 * - Reusable across different table configurations
 * 
 * PERFORMANCE OPTIMIZATIONS:
 * - React.memo() prevents unnecessary re-renders
 * - Context-based state access for efficient updates
 * - Memoized toolbar calculations
 * - forwardRef for proper ref handling
 * 
 * DESIGN DECISIONS:
 * - Why context? Toolbar needs access to selection state and actions
 * - Why memo? Toolbar state changes infrequently, perfect for memoization
 * - Why separate? Toolbar logic is complex and benefits from isolation
 */
const DataTableToolbar = memo(
  forwardRef<HTMLDivElement, DataTableActionsProps>(
    (
      {
        children,
        className,
        direction = 'horizontal',
        spacing = 'normal',
        align = 'start',
        wrap = false,
        sticky = false,
        ...rest
      },
      ref
    ) => {
      const context = useContext(DataTableContext);
      
      if (!context) {
        logger.error('DataTableToolbar must be used within DataTableProvider');
        return null;
      }

      const {
        selectedItems,
        selectedIndices,
        selectable,
        isAllSelected,
        isPartiallySelected,
        handleSelectAll,
        clearSelection,
      } = context;

      // Generate toolbar classes
      const toolbarClasses = createDataTableClasses('toolbar', {
        direction,
        spacing,
        align,
        wrap,
        sticky,
        custom: className,
      });

      // Don't render if no selection capability and no children
      if (selectable === 'none' && !children) {
        return null;
      }

      const hasSelection = selectedItems.length > 0;

      return (
        <div
          ref={ref}
          className={toolbarClasses}
          role="toolbar"
          aria-label="Table actions"
          {...rest}
        >
          {/* Selection Controls */}
          {selectable !== 'none' && (
            <div className="data-table-toolbar-selection">
              {/* Select All Checkbox */}
              <label className="data-table-toolbar-select-all">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(input) => {
                    if (input) {
                      input.indeterminate = isPartiallySelected;
                    }
                  }}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="data-table-toolbar-select-all-input"
                  aria-label="Select all items"
                />
                <span className="data-table-toolbar-select-all-label">
                  {isAllSelected ? 'Deselect All' : 'Select All'}
                </span>
              </label>

              {/* Selection Count */}
              {hasSelection && (
                <div className="data-table-toolbar-selection-count">
                  {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
                </div>
              )}

              {/* Clear Selection */}
              {hasSelection && (
                <button
                  onClick={clearSelection}
                  className="data-table-toolbar-clear-selection"
                  aria-label="Clear selection"
                >
                  Clear Selection
                </button>
              )}
            </div>
          )}

          {/* Custom Actions */}
          {children && (
            <div className="data-table-toolbar-actions">
              {children}
            </div>
          )}

          {/* Bulk Actions (if items are selected) */}
          {hasSelection && (
            <div className="data-table-toolbar-bulk-actions">
              <button
                className="data-table-toolbar-bulk-action data-table-toolbar-bulk-action-delete"
                onClick={() => {
                  // This would typically call a delete handler
                  logger.log('Delete selected items:', selectedItems);
                }}
                aria-label={`Delete ${selectedItems.length} selected items`}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete Selected
              </button>

              <button
                className="data-table-toolbar-bulk-action data-table-toolbar-bulk-action-export"
                onClick={() => {
                  // This would typically call an export handler
                  logger.log('Export selected items:', selectedItems);
                }}
                aria-label={`Export ${selectedItems.length} selected items`}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Export Selected
              </button>
            </div>
          )}
        </div>
      );
    }
  )
);

export default DataTableToolbar;