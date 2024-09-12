import React from 'react';
import { useFilter } from '../../../contexts/FilterContext';
import arrow from '../../../assets/arrow.png';
import RegionDrop from './RegionDrop';
import PriceDrop from './PriceDrop';
import AreaDrop from './AreaDrop';
import BedroomDrop from './BedroomDrop';

const Filter = () => {
  const {
    isOpenRegion,
    setIsOpenRegion,
    isOpenPrice,
    setIsOpenPrice,
    isOpenBedroom,
    setIsOpenArea,
    setIsOpenBedroom,
    isOpenArea,
  } = useFilter();

  const handleDropdownOpen = (dropdown) => {
    switch (dropdown) {
      case 'region':
        setIsOpenRegion((prevState) => !prevState);
        break;
      case 'price':
        setIsOpenPrice((prevState) => !prevState);
        break;
      case 'area':
        setIsOpenArea((prevState) => !prevState);
        break;
      case 'bedroom':
        setIsOpenBedroom((prevState) => !prevState);
        break;
      default:
        return null;
    }
  };

  return (
    <div className="filter_container">
      <div className="filter_item_container region">
        <div onClick={() => handleDropdownOpen('region')}>
          <div className="filter_btn_wrapper">
            <button className="filter_btn">რეგიონი</button>
            <img
              src={arrow}
              alt="arrow"
              className={isOpenRegion ? 'filter_arrow' : 'filter_arrow upside'}
            />
          </div>
        </div>
        <RegionDrop />
      </div>
      <div className="filter_item_container price">
        <div onClick={() => handleDropdownOpen('price')}>
          <div className="filter_btn_wrapper">
            <button className="filter_btn">საფასო კატეგორია</button>
            <img
              src={arrow}
              alt="arrow"
              className={isOpenPrice ? 'filter_arrow' : 'filter_arrow upside'}
            />
          </div>
        </div>
        <PriceDrop />
      </div>
      <div className="filter_item_container area">
        <div
          className="filter_item_container area"
          onClick={() => handleDropdownOpen('area')}
        >
          <div className="filter_btn_wrapper">
            <button className="filter_btn">ფართობი</button>
            <img
              src={arrow}
              alt="arrow"
              className={isOpenArea ? 'filter_arrow' : 'filter_arrow upside'}
            />
          </div>
        </div>
        <AreaDrop />
      </div>
      <div className="filter_item_container bedroom">
        <div
          className="filter_item_container bedroom"
          onClick={() => handleDropdownOpen('bedroom')}
        >
          <div className="filter_btn_wrapper">
            <button className="filter_btn">საძინებლების რაოდენობა</button>
            <img
              src={arrow}
              alt="arrow"
              className={isOpenBedroom ? 'filter_arrow' : 'filter_arrow upside'}
            />
          </div>
        </div>
        <BedroomDrop />
      </div>
    </div>
  );
};

export default Filter;
