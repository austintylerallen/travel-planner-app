// src/components/TripList.js
import React from 'react';
import axios from '../utils/axios';

const TripList = ({ trips, onEdit }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/trips/${id}`);
      alert('Trip deleted successfully');
    } catch (err) {
      alert('Error deleting trip');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Trip List</h2>
      <ul className="space-y-4">
        {trips.map((trip) => (
          <li key={trip._id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">{trip.title}</h3>
            <p>{trip.description}</p>
            <p>{trip.startDate} - {trip.endDate}</p>
            <p>Destination: {trip.destination}</p>
            {trip.flights && trip.flights.length > 0 && (
              <div>
                <h4 className="font-bold mt-4">Flights:</h4>
                <ul className="list-disc list-inside">
                  {trip.flights.map((flight, index) => (
                    <li key={index}>
                      {flight.airline} {flight.flightNumber} from {flight.departureAirport} at {flight.departureTime} to {flight.arrivalAirport} at {flight.arrivalTime}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <button
              onClick={() => onEdit(trip)}
              className="bg-blue-500 text-white py-1 px-3 rounded-md mt-2 hover:bg-blue-700 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(trip._id)}
              className="bg-red-500 text-white py-1 px-3 rounded-md mt-2 hover:bg-red-700 transition-colors ml-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TripList;
