import React from 'react';
import ElectionItem from './ElectionItem';

const ElectionList = ({ elections, handleVote }) => {
  return (
    <div className="election-list">
      <h2>Ongoing and Upcoming Elections</h2>
      {elections.map((election) => (
        <ElectionItem
          key={election.id}
          clubName={election.clubName}
          closingDate={election.closingDate}
          onVote={() => handleVote(election.id)}
        />
      ))}
    </div>
  );
};

export default ElectionList;