import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Search } from './Search';
import { getCityData } from '../../server/getData';
import { ICitysResult } from './../../types/IResult';

jest.mock('../../server/getData');

describe('Search Component', () => {
  const mockCityData: ICitysResult[] = [
    { city: 'New York', country: 'USA' },
    { city: 'Los Angeles', country: 'USA' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('test_fetch_and_display_city_data', async () => {
    (getCityData as jest.Mock).mockResolvedValue({ results: mockCityData });

    render(<Search />);

    fireEvent.change(screen.getByPlaceholderText('Search for a city'), {
      target: { value: 'New York' },
    });

    await waitFor(() => expect(getCityData).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(screen.getByText('New York')).toBeInTheDocument()
    );
  });

  it('test_display_error_message_on_data_load_failure', async () => {
    (getCityData as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

    render(<Search />);

    await waitFor(() =>
      expect(screen.getByText('Failed to load city data')).toBeInTheDocument()
    );
  });
});
