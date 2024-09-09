import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

function SignIn() {
  const navigate = useNavigate();

  const handleMembersSignIn = () => {
    navigate('/members-signin');
  };

  return (
    <div className="auth-container">
      <img src="/images/monash_logo_login.png" alt="Monash University Logo" className="auth-logo" />
      <h2>Sign In</h2>
      <button className="auth-button" onClick={handleMembersSignIn}>Members</button>
      <button className="auth-button">Committee</button>
      <p>
        Don't have an account? <Link to="/signup" className="auth-link">Sign Up</Link>
      </p>
    </div>
  );
}

export default SignIn;
