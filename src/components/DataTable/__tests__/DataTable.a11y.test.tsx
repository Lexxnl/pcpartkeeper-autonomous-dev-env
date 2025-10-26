import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DataTable } from '../DataTable';
import { MOCK_ITEMS, ITEM_COLUMNS } from '../../../data/mockData';

describe('DataTable Accessibility', () => {
  test('renders table with proper ARIA roles and labels', () => {
    render(
      <DataTable
        data={MOCK_ITEMS}
        columns={ITEM_COLUMNS}
        aria-label="Items table"
      />
    );

    const table = screen.getByRole('table', { name: /items table/i });
    expect(table).toBeInTheDocument();
    expect(table).toHaveAttribute('aria-rowcount', '10');
    expect(table).toHaveAttribute('aria-colcount', '5');
  });

  test('loading state announces properly', () => {
    render(
      <DataTable
        data={[]}
        columns={ITEM_COLUMNS}
        loading
      />
    );

    const status = screen.getByRole('status');
    expect(status).toBeInTheDocument();
    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  });

  test('focusable elements have visible indicators', () => {
    render(
      <DataTable
        data={MOCK_ITEMS}
        columns={ITEM_COLUMNS}
        sortable
      />
    );

    // Simulate focus on sortable header
    const header = screen.getByRole('columnheader', { name: /name/i });
    expect(header).toHaveAttribute('tabindex', '0'); // Focusable
    // Focus ring would be tested with user-event or css
  });
});
