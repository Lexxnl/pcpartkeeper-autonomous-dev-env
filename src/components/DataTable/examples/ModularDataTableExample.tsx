import React, { useState, useMemo } from 'react';
import DataTable from '../DataTable';
import { useValidation } from '../../../hooks/useValidation';
import { Column } from '../types';
import { logger } from '../../../utils/logger';

/**
 * ModularDataTableExample - Demonstrates the new modular DataTable architecture
 * 
 * This example shows:
 * 1. How to use the new modular DataTable components
 * 2. How to use the new useValidation hook for forms
 * 3. How the specialized hooks improve maintainability
 * 4. How memoization improves performance
 * 
 * ARCHITECTURAL BENEFITS DEMONSTRATED:
 * - Clean separation of concerns
 * - Reusable validation logic
 * - Optimized performance with memoization
 * - Type-safe prop interfaces
 */

interface SampleItem {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive' | 'pending';
}

const sampleData: SampleItem[] = [
  { id: 1, name: 'Gaming Mouse', category: 'Peripherals', price: 79.99, stock: 15, status: 'active' },
  { id: 2, name: 'Mechanical Keyboard', category: 'Peripherals', price: 149.99, stock: 8, status: 'active' },
  { id: 3, name: 'Monitor 27"', category: 'Displays', price: 299.99, stock: 0, status: 'inactive' },
  { id: 4, name: 'Webcam HD', category: 'Peripherals', price: 89.99, stock: 25, status: 'active' },
  { id: 5, name: 'USB-C Hub', category: 'Accessories', price: 49.99, stock: 12, status: 'pending' },
];

