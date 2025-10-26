# DataTable Component

A powerful, accessible, and customizable data table component built with React, TypeScript, and Tailwind CSS. Designed to integrate seamlessly with the existing design system and component architecture.

## 🚀 Features

- **📊 Rich Data Display**: Support for complex data structures with custom cell rendering
- **🔄 Sorting**: Multi-column sorting with custom sort functions
- **🔍 Filtering**: Built-in filtering with multiple operators and global search
- **📄 Pagination**: Flexible pagination with customizable page sizes
- **✅ Selection**: Single and multiple row selection with keyboard support
- **📱 Responsive**: Mobile-first responsive design with breakpoint controls
- **♿ Accessible**: WCAG 2.1 AA compliant with full keyboard navigation
- **🎨 Themable**: Semantic design tokens for consistent styling
- **⚡ Performance**: Virtual scrolling for large datasets
- **🔄 Loading States**: Skeleton and loading indicators
- **📭 Empty States**: Customizable empty state displays
- **🧪 Tested**: Comprehensive test coverage with Jest and React Testing Library

## 📦 Installation

The DataTable component is already included in the project. Import it from the components directory:

```tsx
import DataTable from '@/components/DataTable';
```

## 🎯 Quick Start

```tsx
import DataTable from '@/components/DataTable';

const data = [
  { id: 1, name: 'Intel Core i7-13700K', category: 'CPU', price: 399.99 },
  { id: 2, name: 'NVIDIA RTX 4080', category: 'GPU', price: 1199.99 },
  { id: 3, name: 'Corsair Vengeance 32GB', category: 'RAM', price: 149.99 },
];

const columns = [
  { key: 'name', header: 'Product Name', field: 'name', sortable: true },
  { key: 'category', header: 'Category', field: 'category' },
  {
    key: 'price',
    header: 'Price',
    field: 'price',
    sortable: true,
    align: 'end',
  },
];

function MyTable() {
  return (
    <DataTable data={data} columns={columns}>
      <DataTable.Header>
        <DataTable.Title>PC Parts Inventory</DataTable.Title>
        <DataTable.Actions>
          <button>Add Item</button>
        </DataTable.Actions>
      </DataTable.Header>
      <DataTable.Table>
        <DataTable.Head>
          <DataTable.Row>
            {columns.map(column => (
              <DataTable.HeaderCell key={column.key}>
                {column.header}
              </DataTable.HeaderCell>
            ))}
          </DataTable.Row>
        </DataTable.Head>
        <DataTable.Body>
          {data.map(item => (
            <DataTable.Row key={item.id}>
              {columns.map(column => (
                <DataTable.Cell key={column.key}>
                  {item[column.field]}
                </DataTable.Cell>
              ))}
            </DataTable.Row>
          ))}
        </DataTable.Body>
      </DataTable.Table>
    </DataTable>
  );
}
```

## 🏗️ Architecture

The DataTable follows a compound component pattern, similar to the existing PageHeader component:

```
DataTable/
├── index.ts                    # Main exports + compound component
├── DataTable.tsx              # Main component
├── types.ts                   # TypeScript definitions
├── constants.ts               # Design tokens and constants
├── hooks/
│   └── useDataTable.ts        # Custom hook for logic
├── utils/
│   ├── classNames.ts          # Class merging utilities
│   ├── validators.ts          # Prop validation
│   ├── sorting.ts             # Sorting utilities
│   ├── filtering.ts           # Filtering utilities
│   └── pagination.ts          # Pagination utilities
├── components/
│   ├── Container/             # Container components
│   ├── Header/                # Header components
│   ├── Table/                 # Table components
│   ├── Pagination/            # Pagination components
│   ├── Loading/               # Loading components
│   ├── Empty/                 # Empty state components
│   └── Actions/               # Action components
├── __tests__/                 # Test files
├── stories/                   # Storybook stories
└── README.md                  # This file
```

## 🎨 Design System Integration

The DataTable uses semantic design tokens for consistent theming:

```css
/* Container variants */
.data-table-container {
  /* Default styling */
}
.data-table-container-bordered {
  /* Bordered variant */
}
.data-table-container-elevated {
  /* Elevated variant */
}
.data-table-container-minimal {
  /* Minimal variant */
}

/* Table variants */
.data-table-table {
  /* Default table */
}
.data-table-table-striped {
  /* Striped rows */
}
.data-table-table-bordered {
  /* Bordered table */
}
.data-table-table-minimal {
  /* Minimal table */
}

/* Cell padding */
.data-table-cell-compact {
  /* Condensed padding */
}
.data-table-cell {
  /* Normal padding */
}
.data-table-cell-spacious {
  /* Spacious padding */
}
```

