import React, { createContext, ReactNode, useContext, useState } from 'react';

// Интерфейс для информации о выбранном слоте
export interface SelectedSlot {
  resourceId: string;
  date: Date;
}

// Интерфейс для контекста слотов
interface SlotContextType {
  selectedSlot: SelectedSlot | null;
  selectSlot: (resourceId: string, date: Date) => void;
  clearSelection: () => void;
  isSlotSelected: (resourceId: string, date: Date) => boolean;
  registerSelectHandler: (
    handler: (resourceId: string, date: Date) => void
  ) => void;
}

// Создание контекста
const SlotContext = createContext<SlotContextType | undefined>(undefined);

// Хук для использования контекста
export const useSlotContext = () => {
  const context = useContext(SlotContext);
  if (context === undefined) {
    throw new Error('useSlotContext must be used within a SlotProvider');
  }
  return context;
};

// Интерфейс для провайдера
interface SlotProviderProps {
  children: ReactNode;
  onSelectSlot?: (resourceId: string, date: Date) => void;
}

// Проверка, совпадают ли две даты по часам/минутам
const datesEqual = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate() &&
    date1.getHours() === date2.getHours() &&
    date1.getMinutes() === date2.getMinutes()
  );
};

// Провайдер контекста
export const SlotProvider: React.FC<SlotProviderProps> = ({
  children,
  onSelectSlot,
}) => {
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | null>(null);
  const [externalHandler, setExternalHandler] = useState<
    ((resourceId: string, date: Date) => void) | null
  >(onSelectSlot || null);

  // Регистрация внешнего обработчика
  const registerSelectHandler = (
    handler: (resourceId: string, date: Date) => void
  ) => {
    setExternalHandler(() => handler);
  };

  const selectSlot = (resourceId: string, date: Date) => {
    // Если выбран тот же слот, снимаем выделение
    if (
      selectedSlot &&
      selectedSlot.resourceId === resourceId &&
      datesEqual(selectedSlot.date, date)
    ) {
      setSelectedSlot(null);
    } else {
      setSelectedSlot({ resourceId, date });
    }

    // Вызываем внешний обработчик, если он есть
    if (externalHandler) {
      externalHandler(resourceId, date);
    }
  };

  const clearSelection = () => {
    setSelectedSlot(null);
  };

  const isSlotSelected = (resourceId: string, date: Date): boolean => {
    if (!selectedSlot) {
      return false;
    }

    return (
      selectedSlot.resourceId === resourceId &&
      datesEqual(selectedSlot.date, date)
    );
  };

  const value = {
    selectedSlot,
    selectSlot,
    clearSelection,
    isSlotSelected,
    registerSelectHandler,
  };

  return <SlotContext.Provider value={value}>{children}</SlotContext.Provider>;
};
