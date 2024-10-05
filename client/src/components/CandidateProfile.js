import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Add useNavigate and useParams to extract club name and handle navigation
import './CandidateProfile.css';

function CandidateProfile() {
  const { position, clubName } = useParams(); // Extract clubName and position from URL
  const navigate = useNavigate(); // Use navigate for back button functionality

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [yearLevel, setYearLevel] = useState('');
  const [course, setCourse] = useState('');
  const [campaignDetails, setCampaignDetails] = useState('');

  const handleSave = () => {
    // Handle save logic (e.g., API call to save candidate details)
    console.log({
      firstName,
      lastName,
      yearLevel,
      course,
      campaignDetails,
    });
  };

  // Handle back button click
  const handleBackClick = () => {
    navigate(`/edit-candidates/${clubName}`); // Navigate back to the specific club's EditCandidates page
  };

  return (
    <div className="candidate-profile-page">
      <div className="candidate-profile-header">
        <button className="candidate-profile-back-button" onClick={handleBackClick}>
          ← {/* Unicode left arrow */}
        </button>
        {position} Candidate
      </div>
      <div className="candidate-profile-container">
        <div className="candidate-profile-picture">
          <img src="/path/to/default_profile.png" alt="Candidate Profile" />
        </div>
        <div className="candidate-profile-details">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Year Level"
            value={yearLevel}
            onChange={(e) => setYearLevel(e.target.value)}
          />
          <input
            type="text"
            placeholder="Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
          <textarea
            placeholder="Add campaign details..."
            value={campaignDetails}
            onChange={(e) => setCampaignDetails(e.target.value)}
          />
        </div>
        <button className="candidate-profile-save-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}

export default CandidateProfile;
