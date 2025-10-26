import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import DataTable from '../index';
import { Column } from '../types';

expect.extend(toHaveNoViolations);

// Mock data for testing
const mockData = [
  {
    id: 1,
    name: 'Intel Core i7-13700K',
    category: 'CPU',
    price: 399.99,
    quantity: 1,
    dateAdded: '2024-01-15',
  },
  {
    id: 2,
    name: 'NVIDIA RTX 4080',
    category: 'GPU',
    price: 1199.99,
    quantity: 1,
    dateAdded: '2024-01-16',
  },
  {
    id: 3,
    name: 'Corsair Vengeance 32GB',
    category: 'RAM',
    price: 149.99,
    quantity: 2,
    dateAdded: '2024-01-17',
  },
];

const mockColumns: Column<(typeof mockData)[0]>[] = [
  {
    key: 'name',
    header: 'Name',
    field: 'name',
    sortable: true,
  },
  {
    key: 'category',
    header: 'Category',
    field: 'category',
    sortable: true,
  },
  {
    key: 'price',
    header: 'Price',
    field: 'price',
    sortable: true,
    align: 'end',
  },
  {
    key: 'quantity',
    header: 'Quantity',
    field: 'quantity',
    sortable: true,
    align: 'center',
  },
  {
    key: 'dateAdded',
    header: 'Date Added',
    field: 'dateAdded',
    sortable: true,
  },
];

describe('DataTable', () => {
  describe('Basic Rendering', () => {
    it('renders with data and columns', () => {
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

      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.getByText('Intel Core i7-13700K')).toBeInTheDocument();
      expect(screen.getByText('NVIDIA RTX 4080')).toBeInTheDocument();
      expect(screen.getByText('Corsair Vengeance 32GB')).toBeInTheDocument();
    });

    it('renders with header section', () => {
      render(
        <DataTable data={mockData} columns={mockColumns}>
          <DataTable.Header>
            <DataTable.Title>PC Parts Inventory</DataTable.Title>
            <DataTable.Subtitle>
              Manage your computer components
            </DataTable.Subtitle>
            <DataTable.Actions>
              <button>Add Item</button>
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
      expect(
        screen.getByText('Manage your computer components')
      ).toBeInTheDocument();
      expect(screen.getByText('Add Item')).toBeInTheDocument();
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
      expect(
        screen.getByText('There are no items to display at this time.')
      ).toBeInTheDocument();
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
    });

    it('renders error state', () => {
      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          error='Failed to load data'
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

  describe('Sorting', () => {
    it('handles column sorting', async () => {
      const onSort = jest.fn();

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

      const nameHeader = screen.getByText('Name');
      fireEvent.click(nameHeader);

      await waitFor(() => {
        expect(onSort).toHaveBeenCalledWith('name');
      });
    });
  });

  describe('Selection', () => {
    it('handles row selection', async () => {
      const onSelect = jest.fn();

      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          selectable='multiple'
          onSelect={onSelect}
        >
          <DataTable.Table>
            <DataTable.Head>
              <DataTable.Row>
                <DataTable.HeaderCell>
                  <input type='checkbox' aria-label='Select all' />
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
                      type='checkbox'
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
      fireEvent.click(firstCheckbox);

      await waitFor(() => {
        expect(onSelect).toHaveBeenCalledWith([mockData[0]], [0]);
      });
    });
  });

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

      expect(screen.getByText('Showing 1 through 2 of 3')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('is accessible', async () => {
      const { container } = render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          aria-label='PC Parts Inventory'
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
          aria-label='PC Parts Inventory'
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
      expect(table).toHaveAttribute('aria-label', 'Data table');
      expect(table).toHaveAttribute('aria-rowcount', '3');
      expect(table).toHaveAttribute('aria-colcount', '5');
    });
  });

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
  });

  describe('Custom Styling', () => {
    it('applies custom className', () => {
      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          className='custom-table'
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

      const container = screen.getByRole('table').closest('.custom-table');
      expect(container).toBeInTheDocument();
    });

    it('applies variant classes', async () => {
      render(
        <DataTable data={mockData} columns={mockColumns} striped hoverable>
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

      await waitFor(() => {
        const table = screen.getByRole('table');
        expect(table).toHaveClass('data-table-table-striped');
      });
    });
  });

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
  });
});
