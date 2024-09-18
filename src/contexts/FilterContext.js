import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [regions, setRegions] = useState([]);

  const [filters, setFilters] = useState({
    region: [],
    priceRange: { min: '', max: '' },
    areaRange: { min: '', max: '' },
    bedroom: '',
  });

  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);

  const [isOpenRegion, setIsOpenRegion] = useState(false);
  const [isOpenPrice, setIsOpenPrice] = useState(false);
  const [isOpenArea, setIsOpenArea] = useState(false);
  const [isOpenBedroom, setIsOpenBedroom] = useState(false);

  const updateFilter = (key, value, subKey) => {
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
    } else if (key === 'priceRange' || key === 'areaRange') {
      setFilters((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          [subKey]: value,
        },
      }));
    }
  };

  const filterListings = () => {
    if (filters.region.length === 0 && filters.bedroom == 0) {
      setFilteredListings(listings);
    } else {
      const filtered = listings.filter(
        (listing) =>
          filters.region.includes(listing.city.region_id) ||
          listing.bedrooms == filters.bedroom
      );
      setFilteredListings(filtered);
    }
  };
  console.log(filters);
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
        filterListings,
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
