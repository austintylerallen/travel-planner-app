import React from 'react';
import AuthForm from './AuthForm';

const LandingPage = ({ onLogin }) => {
  return (
    <div className="landing-page">
      <h1>Welcome to Travel Planner App</h1>
      <AuthForm onLogin={onLogin} />
    </div>
  );
};

export default LandingPage;
