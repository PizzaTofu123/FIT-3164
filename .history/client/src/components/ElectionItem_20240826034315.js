import React from 'react';
import { useNavigate } from 'react-router-dom';

const ElectionItem = ({ clubLogo, clubName, closingDate }) => {
  const navigate = useNavigate();

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
      <p>Polling closes: {closingDate}</p>
      <button className="index-button" onClick={handleVoteClick}>Vote</button>
      </div>
    </div>
  );
};

export default ElectionItem;