import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataTable from '../index';

// Mock data for testing
const mockData = [
  { id: 1, name: 'Intel Core i7', category: 'CPU', price: 299.99, inStock: true },
  { id: 2, name: 'NVIDIA RTX 3080', category: 'GPU', price: 699.99, inStock: false },
  { id: 3, name: 'Corsair Vengeance', category: 'RAM', price: 149.99, inStock: true },
];

const mockColumns = [
  { key: 'name', header: 'Name', field: 'name', sortable: true, width: 'auto' },
  { key: 'category', header: 'Category', field: 'category', sortable: true, width: 'auto' },
  { key: 'price', header: 'Price', field: 'price', sortable: true, width: 'auto' },
  { key: 'inStock', header: 'In Stock', field: 'inStock', sortable: true, width: 'auto' },
];

describe('DataTable Integration Tests', () => {
  it('renders table with data', () => {
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
    expect(screen.getByText('Intel Core i7')).toBeInTheDocument();
    expect(screen.getByText('NVIDIA RTX 3080')).toBeInTheDocument();
    expect(screen.getByText('Corsair Vengeance')).toBeInTheDocument();
  });

  it('handles sorting functionality', () => {
    const onSort = jest.fn();
    
    render(
      <DataTable data={mockData} columns={mockColumns} sortable onSort={onSort}>
        <DataTable.Table>
          <DataTable.Head>
            <DataTable.Row>
              {mockColumns.map(column => (
                <DataTable.HeaderCell key={column.key} column={column} sortable onSort={onSort}>
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
    
    expect(onSort).toHaveBeenCalledWith('name');
  });

  it('handles row selection', () => {
    const onSelect = jest.fn();
    
    render(
      <DataTable data={mockData} columns={mockColumns} selectable="multiple" onSelect={onSelect}>
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

    // Selection functionality would be tested here
    // This is a placeholder for the actual selection implementation
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(
      <DataTable data={[]} columns={mockColumns} loading>
        <DataTable.Table />
      </DataTable>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows empty state', () => {
    render(
      <DataTable data={[]} columns={mockColumns} empty>
        <DataTable.Table />
      </DataTable>
    );

    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('shows error state', () => {
    render(
      <DataTable data={[]} columns={mockColumns} error="Failed to load data">
        <DataTable.Table />
      </DataTable>
    );

    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Failed to load data')).toBeInTheDocument();
  });

  it('handles keyboard navigation', () => {
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
    expect(table).toHaveAttribute('tabIndex', '0');
  });

  it('has proper accessibility attributes', () => {
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
    expect(table).toHaveAttribute('aria-label', 'Data table');
    expect(table).toHaveAttribute('aria-rowcount', '3');
    expect(table).toHaveAttribute('aria-colcount', '4');
  });

  it('handles responsive design', () => {
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
    const wrapper = table.closest('.data-table-mobile');
    expect(wrapper).toHaveClass('data-table-mobile');
  });
});
