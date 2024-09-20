import React from 'react';
import { Link } from 'react-router-dom';
import addressicon from '../../assets/addressicon.svg';
import bed from '../../assets/bed.svg';
import zipicon from '../../assets/zipicon.svg';
import areaicon from '../../assets/areaicon.svg';

const ListingCard = ({ data, scrollToTop }) => {
  return (
    <Link
      to={`/${data.id}`}
      className="listing_container"
      onClick={scrollToTop}
    >
      <div className="listing_img_wrapper">
        <img src={data.image} alt="listing" className="listing_img" />
      </div>
      <div className="listing_price_section">
        <p className="listing_price">{data.price.toLocaleString('fr-FR')} ₾</p>
        <div className="listing_address_wrapper">
          <img src={addressicon} alt="address icon" />
          <p>
            {data.city.name}, {data.address}
          </p>
        </div>
        <div className="listing_characteristics_wrapper">
          <div className="listing_characteristic">
            <img src={bed} alt="bed icon" />
            <p>{data.bedrooms}</p>
          </div>
          <div className="listing_characteristic">
            <img src={areaicon} alt="area icon" />
            <p>{data.area} მ²</p>
          </div>
          <div className="listing_characteristic">
            <img src={zipicon} alt="zip icon" />
            <p>{data.zip_code}</p>
          </div>
        </div>
        <p className="listing_is_rental">
          {data.is_rental === 0 ? 'იყიდება' : 'ქირავდება'}
        </p>
      </div>
    </Link>
  );
};

export default ListingCard;
