import { TDateFilter, TFilter } from '../filter-context/filter-context';

export interface IDateFilterProps {
  name: string;
  defaultValues?: TDateFilter;
  defaultRange?: TDateFilter;
  addFilter: (name: string, value: TFilter) => void;
  deleteFilter: (name: string) => void;
}
