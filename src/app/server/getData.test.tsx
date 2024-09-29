import '@testing-library/jest-dom';
import { fetchFundData } from './getData';

jest.mock('./apiUrls', () => ({
  apiUrls: {
    fund1: 'https://api.example.com/fund1',
    fund2: 'https://api.example.com/fund2',
  },
}));

describe('fetchFundData', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should throw an error if the fund is not found in apiUrls', async () => {
    await expect(fetchFundData('unknownFund')).rejects.toThrow(
      'Fund not found in apiUrls'
    );
  });

  it('should throw an error if the network response is not ok', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    await expect(fetchFundData('fund1')).rejects.toThrow(
      'Network response was not ok'
    );
  });

  it('should return data if the fetch is successful and response is valid JSON', async () => {
    const mockData = { key: 'value' };
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const data = await fetchFundData('fund1');
    expect(data).toEqual(mockData);
  });

  it('should throw an error if the response is not valid JSON', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockRejectedValue(new Error('Invalid JSON')),
    });

    await expect(fetchFundData('fund1')).rejects.toThrow(
      'Failed to parse response as JSON'
    );
  });
});
