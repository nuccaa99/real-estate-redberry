import React from 'react';
import { useFilter } from '../../../contexts/FilterContext';

const PriceDrop = () => {
  const { isOpenPrice } = useFilter();

  const prices = [50000, 100000, 150000, 200000, 250000];
  return (
    <>
      <div className={isOpenPrice ? 'price dropdown' : 'hidden'}>
        <h2 className="price dropdown_title">ფასის მიხედვით</h2>
        <div className="text_input_wrappers">
          <div className="text_input_wrapper price">
            <input type="text" className="text_input" placeholder="დან" />
          </div>
          <div className="text_input_wrapper price">
            <input type="text" className="text_input" placeholder="მდე" />
          </div>
        </div>
        <div className="range_list_container">
          <div className="range_list_wrapper">
            <h3 className="range_list_title">მინ. ფასი</h3>
            <ul className='range_list'>
              {prices.map((price) => {
                return <li className='range_item' key={price}>{price.toLocaleString('en-US')} ₾</li>;
              })}
            </ul>
          </div>
          <div className="range_list_wrapper">
            <h3 className="range_list_title">მაქს. ფასი</h3>
            <ul className='range_list'>
              {prices.map((price) => {
                return <li className='range_item' key={price}>{price.toLocaleString('en-US')} ₾</li>;
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

export default PriceDrop;
