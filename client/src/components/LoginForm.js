import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onLogin, onSwitch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:4000/api/auth/login', { email, password }, { withCredentials: true });
      onLogin();
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center text-darkBlue">Login</h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
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
        <button type="submit" className="w-full bg-orange text-white py-2 rounded-md hover:bg-darkBlue transition-colors">
          Login
        </button>
      </form>
      <p className="mt-4 text-center text-darkBlue">
        Don't have an account? <button onClick={onSwitch} className="text-orange hover:underline">Sign Up</button>
      </p>
    </div>
  );
};

export default LoginForm;
