import React from 'react';

const UpcomingElectionItem = ({ clubLogo, clubName, openingDate, onAlert }) => {
  return (
    <div className="upcoming-election-item">
      <img src={clubLogo} alt={`${clubName} logo`} className="club-logo" />
      <div className="election-text">
      <h3>{clubName}</h3>
      <p>Polling opens: {openingDate}</p>
      <button className="alert-button" onClick={onAlert}>Alert me</button>
    </div>
    </div>
  );
};

export default UpcomingElectionItem;
