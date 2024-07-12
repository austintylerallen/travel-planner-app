// components/TripList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TripList = () => {
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/api/trips', { withCredentials: true })
      .then(response => setTrips(response.data))
      .catch(error => setError('Error fetching trips'));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/trips/${id}`, { withCredentials: true });
      setTrips(trips.filter(trip => trip._id !== id));
    } catch (error) {
      setError('Error deleting trip');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">My Trips</h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <div className="space-y-4">
        {trips.map(trip => (
          <div key={trip._id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">{trip.destination}</h3>
            <p>{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</p>
            <p>{trip.notes}</p>
            <div className="flex justify-end space-x-4 mt-4">
              <Link to={`/edit/${trip._id}`} className="text-primary hover:underline">Edit</Link>
              <button onClick={() => handleDelete(trip._id)} className="text-red-500 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-6">
        <Link to="/create" className="text-primary hover:underline">Create New Trip</Link>
      </div>
    </div>
  );
};

export default TripList;
