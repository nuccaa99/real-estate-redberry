import React from 'react';
import { useFilter } from '../../../contexts/FilterContext';
import x from '../../../assets/x.svg';

const SelectedFilters = () => {
  const { filters, regions, updateFilter } = useFilter();

  const handleRemoveFilter = (key, value) => {
    if (key === 'region') {
      updateFilter(
        'region',
        filters.region.filter((id) => id !== value)
      );
    } else if (key === 'bedroom') {
      updateFilter('bedroom', '');
    } else if (key === 'priceRange' || key === 'areaRange') {
      updateFilter(key, { min: '', max: '' });
    }
  };

  const renderFilterItem = (key, value, label) => (
    <div key={`${key}-${value}`} className="selected_filter_item">
      <span>{label}</span>
      <button
        onClick={() => handleRemoveFilter(key, value)}
        className="selected_filter_btn"
      >
        <img src={x} alt="remove" />
      </button>
    </div>
  );

  const clearAllFilters = () => {
    updateFilter('region', []);
    updateFilter('priceRange', { min: '', max: '' });
    updateFilter('areaRange', { min: '', max: '' });
    updateFilter('bedroom', '');
  };

  const hasActiveFilters =
    filters.region.length > 0 ||
    filters.priceRange.min ||
    filters.priceRange.max ||
    filters.areaRange.min ||
    filters.areaRange.max ||
    filters.bedroom;

  return (
    <div className="selected_filters_container">
      {filters.region.map((regionId) => {
        const region = regions.find((r) => r.id === regionId);
        return region && renderFilterItem('region', regionId, region.name);
      })}

      {(filters.priceRange.min || filters.priceRange.max) &&
        renderFilterItem(
          'priceRange',
          'price',
          `${filters.priceRange.min || '0'}₾ - ${
            filters.priceRange.max || 'max'
          }₾`
        )}

      {(filters.areaRange.min || filters.areaRange.max) &&
        renderFilterItem(
          'areaRange',
          'area',
          `${filters.areaRange.min || '0'}მ² - ${
            filters.areaRange.max || 'max'
          }მ²`
        )}
      {filters.bedroom &&
        renderFilterItem('bedroom', filters.bedroom, `${filters.bedroom}`)}

      {hasActiveFilters && (
        <button onClick={clearAllFilters} className="clear_all_btn">
          გასუფთავება
        </button>
      )}
    </div>
  );
};

export default SelectedFilters;
