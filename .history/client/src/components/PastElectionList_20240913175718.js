import React from 'react';
import PastElectionItem from './PastElectionItem';

const UpcomingElectionList = ({ upcomingElections }) => {
  return (
    <div className="election-list">
        <h2 className="index">Upcoming Elections</h2>
      {upcomingElections.map((election) => (
        <UpcomingElectionItemCR
          key={election.id}
          clubLogo={election.clubLogo}
          clubName={election.clubName}
          openingDate={election.openingDate}
        />
      ))}
    </div>
  );
};

export default UpcomingElectionListCR;
