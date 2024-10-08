'use server';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'X-API-Key':
      'e7af74b64ec91fa7eb84aced1aadcbd09d9bb0ee1e11982b4d6e6ea9d4685e85',
  },
};

export const getCityData = async () => {
  const response = await fetch(
    'https://api.openaq.org/v2/cities?limit=100&page=1&offset=0&sort=asc&country=GB&order_by=city',
    options
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to parse response as JSON');
  }
};

export const getCityCardData = async (city: string) => {
  const response = await fetch(
    `https://api.openaq.org/v2/locations?limit=100&page=1&offset=0&sort=desc&radius=1000&country=GB&city=${city}&order_by=lastUpdated&dumpRaw=false`,
    options
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to parse response as JSON');
  }
};
