# Reusable Table Pattern for PCPartKeeper

## Overview

This document describes the reusable pattern for creating entity-specific tables (Items, Models, PCs) using the DataTable component with action buttons.

## Architecture

### Component Structure

```
ItemsPage / ModelsPage / PCPage
    ↓
{Entity}Table (e.g., ItemsTable)
    ↓
DataTableRefactored
    ↓
DataTableRowActions (for action buttons)
```

### Key Components

1. **ItemsTable** (`src/components/ItemsTable.tsx`)
   - Entity-specific wrapper around DataTable
   - Adds action buttons (Edit, Delete, etc.)
   - Handles entity-specific logic and callbacks

2. **DataTableRefactored** (`src/components/DataTable/DataTableRefactored.tsx`)
   - Reusable table component with sorting, selection, pagination
   - Supports compound component pattern
   - Highly configurable and performant

3. **DataTableRowActions** (`src/components/DataTable/components/Actions/DataTableRowActions.tsx`)
   - Standardized action button rendering
   - Supports inline, dropdown, and overflow variants
   - Responsive design (icons on mobile, labels on desktop)

## Usage Pattern

### Creating a New Entity Table

Follow this pattern when creating tables for Models or PCs:

```typescript
import React, { useMemo, useCallback } from 'react';
import DataTableRefactoredCompound from '../DataTable/DataTableRefactored';
import DataTableRowActions from '../DataTable/components/Actions/DataTableRowActions';
import { Model } from '../../store/types';

const DataTableRefactored = DataTableRefactoredCompound as any;

export interface ModelsTableProps {
  models: Model[];
  columns: Column[];
  selectedModels: Model[];
  onSelect: (items: Model[]) => void;
  onEditModel: (model: Model) => void;
  onDeleteModel: (model: Model) => void;
  pagination?: PaginationConfig;
}

export const ModelsTable: React.FC<ModelsTableProps> = React.memo(({
  models,
  columns,
  onSelect,
  onEditModel,
  onDeleteModel,
  pagination = defaultPagination,
}) => {
  // Safety check for columns
  if (!columns || !Array.isArray(columns)) {
    return <ErrorState message="Invalid columns configuration" />;
  }

  // Memoize action handlers
  const handleEditModel = useCallback((model: Model) => {
    onEditModel(model);
  }, [onEditModel]);

  const handleDeleteModel = useCallback((model: Model) => {
    onDeleteModel(model);
  }, [onDeleteModel]);

  // Add actions column
  const columnsWithActions: Column[] = useMemo(
    () => [
      ...columns,
      {
        key: 'actions',
        header: 'Actions',
        field: 'actions',
        sortable: false,
        width: 'auto',
        align: 'center' as const,
        render: (item: Model, index: number) => {
          const actions = [
            {
              key: 'edit',
              label: 'Edit',
              icon: <span className='text-sm' aria-hidden='true'>✏️</span> as React.ReactNode,
              onClick: () => handleEditModel(item),
              variant: 'default' as const,
            },
            {
              key: 'delete',
              label: 'Delete',
              icon: <span className='text-sm' aria-hidden='true'>🗑️</span> as React.ReactNode,
              onClick: () => handleDeleteModel(item),
              variant: 'danger' as const,
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
    ],
    [columns, handleEditModel, handleDeleteModel]
  );

  return (
    <DataTableRefactored
      data={models}
      columns={columnsWithActions}
      sortable={true}
      selectable='multiple'
      hoverable={true}
      bordered={true}
      striped={true}
      pagination={pagination}
      onSelect={onSelect}
      getRowId={(model: Model) => model.id}
    />
  );
});

ModelsTable.displayName = 'ModelsTable';
export default ModelsTable;
```

## Key Design Decisions

### 1. Why Keep Entity-Specific Wrappers?

**Answer**: Each entity (Items, Models, PCs) may have different:
- Column configurations
- Action types (e.g., "Edit", "Delete", "Duplicate", "Clone")
- Business logic
- Callback signatures

The wrapper pattern maintains type safety while avoiding prop drilling.

