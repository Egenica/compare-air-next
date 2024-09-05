import { Data } from '../server/getData';

interface ApplicationListProps {
  applications: Data[];
}

export const ApplicationList = ({ applications }: ApplicationListProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {applications.map((app) => (
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
    </div>
  );
};
