import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

interface BarChartData {
  parameter: string;
  lastValue: number;
}

interface BarChartProps {
  data: BarChartData[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartData = data.map((prama) => ({
    parameter: prama.parameter,
    lastValue: prama.lastValue,
  }));

  return (
    <div style={{ height: 400 }}>
      <ResponsiveBar
        data={chartData}
        keys={['lastValue']}
        indexBy="parameter"
        margin={{ top: 50, right: 0, bottom: 50, left: 25 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={['#b884fc']}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          // legend: 'Parameter',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          //   legend: 'Value',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        defs={[
          {
            id: 'gradient',
            type: 'linearGradient',
            colors: [
              { offset: 0, color: '#b884fc' },
              { offset: 30, color: '#b884fc' },
              { offset: 100, color: '#3d83f6' },
            ],
          },
        ]}
        fill={[
          {
            match: '*',
            id: 'gradient',
          },
        ]}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        animate={true}
        // motionStiffness={90}
        // motionDamping={15}
      />
    </div>
  );
};

export default BarChart;
