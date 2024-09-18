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

  const updateFilter = (key, value) => {
    setFilters((prev) => {
      const newFilters = {
        ...prev,
        [key]: value,
      };
      filterListings(newFilters);
      return newFilters;
    });
  };

  const filterListings = (currentFilters) => {
    const filtered = listings.filter((listing) => {
      const regionMatch =
        currentFilters.region.length === 0 ||
        currentFilters.region.includes(listing.city.region_id);
      const bedroomMatch =
        !currentFilters.bedroom || listing.bedrooms == currentFilters.bedroom;
      const priceMatch =
        (!currentFilters.priceRange.min ||
          listing.price >= parseInt(currentFilters.priceRange.min)) &&
        (!currentFilters.priceRange.max ||
          listing.price <= parseInt(currentFilters.priceRange.max));
      const areaMatch =
        (!currentFilters.areaRange.min ||
          listing.area >= parseInt(currentFilters.areaRange.min)) &&
        (!currentFilters.areaRange.max ||
          listing.area <= parseInt(currentFilters.areaRange.max));

      return regionMatch && bedroomMatch && priceMatch && areaMatch;
    });

    setFilteredListings(filtered);
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
