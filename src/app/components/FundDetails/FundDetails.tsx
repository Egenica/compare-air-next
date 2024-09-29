'use client';

import React, { useEffect, useState } from 'react';
import { StarRating } from '../StarRating/StarRating';
import { SRRISlider } from '../SRRISlider/SRRISlider';
import { PortfolioPieChart } from '../PortfolioPieChart/PortfolioPieChart';
import { fetchFundData } from '../../server/getData';
import { Data } from '../../types/data';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { TopHoldingsBarChart } from '../TopHoldingsBarChart/TopHoldingsBarChart';

type FundDetailsProps = {
  selectedFund: string;
};

const FundDetails = ({ selectedFund }: FundDetailsProps) => {
  const [fundData, setFundData] = useState<Data | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (selectedFund) {
      fetchFundData(selectedFund)
        .then((data) => {
          setFundData(data);
        })
        .catch(() => {
          setError(true);
        });
    }
  }, [selectedFund]);

  if (!selectedFund) {
    return <div>Select a fund to see its details</div>;
  }

  if (error) {
    return <div>Failed to load fund details. Please try again later.</div>;
  }

  if (!fundData) {
    return (
      <div
        className="flex items-center justify-center h-screen"
        role="status"
        aria-live="polite"
      >
        <LoadingSpinner />
        <span className="ml-2 text-white" data-testid="loading-spinner">
          Loading data...
        </span>
      </div>
    );
  }

  const {
    quote: {
      name,
      marketCode,
      lastPrice,
      lastPriceDate,
      ongoingCharge,
      sectorName,
      currency,
    },
    ratings: { analystRating, SRRI },
    profile: { objective },
    portfolio: { asset },
    documents,
  } = fundData.data;

  return (
    <div className="p-6 border rounded-lg bg-white shadow-lg">
      {/* Fund Name and Information */}
      <h2 className="text-2xl font-bold mb-4">{name}</h2>
      <p>
        <span className="font-bold">Market Code:</span> {marketCode}
      </p>
      <p>
        <span className="font-bold">Last Price:</span> {lastPrice} {currency}{' '}
        (as of {lastPriceDate})
      </p>
      <p>
        <span className="font-bold">Ongoing Charge:</span> {ongoingCharge}%
      </p>
      <p>
        <span className="font-bold">Sector:</span> {sectorName}
      </p>

      {/* Analyst Rating as Star Rating */}
      <div className="mt-4">
        <h3 className="font-bold">Analyst Rating:</h3>
        <StarRating rating={analystRating} />
      </div>

      {/* SRRI as a Risk Slider */}
      <div className="mt-4">
        <h3 className="font-bold">Risk (SRRI):</h3>
        <SRRISlider srri={SRRI} />
      </div>

      {/* Fund Objective */}
      <div className="mt-4">
        <h3 className="font-bold">Objective:</h3>
        <p className="text-sm">{objective}</p>
      </div>

      {/* Portfolio Pie Chart */}
      <div className="mt-4">
        <h3 className="font-bold">Portfolio Allocation:</h3>
        <PortfolioPieChart portfolio={asset} />
      </div>

      {/* Top 10 Holdings */}
      <div className="mt-4">
        <h3 className="font-bold">Top 10 Holdings:</h3>
        <TopHoldingsBarChart holdings={fundData.data.portfolio.top10Holdings} />
      </div>

      {/* Documents */}
      <div className="mt-4">
        <h3 className="font-bold">Documents:</h3>
        <ul className="flex gap-2 mt-3">
          {documents.map((doc: { id: string; url: string; type: string }) => (
            <li key={doc.id}>
              <button
                onClick={() =>
                  window.open(doc.url, '_blank', 'noopener,noreferrer')
                }
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
              >
                {doc.type}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FundDetails;
