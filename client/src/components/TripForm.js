import React, { useState } from 'react';
import axios from '../utils/axios';
import FlightSearch from './FlightSearch';

const TripForm = ({ trip, onTripAdded, onTripUpdated, onClose }) => {
  const [title, setTitle] = useState(trip ? trip.title : '');
  const [description, setDescription] = useState(trip ? trip.description : '');
  const [startDate, setStartDate] = useState(trip ? trip.startDate : '');
  const [endDate, setEndDate] = useState(trip ? trip.endDate : '');
  const [destination, setDestination] = useState(trip ? trip.destination : '');
  const [showFlightSearch, setShowFlightSearch] = useState(false);
  const [error, setError] = useState('');
  const [createdTrip, setCreatedTrip] = useState(trip || null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tripData = {
      title,
      description,
      startDate,
      endDate,
      destination,
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

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">{trip ? 'Edit Trip' : 'Create Trip'}</h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Trip Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-primary"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-primary"
            required
          ></textarea>
        </div>
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
            onChange={(e) => setDestination(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-primary"
            required
          />
        </div>
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
