import React from 'react';
import { useFilter } from '../../../contexts/FilterContext';
import { AREAS } from '../../../constants/index';
import AreaAndPriceDrop from './AreaAndPriceDrop';

const AreaDrop = () => {
  const { isOpenArea } = useFilter();

  return (
    <AreaAndPriceDrop
      isOpen={isOpenArea}
      type="area"
      data={AREAS}
      title="ფართობი"
    />
  );
};

export default AreaDrop;
