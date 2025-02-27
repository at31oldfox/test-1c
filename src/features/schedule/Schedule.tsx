import { FC, useEffect, useRef } from 'react';

import styled from '@emotion/styled';
import FullCalendar from '@fullcalendar/react';
import { Loader2 } from 'lucide-react';

import { ScheduleProvider, useScheduleContext } from './model/context';
import { useSlotContext } from './model/slotContext';
import CustomToolbar from './CustomToolbar';

// Импортируем централизованные стили для календаря
import './Schedule.css';

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const StyledLoader = styled(Loader2)`
  height: 5rem;
  animation: spin 2s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const ScheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CalendarContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 600px;
`;

// Информация о выбранном слоте
const SelectedSlotInfo = styled.div`
  background-color: rgba(249, 217, 93, 0.1);
  border: 1px solid #f9d95d;
  border-radius: 6px;
  padding: 8px 12px;
  margin-top: 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SelectedSlotTime = styled.span`
  font-weight: 600;
`;

const SelectedSlotResource = styled.span`
  color: #555;
`;

const ClearSelectionButton = styled.button`
  background-color: transparent;
  border: none;
  color: #4668c7;
  font-size: 13px;
  cursor: pointer;
  padding: 2px 8px;
  margin-left: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

// Компонент-обертка для провайдера контекста
const ScheduleWithProviders: FC = () => {
  return (
    <ScheduleProvider>
      <ScheduleContent />
    </ScheduleProvider>
  );
};

// Компонент с содержимым расписания (теперь внутри SlotProvider из ScheduleProvider)
const ScheduleContent: FC = () => {
  const { loading, error, calendarOptions, resources } = useScheduleContext();
  const { selectedSlot, clearSelection } = useSlotContext();
  const calendarRef = useRef<any>(null);

  // Функция для форматирования времени выбранного слота
  const formatSelectedTime = (date: Date): string => {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Находим название ресурса по ID
  const getResourceTitle = (resourceId: string): string => {
    const resource = resources.find((r) => r.id === resourceId);
    return resource ? resource.title : '';
  };

  // Обработка всплывающих подсказок при наведении на временные слоты
  useEffect(() => {
    const handleSlotMouseEnter = (e: MouseEvent) => {
      // Проверяем, что это временная ячейка
      const target = e.target as HTMLElement;
      if (!target.closest('.fc-timegrid-slot-lane')) {
        return;
      }

      // Получаем информацию о времени из атрибутов
      const slotEl = target.closest('.fc-timegrid-slot-lane');
      if (!slotEl) {
        return;
      }

      // Создаем всплывающую подсказку только если её ещё нет
      if (document.querySelector('.slot-tooltip')) {
        return;
      }

      // Получаем дату из атрибутов
      const dataDate = slotEl.getAttribute('data-date');
      if (!dataDate) {
        return;
      }

      const date = new Date(dataDate);
      const timeString = formatSelectedTime(date);

      // Создаем и добавляем всплывающую подсказку
      const tooltip = document.createElement('div');
      tooltip.className = 'slot-tooltip';
      tooltip.textContent = `Время: ${timeString}`;

      // Позиционируем подсказку
      document.body.appendChild(tooltip);
      const rect = target.getBoundingClientRect();
      tooltip.style.left = `${rect.left + rect.width / 2}px`;
      tooltip.style.top = `${rect.top}px`;
    };

    const handleSlotMouseLeave = () => {
      // Удаляем подсказку при уходе мыши
      const tooltip = document.querySelector('.slot-tooltip');
      if (tooltip) {
        tooltip.remove();
      }
    };

    // Добавляем обработчики событий
    document.addEventListener('mouseover', handleSlotMouseEnter);
    document.addEventListener('mouseout', handleSlotMouseLeave);

    // Удаляем обработчики при размонтировании
    return () => {
      document.removeEventListener('mouseover', handleSlotMouseEnter);
      document.removeEventListener('mouseout', handleSlotMouseLeave);
    };
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ScheduleContainer className="schedule-container">
      <CustomToolbar />
      <CalendarContainer>
        {loading ? (
          <LoadingContainer>
            <StyledLoader />
          </LoadingContainer>
        ) : (
          <>
            <FullCalendar {...calendarOptions} ref={calendarRef} />
            {selectedSlot && (
              <SelectedSlotInfo>
                <div>
                  <SelectedSlotTime>
                    {formatSelectedTime(selectedSlot.date)}
                  </SelectedSlotTime>
                  <SelectedSlotResource>
                    {' - '}
                    {getResourceTitle(selectedSlot.resourceId)}
                  </SelectedSlotResource>
                </div>
                <ClearSelectionButton onClick={clearSelection}>
                  Отменить выбор
                </ClearSelectionButton>
              </SelectedSlotInfo>
            )}
          </>
        )}
      </CalendarContainer>
    </ScheduleContainer>
  );
};

// Компонент расписания
const Schedule: FC = () => {
  return <ScheduleWithProviders />;
};

export default Schedule;
