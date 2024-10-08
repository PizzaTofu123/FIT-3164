import React from 'react';

const UpcomingElectionItem = ({ clubLogo, clubName, openingDate }) => {
  // Format the date string for display only
  const displayOpeningDate = new Intl.DateTimeFormat('en-GB').format(new Date(openingDate));

  return (
    <div className="election-item">
      <img src={clubLogo} alt={`${clubName} logo`} className="club-logo" />
      <div className="election-text">
      <h3>{clubName}</h3>
      <div className="election-info-index">
      <p>Polling opens: {displayOpeningDate}</p>
      <button className="alert-button" >Alert me</button>
    </div>
    </div>
    </div>
  );
};

export default UpcomingElectionItem;
