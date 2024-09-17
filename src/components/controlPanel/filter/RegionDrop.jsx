import React, { useState, useEffect } from 'react';
import { useFilter } from '../../../contexts/FilterContext';
import { fetchData } from '../../../api';

const RegionDrop = () => {
  const { isOpenRegion } = useFilter();

  const [regions, setRegions] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData("regions")
      .then((data) => {
        setRegions(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (error) {
    return (
      <div>
        <p className="error_txt">{error}</p>
      </div>
    );
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
                <input type="checkbox" id={region.id} name={region.id} />
                <label htmlFor={region.id}>{region.name}</label>
              </div>
            );
          })}
        </div>
        <div className="btn_wrapper">
          <button className="dropdown_btn">არჩევა</button>
        </div>
      </div>
    </>
  );
};

export default RegionDrop;
