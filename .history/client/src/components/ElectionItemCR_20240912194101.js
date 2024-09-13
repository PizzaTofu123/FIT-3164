import React from 'react';
import { useNavigate } from 'react-router-dom';

const ElectionItemCR = ({ clubLogo, clubName, closingDate }) => {
  const navigate = useNavigate();

  // Handlers for different buttons
  const handleEditDetailsClick = () => {
    navigate(`/edit-details/${clubName}`);
  };

  const handleEditCandidatesClick = () => {
    navigate(`/edit-candidates/${clubName}`);
  };

  const handleViewResultsClick = () => {
    navigate(`/view-results/${clubName}`);
  };

  return (
    <div className="election-item">
      <img src={clubLogo} alt={`${clubName} logo`} className="club-logo" />
      <div className="election-text">
        <h3>{clubName}</h3>
        <div className="election-info-index">
        <p>Polling closes: {closingDate}</p>
        >/div></div>
        <div className="button-group">
          <button className="index-button" onClick={handleEditDetailsClick}>Edit Details</button>
          <button className="index-button" onClick={handleEditCandidatesClick}>Edit Candidates</button>
          <button className="index-button" onClick={handleViewResultsClick}>View Results</button>
        </div>
      </div>
    </div>
  );
};

export default ElectionItemCR;
