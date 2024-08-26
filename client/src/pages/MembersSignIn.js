// src/pages/MembersSignIn.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './MembersSignIn.css';

const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const pageTransition = {
  duration: 0.8,
};

function MembersSignIn({ handleLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Hardcoded credentials for the specific user
    const hardcodedEmail = 'bwil0001@student.monash.edu';
    const hardcodedPassword = '123';

    if (email === hardcodedEmail && password === hardcodedPassword) {
      // User credentials match the hardcoded credentials
      const userProfile = {
        firstName: 'Bobby',
        lastName: 'Wilson',
        pronouns: 'He/Him',
        studentID: '31234567',
        email: hardcodedEmail,
        mobile: '0412345678',
        level: 'Undergraduate',
        year: '3',
        course: 'Bachelor of Science',
        faculty: 'Faculty of Science',
        profilePicture: '/images/default_profile.png',
      };

      handleLogin(userProfile); // Log in with the hardcoded user profile
      navigate('/');
    } else {
      // Credentials don't match
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  return (
    <motion.div
      className="auth-container"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <button className="back-button" onClick={() => navigate('/signin')}>←</button>
      <img src="/images/monash_logo_login.png" alt="Monash University" className="auth-logo" />
      <h2 className="auth-title">Members Sign In</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-form-group">
          <label>Monash Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="auth-form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="auth-button">Sign In</button>
      </form>
    </motion.div>
  );
}

export default MembersSignIn;
