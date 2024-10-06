import React from 'react';
import UpcomingElectionItem from './UpcomingElectionItem';

const UpcomingElectionList = ({ upcomingElections }) => {
  return (
    <div className="election-list">
        <h2 className="index">Upcoming Elections</h2>
      {upcomingElections.map((election) => (
        <UpcomingElectionItem
          key={election.id}
          clubLogo={election.clubLogo}
          clubName={election.clubName}
          openingDate={election.openingDate}
        />
      ))}
    </div>
  );
};

export default UpcomingElectionList;
