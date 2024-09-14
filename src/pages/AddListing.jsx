import React, { useState, useEffect } from 'react';
import tick from '../assets/tick.svg';
import circle from '../assets/plus-circle.svg';
import arrow from '../assets/arrow.svg';
import { fetchRegions } from '../api/index';
import { fetchCities } from '../api/index';

const AddListing = () => {
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);

  const [isOpenAgent, setIsOpenAgent] = useState(false);
  const [isOpenRegion, setIsOpenRegion] = useState(false);
  const [isOpenCity, setIsOpenCity] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRegions()
      .then((data) => {
        setRegions(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchCities()
      .then((data) => {
        setCities(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="addlisting_container">
      <h2 className="addlisting_page_title">ლისტინგის დამატება</h2>
      <form>
        <div className="transaction_type_wrapper">
          <h3 className="form_title">გარიგების ტიპი</h3>
          <div className="transaction_type_inputs_wrapper">
            <label>
              <input type="radio" value="Option 1" />
              იყიდება
            </label>
            <label>
              <input type="radio" value="Option 2" />
              ქირავდება
            </label>
          </div>
        </div>

        <div className="location_wrapper">
          <h3 className="form_title">მდებარეობა</h3>
          <div className="location_inputs_wrapper">
            <div className="input_wrapper">
              <label className="form_label" htmlFor="address">
                მისამართი *
              </label>
              <input
                className="form_text_input"
                type="text"
                name="address"
                id="address"
              />
              <div>
                <img src={tick} alt="tick" />
                <span className="form_validation_warning">
                  მინიმუმ ორი სიმბოლო
                </span>
              </div>
            </div>
            <div className="input_wrapper">
              <label className="form_label" htmlFor="postal">
                საფოსტო ინდექსი *
              </label>
              <input
                className="form_text_input"
                type="text"
                name="postal"
                id="postal"
              />
              <div>
                <img src={tick} alt="tick" />
                <span className="form_validation_warning">მხოლოდ რიცხვები</span>
              </div>
            </div>

            <div className="input_wrapper form_dropdown">
              <label className="form_label">რეგიონი</label>
              <div
                className={
                  isOpenRegion ? 'custom_dropdown open' : 'custom_dropdown'
                }
                onClick={() => setIsOpenRegion(!isOpenRegion)}
              >
                <span></span>
                <img
                  src={arrow}
                  alt="arrow"
                  className={isOpenRegion ? 'upside' : ''}
                />
              </div>
              {isOpenRegion && (
                <div className="custom_dropdown_options">
                  {regions.map((region) => {
                    return (
                      <div key={region.id} className="custom_dropdown_option">
                        {region.name}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="input_wrapper form_dropdown">
              <label className="form_label">ქალაქი</label>
              <div
                className={
                  isOpenCity ? 'custom_dropdown open' : 'custom_dropdown'
                }
                onClick={() => setIsOpenCity(!isOpenCity)}
              >
                <span></span>
                <img
                  src={arrow}
                  alt="arrow"
                  className={isOpenCity ? 'upside' : ''}
                />
              </div>
              {isOpenCity && (
                <div className="custom_dropdown_options">
                  {cities.map((city) => {
                    return (
                      <div key={city.id} className="custom_dropdown_option">
                        {city.name}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="details_wrapper">
          <h3 className="form_title">ბინის დეტალები</h3>
          <div className="details_inputs_wrapper">
            <div className="input_wrapper">
              <label className="form_label" htmlFor="price">
                ფასი
              </label>
              <input
                className="form_text_input"
                type="text"
                name="price"
                id="price"
              />
              <div>
                <img src={tick} alt="tick" />
                <span className="form_validation_warning">მხოლოდ რიცხვები</span>
              </div>
            </div>
            <div className="input_wrapper">
              <label className="form_label" htmlFor="area">
                ფართობი
              </label>
              <input
                className="form_text_input"
                type="text"
                name="area"
                id="area"
              />
              <div>
                <img src={tick} alt="tick" />
                <span className="form_validation_warning">მხოლოდ რიცხვები</span>
              </div>
            </div>

            <div className="input_wrapper">
              <label className="form_label" htmlFor="bedrooms">
                საძინებლების რაოდენობა*
              </label>
              <input
                className="form_text_input"
                type="text"
                name="bedrooms"
                id="bedrooms"
              />
              <div>
                <img src={tick} alt="tick" />
                <span className="form_validation_warning">მხოლოდ რიცხვები</span>
              </div>
            </div>
            <div className="input_wrapper textarea">
              <label className="form_label" htmlFor="description">
                აღწერა *
              </label>
              <textarea name="description" id="description" rows="8"></textarea>
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
          <div className="input_wrapper form_dropdown">
            <label className="form_label">აირჩიე</label>
            <div
              className={
                isOpenAgent ? 'custom_dropdown open' : 'custom_dropdown'
              }
              onClick={() => setIsOpenAgent(!isOpenAgent)}
            >
              <span></span>
              <img
                src={arrow}
                alt="arrow"
                className={isOpenAgent ? 'upside' : ''}
              />
            </div>
            {isOpenAgent && (
              <div className="custom_dropdown_options">
                {regions.map((agent) => {
                  return (
                    <div key={agent.id} className="custom_dropdown_option">
                      {agent.name}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="form_btns_container">
          <button className='form_btn cancel'>გაუქმება</button>
          <button className='form_btn add'>დაამატე ლისტინგი</button>
        </div>
      </form>
    </div>
  );
};

export default AddListing;
