import React from 'react';
import { useFilter } from '../../../contexts/FilterContext';
import { AREAS } from '../../../constants/index';
import AreaAndPriceDrop from './AreaAndPriceDrop';

const AreaDrop = () => {
  const { isOpenArea, setIsOpenArea } = useFilter();

  return (
    <AreaAndPriceDrop
      isOpen={isOpenArea}
      type="area"
      data={AREAS}
      title="ფართობი"
      setIsOpen={setIsOpenArea}
    />
  );
};

export default AreaDrop;
