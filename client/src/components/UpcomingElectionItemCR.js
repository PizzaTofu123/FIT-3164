import React from 'react';
import { useNavigate } from 'react-router-dom';

const UpcomingElectionItemCR = ({ clubId, clubLogo, clubName, openingDate }) => {
    const navigate = useNavigate();
    
    const handleEditDetailsClick = () => {
        navigate(`/edit-election/${clubId}`);
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
        <p>Polling opens: {openingDate}</p>
        <button className="index-button grey" onClick={handleEditDetailsClick}>Edit Details</button>
        <button className="index-button grey" onClick={handleEditCandidatesClick}>Edit Candidates</button>
        <button className="index-button disabled" onClick={handleViewResultsClick}>View Results</button>
    </div>
    </div>
    </div>
  );
};

export default UpcomingElectionItemCR;
