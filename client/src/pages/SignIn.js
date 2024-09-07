import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    // Implement authentication logic here
    if (email && password) {
      console.log('Sign In Successful');
      navigate('/dashboard'); // Redirect to dashboard
    } else {
      alert('Please enter both email and password');
    }
  };

  return (
    <div className="auth-container">
      <img src="/images/monash_logo_login.png" alt="Monash University Logo" className="auth-logo" />
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn} className="auth-form">
        <label htmlFor="email">Monash Email</label>
        <input
          type="email"
          id="email"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="forgot-password">
          <Link to="/forgot-password" className="auth-link">Forgot Password?</Link>
        </div>
        <button type="submit" className="auth-button">Sign In</button>
      </form>
      <p className="auth-text">
        Don’t have an account? <Link to="/signup" className="auth-link">Sign Up</Link>
      </p>
    </div>
  );
}

export default SignIn;
