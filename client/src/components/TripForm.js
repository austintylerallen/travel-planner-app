// components/TripForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const TripForm = () => {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Fetch the trip details to edit
      axios.get(`http://localhost:4000/api/trips/${id}`)
        .then(response => {
          const { destination, startDate, endDate, notes } = response.data;
          setDestination(destination);
          setStartDate(startDate.substring(0, 10)); // Format date for input
          setEndDate(endDate.substring(0, 10)); // Format date for input
          setNotes(notes);
        })
        .catch(error => setError('Error fetching trip details'));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tripData = { destination, startDate, endDate, notes };
    try {
      if (id) {
        // Update existing trip
        await axios.put(`http://localhost:4000/api/trips/${id}`, tripData, { withCredentials: true });
        setSuccess('Trip updated successfully');
      } else {
        // Create new trip
        await axios.post('http://localhost:4000/api/trips', tripData, { withCredentials: true });
        setSuccess('Trip created successfully');
      }
      setError('');
      setTimeout(() => navigate('/trips'), 2000);
    } catch (error) {
      setError(error.response?.data.message || 'Error creating/updating trip');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">{id ? 'Edit Trip' : 'Create Trip'}</h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {success && <div className="text-green-500 text-center mb-4">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
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
          <label className="block text-gray-700">Notes:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-primary"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors"
        >
          {id ? 'Update Trip' : 'Create Trip'}
        </button>
      </form>
    </div>
  );
};

export default TripForm;
