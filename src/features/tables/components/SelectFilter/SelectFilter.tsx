import { ChangeEvent, FC, useMemo, useState } from 'react';

import { Checkbox } from '../../../../shared/ui/checkbox';
import { InputSearch } from '../../../../shared/ui/Input-search';

import styles from './SelectFilter.module.css';
import { ISelectFilterProps } from './SelectFilter.types';

export const SelectFilter: FC<ISelectFilterProps> = ({
  name,
  defaultValues,
  defaultRange,
  addFilter,
}) => {
  // const columnFilterValue = column.getFilterValue();

  const [searchValue, setSearchValue] = useState<string>();
  const [selected, setSelected] = useState<string[]>(() => defaultValues || []);

  const handleApply = () => {
    addFilter(name, selected);
    console.log('*** Applied filter:', selected);
  };

  /*
  const options = useMemo(() => {
    const options = new Set();

    table.getPreFilteredRowModel().flatRows.forEach((row) => {
      const cellValue = row.getValue<{ name: string }>(column.id);
      if (cellValue && typeof cellValue.name === 'string') {
        optionsSet.add(cellValue.name);
      }
    });

    return [...options.values()];
  }, [column.id, table.getPreFilteredRowModel()]);
  */

  const checkBoxes = useMemo(() => {
    if (!defaultRange) {
      return null;
    }

    const optionsEl = defaultRange
      .filter((value) => {
        if (!searchValue) {
          return true;
        }
        return value.toLowerCase().includes(searchValue.toLowerCase());
      })
      .map((option: string) => {
        return (
          <div key={option} className={styles.checkboxContainer}>
            <Checkbox
              id={option}
              checked={selected.includes(option)}
              onCheckedChange={(checked: boolean) => {
                if (checked) {
                  setSelected([...selected, option]);
                } else {
                  setSelected(selected.filter((item) => item !== option));
                }
              }}
            />
            <label htmlFor={option} className={styles.checkboxLabel}>
              {option}
            </label>
          </div>
        );
      });

    return optionsEl;
  }, [defaultRange, searchValue, selected]);

  return (
    <div className={styles.container}>
      <InputSearch
        placeholder="Поиск..."
        value={searchValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setSelected([]);
          setSearchValue(e.target.value);
        }}
      />

      <div className={styles.optionsContainer}>{checkBoxes}</div>
      <button onClick={handleApply} className={styles.applyButton}>
        Применить
      </button>
    </div>
  );
};
