import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import ReactDOM from 'react-dom/client';

import styled from '@emotion/styled';
import {
  CalendarOptions,
  EventClickArg,
  EventContentArg,
} from '@fullcalendar/core';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import scrollGridPlugin from '@fullcalendar/scrollgrid';
import timeGridPlugin from '@fullcalendar/timegrid';

import {
  getDivisionFilters,
  getEmployeeFilters,
  getPostFilters,
  getWorkSchedule,
} from '@/shared/api/schedule/schedule';

import EventPopover from '../components/EventPopover';
import {
  TimeAxisIndicator,
  TimeIndicator,
  TimeSlotLabel,
} from '../components/TimeComponents';

import { SlotProvider } from './slotContext';

// Типы для событий и ресурсов календаря
export enum RecordStatus {
  PRELIMINARY = 'Предварительная',
  ONLINE = 'Онлайн запись',
  CLIENT_ARRIVED = 'Клиент пришёл',
  CONFIRMED = 'Подтверждена',
  PAID = 'Оплачена',
  UNPAID = 'Не оплачена',
}

// Объект с цветами для разных статусов записей
const statusColors = {
  [RecordStatus.PRELIMINARY]: {
    background: '#F7F7F7', // желтый
    border: '#7F7E7F',
    header: '#C0C0C0',
  },
  [RecordStatus.ONLINE]: {
    background: '#F5FAFF', // индиго
    border: '#4668C7',
    header: '#639CE8',
  },
  [RecordStatus.CLIENT_ARRIVED]: {
    background: '#FDECEC', // зеленый
    border: '#C64C54',
    header: '#F07369',
  },
  [RecordStatus.CONFIRMED]: {
    background: '#FDFDEE', // синий
    border: '#F6D200',
    header: '#F6D200',
  },
  [RecordStatus.PAID]: {
    background: '#EFFFF1', // изумрудный
    border: '#00B277',
    header: '#37D693',
  },
  [RecordStatus.UNPAID]: {
    background: '#F1E9FF', // красный
    border: '#7551CA',
    header: '#C17CE6',
  },
  default: {
    background: '#F7F7F7', // серый
    border: '#7F7E7F',
    header: '#7F7E7F',
  },
};

// Компонент для отображения события в календаре
interface EventContentProps {
  eventInfo: EventContentArg;
}

interface EventContainerProps {
  status: string;
}

const EventContainer = styled.div<EventContainerProps>`
  border-width: 1px;
  border-style: solid;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  height: 100%;
  width: 100%;
  overflow: hidden;
  font-size: 0.85em;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    filter: brightness(0.97);
  }

  // Динамические свойства в зависимости от статуса
  border-color: ${(props: EventContainerProps) => {
    const status = props.status as RecordStatus;
    return (statusColors[status] || statusColors.default).border;
  }};
  background-color: ${(props: EventContainerProps) => {
    const status = props.status as RecordStatus;
    return (statusColors[status] || statusColors.default).background;
  }};
`;

const EventContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4px 6px;
`;

const EventTime = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: white;
  margin-bottom: 2px;
  padding: 4px 10px;
  background-color: ${(props: EventContainerProps) => {
    const status = props.status as RecordStatus;
    return (statusColors[status] || statusColors.default).header;
  }};
`;

const EventTitle = styled.div`
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 2px 0;
  line-height: 1.2;
`;

const EventContent = ({ eventInfo }: EventContentProps) => {
  const { event, timeText } = eventInfo;
  const status = event.extendedProps?.status || 'default';

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

  // Используем timeText из eventInfo, если доступно, иначе форматируем из event.start/end
  let timeDisplay = timeText || '';
  if (!timeDisplay && event.start && event.end) {
    const startTime = formatTime(event.start);
    const endTime = formatTime(event.end);
    timeDisplay = `${startTime} - ${endTime}`;
  }

  return (
    <EventContainer status={status}>
      <EventTime status={status}>{timeDisplay}</EventTime>
      <EventContentWrapper>
        <EventTitle>{event.title || ''}</EventTitle>
      </EventContentWrapper>
    </EventContainer>
  );
};

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resourceId: string;
  status?: RecordStatus | string; // статус записи
}

