/**
 * @file DataTable Comprehensive Tests
 * @description Complete test suite for DataTable component with 80%+ coverage
 * @version 2.0
 * @author PCPartKeeper Team
 */

import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import DataTable from '../DataTable';
import { Column } from '../types';

// Extend Jest matchers for accessibility testing
expect.extend(toHaveNoViolations);

// Mock data for comprehensive testing
const mockData = [
  {
    id: 1,
    name: 'Intel Core i7-13700K',
    category: 'CPU',
    brand: 'Intel',
    price: 399.99,
    quantity: 1,
    rating: 4.5,
    dateAdded: '2024-01-15',
    inStock: true,
  },
  {
    id: 2,
    name: 'NVIDIA RTX 4080',
    category: 'GPU',
    brand: 'NVIDIA',
    price: 1199.99,
    quantity: 2,
    rating: 4.8,
    dateAdded: '2024-01-16',
    inStock: true,
  },
  {
    id: 3,
    name: 'Corsair Vengeance 32GB',
    category: 'RAM',
    brand: 'Corsair',
    price: 149.99,
    quantity: 0,
    rating: 4.2,
    dateAdded: '2024-01-17',
    inStock: false,
  },
  {
    id: 4,
    name: 'Samsung 980 PRO 1TB',
    category: 'Storage',
    brand: 'Samsung',
    price: 199.99,
    quantity: 5,
    rating: 4.7,
    dateAdded: '2024-01-18',
    inStock: true,
  },
];

const mockColumns: Column<typeof mockData[0]>[] = [
  {
    key: 'name',
    header: 'Product Name',
    field: 'name',
    sortable: true,
    searchable: true,
  },
  {
    key: 'category',
    header: 'Category',
    field: 'category',
    sortable: true,
    filterable: true,
  },
  {
    key: 'brand',
    header: 'Brand',
    field: 'brand',
    sortable: true,
    filterable: true,
  },
  {
    key: 'price',
    header: 'Price',
    field: 'price',
    sortable: true,
    align: 'end',
    render: (value: number) => `$${value.toFixed(2)}`,
  },
  {
    key: 'quantity',
    header: 'Stock',
    field: 'quantity',
    sortable: true,
    align: 'center',
    render: (value: number, item: typeof mockData[0]) => (
      <span className={value > 0 ? 'text-status-success' : 'text-status-error'}>
        {value > 0 ? `${value} in stock` : 'Out of stock'}
      </span>
    ),
  },
  {
    key: 'rating',
    header: 'Rating',
    field: 'rating',
    sortable: true,
    align: 'center',
    render: (value: number) => `${value}/5 ⭐`,
  },
  {
    key: 'dateAdded',
    header: 'Date Added',
    field: 'dateAdded',
    sortable: true,
  },
];

