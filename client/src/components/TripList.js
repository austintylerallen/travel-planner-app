import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';

const TripList = ({ onEditTrip }) => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get('/trips');
        setTrips(response.data);
      } catch (err) {
        console.error('Error fetching trips', err);
      }
    };

    fetchTrips();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/trips/${id}`);
      setTrips(trips.filter((trip) => trip._id !== id));
    } catch (err) {
      console.error('Error deleting trip', err);
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
            <p>Start Date: {trip.startDate}</p>
            <p>End Date: {trip.endDate}</p>
            <p>Destination: {trip.destination}</p>
            <button onClick={() => onEditTrip(trip)} className="bg-blue-500 text-white py-1 px-3 rounded-md mt-2 hover:bg-blue-700 transition-colors">
              Edit
            </button>
            <button onClick={() => handleDelete(trip._id)} className="bg-red-500 text-white py-1 px-3 rounded-md mt-2 hover:bg-red-700 transition-colors">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TripList;
