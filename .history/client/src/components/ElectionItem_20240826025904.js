import React from 'react';
import { useNavigate } from 'react-router-dom';

const ElectionItem = ({ clubName, closingDate }) => {
  const navigate = useNavigate();

  const handleVoteClick = () => {
    // Navigate to the vote page when the button is clicked
    navigate(`/vote/${clubName}`);
  };

  return (
    <div className="election-item">
      <h3>{clubName}</h3>
      <div className="election-info"></div>
      <p>Polling closes: {closingDate}</p>
      <button className="index-button" onClick={handleVoteClick}>Vote</button>
      </div>
    </div>
  );
};

export default ElectionItem;