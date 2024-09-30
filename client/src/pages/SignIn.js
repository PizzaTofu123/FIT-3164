import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import './Auth.css';

function SignIn({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // For showing error messages
  const [inProp, setInProp] = useState(true); // Track the animation state
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages

    if (email && password) {
      try {
        const response = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          // Email exists and password is correct
          console.log('Sign In Successful');
          handleLogin(data); // Pass the user profile data to App.js

          // Trigger the fade-out animation before redirecting
          setInProp(false);
          setTimeout(() => {
            navigate('/'); // Redirect to profile/dashboard after animation
          }, 300); // Animation duration of 300ms
        } else {
          // Handle specific error messages from the backend
          if (data.message === 'User not found') {
            setErrorMessage('Email not found. Please sign up.');
          } else if (data.message === 'Invalid password') {
            setErrorMessage('Incorrect password. Please try again.');
          } else {
            setErrorMessage('Sign in failed. Please try again.');
          }
        }
      } catch (error) {
        console.error('Error during sign in:', error);
        setErrorMessage('An error occurred during sign in. Please try again later.');
      }
    } else {
      setErrorMessage('Please enter both email and password.');
    }
  };

  return (
    <CSSTransition
      in={inProp}
      timeout={300}
      classNames="fade"
      unmountOnExit
    >
      <div className="auth-container">
        <img src="/images/monash_logo_login.png" alt="Monash University Logo" className="auth-logo" />
        <h2 className="h2-auth">Sign In</h2>

        {/* Display error message */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

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
    </CSSTransition>
  );
}

export default SignIn;