## 📋 API Reference

### DataTable Props

| Prop               | Type                                    | Default    | Description                      |
| ------------------ | --------------------------------------- | ---------- | -------------------------------- |
| `data`             | `T[]`                                   | -          | Array of data objects to display |
| `columns`          | `Column<T>[]`                           | -          | Column definitions               |
| `loading`          | `boolean`                               | `false`    | Whether the table is loading     |
| `empty`            | `boolean`                               | `false`    | Whether to show empty state      |
| `error`            | `string \| ReactNode`                   | -          | Error message to display         |
| `sortable`         | `boolean`                               | `false`    | Whether columns are sortable     |
| `selectable`       | `'none' \| 'single' \| 'multiple'`      | `'none'`   | Selection mode                   |
| `pagination`       | `PaginationConfig \| boolean`           | `false`    | Pagination configuration         |
| `cellPadding`      | `'condensed' \| 'normal' \| 'spacious'` | `'normal'` | Cell padding size                |
| `striped`          | `boolean`                               | `false`    | Whether to show striped rows     |
| `hoverable`        | `boolean`                               | `true`     | Whether rows are hoverable       |
| `bordered`         | `boolean`                               | `false`    | Whether to show borders          |
| `compact`          | `boolean`                               | `false`    | Whether to use compact styling   |
| `stickyHeader`     | `boolean`                               | `false`    | Whether header is sticky         |
| `virtualScrolling` | `boolean`                               | `false`    | Whether to use virtual scrolling |

### Column Definition

```tsx
interface Column<T> {
  key: string; // Unique identifier
  header: string | ReactNode; // Header content
  field?: keyof T | string; // Data field path
  render?: (item: T, index: number) => ReactNode; // Custom cell renderer
  sortable?: boolean; // Whether column is sortable
  filterable?: boolean; // Whether column is filterable
  align?: 'start' | 'center' | 'end'; // Text alignment
  width?: string | number; // Column width
  minWidth?: string | number; // Minimum width
  maxWidth?: string | number; // Maximum width
  hidden?: boolean | ResponsiveBreakpoint[]; // Visibility control
  className?: string; // Custom CSS classes
  sortBy?:
    | 'alphanumeric'
    | 'numeric'
    | 'date'
    | 'custom'
    | ((a: T, b: T) => number);
  filterBy?: (item: T, filterValue: any) => boolean;
  sticky?: boolean; // Whether column is sticky
  resizable?: boolean; // Whether column is resizable
}
```

## 🔧 Advanced Usage

### Custom Cell Rendering

```tsx
const columns = [
  {
    key: 'price',
    header: 'Price',
    field: 'price',
    align: 'end',
    render: item => `$${item.price.toFixed(2)}`,
  },
  {
    key: 'status',
    header: 'Status',
    field: 'inStock',
    align: 'center',
    render: item => (
      <span className={item.inStock ? 'text-status-success' : 'text-status-error'}>
        {item.inStock ? '✓' : '✗'}
      </span>
    ),
  },
];
```

### Sorting Configuration

```tsx
const columns = [
  {
    key: 'name',
    header: 'Name',
    field: 'name',
    sortable: true,
    sortBy: 'alphanumeric',
  },
  {
    key: 'price',
    header: 'Price',
    field: 'price',
    sortable: true,
    sortBy: 'numeric',
  },
  {
    key: 'date',
    header: 'Date',
    field: 'dateAdded',
    sortable: true,
    sortBy: 'date',
  },
  {
    key: 'custom',
    header: 'Custom',
    field: 'customField',
    sortable: true,
    sortBy: (a, b) => a.customField.length - b.customField.length,
  },
];
```

### Pagination Configuration

```tsx
const paginationConfig = {
  pageSize: 25,
  currentPage: 1,
  totalItems: 1000,
  showPageSizeSelector: true,
  pageSizeOptions: [10, 25, 50, 100],
};

<DataTable data={data} columns={columns} pagination={paginationConfig}>
  {/* ... */}
  <DataTable.Pagination
    config={paginationConfig}
    onPageChange={handlePageChange}
    onPageSizeChange={handlePageSizeChange}
  />
</DataTable>;
```

### Selection Handling

```tsx
function MyTable() {
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <DataTable
      data={data}
      columns={columns}
      selectable='multiple'
      onSelect={setSelectedItems}
    >
      {/* ... */}
    </DataTable>
  );
}
```

### Responsive Columns

