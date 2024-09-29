import React, { useEffect, useState } from 'react';

type FundSelectorProps = {
  onSelectFund: (fund: string) => void;
};

const FundSelector: React.FC<FundSelectorProps> = ({ onSelectFund }) => {
  const [strategy, setStrategy] = useState<string | null>(null);
  const [selectedFund, setSelectedFund] = useState<string>('');

  const growthFunds = ['Cautious', 'Balanced', 'Adventurous'];
  const responsibleFund = ['Responsible'];

  useEffect(() => {
    const savedStrategy = localStorage.getItem('strategy');
    const savedFund = localStorage.getItem('selectedFund');
    if (savedStrategy) setStrategy(savedStrategy);
    if (savedFund) {
      setSelectedFund(savedFund);
      onSelectFund(savedFund);
    }
  }, [onSelectFund]);

  const handleStrategyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStrategy = e.target.value;
    setStrategy(newStrategy);
    localStorage.setItem('strategy', newStrategy);
    setSelectedFund('');
    onSelectFund(''); // Reset fund selection on strategy change
    localStorage.removeItem('selectedFund'); // Clear selected fund from local storage
  };

  const handleFundChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFund = e.target.value;
    setSelectedFund(newFund);
    localStorage.setItem('selectedFund', newFund);
    onSelectFund(newFund);
  };

  return (
    <div className="p-6 border rounded-lg bg-white shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Choose a Strategy</h2>
      <div className="mb-4">
        <label className="block mb-2">
          Select Strategy:
          <select
            className="w-full p-2 border rounded"
            value={strategy || ''}
            onChange={handleStrategyChange}
          >
            <option value="">-- Select Strategy --</option>
            <option value="growth">Growth Funds</option>
            <option value="responsible">Responsible Fund</option>
          </select>
        </label>
      </div>

      {strategy === 'growth' && (
        <div className="mb-4">
          <label className="block mb-2">
            Select Growth Fund:
            <select
              className="w-full p-2 border rounded"
              value={selectedFund}
              onChange={handleFundChange}
            >
              <option value="">-- Select Fund --</option>
              {growthFunds.map((fund) => (
                <option key={fund} value={fund.toLowerCase()}>
                  {fund}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      {strategy === 'responsible' && (
        <div className="mb-4">
          <label className="block mb-2">Select Responsible Fund:</label>
          <select
            className="w-full p-2 border rounded"
            value={selectedFund}
            onChange={handleFundChange}
          >
            <option value="">-- Select Fund --</option>
            {responsibleFund.map((fund) => (
              <option key={fund} value={fund.toLowerCase()}>
                {fund}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default FundSelector;
