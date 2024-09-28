'use client';

import React, { useEffect, useState } from 'react';
import { StarRating } from '../StarRating/StarRating';
import { SRRISlider } from '../SRRISlider/SRRISlider';
import { PortfolioPieChart } from '../PortfolioPieChart/PortfolioPieChart';
import { fetchFundData } from '../../server/getData';
import { Data } from '../../types/data';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

interface FundDetailsProps {
  selectedFund: string;
}

const FundDetails = ({ selectedFund }: FundDetailsProps) => {
  const [fundData, setFundData] = useState<Data | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (selectedFund) {
      fetchFundData(selectedFund)
        .then((data) => {
          setFundData(data);
          console.log(data); // This will log the fetched fund data
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
        <span className="ml-2 text-white">Loading data...</span>
      </div>
    );
  }

  const { quote, profile, ratings, portfolio, documents } = fundData.data;
  const {
    name,
    marketCode,
    lastPrice,
    lastPriceDate,
    ongoingCharge,
    sectorName,
    currency,
  } = quote;
  const { analystRating, SRRI } = ratings;
  const { objective } = profile;
  const { asset, top10Holdings } = portfolio;

  return (
    <div className="p-6 border rounded-lg bg-white shadow-lg">
      {/* Fund Name and Information */}
      <h2 className="text-2xl font-bold mb-4">{name}</h2>
      <p>Market Code: {marketCode}</p>
      <p>
        Last Price: {lastPrice} {currency} (as of {lastPriceDate})
      </p>
      <p>Ongoing Charge: {ongoingCharge}%</p>
      <p>Sector: {sectorName}</p>

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
        <p>{objective}</p>
      </div>

      {/* Portfolio Pie Chart */}
      <div className="mt-4">
        <h3 className="font-bold">Portfolio Allocation:</h3>
        <PortfolioPieChart portfolio={asset} />
      </div>

      {/* Top 10 Holdings */}
      <div className="mt-4">
        <h3 className="font-bold">Top 10 Holdings:</h3>
        <ul>
          {top10Holdings.map(
            (holding: { name: string; weighting: number }, index: number) => (
              <li key={index}>
                {holding.name}: {holding.weighting}%
              </li>
            )
          )}
        </ul>
      </div>

      {/* Documents */}
      <div className="mt-4">
        <h3 className="font-bold">Documents:</h3>
        <ul>
          {documents.map((doc: { id: string; url: string; type: string }) => (
            <li key={doc.id}>
              <a href={doc.url} target="_blank" rel="noopener noreferrer">
                {doc.type}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FundDetails;
