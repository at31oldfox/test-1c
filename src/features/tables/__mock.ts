import { getRecordingsWithStatus } from '../../shared/api/tables/tables';

import { TNamedFilter } from './components/filter-context/filter-context';
import { TApiResponse } from './EntriesOnConfirmation/EntriesOnConfirmationTable';
import { format } from 'date-fns';

const _mock = [
  {
    id: 1,
    date: new Date(2024, 6, 15),
    timeInterval: '10:00 - 11:30',
    client: { name: 'Иванов1 Алексей', phone: '+7 (999) 123-45-67' },
    employee: { name: 'Петрова1 Мария', position: 'Стилист' },
    services: [
      'Стрижка',
      'Окрашивание',
      'Стрижка',
      'Окрашивание',
      'Стрижка',
      'Окрашивание',
      'Стрижка',
      'Окрашивание',
    ],
    amount: 4500,
    branch: 'Центральный',
  },
  {
    id: 2,
    date: new Date(2024, 6, 15),
    timeInterval: '10:00 - 11:30',
    client: { name: 'Иванов2 Алексей', phone: '+7 (999) 123-45-67' },
    employee: { name: 'Петрова2 Мария', position: 'Стилист' },
    services: ['Стрижка', 'Окрашивание'],
    amount: 7500,
    branch: 'Центральный',
  },
  {
    id: 3,
    date: new Date(2024, 6, 15),
    timeInterval: '10:00 - 11:30',
    client: { name: 'Иванов3 Алексей', phone: '+7 (999) 123-45-67' },
    employee: { name: 'Петрова3 Мария', position: 'Стилист' },
    services: ['Стрижка', 'Окрашивание'],
    amount: 1500,
    branch: 'Центральный',
  },
];

export const mock = [
  ..._mock,
  ..._mock,
  ..._mock,
  ..._mock,
  ..._mock,
  ..._mock,
  ..._mock,
];

export const __mock = [
  {
    id: 1,
    date: new Date(2024, 6, 15),
    timeInterval: '10:00 - 11:30',
    client: { name: 'Иванов1 Алексей', phone: '+7 (999) 123-45-67' },
    employee: { name: 'Петрова1 Мария', position: 'Стилист' },
    services: ['Стрижка', 'Окрашивание'],
    amount: 4500,
    branch: 'Центральный',
  },
];

export const fetchMockData = async (page: number, filters: TNamedFilter[]) => {
  const gData = new Array(10).fill('').map((_, index) => {
    return {
      id: page + index,
      date: new Date(2024, 6, 15),
      timeInterval: '10:00 - 11:30',
      client: {
        name: `${page}-Иванов-${index} Алексей`,
        phone: '+7 (999) 123-45-67',
      },
      employee: { name: `Петрова${index} Мария`, position: 'Стилист' },
      services: [
        'Стрижка',
        'Окрашивание',
        'Стрижка',
        'Окрашивание',
        'Стрижка',
        'Окрашивание',
      ],
      amount: Math.ceil(Math.random() * 1000),
      branch: 'Центральный',
    };
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    data: gData,
    meta: {
      totalRowCount: 100,
      page,
      filters: [
        { name: 'amount', value: [1000, 5000] },
        { name: 'employee', value: ['Петрова0 Мария', 'Петрова1 Мария'] },
      ],
    },
  } as TApiResponse;
};

export const _fetchMockData = async (page: number, filters: TNamedFilter[]) => {
  const result = await getRecordingsWithStatus({
    paginate: true,
    page,
    perPage: 100,
  });

  console.log('*** _mock', { result });

  /**
 * {
    "recordingId": "70c3b6a1-0bc0-11ef-af91-309c23b27327",
    "recordingDate": "2024-05-08T00:00:00",
    "recordingTimeStart": "0001-01-01T17:15:00",
    "recordingTimeStartEnd": "0001-01-01T19:25:00",
    "division": "Москва_Садовое",
    "client": "Тимошкина Вероника Семёновна",
    "specialist": "Булатова Светлана Григорьевна",
    "clientStatus": "Сотрудник",
    "specialistPost": "Косметолог",
    "documentSum": 20230,
    "currentRecordingStatus": "Предварительная",
    "services": "   • Лазерная коррекция\n   • Лазерное омоложение\n   • Маникюр + покрытие гель-лаком",
    "phone": "+7 (989) 595 - 95 - 95"
}
 */

  const gData = result.data.map((item) => {
    return {
      id: item.recordingId,
      date: new Date(item.recordingDate),
      timeInterval: `${format(item.recordingTimeStart, 'HH:mm')} - ${format(item.recordingTimeStartEnd, 'HH:mm')}`,
      client: {
        name: item.client,
        phone: item.phone,
      },
      employee: { name: item.specialist, position: item.specialistPost },
      services: item.services.trim().split('•'),
      amount: item.documentSum,
      branch: item.division,
    };
  });

  return {
    data: gData,
    meta: {
      totalRowCount: 100,
      page,
      isLast: !result.data || !result.data.length,
      filters: [
        { name: 'amount', value: [1000, 5000] },
        { name: 'employee', value: ['Петрова0 Мария', 'Петрова1 Мария'] },
      ],
    },
  } as TApiResponse;
};
