import React from 'react';

const UpcomingElectionItem = ({ clubLogo, clubName, openingDate }) => {
  return (
    <div className="election-item">
      <img src={clubLogo} alt={`${clubName} logo`} className="club-logo" />
      <div className="election-text">
      <h3>{clubName}</h3>
      <div className="election-info-index">
      <p>Polling opens: {openingDate}</p>
      <button className="alert-button" >Alert me</button>
    </div>
    </div>
    </div>
  );
};

export default UpcomingElectionItem;
