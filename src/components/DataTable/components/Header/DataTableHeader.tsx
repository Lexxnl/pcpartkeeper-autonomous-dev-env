import React, { memo, forwardRef } from 'react';
import { DataTableHeaderProps } from '../../types';
import { createDataTableClasses } from '../../utils/classNames';

/**
 * DataTableHeader - Modular header component with memoization
 * 
 * ARCHITECTURAL BENEFITS:
 * - Separated header concerns from main table component
 * - Clean, focused responsibility for header rendering
 * - Consistent memoization for performance optimization
 * - Reusable across different table configurations
 * 
 * PERFORMANCE OPTIMIZATIONS:
 * - React.memo() prevents unnecessary re-renders
 * - forwardRef for proper ref handling
 * - Memoized class generation
 * 
 * DESIGN DECISIONS:
 * - Why separate header? Headers often have different styling and behavior
 * - Why memo? Headers rarely change, perfect for memoization
 * - Why forwardRef? Allows parent components to access header DOM
 */
const DataTableHeader = memo(
  forwardRef<HTMLDivElement, DataTableHeaderProps>(
    (
      {
        children,
        className,
        variant = 'default',
        sticky = false,
        border = true,
        renderThead = true,
        ...rest
      },
      ref
    ) => {
      // Generate header classes with proper variant handling
      const headerClasses = createDataTableClasses('header', {
        variant,
        sticky,
        border,
        custom: className,
      });

      // Note: renderThead is used for internal logic but not passed to DOM
      // This prevents React warnings about unrecognized DOM attributes

      return (
        <div
          ref={ref}
          className={headerClasses}
          role="banner"
          {...rest}
        >
          {children}
        </div>
      );
    }
  )
);

DataTableHeader.displayName = 'DataTableHeader';

export default DataTableHeader;