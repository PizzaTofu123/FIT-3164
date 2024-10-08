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

      // Format the date string for display only
      const displayOpeningDate = new Intl.DateTimeFormat('en-GB').format(new Date(openingDate));

    return (
    <div className="election-item">
        <img src={clubLogo} alt={`${clubName} logo`} className="club-logo" />
        <div className="election-text">
        <h3>{clubName}</h3>
        <div className="election-info-index">
        <p>Polling opens: {displayOpeningDate}</p>
        <button className="index-button grey" onClick={handleEditDetailsClick}>Edit Details</button>
        <button className="index-button grey" onClick={handleEditCandidatesClick}>Edit Candidates</button>
        <button className="index-button disabled">View Results</button>
    </div>
    </div>
    </div>
  );
};

export default UpcomingElectionItemCR;
