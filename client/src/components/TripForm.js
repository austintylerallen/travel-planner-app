import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { useParams } from 'react-router-dom';

const TripForm = ({ onTripAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [destination, setDestination] = useState('');
  const [error, setError] = useState('');
  const { id } = useParams();
  const isEditing = !!id;

  useEffect(() => {
    if (isEditing) {
      const fetchTrip = async () => {
        try {
          const response = await axios.get(`/trips/${id}`);
          const trip = response.data;
          setTitle(trip.title);
          setDescription(trip.description);
          setStartDate(trip.startDate.split('T')[0]);
          setEndDate(trip.endDate.split('T')[0]);
          setDestination(trip.destination);
        } catch (err) {
          setError('Error fetching trip data');
        }
      };
      fetchTrip();
    }
  }, [id, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        const response = await axios.put(`/trips/${id}`, {
          title,
          description,
          startDate,
          endDate,
          destination,
        });
        onTripAdded(response.data);
      } else {
        const response = await axios.post('/trips', {
          title,
          description,
          startDate,
          endDate,
          destination,
        });
        onTripAdded(response.data);
      }
    } catch (err) {
      setError('Error creating trip');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">{isEditing ? 'Edit Trip' : 'Create Trip'}</h2>
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
          {isEditing ? 'Update Trip' : 'Create Trip'}
        </button>
      </form>
    </div>
  );
};

export default TripForm;
