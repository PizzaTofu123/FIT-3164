import React from 'react';
import PastElectionItem from './PastElectionItem';

const PastElectionList = ({ pastElections }) => {
  return (
    <div className="election-list">
        <h2 className="index">Past Elections</h2>
      {pastElections.map((election) => (
        <PastElectionItem
          key={election.id}
          clubLogo={election.clubLogo}
          clubName={election.clubName}
          closingDate={election.closingDate}
        />
      ))}
    </div>
  );
};

export default UpcomingElectionListCR;
