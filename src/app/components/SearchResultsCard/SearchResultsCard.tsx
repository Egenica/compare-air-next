import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { ISearchResultsProps, ICityLocationsResult } from '../../types/IResult';
import { displayDate, hyphenate } from '../../utils/utils';
import { getCityCardData } from '../../server/getData';
import { LinkIcon } from './LinkIcon';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import BarChart from './BarChart';

export const SearchResultsCard = ({
  result,
  setSelectedCitys,
}: ISearchResultsProps) => {
  const [animate, setAnimate] = React.useState<boolean>(false);
  const [cityLocations, setCityLocations] = useState<ICityLocationsResult[]>(
    []
  );
  const [deletedCity, setDeletedCity] = useState<string>('');
  const [error, setError] = useState(false);

  // console.log('result', result);

  // Remove city from city list (removes all instances of city)
  const removeCityFromCityList = useCallback(
    (removeCity: string) => {
      setSelectedCitys((current) =>
        current.filter((cityName) => {
          return cityName.city !== removeCity;
        })
      );
    },
    [setSelectedCitys]
  );

  // remove city from cityLocations by id when close icon is clicked
  const removeCityByIdFromCityLocations = (removeCityId: number) => {
    setCityLocations((current) =>
      current.filter((cityName) => {
        return cityName.id !== removeCityId;
      })
    );
  };

  useEffect(() => {
    if (deletedCity) {
      const cityCount = cityLocations.filter(
        (city) => city.city === deletedCity
      ).length;
      if (!cityCount) {
        removeCityFromCityList(deletedCity);
      }
    }
  }, [cityLocations, deletedCity, removeCityFromCityList]);

  useEffect(() => {
    getCityCardData(result.city)
      .then((data) => {
        setCityLocations(data.results);
      })
      .catch(() => {
        setError(true);
      });
  }, [result.city]);

  console.log('cityLocations', cityLocations);

  if (error) {
    return <ErrorMessage errorTxt="Failed to loading city" />;
  }

  return (
    <>
      {cityLocations.map((cityLocation, i) => (
        <div
          key={cityLocation.id}
          className={`rounded-lg md:mx-8 lg:mx-14 overflow-hidden shadow-lg bg-white w-full lg:w-1/3 relative  mb-6 md:mb-14 lg:mb-20 md:hover:scale-105 transform transition-all ease-in-out duration-500 cursor-default ${
            setTimeout(() => {
              setAnimate(true);
            }, 500) && animate
              ? 'border-1 border-col border-white opacity-100'
              : 'border-1 border-col border-blue-700 scale-90 shadow-xl opacity-0'
          }`}
          id={
            result.locations > 1 && i + 1 === cityLocations.length
              ? hyphenate(cityLocation.city)
              : result.locations === 1
              ? hyphenate(cityLocation.city)
              : ''
          }
        >
          {result.locations > 1 && (
            <span
              className="text-sm text-black absolute right-2 bottom-2 opacity-30"
              title={`Linked card (${cityLocation.city})`}
            >
              {i + 1}{' '}
              <span className="w-[11px] inline-block relative top-[1px]">
                <LinkIcon />
              </span>
            </span>
          )}
          <button
            className="absolute right-3 top-3"
            onClick={() => {
              removeCityByIdFromCityLocations(cityLocation.id);
              setDeletedCity(cityLocation.city);
            }}
          >
            <Image
              src={'/close-icon.svg'}
              alt={`close-${cityLocation.id}`}
              className="close-icon"
              width={15}
              height={15}
            />
          </button>
          <div className="px-8 py-6">
            <p className="text-gray-700 text-base uppercase">
              {displayDate(cityLocation.lastUpdated)}
            </p>
            <h2 className="text-base font-bold md:text-xl lg:text-2xl my-2 text-purple-700 md:font-medium tracking-wide">
              {cityLocation.name}
            </h2>
            <p className="text-gray-700 text-base">
              in{' '}
              {`${cityLocation.city}, ${
                cityLocation.country === 'GB' && 'United Kingdom'
              }`}
            </p>

            <BarChart data={cityLocation.parameters} />
            <p className="text-gray-900 font-bold text-xs">
              Values:{' '}
              {cityLocation.parameters.map((prama, i) => {
                return (
                  <span
                    key={prama.id}
                    className="text-gray-700 font-normal uppercase text-xs"
                  >
                    <span
                      title={
                        (prama.parameter === 'pm25' &&
                          'Fine particulate matter') ||
                        (prama.parameter === 'pm10' &&
                          'Coarse particulate matter') ||
                        (prama.parameter === 'no2' && 'Nitrogen dioxide') ||
                        (prama.parameter === 'o3' && 'Ozone') ||
                        (prama.parameter === 'so2' && 'Sulphur dioxide') ||
                        (prama.parameter === 'co' && 'Carbon monoxide') ||
                        ''
                      }
                      className="hover:text-blue-700"
                    >
                      {prama.parameter +
                        ': ' +
                        prama.lastValue +
                        (cityLocation.parameters.length - 1 !== i ? ', ' : ' ')}
                    </span>
                  </span>
                );
              })}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
