import React, { useEffect, useState } from 'react';
import arrowBack from '../assets/arrowBack.svg';
import { useNavigate } from 'react-router-dom';
import routes from '../constants/routes';
import Error from '../components/Error';
import { useParams } from 'react-router-dom';
import { fetchListing } from '../api';

import { useModal } from '../contexts/ModalContext';

import { PuffLoader } from 'react-spinners';

import addressicon from '../assets/addressicon.svg';
import bed from '../assets/bed.svg';
import zipicon from '../assets/zipicon.svg';
import areaicon from '../assets/areaicon.svg';
import mailicon from '../assets/mail.svg';
import phoneicon from '../assets/phone.svg';

import SimilarLocationListings from '../components/listingPage/SimilarLocationListings';
import DeleteListingModal from '../components/Modal/DeleteListingModal';
import Modal from '../components/Modal/Modal';

const ListingPage = () => {
  const { listing } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [listingData, setListingData] = useState([]);

  const { setIsDeleteModalOpen, isDeleteModalOpen } = useModal();

  useEffect(() => {
    fetchListing('real-estates', listing)
      .then((data) => {
        setListingData(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [listing]);

  const navigate = useNavigate();

  if (error) {
    <Error />;
  }

  const regionId = listingData?.city?.region_id || null;
  const listingId = listingData?.id || null;

  return (
    <>
      <div className="listing_page_container">
        <div>
          <img
            src={arrowBack}
            alt="right back"
            onClick={() => navigate(routes.home)}
            className="back_arrow"
          />
        </div>
        {isLoading ? (
          <div className="center_loader">
            <PuffLoader color="#fa6400" className="loader" />
          </div>
        ) : (
          <div className="listing_page_main_section_wrapper">
            <div className="listing_page_main_section_image_wrapper">
              <img
                src={listingData.image}
                alt="listing"
                className="listing_page_main_section_image"
              />
              <div className="listing_page_date">
                <span>გამოქვეყნების თარიღი</span>
                <span>
                  {new Date(listingData.created_at).toLocaleDateString(
                    'en-US',
                    {
                      month: '2-digit',
                      day: '2-digit',
                      year: '2-digit',
                    }
                  )}
                </span>
              </div>
            </div>
            <div className="listing_page_main_section_desc_wrapper">
              <section className="price_section_wrapper">
                <p className="price_section_title">
                  {listingData.price.toLocaleString('en-US')} ₾
                </p>
                <div className="listing_address_wrapper listing_page">
                  <img src={addressicon} alt="address icon" />
                  <p>
                    {listingData.city.name}, {listingData.address}
                  </p>
                </div>
                <div className="listing_characteristic listing_page">
                  <img src={areaicon} alt="area icon" />
                  <p>ფართი {listingData.area} მ²</p>
                </div>
                <div className="listing_characteristic listing_page">
                  <img src={bed} alt="bed icon" />
                  <p>საძინებელი {listingData.bedrooms}</p>
                </div>

                <div className="listing_characteristic listing_page">
                  <img src={zipicon} alt="zip icon" />
                  <p>საფოსტო ინდექსი {listingData.zip_code}</p>
                </div>
              </section>
              <section className="desc_section_wrapper">
                <p>{listingData.description}</p>
              </section>
              <section className="agent_section_wrapper">
                <div className="agent_section_image_container">
                  <img src={listingData.agent.avatar} alt="agent avatar" />
                  <div>
                    <p>
                      {listingData.agent.name} {listingData.agent.surname}
                    </p>
                    <p>აგენტი</p>
                  </div>
                </div>
                <div className="agent_mail_wrapper">
                  <span>
                    <img src={mailicon} alt="mail icon" />
                  </span>
                  <span>{listingData.agent.email}</span>
                </div>
                <div className="agent_phone_wrapper">
                  <span>
                    <img src={phoneicon} alt="phone icon" />
                  </span>
                  <span>
                    {listingData.agent.phone.replace(/(\d{3})(?=\d)/g, '$1 ')}
                  </span>
                </div>
              </section>
              <button
                className="agent_page_delete_btn"
                onClick={() => setIsDeleteModalOpen(true)}
              >
                ლისტინგის წაშლა
              </button>
            </div>
            <p className="listing_is_rental listing_page">
              {listingData.is_rental === 0 ? 'იყიდება' : 'ქირავდება'}
            </p>
          </div>
        )}
        {!isLoading && (
          <SimilarLocationListings regionId={regionId} listingId={listingId} />
        )}
      </div>
      {isDeleteModalOpen && (
        <Modal>
          <DeleteListingModal id={listing} />
        </Modal>
      )}
    </>
  );
};

export default ListingPage;
