import React from 'react';
import { DataTableSubtitleProps } from '../../types';
import cn, { createDataTableClasses } from '../../utils/classNames';

/**
 * DataTableSubtitle - Subtitle component for DataTable header
 *
 * Displays a subtitle or description for the data table with consistent typography.
 * Supports different variants and sizes for various use cases.
 *
 * @example
 * ```tsx
 * <DataTable.Subtitle variant="muted" size="md">
 *   Manage your computer components and inventory
 * </DataTable.Subtitle>
 * ```
 */
const DataTableSubtitle = React.forwardRef<
  HTMLDivElement,
  DataTableSubtitleProps
>((props, ref) => {
  const {
    children,
    className,
    variant = 'default',
    size = 'md',
    hidden = false,
    ...rest
  } = props;

  if (hidden) {
    return null;
  }

  const subtitleClasses = createDataTableClasses('subtitle', {
    variant,
    custom: className,
  });

  const variantClasses = {
    default: 'data-table-subtitle',
    muted: 'data-table-subtitle-muted',
    subtle: 'data-table-subtitle-subtle',
  };

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div
      ref={ref}
      className={cn(
        subtitleClasses,
        variantClasses[variant],
        sizeClasses[size]
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

DataTableSubtitle.displayName = 'DataTableSubtitle';

export default DataTableSubtitle;
