import axios from 'axios';
import qs from 'qs';

import { encodeBase64 } from '@/shared/lib/utils';

// const BASE_URL = 'apitables/api/hs/v1';
const BASE_URL = 'apitables/hs/v1';

// http://212.41.9.83/webSavinov/hs/v1/recordings

const scheduleClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Basic ${encodeBase64('Администратор:')}`,
  },
});

export async function getRecordingsWithStatus({
  paginate,
  page,
  perPage,
}: {
  paginate?: boolean;
  page?: number;
  perPage?: number;
}): Promise<unknown> {
  try {
    let data = qs.stringify({
      json: JSON.stringify({
        pagination: { paginate, page, perPage },
      }),
    });

    console.log('*** api', { paginate, page, perPage, data });

    const response = await scheduleClient.request({
      method: 'post',
      url: '/recordings',
      data: data,
    });

    console.log('*** api response', { response });

    return response.data;
  } catch (error) {
    console.error('Ошибка:', error);
  }
}