export interface CalendarResource {
  id: string;
  title: string;
  post?: string;
  division?: string;
}

export interface Option {
  label: string;
  value: string;
}

// Интерфейс для контекста
interface ScheduleContextType {
  loading: boolean;
  error: string;
  events: CalendarEvent[];
  resources: CalendarResource[];
  employeeOptions: Option[];
  specialtyOptions: Option[];
  divisionOptions: Option[];
  calendarOptions: CalendarOptions;
  currentDate: Date;
  selectedInterval: 15 | 30 | 60;
  onPrevDay: () => void;
  onNextDay: () => void;
  onToday: () => void;
  onEmployeeFilterChange: (value: string[]) => void;
  onSpecialtyFilterChange: (value: string[]) => void;
  onEquipmentFilterChange: (value: string[]) => void;
  onServiceFilterChange: (value: string[]) => void;
  onBranchFilterChange: (value: string[]) => void;
  onTimeClick: (v: 15 | 30 | 60) => void;
  onSearchClick: () => void;
}

// Создание контекста
export const ScheduleContext = createContext<ScheduleContextType | undefined>(
  undefined
);

// Хук для использования контекста
export const useScheduleContext = () => {
  const context = useContext(ScheduleContext);
  if (context === undefined) {
    throw new Error(
      'useScheduleContext must be used within a ScheduleProvider'
    );
  }
  return context;
};

// Интерфейс для провайдера
interface ScheduleProviderProps {
  children: ReactNode;
}

