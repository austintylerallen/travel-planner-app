import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import FlightSearch from './FlightSearch';

const TripForm = ({ trip, onClose }) => {
  const [title, setTitle] = useState(trip ? trip.title : '');
  const [description, setDescription] = useState(trip ? trip.description : '');
  const [startDate, setStartDate] = useState(trip ? trip.startDate : '');
  const [endDate, setEndDate] = useState(trip ? trip.endDate : '');
  const [destination, setDestination] = useState(trip ? trip.destination : '');
  const [error, setError] = useState('');
  const [showFlightSearch, setShowFlightSearch] = useState(false);
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    if (trip) {
      setTitle(trip.title);
      setDescription(trip.description);
      setStartDate(trip.startDate);
      setEndDate(trip.endDate);
      setDestination(trip.destination);
      setFlights(trip.flights || []);
    }
  }, [trip]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tripData = {
      title,
      description,
      startDate,
      endDate,
      destination,
      flights,
    };

    try {
      if (trip) {
        await axios.put(`/trips/${trip._id}`, tripData);
      } else {
        await axios.post('/trips', tripData);
      }
      onClose();
    } catch (err) {
      console.error('Error creating/updating trip', err);
      setError('Error creating/updating trip');
    }
  };

  const handleFlightSelected = (flightData) => {
    setFlights([...flights, flightData]);
    setShowFlightSearch(false);
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
        <div>
          <label className="block text-gray-700">Will you be flying to your destination?</label>
          <button type="button" onClick={() => setShowFlightSearch(true)} className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors">
            Search Flights
          </button>
        </div>
        <button type="submit" className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors">
          {trip ? 'Update Trip' : 'Create Trip'}
        </button>
      </form>
      {showFlightSearch && <FlightSearch onFlightSelected={handleFlightSelected} />}
    </div>
  );
};

export default TripForm;
