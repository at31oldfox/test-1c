import { Header, Table } from '@tanstack/react-table';

import { DataItem } from '../../Table.types';

export interface IHeaderCellProps {
  header: Header<DataItem, unknown>;
  table?: Table<DataItem>;
}
