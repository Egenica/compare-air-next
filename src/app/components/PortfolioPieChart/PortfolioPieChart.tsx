import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

// Pie chart component
interface PortfolioAsset {
  label: string;
  value: number;
}

export const PortfolioPieChart = ({
  portfolio,
}: {
  portfolio: PortfolioAsset[];
}) => {
  const labels = portfolio.map((asset: PortfolioAsset) => asset.label);

  const data = portfolio.map((asset: PortfolioAsset) => asset.value);

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
      },
    ],
  };

  return <Pie data={chartData} />;
};
