import { promises as fs } from 'fs';
// import App from './App';

export type Data = {
  id: string;
  name: string;
  spend: number;
  BCAP1: string;
  BCAP2: string;
  BCAP3: string;
};

export default async function Home() {
  const file = await fs.readFile(process.cwd() + '/src/app/data.json', 'utf8');
  const data: Data[] = JSON.parse(file);
  return (
    <>
      {data.map((app) => (
        <div
          key={app.id}
          className="border border-gray-300 m-[0.1rem] p-2 flex-[1_1_calc(25%_-_1.5rem)] box-border flex flex-col justify-center items-center text-center"
        >
          <h3 className="mb-0">{app.name}</h3>
          <p className="whitespace-nowrap">
            Total spend: ${app.spend.toLocaleString()}
          </p>
        </div>
      ))}

      {/* <App /> */}
    </>
  );
}
