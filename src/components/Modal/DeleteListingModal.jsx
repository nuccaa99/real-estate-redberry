import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../contexts/ModalContext';
import x from '../../assets/x.svg';
import { deleteData } from '../../api';
import routes from '../../constants/routes';

const DeleteListingModal = ({ id }) => {
  const { setIsDeleteModalOpen } = useModal();
  const navigate = useNavigate();

  const [error, setError] = useState('');

  const handleDelete = async () => {
    try {
      await deleteData('real-estates', id);
      setIsDeleteModalOpen(false);
      navigate(routes.home);
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) {
    return (
      <div>
        <p className="error_txt">{error}</p>
      </div>
    );
  }

  return (
    <div className="delete_modal_content">
      <h2 className="delete_modal_title">გსურთ წაშალოთ ლისტინგი?</h2>
      <div className="form_btns_container">
        <button
          className="form_btn cancel delete_listing"
          onClick={() => setIsDeleteModalOpen(false)}
        >
          გაუქმება
        </button>
        <button
          className="form_btn add delete_listing"
          type="submit"
          onClick={() => handleDelete()}
        >
          დადასტურება
        </button>
      </div>
      <img
        src={x}
        alt="delete"
        onClick={() => setIsDeleteModalOpen(false)}
        className="delete_icon_delete_listing"
      />
    </div>
  );
};

export default DeleteListingModal;
