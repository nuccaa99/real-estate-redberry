import React, { useEffect, useState } from 'react';
import { fetchData } from '../../api';
import { PuffLoader } from 'react-spinners';
import ListingCard from './ListingCard';

const Homepage = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  console.log(listings);
  useEffect(() => {
    fetchData('real-estates')
      .then((data) => {
        setListings(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (error) {
    return (
      <div>
        <p className="error_txt">{error}</p>
      </div>
    );
  }

  return (
    <div className="listings_container">
      {isLoading && <PuffLoader color="#fa6400" />}
      {listings.map((listing) => {
        return <ListingCard key={listing.id} data={listing} />;
      })}
    </div>
  );
};

export default Homepage;
