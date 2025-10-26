import React from 'react';
import { DataTableBulkActionsProps } from '../../types';
import cn, { createDataTableClasses } from '../../utils/classNames';

/**
 * DataTableBulkActions - Bulk actions component for DataTable
 *
 * Renders action buttons for multiple selected items.
 * Supports different layouts and positioning.
 *
 * @example
 * ```tsx
 * <DataTable.BulkActions
 *   selectedItems={selectedItems}
 *   selectedIndices={selectedIndices}
 *   actions={[
 *     { key: 'delete', label: 'Delete Selected', variant: 'danger', onClick: handleBulkDelete }
 *   ]}
 * />
 * ```
 */
const DataTableBulkActions = React.forwardRef<
  HTMLDivElement,
  DataTableBulkActionsProps<any>
>((props, ref) => {
  const {
    selectedItems,
    selectedIndices,
    actions = [],
    variant = 'inline',
    align = 'start',
    className,
    hidden = false,
    ...rest
  } = props;

  if (hidden || selectedItems.length === 0 || actions.length === 0) {
    return null;
  }

  const bulkActionsClasses = createDataTableClasses('bulkActions', {
    custom: className,
  });

  const variantClasses = {
    dropdown: 'data-table-bulk-actions-dropdown',
    inline: 'data-table-bulk-actions-inline',
    floating: 'data-table-bulk-actions-floating',
  };

  const alignClasses = {
    start: 'data-table-bulk-actions-start',
    center: 'data-table-bulk-actions-center',
    end: 'data-table-bulk-actions-end',
  };

  const visibleActions = actions.filter(action => !action.hidden);

  if (visibleActions.length === 0) {
    return null;
  }

  const renderAction = (action: (typeof actions)[0]) => {
    const baseClasses =
      'px-4 py-2 text-sm rounded transition-colors duration-150';
    const variantClasses = {
      default: 'bg-surface-tertiary text-text-primary hover:bg-surface-hover',
      danger:
        'bg-action-danger-muted text-action-danger hover:bg-action-danger-hover',
      primary: 'bg-action-primary text-white hover:bg-action-primary-hover',
    };

    return (
      <button
        key={action.key}
        onClick={() => action.onClick(selectedItems, selectedIndices)}
        disabled={action.disabled}
        className={cn(
          baseClasses,
          variantClasses[action.variant || 'default'],
          action.disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        {action.icon && <span className='mr-2'>{action.icon}</span>}
        {action.label}
      </button>
    );
  };

  return (
    <div
      ref={ref}
      className={cn(
        bulkActionsClasses,
        variantClasses[variant],
        alignClasses[align]
      )}
      {...rest}
    >
      <div className='text-sm text-text-muted'>
        {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''}{' '}
        selected
      </div>
      <div className='flex gap-2'>{visibleActions.map(renderAction)}</div>
    </div>
  );
});

DataTableBulkActions.displayName = 'DataTableBulkActions';

export default DataTableBulkActions;