const ModularDataTableExample: React.FC = () => {
  const [data, setData] = useState<SampleItem[]>(sampleData);
  const [selectedItems, setSelectedItems] = useState<SampleItem[]>([]);
  const [sortConfig, setSortConfig] = useState<{ column: string; direction: 'asc' | 'desc' } | null>(null);

  // Form state for adding new items
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
  });

  // Use the new useValidation hook for form validation
  const nameValidation = useValidation({
    rules: { required: true, minLength: 2, maxLength: 50 },
    fieldName: 'Item Name',
  });

  const categoryValidation = useValidation({
    rules: { required: true, minLength: 2, maxLength: 30 },
    fieldName: 'Category',
  });

  const priceValidation = useValidation({
    rules: { required: true, number: true, min: 0.01, max: 10000 },
    fieldName: 'Price',
  });

  const stockValidation = useValidation({
    rules: { required: true, number: true, min: 0, max: 1000 },
    fieldName: 'Stock',
  });

  // Column definitions with proper typing
  const columns: Column<SampleItem>[] = useMemo(() => [
    {
      key: 'name',
      header: 'Product Name',
      field: 'name',
      sortable: true,
      render: (item) => (
        <div className="font-medium text-text-primary">
          {item.name}
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      field: 'category',
      sortable: true,
      render: (item) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-secondary text-accent-primary">
          {item.category}
        </span>
      ),
    },
    {
      key: 'price',
      header: 'Price',
      field: 'price',
      sortable: true,
      align: 'end',
      render: (item) => (
        <div className="text-right font-mono">
          ${item.price.toFixed(2)}
        </div>
      ),
    },
    {
      key: 'stock',
      header: 'Stock',
      field: 'stock',
      sortable: true,
      align: 'center',
      render: (item) => (
        <div className={`text-center font-medium ${
          item.stock === 0 ? 'text-action-danger' : 
          item.stock < 10 ? 'text-action-warning' : 
          'text-text-primary'
        }`}>
          {item.stock}
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      field: 'status',
      sortable: true,
      render: (item) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          item.status === 'active' ? 'bg-success-secondary text-success-primary' :
          item.status === 'inactive' ? 'bg-action-danger text-white' :
          'bg-action-warning text-white'
        }`}>
          {item.status}
        </span>
      ),
    },
  ], []);

  // Handle form submission
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all validations pass
    const isFormValid = nameValidation.isValid && 
                       categoryValidation.isValid && 
                       priceValidation.isValid && 
                       stockValidation.isValid;

    if (!isFormValid) {
      alert('Please fix validation errors before adding the item.');
      return;
    }

    const newItemData: SampleItem = {
      id: Math.max(...data.map(item => item.id)) + 1,
      name: newItem.name,
      category: newItem.category,
      price: parseFloat(newItem.price),
      stock: parseInt(newItem.stock),
      status: 'active',
    };

    setData(prev => [...prev, newItemData]);
    setNewItem({ name: '', category: '', price: '', stock: '' });
    
    // Clear validation states
    nameValidation.clearErrors();
    categoryValidation.clearErrors();
    priceValidation.clearErrors();
    stockValidation.clearErrors();
  };

  // Handle item selection
  const handleSelect = (items: SampleItem[], indices: number[]) => {
    setSelectedItems(items);
    logger.log('Selected items:', items);
  };

  // Handle sorting
  const handleSort = (config: { column: string; direction: 'asc' | 'desc' }) => {
    setSortConfig(config);
    logger.log('Sort config:', config);
  };

  // Handle bulk actions
  const handleBulkDelete = () => {
    if (selectedItems.length === 0) return;
    
    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedItems.length} item(s)?`
    );
    
    if (confirmed) {
      const selectedIds = selectedItems.map(item => item.id);
      setData(prev => prev.filter(item => !selectedIds.includes(item.id)));
      setSelectedItems([]);
    }
  };

  return (
    <div className="space-y-layout-md p-layout-md">
      <div className="bg-surface-page rounded-lg border border-border-default p-layout-md">
        <h2 className="text-2xl font-bold text-text-primary mb-4">
          Modular DataTable Example
        </h2>
        <p className="text-text-secondary mb-6">
          This example demonstrates the new modular DataTable architecture with:
        </p>
        <ul className="list-disc list-inside text-text-secondary mb-6 space-y-1">
          <li>Separated Header, Body, Pagination, and Toolbar components</li>
          <li>Specialized hooks for sorting and selection logic</li>
          <li>Deduplicated validation logic with useValidation hook</li>
          <li>Consistent memoization for optimal performance</li>
          <li>Clean, well-typed prop interfaces</li>
        </ul>

        {/* Add Item Form */}
        <div className="mb-layout-md p-layout-sm bg-surface-secondary rounded-lg">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Add New Item (using useValidation hook)
          </h3>
          <form onSubmit={handleAddItem} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-layout-sm">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Item Name
              </label>
              <input
                type="text"
                value={newItem.name}
                onChange={(e) => {
                  setNewItem(prev => ({ ...prev, name: e.target.value }));
                  nameValidation.handleChange(e.target.value);
                }}
                onBlur={nameValidation.handleBlur}
                onFocus={nameValidation.handleFocus}
                className={`w-full px-3 py-2 border rounded-md ${
                  nameValidation.errors.length > 0 && nameValidation.touched
                    ? 'border-action-danger' : 'border-border-default'
                }`}
                placeholder="Enter item name"
              />
              {nameValidation.errors.length > 0 && nameValidation.touched && (
                <p className="text-sm text-action-danger mt-1">
                  {nameValidation.errors[0]}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Category
              </label>
              <input
                type="text"
                value={newItem.category}
                onChange={(e) => {
                  setNewItem(prev => ({ ...prev, category: e.target.value }));
                  categoryValidation.handleChange(e.target.value);
                }}
                onBlur={categoryValidation.handleBlur}
                onFocus={categoryValidation.handleFocus}
                className={`w-full px-3 py-2 border rounded-md ${
                  categoryValidation.errors.length > 0 && categoryValidation.touched
                    ? 'border-action-danger' : 'border-border-default'
                }`}
                placeholder="Enter category"
              />
              {categoryValidation.errors.length > 0 && categoryValidation.touched && (
                <p className="text-sm text-action-danger mt-1">
                  {categoryValidation.errors[0]}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Price
              </label>
              <input
                type="number"
                step="0.01"
                value={newItem.price}
                onChange={(e) => {
                  setNewItem(prev => ({ ...prev, price: e.target.value }));
                  priceValidation.handleChange(e.target.value);
                }}
                onBlur={priceValidation.handleBlur}
                onFocus={priceValidation.handleFocus}
                className={`w-full px-3 py-2 border rounded-md ${
                  priceValidation.errors.length > 0 && priceValidation.touched
                    ? 'border-action-danger' : 'border-border-default'
                }`}
                placeholder="0.00"
              />
              {priceValidation.errors.length > 0 && priceValidation.touched && (
                <p className="text-sm text-action-danger mt-1">
                  {priceValidation.errors[0]}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Stock
              </label>
              <input
                type="number"
                value={newItem.stock}
                onChange={(e) => {
                  setNewItem(prev => ({ ...prev, stock: e.target.value }));
                  stockValidation.handleChange(e.target.value);
                }}
                onBlur={stockValidation.handleBlur}
                onFocus={stockValidation.handleFocus}
                className={`w-full px-3 py-2 border rounded-md ${
                  stockValidation.errors.length > 0 && stockValidation.touched
                    ? 'border-action-danger' : 'border-border-default'
                }`}
                placeholder="0"
              />
              {stockValidation.errors.length > 0 && stockValidation.touched && (
                <p className="text-sm text-action-danger mt-1">
                  {stockValidation.errors[0]}
                </p>
              )}
            </div>

            <div className="md:col-span-2 lg:col-span-4">
              <button
                type="submit"
                className="px-4 py-2 bg-accent-primary text-white rounded-md hover:bg-accent-primary-hover transition-colors"
              >
                Add Item
              </button>
            </div>
          </form>
        </div>

        {/* DataTable with Modular Components */}
        <DataTable
          data={data}
          columns={columns}
          sortable={true}
          selectable="multiple"
          pagination={true}
          striped={true}
          hoverable={true}
          bordered={true}
          onSelect={handleSelect}
          onSort={handleSort}
          getRowId={(item) => item.id}
        />

        {/* Bulk Actions */}
        {selectedItems.length > 0 && (
          <div className="mt-layout-sm p-layout-sm bg-accent-secondary rounded-lg">
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Bulk Actions ({selectedItems.length} items selected)
            </h3>
            <div className="flex gap-2">
              <button
                onClick={handleBulkDelete}
                className="px-4 py-2 bg-action-danger text-white rounded-md hover:bg-action-danger-hover transition-colors"
              >
                Delete Selected
              </button>
              <button
                onClick={() => setSelectedItems([])}
                className="px-4 py-2 bg-surface-tertiary text-text-primary rounded-md hover:bg-surface-quaternary transition-colors"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModularDataTableExample;
