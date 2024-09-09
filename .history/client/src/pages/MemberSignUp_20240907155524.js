import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './MemberSignUp.css';

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

function MemberSignUp() {
  const navigate = useNavigate();

  // State to manage form input values
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    studentId: '',
    dob: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Retrieve form data from localStorage when the component mounts
  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem('userData'));
    if (savedFormData) {
      setFormData(savedFormData);
    }
  }, []);

  // Function to handle input changes
  const handleChange = (e) => {
    const updatedFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(updatedFormData);
    localStorage.setItem('userData', JSON.stringify(updatedFormData)); // Save to localStorage
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Store data locally (temporary solution)
    localStorage.setItem('userData', JSON.stringify(formData));

    // Navigate to the club sign-up page
    navigate('/club-signup');
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
          <h2 className="member-signup">Create a member account</h2>
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Student ID</label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Monash Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Re-enter Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="submit-button">Next →</button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default MemberSignUp;