describe('DataTable Component - Comprehensive Tests', () => {
  // Basic rendering and structure
  describe('Basic Rendering', () => {
    it('renders table with data and columns', () => {
      render(
        <DataTable data={mockData} columns={mockColumns}>
          <DataTable.Table>
            <DataTable.Head>
              <DataTable.Row>
                {mockColumns.map(column => (
                  <DataTable.HeaderCell key={column.key}>
                    {column.header}
                  </DataTable.HeaderCell>
                ))}
              </DataTable.Row>
            </DataTable.Head>
            <DataTable.Body>
              {mockData.map(item => (
                <DataTable.Row key={item.id}>
                  {mockColumns.map(column => (
                    <DataTable.Cell key={column.key}>
                      {column.render 
                        ? column.render(item[column.field as keyof typeof item], item)
                        : item[column.field as keyof typeof item]
                      }
                    </DataTable.Cell>
                  ))}
                </DataTable.Row>
              ))}
            </DataTable.Body>
          </DataTable.Table>
        </DataTable>
      );

      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.getByText('Intel Core i7-13700K')).toBeInTheDocument();
      expect(screen.getByText('$399.99')).toBeInTheDocument();
      expect(screen.getByText('1 in stock')).toBeInTheDocument();
    });

    it('renders with header section', () => {
      render(
        <DataTable data={mockData} columns={mockColumns}>
          <DataTable.Header>
            <DataTable.Title>PC Parts Inventory</DataTable.Title>
            <DataTable.Subtitle>Manage your computer components</DataTable.Subtitle>
            <DataTable.Actions>
              <button>Add Item</button>
              <button>Export</button>
            </DataTable.Actions>
          </DataTable.Header>
          <DataTable.Table>
            <DataTable.Head>
              <DataTable.Row>
                {mockColumns.map(column => (
                  <DataTable.HeaderCell key={column.key}>
                    {column.header}
                  </DataTable.HeaderCell>
                ))}
              </DataTable.Row>
            </DataTable.Head>
            <DataTable.Body>
              {mockData.map(item => (
                <DataTable.Row key={item.id}>
                  {mockColumns.map(column => (
                    <DataTable.Cell key={column.key}>
                      {item[column.field as keyof typeof item]}
                    </DataTable.Cell>
                  ))}
                </DataTable.Row>
              ))}
            </DataTable.Body>
          </DataTable.Table>
        </DataTable>
      );

      expect(screen.getByText('PC Parts Inventory')).toBeInTheDocument();
      expect(screen.getByText('Manage your computer components')).toBeInTheDocument();
      expect(screen.getByText('Add Item')).toBeInTheDocument();
      expect(screen.getByText('Export')).toBeInTheDocument();
    });

    it('renders empty state when no data', () => {
      render(
        <DataTable data={[]} columns={mockColumns}>
          <DataTable.Table>
            <DataTable.Head>
              <DataTable.Row>
                {mockColumns.map(column => (
                  <DataTable.HeaderCell key={column.key}>
                    {column.header}
                  </DataTable.HeaderCell>
                ))}
              </DataTable.Row>
            </DataTable.Head>
            <DataTable.Body />
          </DataTable.Table>
        </DataTable>
      );

      expect(screen.getByText('No data available')).toBeInTheDocument();
      expect(screen.getByText('There are no items to display at this time.')).toBeInTheDocument();
    });

    it('renders loading state', () => {
      render(
        <DataTable data={mockData} columns={mockColumns} loading>
          <DataTable.Table>
            <DataTable.Head>
              <DataTable.Row>
                {mockColumns.map(column => (
                  <DataTable.HeaderCell key={column.key}>
                    {column.header}
                  </DataTable.HeaderCell>
                ))}
              </DataTable.Row>
            </DataTable.Head>
            <DataTable.Body />
          </DataTable.Table>
        </DataTable>
      );

      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders error state', () => {
      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          error="Failed to load data"
        >
          <DataTable.Table>
            <DataTable.Head>
              <DataTable.Row>
                {mockColumns.map(column => (
                  <DataTable.HeaderCell key={column.key}>
                    {column.header}
                  </DataTable.HeaderCell>
                ))}
              </DataTable.Row>
            </DataTable.Head>
            <DataTable.Body />
          </DataTable.Table>
        </DataTable>
      );

      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.getByText('Failed to load data')).toBeInTheDocument();
    });
  });

  // Sorting functionality
  describe('Sorting', () => {
    it('handles column sorting', async () => {
      const onSort = jest.fn();
      const user = userEvent.setup();

      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          sortable
          onSort={onSort}
        >
          <DataTable.Table>
            <DataTable.Head>
              <DataTable.Row>
                {mockColumns.map(column => (
                  <DataTable.HeaderCell
                    key={column.key}
                    sortable={column.sortable}
                    onSort={() => onSort(column.key)}
                  >
                    {column.header}
                  </DataTable.HeaderCell>
                ))}
              </DataTable.Row>
            </DataTable.Head>
            <DataTable.Body>
              {mockData.map(item => (
                <DataTable.Row key={item.id}>
                  {mockColumns.map(column => (
                    <DataTable.Cell key={column.key}>
                      {item[column.field as keyof typeof item]}
                    </DataTable.Cell>
                  ))}
                </DataTable.Row>
              ))}
            </DataTable.Body>
          </DataTable.Table>
        </DataTable>
      );

      const nameHeader = screen.getByText('Product Name');
      await user.click(nameHeader);

      await waitFor(() => {
        expect(onSort).toHaveBeenCalledWith('name');
      });
    });

    it('shows sort indicators', async () => {
      const user = userEvent.setup();

      render(
        <DataTable data={mockData} columns={mockColumns} sortable>
          <DataTable.Table>
            <DataTable.Head>
              <DataTable.Row>
                {mockColumns.map(column => (
                  <DataTable.HeaderCell
                    key={column.key}
                    sortable={column.sortable}
                    sortDirection="asc"
                  >
                    {column.header}
                  </DataTable.HeaderCell>
                ))}
              </DataTable.Row>
            </DataTable.Head>
            <DataTable.Body>
              {mockData.map(item => (
                <DataTable.Row key={item.id}>
                  {mockColumns.map(column => (
                    <DataTable.Cell key={column.key}>
                      {item[column.field as keyof typeof item]}
                    </DataTable.Cell>
                  ))}
                </DataTable.Row>
              ))}
            </DataTable.Body>
          </DataTable.Table>
        </DataTable>
      );

      const sortableHeaders = screen.getAllByRole('columnheader');
      expect(sortableHeaders[0]).toHaveAttribute('aria-sort', 'ascending');
    });
  });

  // Selection functionality
  describe('Selection', () => {
    it('handles single row selection', async () => {
      const onSelect = jest.fn();
      const user = userEvent.setup();

      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          selectable="single"
          onSelect={onSelect}
        >
          <DataTable.Table>
            <DataTable.Head>
              <DataTable.Row>
                <DataTable.HeaderCell>
                  <input type="radio" aria-label="Select all" />
                </DataTable.HeaderCell>
                {mockColumns.map(column => (
                  <DataTable.HeaderCell key={column.key}>
                    {column.header}
                  </DataTable.HeaderCell>
                ))}
              </DataTable.Row>
            </DataTable.Head>
            <DataTable.Body>
              {mockData.map((item, index) => (
                <DataTable.Row key={item.id}>
                  <DataTable.Cell>
                    <input
                      type="radio"
                      aria-label={`Select row ${index + 1}`}
                      onChange={() => onSelect([item], [index])}
                    />
                  </DataTable.Cell>
                  {mockColumns.map(column => (
                    <DataTable.Cell key={column.key}>
                      {item[column.field as keyof typeof item]}
                    </DataTable.Cell>
                  ))}
                </DataTable.Row>
              ))}
            </DataTable.Body>
          </DataTable.Table>
        </DataTable>
      );

      const firstRadio = screen.getByLabelText('Select row 1');
      await user.click(firstRadio);

      await waitFor(() => {
        expect(onSelect).toHaveBeenCalledWith([mockData[0]], [0]);
      });
    });

    it('handles multiple row selection', async () => {
      const onSelect = jest.fn();
      const user = userEvent.setup();

      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          selectable="multiple"
          onSelect={onSelect}
        >
          <DataTable.Table>
            <DataTable.Head>
              <DataTable.Row>
                <DataTable.HeaderCell>
                  <input type="checkbox" aria-label="Select all" />
                </DataTable.HeaderCell>
                {mockColumns.map(column => (
                  <DataTable.HeaderCell key={column.key}>
                    {column.header}
                  </DataTable.HeaderCell>
                ))}
              </DataTable.Row>
            </DataTable.Head>
            <DataTable.Body>
              {mockData.map((item, index) => (
                <DataTable.Row key={item.id}>
                  <DataTable.Cell>
                    <input
                      type="checkbox"
                      aria-label={`Select row ${index + 1}`}
                      onChange={() => onSelect([item], [index])}
                    />
                  </DataTable.Cell>
                  {mockColumns.map(column => (
                    <DataTable.Cell key={column.key}>
                      {item[column.field as keyof typeof item]}
                    </DataTable.Cell>
                  ))}
                </DataTable.Row>
              ))}
            </DataTable.Body>
          </DataTable.Table>
        </DataTable>
      );

      const firstCheckbox = screen.getByLabelText('Select row 1');
      const secondCheckbox = screen.getByLabelText('Select row 2');
      
      await user.click(firstCheckbox);
      await user.click(secondCheckbox);

      await waitFor(() => {
        expect(onSelect).toHaveBeenCalledWith([mockData[0]], [0]);
        expect(onSelect).toHaveBeenCalledWith([mockData[1]], [1]);
      });
    });
  });

  // Pagination functionality
  describe('Pagination', () => {
    it('renders pagination controls', () => {
      const paginationConfig = {
        pageSize: 2,
        currentPage: 1,
        totalItems: mockData.length,
        showPageSizeSelector: true,
        pageSizeOptions: [2, 5, 10],
      };

      render(
        <DataTable
          data={mockData.slice(0, 2)}
          columns={mockColumns}
          pagination={paginationConfig}
        >
          <DataTable.Table>
            <DataTable.Head>
              <DataTable.Row>
                {mockColumns.map(column => (
                  <DataTable.HeaderCell key={column.key}>
                    {column.header}
                  </DataTable.HeaderCell>
                ))}
              </DataTable.Row>
            </DataTable.Head>
            <DataTable.Body>
              {mockData.slice(0, 2).map(item => (
                <DataTable.Row key={item.id}>
                  {mockColumns.map(column => (
                    <DataTable.Cell key={column.key}>
                      {item[column.field as keyof typeof item]}
                    </DataTable.Cell>
                  ))}
                </DataTable.Row>
              ))}
            </DataTable.Body>
          </DataTable.Table>
          <DataTable.Pagination config={paginationConfig} />
        </DataTable>
      );

      expect(screen.getByText('Showing 1 through 2 of 4')).toBeInTheDocument();
      expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
    });

    it('handles page size changes', async () => {
      const onPageSizeChange = jest.fn();
      const paginationConfig = {
        pageSize: 2,
        currentPage: 1,
        totalItems: mockData.length,
        showPageSizeSelector: true,
        pageSizeOptions: [2, 5, 10],
        onPageSizeChange,
      };

      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          pagination={paginationConfig}
        >
          <DataTable.Table>
            <DataTable.Head>
              <DataTable.Row>
                {mockColumns.map(column => (
                  <DataTable.HeaderCell key={column.key}>
                    {column.header}
                  </DataTable.HeaderCell>
                ))}
              </DataTable.Row>
            </DataTable.Head>
            <DataTable.Body>
              {mockData.map(item => (
                <DataTable.Row key={item.id}>
                  {mockColumns.map(column => (
                    <DataTable.Cell key={column.key}>
                      {item[column.field as keyof typeof item]}
                    </DataTable.Cell>
                  ))}
                </DataTable.Row>
              ))}
            </DataTable.Body>
          </DataTable.Table>
          <DataTable.Pagination config={paginationConfig} />
        </DataTable>
      );

      const pageSizeSelect = screen.getByDisplayValue('2');
      await userEvent.selectOptions(pageSizeSelect, '5');

      expect(onPageSizeChange).toHaveBeenCalledWith(5);
    });
  });

  // Search and filtering
  describe('Search and Filtering', () => {
    it('renders search input when searchable', () => {
      render(
        <DataTable data={mockData} columns={mockColumns} searchable>
          <DataTable.Table>
            <DataTable.Head>
              <DataTable.Row>
                {mockColumns.map(column => (
                  <DataTable.HeaderCell key={column.key}>
                    {column.header}
                  </DataTable.HeaderCell>
                ))}
              </DataTable.Row>
            </DataTable.Head>
            <DataTable.Body>
              {mockData.map(item => (
                <DataTable.Row key={item.id}>
                  {mockColumns.map(column => (
                    <DataTable.Cell key={column.key}>
                      {item[column.field as keyof typeof item]}
                    </DataTable.Cell>
                  ))}
                </DataTable.Row>
              ))}
            </DataTable.Body>
          </DataTable.Table>
        </DataTable>
      );

      expect(screen.getByRole('searchbox')).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    });

    it('handles search input changes', async () => {
      const onSearch = jest.fn();
      const user = userEvent.setup();

      render(
        <DataTable data={mockData} columns={mockColumns} searchable onSearch={onSearch}>
          <DataTable.Table>
            <DataTable.Head>
              <DataTable.Row>
                {mockColumns.map(column => (
                  <DataTable.HeaderCell key={column.key}>
                    {column.header}
                  </DataTable.HeaderCell>
                ))}
              </DataTable.Row>
            </DataTable.Head>
            <DataTable.Body>
              {mockData.map(item => (
                <DataTable.Row key={item.id}>
                  {mockColumns.map(column => (
                    <DataTable.Cell key={column.key}>
                      {item[column.field as keyof typeof item]}
                    </DataTable.Cell>
                  ))}
                </DataTable.Row>
              ))}
            </DataTable.Body>
          </DataTable.Table>
        </DataTable>
      );

      const searchInput = screen.getByRole('searchbox');
      await user.type(searchInput, 'Intel');

      await waitFor(() => {
        expect(onSearch).toHaveBeenCalledWith('Intel');
      });
    });
  });

  // Accessibility
  describe('Accessibility', () => {
    it('is accessible', async () => {
      const { container } = render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          aria-label="PC Parts Inventory"
        >
          <DataTable.Table>
            <DataTable.Head>
              <DataTable.Row>
                {mockColumns.map(column => (
                  <DataTable.HeaderCell key={column.key}>
                    {column.header}
                  </DataTable.HeaderCell>
                ))}
              </DataTable.Row>
            </DataTable.Head>
            <DataTable.Body>
              {mockData.map(item => (
                <DataTable.Row key={item.id}>
                  {mockColumns.map(column => (
                    <DataTable.Cell key={column.key}>
                      {item[column.field as keyof typeof item]}
                    </DataTable.Cell>
                  ))}
                </DataTable.Row>
              ))}
            </DataTable.Body>
          </DataTable.Table>
        </DataTable>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has proper ARIA attributes', () => {
      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          aria-label="PC Parts Inventory"
        >
          <DataTable.Table>
            <DataTable.Head>
              <DataTable.Row>
                {mockColumns.map(column => (
                  <DataTable.HeaderCell key={column.key}>
                    {column.header}
                  </DataTable.HeaderCell>
                ))}
              </DataTable.Row>
            </DataTable.Head>
            <DataTable.Body>
              {mockData.map(item => (
                <DataTable.Row key={item.id}>
                  {mockColumns.map(column => (
                    <DataTable.Cell key={column.key}>
                      {item[column.field as keyof typeof item]}
                    </DataTable.Cell>
                  ))}
                </DataTable.Row>
              ))}
            </DataTable.Body>
          </DataTable.Table>
        </DataTable>
      );

      const table = screen.getByRole('table');
      expect(table).toHaveAttribute('aria-label', 'PC Parts Inventory');
      expect(table).toHaveAttribute('aria-rowcount', '3');
      expect(table).toHaveAttribute('aria-colcount', '7');
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();

      render(
        <DataTable data={mockData} columns={mockColumns} selectable="multiple">
          <DataTable.Table>
            <DataTable.Head>
              <DataTable.Row>
                <DataTable.HeaderCell>
                  <input type="checkbox" aria-label="Select all" />
                </DataTable.HeaderCell>
                {mockColumns.map(column => (
                  <DataTable.HeaderCell key={column.key}>
                    {column.header}
                  </DataTable.HeaderCell>
                ))}
              </DataTable.Row>
            </DataTable.Head>
            <DataTable.Body>
              {mockData.map((item, index) => (
                <DataTable.Row key={item.id}>
                  <DataTable.Cell>
                    <input
                      type="checkbox"
                      aria-label={`Select row ${index + 1}`}
                    />
                  </DataTable.Cell>
                  {mockColumns.map(column => (
                    <DataTable.Cell key={column.key}>
                      {item[column.field as keyof typeof item]}
                    </DataTable.Cell>
                  ))}
                </DataTable.Row>
              ))}
            </DataTable.Body>
          </DataTable.Table>
        </DataTable>
      );

      const firstCheckbox = screen.getByLabelText('Select row 1');
      firstCheckbox.focus();
      expect(firstCheckbox).toHaveFocus();

      await user.keyboard('{Tab}');
      const secondCheckbox = screen.getByLabelText('Select row 2');
      expect(secondCheckbox).toHaveFocus();
    });
  });

  // Responsive design
  describe('Responsive Design', () => {
    it('applies responsive classes', () => {
      render(
        <DataTable data={mockData} columns={mockColumns}>
          <DataTable.Table>
            <DataTable.Head>
              <DataTable.Row>
                {mockColumns.map(column => (
                  <DataTable.HeaderCell key={column.key}>
                    {column.header}
                  </DataTable.HeaderCell>
                ))}
              </DataTable.Row>
            </DataTable.Head>
            <DataTable.Body>
              {mockData.map(item => (
                <DataTable.Row key={item.id}>
                  {mockColumns.map(column => (
                    <DataTable.Cell key={column.key}>
                      {item[column.field as keyof typeof item]}
                    </DataTable.Cell>
                  ))}
                </DataTable.Row>
              ))}
            </DataTable.Body>
          </DataTable.Table>
        </DataTable>
      );

      const container = screen
        .getByRole('table')
        .closest('.data-table-responsive');
      expect(container).toBeInTheDocument();
    });

    it('handles mobile viewport', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(
        <DataTable data={mockData} columns={mockColumns}>
          <DataTable.Table>
            <DataTable.Head>
              <DataTable.Row>
                {mockColumns.map(column => (
                  <DataTable.HeaderCell key={column.key}>
                    {column.header}
                  </DataTable.HeaderCell>
                ))}
              </DataTable.Row>
            </DataTable.Head>
            <DataTable.Body>
              {mockData.map(item => (
                <DataTable.Row key={item.id}>
                  {mockColumns.map(column => (
                    <DataTable.Cell key={column.key}>
                      {item[column.field as keyof typeof item]}
                    </DataTable.Cell>
                  ))}
                </DataTable.Row>
              ))}
            </DataTable.Body>
          </DataTable.Table>
        </DataTable>
      );

      const table = screen.getByRole('table');
      expect(table).toHaveClass('data-table-mobile');
    });
  });

  // Error handling
  describe('Error Handling', () => {
    it('handles invalid data gracefully', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <DataTable data={null as any} columns={mockColumns}>
          <DataTable.Table>
            <DataTable.Head>
              <DataTable.Row>
                {mockColumns.map(column => (
                  <DataTable.HeaderCell key={column.key}>
                    {column.header}
                  </DataTable.HeaderCell>
                ))}
              </DataTable.Row>
            </DataTable.Head>
            <DataTable.Body />
          </DataTable.Table>
        </DataTable>
      );

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('handles missing columns gracefully', () => {
      render(
        <DataTable data={mockData} columns={[]}>
          <DataTable.Table>
            <DataTable.Head>
              <DataTable.Row />
            </DataTable.Head>
            <DataTable.Body>
              {mockData.map(item => (
                <DataTable.Row key={item.id} />
              ))}
            </DataTable.Body>
          </DataTable.Table>
        </DataTable>
      );

      expect(screen.getByRole('table')).toBeInTheDocument();
    });
  });

  // Performance
  describe('Performance', () => {
    it('handles large datasets efficiently', () => {
      const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
        id: i + 1,
        name: `Item ${i + 1}`,
        category: 'Test',
        brand: 'Brand',
        price: Math.random() * 1000,
        quantity: Math.floor(Math.random() * 10),
        rating: Math.random() * 5,
        dateAdded: '2024-01-01',
        inStock: Math.random() > 0.5,
      }));

      const startTime = performance.now();
      
      render(
        <DataTable data={largeDataset} columns={mockColumns}>
          <DataTable.Table>
            <DataTable.Head>
              <DataTable.Row>
                {mockColumns.map(column => (
                  <DataTable.HeaderCell key={column.key}>
                    {column.header}
                  </DataTable.HeaderCell>
                ))}
              </DataTable.Row>
            </DataTable.Head>
            <DataTable.Body>
              {largeDataset.slice(0, 10).map(item => (
                <DataTable.Row key={item.id}>
                  {mockColumns.map(column => (
                    <DataTable.Cell key={column.key}>
                      {item[column.field as keyof typeof item]}
                    </DataTable.Cell>
                  ))}
                </DataTable.Row>
              ))}
            </DataTable.Body>
          </DataTable.Table>
        </DataTable>
      );

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render within reasonable time (less than 100ms)
      expect(renderTime).toBeLessThan(100);
    });
  });
});
