import '@testing-library/jest-dom';
import { getData } from './getData';
import { Data } from '../types/data';
import fs from 'fs/promises';

describe('getData', () => {
  const mockData: Data[] = [
    {
      id: '1',
      name: 'Item 1',
      spend: 100,
      BCAP1: '10',
      BCAP2: '20',
      BCAP3: '30',
    },
    {
      id: '2',
      name: 'Item 2',
      spend: 200,
      BCAP1: '15',
      BCAP2: '25',
      BCAP3: '35',
    },
  ];

  let readFileSpy: jest.SpyInstance;

  beforeEach(() => {
    readFileSpy = jest.spyOn(fs, 'readFile');
  });

  afterEach(() => {
    readFileSpy.mockRestore();
  });

  it('should return data when file read and parse are successful', async () => {
    readFileSpy.mockResolvedValue(JSON.stringify(mockData));

    const data = await getData();

    expect(data).toEqual(mockData);
    expect(readFileSpy).toHaveBeenCalledWith(
      process.cwd() + '/src/app/data.json',
      'utf8'
    );
  });

  it('should throw an error when file read fails', async () => {
    readFileSpy.mockRejectedValue(new Error('File read error'));

    await expect(getData()).rejects.toThrow('Failed to fetch data');
    expect(readFileSpy).toHaveBeenCalledWith(
      process.cwd() + '/src/app/data.json',
      'utf8'
    );
  });

  it('should throw an error when JSON parsing fails', async () => {
    readFileSpy.mockResolvedValue('invalid JSON');

    await expect(getData()).rejects.toThrow('Failed to fetch data');
    expect(readFileSpy).toHaveBeenCalledWith(
      process.cwd() + '/src/app/data.json',
      'utf8'
    );
  });
});
