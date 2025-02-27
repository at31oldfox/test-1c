import React from 'react';

// Интерфейс для пропсов компонента
interface TimeSlotProps {
  resourceId: string;
  date: Date;
  view: string;
  isSelected?: boolean;
  onClick?: (resourceId: string, date: Date) => void;
}

// Компонент для обрабатываемого временного слота
export const SelectableTimeSlot: React.FC<TimeSlotProps> = ({
  resourceId,
  date,
  isSelected,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(resourceId, date);
    }
  };

  // Используем CSS-классы вместо styled-components
  const classNames = ['selectable-slot', isSelected ? 'selected-slot' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} onClick={handleClick}>
      {isSelected && <div className="slot-indicator" />}
    </div>
  );
};

// Форматирование времени для отображения в подсказке
export const formatSlotTime = (date: Date): string => {
  return date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
};
