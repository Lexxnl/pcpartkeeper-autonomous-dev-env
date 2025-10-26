import React, { memo, forwardRef, useContext } from 'react';
import { DataTablePaginationProps } from '../../types';
import { DataTableContext } from '../../DataTableContext';
import { createDataTableClasses } from '../../utils/classNames';
import { logger } from '../../../../utils/logger';

/**
 * DataTablePagination - Modular pagination component with memoization
 * 
 * ARCHITECTURAL BENEFITS:
 * - Separated pagination concerns from main table component
 * - Context-aware pagination using DataTableContext
 * - Clean, focused responsibility for pagination rendering
 * - Reusable across different table configurations
 * 
 * PERFORMANCE OPTIMIZATIONS:
 * - React.memo() prevents unnecessary re-renders
 * - Context-based pagination state access
 * - Memoized pagination calculations
 * - forwardRef for proper ref handling
 * 
 * DESIGN DECISIONS:
 * - Why context? Pagination needs access to pagination config and handlers
 * - Why memo? Pagination state changes infrequently, perfect for memoization
 * - Why separate? Pagination logic is complex and benefits from isolation
 */
const DataTablePagination = memo(
  forwardRef<HTMLDivElement, DataTablePaginationProps>(
    (
      {
        className,
        showPageSizeSelector = true,
        showPageInfo = true,
        showPageNumbers = true,
        variant = 'default',
        align = 'between',
        ...rest
      },
      ref
    ) => {
      const context = useContext(DataTableContext);
      
      if (!context) {
        logger.error('DataTablePagination must be used within DataTableProvider');
        return null;
      }

      const {
        paginationConfig,
        onPageChange,
        onPageSizeChange,
      } = context;

      // Don't render if no pagination config
      if (!paginationConfig) {
        return null;
      }

      const {
        currentPage,
        pageSize,
        totalItems,
        pageSizeOptions = [10, 25, 50, 100],
      } = paginationConfig;

      // Calculate pagination metadata
      const totalPages = Math.ceil(totalItems / pageSize);
      const startItem = (currentPage - 1) * pageSize + 1;
      const endItem = Math.min(currentPage * pageSize, totalItems);

      // Generate pagination classes
      const paginationClasses = createDataTableClasses('pagination', {
        variant,
        align,
        custom: className,
      });

      // Handle page change
      const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
          onPageChange?.(page);
        }
      };

      // Handle page size change
      const handlePageSizeChange = (newPageSize: number) => {
        if (newPageSize !== pageSize) {
          onPageSizeChange?.(newPageSize);
        }
      };

      // Generate page numbers
      const generatePageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisiblePages = 5;
        
        if (totalPages <= maxVisiblePages) {
          // Show all pages if total is small
          for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          // Show first page
          pages.push(1);
          
          if (currentPage > 3) {
            pages.push('...');
          }
          
          // Show pages around current page
          const start = Math.max(2, currentPage - 1);
          const end = Math.min(totalPages - 1, currentPage + 1);
          
          for (let i = start; i <= end; i++) {
            pages.push(i);
          }
          
          if (currentPage < totalPages - 2) {
            pages.push('...');
          }
          
          // Show last page
          if (totalPages > 1) {
            pages.push(totalPages);
          }
        }
        
        return pages;
      };

      const pageNumbers = generatePageNumbers();

      return (
        <div
          ref={ref}
          className={paginationClasses}
          role="navigation"
          aria-label="Table pagination"
          {...rest}
        >
          {/* Page Info */}
          {showPageInfo && (
            <div className="data-table-pagination-info">
              Showing {startItem}-{endItem} of {totalItems} items
            </div>
          )}

          {/* Page Size Selector */}
          {showPageSizeSelector && (
            <div className="data-table-pagination-size">
              <label htmlFor="page-size-select" className="data-table-pagination-size-label">
                Show:
              </label>
              <select
                id="page-size-select"
                value={pageSize}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                className="data-table-pagination-size-select"
                aria-label="Items per page"
              >
                {pageSizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Page Navigation */}
          <div className="data-table-pagination-nav">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="data-table-pagination-button data-table-pagination-button-prev"
              aria-label="Previous page"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Page Numbers */}
            {showPageNumbers && (
              <div className="data-table-pagination-numbers">
                {pageNumbers.map((page, index) => (
                  <React.Fragment key={index}>
                    {typeof page === 'number' ? (
                      <button
                        onClick={() => handlePageChange(page)}
                        className={`data-table-pagination-button data-table-pagination-button-number ${
                          page === currentPage ? 'data-table-pagination-button-active' : ''
                        }`}
                        aria-label={`Go to page ${page}`}
                        aria-current={page === currentPage ? 'page' : undefined}
                      >
                        {page}
                      </button>
                    ) : (
                      <span className="data-table-pagination-ellipsis" aria-hidden="true">
                        {page}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="data-table-pagination-button data-table-pagination-button-next"
              aria-label="Next page"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      );
    }
  )
);

DataTablePagination.displayName = 'DataTablePagination';

export default DataTablePagination;