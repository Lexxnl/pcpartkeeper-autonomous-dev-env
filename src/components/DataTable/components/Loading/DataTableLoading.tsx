import React from 'react';
import { DataTableLoadingProps } from '../../types';
import cn, { createDataTableClasses } from '../../utils/classNames';
import LoadingIndicator from '../../../LoadingIndicator';

/**
 * DataTableLoading - Loading component for DataTable
 *
 * Renders loading indicators while data is being fetched.
 * Supports different loading animations and sizes.
 *
 * @example
 * ```tsx
 * <DataTable.Loading
 *   message="Loading data..."
 *   variant="spinner"
 *   size="lg"
 * />
 * ```
 */
const DataTableLoading = React.forwardRef<
  HTMLDivElement,
  DataTableLoadingProps
>((props, ref) => {
  const {
    message = 'Loading...',
    variant = 'spinner',
    size = 'md',
    ...rest
  } = props;

  // Standardize to use LoadingIndicator
  return (
    <div ref={ref} {...rest}>
      <LoadingIndicator 
        text={message} 
        size={size as any} // Map sizes if needed
        className="data-table-loading"
      />
    </div>
  );
});

DataTableLoading.displayName = 'DataTableLoading';

export default DataTableLoading;
