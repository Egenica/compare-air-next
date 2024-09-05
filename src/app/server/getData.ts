'use server';
// import { promises as fs } from 'fs';
import { Data } from './../types/data';

// export default async function getData() {
//   const file = await fs.readFile(process.cwd() + '/src/app/data.json', 'utf8');
//   const data: Data[] = JSON.parse(file);
//   console.log(data);
//   return data;
// }

import fs from 'fs/promises';

export const getData = async (): Promise<Data[]> => {
  const file = await fs.readFile(process.cwd() + '/src/app/data.json', 'utf8');
  const data: Data[] = JSON.parse(file);
  return data;
};
