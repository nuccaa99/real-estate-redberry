import React, { useState, useEffect } from 'react';
import { useFilter } from '../../../contexts/FilterContext';
import { fetchData } from '../../../api';
import Error from '../../Error';

const RegionDrop = () => {
  const {
    regions,
    setRegions,
    isOpenRegion,
    updateFilter,
    setIsOpenRegion,
    filters,
  } = useFilter();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedRegions, setSelectedRegions] = useState(filters.region);

  useEffect(() => {
    fetchData('regions')
      .then((data) => {
        setRegions(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setRegions]);

  useEffect(() => {
    setSelectedRegions(filters.region);
  }, [filters.region]);

  const handleRegionChange = (regionId) => {
    setSelectedRegions((prev) =>
      prev.includes(regionId)
        ? prev.filter((id) => id !== regionId)
        : [...prev, regionId]
    );
  };

  const handleApplyFilter = () => {
    updateFilter('region', selectedRegions);
    setIsOpenRegion(false);
  };

  if (error) {
    <Error />;
  }

  return (
    <>
      <div
        className={isOpenRegion && !isLoading ? 'region dropdown' : 'hidden'}
      >
        <h2 className="region dropdown_title">რეგიონის მიხედვით</h2>
        <div className="region_list">
          {regions.map((region) => {
            return (
              <div key={region.id} className="region_list_item">
                <input
                  type="checkbox"
                  id={region.id}
                  name={region.id}
                  checked={selectedRegions.includes(region.id)}
                  onChange={() => handleRegionChange(region.id)}
                />
                <label htmlFor={region.id}>{region.name}</label>
              </div>
            );
          })}
        </div>
        <div className="btn_wrapper">
          <button className="dropdown_btn" onClick={handleApplyFilter}>
            არჩევა
          </button>
        </div>
      </div>
    </>
  );
};

export default RegionDrop;
