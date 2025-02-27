import axios from 'axios';

import { BASE_URL } from '../constants';

// Базовый URL OData-сервиса
const ODATA_API_URL = BASE_URL + '/odata/standard.odata';

// Создаём экземпляр axios
const axiosClient = axios.create({
  baseURL: ODATA_API_URL,
  auth: {
    username: 'odata_user',
    password: '123',
  },
});

export async function fetchEntity(entityName: string) {
  try {
    const response = await axiosClient.get(
      encodeURI(`/${entityName}?$format=json`)
    );
    console.log('Данные из OData:', response.data);
    return response.data;
  } catch (error) {
    console.error('Ошибка при запросе к OData:', error);
  }
}
