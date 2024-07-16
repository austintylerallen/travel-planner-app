import React, { useState } from 'react';
import axios from '../utils/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FlightSearch = ({ onFlightSelected }) => {
  const [flights, setFlights] = useState([]);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get('/flights/search', {
        params: { origin, destination, date, adults: 1 }
      });
      setFlights(response.data.data || []);
      setLoading(false);
      if (response.data.data.length === 0) {
        toast.info('No flights found for the given criteria.');
      }
    } catch (err) {
      console.error('Error searching flights', err);
      setError('Error searching flights');
      setLoading(false);
      toast.error('Error searching flights');
    }
  };

  const handleAddToTrip = (flight) => {
    onFlightSelected(flight);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Search Flights</h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <label className="block text-gray-700">Origin:</label>
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-primary"
            required
            placeholder="Enter origin airport code"
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
            placeholder="Enter destination airport code"
          />
        </div>
        <div>
          <label className="block text-gray-700">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-primary"
            required
          />
        </div>
        <button type="submit" className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors">
          {loading ? 'Searching...' : 'Search Flights'}
        </button>
      </form>
      {loading && <div className="text-center mt-4">Loading...</div>}
      <ul className="space-y-4 mt-6">
        {flights.map((flight, index) => {
          const flightSegment = flight.itineraries[0].segments[0];
          return (
            <li key={index} className="bg-white p-4 rounded-lg shadow-md">
              <p>Flight Number: {flightSegment.flightNumber || 'N/A'}</p>
              <p>Airline: {flightSegment.carrierCode || 'N/A'}</p>
              <p>Departure: {flightSegment.departure.iataCode || 'N/A'} at {new Date(flightSegment.departure.at).toLocaleString()}</p>
              <p>Arrival: {flightSegment.arrival.iataCode || 'N/A'} at {new Date(flightSegment.arrival.at).toLocaleString()}</p>
              <button
                onClick={() => handleAddToTrip(flight)}
                className="bg-blue-500 text-white py-1 px-3 rounded-md mt-2 hover:bg-blue-700 transition-colors"
              >
                Add to Trip
              </button>
            </li>
          );
        })}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default FlightSearch;
