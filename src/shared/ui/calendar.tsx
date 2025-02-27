'use client';

import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { ru } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

// Стилизованные иконки
const StyledChevronLeft = styled(ChevronLeft)`
  height: 1rem;
  width: 1rem;
`;

const StyledChevronRight = styled(ChevronRight)`
  height: 1rem;
  width: 1rem;
`;

// Стилизованный контейнер календаря
const CalendarContainer = styled.div`
  padding: 1.5rem;
`;

// Стили календаря с использованием Emotion
const calendarStyles = {
  months: css`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (min-width: 640px) {
      flex-direction: row;
      gap: 1rem;
    }
  `,
  month: css`
    margin-bottom: 1rem;
  `,
  caption: css`
    display: flex;
    justify-content: center;
    padding-top: 0.25rem;
    position: relative;
    align-items: center;
  `,
  caption_label: css`
    font-size: 0.875rem;
    color: #a3a3a3;
    font-weight: 500;
  `,
  nav: css`
    display: flex;
    align-items: center;
    gap: 0.25rem;
  `,
  nav_button: css`
    height: 1.75rem;
    width: 1.75rem;
    background-color: transparent;
    padding: 0;
    opacity: 0.5;
    &:hover {
      opacity: 1;
    }
  `,
  nav_button_previous: css`
    position: absolute;
    left: 0.25rem;
  `,
  nav_button_next: css`
    position: absolute;
    right: 0.25rem;
  `,
  table: css`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 0.25rem;
  `,
  head_row: css`
    display: flex;
  `,
  head_cell: css`
    color: #373741;
    border-radius: 0.375rem;
    width: 2.25rem;
    font-weight: 600;
    font-size: 0.8rem;
  `,
  row: css`
    display: flex;
    width: 100%;
    margin-top: 0.5rem;
  `,
  cell: css`
    height: 2.25rem;
    width: 2.25rem;
    text-align: center;
    font-size: 0.75rem;
    padding: 0;
    position: relative;

    &:has([aria-selected].day-range-end) {
      border-radius: 9999px;
    }

    &:has([aria-selected].day-outside) {
      background-color: rgba(var(--accent), 0.5);
    }

    &:has([aria-selected]) {
      background-color: var(--accent);
    }

    &:first-of-type:has([aria-selected]) {
      border-radius: 9999px;
    }

    &:last-of-type:has([aria-selected]) {
      border-radius: 9999px;
    }

    &:focus-within {
      position: relative;
      z-index: 20;
    }
  `,
  day: css`
    height: 2.25rem;
    width: 2.25rem;
    padding: 0;
    font-weight: 400;

    &[aria-selected] {
      opacity: 1;
    }
  `,
  day_range_end: css`
    /* Стиль для конца диапазона */
  `,
  day_selected: css`
    background-color: var(--accent);
    color: var(--accent-foreground);

    &:hover {
      background-color: var(--accent);
      color: var(--accent-foreground);
    }

    &:focus {
      background-color: var(--accent);
      color: var(--accent-foreground);
    }
  `,
  day_today: css`
    background-color: var(--accent);
    color: var(--accent-foreground);
  `,
  day_outside: css`
    color: var(--muted-foreground);

    &[aria-selected] {
      background-color: rgba(var(--accent), 0.5);
      color: var(--muted-foreground);
    }
  `,
  day_disabled: css`
    color: var(--muted-foreground);
    opacity: 0.5;
  `,
  day_range_middle: css`
    &[aria-selected] {
      background-color: var(--accent);
      color: var(--accent-foreground);
    }
  `,
  day_hidden: css`
    visibility: hidden;
  `,
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <CalendarContainer className={className}>
      <DayPicker
        locale={ru}
        showOutsideDays={showOutsideDays}
        classNames={{
          months: calendarStyles.months,
          month: calendarStyles.month,
          caption: calendarStyles.caption,
          caption_label: calendarStyles.caption_label,
          nav: calendarStyles.nav,
          nav_button: calendarStyles.nav_button,
          nav_button_previous: calendarStyles.nav_button_previous,
          nav_button_next: calendarStyles.nav_button_next,
          table: calendarStyles.table,
          head_row: calendarStyles.head_row,
          head_cell: calendarStyles.head_cell,
          row: calendarStyles.row,
          cell: calendarStyles.cell,
          day: calendarStyles.day,
          day_range_end: calendarStyles.day_range_end,
          day_selected: calendarStyles.day_selected,
          day_today: calendarStyles.day_today,
          day_outside: calendarStyles.day_outside,
          day_disabled: calendarStyles.day_disabled,
          day_range_middle: calendarStyles.day_range_middle,
          day_hidden: calendarStyles.day_hidden,
          ...classNames,
        }}
        components={{
          IconLeft: ({ ...props }) => <StyledChevronLeft {...props} />,
          IconRight: ({ ...props }) => <StyledChevronRight {...props} />,
        }}
        {...props}
      />
    </CalendarContainer>
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
