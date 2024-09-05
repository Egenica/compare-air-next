import fs from 'fs/promises';
import { Data } from './../types/data';

export const getData = async (): Promise<Data[]> => {
  const file = await fs.readFile(process.cwd() + '/src/app/data.json', 'utf8');
  const data: Data[] = JSON.parse(file);
  return data;
};
