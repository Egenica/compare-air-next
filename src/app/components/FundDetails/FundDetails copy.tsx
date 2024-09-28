import { useEffect, useState } from 'react';

import { fetchFundData } from '../../server/getData';

interface FundDetailsProps {
  selectedFund: string;
}

const FundDetails: React.FC<FundDetailsProps> = ({ selectedFund }) => {
  const [fundData, setFundData] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchFundData(selectedFund)
      .then((data) => {
        setFundData(data);
        console.log(data);
      })
      .catch(() => {
        setError(true);
      });
  }, [selectedFund]);

  if (!selectedFund) {
    return <div>Select a fund to see its details</div>;
  }

  return (
    <div className="p-6 border rounded-lg bg-white shadow-lg">
      test
      {/* <h2 className="text-2xl font-bold mb-4">{fundData.name}</h2>
      <p>Analyst Rating: {fundData.analystRating}/5</p>
      <p>Risk (SRRI): {fundData.SRRI}/10</p>
      <div className="mt-4">
        <h3 className="font-bold">Portfolio Allocation:</h3>
        <ul>
          {fundData.portfolio?.asset.map((asset: any, index: number) => (
            <li key={index}>
              {asset.type}: {asset.percentage}%
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default FundDetails;
