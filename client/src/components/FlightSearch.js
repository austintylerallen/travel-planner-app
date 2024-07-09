// client/src/components/FlightSearch.js
import React, { useState } from 'react';
import axios from 'axios';

const FlightSearch = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [flights, setFlights] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:5000/flights/search', {
        params: { origin, destination, departureDate },
      });
      setFlights(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold text-green-600 mb-4">Search Flights</h2>
      <form onSubmit={handleSearch}>
        <div className="mb-4">
          <label className="block text-gray-700">Origin</label>
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            placeholder="Origin"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Destination</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            placeholder="Destination"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Departure Date</label>
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Search
        </button>
      </form>
      <ul className="space-y-4 mt-4">
        {flights.map((flight, index) => (
          <li key={index} className="p-4 border rounded bg-blue-50">
            <p>{`From ${flight.itineraries[0].segments[0].departure.iataCode} to ${flight.itineraries[0].segments[0].arrival.iataCode}`}</p>
            <p>{`Price: ${flight.price.total} ${flight.price.currency}`}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightSearch;
