import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useAuth } from '../context/AuthContext';
import '../index.css'; // Import the CSS file

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useAuth();

  const switchMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-background">
      <div className="auth-container">
        {isLogin ? (
          <LoginForm onLogin={login} onSwitch={switchMode} />
        ) : (
          <SignupForm onSwitch={switchMode} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
