import React, { useEffect, useState } from 'react';

const PlaceDetails = ({ input }) => {
  const [placeDetails, setPlaceDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!input) return;

    const fetchPlaceDetails = () => {
      const service = new window.google.maps.places.PlacesService(document.createElement('div'));

      const request = {
        query: input,
        fields: ['name', 'rating', 'formatted_address', 'photos'],
      };

      service.findPlaceFromQuery(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
          setPlaceDetails(results[0]);
        } else {
          setError('Place details not found');
        }
      });
    };

    fetchPlaceDetails();
  }, [input]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!placeDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="place-details">
      <h2>{placeDetails.name}</h2>
      <p>{placeDetails.formatted_address}</p>
      <p>Rating: {placeDetails.rating}</p>
      {placeDetails.photos && placeDetails.photos.length > 0 && (
        <img
          src={placeDetails.photos[0].getUrl({ maxWidth: 400 })}
          alt={placeDetails.name}
        />
      )}
    </div>
  );
};

export default PlaceDetails;
