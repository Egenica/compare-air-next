'use client';
import { useState, useEffect } from 'react';
import { getData } from './server/getData';
import { Data } from './server/getData';
import { NavigationTree } from './components/NavigationTree';
import { RangeFilter } from './components/RangeFilter';
import { ApplicationList } from './components/ApplicationList';
import { buildTree } from './utils/buildTree';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';

const App = () => {
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    getData().then((data) => setData(data));
  }, []);

  const [selectedCapability, setSelectedCapability] = useState<string>('');
  const [spendingRange, setSpendingRange] = useState<[number, number]>([
    0, 100000,
  ]);

  const treeData = buildTree(data);

  const filteredData = data.filter(
    (app) =>
      app.spend >= spendingRange[0] &&
      app.spend <= spendingRange[1] &&
      (app.BCAP1.includes(selectedCapability) ||
        app.BCAP2.includes(selectedCapability) ||
        app.BCAP3.includes(selectedCapability))
  );

  const minSpend = Math.min(...data.map((app) => app.spend));
  const maxSpend = Math.max(...data.map((app) => app.spend));

  if (data.length === 0) {
    return (
      <>
        <div className="flex items-center justify-center h-screen">
          <LoadingSpinner />
          <span className="ml-2">Loading data...</span>
        </div>
      </>
    );
  }

  return (
    <div className="App">
      <div className="flex">
        <div className="flex flex-col min-w-fit p-[1%] border-r border-black mr-[1%] pr-[2%]">
          <h1 className="mt-0 mb-1 text-base">Navigation</h1>
          <NavigationTree
            treeData={treeData}
            selected={selectedCapability}
            onSelect={(capability) => setSelectedCapability(capability)}
          />

          <h3 className="mb-[0.2rem] mt-3">Filters</h3>
          <RangeFilter
            min={minSpend}
            max={maxSpend}
            value={spendingRange}
            onChange={setSpendingRange}
          />
        </div>
        <div className="m-1">
          <ApplicationList applications={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default App;
