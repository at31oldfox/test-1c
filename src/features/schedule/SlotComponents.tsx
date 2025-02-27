import React from 'react';

/**
 * Компонент для отображения выбираемого временного слота
 * @deprecated Больше не используется, так как стилизация происходит через CSS
 */
export const SelectableTimeSlot: React.FC<{
  resourceId: string;
  date: Date;
  startTime: string;
  endTime: string;
}> = (/* { resourceId, date } */) => {
  // const { selectedSlot, selectSlot } = useSlotContext();

  // Этот компонент больше не используется, так как стилизация происходит через CSS
  return null;
};
