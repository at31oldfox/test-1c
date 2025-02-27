import React, { useCallback } from 'react';

import { useSlotContext } from './model/slotContext';

/**
 * Компонент для отображения выбираемого временного слота
 * @deprecated Больше не используется, так как стилизация происходит через CSS
 */
export const SelectableTimeSlot: React.FC<{
  resourceId: string;
  date: Date;
  startTime: string;
  endTime: string;
}> = ({ resourceId, date }) => {
  const { selectedSlot, selectSlot } = useSlotContext();
  const isSelected =
    selectedSlot?.resourceId === resourceId &&
    selectedSlot?.date.toDateString() === date.toDateString();

  const handleClick = useCallback(() => {
    selectSlot(resourceId, date);
  }, [resourceId, date, selectSlot]);

  // Этот компонент больше не используется, так как стилизация происходит через CSS
  return null;
};
