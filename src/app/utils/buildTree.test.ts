import { buildTree } from './buildTree';
import { Data } from './../types/data';

describe('buildTree', () => {
  it('should build a tree with single level nodes', () => {
    const applications: Data[] = [
      { id: '1', name: 'App1', spend: 100, BCAP1: 'A', BCAP2: 'B', BCAP3: 'C' },
      { id: '2', name: 'App2', spend: 200, BCAP1: 'A', BCAP2: 'B', BCAP3: 'D' },
    ];

    const result = buildTree(applications);

    expect(result).toEqual([
      {
        name: 'A',
        children: [
          {
            name: 'B',
            children: [
              { name: 'C', children: [] },
              { name: 'D', children: [] },
            ],
          },
        ],
      },
    ]);
  });

  it('should build a tree with multiple level nodes', () => {
    const applications: Data[] = [
      { id: '3', name: 'App3', spend: 300, BCAP1: 'A', BCAP2: 'B', BCAP3: 'C' },
      { id: '4', name: 'App4', spend: 400, BCAP1: 'A', BCAP2: 'E', BCAP3: 'F' },
      { id: '5', name: 'App5', spend: 500, BCAP1: 'G', BCAP2: 'H', BCAP3: 'I' },
    ];

    const result = buildTree(applications);

    expect(result).toEqual([
      {
        name: 'A',
        children: [
          {
            name: 'B',
            children: [{ name: 'C', children: [] }],
          },
          {
            name: 'E',
            children: [{ name: 'F', children: [] }],
          },
        ],
      },
      {
        name: 'G',
        children: [
          {
            name: 'H',
            children: [{ name: 'I', children: [] }],
          },
        ],
      },
    ]);
  });

  it('should sort the tree nodes alphabetically', () => {
    const applications: Data[] = [
      { id: '6', name: 'App6', spend: 600, BCAP1: 'B', BCAP2: 'D', BCAP3: 'F' },
      { id: '7', name: 'App7', spend: 700, BCAP1: 'A', BCAP2: 'C', BCAP3: 'E' },
    ];

    const result = buildTree(applications);

    expect(result).toEqual([
      {
        name: 'A',
        children: [
          {
            name: 'C',
            children: [{ name: 'E', children: [] }],
          },
        ],
      },
      {
        name: 'B',
        children: [
          {
            name: 'D',
            children: [{ name: 'F', children: [] }],
          },
        ],
      },
    ]);
  });

  it('should handle empty input', () => {
    const applications: Data[] = [];

    const result = buildTree(applications);

    expect(result).toEqual([]);
  });
});
