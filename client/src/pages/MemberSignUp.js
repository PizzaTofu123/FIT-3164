// src/pages/MemberSignUp.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import Framer Motion
import './MemberSignUp.css';

const pageVariants = {
  initial: {
    opacity: 0
  },
  in: {
    opacity: 1
  },
  out: {
    opacity: 0
  }
};

const pageTransition = {
  duration: 0.8
};


function MemberSignUp() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted');
  };

  return (
    <motion.div
      className="signup-page"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="monash-logo-container">
        <img src="/images/monash_logo_login.png" alt="Monash University" className="monash-logo" />
      </div>
      <div className="signup-content">
        <div className="signup-left">
          <img src="/images/sign_up_illustration.png" alt="Sign Up Illustration" className="signup-illustration" />
        </div>
        <div className="signup-right">
          <button className="back-button" onClick={() => navigate('/signup')}>←</button>
          <h2>Create a member account</h2>
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" required />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" required />
            </div>
            <div className="form-group">
              <label>Student ID</label>
              <input type="text" required />
            </div>
            <div className="form-group">
              <label>Monash Email</label>
              <input type="email" required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" required />
            </div>
            <div className="form-group">
              <label>Re-enter Password</label>
              <input type="password" required />
            </div>
            <button type="submit" className="submit-button">Next →</button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default MemberSignUp;
