import React from 'react';
import { DataTableActionsProps } from '../../types';
import cn, { createDataTableClasses } from '../../utils/classNames';

/**
 * DataTableActions - Actions component for DataTable header
 *
 * Provides a container for action buttons and controls in the table header.
 * Supports different layouts and alignments for various use cases.
 *
 * @example
 * ```tsx
 * <DataTable.Actions direction="horizontal" align="end">
 *   <Button variant="invisible">Export</Button>
 *   <Button variant="primary">Add Item</Button>
 * </DataTable.Actions>
 * ```
 */
const DataTableActions = React.forwardRef<
  HTMLDivElement,
  DataTableActionsProps
>((props, ref) => {
  const {
    children,
    className,
    direction = 'horizontal',
    spacing = 'normal',
    align = 'end',
    wrap = false,
    sticky = false,
    hidden = false,
    ...rest
  } = props;

  if (hidden) {
    return null;
  }

  const actionsClasses = createDataTableClasses('actions', {
    custom: className,
  });

  const directionClasses = {
    horizontal: 'data-table-actions-horizontal',
    vertical: 'data-table-actions-vertical',
  };

  const alignClasses = {
    start: 'data-table-actions-start',
    center: 'data-table-actions-center',
    end: 'data-table-actions-end',
  };

  const spacingClasses = {
    tight: 'gap-2',
    normal: 'gap-3',
    loose: 'gap-4',
  };

  const wrapClasses = wrap ? 'flex-wrap' : 'flex-nowrap';
  const stickyClasses = sticky ? 'data-table-sticky-header' : '';

  return (
    <div
      ref={ref}
      className={cn(
        actionsClasses,
        directionClasses[direction],
        alignClasses[align],
        spacingClasses[spacing],
        wrapClasses,
        stickyClasses
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

DataTableActions.displayName = 'DataTableActions';

export default DataTableActions;
