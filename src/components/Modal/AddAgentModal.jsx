import React, { useState, useRef, useEffect } from 'react';
import ValidationWarning from '../addListingForm/ValidationWarning';
import { validationRules } from '../../helper';
import { postData } from '../../api';

import circle from '../../assets/plus-circle.svg';
import deleteIcon from '../../assets/delete.svg';
import { useModal } from '../../contexts/ModalContext';
import { useFilter } from '../../contexts/FilterContext';

const AddAgentModal = () => {
  const { setIsAgentModalOpen } = useModal();
  const { addAgent } = useFilter();

  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsAgentModalOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsAgentModalOpen]);

  const [agent, setAgent] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    avatar: '',
  });
  const [validForm, setValidForm] = useState({
    name: true,
    surname: true,
    email: true,
    phone: true,
  });

  const [fileError, setFileError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const handleValidation = (input, condition) => {
    setValidForm((prev) => ({ ...prev, [input]: condition }));
  };

  const validateField = (name, value) => {
    const isValid = validationRules[name] ? validationRules[name](value) : true;
    handleValidation(name, isValid ? 'valid' : false);
  };

  const isFormValid =
    Object.values(validForm).every((isValid) => isValid === 'valid') &&
    imagePreview;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAgent((prev) => ({ ...prev, [name]: value }));
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

          setAgent((prev) => ({ ...prev, avatar: file }));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handlePosting = async (formData) => {
    try {
      const response = await postData('agents', formData);
      console.log('POST success:', response);
      addAgent(agent);
      setIsAgentModalOpen(false);
    } catch (error) {
      console.error('POST error:', error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const [key, value] of Object.entries(agent)) {
      if (value !== '' && value !== null) {
        formData.append(key, value);
      }
    }
    handlePosting(formData);
  };

  return (
    <div className="agent_modal_content" ref={modalRef}>
      <h2 className="agent_modal_title">აგენტის დამატება</h2>
      <form className="agent_modal_form" onSubmit={handleSubmit}>
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
            <label className="form_label" htmlFor="surname">
              <p>გვარი *</p>
              <input
                required
                className={
                  validForm.surname === false
                    ? 'form_text_input error'
                    : 'form_text_input'
                }
                type="text"
                name="surname"
                id="surname"
                onChange={handleInputChange}
              />
            </label>
            <ValidationWarning
              valid={validForm.surname}
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
        <div className="form_btns_container">
          <button
            type="button"
            className="form_btn cancel"
            onClick={() => setIsAgentModalOpen(false)}
          >
            გაუქმება
          </button>
          <button
            className="form_btn add"
            type="submit"
            disabled={!isFormValid}
          >
            დაამატე აგენტი
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAgentModal;
