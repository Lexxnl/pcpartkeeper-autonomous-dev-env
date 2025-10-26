import React, { useCallback, memo } from 'react';
import { SearchIcon } from './icons';

/**
 * SearchBar - Search input component with button
 *
 * A search input field with an integrated search button.
 * Uses semantic design tokens for consistent theming.
 *
 * @param {string} searchTerm - Current search term value
 * @param {Function} onSearchChange - Callback when search input changes
 * @param {Function} onSearch - Callback when search is executed
 */

// Type definitions
interface SearchBarProps {
  searchTerm: string; // Now required - component is fully controlled
  onSearchChange?: (value: string) => void;
  onSearch?: (value: string) => void;
}

const SearchBar = memo<SearchBarProps>(({ searchTerm, onSearchChange, onSearch }) => {

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (onSearchChange) {
      onSearchChange(value);
    }
  }, [onSearchChange]);

  const handleSearch = useCallback(() => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  }, [onSearch, searchTerm]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  return (
    <div className='relative flex w-full' role='search'>
      {/* 
        RESPONSIVE SEARCH INPUT: Mobile-first approach with proper sizing
        - Mobile: Larger touch targets (h-10) for better usability
        - Desktop: Standard height (h-9) for better space efficiency
        - Proper focus management and keyboard navigation
      */}
      <input
        type='text'
        placeholder='Search items by name or category...'
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className='flex-1 pl-4 pr-4 h-10 sm:h-9 border border-border-default rounded-l-lg rounded-r-none leading-5 bg-surface-page text-text-primary placeholder-text-placeholder focus:outline-none focus:placeholder-text-muted focus:ring-2 focus:ring-inset focus:ring-accent-primary focus:border-accent-primary text-sm sm:text-base transition-all duration-200'
        aria-label='Search inventory items'
        aria-describedby='search-help'
        role='searchbox'
        autoComplete='off'
        spellCheck='false'
      />
      
      {/* Search Button - Accessible with proper focus management */}
      <button
        onClick={handleSearch}
        className='w-10 sm:w-9 h-10 sm:h-9 bg-surface-tertiary border-t border-r border-b border-border-default rounded-l-none rounded-r-lg flex items-center justify-center hover:bg-surface-hover active:bg-surface-active focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-surface-page transition-all duration-200'
        type='button'
        aria-label='Execute search'
        title='Search inventory items'
      >
        <SearchIcon className='h-5 w-5 sm:h-4 sm:w-4 text-text-muted' aria-hidden='true' />
      </button>
      
      {/* Screen reader help text */}
      <div id='search-help' className='sr-only'>
        Search through your inventory by item name, category, brand, or description. Press Enter to search or click the search button.
      </div>
    </div>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;
