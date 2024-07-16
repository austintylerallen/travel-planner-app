import React, { useState } from 'react';
import axios from '../utils/axios';
import FlightSearch from './FlightSearch';
import { fetchPlaceDetails } from '../utils/googlePlaces';
import { debounce } from '../utils/debounce';
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatDate, formatTime } from '../utils/format';
import { getAirlineInfo } from '../utils/airlines';
import '../index.css'; // Ensure this is included to use the global CSS

Modal.setAppElement('#root');

const formatDateInput = (date) => {
  const d = new Date(date);
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const day = `0${d.getDate()}`.slice(-2);
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

const TripForm = ({ trip, onTripAdded, onTripUpdated, onClose }) => {
  const [startDate, setStartDate] = useState(trip ? formatDateInput(trip.startDate) : '');
  const [endDate, setEndDate] = useState(trip ? formatDateInput(trip.endDate) : '');
  const [destination, setDestination] = useState(trip ? trip.destination : '');
  const [showFlightSearch, setShowFlightSearch] = useState(false);
  const [error, setError] = useState('');
  const [placeDetails, setPlaceDetails] = useState(trip ? trip.placeDetails : null);
  const [selectedFlight, setSelectedFlight] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tripData = {
      title: placeDetails?.name || destination,
      startDate,
      endDate,
      destination,
      placeDetails,
      flights: selectedFlight ? [selectedFlight] : []
    };

    try {
      let savedTrip;
      if (trip) {
        savedTrip = await axios.put(`/trips/${trip._id}`, tripData);
        onTripUpdated(savedTrip.data);
        toast.success('Trip updated successfully!');
      } else {
        const response = await axios.post('/trips', tripData);
        savedTrip = response.data;
        onTripAdded(savedTrip);
        toast.success('Trip created successfully!');
      }
      setError('');
      if (onClose) onClose();
    } catch (err) {
      setError('Error creating/updating trip');
      toast.error('Error creating/updating trip');
    }
  };

  const handleFlightSelected = (flight) => {
    const flightSegment = flight.itineraries[0].segments[0];
    const flightData = {
      flightNumber: flightSegment.flightNumber || 'N/A',
      airline: flightSegment.carrierCode || 'N/A',
      departureAirport: flightSegment.departure.iataCode || 'N/A',
      departureTime: flightSegment.departure.at || 'N/A',
      arrivalAirport: flightSegment.arrival.iataCode || 'N/A',
      arrivalTime: flightSegment.arrival.at || 'N/A',
    };
    setSelectedFlight(flightData);
    setShowFlightSearch(false);
    toast.success('Flight selected successfully!');
  };

  const fetchDetails = async (destination) => {
    try {
      const data = await fetchPlaceDetails(destination);
      setPlaceDetails(data.candidates[0]);
    } catch (error) {
      setError('Error fetching place details');
      toast.error('Error fetching place details');
    }
  };

  const debouncedFetchDetails = debounce(fetchDetails, 300);

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
            placeholder="Enter destination city or place"
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
        <div className="text-center">
          <button
            type="button"
            className="bg-secondary text-white py-2 px-4 rounded-md hover:bg-secondary-dark transition-colors mt-4"
            onClick={() => setShowFlightSearch(true)}
          >
            {selectedFlight ? 'Change Flight' : 'Add Flight'}
          </button>
        </div>
        {selectedFlight && (
          <div className="mt-4 p-4 bg-gray-200 rounded-lg shadow-inner">
            <h3 className="text-lg font-bold mb-2">Selected Flight:</h3>
            <p>Flight Number: {selectedFlight.flightNumber}</p>
            <p>Airline: {getAirlineInfo(selectedFlight.airline).name}</p>
            {getAirlineInfo(selectedFlight.airline).logo && (
              <img src={getAirlineInfo(selectedFlight.airline).logo} alt={getAirlineInfo(selectedFlight.airline).name} className="logo"/>
            )}
            <p>Departure: {selectedFlight.departureAirport} at {formatTime(selectedFlight.departureTime)}</p>
            <p>Arrival: {selectedFlight.arrivalAirport} at {formatTime(selectedFlight.arrivalTime)}</p>
          </div>
        )}
        <button type="submit" className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors mt-4">
          {trip ? 'Update Trip' : 'Create Trip'}
        </button>
      </form>
      <Modal isOpen={showFlightSearch} onRequestClose={() => setShowFlightSearch(false)} contentLabel="Search Flights">
        <FlightSearch onFlightSelected={handleFlightSelected} />
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default TripForm;
