import axios from 'axios';

import { encodeBase64 } from '@/shared/lib/utils';

import { BASE_URL } from '../constants';

import {
  DivisionFilter,
  EmployeeFilter,
  EquipmentFilter,
  NomenclatureFilter,
  PostFilter,
  WorkScheduleResponse,
} from './types';

const SCHEDULE_API_URL = `${BASE_URL}/hs/shedule`;

const scheduleClient = axios.create({
  baseURL: SCHEDULE_API_URL,
  headers: {
    Authorization: `Basic ${encodeBase64('Администратор:')}`,
  },
});

// Получение графиков работы сотрудников за день
export async function getWorkSchedule(
  period: string,
  employees?: string[],
  posts?: string[],
  divisions?: string[],
  equipment?: string[],
  nomenclature?: string[]
): Promise<WorkScheduleResponse | undefined> {
  try {
    const response = await scheduleClient.get('/work_schedule', {
      params: {
        period,
        employees: employees ? JSON.stringify(employees) : undefined,
        posts: posts ? JSON.stringify(posts) : undefined,
        divisions: divisions ? JSON.stringify(divisions) : undefined,
        equipment: equipment ? JSON.stringify(equipment) : undefined,
        nomenclature: nomenclature ? JSON.stringify(nomenclature) : undefined,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Ошибка при получении графика работы:', error);
  }
}

// Получение списка сотрудников для фильтра
export async function getEmployeeFilters(
  period: string,
  employees?: string[],
  posts?: string[],
  divisions?: string[],
  equipment?: string[],
  nomenclature?: string[]
): Promise<EmployeeFilter[] | undefined> {
  try {
    const response = await scheduleClient.get('/employees_filters', {
      params: {
        period,
        employees: employees ? JSON.stringify(employees) : undefined,
        posts: posts ? JSON.stringify(posts) : undefined,
        divisions: divisions ? JSON.stringify(divisions) : undefined,
        equipment: equipment ? JSON.stringify(equipment) : undefined,
        nomenclature: nomenclature ? JSON.stringify(nomenclature) : undefined,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Ошибка при получении фильтров сотрудников:', error);
  }
}

// Получение списка должностей для фильтра
export async function getPostFilters(
  period: string,
  employees?: string[],
  posts?: string[],
  divisions?: string[],
  equipment?: string[],
  nomenclature?: string[]
): Promise<PostFilter[] | undefined> {
  try {
    const response = await scheduleClient.get('/posts_filters', {
      params: {
        period,
        employees: employees ? JSON.stringify(employees) : undefined,
        posts: posts ? JSON.stringify(posts) : undefined,
        divisions: divisions ? JSON.stringify(divisions) : undefined,
        equipment: equipment ? JSON.stringify(equipment) : undefined,
        nomenclature: nomenclature ? JSON.stringify(nomenclature) : undefined,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Ошибка при получении фильтров должностей:', error);
  }
}

// Получение списка подразделений для фильтра
export async function getDivisionFilters(
  period: string,
  employees?: string[],
  posts?: string[],
  divisions?: string[],
  equipment?: string[],
  nomenclature?: string[]
): Promise<DivisionFilter[] | undefined> {
  try {
    const response = await scheduleClient.get('/divisions_filters', {
      params: {
        period,
        employees: employees ? JSON.stringify(employees) : undefined,
        posts: posts ? JSON.stringify(posts) : undefined,
        divisions: divisions ? JSON.stringify(divisions) : undefined,
        equipment: equipment ? JSON.stringify(equipment) : undefined,
        nomenclature: nomenclature ? JSON.stringify(nomenclature) : undefined,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Ошибка при получении фильтров подразделений:', error);
  }
}

// Получение списка оборудования для фильтра
export async function getEquipmentFilters(
  period: string,
  employees?: string[],
  posts?: string[],
  divisions?: string[],
  equipment?: string[],
  nomenclature?: string[]
): Promise<EquipmentFilter[] | undefined> {
  try {
    const response = await scheduleClient.get('/equipment_filters', {
      params: {
        period,
        employees: employees ? JSON.stringify(employees) : undefined,
        posts: posts ? JSON.stringify(posts) : undefined,
        divisions: divisions ? JSON.stringify(divisions) : undefined,
        equipment: equipment ? JSON.stringify(equipment) : undefined,
        nomenclature: nomenclature ? JSON.stringify(nomenclature) : undefined,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Ошибка при получении фильтров оборудования:', error);
  }
}

// Получение списка номенклатуры для фильтра
export async function getNomenclatureFilters(
  period: string,
  employees?: string[],
  posts?: string[],
  divisions?: string[],
  equipment?: string[],
  nomenclature?: string[]
): Promise<NomenclatureFilter[] | undefined> {
  try {
    const response = await scheduleClient.get('/nomenclature_filters', {
      params: {
        period,
        employees: employees ? JSON.stringify(employees) : undefined,
        posts: posts ? JSON.stringify(posts) : undefined,
        divisions: divisions ? JSON.stringify(divisions) : undefined,
        equipment: equipment ? JSON.stringify(equipment) : undefined,
        nomenclature: nomenclature ? JSON.stringify(nomenclature) : undefined,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Ошибка при получении фильтров номенклатуры:', error);
  }
}
