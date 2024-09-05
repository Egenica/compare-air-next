import { Data } from './../types/data';

export const ApplicationList = ({ applications }: { applications: Data[] }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {applications.map((app) => (
        <div
          key={app.id}
          className="border border-gray-200 m-[0.1rem] p-2 py-8 flex-[1_1_calc(25%_-_1.5rem)] box-border flex flex-col justify-center items-center text-center rounded-sm shadow-md"
        >
          <h3 className="mb-1 font-bold">{app.name}</h3>
          <p className="whitespace-nowrap">
            Total spend: ${app.spend.toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};
