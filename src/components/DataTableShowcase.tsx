import React from 'react';
import Button from './Button';
import DataTable from './DataTable/DataTable';  // Use the canonical version with auto-rendering
import { PlusIcon, DownloadIcon } from './icons';
import type { Column } from './DataTable/types';  // Import the proper Column type
import { logger } from '../utils/logger';

export interface MockItem {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  dateAdded: string;
}

export type DataTableColumn = Column<MockItem>;

export interface DataTableShowcaseProps {
  onButtonClick: (buttonName: string) => void;
  mockItems: MockItem[];
  dataTableColumns: DataTableColumn[];
}

/**
 * DataTableShowcase - Comprehensive DataTable component demonstrations
 *
 * Features:
 * - Basic DataTable
 * - Bordered with selection
 * - Compact view
 * - Legacy comparison
 * - Various configurations
 */
export const DataTableShowcase: React.FC<DataTableShowcaseProps> = ({
  onButtonClick,
  mockItems,
  dataTableColumns,
}) => {
  logger.log('DataTableShowcase props:', {
    itemsCount: mockItems?.length,
    columnsCount: dataTableColumns?.length,
    isArray: Array.isArray(dataTableColumns),
  });

  // Safety check for dataTableColumns
  if (!dataTableColumns || !Array.isArray(dataTableColumns)) {
    logger.error('DataTableShowcase render error:', { dataTableColumns });
    return (
      <div className='text-center py-8'>
        <div className='text-status-error'>Error: Invalid columns configuration</div>
      </div>
    );
  }

  return (
    <div className='space-y-8'>
      {/* Basic DataTable */}
      <div>
        <h3 className='text-lg font-medium text-text-secondary mb-3'>
          Basic DataTable
        </h3>
        <DataTable
          data={mockItems}
          columns={dataTableColumns}
          sortable
          hoverable
          compact={true}
          cellPadding="condensed"
        >
          <DataTable.Header>
            <DataTable.Title>PC Parts Inventory</DataTable.Title>
            <DataTable.Subtitle>
              Manage your computer components and inventory
            </DataTable.Subtitle>
            <DataTable.Actions>
              <Button
                size='small'
                onClick={() => onButtonClick('DataTable-Add')}
              >
                <PlusIcon className='w-4 h-4 mr-2' />
                Add Item
              </Button>
              <Button
                variant='default'
                size='small'
                onClick={() => onButtonClick('DataTable-Export')}
              >
                <DownloadIcon className='w-4 h-4 mr-2' />
                Export
              </Button>
            </DataTable.Actions>
          </DataTable.Header>
          <DataTable.Table>
            <DataTable.Head>
              <DataTable.Row>
                {dataTableColumns.map((column) => (
                  <DataTable.HeaderCell key={column.key}>
                    {column.header}
                  </DataTable.HeaderCell>
                ))}
              </DataTable.Row>
            </DataTable.Head>
            <DataTable.Body />
          </DataTable.Table>
        </DataTable>
      </div>

      {/* Bordered DataTable with Selection */}
      <div>
        <h3 className='text-lg font-medium text-text-secondary mb-3'>
          Bordered DataTable with Selection
        </h3>
        <DataTable
          data={mockItems}
          columns={dataTableColumns}
          sortable
          selectable='multiple'
          bordered
          hoverable
          compact={true}
          cellPadding="condensed"
        >
          <DataTable.Header>
            <DataTable.Title>Selectable Items</DataTable.Title>
            <DataTable.Subtitle>
              Click checkboxes to select items
            </DataTable.Subtitle>
          </DataTable.Header>
          <DataTable.Table>
            <DataTable.Head>
              <DataTable.Row>
                {dataTableColumns.map((column) => (
                  <DataTable.HeaderCell key={column.key}>
                    {column.header}
                  </DataTable.HeaderCell>
                ))}
              </DataTable.Row>
            </DataTable.Head>
            <DataTable.Body />
          </DataTable.Table>
        </DataTable>
      </div>

      {/* Compact DataTable */}
      <div>
        <h3 className='text-lg font-medium text-text-secondary mb-3'>
          Compact DataTable
        </h3>
        <DataTable
          data={mockItems}
          columns={dataTableColumns}
          sortable
          compact
          cellPadding='condensed'
        >
          <DataTable.Header>
            <DataTable.Title>Compact View</DataTable.Title>
            <DataTable.Subtitle>
              Dense layout for maximum data visibility
            </DataTable.Subtitle>
          </DataTable.Header>
          <DataTable.Table>
            <DataTable.Head>
              <DataTable.Row>
                {dataTableColumns.map((column) => (
                  <DataTable.HeaderCell key={column.key}>
                    {column.header}
                  </DataTable.HeaderCell>
                ))}
              </DataTable.Row>
            </DataTable.Head>
            <DataTable.Body />
          </DataTable.Table>
        </DataTable>
      </div>
    </div>
  );
};

export default DataTableShowcase;
