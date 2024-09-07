'use client';
import { useState } from 'react';
import { Data } from './types/data';
import { NavigationTree } from './components/NavigationTree/NavigationTree';
import { RangeFilter } from './components/RangeFilter/RangeFilter';
import { ApplicationList } from './components/ApplicationList/ApplicationList';
import { buildTree } from './utils/buildTree';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';

const App = ({ data }: { data: Data[] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      <div
        className="flex items-center justify-center h-screen"
        role="status"
        aria-live="polite"
      >
        <LoadingSpinner />
        <span className="ml-2">Loading data...</span>
      </div>
    );
  }

  return (
    <div className="App">
      <button
        className="md:hidden text-white rounded flex items-center w-10 h-10"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
      <h1 className="text-white font-thin text-2xl my-6">
        <span className="font-semibold">Archax</span> - Application Data Filter
      </h1>
      <div className="flex p-6 rounded-lg bg-[#00000038]">
        <div className="hidden md:flex flex-col min-w-fit p-8 rounded mr-4 bg-[#00000038]">
          <h1 className="mt-0 mb-1 text-white font-bold">Navigation</h1>
          <NavigationTree
            treeData={treeData}
            selected={selectedCapability}
            onSelect={(capability) => setSelectedCapability(capability)}
          />

          <h2 className="mb-[0.2rem] mt-4 text-white font-bold">Filters</h2>
          <RangeFilter
            min={minSpend}
            max={maxSpend}
            value={spendingRange}
            onChange={setSpendingRange}
          />
        </div>
        <div>
          <ApplicationList applications={filteredData} />
        </div>

        <div
          className={`md:hidden fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-black to-transparent p-8 rounded transform ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex md:flex-col md:min-w-fit md:mr-4 w-full`}
        >
          <button
            className="absolute top-4 right-4 p-2 bg-white text-black rounded-full flex items-center justify-center w-8 h-8"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h1 className="mt-0 mb-1 text-white font-bold">Navigation</h1>
          <NavigationTree
            treeData={treeData}
            selected={selectedCapability}
            onSelect={(capability) => setSelectedCapability(capability)}
          />

          <h2 className="mb-[0.2rem] mt-4 text-white font-bold">Filters</h2>
          <RangeFilter
            min={minSpend}
            max={maxSpend}
            value={spendingRange}
            onChange={setSpendingRange}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
