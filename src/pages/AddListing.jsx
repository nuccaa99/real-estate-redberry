import React, { useState, useEffect } from 'react';

import circle from '../assets/plus-circle.svg';

import { fetchData, postData } from '../api/index';

import FormDropdown from '../components/form/FormDropdown';
import ValidationWarning from '../components/form/ValidationWarning';
import { SELECTION_TYPES, validationRules } from '../helper';

import deleteIcon from '../assets/delete.svg';

const AddListing = () => {
  const [listing, setListing] = useState({
    price: '',
    zip_code: '',
    description: '',
    area: '',
    city_id: '',
    region_id: '',
    address: '',
    agent_id: '',
    bedrooms: '',
    is_rental: '',
  });

  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [agents, setAgents] = useState([]);

  const [filteredCities, setFilteredCities] = useState([]);

  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('');

  const [isOpenAgent, setIsOpenAgent] = useState(false);
  const [isOpenRegion, setIsOpenRegion] = useState(false);
  const [isOpenCity, setIsOpenCity] = useState(false);

  const [validForm, setValidForm] = useState({
    address: true,
    zip_code: true,
    description: true,
    bedrooms: true,
    price: true,
    area: true,
    is_rental: true,
  });
  const [fileError, setFileError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      fetchData('regions'),
      fetchData('cities'),
      fetchData('agents'),
    ])
      .then(([regionsData, citiesData, agentsData]) => {
        setRegions(regionsData);
        setCities(citiesData);
        setAgents(agentsData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  const handlePosting = async (formData) => {
    try {
      const response = await postData('real-estates', formData);
      console.log('POST success:', response);
    } catch (error) {
      console.error('POST error:', error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const [key, value] of Object.entries(listing)) {
      formData.append(key, value);
    }
    handlePosting(formData);
  };

  const handleValidation = (input, condition) => {
    setValidForm((prev) => ({ ...prev, [input]: condition }));
  };

  const validateField = (name, value) => {
    const isValid = validationRules[name] ? validationRules[name](value) : true;
    handleValidation(name, isValid ? 'valid' : false);
  };

  const isFormValid =
    Object.values(validForm).every((isValid) => isValid === 'valid') &&
    selectedAgent &&
    selectedRegion &&
    selectedCity &&
    imagePreview;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setListing((prev) => ({ ...prev, [name]: value }));

    validateField(name, value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const maxSize = 1048576;
      if (file.size > maxSize) {
        setFileError('ფოტოს ზომა არ უნდა აღემატებოდეს 1MB-ს');
        e.target.value = null;
      } else {
        setFileError('');
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);

          setListing((prev) => ({ ...prev, image: e.target.files[0] }));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSelection = (selection, selected, selectedId) => {
    const updates = {
      [SELECTION_TYPES.REGION]: () => {
        setSelectedRegion(selected);
        setIsOpenRegion(false);

        const cityData = cities.filter((city) => city.region_id === selectedId);
        setFilteredCities(cityData);

        return { region_id: selectedId.toString() };
      },
      [SELECTION_TYPES.CITY]: () => {
        setSelectedCity(selected);
        setIsOpenCity(false);
        return { city_id: selectedId.toString() };
      },
      [SELECTION_TYPES.AGENT]: () => {
        setSelectedAgent(selected);
        setIsOpenAgent(false);
        return { agent_id: selectedId.toString() };
      },
    };

    if (updates[selection]) {
      const newState = updates[selection]();
      setListing((prevState) => ({
        ...prevState,
        ...newState,
      }));
    }
  };

  return (
    <div className="addlisting_container">
      <h2 className="addlisting_page_title">ლისტინგის დამატება</h2>
      <form onSubmit={handleSubmit}>
        <div className="transaction_type_wrapper">
          <h3 className="form_title">გარიგების ტიპი</h3>
          <div className="transaction_type_inputs_wrapper">
            <label htmlFor="sell">
              <input
                required
                value="0"
                type="radio"
                name="is_rental"
                id="sell"
                onChange={handleInputChange}
              />
              იყიდება
            </label>
            <label htmlFor="rent">
              <input
                required
                value="1"
                type="radio"
                name="is_rental"
                id="rent"
                onChange={handleInputChange}
              />
              ქირავდება
            </label>
          </div>
        </div>

        <div className="location_wrapper">
          <h3 className="form_title">მდებარეობა</h3>
          <div className="location_inputs_wrapper">
            <div className="input_wrapper">
              <label className="form_label" htmlFor="address">
                <p>მისამართი *</p>
                <input
                  required
                  className={
                    validForm.address === false
                      ? 'form_text_input error'
                      : 'form_text_input'
                  }
                  type="text"
                  name="address"
                  id="address"
                  onChange={handleInputChange}
                />
              </label>
              <ValidationWarning
                valid={validForm.address}
                errorMsg="ჩაწერეთ ვალიდური მონაცემები"
                validMsg="მინიმუმ ორი სიმბოლო"
              />
            </div>
            <div className="input_wrapper">
              <label className="form_label" htmlFor="postal">
                <p>საფოსტო ინდექსი *</p>
                <input
                  required
                  className={
                    validForm.zip_code === false
                      ? 'form_text_input error'
                      : 'form_text_input'
                  }
                  type="text"
                  name="zip_code"
                  id="postal"
                  onChange={handleInputChange}
                />
              </label>

              <ValidationWarning
                valid={validForm.zip_code}
                errorMsg="ჩაწერეთ ვალიდური მონაცემები"
                validMsg="მხოლოდ რიცხვები"
              />
            </div>
            <FormDropdown
              label="რეგიონი"
              options={regions}
              selected={selectedRegion}
              isOpen={isOpenRegion}
              toggleDropdown={() => setIsOpenRegion(!isOpenRegion)}
              handleSelection={handleSelection}
              error={error}
              isLoading={isLoading}
              selectionType={SELECTION_TYPES.REGION}
            />

            <FormDropdown
              label="ქალაქი"
              options={filteredCities}
              selectedRegion={selectedRegion}
              selected={selectedCity}
              isOpen={isOpenCity}
              toggleDropdown={() => setIsOpenCity(!isOpenCity)}
              handleSelection={handleSelection}
              error={error}
              isLoading={isLoading}
              selectionType={SELECTION_TYPES.CITY}
            />
          </div>
        </div>

        <div className="details_wrapper">
          <h3 className="form_title">ბინის დეტალები</h3>
          <div className="details_inputs_wrapper">
            <div className="input_wrapper">
              <label className="form_label" htmlFor="price">
                <p>ფასი</p>
                <input
                  required
                  className={
                    validForm.price === false
                      ? 'form_text_input error'
                      : 'form_text_input'
                  }
                  type="text"
                  name="price"
                  id="price"
                  onChange={handleInputChange}
                />
              </label>

              <ValidationWarning
                valid={validForm.price}
                errorMsg="ჩაწერეთ ვალიდური მონაცემები"
                validMsg="მხოლოდ რიცხვები"
              />
            </div>
            <div className="input_wrapper">
              <label className="form_label" htmlFor="area">
                <p>ფართობი</p>
                <input
                  required
                  className={
                    validForm.area === false
                      ? 'form_text_input error'
                      : 'form_text_input'
                  }
                  type="text"
                  name="area"
                  id="area"
                  onChange={handleInputChange}
                />
              </label>

              <ValidationWarning
                valid={validForm.area}
                errorMsg="ჩაწერეთ ვალიდური მონაცემები"
                validMsg="მხოლოდ რიცხვები"
              />
            </div>

            <div className="input_wrapper">
              <label className="form_label" htmlFor="bedrooms">
                <p>საძინებლების რაოდენობა *</p>
                <input
                  required
                  className={
                    validForm.bedrooms === false
                      ? 'form_text_input error'
                      : 'form_text_input'
                  }
                  type="text"
                  name="bedrooms"
                  id="bedrooms"
                  onChange={handleInputChange}
                />
              </label>

              <ValidationWarning
                valid={validForm.bedrooms}
                errorMsg="ჩაწერეთ ვალიდური მონაცემები"
                validMsg="მხოლოდ რიცხვები"
              />
            </div>
            <div className="input_wrapper textarea">
              <label className="form_label" htmlFor="description">
                <p>აღწერა *</p>
                <textarea
                  className={validForm.description === false ? 'error' : ''}
                  required
                  name="description"
                  id="description"
                  rows="8"
                  onChange={handleInputChange}
                ></textarea>
              </label>

              <ValidationWarning
                valid={validForm.description}
                errorMsg="ჩაწერეთ ვალიდური მონაცემები"
                validMsg="მინიმუმ ხუთი სიტყვა"
              />
            </div>
            <div className="input_wrapper image">
              <label className="form_label image" htmlFor="image">
                ატვირთეთ ფოტო *
                <div className="image_upload_container">
                  <input
                    required
                    type="file"
                    accept="image/*"
                    name="image"
                    id="image"
                    onChange={handleImageChange}
                  />
                  {imagePreview ? (
                    <>
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="image_preview"
                      />
                    </>
                  ) : (
                    <img
                      src={circle}
                      alt="plus circle"
                      className="image_upload_btn"
                    />
                  )}
                </div>
                {fileError && <p className="error_txt">{fileError}</p>}
              </label>
              {imagePreview && (
                <img
                  src={deleteIcon}
                  alt="delete icon"
                  className="delete_icon"
                  onClick={() => {
                    setImagePreview(null);
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <div className="agent_wrapper">
          <h3 className="form_title">აგენტი</h3>
          <FormDropdown
            label="აირჩიე"
            options={agents}
            selected={selectedAgent}
            isOpen={isOpenAgent}
            toggleDropdown={() => setIsOpenAgent(!isOpenAgent)}
            handleSelection={handleSelection}
            error={error}
            isLoading={isLoading}
            selectionType={SELECTION_TYPES.AGENT}
          />
        </div>
        <div className="form_btns_container">
          <button className="form_btn cancel">გაუქმება</button>
          <button
            className="form_btn add"
            type="submit"
            disabled={!isFormValid}
          >
            დაამატე ლისტინგი
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddListing;
