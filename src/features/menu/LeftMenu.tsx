import React, { useState } from 'react';

import styled from '@emotion/styled';
import { Separator as RadixSeparator } from '@radix-ui/react-separator';
import {
  BarChart2,
  Box,
  Briefcase,
  CalendarIcon,
  ClipboardList,
  DollarSign,
  HelpCircle,
  Phone,
  Settings,
  User,
  Users,
  Wrench,
} from 'lucide-react';

import logo from '@/shared/assets/logo.svg';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/ui/accordion';
import { Button } from '@/shared/ui/button';
import { Calendar } from '@/shared/ui/calendar';

// Стилизованные компоненты
const MenuContainer = styled.div`
  width: 300px;
  display: flex;
  height: auto;
  background-color: #f5faff;
  border: solid 1px #e2f1ff;
  flex-direction: column;
`;

const LogoContainer = styled.div`
  padding: 1.5rem;
`;

const StyledLogo = styled.img`
  cursor: pointer;
`;

const StyledSeparator = styled(RadixSeparator)`
  width: 100%;
  height: 1px;
  background-color: #e2f1ff;
`;

const StyledAccordion = styled(Accordion)`
  padding: 1.5rem;
`;

const BlockIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  & svg {
    width: 1rem;
    height: 1rem;
  }
`;

// const MenuIcon = styled.svg`
//   &.single {
//     margin-right: 0.5rem;
//   }
// `;

const BlockName = styled.p`
  font-size: 15px;
  font-family: 'Onest Medium', sans-serif;
  color: #373741;
`;

const SubBlockContainer = styled.div`
  margin-left: 1rem;
`;

const SubPoint = styled.div`
  margin-top: 0.5rem;
  cursor: pointer;

  &:hover p {
    color: #000000;
  }
`;

const SubPointName = styled.p`
  font-size: 14px;
  color: #596780;
  margin-left: 0.5rem;
`;

const PhoneButton = styled(Button)`
  color: #079a6e;

  & svg {
    color: #079a6e;
  }
`;

const MyAccountButton = styled(Button)`
  margin-top: 2.5rem;
`;

// Стилизованные кнопки
const CalendarButton = styled(Button)`
  width: 100%;
  justify-content: flex-start;
  gap: 0.5rem;
`;

const IconButton = styled(Button)`
  width: 100%;
  justify-content: flex-start;
  gap: 0.5rem;
`;

const SingleIcon = styled.span`
  margin-right: 0.5rem;
`;

