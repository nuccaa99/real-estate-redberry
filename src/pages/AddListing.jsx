import React, { useState, useEffect } from 'react';
import tick from '../assets/tick.svg';
import circle from '../assets/plus-circle.svg';

import { fetchRegions } from '../api/index';
import { fetchCities } from '../api/index';

import FormDropdown from '../components/formDropdown/FormDropdown';

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
    image: '',
    created_at: '',
    id: '',
  });

  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('');

  const [isOpenAgent, setIsOpenAgent] = useState(false);
  const [isOpenRegion, setIsOpenRegion] = useState(false);
  const [isOpenCity, setIsOpenCity] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  console.log(listing);

  useEffect(() => {
    Promise.all([fetchRegions(), fetchCities()])
      .then(([regionsData, citiesData]) => {
        setRegions(regionsData);
        setCities(citiesData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setListing((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelection = (selection, selected, selectedId) => {
    if (selection === 'region') {
      setSelectedRegion(selected);
      setIsOpenRegion(false);
      setListing((prevState) => ({
        ...prevState,
        region_id: selectedId,
      }));
    } else if (selection === 'city') {
      setSelectedCity(selected);
      setIsOpenCity(false);
      setListing((prevState) => ({
        ...prevState,
        city_id: selectedId,
      }));
    } else {
      setSelectedAgent(selected);
      setIsOpenAgent(false);
      setListing((prevState) => ({
        ...prevState,
        agent_id: selectedId,
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
                  className="form_text_input"
                  type="text"
                  name="address"
                  id="address"
                  onChange={handleInputChange}
                />
              </label>

              <div>
                <img src={tick} alt="tick" />
                <span className="form_validation_warning">
                  მინიმუმ ორი სიმბოლო
                </span>
              </div>
            </div>
            <div className="input_wrapper">
              <label className="form_label" htmlFor="postal">
                <p>საფოსტო ინდექსი *</p>
                <input
                  className="form_text_input"
                  type="text"
                  name="zip_code"
                  id="postal"
                  onChange={handleInputChange}
                />
              </label>

              <div>
                <img src={tick} alt="tick" />
                <span className="form_validation_warning">მხოლოდ რიცხვები</span>
              </div>
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
              selectionType="region"
            />

            <FormDropdown
              label="ქალაქი"
              options={cities}
              selected={selectedCity}
              isOpen={isOpenCity}
              toggleDropdown={() => setIsOpenCity(!isOpenCity)}
              handleSelection={handleSelection}
              error={error}
              isLoading={isLoading}
              selectionType="city"
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
                  className="form_text_input"
                  type="text"
                  name="price"
                  id="price"
                  onChange={handleInputChange}
                />
              </label>

              <div>
                <img src={tick} alt="tick" />
                <span className="form_validation_warning">მხოლოდ რიცხვები</span>
              </div>
            </div>
            <div className="input_wrapper">
              <label className="form_label" htmlFor="area">
                <p>ფართობი</p>
                <input
                  className="form_text_input"
                  type="text"
                  name="area"
                  id="area"
                  onChange={handleInputChange}
                />
              </label>

              <div>
                <img src={tick} alt="tick" />
                <span className="form_validation_warning">მხოლოდ რიცხვები</span>
              </div>
            </div>

            <div className="input_wrapper">
              <label className="form_label" htmlFor="bedrooms">
                <p>საძინებლების რაოდენობა *</p>
                <input
                  className="form_text_input"
                  type="text"
                  name="bedrooms"
                  id="bedrooms"
                  onChange={handleInputChange}
                />
              </label>

              <div>
                <img src={tick} alt="tick" />
                <span className="form_validation_warning">მხოლოდ რიცხვები</span>
              </div>
            </div>
            <div className="input_wrapper textarea">
              <label className="form_label" htmlFor="description">
                <p>აღწერა *</p>
                <textarea
                  name="description"
                  id="description"
                  rows="8"
                  onChange={handleInputChange}
                ></textarea>
              </label>

              <div>
                <img src={tick} alt="tick" />
                <span className="form_validation_warning">
                  მინიმუმ ხუთი სიტყვა
                </span>
              </div>
            </div>
            <div className="input_wrapper image">
              <label className="form_label image" htmlFor="image">
                ატვირთეთ ფოტო *
                <div className="image_upload_container">
                  <input type="file" accept="image/*" name="image" id="image" />
                  <img
                    src={circle}
                    alt="plus circle"
                    className="image_upload_btn"
                  />
                </div>
              </label>
            </div>
          </div>
        </div>
        <div className="agent_wrapper">
          <h3 className="form_title">აგენტი</h3>
          <FormDropdown
            label="აირჩიე"
            options={cities}
            selected={selectedAgent}
            isOpen={isOpenAgent}
            toggleDropdown={() => setIsOpenAgent(!isOpenAgent)}
            handleSelection={handleSelection}
            error={error}
            isLoading={isLoading}
            selectionType="agent"
          />
        </div>
        <div className="form_btns_container">
          <button className="form_btn cancel">გაუქმება</button>
          <button className="form_btn add" type="submit">
            დაამატე ლისტინგი
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddListing;
