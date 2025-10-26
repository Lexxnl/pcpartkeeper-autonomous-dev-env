// ============================================================================
// DEBOUNCE HOOK
// ============================================================================

import { useState, useEffect } from 'react';

/**
 * Custom hook for debouncing values
 * 
 * Prevents expensive operations from running on every change by delaying execution
 * until the user has stopped typing/changing the value.
 * 
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default: 300ms)
 * @returns The debounced value
 * 
 * @example
 * ```typescript
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearch = useDebounce(searchTerm, 500);
 * 
 * useEffect(() => {
 *   // API call with debounced value
 *   fetchResults(debouncedSearch);
 * }, [debouncedSearch]);
 * ```
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook for debouncing callback functions
 * 
 * Useful for debouncing event handlers like onChange or onSearch.
 * Returns a debounced version of the callback function.
 * 
 * @param callback - The callback function to debounce
 * @param delay - The delay in milliseconds
 * @returns The debounced callback function
 * 
 * @example
 * ```typescript
 * const handleSearch = useDebouncedCallback((term: string) => {
 *   performSearch(term);
 * }, 300);
 * 
 * <input onChange={(e) => handleSearch(e.target.value)} />
 * ```
 */
export function useDebouncedCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
): T {
  const [debouncedCallback] = useState(() => {
    let timeoutId: NodeJS.Timeout;
    
    return ((...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => callback(...args), delay);
    }) as T;
  });

  return debouncedCallback;
}
