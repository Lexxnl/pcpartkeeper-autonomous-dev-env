import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import DataTable from '../index';
import { Column } from '../types';

// Mock data for stories
const generateMockData = (count: number) => {
  const categories = [
    'CPU',
    'GPU',
    'RAM',
    'Storage',
    'Motherboard',
    'PSU',
    'Cooling',
  ];
  const brands = [
    'Intel',
    'AMD',
    'NVIDIA',
    'Corsair',
    'Samsung',
    'ASUS',
    'MSI',
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `${brands[i % brands.length]} ${categories[i % categories.length]} ${
      i + 1
    }`,
    category: categories[i % categories.length],
    brand: brands[i % brands.length],
    price: Math.floor(Math.random() * 2000) + 50,
    quantity: Math.floor(Math.random() * 10) + 1,
    inStock: Math.random() > 0.2,
    dateAdded: new Date(2024, 0, i + 1).toISOString().split('T')[0],
    rating: Math.floor(Math.random() * 5) + 1,
  }));
};

const mockData = generateMockData(50);

const columns: Column<(typeof mockData)[0]>[] = [
  {
    key: 'name',
    header: 'Product Name',
    field: 'name',
    sortable: true,
    width: 'grow',
    minWidth: '200px',
  },
  {
    key: 'category',
    header: 'Category',
    field: 'category',
    sortable: true,
    width: 'auto',
  },
  {
    key: 'brand',
    header: 'Brand',
    field: 'brand',
    sortable: true,
    width: 'auto',
  },
  {
    key: 'price',
    header: 'Price',
    field: 'price',
    sortable: true,
    align: 'end',
    width: 'auto',
    render: item => `$${item.price.toFixed(2)}`,
  },
  {
    key: 'quantity',
    header: 'Stock',
    field: 'quantity',
    sortable: true,
    align: 'center',
    width: 'auto',
    render: item => (
      <span
        className={
          item.quantity > 5
            ? 'text-status-success'
            : item.quantity > 0
              ? 'text-status-warning'
              : 'text-status-error'
        }
      >
        {item.quantity}
      </span>
    ),
  },
  {
    key: 'inStock',
    header: 'Available',
    field: 'inStock',
    sortable: true,
    align: 'center',
    width: 'auto',
    render: item => (
      <span className={item.inStock ? 'text-status-success' : 'text-status-error'}>
        {item.inStock ? '✓' : '✗'}
      </span>
    ),
  },
  {
    key: 'rating',
    header: 'Rating',
    field: 'rating',
    sortable: true,
    align: 'center',
    width: 'auto',
    render: item => '★'.repeat(item.rating) + '☆'.repeat(5 - item.rating),
  },
  {
    key: 'dateAdded',
    header: 'Date Added',
    field: 'dateAdded',
    sortable: true,
    width: 'auto',
  },
];

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A powerful, accessible, and customizable data table component with support for sorting, filtering, pagination, selection, and responsive design. Uses semantic design tokens for consistent theming.

## Features

- **Sorting**: Click column headers to sort data
- **Selection**: Single or multiple row selection
- **Pagination**: Built-in pagination with customizable page sizes
- **Filtering**: Column-based filtering capabilities
- **Responsive**: Mobile-first responsive design
- **Accessible**: WCAG 2.1 AA compliant
- **Customizable**: Extensive theming and styling options
- **Performance**: Virtual scrolling for large datasets
- **Loading States**: Skeleton and loading indicators
- **Empty States**: Customizable empty state displays

## Usage

