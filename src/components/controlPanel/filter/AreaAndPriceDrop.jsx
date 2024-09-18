import React, { useState, useEffect } from 'react';
import { useFilter } from '../../../contexts/FilterContext';

const AreaAndPriceDrop = ({ type, data, title, isOpen, setIsOpen }) => {
  const { filters, updateFilter } = useFilter();
  const [localRange, setLocalRange] = useState({ min: '', max: '' });

  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const key = type === 'price' ? 'priceRange' : 'areaRange';
    setLocalRange(filters[key]);
  }, [filters, type]);

  useEffect(() => {
    validateRange();
  }, [localRange]);

  const handleInputChange = (subKey, value) => {
    setLocalRange((prev) => ({ ...prev, [subKey]: value }));
  };

  const validateRange = () => {
    if (localRange.min && localRange.max) {
      setIsValid(Number(localRange.min) <= Number(localRange.max));
    } else {
      setIsValid(true);
    }
  };

  const handleApplyFilter = () => {
    if (isValid) {
      const key = type === 'price' ? 'priceRange' : 'areaRange';
      updateFilter(key, localRange);
      setIsOpen(false);
    }
  };

  const handleListItemClick = (subKey, value) => {
    setLocalRange((prev) => ({ ...prev, [subKey]: value }));
    if (localRange.min > localRange.max) {
      setIsValid(false);
    }
  };

  return (
    <>
      <div className={isOpen ? `${type} dropdown` : 'hidden'}>
        <h2 className={`${type} dropdown_title`}>{title}ს მიხედვით</h2>
        <div className="text_input_wrappers">
          <div className={`text_input_wrapper ${type}`}>
            <input
              type="number"
              className="text_input"
              placeholder="დან"
              value={localRange.min}
              onChange={(e) => handleInputChange('min', e.target.value)}
            />
          </div>
          <div className={`text_input_wrapper ${type}`}>
            <input
              type="number"
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
          {!isValid && <p className="error_txt">ჩაწერეთ ვალიდური მონაცემები</p>}
          <button
            className="dropdown_btn"
            onClick={handleApplyFilter}
            disabled={!isValid}
          >
            არჩევა
          </button>
        </div>
      </div>
    </>
  );
};

export default AreaAndPriceDrop;
