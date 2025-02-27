import { flexRender, Row, Table } from '@tanstack/react-table';
import { Virtualizer } from '@tanstack/react-virtual';

import { HeaderCell } from './components/HeaderCell/HeaderCell';
import { DataItem, ICellMeta } from './Table.types';
import styles from './TableUtils.module.css';

export const getTableBody = (
  table: Table<DataItem>,
  virtualizer: Virtualizer<HTMLDivElement, Element>
) => {
  const dataRows = virtualizer.getVirtualItems().map((virtualRow) => {
    const { rows } = table.getRowModel();
    const row = rows[virtualRow.index] as Row<DataItem>;
    return (
      <tr
        data-index={virtualRow.index}
        ref={(node) => {
          if (node) virtualizer.measureElement(node);
        }}
        key={row.id}
        style={{ transform: `translateY(${virtualRow.start}px)` }}
        className={styles.tableRow}
      >
        {row.getVisibleCells().map((cell) => (
          <td
            key={cell.id}
            className={styles.tableCell}
            style={{
              width: (cell.column.columnDef.meta as ICellMeta)?.width || 'auto',
            }}
          >
            <div className={styles.cellContent}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          </td>
        ))}
      </tr>
    );
  });

  return (
    <tbody
      className={styles.tableBody}
      style={{ height: `${virtualizer.getTotalSize()}px` }}
    >
      {dataRows}
    </tbody>
  );
};

export const getTableHead = (table: Table<DataItem>) => {
  const tableHead = table.getHeaderGroups().map((headerGroup) => (
    <tr key={headerGroup.id} className={styles.headerRow}>
      {headerGroup.headers.map((header) => (
        <HeaderCell key={header.id} table={table} header={header} />
      ))}
    </tr>
  ));
  return <thead className={styles.tableHead}>{tableHead}</thead>;
};
