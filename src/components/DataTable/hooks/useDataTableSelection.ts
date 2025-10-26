import { useState, useCallback, useMemo, useEffect } from 'react';
import { SelectionMode } from '../types';

export interface UseDataTableSelectionOptions<T> {
  data: T[];
  selectable?: SelectionMode;
  onSelect?: (selectedItems: T[], selectedIndices: number[]) => void;
  getRowId?: (item: T, index: number) => string | number;
}

export interface UseDataTableSelectionReturn<T> {
  selectedItems: T[];
  selectedIndices: number[];
  handleSelect: (item: T, index: number, selected: boolean) => void;
  handleSelectAll: (selected: boolean) => void;
  isSelected: (item: T, index: number) => boolean;
  isAllSelected: boolean;
  isPartiallySelected: boolean;
  clearSelection: () => void;
}

/**
 * Custom hook for DataTable selection logic
 * 
 * ARCHITECTURAL BENEFITS:
 * - Encapsulates all selection state management
 * - Provides clean API for single/multiple selection modes
 * - Handles selection state synchronization
 * - Maintains consistent selection behavior
 * 
 * PERFORMANCE OPTIMIZATIONS:
 * - Memoized selection state checks
 * - Optimized selection handlers with useCallback
 * - Efficient bulk selection operations
 * - Automatic selection clearing on data changes
 */
export function useDataTableSelection<T>({
  data,
  selectable = 'none',
  onSelect,
  getRowId,
}: UseDataTableSelectionOptions<T>): UseDataTableSelectionReturn<T> {
  const [selectedItems, setSelectedItems] = useState<T[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  // Clear selection when data changes
  useEffect(() => {
    setSelectedItems([]);
    setSelectedIndices([]);
  }, [data]);

  // Handle individual item selection
  const handleSelect = useCallback(
    (item: T, index: number, selected: boolean) => {
      if (selectable === 'none') return;

      const currentIndex = selectedIndices.indexOf(index);

      if (selected) {
        if (selectable === 'single') {
          // Single selection - replace current selection
          setSelectedItems([item]);
          setSelectedIndices([index]);
        } else {
          // Multiple selection - add to current selection
          if (currentIndex === -1) {
            setSelectedItems(prev => [...prev, item]);
            setSelectedIndices(prev => [...prev, index]);
          }
        }
      } else {
        // Remove from selection
        setSelectedItems(prev => prev.filter((_, i) => i !== currentIndex));
        setSelectedIndices(prev => prev.filter(i => i !== index));
      }

      // Call external select handler if provided
      if (onSelect) {
        const newSelectedItems = selected
          ? selectable === 'single'
            ? [item]
            : [...selectedItems, item]
          : selectedItems.filter((_, i) => i !== currentIndex);

        const newSelectedIndices = selected
          ? selectable === 'single'
            ? [index]
            : [...selectedIndices, index]
          : selectedIndices.filter(i => i !== index);

        onSelect(newSelectedItems, newSelectedIndices);
      }
    },
    [selectable, selectedItems, selectedIndices, onSelect]
  );

  // Handle select all functionality
  const handleSelectAll = useCallback(
    (selected: boolean) => {
      if (selectable === 'none') return;

      if (selected) {
        setSelectedItems([...data]);
        setSelectedIndices(data.map((_, index) => index));
      } else {
        setSelectedItems([]);
        setSelectedIndices([]);
      }

      // Call external select handler if provided
      if (onSelect) {
        onSelect(
          selected ? [...data] : [],
          selected ? data.map((_, index) => index) : []
        );
      }
    },
    [selectable, data, onSelect]
  );

  // Check if an item is selected
  const isSelected = useCallback(
    (item: T, index: number) => {
      if (selectable === 'none') return false;
      return selectedIndices.includes(index);
    },
    [selectable, selectedIndices]
  );

  // Check if all items are selected
  const isAllSelected = useMemo(() => {
    if (selectable === 'none' || data.length === 0) return false;
    return selectedIndices.length === data.length;
  }, [selectable, data.length, selectedIndices.length]);

  // Check if some items are selected (partial selection)
  const isPartiallySelected = useMemo(() => {
    if (selectable === 'none' || data.length === 0) return false;
    return selectedIndices.length > 0 && selectedIndices.length < data.length;
  }, [selectable, data.length, selectedIndices.length]);

  // Clear all selections
  const clearSelection = useCallback(() => {
    setSelectedItems([]);
    setSelectedIndices([]);
    
    if (onSelect) {
      onSelect([], []);
    }
  }, [onSelect]);

  return {
    selectedItems,
    selectedIndices,
    handleSelect,
    handleSelectAll,
    isSelected,
    isAllSelected,
    isPartiallySelected,
    clearSelection,
  };
}

export default useDataTableSelection;
