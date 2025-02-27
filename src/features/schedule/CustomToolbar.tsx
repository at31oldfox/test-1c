import React from 'react';

import styled from '@emotion/styled';
import { ChevronLeft, ChevronRight, Clock, Filter, Search } from 'lucide-react';

// Импорт наших компонентов
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { MultiSelect } from '@/shared/ui/multi-select';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';

import { useScheduleContext } from './model/context';

// Стилизованные компоненты
const ToolbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
`;

const LeftToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RightToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CurrentDate = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
`;

const TodayButton = styled(Button)`
  padding-left: 3rem;
  padding-right: 3rem;
  cursor: pointer;
`;

const StyledButton = styled(Button)`
  cursor: pointer;
`;

const FilterSection = styled.div`
  margin-bottom: 0.5rem;
`;

const FilterLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
`;

const StyledPopoverContent = styled(PopoverContent)`
  padding: 0.5rem;
  width: 16rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TimePopoverContent = styled(PopoverContent)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TimeButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const StyledMultiSelect = styled(MultiSelect)`
  cursor: pointer;

  & button {
    cursor: pointer;
  }
`;

const CustomToolbar: React.FC = () => {
  const {
    currentDate,
    onPrevDay,
    onNextDay,
    onToday,
    employeeOptions,
    specialtyOptions,
    divisionOptions,
    onEmployeeFilterChange,
    onSpecialtyFilterChange,
    onEquipmentFilterChange,
    onServiceFilterChange,
    onBranchFilterChange,
    onTimeClick,
  } = useScheduleContext();

  // Обработчики изменения для мультиселектов
  const handleEquipmentChange = (selected: string[]) => {
    if (onEquipmentFilterChange) {
      onEquipmentFilterChange(selected);
    }
  };

  const handleServiceChange = (selected: string[]) => {
    if (onServiceFilterChange) {
      onServiceFilterChange(selected);
    }
  };

  const handleBranchChange = (selected: string[]) => {
    if (onBranchFilterChange) {
      onBranchFilterChange(selected);
    }
  };

  // Форматируем текущую дату
  const formattedDate = currentDate.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <ToolbarContainer className="custom-toolbar">
      {/* Левая часть тулбара */}
      <LeftToolbar>
        <StyledButton variant="outline" onClick={onPrevDay}>
          <ChevronLeft size={20} />
        </StyledButton>
        <CurrentDate>{formattedDate}</CurrentDate>
        <StyledButton variant="outline" onClick={onNextDay}>
          <ChevronRight size={20} />
        </StyledButton>
        <TodayButton onClick={onToday}>Сегодня</TodayButton>
      </LeftToolbar>
      {/* Правая часть тулбара */}
      <RightToolbar>
        <StyledMultiSelect
          placeholder="Сотрудник"
          maxCount={3}
          options={employeeOptions}
          onValueChange={onEmployeeFilterChange}
        />
        <StyledMultiSelect
          placeholder="Специальность"
          maxCount={3}
          options={specialtyOptions}
          onValueChange={onSpecialtyFilterChange}
        />
        <Popover>
          <PopoverTrigger asChild>
            <StyledButton variant="outline">
              <Filter size={20} />
            </StyledButton>
          </PopoverTrigger>
          <StyledPopoverContent>
            <FilterSection>
              <FilterLabel>Оборудование</FilterLabel>
              <StyledMultiSelect
                placeholder="Оборудование"
                maxCount={3}
                options={[]} // Пустой массив, так как у нас нет опций оборудования
                onValueChange={handleEquipmentChange}
              />
            </FilterSection>
            <FilterSection>
              <FilterLabel>Услуга</FilterLabel>
              <StyledMultiSelect
                placeholder="Услуга"
                maxCount={3}
                options={[]} // Пустой массив, так как у нас нет опций услуг
                onValueChange={handleServiceChange}
              />
            </FilterSection>
            <FilterSection>
              <FilterLabel>Филиал</FilterLabel>
              <StyledMultiSelect
                placeholder="Филиал"
                maxCount={3}
                options={divisionOptions}
                onValueChange={handleBranchChange}
              />
            </FilterSection>
          </StyledPopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <StyledButton variant="outline">
              <Clock size={20} />
            </StyledButton>
          </PopoverTrigger>
          <TimePopoverContent>
            <h3>Временные интервалы</h3>
            <TimeButtonsContainer>
              <StyledButton variant="outline" onClick={() => onTimeClick(15)}>
                15 мин
              </StyledButton>
              <StyledButton variant="outline" onClick={() => onTimeClick(30)}>
                30 мин
              </StyledButton>
              <StyledButton variant="outline" onClick={() => onTimeClick(60)}>
                1 час
              </StyledButton>
            </TimeButtonsContainer>
          </TimePopoverContent>
        </Popover>
        <Sheet>
          <SheetTrigger asChild>
            <StyledButton>
              <Search size={20} />
            </StyledButton>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Поиск</SheetTitle>
              <SheetDescription>
                Введите имя клиента или номер телефона
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4 flex flex-col gap-4">
              <Input placeholder="Имя клиента или телефон" />
              <Button>Найти</Button>
            </div>
          </SheetContent>
        </Sheet>
      </RightToolbar>
    </ToolbarContainer>
  );
};

export default CustomToolbar;
