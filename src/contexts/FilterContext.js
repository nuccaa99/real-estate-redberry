import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [regions, setRegions] = useState([]);

  const [filters, setFilters] = useState({
    region: [],
    priceRange: '',
    areaRange: '',
    bedroom: '',
  });

  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);

  const [isOpenRegion, setIsOpenRegion] = useState(false);
  const [isOpenPrice, setIsOpenPrice] = useState(false);
  const [isOpenArea, setIsOpenArea] = useState(false);
  const [isOpenBedroom, setIsOpenBedroom] = useState(false);

  const updateFilter = (key, value) => {
    if (key === 'region') {
      setFilters((prev) => ({
        ...prev,
        region: prev.region.includes(value)
          ? prev.region.filter((regionId) => regionId !== value)
          : [...prev.region, value],
      }));
    } else if (key === 'bedroom') {
      setFilters((prev) => ({
        ...prev,
        bedroom: value,
      }));
    }
  };

  const filterListingsByRegion = (listings, filter) => {
    if (filter.length) {
      const filteredListings = listings.filter((listing) =>
        filter.includes(listing.city.region_id)
      );
      setFilteredListings(filteredListings);
    } else {
      setFilteredListings(listings);
    }
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
        setRegions,
        regions,
        setFilters,
        filterListingsByRegion,
        listings,
        setListings,
        filteredListings,
        setFilteredListings,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
