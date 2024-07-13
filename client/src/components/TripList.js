import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

const TripList = ({ trips, setTrips }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/trips/${id}`);
      setTrips(trips.filter(trip => trip._id !== id));
    } catch (error) {
      console.error('Error deleting trip', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Trip List</h2>
      <ul className="space-y-4">
        {trips.map(trip => (
          <li key={trip._id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">{trip.title}</h3>
            <p>{trip.description}</p>
            <p>Start Date: {new Date(trip.startDate).toLocaleDateString()}</p>
            <p>End Date: {new Date(trip.endDate).toLocaleDateString()}</p>
            <p>Destination: {trip.destination}</p>
            {trip.flights && trip.flights.length > 0 && (
              <div>
                <h4 className="font-bold">Flights:</h4>
                <ul>
                  {trip.flights.map((flight, index) => (
                    <li key={index}>
                      <p>Flight Number: {flight.flightNumber}</p>
                      <p>Airline: {flight.airline}</p>
                      <p>Departure: {flight.departureAirport} at {flight.departureTime}</p>
                      <p>Arrival: {flight.arrivalAirport} at {flight.arrivalTime}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleEdit(trip._id)}
                className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(trip._id)}
                className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TripList;
