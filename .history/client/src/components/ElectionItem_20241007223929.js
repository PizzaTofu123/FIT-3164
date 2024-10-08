import React from 'react';
import { useNavigate } from 'react-router-dom';

const ElectionItem = ({ clubLogo, clubName, closingDate, voteStatus }) => {
  const navigate = useNavigate();

  const isPollingClosed = () => {
    const today = new Date();
    const closingDateObj = new Date(closingDate);
    return today > closingDateObj; // Polling is closed if the current date is past the closing date
  };

  const isClosingSoon = () => {
    const closingDateObj = new Date(closingDate); // Use the Date constructor to parse ISO date
    const today = new Date();
  
    // Strip the time part from both dates
    today.setHours(0, 0, 0, 0);
    closingDateObj.setHours(0, 0, 0, 0);
  
    // Calculate the difference in days
    const timeDifference = closingDateObj - today;
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  
    return daysDifference <= 3 && !isPollingClosed(); // Consider "soon" if closing in 3 days or less
  };

  const handleVoteClick = () => {
    // Navigate to the vote page when the button is clicked
    navigate(`/vote/${clubName}`);
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
      {!voteStatus && (
        <button className="index-button" onClick={handleVoteClick}>
          Vote
        </button>
      )}
      </div>
    </div>
    </div>
  );
};

export default ElectionItem;