```tsx
const columns = [
  {
    key: 'name',
    header: 'Name',
    field: 'name',
    hidden: ['xs', 'sm'], // Hidden on mobile
  },
  {
    key: 'category',
    header: 'Category',
    field: 'category',
    hidden: ['xs'], // Hidden on extra small screens
  },
  {
    key: 'price',
    header: 'Price',
    field: 'price',
    // Always visible
  },
];
```

## 🧪 Testing

The DataTable component includes comprehensive tests:

```bash
# Run tests
npm test DataTable

# Run tests with coverage
npm test -- --coverage DataTable

# Run accessibility tests
npm test -- --testNamePattern="accessibility"
```

### Test Coverage

- ✅ Basic rendering
- ✅ Sorting functionality
- ✅ Selection handling
- ✅ Pagination controls
- ✅ Loading states
- ✅ Empty states
- ✅ Error states
- ✅ Accessibility compliance
- ✅ Responsive behavior
- ✅ Custom styling
- ✅ Error handling

## 📚 Storybook

View all DataTable variants and examples in Storybook:

```bash
npm run storybook
```

Navigate to `Components/DataTable` to see:

- Default table
- With pagination
- With selection
- Bordered variant
- Compact variant
- Spacious variant
- Loading state
- Empty state
- Error state
- Sticky header
- Responsive design

## ♿ Accessibility

The DataTable component is fully accessible and follows WCAG 2.1 AA guidelines:

- **Keyboard Navigation**: Full keyboard support for all interactions
- **Screen Reader Support**: Proper ARIA labels and roles
- **Focus Management**: Logical focus order and visible focus indicators
- **Color Contrast**: Meets WCAG contrast requirements
- **Semantic HTML**: Uses proper table elements and structure

### Keyboard Shortcuts

- `Tab`: Navigate between interactive elements
- `Space`: Select/deselect rows
- `Enter`: Activate sortable column headers
- `Arrow Keys`: Navigate between cells
- `Ctrl+A`: Select all rows (when selectable)

## 🎨 Theming

The DataTable uses semantic design tokens for consistent theming:

```css
/* Override theme colors */
:root {
  --color-surface-primary: #ffffff;
  --color-surface-secondary: #f8f9fa;
  --color-text-primary: #212529;
  --color-text-secondary: #6c757d;
  --color-accent-primary: #007bff;
  --color-border-default: #dee2e6;
}
```

## 🚀 Performance

The DataTable is optimized for performance:

- **Virtual Scrolling**: For large datasets (1000+ rows)
- **Memoization**: Prevents unnecessary re-renders
- **Lazy Loading**: Components are loaded on demand
- **Debounced Filtering**: Prevents excessive API calls
- **Efficient Sorting**: Optimized sort algorithms

### Performance Tips

1. Use `getRowId` for better selection performance
2. Enable virtual scrolling for large datasets
3. Use `React.memo` for custom cell renderers
4. Implement proper pagination for large datasets
5. Use `useMemo` for expensive calculations

## 🔧 Migration from ItemsTable

To migrate from the existing ItemsTable:

1. **Replace the component**:

   ```tsx
   // Before
   import ItemsTable from '@/components/ItemsTable';

   // After
   import DataTable from '@/components/DataTable';
   ```

2. **Update the structure**:

   ```tsx
   // Before
   <ItemsTable items={items} />

   // After
   <DataTable data={items} columns={columns}>
     <DataTable.Table>
       <DataTable.Head>
         <DataTable.Row>
           {columns.map(column => (
             <DataTable.HeaderCell key={column.key}>
               {column.header}
             </DataTable.HeaderCell>
           ))}
         </DataTable.Row>
       </DataTable.Head>
       <DataTable.Body>
         {items.map(item => (
           <DataTable.Row key={item.id}>
             {columns.map(column => (
               <DataTable.Cell key={column.key}>
                 {item[column.field]}
               </DataTable.Cell>
             ))}
           </DataTable.Row>
         ))}
       </DataTable.Body>
     </DataTable.Table>
   </DataTable>
   ```

3. **Define columns**:
   ```tsx
   const columns = [
     { key: 'name', header: 'Name', field: 'name' },
     { key: 'category', header: 'Category', field: 'category' },
     { key: 'price', header: 'Price', field: 'price' },
   ];
   ```

## 🤝 Contributing

When contributing to the DataTable component:

1. **Follow the existing patterns** from PageHeader and other components
2. **Add comprehensive tests** for new features
3. **Update Storybook stories** for new variants
4. **Ensure accessibility compliance** with WCAG 2.1 AA
5. **Use semantic design tokens** for styling
6. **Document new props and features** in this README

## 📄 License

This component is part of the PCPartKeeper project and follows the same license terms.

---

**Built with ❤️ for the PCPartKeeper project**
