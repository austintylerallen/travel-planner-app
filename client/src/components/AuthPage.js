// components/AuthPage.jsx
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {isLogin ? <LoginForm onLogin={onLogin} onSwitch={toggleForm} /> : <SignupForm onSwitch={toggleForm} />}
    </div>
  );
};

export default AuthPage;
