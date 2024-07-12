// AuthForm.jsx

import React, { useState } from 'react';
import axios from '../Axios'; // Import your configured Axios instance

const AuthForm = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setError(null); // Clear any previous errors when toggling form
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isSignUp) {
        response = await axios.post('/api/auth/register', { name, email, password });
      } else {
        response = await axios.post('/api/auth/login', { email, password });
      }
      console.log(response.data);
      const token = response.data.token; // Assuming your backend returns a token
      localStorage.setItem('token', token); // Store token in localStorage
      onLogin(); // Update parent component to reflect user is authenticated
    } catch (error) {
      if (error.response) {
        setError(error.response.data.msg || 'Something went wrong');
      } else if (error.request) {
        setError('Request failed. Please try again later.');
      } else {
        setError('Error: ' + error.message);
      }
      console.error('Error:', error); // Log the error for debugging
    }
  };

  return (
    <div className="auth-container">
      <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        {isSignUp && (
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
      </form>
      <button className="toggle-button" onClick={toggleForm}>
        {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
};

export default AuthForm;
