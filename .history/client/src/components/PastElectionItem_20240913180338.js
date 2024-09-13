import React from 'react';
import { useNavigate } from 'react-router-dom';

const PastElectionItem = ({ clubLogo, clubName, closingDate }) => {
    const navigate = useNavigate();
    
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
        <p>Polling closed: {closingDate}</p>
        <button className="index-button disabled" onClick={handleEditDetailsClick}>Edit Details</button>
        <button className="index-button disabled" onClick={handleEditCandidatesClick}>Edit Candidates</button>
        <button className="index-button yellow" onClick={handleViewResultsClick}>View Results</button>
    </div>
    </div>
    </div>
  );
};

export default PastElectionItem;
