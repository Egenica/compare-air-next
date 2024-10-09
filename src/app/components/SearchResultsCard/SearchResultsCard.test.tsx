import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchResultsCard } from './SearchResultsCard';
import { ICitysResult } from '../../types/IResult';
import { getCityCardData } from '../../server/getData';

jest.mock('../../server/getData');

describe('SearchResultsCard Component', () => {
  const mockSetSelectedCitys = jest.fn();

  const mockResult: ICitysResult = {
    country: 'GB',
    city: 'Test City',
    count: 580233,
    locations: 2,
    firstUpdated: new Date(),
    lastUpdated: new Date(),
    parameters: ['no2', 'o3', 'pm10', 'pm25', 'so2'],
  };

  const mockCityLocations = [
    {
      id: 1,
      city: 'Test City',
      name: 'Location 1',
      lastUpdated: '2023-10-01',
      parameters: [{ id: 1, parameter: 'pm25', lastValue: 10 }],
      country: 'GB',
    },
    {
      id: 2,
      city: 'Test City 2',
      name: 'Location 2',
      lastUpdated: '2023-10-01',
      parameters: [{ id: 2, parameter: 'pm10', lastValue: 20 }],
      country: 'GB',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('test_remove_city_by_id_from_city_locations', async () => {
    (getCityCardData as jest.Mock).mockResolvedValue({
      results: mockCityLocations,
    });

    const { getByAltText, queryByText } = render(
      <SearchResultsCard
        result={mockResult}
        setSelectedCitys={mockSetSelectedCitys}
      />
    );

    await waitFor(() =>
      expect(getCityCardData).toHaveBeenCalledWith('Test City')
    );

    const closeButton = getByAltText('close-1');
    fireEvent.click(closeButton);

    expect(queryByText('Location 1')).not.toBeInTheDocument();
  });

  it('test_display_error_message_on_data_fetch_failure', async () => {
    (getCityCardData as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch')
    );

    const { findByText } = render(
      <SearchResultsCard
        result={mockResult}
        setSelectedCitys={mockSetSelectedCitys}
      />
    );

    const errorMessage = await findByText('Failed to loading city');
    expect(errorMessage).toBeInTheDocument();
  });

  it('test_city_card_animation_on_render', async () => {
    (getCityCardData as jest.Mock).mockResolvedValue({
      results: mockCityLocations,
    });

    const { container } = render(
      <SearchResultsCard
        result={mockResult}
        setSelectedCitys={mockSetSelectedCitys}
      />
    );

    await waitFor(() =>
      expect(getCityCardData).toHaveBeenCalledWith('Test City')
    );

    const card = container.querySelector('.rounded-lg');

    await waitFor(
      () => {
        expect(card).toHaveClass('opacity-100');
      },
      { timeout: 500 }
    );
  });

  it('test_city_card_animation_on_mouse_hover', async () => {
    (getCityCardData as jest.Mock).mockResolvedValue({
      results: mockCityLocations,
    });

    const { container } = render(
      <SearchResultsCard
        result={mockResult}
        setSelectedCitys={mockSetSelectedCitys}
      />
    );

    await waitFor(() =>
      expect(getCityCardData).toHaveBeenCalledWith('Test City')
    );

    const card = container.querySelector('.rounded-lg');

    if (card) {
      fireEvent.mouseOver(card);
    }

    await waitFor(
      () => {
        expect(card).toHaveClass('md:hover:scale-105');
      },
      { timeout: 500 }
    );
  });

  it('test_city_card_animation_on_mouse_leave', async () => {
    (getCityCardData as jest.Mock).mockResolvedValue({
      results: mockCityLocations,
    });

    const { container } = render(
      <SearchResultsCard
        result={mockResult}
        setSelectedCitys={mockSetSelectedCitys}
      />
    );

    await waitFor(() =>
      expect(getCityCardData).toHaveBeenCalledWith('Test City')
    );

    const card = container.querySelector('.rounded-lg');

    if (card) {
      fireEvent.mouseLeave(card);
    }

    await waitFor(
      () => {
        expect(card).toHaveClass('md:hover:scale-105');
      },
      { timeout: 500 }
    );
  });
});
