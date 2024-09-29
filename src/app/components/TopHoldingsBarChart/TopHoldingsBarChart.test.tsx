import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { TopHoldingsBarChart } from './TopHoldingsBarChart';

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
});
