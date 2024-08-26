import React from 'react';
import UpcomingElectionItem from './UpcomingElectionItem';

const UpcomingElectionList = ({ upcomingElections, handleAlert }) => {
  return (
    <div className="election-list">
        <h2>Upcoming Elections</h2>
      {upcomingElections.map((election) => (
        <UpcomingElectionItem
          key={election.id}
          clubLogo={election.clubLogo}
          clubName={election.clubName}
          openingDate={election.openingDate}
          onAlert={() => handleAlert(election.id)}
        />
      ))}
    </div>
  );
};

export default UpcomingElectionList;
