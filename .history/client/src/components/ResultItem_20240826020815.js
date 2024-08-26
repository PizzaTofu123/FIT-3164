import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PreferenceItem.css';

const PreferencesItem = ({ candidates }) => {
  const { clubName } = useParams();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="preferences-page">
    <div className="page-header">
      <button className="back-button" onClick={handleBackClick}>
      <i class="fa-solid fa-circle-arrow-left"></i>
        </button>
      <h2>{clubName}</h2>
      </div>
      <div className="preferences-container">
        {candidates.map((candidate, index) => (
          <div key={index} className="candidate-container">
            <div className="candidate-info">
              <img src={candidate.image} alt={candidate.name} className="candidate-image" />
              <div className="candidate-details">
                <p className="candidate-name">{candidate.name}</p>
                <p className="candidate-position">{candidate.position}</p>
              </div>
            </div>
            <div className="voted-status">{candidate.votes} Votes</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreferencesItem;
