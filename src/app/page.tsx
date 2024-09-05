//import { promises as fs } from 'fs';
import App from './App';
import { Data } from './types/data';
import { getData } from './server/getData';

export default async function Home() {
  // const file = await fs.readFile(process.cwd() + '/src/app/data.json', 'utf8');
  // const data: Data[] = JSON.parse(file);

  const data: Data[] = await getData();

  return (
    <>
      <App data={data} />
    </>
  );
}
