import React, { useState, useRef } from 'react';
import { useFilter } from '../../contexts/FilterContext';
import ListingCard from '../home/ListingCard';
import arrowBack from '../../assets/arrowBack.svg';

const SimilarLocationListings = ({ regionId, listingId }) => {
  const { listings } = useFilter();

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const filteredListings = regionId
    ? listings.filter(
        (listing) =>
          listing.city.region_id === regionId && listing.id !== listingId
      )
    : [];

  const sliderRef = useRef(null);

  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };
  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -384 : 384;
      sliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div className="similar_listings_container">
      <h3 className="similar_listings_title">ბინები მსგავს ლოკაციაზე</h3>
      {filteredListings.length > 0 && (
        <img
          src={arrowBack}
          alt="arrow left"
          className={`slider_arrow_left ${!canScrollLeft ? 'disabled' : ''}`}
          onClick={() => canScrollLeft && scroll('left')}
        />
      )}
      {filteredListings.length > 0 ? (
        <div
          className="similar_listings_sliders_wrapper"
          ref={sliderRef}
          onScroll={checkScroll}
        >
          {filteredListings.map((listing) => {
            return (
              <ListingCard
                key={listing.id}
                data={listing}
                scrollToTop={scrollToTop}
              />
            );
          })}
        </div>
      ) : (
        <p>მსგავსი ბინები არ მოიძებნა</p>
      )}
      {filteredListings.length > 0 && (
        <img
          src={arrowBack}
          alt="arrow right"
          className={`slider_arrow_right upside ${
            !canScrollRight ? 'disabled' : ''
          }`}
          onClick={() => canScrollRight && scroll('right')}
        />
      )}
    </div>
  );
};

export default SimilarLocationListings;
