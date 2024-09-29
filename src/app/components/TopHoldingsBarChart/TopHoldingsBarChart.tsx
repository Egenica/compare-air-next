import React from 'react';
import { Bar } from 'react-chartjs-2';

export const TopHoldingsBarChart = ({
  holdings,
}: {
  holdings: { name: string; weighting: number }[];
}) => {
  const data = {
    labels: holdings.map((holding) =>
      holding.name.length > 6
        ? holding.name.substring(0, 6) + '...'
        : holding.name
    ),
    datasets: [
      {
        label: 'Weighting (%)',
        data: holdings.map((holding) => holding.weighting),
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          title: (tooltipItems: { dataIndex: number }[]) => {
            const index = tooltipItems[0].dataIndex;
            return holdings[index].name;
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};
