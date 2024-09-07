import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css'; // Importing SignUp specific CSS

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    monashID: '',
    dob: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted', formData);
    navigate('/dashboard'); // Redirect after successful form submission
  };

  return (
<<<<<<< HEAD
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
              <label className="signup-label">Date of Birth</label>
              <input 
                type="date" 
                name="dob" 
                value={formData.dob} 
                onChange={handleChange} 
                className="signup-input signup-date-input" 
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
=======
    <div className="auth-container">
      <img src="/images/monash_logo_login.png" alt="Monash University Logo" className="auth-logo" />
      <h2 className='h2-auth'>Create an account</h2>
      <button className="auth-button" onClick={() => navigate('/member-signup')}>Members</button>
      <button className="auth-button">Committee</button>
      <p className="auth-text">Already have an account?</p>
      <Link to="/" className="auth-link">Sign In</Link>
>>>>>>> b151cf31c8e5ebc660a5c577ddcd34b93da09b96
    </div>
  );
}

export default SignUp;