const LeftMenu: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <MenuContainer>
      <LogoContainer>
        <StyledLogo src={logo} alt="Aurum" />
      </LogoContainer>
      <StyledSeparator />
      <Calendar mode="single" selected={date} onSelect={setDate} />
      <StyledSeparator />
      <StyledAccordion type="single" collapsible>
        <CalendarButton variant="ghost">
          <SingleIcon>
            <CalendarIcon />
          </SingleIcon>
          <BlockName>Расписание</BlockName>
        </CalendarButton>
        <AccordionItem value="control">
          <AccordionTrigger>
            <BlockIcon>
              <ClipboardList />
              <BlockName>Контроль записей</BlockName>
            </BlockIcon>
          </AccordionTrigger>
          <AccordionContent>
            <SubBlockContainer>
              <SubPoint>
                <SubPointName>Требуют подтверждения (0)</SubPointName>
              </SubPoint>
              <SubPoint>
                <SubPointName>Клиент пришёл (0)</SubPointName>
              </SubPoint>
              <SubPoint>
                <SubPointName>Неоплаченные (0)</SubPointName>
              </SubPoint>
              <SubPoint>
                <SubPointName>Требуют переноса (0)</SubPointName>
              </SubPoint>
              <SubPoint>
                <SubPointName>Отменённые (0)</SubPointName>
              </SubPoint>
              <SubPoint>
                <SubPointName>Направления (0)</SubPointName>
              </SubPoint>
            </SubBlockContainer>
          </AccordionContent>
        </AccordionItem>
        <IconButton variant="ghost">
          <SingleIcon>
            <ClipboardList />
          </SingleIcon>
          <BlockName>Задачи</BlockName>
        </IconButton>
        <IconButton variant="ghost">
          <SingleIcon>
            <Users />
          </SingleIcon>
          <BlockName>Клиенты</BlockName>
        </IconButton>
        <AccordionItem value="price-list">
          <AccordionTrigger>
            <BlockIcon>
              <DollarSign />
              <BlockName>Прайс-лист</BlockName>
            </BlockIcon>
          </AccordionTrigger>
          <AccordionContent>
            <SubBlockContainer>
              <SubPoint>
                <SubPointName>Услуги</SubPointName>
              </SubPoint>
              <SubPoint>
                <SubPointName>Курсы услуг</SubPointName>
              </SubPoint>
              <SubPoint>
                <SubPointName>Товары</SubPointName>
              </SubPoint>
              <SubPoint>
                <SubPointName>Сертификаты</SubPointName>
              </SubPoint>
              <SubPoint>
                <SubPointName>Журнал продаж</SubPointName>
              </SubPoint>
            </SubBlockContainer>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="finance">
          <AccordionTrigger>
            <BlockIcon>
              <DollarSign />
              <BlockName>Финансы</BlockName>
            </BlockIcon>
          </AccordionTrigger>
          <AccordionContent>
            <SubBlockContainer>
              <SubPoint>
                <SubPointName>Банк</SubPointName>
              </SubPoint>
              <SubPoint>
                <SubPointName>Операции по кассе</SubPointName>
              </SubPoint>
              <SubPoint>
                <SubPointName>Кассовые смены</SubPointName>
              </SubPoint>
              <SubPoint>
                <SubPointName>Сертификаты</SubPointName>
              </SubPoint>
            </SubBlockContainer>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="salary">
          <AccordionTrigger>
            <BlockIcon>
              <DollarSign />
              <BlockName>Зарплата</BlockName>
            </BlockIcon>
          </AccordionTrigger>
          <AccordionContent>
            <SubBlockContainer>
              <SubPoint>
                <SubPointName>Условия начисления</SubPointName>
              </SubPoint>
              <SubPoint>
                <SubPointName>KPI по зарплате</SubPointName>
              </SubPoint>
              <SubPoint>
                <SubPointName>Алгоритм расчёта</SubPointName>
              </SubPoint>
              <SubPoint>
                <SubPointName>Разовые начисления</SubPointName>
              </SubPoint>
              <SubPoint>
                <SubPointName>Расчёт зарплаты</SubPointName>
              </SubPoint>
              <SubPoint>
                <SubPointName>Отчёты</SubPointName>
              </SubPoint>
            </SubBlockContainer>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="staff">
          <AccordionTrigger>
            <BlockIcon>
              <Briefcase />
              <BlockName>Кадры</BlockName>
            </BlockIcon>
          </AccordionTrigger>
          <AccordionContent>
            <SubBlockContainer>
              <SubPoint>
                <SubPointName>Графики работы</SubPointName>
              </SubPoint>
              <SubPoint>
                <SubPointName>Сотрудники</SubPointName>
              </SubPoint>
            </SubBlockContainer>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="equipment">
          <AccordionTrigger>
            <BlockIcon>
              <Wrench />
              <BlockName>Оборудование</BlockName>
            </BlockIcon>
          </AccordionTrigger>
          <AccordionContent>
            <SubBlockContainer>
              <SubPoint>
                <SubPointName>Действующее</SubPointName>
              </SubPoint>
              <SubPoint>
                <SubPointName>Списанное</SubPointName>
              </SubPoint>
              <SubPoint>
                <SubPointName>Карты ТО</SubPointName>
              </SubPoint>
            </SubBlockContainer>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="warehouse">
          <AccordionTrigger>
            <BlockIcon>
              <Box />
              <BlockName>Склад</BlockName>
            </BlockIcon>
          </AccordionTrigger>
          <AccordionContent>
            <SubBlockContainer>
              <SubPoint>
                <SubPointName>Потребность</SubPointName>
              </SubPoint>
              <SubPoint>
                <SubPointName>Поступления</SubPointName>
              </SubPoint>
              <SubPoint>
                <SubPointName>Списания</SubPointName>
              </SubPoint>
              <SubPoint>
                <SubPointName>Перемещения</SubPointName>
              </SubPoint>
              <SubPoint>
                <SubPointName>Остатки</SubPointName>
              </SubPoint>
              <SubPoint>
                <SubPointName>Инвентаризация</SubPointName>
              </SubPoint>
              <SubPoint>
                <SubPointName>Контроль</SubPointName>
              </SubPoint>
            </SubBlockContainer>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="marketing">
          <AccordionTrigger>
            <BlockIcon>
              <BarChart2 />
              <BlockName>Маркетинг</BlockName>
            </BlockIcon>
          </AccordionTrigger>
          <AccordionContent>
            <SubBlockContainer>
              <SubPoint>
                <SubPointName>Начисление бонусов</SubPointName>
              </SubPoint>
              <SubPoint>
                <SubPointName>Проведение акции</SubPointName>
              </SubPoint>
              <SubPoint>
                <SubPointName>Настройка акции</SubPointName>
              </SubPoint>
            </SubBlockContainer>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="help">
          <AccordionTrigger>
            <BlockIcon>
              <HelpCircle />
              <BlockName>Помощь</BlockName>
            </BlockIcon>
          </AccordionTrigger>
          <AccordionContent>
            <SubBlockContainer>
              <SubPoint>
                <SubPointName>Telegram</SubPointName>
              </SubPoint>
              <SubPoint>
                <SubPointName>Wats App</SubPointName>
              </SubPoint>
              <SubPoint>
                <SubPointName>Вк</SubPointName>
              </SubPoint>
              <SubPoint>
                <SubPointName>Инструкции</SubPointName>
              </SubPoint>
              <SubPoint>
                <SubPointName>Сообщить об ошибке</SubPointName>
              </SubPoint>
            </SubBlockContainer>
          </AccordionContent>
        </AccordionItem>
        <PhoneButton variant="ghost">
          <Phone />
          <p>Позвонить</p>
        </PhoneButton>
        <AccordionItem value="settings">
          <AccordionTrigger>
            <BlockIcon>
              <Settings />
              <BlockName>Настройки</BlockName>
            </BlockIcon>
          </AccordionTrigger>
        </AccordionItem>

        <MyAccountButton variant="ghost">
          <SingleIcon>
            <User />
          </SingleIcon>
          <BlockName>Мой кабинет</BlockName>
        </MyAccountButton>
      </StyledAccordion>
    </MenuContainer>
  );
};

export default LeftMenu;
