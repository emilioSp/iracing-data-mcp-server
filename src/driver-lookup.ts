import { API_BASE_URL } from './constant.js';
import { fetchData } from './repository/api.js';

export const driverLookup = async (driverName: string): Promise<any> => {
  const queryParams = new URLSearchParams();
  queryParams.append('search_term', driverName);

  const url = `${API_BASE_URL}/lookup/drivers?${queryParams.toString()}`;

  const driver = await fetchData(url);
  return driver;
};
