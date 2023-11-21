import React from 'react';
import './Auth.css';
import { useNavigate } from 'react-router-dom';

const SignInButton: React.FC = () => {
  const navigate = useNavigate();

  const handleSignInNavigation = () => {
    navigate('/login');
  };

  return (
    <button className="button SignIn" onClick={handleSignInNavigation}>
      Sign In
    </button>
  );
};

export default SignInButton;
