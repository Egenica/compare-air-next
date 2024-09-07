import { Data } from '../../types/data';

export const ApplicationList = ({ applications }: { applications: Data[] }) => {
  return (
    <ul className="flex flex-wrap gap-4">
      {applications.map((app) => (
        <li
          key={app.id}
          className="p-2 py-8 lg:flex-[1_1_calc(25%_-_1.5rem)] box-border flex flex-col justify-center items-center text-center rounded shadow-lg bg-gradient-to-br from-[#0f009f00] via-[#0000005c] to-transparent border border-[#ffffff30] flex-grow"
        >
          <h3 className="mb-1 font-bold text-white opacity-80">{app.name}</h3>
          <p className="whitespace-nowrap text-white text-sm">
            <span className="opacity-50">Total spend: </span>
            <span className="font-bold opacity-70">
              ${app.spend.toLocaleString()}
            </span>
          </p>
        </li>
      ))}
    </ul>
  );
};
