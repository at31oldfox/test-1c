import React, { FC, ReactNode } from 'react';
import { DateRange } from 'react-day-picker';

export type TSearchFilter = string;
export type TSelectFilter = string[];
export type TDateFilter = DateRange;
export type TNumberFilter = number[];
export type TFilter =
  | TSearchFilter
  | TSelectFilter
  | TDateFilter
  | TNumberFilter;

export type TNamedFilter = { name: string; value: TFilter };

export interface IFilterContext {
  defaultRange: TNamedFilter[];
  filters: TNamedFilter[];
  getFilter: (name: string) => TNamedFilter | undefined;
  addFilter: (name: string, value: TFilter) => void;
  deleteFilter: (name: string) => void;
  clearFilters: () => void;
  setDefaultRange: (value: TNamedFilter[]) => void;
  getDefaultRange: (name: string) => TNamedFilter | undefined;
}

export const FilterContext = React.createContext<IFilterContext>({
  defaultRange: [],
  filters: [],
  addFilter: () => {},
  getFilter: () => undefined,
  deleteFilter: () => {},
  clearFilters: () => {},
  getDefaultRange: () => undefined,
  setDefaultRange: () => {},
});

export const FilterContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [defaultRange, setDefaultRange] = React.useState<TNamedFilter[]>([]);
  const [filters, setFilters] = React.useState<TNamedFilter[]>([]);

  const getDefaultRange = (name: string) => {
    return defaultRange.find((f) => f.name === name);
  };

  const addFilter = (name: string, value: TFilter) => {
    const index = filters.findIndex((f) => f.name === name);
    if (index === -1) {
      setFilters((prev) => [...prev, { name, value }]);
    } else {
      setFilters((prev) => {
        const _prev = [...prev];
        _prev[index] = { name, value };
        return _prev;
      });
    }
  };

  const getFilter = (name: string) => {
    return filters.find((f) => f.name === name);
  };

  const deleteFilter = (name: string) => {
    const _filters = filters.filter((f) => f.name !== name);
    setFilters(_filters);
  };

  const clearFilters = () => {
    setFilters([]);
  };

  console.log('*** context', { defaultRange, filters });

  return (
    <FilterContext.Provider
      value={{
        filters,
        defaultRange,
        addFilter,
        getFilter,
        deleteFilter,
        clearFilters,
        setDefaultRange,
        getDefaultRange,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
