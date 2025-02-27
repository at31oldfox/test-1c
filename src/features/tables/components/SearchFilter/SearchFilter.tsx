import { FC, useState } from 'react';

import { InputSearch } from '../../../../shared/ui/Input-search';

import styles from './SearchFilter.module.css';
import { ISearchFilterProps } from './SearchFilter.types';

export const SearchFilter: FC<ISearchFilterProps> = ({
  name,
  defaultValues,
  addFilter,
}) => {
  // const columnFilterValue = header.column.getFilterValue();

  const [searchValue, setSearchValue] = useState<string>(
    () => (defaultValues as string) || ''
  );

  return (
    <div className={styles.searchContainer}>
      <InputSearch
        placeholder="Поиск..."
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          addFilter(name, e.target.value);
          //header.column.setFilterValue(e.target.value);
        }}
      />
    </div>
  );
};
