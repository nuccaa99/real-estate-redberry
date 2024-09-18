import React from 'react';
import { useFilter } from '../../../contexts/FilterContext';
import { PRICES } from '../../../constants/index';
import AreaAndPriceDrop from './AreaAndPriceDrop';

const PriceDrop = () => {
  const { isOpenPrice, setIsOpenPrice } = useFilter();

  return (
    <AreaAndPriceDrop
      isOpen={isOpenPrice}
      type="price"
      data={PRICES}
      title="ფასი"
      setIsOpen={setIsOpenPrice}
    />
  );
};

export default PriceDrop;
