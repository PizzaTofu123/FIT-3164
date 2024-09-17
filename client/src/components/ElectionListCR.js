import React from 'react';
import ElectionItemCR from './ElectionItemCR';

const ElectionListCR = ({ elections }) => {
  return (
    <div className="election-list">
      <h2 className="index">Ongoing Elections</h2>
      {elections.map((election) => (
        <ElectionItemCR
          key={election.id}
          clubId={election.id}
          clubLogo={election.clubLogo}
          clubName={election.clubName}
          closingDate={election.closingDate}
        />
      ))}
    </div>
  );
};

export default ElectionListCR;