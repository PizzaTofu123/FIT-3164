import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import './SignUp.css';

function SignUp() {
  // Check if there is saved personalInfo in localStorage and load it, otherwise use empty values
  const savedPersonalInfo = JSON.parse(localStorage.getItem('personalInfo')) || {
    firstName: '',
    lastName: '',
    monashID: '',
    monashEmail: '',
    dob: '',
    password: '',
    confirmPassword: ''
  };

  const [formData, setFormData] = useState(savedPersonalInfo);
  const [inProp, setInProp] = useState(true);  // Control the animation state
  const [errorMessage, setErrorMessage] = useState('');  // For showing error messages
  const navigate = useNavigate();

  // Auto-save to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem('personalInfo', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear the error message when the user makes changes
    setErrorMessage('');
  };

  // Validation functions
  const validateEmail = (email) => email.includes('@student.monash.edu');

  const validateDob = (dob) => {
    const selectedDate = new Date(dob);
    const currentDate = new Date();
    const hundredYearsAgo = new Date();
    hundredYearsAgo.setFullYear(currentDate.getFullYear() - 100);
    return selectedDate <= currentDate && selectedDate >= hundredYearsAgo;
  };

  const validateMonashID = (monashID) => /^\d{8}$/.test(monashID);

  const capitalizeName = (name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  // Check if email already exists in the database
  const checkEmailExists = async (email) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      return data.exists; // Return true if the email exists
    } catch (error) {
      console.error('Error checking email:', error);
      return false; // Default to false if an error occurs
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    if (!validateDob(formData.dob)) {
      setErrorMessage("Invalid Date of Birth. It must be within the last 100 years and not in the future.");
      return;
    }

    if (!validateEmail(formData.monashEmail)) {
      setErrorMessage("Invalid Monash Email. It must contain '@student.monash.edu'.");
      return;
    }

    if (!validateMonashID(formData.monashID)) {
      setErrorMessage("Invalid Monash ID. It must be exactly 8 digits.");
      return;
    }

    // Check if the email is already registered
    const emailExists = await checkEmailExists(formData.monashEmail);
    if (emailExists) {
      setErrorMessage("This email is already registered. Please sign in instead.");
      return; // Stop form submission if email exists
    }

    // Capitalize first and last name before saving
    const firstName = capitalizeName(formData.firstName);
    const lastName = capitalizeName(formData.lastName);

    const birthDate = new Date(formData.dob);
    const age = new Date().getFullYear() - birthDate.getFullYear();

    const personalInfo = {
      firstName: firstName,
      lastName: lastName,
      monashID: formData.monashID,
      monashEmail: formData.monashEmail,
      dob: formData.dob,
      password: formData.password,
      age: age
    };

    // Store updated personal info with formatted names
    localStorage.setItem('personalInfo', JSON.stringify(personalInfo));

    // Reset the form data after successful submission
    setFormData({
      firstName: '',
      lastName: '',
      monashID: '',
      monashEmail: '',
      dob: '',
      password: '',
      confirmPassword: ''
    });

    // Trigger the transition to the next page
    setInProp(false);
    setTimeout(() => {
      navigate('/education-details');
    }, 300);  // Match animation duration
  };

  return (
    <CSSTransition
      in={inProp}
      timeout={300}
      classNames="fade"
      unmountOnExit
    >
      <div className="signup-wrapper">
        <div className="signup-header">
          <img src="/images/monash_logo_login.png" alt="Monash University Logo" className="signup-logo" />
        </div>
        <div className="signup-container">
          <div className="signup-image">
            <img src="/images/sign_up_illustration.png" alt="Sign Up Illustration" className="signup-illustration" />
          </div>
          <div className="signup-form-container">
            <h2 className="signup-heading">Create an account</h2>
            <p className="signup-text">
              Already have an account? <Link to="/signin" className="signup-link">Sign In</Link>
            </p>

            {/* Display error message */}
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <form onSubmit={handleSubmit} className="signup-form">
              <div className="signup-form-group">
                <label className="signup-label">First Name</label>
                <input 
                  type="text" 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleChange} 
                  className="signup-input" 
                  required 
                />
              </div>

              <div className="signup-form-group">
                <label className="signup-label">Last Name</label>
                <input 
                  type="text" 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleChange} 
                  className="signup-input" 
                  required 
                />
              </div>

              <div className="signup-form-group">
                <label className="signup-label">Monash ID</label>
                <input 
                  type="text" 
                  name="monashID" 
                  value={formData.monashID} 
                  onChange={handleChange} 
                  className="signup-input" 
                  required 
                />
              </div>

              <div className="signup-form-group">
                <label className="signup-label">Monash Email</label>
                <input 
                  type="email" 
                  name="monashEmail" 
                  value={formData.monashEmail} 
                  onChange={handleChange} 
                  className="signup-input" 
                  required 
                />
              </div>

              <div className="signup-form-group">
                <label className="signup-label">Date of Birth</label>
                <input 
                  type="date" 
                  name="dob" 
                  value={formData.dob} 
                  onChange={handleChange} 
                  className="signup-input" 
                  required 
                />
              </div>

              <div className="signup-form-group">
                <label className="signup-label">Password</label>
                <input 
                  type="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  className="signup-input" 
                  required 
                />
              </div>

              <div className="signup-form-group">
                <label className="signup-label">Re-enter Password</label>
                <input 
                  type="password" 
                  name="confirmPassword" 
                  value={formData.confirmPassword} 
                  onChange={handleChange} 
                  className="signup-input" 
                  required 
                />
              </div>

              <button type="submit" className="signup-button">Next ➜</button>
            </form>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}

export default SignUp;
