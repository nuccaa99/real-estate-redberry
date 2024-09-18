import React from 'react';
import { useFilter } from '../../../contexts/FilterContext';

const BedroomDrop = () => {
  const {
    isOpenBedroom,
    updateFilter,
    filters,
    filterListingsByBedroom,
    listings,
  } = useFilter();

  return (
    <>
      <div className={isOpenBedroom ? 'bedroom dropdown' : 'hidden'}>
        <div>
          <h2 className="bedroom dropdown_title">საძინებლების მიხედვით</h2>
          <input
            type="number"
            onChange={(e) => updateFilter('bedroom', e.target.value)}
          />
        </div>

        <div className="btn_wrapper">
          <button
            className="dropdown_btn"
            onClick={() => filterListingsByBedroom(listings, filters.bedroom)}
          >
            არჩევა
          </button>
        </div>
      </div>
    </>
  );
};

export default BedroomDrop;
