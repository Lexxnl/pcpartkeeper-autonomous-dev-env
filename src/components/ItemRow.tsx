import React, { memo } from 'react';
import Button from './Button';
import { EditIcon, DeleteIcon } from './icons';

// Type definitions
interface Item {
  id: string | number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  dateAdded: string;
}

interface ItemRowProps {
  item: Item;
  onEdit?: (item: Item) => void;
  onDelete?: (item: Item) => void;
}

/**
 * ItemRow - Table row component for displaying a single PC part item
 *
 * Displays item details including name, category, price, quantity, date, and action buttons.
 * Uses semantic design tokens for consistent theming.
 * Memoized for performance optimization.
 *
 * @param item - Item object with properties: id, name, category, price, quantity, dateAdded
 * @param onEdit - Optional callback for edit action
 * @param onDelete - Optional callback for delete action
 */
const ItemRow = memo<ItemRowProps>(({ item, onEdit, onDelete }) => {
  /**
   * Format price as USD currency
   */
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  /**
   * Format date in readable format
   */
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleEdit = (): void => {
    if (onEdit) {
      onEdit(item);
    } else {
      // TODO: Implement edit functionality
    }
  };

  const handleDelete = (): void => {
    if (onDelete) {
      onDelete(item);
    } else {
      // TODO: Implement delete functionality
    }
  };

  return (
    <tr className='table-row'>
      {/* Name - Always visible */}
      <td className='table-cell'>
        <div className='font-medium text-text-primary'>{item.name}</div>
        {/* Show quantity and date on mobile below name */}
        <div className='flex flex-wrap gap-2 mt-1 md:hidden'>
          <span className='text-xs text-text-muted'>Qty: {item.quantity}</span>
          <span className='text-xs text-text-muted lg:hidden'>
            {formatDate(item.dateAdded)}
          </span>
        </div>
      </td>

      {/* Category - Always visible */}
      <td className='table-cell'>
        <span className='badge-emphasis inline-flex'>{item.category}</span>
      </td>

      {/* Price - Always visible, right-aligned on mobile */}
      <td className='table-cell text-text-secondary text-right sm:text-left font-medium'>
        {formatPrice(item.price)}
      </td>

      {/* Quantity - Hidden on small screens (shown in name cell on mobile) */}
      <td className='table-cell text-text-secondary hidden md:table-cell'>
        {item.quantity}
      </td>

      {/* Date - Hidden on medium and smaller screens */}
      <td className='table-cell text-text-muted hidden lg:table-cell'>
        {formatDate(item.dateAdded)}
      </td>

      {/* Actions - Always visible, responsive layout */}
      <td className='table-cell'>
        <div className='flex flex-col sm:flex-row gap-2 items-end sm:items-center justify-end'>
          <Button
            onClick={handleEdit}
            variant='default'
            size='small'
            leadingVisual={<EditIcon className='h-4 w-4' />}
            aria-label={`Edit ${item.name}`}
            className='w-full sm:w-auto'
          >
            <span className='sm:inline'>Edit</span>
          </Button>
          <Button
            onClick={handleDelete}
            variant='danger'
            size='small'
            leadingVisual={<DeleteIcon className='h-4 w-4' />}
            aria-label={`Delete ${item.name}`}
            className='w-full sm:w-auto'
          >
            <span className='sm:inline'>Delete</span>
          </Button>
        </div>
      </td>
    </tr>
  );
});

ItemRow.displayName = 'ItemRow';

export default ItemRow;
