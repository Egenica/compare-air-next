import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import { fetchFundData } from './getData';
import { apiUrls } from './apiUrls';

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('fetchFundData', () => {
  // fetches data successfully for a valid fund
  it('should fetch data successfully when a valid fund is provided', async () => {
    const mockResponse = { data: 'some data' };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const fund = 'validFund';
    const data = await fetchFundData(fund);

    expect(data).toEqual(mockResponse);
    expect(fetchMock).toHaveBeenCalledWith(apiUrls[fund], {
      cache: 'no-store',
    });
  });

  // throws error when fund is not in apiUrls
  it('should throw an error when the fund is not in apiUrls', async () => {
    const fund = 'invalidFund';

    await expect(fetchFundData(fund)).rejects.toThrow(
      `Fund ${fund} not found in apiUrls`
    );
  });
});
