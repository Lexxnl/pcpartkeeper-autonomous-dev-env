import React, { memo, useMemo, useCallback } from 'react';
import { List } from 'react-window';
import { DataTableBodyProps } from '../../types';
import { useDataTableContext } from '../../DataTableContext';
import DataTableRow from '../Row/DataTableRow';
import cn from '../../utils/classNames';

/**
 * DataTableVirtualizedBody - Virtualized table body for large datasets
 * 
 * ARCHITECTURAL DECISION: This component uses react-window's FixedSizeList for
 * virtualization, which only renders visible rows plus a small buffer (overscan).
 * This dramatically improves performance for large datasets by reducing DOM nodes
 * and memory usage.
 * 
 * PERFORMANCE OPTIMIZATION: The component memoizes the row renderer and item data
 * to prevent unnecessary re-renders. The virtualization ensures only visible rows
 * are rendered, making it suitable for datasets with thousands of items.
 * 
 * ACCESSIBILITY: Maintains proper table semantics by using a virtual table structure
 * with proper ARIA attributes and keyboard navigation support.
 */
interface VirtualizedBodyProps extends DataTableBodyProps {
  height: number;
  itemHeight: number;
  overscan?: number;
}

const DataTableVirtualizedBody = memo<VirtualizedBodyProps>(
  (props) => {
    const {
      height,
      itemHeight,
      overscan = 5,
      className,
      children,
      ...rest
    } = props;

    const context = useDataTableContext();
    const { paginatedData, columns, selectable, isSelected } = context;

    // Memoized item data for each row
    const itemData = useMemo(() => {
      return paginatedData.map((item, index) => ({
        item,
        index,
        columns,
        selectable,
        isSelected,
      }));
    }, [paginatedData, columns, selectable, isSelected]);

    // Memoized row renderer to prevent unnecessary re-renders
    const RowRenderer = useCallback(
      ({ index, style }: { index: number; style: React.CSSProperties }) => {
        const rowData = itemData[index];
        
        if (!rowData) {
          return null;
        }

        const { item, index: rowIndex, columns, selectable, isSelected } = rowData;

        return (
          <div style={style} role="presentation">
            <table
              className="data-table-virtual-row"
              style={{ width: '100%', tableLayout: 'fixed' }}
              role="presentation"
            >
              <tbody>
                <DataTableRow
                  item={item}
                  index={rowIndex}
                  selected={selectable !== 'none' ? isSelected(item, rowIndex) : false}
                />
              </tbody>
            </table>
          </div>
        );
      },
      [itemData]
    );

    // Memoized list props to prevent unnecessary re-renders
    const listProps = useMemo(() => ({
      height,
      itemCount: paginatedData.length,
      itemSize: itemHeight,
      overscanCount: overscan,
      itemData,
    }), [height, paginatedData.length, itemHeight, overscan, itemData]);

    if (paginatedData.length === 0) {
      return (
        <tbody className={cn('data-table-body', className)} {...rest}>
          {children}
        </tbody>
      );
    }

    return (
      <tbody className={cn('data-table-body', 'data-table-body-virtualized', className)} {...rest}>
        <tr>
          <td colSpan={columns?.length || 1} style={{ padding: 0 }}>
            <div className="data-table-virtual-container">
              <List
                {...listProps}
                className="data-table-virtual-list"
              >
                {RowRenderer}
              </List>
            </div>
          </td>
        </tr>
      </tbody>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison for optimal performance
    return (
      prevProps.height === nextProps.height &&
      prevProps.itemHeight === nextProps.itemHeight &&
      prevProps.overscan === nextProps.overscan &&
      prevProps.className === nextProps.className &&
      prevProps.children === nextProps.children
    );
  }
);

DataTableVirtualizedBody.displayName = 'DataTableVirtualizedBody';

export default DataTableVirtualizedBody;
