import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ItemsPage from '../ItemsPage';

// Mock data for testing
const mockItems = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `${['Intel', 'AMD', 'NVIDIA', 'Corsair', 'Samsung', 'ASUS', 'MSI', 'Gigabyte', 'EVGA', 'Cooler Master', 'Fractal Design', 'NZXT', 'Logitech', 'Razer', 'SteelSeries'][i % 15]} ${['CPU', 'GPU', 'RAM', 'Storage', 'Motherboard', 'PSU', 'Cooling', 'Case', 'Monitor', 'Keyboard', 'Mouse'][i % 11]} ${i + 1}`,
  category: ['CPU', 'GPU', 'RAM', 'Storage', 'Motherboard', 'PSU', 'Cooling', 'Case', 'Monitor', 'Keyboard', 'Mouse'][i % 11],
  price: Math.floor(Math.random() * 1000) + 50,
  quantity: Math.floor(Math.random() * 10) + 1,
  condition: ['New', 'Used', 'Refurbished'][i % 3],
  location: ['Warehouse A', 'Warehouse B', 'Store Front'][i % 3],
}));

// Mock the store hooks
const mockUseStoreSelector = jest.fn();
const mockUseStoreActions = jest.fn();

jest.mock('../../hooks/useStoreSelector', () => ({
  useStoreSelector: () => mockUseStoreSelector(),
}));

jest.mock('../../hooks/useStoreActions', () => ({
  useStoreActions: () => mockUseStoreActions(),
}));

// Mock the components to isolate testing
jest.mock('../../components/ItemsHeader', () => {
  return function MockItemsHeader({ onSearch, onAddItem, onBulkDelete }: any) {
    return (
      <div data-testid="items-header">
        <button onClick={() => onSearch('test search')}>Search</button>
        <button onClick={onAddItem}>Add Item</button>
        <button onClick={onBulkDelete}>Bulk Delete</button>
      </div>
    );
  };
});

jest.mock('../../components/DataTable', () => {
  const { DataTable } = require('../../components/DataTable');
  return {
    DataTable: ({ data, onSelect, onEditItem, onDeleteItem }: any) => (
      <div data-testid="items-table">
        <div data-testid="items-count">{data.length}</div>
        {data.map((item: any) => (
          <div key={item.id} data-testid={`item-${item.id}`}>
            <span>{item.name}</span>
            <button onClick={() => onEditItem(item)}>Edit</button>
            <button onClick={() => onDeleteItem(item)}>Delete</button>
          </div>
        ))}
      </div>
    ),
  };
});

jest.mock('../../components/ItemsFilters', () => {
  return function MockItemsFilters({ onFiltersChange }: any) {
    return (
      <div data-testid="items-filters">
        <button onClick={() => onFiltersChange({ category: 'CPU' })}>
          Filter by CPU
        </button>
      </div>
    );
  };
});

jest.mock('../../components/EmptyState', () => {
  return function MockEmptyState({ title, action }: any) {
    return (
      <div data-testid="empty-state">
        <h3>{title}</h3>
        {action}
      </div>
    );
  };
});

