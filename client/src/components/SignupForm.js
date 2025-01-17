import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = ({ onSwitch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.post('http://localhost:4000/api/auth/signup', { email, password }, { withCredentials: true });
      setSuccess("Signup successful! Please log in.");
      setError('');
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center text-darkBlue">Sign Up</h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {success && <div className="text-green-500 text-center mb-4">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-darkBlue">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-lightBlue"
            required
          />
        </div>
        <div>
          <label className="block text-darkBlue">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-lightBlue"
            required
          />
        </div>
        <div>
          <label className="block text-darkBlue">Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-lightBlue"
            required
          />
        </div>
        <button type="submit" className="w-full bg-orange text-white py-2 rounded-md hover:bg-darkBlue transition-colors">
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-center text-darkBlue">
        Already have an account? <button onClick={onSwitch} className="text-orange hover:underline">Login</button>
      </p>
    </div>
  );
};

export default SignupForm;
