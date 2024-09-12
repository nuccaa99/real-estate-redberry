import React from 'react';
import { useFilter } from '../../../contexts/FilterContext';

const BedroomDrop = () => {
  const { isOpenBedroom } = useFilter();

  return (
    <>
      <div className={isOpenBedroom ? 'bedroom dropdown' : 'hidden'}>
        <div>
          <h2 className="bedroom dropdown_title">საძინებლების მიხედვით</h2>
          <input type="number" placeholder="0" />
        </div>

        <div className="btn_wrapper">
          <button className="dropdown_btn">არჩევა</button>
        </div>
      </div>
    </>
  );
};

export default BedroomDrop;
