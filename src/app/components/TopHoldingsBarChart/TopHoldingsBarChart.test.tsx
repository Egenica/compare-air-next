import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { TopHoldingsBarChart } from './TopHoldingsBarChart';
import 'jest-canvas-mock';

describe('TopHoldingsBarChart', () => {
  const mockHoldings = [
    { name: 'Apple', weighting: 30 },
    { name: 'Microsoft', weighting: 25 },
    { name: 'Google', weighting: 20 },
    { name: 'Amazon', weighting: 15 },
    { name: 'Facebook', weighting: 10 },
  ];

  it('renders without crashing', async () => {
    render(<TopHoldingsBarChart holdings={mockHoldings} />);
  });

  it('displays the chart', async () => {
    render(<TopHoldingsBarChart holdings={mockHoldings} />);
    const bars = screen.getAllByRole('img', { hidden: true });
    expect(bars.length).toBe(1);
  });

  it('should return the correct name from holdings based on dataIndex', () => {
    const holdings = [
      { name: 'Holding 1', weighting: 10 },
      { name: 'Holding 2', weighting: 20 },
      { name: 'Holding 3', weighting: 30 },
    ];

    const tooltipItems = [{ dataIndex: 1 }];

    // Mock the Bar component to access the options
    jest.mock('react-chartjs-2', () => ({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Bar: ({ options }: { options: any }) => {
        const titleCallback = options.plugins.tooltip.callbacks.title;
        expect(titleCallback(tooltipItems)).toBe('Holding 2');
        return null;
      },
    }));

    render(<TopHoldingsBarChart holdings={holdings} />);
  });
});
