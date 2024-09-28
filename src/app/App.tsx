'use client';
import { useState } from 'react';
import FundSelector from './components/FundSelector/FundSelector';
import FundDetails from './components/FundDetails/FundDetails';

export default function Home() {
  const [selectedFund, setSelectedFund] = useState<string | null>(null);

  const handleFundSelection = (fund: string) => {
    setSelectedFund(fund);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-thin text-white mb-8">
        <span className="font-bold">AJ Bell</span> Investment Strategy Selector
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <FundSelector onSelectFund={handleFundSelection} />
        </div>
        <div>{selectedFund && <FundDetails selectedFund={selectedFund} />}</div>
      </div>
    </div>
  );
}
