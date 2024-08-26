import React, { useState } from 'react';
import ElectionDetail from '../components/ElectionDetail';

const ClubElections = () => {
  const [elections] = useState([
    // pollingStatus:'open', 'closed', or 'not_started'; pollingOpenDate: Only needed if pollingStatus is 'not_started'
    { id: 1, clubName: 'Monash Association of Coding (MAC)', pollingStatus: 'closed', closingDate: '28/08/2024', voteStatus: true },
    { id: 2, clubName: 'Monash Cyber Security Club (MONSEC)', pollingStatus: 'open', closingDate: '15/09/2024', voteStatus: false },
    { id: 2, clubName: 'Monash Film Society', pollingStatus: 'not_started', closingDate: '15/10/2024', voteStatus: false, pollingOpenDate: '25/10/2024' },
  ]);

  
  const handleVote = (electionId) => {
    console.log('Vote button clicked for election:', electionId);
    // Handle vote logic here
  };

  const handleViewPreferences = (electionId) => {
    console.log('View Preferences button clicked for election:', electionId);
    // Handle view preferences logic here
  };

  const handleViewResults = (electionId) => {
    console.log('View Results button clicked for election:', electionId);
    // Handle view results logic here
  };

  return (
    <div className="club-elections">
    <h1 className='main-heading'>Club Elections</h1>
      {elections.map((election) => (
        <ElectionDetail
          key={election.id}
          clubName={election.clubName}
          pollingStatus={election.pollingStatus}
          pollingOpenDate={election.pollingOpenDate}
          closingDate={election.closingDate}
          voteStatus={election.voteStatus}
          onVote={() => handleVote(election.id)}
          onViewPreferences= {() => handleViewPreferences(election.id)}
          onViewResults={() => handleViewResults(election.id)}
        />
      ))}
    </div>
  );
};

export default ClubElections;
