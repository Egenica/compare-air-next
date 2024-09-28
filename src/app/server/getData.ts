'use server';

import { apiUrls } from './apiUrls';

export const fetchFundData = async (fund: string) => {
  const response = await fetch(apiUrls[fund], { cache: 'no-store' });

  if (!response.ok) {
    throw new Error('Failed to fetch fund data');
  }

  return response.json();
};
