import React, { useState } from 'react';
import ValidationWarning from '../addListingForm/ValidationWarning';
import { validationRules } from '../../helper';

const AddAgentModal = () => {
  const [validForm, setValidForm] = useState({
    name: true,
    sure_name: true,
    email: true,
    phone: true,
    price: true,
  });

  const handleValidation = (input, condition) => {
    setValidForm((prev) => ({ ...prev, [input]: condition }));
  };

  const validateField = (name, value) => {
    const isValid = validationRules[name] ? validationRules[name](value) : true;
    handleValidation(name, isValid ? 'valid' : false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    validateField(name, value);
  };

  return (
    <div className="agent_modal_content">
      <h2 className="agent_modal_title">აგენტის დამატება</h2>
      <form className="agent_modal_form">
        <div className="agent_modal_form_section">
          <div className="input_wrapper">
            <label className="form_label" htmlFor="name">
              <p>სახელი *</p>
              <input
                required
                className={
                  validForm.name === false
                    ? 'form_text_input error'
                    : 'form_text_input'
                }
                type="text"
                name="name"
                id="name"
                onChange={handleInputChange}
              />
            </label>
            <ValidationWarning
              valid={validForm.name}
              errorMsg="ჩაწერეთ ვალიდური მონაცემები"
              validMsg="მინიმუმ ორი სიმბოლო"
            />
          </div>

          <div className="input_wrapper">
            <label className="form_label" htmlFor="sure_name">
              <p>გვარი *</p>
              <input
                required
                className={
                  validForm.sure_name === false
                    ? 'form_text_input error'
                    : 'form_text_input'
                }
                type="text"
                name="sure_name"
                id="sure_name"
                onChange={handleInputChange}
              />
            </label>
            <ValidationWarning
              valid={validForm.sure_name}
              errorMsg="ჩაწერეთ ვალიდური მონაცემები"
              validMsg="მინიმუმ ორი სიმბოლო"
            />
          </div>
        </div>
        <div className="agent_modal_form_section">
          <div className="input_wrapper">
            <label className="form_label" htmlFor="email">
              <p>ელ-ფოსტა *</p>
              <input
                required
                className={
                  validForm.email === false
                    ? 'form_text_input error'
                    : 'form_text_input'
                }
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </label>
            <ValidationWarning
              valid={validForm.email}
              errorMsg="გამოიყენეთ @redberry.ge ფოსტა"
              validMsg="გამოიყენეთ @redberry.ge ფოსტა"
            />
          </div>

          <div className="input_wrapper">
            <label className="form_label" htmlFor="phone">
              <p>ტელეფონის ნომერი *</p>
              <input
                required
                className={
                  validForm.phone === false
                    ? 'form_text_input error'
                    : 'form_text_input'
                }
                type="text"
                name="phone"
                id="phone"
                onChange={handleInputChange}
              />
            </label>
            <ValidationWarning
              valid={validForm.phone}
              errorMsg="ჩაწერეთ ვალიდური მონაცემები"
              validMsg="მხოლოდ რიცხვები"
            />
          </div>
        </div>
        <div className="form_btns_container">
          <button className="form_btn cancel">გაუქმება</button>
          <button className="form_btn add" type="submit">
            დაამატე აგენტი
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAgentModal;
