import React from 'react';
import { useNavigate } from 'react-router-dom';

const PastElectionItem = ({ clubLogo, clubName, closingDate }) => {
    const navigate = useNavigate();
    
      const handleViewResultsClick = () => {
        navigate(`/view-results/${clubName}`);
      };

      // Format the date string for display only
      const displayClosingDate = new Intl.DateTimeFormat('en-GB').format(new Date(closingDate));

    return (
    <div className="election-item">
        <img src={clubLogo} alt={`${clubName} logo`} className="club-logo" />
        <div className="election-text">
        <h3>{clubName}</h3>
        <div className="election-info-index">
        <p>Polling closed: {displayClosingDate}</p>
        <button className="index-button disabled">Edit Details</button>
        <button className="index-button disabled">Edit Candidates</button>
        <button className="index-button yellow" onClick={handleViewResultsClick}>View Results</button>
    </div>
    </div>
    </div>
  );
};

export default PastElectionItem;
