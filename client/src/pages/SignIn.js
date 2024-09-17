import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

function SignIn({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (email && password) {
      try {
        const response = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log('Sign In Successful');
          handleLogin(data);  // Pass the user profile data to App.js
          navigate('/profile');  // Redirect to profile/dashboard
        } else {
          alert('Invalid credentials, please try again.');
        }
      } catch (error) {
        console.error('Error during sign in:', error);
        alert('An error occurred during sign in, please try again later.');
      }
    } else {
      alert('Please enter both email and password');
    }
  };

  return (
    <div className="auth-container">
      <img src="/images/monash_logo_login.png" alt="Monash University Logo" className="auth-logo" />
      <h2 className='h2-auth'>Sign In</h2>
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
