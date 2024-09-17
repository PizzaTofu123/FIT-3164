import React from 'react';
import UpcomingElectionItemCR from './UpcomingElectionItemCR';

const UpcomingElectionListCR = ({ upcomingElections }) => {
  return (
    <div className="election-list">
        <h2 className="index">Upcoming Elections</h2>
      {upcomingElections.map((election) => (
        <UpcomingElectionItemCR
          key={election.id}
          clubId={election.id}
          clubLogo={election.clubLogo}
          clubName={election.clubName}
          openingDate={election.openingDate}
        />
      ))}
    </div>
  );
};

export default UpcomingElectionListCR;
