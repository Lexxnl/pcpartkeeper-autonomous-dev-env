import React, { useState } from 'react';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import AddItemButton from '../components/AddItemButton';
import ItemRow from '../components/ItemRow';
import PageHeader from '../components/PageHeader';
import UnderlineNav from '../components/UnderlineNav';
import ButtonShowcase from '../components/ButtonShowcase';
import DataTableShowcase from '../components/DataTableShowcase';
import PageHeaderShowcase from '../components/PageHeaderShowcase';
import AvatarShowcase from '../components/AvatarShowcase';
import UnderlineNavShowcase from '../components/UnderlineNavShowcase';
import ButtonClickCounter from '../components/ButtonClickCounter';
import { DataTableColumn, MockItem } from '../components/DataTableShowcase';
import { logger } from '../utils/logger';

// Type definitions
interface ButtonClicks {
  [key: string]: number;
}

// Mock data for testing
const mockItems: MockItem[] = [
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
    name: 'NVIDIA GeForce RTX 4070',
    category: 'GPU',
    price: 599.99,
    quantity: 1,
    dateAdded: '2024-01-14',
  },
  {
    id: 3,
    name: 'Corsair Vengeance LPX 32GB DDR4',
    category: 'RAM',
    price: 129.99,
    quantity: 2,
    dateAdded: '2024-01-13',
  },
];

// DataTable columns configuration
const dataTableColumns: DataTableColumn[] = [
  {
    key: 'name',
    header: 'Product Name',
    field: 'name',
    sortable: true,
    minWidth: '200px',
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
    render: (item: MockItem, index: number) => `$${item.price.toFixed(2)}`,
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

/**
 * TestingPage - Comprehensive component showcase and testing page
 *
 * Features:
 * - Modular component demonstrations
 * - Interactive testing
 * - Click tracking
 * - Clean, organized sections
 * - Type-safe implementation
 */
function TestingPage(): React.ReactElement {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [buttonClicks, setButtonClicks] = useState<ButtonClicks>({});

  const handleButtonClick = (buttonName: string): void => {
    setButtonClicks(prev => ({
      ...prev,
      [buttonName]: (prev[buttonName] || 0) + 1,
    }));
  };

  const handleAddItem = (): void => {
    logger.log('Add item clicked');
  };

  const handleSearch = (term: string): void => {
    setSearchTerm(term);
  };

  return (
    <div className='min-h-screen bg-surface-page'>
      <div className='container mx-auto px-4 py-8'>
        {/* Button Variants Section */}
        <div className='card-section mb-6'>
          <h2 className='text-2xl font-semibold text-text-primary mb-4'>
            Button Variants
          </h2>
          <ButtonShowcase
            onButtonClick={handleButtonClick}
            buttonClicks={buttonClicks}
          />
        </div>

        {/* AddItemButton Section */}
        <div className='card-section mb-6'>
          <h2 className='text-2xl font-semibold text-text-primary mb-4'>
            AddItemButton Component
          </h2>
          <div className='flex flex-wrap gap-4'>
            <AddItemButton onAddItem={handleAddItem} />
            <div className='w-full sm:w-auto'>
              <AddItemButton onAddItem={handleAddItem} />
            </div>
          </div>
        </div>

        {/* SearchBar Section */}
        <div className='card-section mb-6'>
          <h2 className='text-2xl font-semibold text-text-primary mb-4'>
            SearchBar Component
          </h2>
          <div className='max-w-md'>
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onSearch={handleSearch}
            />
          </div>
        </div>

        {/* DataTable Section */}
        <div className='card-section mb-6'>
          <h2 className='text-2xl font-semibold text-text-primary mb-4'>
            DataTable Component
          </h2>
          <DataTableShowcase
            onButtonClick={handleButtonClick}
            mockItems={mockItems}
            dataTableColumns={dataTableColumns}
          />
        </div>

        {/* ItemRow Section */}
        <div className='card-section mb-6'>
          <h2 className='text-2xl font-semibold text-text-primary mb-4'>
            ItemRow Component
          </h2>
          <div className='overflow-x-auto scrollbar-dark'>
            <table className='min-w-full divide-y divide-border-subtle'>
              <thead className='table-header'>
                <tr>
                  <th className='table-header-cell'>Name</th>
                  <th className='table-header-cell'>Category</th>
                  <th className='table-header-cell'>Price</th>
                  <th className='table-header-cell'>Quantity</th>
                  <th className='table-header-cell'>Date Added</th>
                  <th className='table-header-cell'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-border-subtle'>
                {mockItems.map(item => (
                  <ItemRow key={item.id} item={item} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PageHeader Component Demonstrations */}
        <div className='card-section mb-6'>
          <h2 className='text-2xl font-semibold text-text-primary mb-4'>
            PageHeader Component
          </h2>
          <PageHeaderShowcase />
        </div>

        {/* Avatar Component Demonstrations */}
        <div className='card-section mb-6'>
          <h2 className='text-2xl font-semibold text-text-primary mb-4'>
            Avatar Component
          </h2>
          <AvatarShowcase onButtonClick={handleButtonClick} />
        </div>

        {/* UnderlineNav Examples */}
        <div className='card-section mb-6'>
          <h2 className='text-2xl font-bold text-text-primary mb-6'>
            UnderlineNav Examples
          </h2>
          <UnderlineNavShowcase />
        </div>

        {/* Button Click Counter */}
        <div className='card-section'>
          <ButtonClickCounter buttonClicks={buttonClicks} />
        </div>
      </div>
    </div>
  );
}

export default TestingPage;
