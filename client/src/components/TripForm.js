import React, { useState, useCallback, useEffect } from 'react';
import axios from '../utils/axios';
import FlightSearch from './FlightSearch';
import { fetchPlaceDetails } from '../utils/googlePlaces';
import { debounce } from '../utils/debounce';
import Modal from 'react-modal';

Modal.setAppElement('#root');

// Helper function to format date to yyyy-MM-dd
const formatDate = (date) => {
  const d = new Date(date);
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const day = `0${d.getDate()}`.slice(-2);
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

// Helper function to format date to "Month Day"
const formatDisplayDate = (date) => {
  const options = { month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

const TripForm = ({ trip, onTripAdded, onTripUpdated, onClose }) => {
  const [startDate, setStartDate] = useState(trip ? formatDate(trip.startDate) : '');
  const [endDate, setEndDate] = useState(trip ? formatDate(trip.endDate) : '');
  const [destination, setDestination] = useState(trip ? trip.destination : '');
  const [showFlightSearch, setShowFlightSearch] = useState(false);
  const [error, setError] = useState('');
  const [createdTrip, setCreatedTrip] = useState(trip || null);
  const [placeDetails, setPlaceDetails] = useState(trip ? trip.placeDetails : null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tripData = {
      title: placeDetails?.name || destination,
      startDate,
      endDate,
      destination,
      placeDetails,
    };

    try {
      let savedTrip;
      if (trip) {
        savedTrip = await axios.put(`/trips/${trip._id}`, tripData);
        onTripUpdated(savedTrip.data);
      } else {
        const response = await axios.post('/trips', tripData);
        savedTrip = response.data;
        setCreatedTrip(savedTrip);
        onTripAdded(savedTrip);
      }
      setError('');
      if (onClose) onClose();
    } catch (err) {
      setError('Error creating/updating trip');
    }
  };

  const handleFlightSelected = async (flight) => {
    if (createdTrip) {
      try {
        await axios.post(`/trips/${createdTrip._id}/add-flight`, flight);
        alert('Flight added to trip successfully');
      } catch (err) {
        setError('Error adding flight to trip');
      }
    } else {
      alert('Please create the trip first');
    }
  };

  const fetchDetails = async (destination) => {
    try {
      const data = await fetchPlaceDetails(destination);
      setPlaceDetails(data.candidates[0]);
    } catch (error) {
      setError('Error fetching place details');
    }
  };

  const debouncedFetchDetails = useCallback(debounce(fetchDetails, 300), []);

  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setDestination(value);
    if (value) {
      debouncedFetchDetails(value);
    } else {
      setPlaceDetails(null);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">{trip ? 'Edit Trip' : 'Create Trip'}</h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-primary"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-primary"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Destination:</label>
          <input
            type="text"
            value={destination}
            onChange={handleDestinationChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-primary"
            required
          />
        </div>
        {placeDetails && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-inner">
            <h3 className="text-lg font-bold">Place Details:</h3>
            <p><strong>Name:</strong> {placeDetails.name}</p>
            <p><strong>Address:</strong> {placeDetails.formatted_address}</p>
            {placeDetails.photos && placeDetails.photos.length > 0 && (
              <img
                src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${placeDetails.photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`}
                alt={placeDetails.name}
                className="mt-2 rounded-lg shadow-md"
              />
            )}
          </div>
        )}
        <button type="submit" className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors">
          {trip ? 'Update Trip' : 'Create Trip'}
        </button>
      </form>
      {createdTrip && (
        <div className="mt-6 text-center">
          <button
            className="bg-secondary text-white py-2 px-4 rounded-md hover:bg-secondary-dark transition-colors"
            onClick={() => setShowFlightSearch(!showFlightSearch)}
          >
            {showFlightSearch ? 'Hide Flight Search' : 'Search Flights'}
          </button>
          {showFlightSearch && <FlightSearch onFlightSelected={handleFlightSelected} />}
        </div>
      )}
    </div>
  );
};

export default TripForm;
