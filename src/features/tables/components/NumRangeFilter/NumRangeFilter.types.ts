// import { Column, Table } from '@tanstack/react-table';
import { TFilter, TNumberFilter } from '../filter-context/filter-context';

export interface INumRangeFilterProps {
  // column: Column<any, unknown>;
  // table: Table<any>;
  name: string;
  defaultValues?: TFilter;
  defaultRange?: TNumberFilter;
  addFilter: (name: string, value: TFilter) => void;
  deleteFilter: (name: string) => void;
}
