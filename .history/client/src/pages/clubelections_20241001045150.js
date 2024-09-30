import React, { useState, useEffect } from 'react';
import ElectionDetail from '../components/ElectionDetail';

const ClubElections = ({ user }) => {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClubElections = async () => {
      if (!user || !user.clubs || user.clubs.length === 0) {
        console.log("No clubs found for user:", user);
        setLoading(false);
        return;
      }

      try {
        console.log("Calling checkElection route to update flags...");
        await fetch('http://localhost:5000/api/clubs/checkElection'); // Call to checkElection route
        
        console.log("Fetching elections for user clubs:", user.clubs);
        setLoading(true);

        const clubResponses = await Promise.all(
          user.clubs.map(clubId => fetch(`http://localhost:5000/api/clubs/${clubId}`))
        );

        const clubData = await Promise.all(clubResponses.map(res => res.json()));
        console.log("Fetched club data:", clubData);

        const electionsData = clubData.map(club => ({
          id: club._id,
          clubName: club.clubName,
          pollingStatus: club.electionOngoingFlag ? 'open' : 'closed',
          closingDate: new Date(club.electionEndDate).toLocaleDateString(),
          voteStatus: true // Set to true for now
        }));

        setElections(electionsData);
      } catch (err) {
        console.error("Error fetching election data:", err);
        setError("Error fetching election data");
      } finally {
        setLoading(false);
      }
    };

    fetchClubElections();
  }, [user]);

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

  if (loading) {
    return <div>Loading elections...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="club-elections">
      <h1 className='main-heading'>Club Elections</h1>
      {elections.map((election) => (
        <ElectionDetail
          key={election.id}
          clubName={election.clubName}
          pollingStatus={election.pollingStatus}
          closingDate={election.closingDate}
          voteStatus={election.voteStatus}
          onVote={() => handleVote(election.id)}
          onViewPreferences={() => handleViewPreferences(election.id)}
          onViewResults={() => handleViewResults(election.id)}
        />
      ))}
    </div>
  );
};

export default ClubElections;
