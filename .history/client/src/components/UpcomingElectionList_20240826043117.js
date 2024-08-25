import React from 'react';
import UpcomingElectionItem from './UpcomingElectionItem';

const UpcomingElectionList = ({ upcomingElections, handleAlert }) => {
  return (
    <div className="upcoming-election-list">
      {upcomingElections.map((election) => (
        <UpcomingElectionItem
          key={election.id}
          club
          clubName={election.clubName}
          openingDate={election.openingDate}
          onAlert={() => handleAlert(election.id)}
        />
      ))}
    </div>
  );
};

export default UpcomingElectionList;
