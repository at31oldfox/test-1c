import React from 'react';

import styled from '@emotion/styled';
import { EventImpl } from '@fullcalendar/core/internal';

import { RecordStatus } from '../model/context';

// Интерфейс для пропсов компонента
interface EventPopoverProps {
  event: EventImpl;
}

const PopoverContainer = styled.div`
  padding: 12px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-width: 320px;
  min-width: 250px;
`;

const PopoverHeader = styled.div<{ status: string }>`
  padding: 8px 12px;
  margin: -12px -12px 12px -12px;
  border-radius: 8px 8px 0 0;
  color: white;
  font-weight: bold;
  background-color: ${(props) => getStatusColor(props.status)};
`;

const PopoverContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PopoverRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const PopoverLabel = styled.div`
  font-size: 12px;
  color: #7f7e7f;
`;

const PopoverValue = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  background-color: ${(props) => getStatusColor(props.status, 0.1)};
  color: ${(props) => getStatusColor(props.status)};
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  margin-top: 4px;
`;

// Хелпер для получения цвета статуса
const getStatusColor = (status: string, opacity = 1) => {
  const colors: Record<string, string> = {
    [RecordStatus.PRELIMINARY]: '#7F7E7F',
    [RecordStatus.ONLINE]: '#4668C7',
    [RecordStatus.CLIENT_ARRIVED]: '#C64C54',
    [RecordStatus.CONFIRMED]: '#F6D200',
    [RecordStatus.PAID]: '#00B277',
    [RecordStatus.UNPAID]: '#7551CA',
    default: '#7F7E7F',
  };

  const color = colors[status] || colors.default;
  return opacity === 1
    ? color
    : `${color}${Math.round(opacity * 255)
        .toString(16)
        .padStart(2, '0')}`;
};

// Форматирование времени
const formatTime = (date: Date | null): string => {
  if (!date) {
    return '';
  }
  return date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Компонент поповера события
const EventPopover: React.FC<EventPopoverProps> = ({ event }) => {
  const status = event.extendedProps?.status || 'default';
  const startTime = formatTime(event.start);
  const endTime = formatTime(event.end);
  const timeDisplay = `${startTime} - ${endTime}`;

  // Разделяем заголовок события на части (клиент и услуги)
  const title = event.title || '';
  const hasBrackets = title.includes('(') && title.includes(')');

  let clientName = title;
  let clientInfo = '';
  let services = '';

  if (hasBrackets) {
    const bracketStart = title.indexOf('(');
    const bracketEnd = title.indexOf(')');
    if (bracketStart > 0 && bracketEnd > bracketStart) {
      clientName = title.substring(0, bracketStart).trim();
      clientInfo = title.substring(bracketStart + 1, bracketEnd).trim();
      // Проверяем наличие услуг после скобок
      if (title.includes('-') && bracketEnd < title.length - 1) {
        services = title.substring(title.indexOf('-') + 1).trim();
      }
    }
  }

  return (
    <PopoverContainer>
      <PopoverHeader status={status}>{timeDisplay}</PopoverHeader>
      <PopoverContent>
        <PopoverRow>
          <PopoverLabel>Клиент</PopoverLabel>
          <PopoverValue>{clientName}</PopoverValue>
          {clientInfo && (
            <PopoverValue style={{ fontSize: '12px' }}>
              {clientInfo}
            </PopoverValue>
          )}
        </PopoverRow>

        {services && (
          <PopoverRow>
            <PopoverLabel>Услуги</PopoverLabel>
            <PopoverValue>{services}</PopoverValue>
          </PopoverRow>
        )}

        <PopoverRow>
          <PopoverLabel>Статус</PopoverLabel>
          <StatusBadge status={status}>{status}</StatusBadge>
        </PopoverRow>
      </PopoverContent>
    </PopoverContainer>
  );
};

export default EventPopover;
