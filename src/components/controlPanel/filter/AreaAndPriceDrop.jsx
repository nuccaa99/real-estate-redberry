import React from 'react';
import { useFilter } from '../../../contexts/FilterContext';

const AreaAndPriceDrop = ({ type, data, title, isOpen }) => {
  const { updateFilter } = useFilter();

  const handleInputChange = (subKey, value) => {
    const key = type === 'price' ? 'priceRange' : 'areaRange';
    updateFilter(key, value, subKey);
  };

  return (
    <>
      <div className={isOpen ? `${type} dropdown` : 'hidden'}>
        <h2 className={`${type} dropdown_title`}>{title}ს მიხედვით</h2>
        <div className="text_input_wrappers">
          <div className={`text_input_wrapper ${type}`}>
            <input
              type="text"
              className="text_input"
              placeholder="დან"
              onChange={(e) => handleInputChange('min', e.target.value)}
            />
          </div>
          <div className={`text_input_wrapper ${type}`}>
            <input
              type="text"
              className="text_input"
              placeholder="მდე"
              onChange={(e) => handleInputChange('max', e.target.value)}
            />
          </div>
        </div>
        <div className="range_list_container">
          <div className="range_list_wrapper">
            <h3 className="range_list_title">მინ. {title}</h3>
            <ul className="range_list">
              {data.map((item) =>
                type === 'price' ? (
                  <li className="range_item" key={item}>
                    {item.toLocaleString('en-US')} ₾
                  </li>
                ) : (
                  <li className="range_item" key={item}>
                    {item} მ²
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="range_list_wrapper">
            <h3 className="range_list_title">მაქს. {title}</h3>
            <ul className="range_list">
              {data.map((item) =>
                type === 'price' ? (
                  <li className="range_item" key={item}>
                    {item.toLocaleString('en-US')} ₾
                  </li>
                ) : (
                  <li className="range_item" key={item}>
                    {item} მ²
                  </li>
                )
              )}
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

export default AreaAndPriceDrop;
