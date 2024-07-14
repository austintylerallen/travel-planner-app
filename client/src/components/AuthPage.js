// components/AuthPage.jsx
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useAuth();

  const switchMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="container mx-auto p-6">
      {isLogin ? (
        <LoginForm onLogin={login} onSwitch={switchMode} />
      ) : (
        <SignupForm onSwitch={switchMode} />
      )}
    </div>
  );
};

export default AuthPage;
