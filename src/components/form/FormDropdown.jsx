import React from 'react';
import arrow from '../../assets/arrow.svg';
import { PuffLoader } from 'react-spinners';

const FormDropdown = ({
  label,
  options,
  selected,
  isOpen,
  toggleDropdown,
  handleSelection,
  error,
  isLoading,
  selectionType,
}) => {
  return (
    <div className="input_wrapper form_dropdown">
      <label className="form_label">{label}</label>
      <div
        className={isOpen ? 'custom_dropdown open' : 'custom_dropdown'}
        onClick={toggleDropdown}
      >
        <span>{selected}</span>
        <img src={arrow} alt="arrow" className={isOpen ? 'upside' : ''} />
      </div>
      {error && <h3 className="error_txt">{error}</h3>}

      {isOpen && (
        <div className="custom_dropdown_options">
          {isLoading && (
            <div className="center_loader">
              <PuffLoader color="#fa6400" />
            </div>
          )}
          {options.map((option) => {
            return (
              <div
                key={option.id}
                className="custom_dropdown_option"
                onClick={() =>
                  handleSelection(selectionType, option.name, option.id)
                }
              >
                {label === 'აირჩიე'
                  ? option.name + ' ' + option.surname
                  : option.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FormDropdown;