// Провайдер контекста
export const ScheduleProvider: React.FC<ScheduleProviderProps> = ({
  children,
}) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [resources, setResources] = useState<CalendarResource[]>([]);
  const [employeeOptions, setEmployeeOptions] = useState<Option[]>([]);
  const [postOptions, setPostOptions] = useState<Option[]>([]);
  const [divisionOptions, setDivisionOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedInterval, setSelectedInterval] = useState<15 | 30 | 60>(15);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filters, setFilters] = useState({
    period: new Date().toISOString().replace(/-/g, '').split('T')[0],
    employees: [] as string[],
    posts: [] as string[],
    divisions: [] as string[],
    equipment: [] as string[],
    service: [] as string[],
  });

  // Удаляем получение контекста здесь, так как это вызывает ошибку
  // const slotContext = useSlotContext();

  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      try {
        // Загрузка расписания
        const scheduleData = await getWorkSchedule(
          filters.period,
          filters.employees,
          filters.posts,
          filters.divisions
        );
        if (scheduleData) {
          const { staff, records } = scheduleData;
          const formattedResources: CalendarResource[] = staff.map(
            (s: any) => ({
              id: s.employeeId,
              title: s.employeeName,
              post: s.postName,
              division: s.divisionName,
            })
          );
          const formattedEvents: CalendarEvent[] = records.map(
            (record, index: number) => ({
              id: record.employeeId + '_' + index, // формируем уникальный id для события
              title: `${record.clientName} (${record.clientStatusName}) - ${record.nomenclatureArray.map((n: any) => n.nomenclatureName).join(', ')}`,
              start: new Date(record.periodStart),
              end: new Date(record.periodEnd),
              resourceId: record.employeeId,
              status: record.recordStatusName,
            })
          );
          setResources(formattedResources);
          setEvents(formattedEvents);
        }

        // Загрузка фильтров
        const [employees, posts, divisions] = await Promise.all([
          getEmployeeFilters(filters.period),
          getPostFilters(filters.period),
          getDivisionFilters(filters.period),
        ]);
        setEmployeeOptions(
          employees?.map((emp: any) => ({
            label: emp.employeeName,
            value: emp.employeeId,
          })) || []
        );
        setPostOptions(
          posts?.map((p: any) => ({
            label: p.postName,
            value: p.postId,
          })) || []
        );
        setDivisionOptions(
          divisions?.map((d: any) => ({
            label: d.divisionName,
            value: d.divisionId,
          })) || []
        );
      } catch (err) {
        setError('Ошибка загрузки данных');
        console.error('Ошибка расписания:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [
    filters.period,
    filters.employees,
    filters.posts,
    filters.divisions,
    currentDate,
  ]);

  const onPrevDay = () => {
    setCurrentDate((prev) => new Date(prev.getTime() - 86400000));
  };

  const onNextDay = () => {
    setCurrentDate((prev) => new Date(prev.getTime() + 86400000));
  };

  const onToday = () => {
    setCurrentDate(new Date());
  };

  const handleFilterChange = (filterType: string, value: string[]) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  // Обработчик клика по событию (для поповера)
  const handleEventClick = (clickInfo: EventClickArg) => {
    // FullCalendar автоматически обрабатывает клики, показывает/скрывает поповер
    // Можно добавить дополнительную логику по необходимости
    console.log('Event clicked:', clickInfo.event.title);
  };

  // Обработчик клика по ячейке даты
  const handleDateClick = (info: { date: Date; resource?: { id: string } }) => {
    // Этот обработчик вызывается при клике по ячейке даты
    // Сейчас мы обрабатываем выбор слота через компонент SelectableTimeSlot,
    // но этот обработчик может быть полезен для дополнительных действий
    console.log('Date clicked:', info.date, info.resource?.id);
  };

  // Обработчик выбора ячейки для календаря
  const handleSelectCell = (info: any) => {
    // Теперь этот обработчик можно передавать в SlotProvider,
    // и он будет вызываться, когда SlotContext.selectSlot будет вызываться
    if (info.resource) {
      console.log('Выбрана ячейка:', info.resource.id, info.start);
    }
  };

  // Обработчик для передачи в SlotProvider
  const handleSlotSelect = (resourceId: string, date: Date) => {
    console.log('Слот выбран через контекст:', resourceId, date);
    // Здесь можно добавить дополнительную логику для обработки выбора слота
  };

  const calendarOptions: CalendarOptions = {
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    locale: 'ru',
    initialDate: currentDate,
    plugins: [timeGridPlugin, resourceTimeGridPlugin, scrollGridPlugin],
    initialView: 'resourceTimeGridDay',
    selectable: true,
    selectMirror: true,
    unselectAuto: false,
    stickyHeaderDates: true,
    stickyFooterScrollbar: true,
    allDaySlot: false,
    businessHours: {
      startTime: '09:00',
      endTime: '21:00',
      daysOfWeek: [1, 2, 3, 4, 5],
    },
    slotMinTime: '09:00:00',
    slotMaxTime: '21:00:00',
    dayMinWidth: 230,
    resourceAreaWidth: 230,
    datesAboveResources: true,
    resourceLabelContent: function (arg) {
      return {
        html: `<div class="flex flex-col justify-center w-full items-center gap-1 py-4"><div>${arg.resource.title}</div><div style="font-size:0.85em; color:#555;">${arg.resource.extendedProps.post || ''}</div></div>`,
      };
    },
    resources: resources.map((res) => ({
      id: res.id,
      title: res.title,
      extendedProps: {
        post: res.post,
        division: res.division,
      },
    })),
    events: events.map((event) => ({
      ...event,
      extendedProps: {
        status: event.status,
      },
    })),
    contentHeight: 'auto',
    eventMinWidth: 100,
    resourceAreaHeaderContent: 'Время/Сотрудники',
    slotDuration: `00:${selectedInterval}:00`,
    slotLabelInterval: `00:${selectedInterval}:00`,
    slotLabelContent: (arg) => <TimeSlotLabel time={arg.date} />,
    headerToolbar: false,
    views: {
      resourceTimeGridDay: {
        dayHeaderFormat: '',
        resourceAreaWidth: '230px',
        resourcesInitiallyExpanded: true,
        resourceOrder: 'title',
        type: 'resourceTimeGrid',
        duration: { days: 1 },
        eventMinHeight: 30,
      },
    },
    nowIndicator: true,
    nowIndicatorClassNames: 'fc-timegrid-now-indicator-no-default-styles',
    nowIndicatorContent: (info: any) => {
      // Первый индикатор в оси времени
      if (info.isAxis) {
        return <TimeAxisIndicator />;
      }

      // Для основной сетки определяем, первая ли это колонка
      // Используем надежный способ - проверяем, совпадает ли ID ресурса с первым ресурсом
      const isFirstColumn =
        resources.length > 0 && info.resourceId === resources[0].id;

      return <TimeIndicator isFirst={isFirstColumn} />;
    },
    eventBackgroundColor: 'transparent',
    eventBorderColor: 'transparent',
    eventTextColor: 'inherit',
    eventClassNames: 'fc-event-no-default-styles',
    eventContent: (arg) => <EventContent eventInfo={arg} />,
    // Настройка поповера для событий
    eventClick: handleEventClick,
    eventDidMount: (info) => {
      info.el.setAttribute('data-event-id', info.event.id);
      // Делаем события кликабельными
      info.el.style.cursor = 'pointer';

      // Создаем отдельный контейнер для поповера, который будет управляться через React
      const popoverContent = document.createElement('div');
      popoverContent.className = 'event-popover-container';
      popoverContent.style.display = 'none';
      document.body.appendChild(popoverContent);

      // Добавляем реакцию на клик для показа/скрытия поповера
      info.el.addEventListener('click', (e) => {
        e.stopPropagation();

        // Закрываем все другие поповеры
        document.querySelectorAll('.event-popover-container').forEach((el) => {
          if (el !== popoverContent) {
            (el as HTMLElement).style.display = 'none';
          }
        });

        // Переключаем видимость текущего поповера
        if (popoverContent.style.display === 'none') {
          // Позиционируем поповер рядом с элементом
          const rect = info.el.getBoundingClientRect();
          popoverContent.style.position = 'absolute';
          popoverContent.style.left = `${rect.right + 10}px`;
          popoverContent.style.top = `${rect.top}px`;
          popoverContent.style.zIndex = '1000';

          // Отображаем наш React-компонент в этом контейнере
          const root = ReactDOM.createRoot(popoverContent);
          root.render(<EventPopover event={info.event} />);

          popoverContent.style.display = 'block';
        } else {
          popoverContent.style.display = 'none';
        }
      });

      // Закрываем поповер при клике вне события
      document.addEventListener('click', (e) => {
        if (
          !info.el.contains(e.target as Node) &&
          !popoverContent.contains(e.target as Node)
        ) {
          popoverContent.style.display = 'none';
        }
      });

      // Очищаем ресурсы при удалении события
      return () => {
        popoverContent.remove();
      };
    },
    eventDisplay: 'block',
    // Возможность выбора временных слотов
    // Используем более подходящий параметр для timegrid
    select: handleSelectCell,
    // Делаем события интерактивными
    eventInteractive: true,
    // Опции для взаимодействия с сеткой
    dateClick: handleDateClick,
  } as CalendarOptions; // Используем приведение типа для решения проблемы с неизвестными свойствами

  const value = {
    loading,
    error,
    events,
    resources,
    employeeOptions,
    specialtyOptions: postOptions,
    divisionOptions,
    calendarOptions,
    currentDate,
    selectedInterval,
    onPrevDay,
    onNextDay,
    onToday,
    onEmployeeFilterChange: (value: string[]) =>
      handleFilterChange('employees', value),
    onSpecialtyFilterChange: (value: string[]) =>
      handleFilterChange('posts', value),
    onEquipmentFilterChange: (value: string[]) =>
      handleFilterChange('equipment', value),
    onServiceFilterChange: (value: string[]) =>
      handleFilterChange('service', value),
    onBranchFilterChange: (value: string[]) =>
      handleFilterChange('divisions', value),
    onTimeClick: (v: 15 | 30 | 60) => setSelectedInterval(v),
    onSearchClick: () => {},
  };

  return (
    <SlotProvider onSelectSlot={handleSlotSelect}>
      <ScheduleContext.Provider value={value}>
        {children}
      </ScheduleContext.Provider>
    </SlotProvider>
  );
};
