import { FC, useEffect, useLayoutEffect, useState } from 'react';

import { InputCleanable } from '../../../../shared/ui/Input-cleanable';
import { SliderRange } from '../../../../shared/ui/slider-range';
import { TNumberFilter } from '../filter-context/filter-context';

import styles from './NumRangeFilter.module.css';
import { INumRangeFilterProps } from './NumRangeFilter.types';

export const NumRangeFilter: FC<INumRangeFilterProps> = ({
  name,
  defaultValues,
  addFilter,
  defaultRange,
}) => {
  // Значение фильтра колонки
  // const columnFilterValue = column.getFilterValue();

  const [range, setRange] = useState<TNumberFilter>([0, 0]);
  const [selectedRange, setSelectedRange] = useState<number[]>([3000, 3100]);

  useLayoutEffect(() => {
    setRange(defaultRange || [0, 0]);
  }, [defaultRange]);

  /*
  // При фильтрации внутри таблицы
  useEffect(() => {
    const valuesSet = new Set<number>();

    table.getPreFilteredRowModel().flatRows.forEach((row) => {
      const myObj = row.getValue<any>(column.id);

      valuesSet.add(myObj);
    });

    const max = Math.max(...valuesSet.values());
    const min = Math.min(...valuesSet.values());

    setRange([min, max]);
  }, [column.id, table.getPreFilteredRowModel()]);
  */

  useEffect(() => {
    if (range && defaultValues) {
      setSelectedRange(defaultValues as number[]);
    }
  }, [defaultValues, range]);

  const handleApply = () => {
    addFilter(name, selectedRange);
    // При фильтрации внутри таблицы
    // column.setFilterValue(selectedRange);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <span className={styles.headerLabel}>От</span>
        <span className={styles.headerLabelRight}>До</span>
      </div>
      <div className={styles.inputRow}>
        <InputCleanable
          value={
            selectedRange?.length
              ? selectedRange[0]
              : range?.length
                ? range[0]
                : ''
          }
          onChange={(e) => {
            let range0 = (range && range[0]) ?? 0;
            if (e.target.value && Number(e.target.value) > range0) {
              range0 = Number(e.target.value);
            }
            setSelectedRange([range0, selectedRange[1]]);
          }}
          containerClassName={styles.inputContainer}
        />
        <span className={styles.separator}>-</span>
        <InputCleanable
          value={
            selectedRange?.length
              ? selectedRange[1]
              : range?.length
                ? range[1]
                : ''
          }
          onChange={(e) => {
            let range1 = (range && range[1]) ?? 0;
            if (e.target.value && Number(e.target.value) < range1) {
              range1 = Number(e.target.value);
            }
            setSelectedRange([selectedRange[0], range1]);
          }}
          containerClassName={styles.inputContainer}
        />
      </div>

      <div className={styles.inputRow}>
        <SliderRange
          // defaultValue={[50]}
          min={range[0]}
          max={range[1]}
          value={selectedRange}
          step={1}
          className={styles.slider}
          onValueChange={(value) => {
            setSelectedRange(value);
          }}
        />
      </div>

      <button onClick={handleApply} className={styles.applyButton}>
        Применить
      </button>
    </div>
  );
};
