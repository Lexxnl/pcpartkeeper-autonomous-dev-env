import { useMemo } from 'react';
import { Item } from '../store/types';
import { ITEM_COLUMNS } from '../data/mockData';
import DataTableRowActions from '../components/DataTable/components/Actions/DataTableRowActions';
import { LoadingSpinner } from '../components/LoadingSpinner';
import React from 'react';

/**
 * Custom hook for generating DataTable columns with action buttons
 * 
 * This hook extracts the column generation logic from ItemsPage to make it
 * reusable and maintainable.
 * 
 * @param handleEditItem - Function to handle item editing
 * @param handleDeleteItem - Function to handle item deletion
 * @param deletingItemId - ID of item currently being deleted (null if none)
 * @returns Array of column definitions including actions column
 */
export const useItemColumns = (
  handleEditItem: (item: Item) => void,
  handleDeleteItem: (item: Item) => Promise<void>,
  deletingItemId: number | null
) => {
  return useMemo(() => {
    return [
      ...ITEM_COLUMNS,
      {
        key: 'actions',
        header: 'Actions',
        field: 'actions',
        sortable: false,
        width: 'auto',
        align: 'center' as const,
        render: (item: Item, index: number) => {
          const isDeleting = deletingItemId === item.id;
          const actions = [
            {
              key: 'edit',
              label: 'Edit',
              icon: <span className='text-sm' aria-hidden='true'>✏️</span> as React.ReactNode,
              onClick: () => handleEditItem(item),
              variant: 'default' as const,
              disabled: isDeleting,
            },
            {
              key: 'delete',
              label: isDeleting ? 'Deleting...' : 'Delete',
              icon: isDeleting ? 
                <LoadingSpinner size='small' /> : 
                <span className='text-sm' aria-hidden='true'>🗑️</span> as React.ReactNode,
              onClick: () => handleDeleteItem(item),
              variant: 'danger' as const,
              disabled: isDeleting,
            },
          ];

          return (
            <DataTableRowActions
              item={item}
              index={index}
              actions={actions}
              variant='inline'
              align='center'
              className='flex flex-col sm:flex-row gap-component-sm sm:gap-component-md'
            />
          );
        },
      },
    ];
  }, [handleEditItem, handleDeleteItem, deletingItemId]);
};

