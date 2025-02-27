import { TFilter } from '../filter-context/filter-context';

export interface ISearchFilterProps {
  name: string;
  defaultValues?: TFilter;
  addFilter: (name: string, value: TFilter) => void;
}
