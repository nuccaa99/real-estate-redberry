import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    region: 'all',
    priceRange: 'all',
    areaRange: 'all',
    bedroom: 'all',
  });

  const [isOpenRegion, setIsOpenRegion] = useState(false);
  const [isOpenPrice, setIsOpenPrice] = useState(false);
  const [isOpenArea, setIsOpenArea] = useState(false);
  const [isOpenBedroom, setIsOpenBedroom] = useState(false);

  const updateFilter = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        updateFilter,
        isOpenRegion,
        setIsOpenRegion,
        isOpenPrice,
        setIsOpenPrice,
        isOpenBedroom,
        setIsOpenArea,
        setIsOpenBedroom,
        isOpenArea,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
