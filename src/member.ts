import { storage } from '../storage.js';
import { API_BASE_URL } from './constant.js';

interface MemberResponse {
  link: string;
}

interface MemberData {
  members: Array<{
    licenses: unknown; // Type this more specifically if you know the structure
  }>;
}

export const member = async (): Promise<void> => {
  const store = storage.getStore();
  if (!store) {
    throw new Error('Storage context not found');
  }

  const { authCookie } = store;
  const headers = new Headers();
  headers.append('Cookie', authCookie);

  const response = await fetch(
    'https://members-ng.iracing.com/data/member/get?include_licenses=true&cust_ids=900937',
    {
      method: 'GET',
      headers,
      redirect: 'follow',
    },
  ).then((response) => response.json()) as MemberResponse;

  const data = await fetch(response.link).then((response) => response.json()) as MemberData;
  console.log(data.members[0].licenses);
}; 