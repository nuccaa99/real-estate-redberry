import React, { useState, useEffect } from 'react';
import { useFilter } from '../../../contexts/FilterContext';

const AreaAndPriceDrop = ({ type, data, title, isOpen, setIsOpen }) => {
  const { filters, updateFilter } = useFilter();
  const [localRange, setLocalRange] = useState({ min: '', max: '' });

  useEffect(() => {
    const key = type === 'price' ? 'priceRange' : 'areaRange';
    setLocalRange(filters[key]);
  }, [filters, type]);

  const handleInputChange = (subKey, value) => {
    setLocalRange((prev) => ({ ...prev, [subKey]: value }));
  };

  const handleApplyFilter = () => {
    const key = type === 'price' ? 'priceRange' : 'areaRange';
    updateFilter(key, localRange);
    setIsOpen(false);
  };

  const handleListItemClick = (subKey, value) => {
    setLocalRange((prev) => ({ ...prev, [subKey]: value.toString() }));
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
              value={localRange.min}
              onChange={(e) => handleInputChange('min', e.target.value)}
            />
          </div>
          <div className={`text_input_wrapper ${type}`}>
            <input
              type="text"
              className="text_input"
              placeholder="მდე"
              value={localRange.max}
              onChange={(e) => handleInputChange('max', e.target.value)}
            />
          </div>
        </div>
        <div className="range_list_container">
          <div className="range_list_wrapper">
            <h3 className="range_list_title">მინ. {title}</h3>
            <ul className="range_list">
              {data.map((item) => (
                <li
                  className="range_item"
                  key={item}
                  onClick={() => handleListItemClick('min', item)}
                >
                  {type === 'price'
                    ? `${item.toLocaleString('en-US')} ₾`
                    : `${item} მ²`}
                </li>
              ))}
            </ul>
          </div>
          <div className="range_list_wrapper">
            <h3 className="range_list_title">მაქს. {title}</h3>
            <ul className="range_list">
              {data.map((item) => (
                <li
                  className="range_item"
                  key={item}
                  onClick={() => handleListItemClick('max', item)}
                >
                  {type === 'price'
                    ? `${item.toLocaleString('en-US')} ₾`
                    : `${item} მ²`}
                </li>
              ))}
            </ul>
          </div>
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

export default AreaAndPriceDrop;
