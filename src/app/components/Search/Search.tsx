'use client';
import React, { useEffect, useState } from 'react';
import { ICitysResult } from './../../types/IResult';
import { SearchResultsCard } from '../SearchResultsCard/SearchResultsCard';
import { SearchDropdownMenu } from '../SearchDropdownMenu/SearchDropdownMenu';
import { getCityData } from '../../server/getData';
import { CloseSearch } from './CloseSearch';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import Image from 'next/image';

export const Search = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [results, setResults] = useState<ICitysResult[]>([]);
  const [hideShowDropdown, setHideShowDropdown] = useState<boolean>(false);
  const [citys, setCitys] = useState<ICitysResult[]>([]);

  const [selectedCitys, setSelectedCitys] = useState<ICitysResult[]>([]);

  useEffect(() => {
    if (citys.length === 0) {
      getCityData()
        .then((data) => {
          setCitys(data.results);
          setLoading(false);
        })
        .catch(() => {
          setError(true);
        });
    }
  }, [citys.length, setLoading]);

  useEffect(() => {
    // Filter results based on search term
    const filterResults = (results: ICitysResult[]) => {
      return results.filter((result) => {
        return result.city.toLowerCase().includes(searchTerm.toLowerCase());
      });
    };
    searchTerm.length > 0 ? setResults(filterResults(citys)) : setResults([]);
  }, [citys, searchTerm]);

  if (error) {
    return <ErrorMessage errorTxt="Failed to load city data" />;
  }

  return (
    <>
      {loading && (
        <div
          className={`w-20 m-10 flex flex-col items-center absolute top-96 md:top-0 transition-opacity ease-in duration-700 ${
            loading ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image src={'/grid.svg'} alt="loading" width={100} height={100} />
          <p className="center text-white text-xs p-4 tracking-widest w-max">
            LOADING DATA
          </p>
        </div>
      )}
      <div className="w-full md:w-1/2 relative">
        <CloseSearch
          setSearchTerm={setSearchTerm}
          setHideShowDropdown={setHideShowDropdown}
        />
        <input
          type="text"
          placeholder="Search for a city"
          className="p-2 pl-14 m-0 w-full md:w-full rounded-xl border-2 border-col border-slate-300 md:p-4 md:pl-14 mb-0 text-lg focus:outline-none search-icon z-50 relative"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setHideShowDropdown(true);
          }}
          onFocus={() => {
            setHideShowDropdown(true);
          }}
        />
        <SearchDropdownMenu
          results={results}
          hideShowDropdown={hideShowDropdown}
          setHideShowDropdown={setHideShowDropdown}
          selectedCitys={selectedCitys}
          setSelectedCitys={setSelectedCitys}
        />
      </div>

      <div className="flex flex-wrap mt-8 md:mt-24 justify-center w-full">
        {selectedCitys &&
          selectedCitys.length > 0 &&
          selectedCitys.map((result, i) => (
            <SearchResultsCard
              key={`result${i}`}
              result={result}
              setSelectedCitys={setSelectedCitys}
            />
          ))}
      </div>
    </>
  );
};
