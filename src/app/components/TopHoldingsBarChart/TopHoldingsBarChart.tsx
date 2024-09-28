// export const TopHoldingsBarChart = ({
//   holdings,
// }: {
//   holdings: { name: string; weighting: number }[];
// }) => {
//   // Determine the maximum weighting to normalize the bar lengths
//   const maxWeighting = Math.max(
//     ...holdings.map((holding) => holding.weighting)
//   );

//   return (
//     <div className="mt-4">
//       <h3 className="text-lg font-semibold mb-2">Top 10 Holdings</h3>
//       <div className="space-y-2">
//         {holdings.map((holding) => (
//           <div key={holding.name} className="flex items-center">
//             {/* Holding name */}
//             <span className="w-1/3 text-sm">{holding.name}</span>

//             {/* Bar container */}
//             <div className="w-2/3 bg-gray-200 h-5 ml-2 relative">
//               {/* Bar */}
//               <div
//                 className="bg-blue-600 h-5"
//                 style={{
//                   width: `${(holding.weighting / maxWeighting) * 100}%`, // Normalize the width based on the maximum weighting
//                 }}
//               ></div>

//               {/* Display weighting as a label inside the bar */}
//               <span className="absolute right-2 top-0 text-xs text-white h-5 flex items-center">
//                 {holding.weighting.toFixed(2)}%
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const TopHoldingsBarChart = ({
  holdings,
}: {
  holdings: { name: string; weighting: number }[];
}) => {
  // Prepare chart data and options
  const data = {
    labels: holdings.map((holding) => holding.name), // Holding names as labels
    datasets: [
      {
        label: 'Weighting (%)',
        data: holdings.map((holding) => holding.weighting), // Holding weights as data
        backgroundColor: 'rgba(54, 162, 235, 0.7)', // Bar color (blue with transparency)
        borderColor: 'rgba(54, 162, 235, 1)', // Bar border color
        borderWidth: 1, // Bar border thickness
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const, // Horizontal bar chart
    scales: {
      x: {
        beginAtZero: true, // Start the x-axis at 0
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide legend (optional, as there is only one dataset)
      },
      title: {
        display: true,
        text: 'Top 10 Holdings', // Chart title
      },
    },
  };

  return (
    <div className="mt-4">
      <Bar data={data} options={options} />
    </div>
  );
};
