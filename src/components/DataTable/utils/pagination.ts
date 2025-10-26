// ============================================================================
// PAGINATION UTILITIES
// ============================================================================

import { PaginationConfig } from '../types';
import { DEFAULT_PAGINATION, VALIDATION_RULES } from '../constants';

// ============================================================================
// PAGINATION FUNCTIONS
// ============================================================================

/**
 * Paginates data based on pagination configuration
 */
function paginateData<T>(data: T[], config: PaginationConfig): T[] {
  const { pageSize, currentPage } = config;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return data.slice(startIndex, endIndex);
}

/**
 * Calculates pagination metadata
 */
function calculatePaginationMetadata(config: PaginationConfig): {
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startIndex: number;
  endIndex: number;
  startItem: number;
  endItem: number;
} {
  const { pageSize, currentPage, totalItems } = config;

  const totalPages = Math.ceil(totalItems / pageSize);
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const startItem = totalItems > 0 ? startIndex + 1 : 0;
  const endItem = endIndex;

  return {
    totalPages,
    hasNextPage,
    hasPreviousPage,
    startIndex,
    endIndex,
    startItem,
    endItem,
  };
}

// ============================================================================
// PAGINATION CONFIGURATION
// ============================================================================

/**
 * Creates a new pagination configuration
 */
function createPaginationConfig(
  totalItems: number,
  pageSize: number = DEFAULT_PAGINATION.pageSize,
  currentPage: number = DEFAULT_PAGINATION.currentPage
): PaginationConfig {
  return {
    pageSize: Math.max(1, Math.min(pageSize, VALIDATION_RULES.maxPageSize)),
    currentPage: Math.max(1, currentPage),
    totalItems: Math.max(0, totalItems),
    showPageSizeSelector: DEFAULT_PAGINATION.showPageSizeSelector,
    pageSizeOptions: DEFAULT_PAGINATION.pageSizeOptions,
  };
}

/**
 * Updates pagination configuration
 */
function updatePaginationConfig(
  config: PaginationConfig,
  updates: Partial<PaginationConfig>
): PaginationConfig {
  const newConfig = { ...config, ...updates };

  // Ensure current page is within bounds
  const maxPage = Math.ceil(newConfig.totalItems / newConfig.pageSize);
  if (newConfig.currentPage > maxPage && maxPage > 0) {
    newConfig.currentPage = maxPage;
  }

  return newConfig;
}

/**
 * Resets pagination to first page
 */
function resetPagination(config: PaginationConfig): PaginationConfig {
  return {
    ...config,
    currentPage: 1,
  };
}

// ============================================================================
// PAGE NAVIGATION
// ============================================================================

/**
 * Goes to the next page
 */
function goToNextPage(config: PaginationConfig): PaginationConfig {
  const metadata = calculatePaginationMetadata(config);

  if (metadata.hasNextPage) {
    return {
      ...config,
      currentPage: config.currentPage + 1,
    };
  }

  return config;
}

/**
 * Goes to the previous page
 */
function goToPreviousPage(config: PaginationConfig): PaginationConfig {
  const metadata = calculatePaginationMetadata(config);

  if (metadata.hasPreviousPage) {
    return {
      ...config,
      currentPage: config.currentPage - 1,
    };
  }

  return config;
}

/**
 * Goes to a specific page
 */
function goToPage(config: PaginationConfig, page: number): PaginationConfig {
  const metadata = calculatePaginationMetadata(config);
  const targetPage = Math.max(1, Math.min(page, metadata.totalPages));

  return {
    ...config,
    currentPage: targetPage,
  };
}

/**
 * Goes to the first page
 */
function goToFirstPage(config: PaginationConfig): PaginationConfig {
  return {
    ...config,
    currentPage: 1,
  };
}

/**
 * Goes to the last page
 */
function goToLastPage(config: PaginationConfig): PaginationConfig {
  const metadata = calculatePaginationMetadata(config);

  return {
    ...config,
    currentPage: metadata.totalPages || 1,
  };
}

// ============================================================================
// PAGE SIZE MANAGEMENT
// ============================================================================

/**
 * Changes the page size
 */
function changePageSize(
  config: PaginationConfig,
  newPageSize: number
): PaginationConfig {
  const validPageSize = Math.max(
    1,
    Math.min(newPageSize, VALIDATION_RULES.maxPageSize)
  );

  // Calculate new current page to maintain relative position
  const startIndex = (config.currentPage - 1) * config.pageSize;
  const newCurrentPage = Math.ceil((startIndex + 1) / validPageSize);

  return {
    ...config,
    pageSize: validPageSize,
    currentPage: Math.max(1, newCurrentPage),
  };
}

/**
 * Gets available page sizes
 */
function getAvailablePageSizes(config: PaginationConfig): number[] {
  return config.pageSizeOptions || DEFAULT_PAGINATION.pageSizeOptions;
}

// ============================================================================
// PAGE NUMBER GENERATION
// ============================================================================

/**
 * Generates page numbers for pagination display
 */
function generatePageNumbers(
  config: PaginationConfig,
  maxVisiblePages: number = 7
): Array<number | 'ellipsis'> {
  const metadata = calculatePaginationMetadata(config);
  const { currentPage, totalPages } = metadata;

  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: Array<number | 'ellipsis'> = [];
  const halfVisible = Math.floor(maxVisiblePages / 2);

  // Always show first page
  pages.push(1);

  if (currentPage > halfVisible + 2) {
    pages.push('ellipsis');
  }

  // Show pages around current page
  const start = Math.max(2, currentPage - halfVisible);
  const end = Math.min(totalPages - 1, currentPage + halfVisible);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - halfVisible - 1) {
    pages.push('ellipsis');
  }

  // Always show last page (if more than 1 page)
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
}

