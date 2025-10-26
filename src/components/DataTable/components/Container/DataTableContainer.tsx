import React from 'react';
import { DataTableContainerProps } from '../../types';
import cn, { createDataTableClasses } from '../../utils/classNames';

/**
 * DataTableContainer - Container component for DataTable
 *
 * Provides a wrapper with consistent styling and layout for the DataTable component.
 * Supports different variants and sizes for various use cases.
 *
 * @example
 * ```tsx
 * <DataTable.Container variant="bordered" size="lg">
 *   <DataTable data={items} columns={columns} />
 * </DataTable.Container>
 * ```
 */
const DataTableContainer = React.forwardRef<
  HTMLDivElement,
  DataTableContainerProps
>((props, ref) => {
  const {
    children,
    className,
    variant = 'default',
    size = 'md',
    scrollable = true,
    maxHeight,
    hidden = false,
    ...rest
  } = props;

  if (hidden) {
    return null;
  }

  const containerClasses = createDataTableClasses('container', {
    variant,
    custom: className,
  });

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const scrollableClasses = scrollable ? 'data-table-responsive' : '';

  const style = maxHeight
    ? {
        maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
      }
    : undefined;

  return (
    <div
      ref={ref}
      className={cn(containerClasses, sizeClasses[size], scrollableClasses)}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
});

DataTableContainer.displayName = 'DataTableContainer';

export default DataTableContainer;
