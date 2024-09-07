import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';

import Home from '../src/app/page';
import { getData } from '../src/app/server/getData';
import { Data } from '../src/app/types/data';

const mockData: Data[] = [
  {
    id: 'app-1',
    name: 'Application 1',
    spend: 29822,
    BCAP1: 'Business Capability 1',
    BCAP2: 'Business Capability 1.2',
    BCAP3: 'Business Capability 1.2.3',
  },
];

// Mock the getData function
jest.mock('../src/app/server/getData');
const mockedGetData = getData as jest.MockedFunction<typeof getData>;

describe('Home', () => {
  it('should return App component with fetched data when getData resolves with data', async () => {
    mockedGetData.mockResolvedValueOnce(mockData);

    const homeComp = await Home(); // server-side rendered component needs to be awaited

    const { getByText } = render(homeComp);
    await waitFor(() => expect(getByText('Application 1')).toBeInTheDocument());
  });
});