/**
 * Generates page numbers with smart ellipsis
 */
function generateSmartPageNumbers(
  config: PaginationConfig,
  maxVisiblePages: number = 7
): Array<number | 'ellipsis'> {
  const metadata = calculatePaginationMetadata(config);
  const { currentPage, totalPages } = metadata;

  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: Array<number | 'ellipsis'> = [];
  const halfVisible = Math.floor(maxVisiblePages / 2);

  // Calculate the range of pages to show
  let start = Math.max(1, currentPage - halfVisible);
  let end = Math.min(totalPages, currentPage + halfVisible);

  // Adjust if we're near the beginning or end
  if (currentPage <= halfVisible) {
    end = Math.min(totalPages, maxVisiblePages);
  }
  if (currentPage > totalPages - halfVisible) {
    start = Math.max(1, totalPages - maxVisiblePages + 1);
  }

  // Add first page and ellipsis if needed
  if (start > 1) {
    pages.push(1);
    if (start > 2) {
      pages.push('ellipsis');
    }
  }

  // Add the range of pages
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  // Add ellipsis and last page if needed
  if (end < totalPages) {
    if (end < totalPages - 1) {
      pages.push('ellipsis');
    }
    pages.push(totalPages);
  }

  return pages;
}

// ============================================================================
// PAGINATION VALIDATION
// ============================================================================

/**
 * Validates pagination configuration
 */
function validatePaginationConfig(config: PaginationConfig): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (config.pageSize < VALIDATION_RULES.minPageSize) {
    errors.push(`Page size must be at least ${VALIDATION_RULES.minPageSize}`);
  }

  if (config.pageSize > VALIDATION_RULES.maxPageSize) {
    errors.push(`Page size must be at most ${VALIDATION_RULES.maxPageSize}`);
  }

  if (config.currentPage < VALIDATION_RULES.minPage) {
    errors.push(`Current page must be at least ${VALIDATION_RULES.minPage}`);
  }

  const maxPage = Math.ceil(config.totalItems / config.pageSize);
  if (config.currentPage > maxPage && maxPage > 0) {
    errors.push(`Current page must be at most ${maxPage}`);
  }

  if (config.totalItems < 0) {
    errors.push('Total items must be non-negative');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// ============================================================================
// PAGINATION HELPERS
// ============================================================================

/**
 * Gets pagination summary text
 */
function getPaginationSummary(config: PaginationConfig): string {
  const metadata = calculatePaginationMetadata(config);
  const { startItem, endItem, totalItems } = metadata;

  if (totalItems === 0) {
    return 'No items';
  }

  return `Showing ${startItem} through ${endItem} of ${totalItems}`;
}

/**
 * Gets pagination summary with page info
 */
function getPaginationSummaryWithPages(config: PaginationConfig): string {
  const metadata = calculatePaginationMetadata(config);
  const { startItem, endItem, totalItems, totalPages, currentPage } = metadata;

  if (totalItems === 0) {
    return 'No items';
  }

  return `Showing ${startItem} through ${endItem} of ${totalItems} (Page ${currentPage} of ${totalPages})`;
}

/**
 * Checks if pagination is needed
 */
function isPaginationNeeded(config: PaginationConfig): boolean {
  return config.totalItems > config.pageSize;
}

/**
 * Gets the total number of pages
 */
function getTotalPages(config: PaginationConfig): number {
  return Math.ceil(config.totalItems / config.pageSize);
}

// ============================================================================
// PAGINATION PRESETS
// ============================================================================

export const PAGINATION_PRESETS = {
  small: { pageSize: 10, maxVisiblePages: 5 },
  medium: { pageSize: 25, maxVisiblePages: 7 },
  large: { pageSize: 50, maxVisiblePages: 9 },
  xlarge: { pageSize: 100, maxVisiblePages: 11 },
} as const;

/**
 * Creates pagination config from preset
 */
function createPaginationFromPreset(
  preset: keyof typeof PAGINATION_PRESETS,
  totalItems: number,
  currentPage: number = 1
): PaginationConfig {
  const { pageSize } = PAGINATION_PRESETS[preset];
  return createPaginationConfig(totalItems, pageSize, currentPage);
}

// ============================================================================
// PERFORMANCE OPTIMIZATIONS
// ============================================================================

/**
 * Memoized pagination function for better performance
 */
function createMemoizedPagination<T>() {
  const paginationCache = new Map<string, T[]>();

  return function (data: T[], config: PaginationConfig): T[] {
    const cacheKey = `${config.pageSize}-${config.currentPage}`;

    if (paginationCache.has(cacheKey)) {
      return paginationCache.get(cacheKey)!;
    }

    const paginatedData = paginateData(data, config);
    paginationCache.set(cacheKey, paginatedData);

    return paginatedData;
  };
}

/**
 * Clears the pagination cache
 */
function clearPaginationCache<T>(
  memoizedPagination: ReturnType<typeof createMemoizedPagination<T>>
): void {
  // This would need to be implemented based on the cache structure
  // For now, we'll just return the function as-is
}

// ============================================================================
// EXPORT ALL PAGINATION UTILITIES
// ============================================================================

export {
  paginateData,
  calculatePaginationMetadata,
  createPaginationConfig,
  updatePaginationConfig,
  resetPagination,
  goToNextPage,
  goToPreviousPage,
  goToPage,
  goToFirstPage,
  goToLastPage,
  changePageSize,
  getAvailablePageSizes,
  generatePageNumbers,
  generateSmartPageNumbers,
  validatePaginationConfig,
  getPaginationSummary,
  getPaginationSummaryWithPages,
  isPaginationNeeded,
  getTotalPages,
  createPaginationFromPreset,
  createMemoizedPagination,
  clearPaginationCache,
};
