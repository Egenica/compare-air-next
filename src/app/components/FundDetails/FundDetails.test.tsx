import React, { act } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FundDetails from './FundDetails';
import { fetchFundData } from '../../server/getData';
import { mockFundData } from './data.mock';

jest.mock('../../server/getData');

describe('FundDetails Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with a selected fund', async () => {
    (fetchFundData as jest.Mock).mockResolvedValue(mockFundData);
    await act(async () => {
      render(<FundDetails selectedFund="test-fund" />);
    });

    await waitFor(() => {
      expect(screen.getByText('Test Fund')).toBeInTheDocument();
    });
  });

  test('displays error message on fetch failure', async () => {
    (fetchFundData as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch')
    );

    await act(async () => {
      render(<FundDetails selectedFund="test-fund" />);
    });

    await waitFor(() => {
      expect(
        screen.getByText('Failed to load fund details. Please try again later.')
      ).toBeInTheDocument();
    });
  });

  test('displays message when no fund is selected', async () => {
    await act(async () => {
      render(<FundDetails selectedFund="" />);
    });

    expect(
      screen.getByText('Select a fund to see its details')
    ).toBeInTheDocument();
  });

  test('displays fetched data correctly', async () => {
    (fetchFundData as jest.Mock).mockResolvedValue(mockFundData);

    await act(async () => {
      render(<FundDetails selectedFund="test-fund" />);
    });

    await waitFor(() => {
      expect(screen.getByText('Test Fund')).toBeInTheDocument();
      expect(screen.getByText('TF')).toBeInTheDocument();
      expect(screen.getByText('Test Sector')).toBeInTheDocument();
      expect(screen.getByText('Test Objective')).toBeInTheDocument();
    });
  });
});
