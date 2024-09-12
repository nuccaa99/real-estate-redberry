import React from 'react';
import { useFilter } from '../../../contexts/FilterContext';

const AreaDrop = () => {
  const { isOpenArea } = useFilter();

  const areas = [50, 70, 80, 90, 100];
  return (
    <>
      <div className={isOpenArea ? 'area dropdown' : 'hidden'}>
        <h2 className="area dropdown_title">ფასის მიხედვით</h2>
        <div className="text_input_wrappers">
          <div className="text_input_wrapper area">
            <input type="text" className="text_input" placeholder="დან" />
          </div>
          <div className="text_input_wrapper area">
            <input type="text" className="text_input" placeholder="მდე" />
          </div>
        </div>
        <div className="range_list_container">
          <div className="range_list_wrapper">
            <h3 className="range_list_title">მინ. ფართი</h3>
            <ul className="range_list">
              {areas.map((area) => {
                return (
                  <li className="range_item" key={area}>
                    {area} მ²
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="range_list_wrapper">
            <h3 className="range_list_title">მაქს. ფართი</h3>
            <ul className="range_list">
              {areas.map((area) => {
                return (
                  <li className="range_item" key={area}>
                    {area} მ²
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="btn_wrapper">
          <button className="dropdown_btn">არჩევა</button>
        </div>
      </div>
    </>
  );
};

export default AreaDrop;
