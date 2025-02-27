import { TFilter, TSelectFilter } from '../filter-context/filter-context';

export interface ISelectFilterProps {
  name: string;
  defaultValues?: TSelectFilter;
  defaultRange?: TSelectFilter;
  addFilter: (name: string, value: TFilter) => void;
  deleteFilter: (name: string) => void;
}
