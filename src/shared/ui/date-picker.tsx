'use client';

import * as React from 'react';

import styled from '@emotion/styled';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import { Calendar } from '@/shared/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';

// Стилизованные компоненты
const DatePickerButton = styled(Button)<{ $hasDate: boolean }>`
  width: 280px;
  justify-content: flex-start;
  text-align: left;
  font-weight: ${(props) => props.theme.fontWeight.normal};

  ${(props) =>
    !props.$hasDate &&
    `
    color: ${props.theme.colors.mutedForeground};
  `}
`;

const StyledCalendarIcon = styled(CalendarIcon)`
  margin-right: 0.5rem;
  height: 1rem;
  width: 1rem;
`;

const StyledPopoverContent = styled(PopoverContent)`
  width: auto;
  padding: 0;
`;

export function DatePicker() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <DatePickerButton variant="outline" $hasDate={!!date}>
          <StyledCalendarIcon />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </DatePickerButton>
      </PopoverTrigger>
      <StyledPopoverContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </StyledPopoverContent>
    </Popover>
  );
}
