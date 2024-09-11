import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './EducationDetails.css'; // Importing EducationDetails specific CSS

function EducationDetails() {
  const [educationData, setEducationData] = useState({
    level: '',
    faculty: '',
    course: '',
    year: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get personal info from localStorage
    const personalInfo = JSON.parse(localStorage.getItem('personalInfo'));

    // Combine both personal and education info
    const combinedData = { ...personalInfo, ...educationData };

    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(combinedData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('User registered successfully!');
        navigate('/dashboard'); // Redirect after successful registration
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="education-wrapper">
      <div className="education-header">
        <img src="/images/monash_logo_login.png" alt="Monash University Logo" className="education-logo" />
      </div>
      <div className="education-container">
        {/* Back button */}
        <button className="education-back-button" onClick={() => navigate('/signup')}>
          &#8592;
        </button>
        
        <div className="education-image">
          <img src="/images/sign_up_illustration.png" alt="Sign Up Illustration" className="education-illustration" />
        </div>
        <div className="education-form-container">
          <h2 className="education-heading">Education Details</h2>
          <p className="education-description">Please fill in your education details.</p>
          <form onSubmit={handleSubmit} className="education-form">
            <div className="education-form-group">
              <label className="education-label">Level</label>
              <input 
                type="text" 
                name="level" 
                value={educationData.level} 
                onChange={handleChange} 
                className="education-input" 
                required 
              />
            </div>

            <div className="education-form-group">
              <label className="education-label">Faculty</label>
              <input 
                type="text" 
                name="faculty" 
                value={educationData.faculty} 
                onChange={handleChange} 
                className="education-input" 
                required 
              />
            </div>

            <div className="education-form-group">
              <label className="education-label">Course</label>
              <input 
                type="text" 
                name="course" 
                value={educationData.course} 
                onChange={handleChange} 
                className="education-input" 
                required 
              />
            </div>

            <div className="education-form-group">
              <label className="education-label">Year</label>
              <input 
                type="number" 
                name="year" 
                value={educationData.year} 
                onChange={handleChange} 
                className="education-input" 
                required 
              />
            </div>

            <button type="submit" className="education-button">Next ➜</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EducationDetails;
