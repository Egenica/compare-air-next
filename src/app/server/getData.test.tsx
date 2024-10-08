import '@testing-library/jest-dom';
import { getCityData, getCityCardData } from './getData';

describe('fetchFundData', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should throw an error if the network response is not ok', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    await expect(getCityData()).rejects.toThrow('Network response was not ok');
  });

  it('should return data if the fetch is successful and response is valid JSON', async () => {
    const mockData = { key: 'value' };
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const data = await getCityData();
    expect(data).toEqual(mockData);
  });

  it('should throw an error if the response is not valid JSON', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockRejectedValue(new Error('Invalid JSON')),
    });

    await expect(getCityData()).rejects.toThrow(
      'Failed to parse response as JSON'
    );
  });

  // getCityCardData tests

  it('should throw an error if the network response is not ok', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    await expect(getCityCardData('Manchester')).rejects.toThrow(
      'Network response was not ok'
    );
  });

  it('should return data if the fetch is successful and response is valid JSON', async () => {
    const mockData = { key: 'value' };
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const data = await getCityCardData('Manchester');
    expect(data).toEqual(mockData);
  });

  it('should throw an error if the response is not valid JSON', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockRejectedValue(new Error('Invalid JSON')),
    });

    await expect(getCityCardData('Manchester')).rejects.toThrow(
      'Failed to parse response as JSON'
    );
  });
});
