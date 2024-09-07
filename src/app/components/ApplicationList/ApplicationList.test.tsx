import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ApplicationList } from './ApplicationList';
import { Data } from '../../types/data';

describe('ApplicationList', () => {
  const mockApplications: Data[] = [
    {
      id: '1',
      name: 'App One',
      spend: 1000,
      BCAP1: 'value1',
      BCAP2: 'value2',
      BCAP3: 'value3',
    },
    {
      id: '2',
      name: 'App Two',
      spend: 2000,
      BCAP1: 'value1',
      BCAP2: 'value2',
      BCAP3: 'value3',
    },
    {
      id: '3',
      name: 'App Three',
      spend: 3000,
      BCAP1: 'value1',
      BCAP2: 'value2',
      BCAP3: 'value3',
    },
    {
      id: '4',
      name: 'App Four',
      spend: 4000,
      BCAP1: 'value1',
      BCAP2: 'value2',
      BCAP3: 'value3',
    },
  ];

  test('renders without crashing', () => {
    render(<ApplicationList applications={mockApplications} />);
  });

  test('renders the correct number of applications', () => {
    render(<ApplicationList applications={mockApplications} />);
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(mockApplications.length);
  });

  test('renders application names correctly', () => {
    render(<ApplicationList applications={mockApplications} />);
    mockApplications.forEach((app) => {
      expect(screen.getByText(app.name)).toBeInTheDocument();
    });
  });

  test('renders application spend correctly', () => {
    render(<ApplicationList applications={mockApplications} />);
    mockApplications.forEach((app) => {
      expect(
        screen.getByText(`$${app.spend.toLocaleString()}`)
      ).toBeInTheDocument();
    });
  });

  test('renders the correct structure and styles', () => {
    render(<ApplicationList applications={mockApplications} />);
    const items = screen.getAllByRole('listitem');
    items.forEach((item) => {
      expect(item).toHaveClass(
        'p-2 py-8 flex-[1_1_calc(25%_-_1.5rem)] box-border flex flex-col justify-center items-center text-center rounded shadow-lg bg-gradient-to-br from-[#0f009f00] via-[#0000005c] to-transparent border border-[#ffffff30]'
      );
    });
  });

  test('renders the correct structure and styles for application names', () => {
    render(<ApplicationList applications={mockApplications} />);
    const names = screen.getAllByText(/App/);
    names.forEach((name) => {
      expect(name).toHaveClass('mb-1 font-bold text-white opacity-80');
    });
  });
});
