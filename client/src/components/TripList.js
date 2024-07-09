// client/src/components/TripList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TripList = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get('http://localhost:5000/trips');
        setTrips(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTrips();
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold text-green-600 mb-4">Trips</h2>
      <ul className="space-y-4">
        {trips.map((trip) => (
          <li key={trip._id} className="p-4 border rounded bg-blue-50">
            <h3 className="text-xl font-bold">{trip.destination}</h3>
            <p>{`From ${new Date(trip.startDate).toLocaleDateString()} to ${new Date(trip.endDate).toLocaleDateString()}`}</p>
            <p>{`Activities: ${trip.activities.join(', ')}`}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TripList;
