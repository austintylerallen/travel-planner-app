// components/Profile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/api/users/me', { withCredentials: true })
      .then(response => setProfile(response.data))
      .catch(error => setError('Error fetching profile'));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <p>{profile.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Username:</label>
          <p>{profile.username}</p>
        </div>
        <button className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors">
          <Link to="/profile/edit">Edit Profile</Link>
        </button>
      </div>
    </div>
  );
};

export default Profile;