\`\`\`tsx
import DataTable from '@/components/DataTable';

<DataTable data={items} columns={columns}>
  <DataTable.Header>
    <DataTable.Title>Inventory</DataTable.Title>
    <DataTable.Actions>
      <Button>Add Item</Button>
    </DataTable.Actions>
  </DataTable.Header>
  <DataTable.Table>
    <DataTable.Head>
      <DataTable.Row>
        {columns.map(column => (
          <DataTable.HeaderCell key={column.key}>
            {typeof column.header === 'function' ? column.header(column) : column.header}
          </DataTable.HeaderCell>
        ))}
      </DataTable.Row>
    </DataTable.Head>
    <DataTable.Body>
      {items.map(item => (
        <DataTable.Row key={item.id}>
          {columns.map(column => (
            <DataTable.Cell key={column.key}>
              {column.render ? column.render(item) : item[column.field]}
            </DataTable.Cell>
          ))}
        </DataTable.Row>
      ))}
    </DataTable.Body>
  </DataTable.Table>
  <DataTable.Pagination config={paginationConfig} />
</DataTable>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    data: {
      description: 'Array of data objects to display in the table',
      control: false,
    },
    columns: {
      description: 'Array of column definitions',
      control: false,
    },
    loading: {
      description: 'Whether the table is in a loading state',
      control: 'boolean',
    },
    empty: {
      description: 'Whether to show empty state',
      control: 'boolean',
    },
    error: {
      description: 'Error message to display',
      control: 'text',
    },
    sortable: {
      description: 'Whether columns are sortable',
      control: 'boolean',
    },
    selectable: {
      description: 'Selection mode for rows',
      control: 'select',
      options: ['none', 'single', 'multiple'],
    },
    pagination: {
      description: 'Pagination configuration',
      control: false,
    },
    cellPadding: {
      description: 'Cell padding size',
      control: 'select',
      options: ['condensed', 'normal', 'spacious'],
    },
    striped: {
      description: 'Whether to show striped rows',
      control: 'boolean',
    },
    hoverable: {
      description: 'Whether rows are hoverable',
      control: 'boolean',
    },
    bordered: {
      description: 'Whether to show borders',
      control: 'boolean',
    },
    compact: {
      description: 'Whether to use compact styling',
      control: 'boolean',
    },
    stickyHeader: {
      description: 'Whether header is sticky',
      control: 'boolean',
    },
    virtualScrolling: {
      description: 'Whether to use virtual scrolling',
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

// ============================================================================
// BASIC STORIES
// ============================================================================

export const Default: Story = {
  args: {
    data: mockData.slice(0, 10),
    columns,
    sortable: true,
    hoverable: true,
    compact: true,
    cellPadding: 'condensed',
  },
  render: args => (
    <DataTable {...args}>
      <DataTable.Header>
        <DataTable.Title>PC Parts Inventory</DataTable.Title>
        <DataTable.Subtitle>
          Manage your computer components and inventory
        </DataTable.Subtitle>
        <DataTable.Actions>
          <button className='btn-primary px-4 py-2 rounded'>Add Item</button>
          <button className='btn-default px-4 py-2 rounded'>Export</button>
        </DataTable.Actions>
      </DataTable.Header>
      <DataTable.Table>
        <DataTable.Head>
          <DataTable.Row>
            {columns.map(column => (
              <DataTable.HeaderCell key={column.key} sortable={column.sortable}>
                {typeof column.header === 'function' ? column.header(column) : column.header}
              </DataTable.HeaderCell>
            ))}
          </DataTable.Row>
        </DataTable.Head>
        <DataTable.Body>
          {args.data.map(item => (
            <DataTable.Row key={item.id}>
              {columns.map(column => (
                <DataTable.Cell key={column.key} align={column.align}>
                  {column.render
                    ? column.render(item, 0, column)
                    : item[column.field as keyof typeof item]}
                </DataTable.Cell>
              ))}
            </DataTable.Row>
          ))}
        </DataTable.Body>
      </DataTable.Table>
    </DataTable>
  ),
};

export const WithPagination: Story = {
  args: {
    data: mockData,
    columns,
    sortable: true,
    hoverable: true,
    compact: true,
    cellPadding: 'condensed',
    pagination: {
      pageSize: 10,
      currentPage: 1,
      totalItems: mockData.length,
      showPageSizeSelector: true,
      pageSizeOptions: [5, 10, 25, 50],
    },
  },
  render: args => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = args.data.slice(startIndex, endIndex);

    return (
      <DataTable {...args} data={paginatedData}>
        <DataTable.Header>
          <DataTable.Title>PC Parts Inventory</DataTable.Title>
          <DataTable.Subtitle>
            Showing {startIndex + 1}-{endIndex} of {args.data.length} items
          </DataTable.Subtitle>
        </DataTable.Header>
        <DataTable.Table>
          <DataTable.Head>
            <DataTable.Row>
              {columns.map(column => (
                <DataTable.HeaderCell
                  key={column.key}
                  sortable={column.sortable}
                >
                  {typeof column.header === 'function' ? column.header(column) : column.header}
                </DataTable.HeaderCell>
              ))}
            </DataTable.Row>
          </DataTable.Head>
          <DataTable.Body>
            {paginatedData.map(item => (
              <DataTable.Row key={item.id}>
                {columns.map(column => (
                  <DataTable.Cell key={column.key} align={column.align}>
                    {column.render
                      ? column.render(item, 0, column)
                      : item[column.field as keyof typeof item]}
                  </DataTable.Cell>
                ))}
              </DataTable.Row>
            ))}
          </DataTable.Body>
        </DataTable.Table>
        <DataTable.Pagination
          config={{
            pageSize,
            currentPage,
            totalItems: args.data.length,
            showPageSizeSelector: true,
            pageSizeOptions: [5, 10, 25, 50],
          }}
          onPageChange={setCurrentPage}
          onPageSizeChange={newPageSize => {
            setPageSize(newPageSize);
            setCurrentPage(1);
          }}
        />
      </DataTable>
    );
  },
};

export const WithSelection: Story = {
  args: {
    data: mockData.slice(0, 10),
    columns,
    sortable: true,
    selectable: 'multiple',
    hoverable: true,
    compact: true,
    cellPadding: 'condensed',
  },
  render: args => {
    const [selectedItems, setSelectedItems] = useState<(typeof mockData)[0][]>(
      []
    );

    return (
      <DataTable {...args} onSelect={setSelectedItems}>
        <DataTable.Header>
          <DataTable.Title>PC Parts Inventory</DataTable.Title>
          <DataTable.Subtitle>
            {selectedItems.length > 0 &&
              `${selectedItems.length} item(s) selected`}
          </DataTable.Subtitle>
          <DataTable.Actions>
            {selectedItems.length > 0 && (
              <button className='btn-danger px-4 py-2 rounded'>
                Delete Selected ({selectedItems.length})
              </button>
            )}
            <button className='btn-primary px-4 py-2 rounded'>Add Item</button>
          </DataTable.Actions>
        </DataTable.Header>
        <DataTable.Table>
          <DataTable.Head>
            <DataTable.Row>
              <DataTable.HeaderCell>
                <input type='checkbox' aria-label='Select all' />
              </DataTable.HeaderCell>
              {columns.map(column => (
                <DataTable.HeaderCell
                  key={column.key}
                  sortable={column.sortable}
                >
                  {typeof column.header === 'function' ? column.header(column) : column.header}
                </DataTable.HeaderCell>
              ))}
            </DataTable.Row>
          </DataTable.Head>
          <DataTable.Body>
            {args.data.map((item, index) => (
              <DataTable.Row key={item.id}>
                <DataTable.Cell>
                  <input
                    type='checkbox'
                    aria-label={`Select ${item.name}`}
                    checked={selectedItems.includes(item)}
                    onChange={() => {
                      if (selectedItems.includes(item)) {
                        setSelectedItems(
                          selectedItems.filter(i => i.id !== item.id)
                        );
                      } else {
                        setSelectedItems([...selectedItems, item]);
                      }
                    }}
                  />
                </DataTable.Cell>
                {columns.map(column => (
                  <DataTable.Cell key={column.key} align={column.align}>
                    {column.render
                      ? column.render(item, index, column)
                      : item[column.field as keyof typeof item]}
                  </DataTable.Cell>
                ))}
              </DataTable.Row>
            ))}
          </DataTable.Body>
        </DataTable.Table>
      </DataTable>
    );
  },
};

// ============================================================================
// VARIANT STORIES
// ============================================================================

export const Bordered: Story = {
  args: {
    data: mockData.slice(0, 10),
    columns,
    bordered: true,
    striped: true,
    hoverable: true,
    compact: true,
    cellPadding: 'condensed',
  },
  render: args => (
    <DataTable {...args}>
      <DataTable.Header>
        <DataTable.Title>Bordered Table</DataTable.Title>
        <DataTable.Subtitle>With borders and striped rows</DataTable.Subtitle>
      </DataTable.Header>
      <DataTable.Table>
        <DataTable.Head>
          <DataTable.Row>
            {columns.map(column => (
              <DataTable.HeaderCell key={column.key}>
                {typeof column.header === 'function' ? column.header(column) : column.header}
              </DataTable.HeaderCell>
            ))}
          </DataTable.Row>
        </DataTable.Head>
        <DataTable.Body>
          {args.data.map(item => (
            <DataTable.Row key={item.id}>
              {columns.map(column => (
                <DataTable.Cell key={column.key} align={column.align}>
                  {column.render
                    ? column.render(item, 0, column)
                    : item[column.field as keyof typeof item]}
                </DataTable.Cell>
              ))}
            </DataTable.Row>
          ))}
        </DataTable.Body>
      </DataTable.Table>
    </DataTable>
  ),
};

export const Compact: Story = {
  args: {
    data: mockData.slice(0, 15),
    columns,
    compact: true,
    cellPadding: 'condensed',
    striped: true,
    hoverable: true,
  },
  render: args => (
    <DataTable {...args}>
      <DataTable.Header>
        <DataTable.Title>Compact Table</DataTable.Title>
        <DataTable.Subtitle>
          Dense layout for maximum data visibility
        </DataTable.Subtitle>
      </DataTable.Header>
      <DataTable.Table>
        <DataTable.Head>
          <DataTable.Row>
            {columns.map(column => (
              <DataTable.HeaderCell key={column.key}>
                {typeof column.header === 'function' ? column.header(column) : column.header}
              </DataTable.HeaderCell>
            ))}
          </DataTable.Row>
        </DataTable.Head>
        <DataTable.Body>
          {args.data.map(item => (
            <DataTable.Row key={item.id}>
              {columns.map(column => (
                <DataTable.Cell key={column.key} align={column.align}>
                  {column.render
                    ? column.render(item, 0, column)
                    : item[column.field as keyof typeof item]}
                </DataTable.Cell>
              ))}
            </DataTable.Row>
          ))}
        </DataTable.Body>
      </DataTable.Table>
    </DataTable>
  ),
};

export const Spacious: Story = {
  args: {
    data: mockData.slice(0, 5),
    columns,
    compact: false,
    cellPadding: 'spacious',
  },
  render: args => (
    <DataTable {...args}>
      <DataTable.Header>
        <DataTable.Title>Spacious Table</DataTable.Title>
        <DataTable.Subtitle>
          Enhanced readability with generous spacing
        </DataTable.Subtitle>
      </DataTable.Header>
      <DataTable.Table>
        <DataTable.Head>
          <DataTable.Row>
            {columns.map(column => (
              <DataTable.HeaderCell key={column.key}>
                {typeof column.header === 'function' ? column.header(column) : column.header}
              </DataTable.HeaderCell>
            ))}
          </DataTable.Row>
        </DataTable.Head>
        <DataTable.Body>
          {args.data.map(item => (
            <DataTable.Row key={item.id}>
              {columns.map(column => (
                <DataTable.Cell key={column.key} align={column.align}>
                  {column.render
                    ? column.render(item, 0, column)
                    : item[column.field as keyof typeof item]}
                </DataTable.Cell>
              ))}
            </DataTable.Row>
          ))}
        </DataTable.Body>
      </DataTable.Table>
    </DataTable>
  ),
};

// ============================================================================
// STATE STORIES
// ============================================================================

export const Loading: Story = {
  args: {
    data: mockData.slice(0, 10),
    columns,
    loading: true,
    compact: true,
    cellPadding: 'condensed',
  },
  render: args => (
    <DataTable {...args}>
      <DataTable.Header>
        <DataTable.Title>Loading Table</DataTable.Title>
        <DataTable.Subtitle>Data is being loaded...</DataTable.Subtitle>
      </DataTable.Header>
      <DataTable.Table>
        <DataTable.Head>
          <DataTable.Row>
            {columns.map(column => (
              <DataTable.HeaderCell key={column.key}>
                {typeof column.header === 'function' ? column.header(column) : column.header}
              </DataTable.HeaderCell>
            ))}
          </DataTable.Row>
        </DataTable.Head>
        <DataTable.Body />
      </DataTable.Table>
    </DataTable>
  ),
};

export const Empty: Story = {
  args: {
    data: [],
    columns,
    empty: true,
    compact: true,
    cellPadding: 'condensed',
  },
  render: args => (
    <DataTable {...args}>
      <DataTable.Header>
        <DataTable.Title>Empty Table</DataTable.Title>
        <DataTable.Subtitle>No data available</DataTable.Subtitle>
      </DataTable.Header>
      <DataTable.Table>
        <DataTable.Head>
          <DataTable.Row>
            {columns.map(column => (
              <DataTable.HeaderCell key={column.key}>
                {typeof column.header === 'function' ? column.header(column) : column.header}
              </DataTable.HeaderCell>
            ))}
          </DataTable.Row>
        </DataTable.Head>
        <DataTable.Body />
      </DataTable.Table>
    </DataTable>
  ),
};

export const Error: Story = {
  args: {
    data: mockData.slice(0, 10),
    columns,
    error: 'Failed to load data. Please try again.',
    compact: true,
    cellPadding: 'condensed',
  },
  render: args => (
    <DataTable {...args}>
      <DataTable.Header>
        <DataTable.Title>Error Table</DataTable.Title>
        <DataTable.Subtitle>Something went wrong</DataTable.Subtitle>
      </DataTable.Header>
      <DataTable.Table>
        <DataTable.Head>
          <DataTable.Row>
            {columns.map(column => (
              <DataTable.HeaderCell key={column.key}>
                {typeof column.header === 'function' ? column.header(column) : column.header}
              </DataTable.HeaderCell>
            ))}
          </DataTable.Row>
        </DataTable.Head>
        <DataTable.Body />
      </DataTable.Table>
    </DataTable>
  ),
};

// ============================================================================
// ADVANCED STORIES
// ============================================================================

export const WithStickyHeader: Story = {
  args: {
    data: mockData,
    columns,
    stickyHeader: true,
    sortable: true,
    compact: true,
    cellPadding: 'condensed',
  },
  render: args => (
    <div style={{ height: '400px', overflow: 'auto' }}>
      <DataTable {...args}>
        <DataTable.Header>
          <DataTable.Title>Sticky Header Table</DataTable.Title>
          <DataTable.Subtitle>
            Header stays visible while scrolling
          </DataTable.Subtitle>
        </DataTable.Header>
        <DataTable.Table>
          <DataTable.Head>
            <DataTable.Row>
              {columns.map(column => (
                <DataTable.HeaderCell
                  key={column.key}
                  sortable={column.sortable}
                >
                  {typeof column.header === 'function' ? column.header(column) : column.header}
                </DataTable.HeaderCell>
              ))}
            </DataTable.Row>
          </DataTable.Head>
          <DataTable.Body>
            {args.data.map(item => (
              <DataTable.Row key={item.id}>
                {columns.map(column => (
                  <DataTable.Cell key={column.key} align={column.align}>
                    {column.render
                      ? column.render(item, 0, column)
                      : item[column.field as keyof typeof item]}
                  </DataTable.Cell>
                ))}
              </DataTable.Row>
            ))}
          </DataTable.Body>
        </DataTable.Table>
      </DataTable>
    </div>
  ),
};

export const Responsive: Story = {
  args: {
    data: mockData.slice(0, 10),
    columns,
    sortable: true,
    hoverable: true,
    compact: true,
    cellPadding: 'condensed',
  },
  render: args => (
    <div className='w-full max-w-4xl mx-auto'>
      <DataTable {...args}>
        <DataTable.Header>
          <DataTable.Title>Responsive Table</DataTable.Title>
          <DataTable.Subtitle>
            Adapts to different screen sizes
          </DataTable.Subtitle>
        </DataTable.Header>
        <DataTable.Table>
          <DataTable.Head>
            <DataTable.Row>
              {columns.map(column => (
                <DataTable.HeaderCell
                  key={column.key}
                  sortable={column.sortable}
                >
                  {typeof column.header === 'function' ? column.header(column) : column.header}
                </DataTable.HeaderCell>
              ))}
            </DataTable.Row>
          </DataTable.Head>
          <DataTable.Body>
            {args.data.map(item => (
              <DataTable.Row key={item.id}>
                {columns.map(column => (
                  <DataTable.Cell key={column.key} align={column.align}>
                    {column.render
                      ? column.render(item, 0, column)
                      : item[column.field as keyof typeof item]}
                  </DataTable.Cell>
                ))}
              </DataTable.Row>
            ))}
          </DataTable.Body>
        </DataTable.Table>
      </DataTable>
    </div>
  ),
};
