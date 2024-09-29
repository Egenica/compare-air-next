import React from 'react';
import { render } from '@testing-library/react';
import { PortfolioPieChart } from './PortfolioPieChart';
import { Pie } from 'react-chartjs-2';

jest.mock('react-chartjs-2', () => ({
  Pie: jest.fn(() => null),
}));

describe('PortfolioPieChart', () => {
  const mockPortfolio = [
    { label: 'Stocks', value: 50 },
    { label: 'Bonds', value: 30 },
    { label: 'Real Estate', value: 20 },
  ];

  it('renders without crashing', () => {
    render(<PortfolioPieChart portfolio={mockPortfolio} />);
  });

  it('correctly processes the portfolio prop', () => {
    render(<PortfolioPieChart portfolio={mockPortfolio} />);
    expect(Pie).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          labels: ['Stocks', 'Bonds', 'Real Estate'],
          datasets: [
            expect.objectContaining({
              data: [50, 30, 20],
            }),
          ],
        }),
      }),
      {}
    );
  });

  it('generates correct chart data from portfolio prop', () => {
    render(<PortfolioPieChart portfolio={mockPortfolio} />);
    const expectedData = {
      labels: ['Stocks', 'Bonds', 'Real Estate'],
      datasets: [
        {
          data: [50, 30, 20],
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
    expect(Pie).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expectedData,
      }),
      {}
    );
  });
});
