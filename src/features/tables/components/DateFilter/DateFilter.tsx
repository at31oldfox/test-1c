'use client';

import type React from 'react';
import { type FC, useState } from 'react';
import { type DateRange, DayPicker } from 'react-day-picker';

import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import { InputDate } from '../../../../shared/ui/Input-date';

import type { IDateFilterProps } from './DateFilter.types';

import 'react-day-picker/dist/style.css';
import styles from './date-filter.module.css';

export const DateFilter: FC<IDateFilterProps> = ({
  name,
  defaultValues,
  addFilter,
}) => {
  const [month, setMonth] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
    () => defaultValues || undefined
  );

  const handleApply = () => {
    if (selectedRange) {
      addFilter(name, selectedRange);
    }
    console.log('*** Applied filter:', selectedRange);
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setSelectedRange((prev) => ({
        from: undefined,
        to: prev?.to,
      }));
    }

    const pure = e.target.value.replace(/_/g, '');
    if (pure.length === 10) {
      const newDate = new Date(e.target.value.split('-').reverse().join('-'));
      setMonth(newDate);

      setSelectedRange((prev) => {
        if (!newDate) {
          return undefined;
        }
        return {
          from: newDate,
          to: prev?.to && newDate > prev.to ? newDate : prev?.to,
        };
      });
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setSelectedRange((prev) => ({
        from: prev?.from,
        to: undefined,
      }));
    }

    const pure = e.target.value.replace(/_/g, '');
    if (pure.length === 10) {
      const newDate = new Date(e.target.value.split('-').reverse().join('-'));

      setMonth(newDate);
      setSelectedRange((prev) => {
        if (!newDate) {
          return undefined;
        }
        return {
          from:
            prev?.from && newDate < prev.from
              ? newDate
              : (prev?.from ?? newDate),
          to: newDate,
        };
      });
    }
  };

  const modifiersStyles = {
    selected: {
      backgroundColor: '#FFE681',
      borderRadius: '0',
    },
    range_end: {
      backgroundColor: '#FFE681',
    },
    range_start: {
      backgroundColor: '#FFE681',
    },
    hover: {
      backgroundColor: 'rgba(255, 230, 129, 0.5)',
      borderRadius: '0',
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <span className={styles.headerLabel}>От</span>
        <span className={styles.headerLabelRight}>До</span>
      </div>
      <div className={styles.inputRow}>
        <InputDate
          value={
            selectedRange?.from
              ? format(selectedRange.from, 'dd.MM.yyyy')
              : '__-__-____'
          }
          onChange={handleStartDateChange}
          containerClassName={styles.inputContainer}
        />
        <span className={styles.separator}>-</span>
        <InputDate
          value={
            selectedRange?.to
              ? format(selectedRange.to, 'dd.MM.yyyy')
              : '__-__-____'
          }
          onChange={handleEndDateChange}
          containerClassName={styles.inputContainer}
        />
      </div>

      <div className={styles.inputRow}>
        <DayPicker
          mode="range"
          selected={selectedRange}
          onSelect={(range) => setSelectedRange(range)}
          modifiersStyles={modifiersStyles}
          locale={ru}
          weekStartsOn={1}
          month={month}
          onMonthChange={setMonth}
          formatters={{
            formatMonthCaption: (month) =>
              `${month.toLocaleString('ru', { month: 'long' })} ${month.getFullYear()}`,
          }}
          className={styles.dayPicker}
        />
      </div>

      <button onClick={handleApply} className={styles.applyButton}>
        Применить
      </button>
    </div>
  );
};
