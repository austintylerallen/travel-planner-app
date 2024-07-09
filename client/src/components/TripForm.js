// client/src/components/TripForm.js
import React, { useState } from 'react';
import axios from 'axios';

const TripForm = () => {
  const [trip, setTrip] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    activities: '',
    bookings: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrip({ ...trip, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedTrip = {
      ...trip,
      activities: trip.activities.split(',').map((activity) => activity.trim()),
      bookings: [{ type: 'example', details: trip.bookings }],
    };
    try {
      await axios.post('http://localhost:5000/trips', formattedTrip);
      alert('Trip created successfully');
    } catch (err) {
      console.error(err);
      alert('Error creating trip');
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold text-green-600 mb-4">Create a Trip</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Destination</label>
          <input
            type="text"
            name="destination"
            value={trip.destination}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={trip.startDate}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">End Date</label>
          <input
            type="date"
            name="endDate"
            value={trip.endDate}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Activities (comma separated)</label>
          <input
            type="text"
            name="activities"
            value={trip.activities}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Booking Details</label>
          <input
            type="text"
            name="bookings"
            value={trip.bookings}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Create Trip
        </button>
      </form>
    </div>
  );
};

export default TripForm;
