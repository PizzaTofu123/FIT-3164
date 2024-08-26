import React from 'react';

const UpcomingElectionItem = ({ clubName, openingDate, onAlert }) => {
  return (
    <div className="upcoming-election-item">
      <h3>{clubName}</h3>
      <p>Polling opens: {openingDate}</p>
      <button className="alert-button" onClick={onAlert}>Alert me</button>
    </div>
  );
};

export default UpcomingElectionItem;
