import React from 'react';
import { DataTableRowActionsProps } from '../../types';
import cn, { createDataTableClasses } from '../../utils/classNames';

/**
 * DataTableRowActions - Row actions component for DataTable
 *
 * Renders action buttons for individual table rows.
 * Supports different layouts and action types.
 *
 * @example
 * ```tsx
 * <DataTable.RowActions
 *   item={item}
 *   index={0}
 *   actions={[
 *     { key: 'edit', label: 'Edit', onClick: handleEdit },
 *     { key: 'delete', label: 'Delete', variant: 'danger', onClick: handleDelete }
 *   ]}
 * />
 * ```
 */
const DataTableRowActions = React.forwardRef<
  HTMLDivElement,
  DataTableRowActionsProps<any>
>((props, ref) => {
  const {
    item,
    index,
    actions = [],
    variant = 'inline',
    align = 'end',
    className,
    hidden = false,
    ...rest
  } = props;

  if (hidden || actions.length === 0) {
    return null;
  }

  const actionsClasses = createDataTableClasses('rowActions', {
    custom: className,
  });

  const variantClasses = {
    dropdown: 'data-table-row-actions-dropdown',
    inline: 'data-table-row-actions-inline',
    overflow: 'data-table-row-actions-overflow',
  };

  const alignClasses = {
    start: 'data-table-row-actions-start',
    center: 'data-table-row-actions-center',
    end: 'data-table-row-actions-end',
  };

  const visibleActions = actions.filter(action => !action.hidden);

  if (visibleActions.length === 0) {
    return null;
  }

  const renderAction = (action: (typeof actions)[0]) => {
    // Enhanced base classes with responsive design
    const baseClasses =
      'px-3 py-2 text-xs sm:text-sm rounded-lg transition-all duration-200 font-medium min-h-[2.5rem] sm:min-h-[2rem] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-page';
    const variantClasses = {
      default: 'bg-accent-primary text-text-primary hover:bg-accent-primary-emphasis focus:ring-accent-primary',
      danger: 'bg-action-danger text-text-primary hover:bg-action-danger-hover focus:ring-action-danger',
      primary: 'bg-action-primary text-white hover:bg-action-primary-hover focus:ring-action-primary',
    };

    return (
      <button
        key={action.key}
        onClick={() => action.onClick(item, index)}
        disabled={action.disabled}
        className={cn(
          baseClasses,
          variantClasses[action.variant || 'default'],
          action.disabled && 'opacity-50 cursor-not-allowed'
        )}
        title={action.label}
        aria-label={`${item.name || 'Item'} - ${action.label}`}
      >
        <span className='flex items-center gap-1.5 sm:gap-2'>
          {action.icon && action.icon}
          <span className='hidden sm:inline'>{action.label}</span>
        </span>
      </button>
    );
  };

  if (variant === 'dropdown' && visibleActions.length > 2) {
    // Render dropdown for many actions
    return (
      <div
        ref={ref}
        className={cn(
          actionsClasses,
          variantClasses[variant],
          alignClasses[align]
        )}
        {...rest}
      >
        <div className='relative'>
          <button className='px-2 py-1 text-sm border border-border-default rounded bg-surface-primary text-text-primary hover:bg-surface-hover'>
            ⋯
          </button>
          {/* Dropdown menu would go here */}
        </div>
      </div>
    );
  }

  // Render inline actions
  return (
    <div
      ref={ref}
      className={cn(
        actionsClasses,
        variantClasses[variant],
        alignClasses[align]
      )}
      {...rest}
    >
      {visibleActions.map(renderAction)}
    </div>
  );
});

DataTableRowActions.displayName = 'DataTableRowActions';

export default DataTableRowActions;