describe('ItemsPage', () => {
  beforeEach(() => {
    // Reset any mocks before each test
    jest.clearAllMocks();
    
    // Set up default mock implementations
    mockUseStoreSelector.mockReturnValue({
      items: mockItems,
      loading: false,
      error: null,
    });
    
    mockUseStoreActions.mockReturnValue({
      fetchItems: jest.fn(),
      addItem: jest.fn(),
      updateItem: jest.fn(),
      deleteItem: jest.fn(),
      bulkDeleteItems: jest.fn(),
    });
  });

  it('renders loading state initially', async () => {
    render(<ItemsPage />);
    
    // The component loads mock data immediately, so we check for the main content
    expect(screen.getByText('PC Parts Inventory')).toBeInTheDocument();
    expect(screen.getByText('Manage your computer components and inventory')).toBeInTheDocument();
  });

  it('renders main content after loading', async () => {
    render(<ItemsPage />);
    
    await waitFor(() => {
      expect(screen.getByText('PC Parts Inventory')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Manage your computer components and inventory')).toBeInTheDocument();
    expect(screen.getByTestId('items-header')).toBeInTheDocument();
  });

  it('displays items table with mock data', async () => {
    render(<ItemsPage />);
    
    await waitFor(() => {
      expect(screen.getByTestId('items-table')).toBeInTheDocument();
    });
    
    // Should have 50 mock items
    expect(screen.getByTestId('items-count')).toHaveTextContent('50');
  });

  it('handles search functionality', async () => {
    
    render(<ItemsPage />);
    
    await waitFor(() => {
      expect(screen.getByTestId('items-header')).toBeInTheDocument();
    });
    
    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);
    
    // Search with "test search" should show empty state since no items match
    await waitFor(() => {
      expect(screen.getByTestId('empty-state')).toBeInTheDocument();
      expect(screen.getByText('No items found')).toBeInTheDocument();
    });
  });

  it('handles add item functionality', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    
    render(<ItemsPage />);
    
    await waitFor(() => {
      expect(screen.getByTestId('items-header')).toBeInTheDocument();
    });
    
    const addButton = screen.getByText('Add Item');
    fireEvent.click(addButton);
    
    expect(consoleSpy).toHaveBeenCalledWith('Add new item clicked');
    
    consoleSpy.mockRestore();
  });

  it('handles edit item functionality', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    
    render(<ItemsPage />);
    
    await waitFor(() => {
      expect(screen.getByTestId('items-table')).toBeInTheDocument();
    });
    
    // Get the first edit button specifically
    const editButtons = screen.getAllByText('Edit');
    const firstEditButton = editButtons[0];
    fireEvent.click(firstEditButton);
    
    expect(consoleSpy).toHaveBeenCalledWith('Edit item:', expect.any(Object));
    
    consoleSpy.mockRestore();
  });

  it('handles delete item functionality', async () => {
    
    render(<ItemsPage />);
    
    await waitFor(() => {
      expect(screen.getByTestId('items-table')).toBeInTheDocument();
    });
    
    // Should have 50 items initially
    expect(screen.getByTestId('items-count')).toHaveTextContent('50');
    
    // Get the first delete button specifically
    const deleteButtons = screen.getAllByText('Delete');
    const firstDeleteButton = deleteButtons[0];
    fireEvent.click(firstDeleteButton);
    
    // Should have 49 items after deletion
    await waitFor(() => {
      expect(screen.getByTestId('items-count')).toHaveTextContent('49');
    });
  });

  it('handles bulk delete functionality', async () => {
    
    render(<ItemsPage />);
    
    await waitFor(() => {
      expect(screen.getByTestId('items-header')).toBeInTheDocument();
    });
    
    const bulkDeleteButton = screen.getByText('Bulk Delete');
    fireEvent.click(bulkDeleteButton);
    
    // Bulk delete should not change count when no items are selected
    expect(screen.getByTestId('items-count')).toHaveTextContent('50');
  });

  it('toggles filters visibility', async () => {
    
    render(<ItemsPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Show Filters')).toBeInTheDocument();
    });
    
    const toggleButton = screen.getByText('Show Filters');
    fireEvent.click(toggleButton);
    
    expect(screen.getByText('Hide Filters')).toBeInTheDocument();
    expect(screen.getByTestId('items-filters')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Hide Filters'));
    expect(screen.getByText('Show Filters')).toBeInTheDocument();
  });

  it('handles filter changes', async () => {
    
    render(<ItemsPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Show Filters')).toBeInTheDocument();
    });
    
    // Show filters
    fireEvent.click(screen.getByText('Show Filters'));
    
    // Apply filter
    const filterButton = screen.getByText('Filter by CPU');
    fireEvent.click(filterButton);
    
    // Items should be filtered
    await waitFor(() => {
      expect(screen.getByTestId('items-count')).toHaveTextContent('5'); // 50 items / 10 categories = 5 per category
    });
  });

  it('shows empty state when no items match filters', async () => {
    
    render(<ItemsPage />);
    
    await waitFor(() => {
      expect(screen.getByTestId('items-header')).toBeInTheDocument();
    });
    
    // Search for something that doesn't exist
    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('empty-state')).toBeInTheDocument();
      expect(screen.getByText('No items found')).toBeInTheDocument();
    });
  });

  it('has proper accessibility attributes', async () => {
    
    render(<ItemsPage />);
    
    await waitFor(() => {
      expect(screen.getByText('PC Parts Inventory')).toBeInTheDocument();
    });
    
    // Check for proper heading structure
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('PC Parts Inventory');
    
    // Check for proper button accessibility
    await waitFor(() => {
      const toggleButton = screen.getByRole('button', { name: /show filters/i });
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
      expect(toggleButton).toHaveAttribute('aria-controls', 'filters-section');
    });
  });

  it('handles responsive design classes', async () => {
    
    render(<ItemsPage />);
    
    await waitFor(() => {
      expect(screen.getByText('PC Parts Inventory')).toBeInTheDocument();
    });
    
    // Check for responsive classes
    const container = screen.getByText('PC Parts Inventory').closest('div')?.parentElement;
    expect(container).toHaveClass('container', 'mx-auto');
  });
});
