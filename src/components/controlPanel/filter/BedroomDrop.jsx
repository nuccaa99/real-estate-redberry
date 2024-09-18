import React, { useState } from 'react';
import { useFilter } from '../../../contexts/FilterContext';

const BedroomDrop = () => {
  const { isOpenBedroom, updateFilter, filterListings, setIsOpenBedroom } =
    useFilter();
  const [isBedroomValid, setIsBedroomValid] = useState(true);

  const handleFilter = (e) => {
    console.log(e.target.value);
    const isValid = parseInt(e.target.value, 10) <= 0 ? false : true;
    setIsBedroomValid(isValid);
    if (isValid) {
      updateFilter('bedroom', e.target.value);
    }
  };

  const handleClick = () => {
    filterListings();
    setIsOpenBedroom(false);
  };

  return (
    <>
      <div className={isOpenBedroom ? 'bedroom dropdown' : 'hidden'}>
        <div>
          <h2 className="bedroom dropdown_title">საძინებლების მიხედვით</h2>
          <input type="number" onChange={handleFilter} />
        </div>
        {!isBedroomValid && (
          <p className="error_txt">შეიყვანე ვალიდური რიცხვი</p>
        )}

        <div className="btn_wrapper">
          <button
            className="dropdown_btn"
            disabled={!isBedroomValid}
            onClick={handleClick}
          >
            არჩევა
          </button>
        </div>
      </div>
    </>
  );
};

export default BedroomDrop;
