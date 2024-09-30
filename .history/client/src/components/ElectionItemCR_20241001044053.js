import React from 'react';
import { useNavigate } from 'react-router-dom';

const ElectionItemCR = ({ clubId, clubLogo, clubName, closingDate }) => {
  const navigate = useNavigate();

  const isClosingSoon = () => {
    const closingDateObj = new Date(closingDate); // Use the Date constructor to parse ISO date
    const today = new Date();
  
    // Strip the time part from both dates
    today.setHours(0, 0, 0, 0);
    closingDateObj.setHours(0, 0, 0, 0);
  
    // Calculate the difference in days
    const timeDifference = closingDateObj - today;
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  
    return daysDifference <= 3; // Consider "soon" if closing in 3 days or less
  };
  
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
        <p className={isClosingSoon() ? 'closing-soon' : ''}>
            {isClosingSoon() ? `Closing soon: ${closingDate}` : `Polling closes: ${closingDate}`}
          </p>
          <button className="index-button grey" onClick={handleEditDetailsClick}>Edit Details</button>
          <button className="index-button grey" onClick={handleEditCandidatesClick}>Edit Candidates</button>
          <button className="index-button yellow" onClick={handleViewResultsClick}>View Results</button>
        </div>
      </div>
    </div>
  );
};

export default ElectionItemCR;
