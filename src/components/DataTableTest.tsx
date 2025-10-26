import React from 'react';
import DataTable from './DataTable/DataTable';
import { MOCK_ITEMS, ITEM_COLUMNS } from '../data/mockData';
import { logger } from '../utils/logger';
import ErrorBoundary from './ErrorBoundary';
import ErrorState from './ErrorState';

/**
 * Simple test component to verify the DataTable works
 */
export const DataTableTest: React.FC = () => {
  return (
    <ErrorBoundary fallback={<ErrorState />}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">DataTable Test</h1>
        <DataTable
          data={MOCK_ITEMS.slice(0, 10)}
          columns={ITEM_COLUMNS}
          sortable
          selectable="multiple"
          striped
          hoverable
          bordered
          onSort={(config) => logger.log('Sort:', config)}
          onSelect={(items, indices) => logger.log('Select:', items, indices)}
          onRowClick={(item, index) => logger.log('Row click:', item, index)}
        />
      </div>
    </ErrorBoundary>
  );
};

export default DataTableTest;
