// components/LoginForm.jsx
import React, { useState } from 'react';

const LoginForm = ({ onLogin, onSwitch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    onLogin();
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-primary"
            required 
          />
        </div>
        <div>
          <label className="block text-gray-700">Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-primary"
            required 
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Don't have an account? <button onClick={onSwitch} className="text-primary hover:underline">Sign Up</button>
      </p>
    </div>
  );
};

export default LoginForm;
