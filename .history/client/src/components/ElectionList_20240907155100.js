import React from 'react';
import ElectionItem from './ElectionItem';

const ElectionList = ({ elections, handleVote }) => {
  return (
    <div className="election-list">
      <h2 className="index">Ongoing Elections</h2>
      {elections.map((election) => (
        <ElectionItem
          key={election.id}
          clubLogo={election.clubLogo}
          clubName={election.clubName}
          closingDate={election.closingDate}
          onVote={() => handleVote(election.id)}
        />
      ))}
    </div>
  );
};

export default ElectionList;