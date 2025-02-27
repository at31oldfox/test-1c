import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';

import { DataItem } from './Table.types';
import { getTableBody, getTableHead } from './Table.utils';

export const useTable = (
  data: DataItem[],
  tableContainerRef: React.RefObject<HTMLDivElement | null>,
  columns: ColumnDef<DataItem>[]
) => {
  const table = useReactTable({
    data,
    columns,
    //state: { sorting },
    //onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const { rows } = table.getRowModel();

  const virtualizer = useVirtualizer({
    count: rows?.length,
    estimateSize: () => 70,
    getScrollElement: () => tableContainerRef.current,
    //measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== 'undefined' &&
      navigator.userAgent.indexOf('Firefox') === -1
        ? (element) => {
            if (!element) return 70;
            return element.getBoundingClientRect().height;
          }
        : undefined,
    overscan: 5,
  });

  if (!data) {
    return {
      tableBody: [],
      tableHead: [],
      columns,
      table,
    };
  }

  const tableHead = getTableHead(table);
  const tableBody = getTableBody(table, virtualizer);

  return { tableBody, tableHead, columns, table, virtualizer };
};
