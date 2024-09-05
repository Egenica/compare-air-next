'use server';
import { promises as fs } from 'fs';

export type Data = {
  id: string;
  name: string;
  spend: number;
  BCAP1: string;
  BCAP2: string;
  BCAP3: string;
};

export default async function getData() {
  const file = await fs.readFile(process.cwd() + '/src/app/data.json', 'utf8');
  const data: Data[] = JSON.parse(file);
  console.log(data);
  return data;
}