### 2. Why Use DataTableRowActions Instead of Custom Buttons?

**Answer**: 
- **Consistency**: All tables look and behave the same
- **Reusability**: Action logic is centralized
- **Maintainability**: Bug fixes and enhancements apply to all tables
- **Performance**: Optimized rendering with React.memo
- **Accessibility**: Built-in ARIA labels and keyboard navigation

### 3. How Does Responsive Design Work?

**Answer**: DataTableRowActions automatically handles responsive behavior:
- **Mobile**: Icons only (`hidden sm:inline` on labels)
- **Desktop**: Icons + Text labels
- **Touch targets**: Minimum 2.5rem on mobile, 2rem on desktop
- **Layout**: Stacks vertically on mobile, horizontal on desktop

## Benefits

### For Developers
- **Faster Development**: Copy-paste-modify pattern
- **Type Safety**: Full TypeScript support
- **DRY Principle**: No duplicate code
- **Easy Testing**: Standardized component API

### For Users
- **Consistent UX**: Same interaction patterns across all tables
- **Better Performance**: Memoized components reduce re-renders
- **Accessibility**: Built-in ARIA labels and keyboard navigation
- **Responsive**: Mobile-first design works on all devices

## Migration Notes

### From Custom Button Implementation

If you have an existing table with custom buttons:

1. **Replace custom buttons** with DataTableRowActions:
   ```typescript
   // Before: Custom buttons
   render: (item: Item) => (
     <button onClick={() => handleEdit(item)}>Edit</button>
   )
   
   // After: DataTableRowActions
   render: (item: Item, index: number) => {
     const actions = [
       { key: 'edit', label: 'Edit', onClick: () => handleEdit(item), variant: 'default' }
     ];
     return <DataTableRowActions item={item} index={index} actions={actions} />;
   }
   ```

2. **Update styling** if needed (default styling should work)
3. **Test responsiveness** on mobile and desktop
4. **Update action types** if your entity needs different actions

## Future Enhancements

### Potential Features to Add
1. **Custom Action Variants**: Add more button styles beyond default/danger/primary
2. **Icon Library**: Replace emoji with SVG icons from a proper icon set
3. **Confirmation Dialogs**: Add delete confirmation to DataTableRowActions
4. **Bulk Actions**: Use DataTableBulkActions component for multi-select operations
5. **Action Permissions**: Add `hidden` or `disabled` based on user permissions

### Template Code

Use this as a starting point for new entity tables:

```typescript
// Copy this template and replace {Entity} with your entity name
export interface {Entity}TableProps {
  {entity}s: {Entity}[];
  columns: Column[];
  selected{Entity}s: {Entity}[];
  onSelect: (items: {Entity}[]) => void;
  onEdit{Entity}: ({entity}: {Entity}) => void;
  onDelete{Entity}: ({entity}: {Entity}) => void;
  pagination?: PaginationConfig;
}
```

## Examples

See these files for reference:
- `src/components/ItemsTable.tsx` - Current implementation
- `src/components/DataTable/components/Actions/DataTableRowActions.tsx` - Action component
- `src/pages/ItemsPage.tsx` - Page integration

## Testing

When creating a new entity table, test:
1. ✅ Table renders with correct columns
2. ✅ Action buttons appear and work
3. ✅ Selection (single/multiple) works
4. ✅ Sorting works
5. ✅ Pagination works
6. ✅ Responsive design on mobile/tablet/desktop
7. ✅ Accessibility (keyboard navigation, screen readers)

## Summary

This pattern provides:
- ✅ **Reusability**: One pattern for Items, Models, PCs
- ✅ **Maintainability**: Changes to DataTableRowActions benefit all tables
- ✅ **Type Safety**: Full TypeScript support
- ✅ **Performance**: Memoized components prevent unnecessary re-renders
- ✅ **Accessibility**: Built-in ARIA labels and keyboard navigation
- ✅ **Responsive**: Mobile-first design works everywhere

Follow this pattern for all future entity tables in PCPartKeeper.

