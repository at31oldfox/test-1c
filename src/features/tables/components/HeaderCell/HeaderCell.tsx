import { FC, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { flexRender } from '@tanstack/react-table';
import { X } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../../shared/ui/popover';
import { EFilerType, ICellMeta } from '../../Table.types';
import { DateFilter } from '../DateFilter/DateFilter';
import {
  FilterContext,
  TDateFilter,
  TNumberFilter,
  TSelectFilter,
} from '../filter-context/filter-context';
import { NumRangeFilter } from '../NumRangeFilter/NumRangeFilter';
import { SearchFilter } from '../SearchFilter/SearchFilter';
import { SelectFilter } from '../SelectFilter/SelectFilter';
import { SortButton } from '../SortButton/SortButton';

import styles from './HeaderCell.module.css';
import { IHeaderCellProps } from './HeaderCell.types';
import { ThHeader } from './ThHeader';

export const HeaderCell: FC<IHeaderCellProps> = ({ header, table }) => {
  const { getFilter, deleteFilter, addFilter, getDefaultRange } =
    useContext(FilterContext);

  //const columnFilterValue = header.column.getFilterValue();

  const filterValue = getFilter(header.column.id);
  const defaultFilterRange = getDefaultRange(header.column.id);

  const filterRef = useRef<HTMLDivElement>(null);
  const [isFilerOpen, setIsFilterOpen] = useState(false);

  const onFilterDeleteHandler = () => {
    deleteFilter(header.column.id);
    header.column.setFilterValue(undefined);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onTitleClickHandler = () => {
    setIsFilterOpen(!isFilerOpen);
  };

  let filterType = null;
  if (header.column.columnDef.meta) {
    filterType = (header.column.columnDef.meta as ICellMeta).filterType;
  }

  const filterComp = useMemo(() => {
    if (filterType === EFilerType.Select && table) {
      return (
        <SelectFilter
          name={header.id}
          defaultValues={filterValue?.value as TSelectFilter}
          addFilter={addFilter}
          deleteFilter={deleteFilter}
          defaultRange={defaultFilterRange?.value as TSelectFilter}
        />
      );
    }
    if (filterType === EFilerType.Date && table) {
      return (
        <DateFilter
          name={header.id}
          defaultValues={filterValue?.value as TDateFilter}
          addFilter={addFilter}
          deleteFilter={deleteFilter}
          defaultRange={defaultFilterRange?.value as TDateFilter}
        />
      );
    }
    if (filterType === EFilerType.NumberRange && table) {
      return (
        <NumRangeFilter
          name={header.id}
          defaultValues={filterValue?.value}
          addFilter={addFilter}
          deleteFilter={deleteFilter}
          defaultRange={defaultFilterRange?.value as TNumberFilter}
        />
      );
    }
    return null;
  }, [filterType, table, header.column]);

  if (filterType === EFilerType.Search && isFilerOpen) {
    return (
      <ThHeader
        id={header.id}
        width={(header.column.columnDef.meta as ICellMeta)?.width}
        className={styles.whiteBackground}
      >
        <div ref={filterRef}>
          <SearchFilter
            addFilter={addFilter}
            name={header.id}
            defaultValues={filterValue?.value}
          />
        </div>
      </ThHeader>
    );
  }

  return (
    <ThHeader
      id={header.id}
      width={(header.column.columnDef.meta as ICellMeta)?.width}
    >
      {header.column.getCanSort() && (
        <SortButton
          onClick={header.column.getToggleSortingHandler()}
          isSorted={header.column.getIsSorted()}
        />
      )}

      {!filterComp && (
        <div className={styles.headerContainer}>
          <span
            onClick={onTitleClickHandler}
            className={`${styles.headerTitle} ${filterType ? styles.filterable : ''}`}
          >
            {flexRender(header.column.columnDef.header, header.getContext())}
          </span>
        </div>
      )}

      {filterComp && (
        <>
          <Popover>
            <div className={styles.headerContainer}>
              <PopoverTrigger>
                <span
                  className={`${styles.headerTitle} ${filterType ? styles.filterable : ''}`}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </span>
              </PopoverTrigger>
            </div>
            <PopoverContent className={styles.popoverContent} align="start">
              {filterComp}
            </PopoverContent>
          </Popover>
          {filterValue && (
            <button
              type="button"
              onClick={onFilterDeleteHandler}
              aria-label="Очистить фильтр"
              className={styles.filterButton}
            >
              <X className={styles.filterIcon} />
            </button>
          )}
        </>
      )}
    </ThHeader>
  );
};
