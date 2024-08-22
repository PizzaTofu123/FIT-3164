import React from 'react';

const ElectionItem = ({ clubName, closingDate, onVote }) => {
  return (
    <div className="election-item">
      <h3>{clubName}</h3>
      <p>Polling closes: {closingDate}</p>
      <button onClick={onVote}>Vote</button>
    </div>
  );
};

export default ElectionItem;