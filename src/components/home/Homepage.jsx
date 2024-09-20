import React, { useEffect, useState } from 'react';
import { fetchData } from '../../api';
import { PuffLoader } from 'react-spinners';
import ListingCard from './ListingCard';
import { useFilter } from '../../contexts/FilterContext';

const Homepage = () => {
  const { setListings, filteredListings, setFilteredListings } = useFilter();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData('real-estates')
      .then((data) => {
        setListings(data);
        setFilteredListings(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <div>
        <p className="error_txt">{error}</p>
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <div className="center_loader">
          <PuffLoader color="#fa6400" className="loader" />
        </div>
      ) : (
        <div className="listings_container">
          {filteredListings.length ? (
            filteredListings.map((listing) => (
              <ListingCard key={listing.id} data={listing} />
            ))
          ) : (
            <p>ასეთი ბინა არ მოიძებნა</p>
          )}
        </div>
      )}
    </>
  );
};

export default Homepage;
