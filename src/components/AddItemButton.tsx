import React from 'react';
import Button from './Button';
import { PlusIcon } from './icons';

/**
 * AddItemButton - Specialized button for adding new items
 *
 * A pre-configured primary button with a plus icon for adding new items.
 * Responsive layout - full width on mobile, auto width on larger screens.
 *
 * @param {Function} onAddItem - Callback function when button is clicked
 */

// Type definitions
interface AddItemButtonProps {
  onAddItem: () => void;
}

function AddItemButton({ onAddItem }: AddItemButtonProps) {
  return (
    <Button
      onClick={onAddItem}
      variant='primary'
      leadingVisual={<PlusIcon className='h-4 w-4 sm:h-5 sm:w-5' />}
      hasArrow={false}
      className='w-full sm:w-auto shadow-sm hover:shadow-md transition-shadow duration-200'
      aria-label='Add a new item to inventory'
    >
      <span className='flex items-center gap-2'>
        <span>Add New Item</span>
      </span>
    </Button>
  );
}

export default AddItemButton;
