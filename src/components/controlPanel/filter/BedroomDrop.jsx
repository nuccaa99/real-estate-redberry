import React, { useState } from 'react';
import { useFilter } from '../../../contexts/FilterContext';

const BedroomDrop = () => {
  const { isOpenBedroom, updateFilter, setIsOpenBedroom, filters } =
    useFilter();
  const [localBedroom, setLocalBedroom] = useState(filters.bedroom || '');
  const [isBedroomValid, setIsBedroomValid] = useState(true);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalBedroom(value);
    const isValid =
      value === '' ||
      (parseInt(value, 10) > 0 && Number.isInteger(Number(value)));
    setIsBedroomValid(isValid);
  };

  const handleApplyFilter = () => {
    if (isBedroomValid) {
      updateFilter(
        'bedroom',
        localBedroom === '' ? null : parseInt(localBedroom, 10)
      );
      setIsOpenBedroom(false);
    }
  };

  return (
    <div className={isOpenBedroom ? 'bedroom dropdown' : 'hidden'}>
      <div>
        <h2 className="bedroom dropdown_title">საძინებლების მიხედვით</h2>
        <input
          className="number_input"
          type="number"
          value={localBedroom}
          onChange={handleInputChange}
          min="1"
        />
      </div>
      {!isBedroomValid && <p className="error_txt">შეიყვანე ვალიდური რიცხვი</p>}

      <div className="btn_wrapper">
        <button
          className="dropdown_btn"
          disabled={!isBedroomValid}
          onClick={handleApplyFilter}
        >
          არჩევა
        </button>
      </div>
    </div>
  );
};

export default BedroomDrop;
