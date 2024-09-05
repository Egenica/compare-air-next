import App from './App';
import { getData } from './server/getData';
import { Data } from './types/data';

export default async function Home() {
  const data: Data[] = await getData();

  return <App data={data} />;
}
