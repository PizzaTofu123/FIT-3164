import React, { useState, useEffect } from 'react';
import ElectionDetail from '../components/ElectionDetail';

const ClubElections = ({ user }) => {
  const [elections, setElections] = useState([]);
  const [upcomingElections, setUpcomingElections] = useState([]);
  const [pastElections, setPastElections] = useState([]);
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

        // Processing ongoing, upcoming, and past elections
        const ongoingElectionsData = [];
        const upcomingElectionsData = [];
        const pastElectionsData = [];

        clubData.forEach(club => {
          const endDate = new Date(club.electionEndDate);
          const startDate = new Date(club.electionStartDate);
          const now = new Date();

          // Ongoing elections (currently active)
          if (club.electionOngoingFlag && startDate <= now && endDate >= now) {
            ongoingElectionsData.push({
              id: club._id,
              clubName: club.clubName,
              pollingStatus: 'open',
              closingDate: endDate.toLocaleDateString(),
              voteStatus: true // Set to true for now
            });
          }

          // Upcoming elections (future start date)
          if (club.electionStartDatestartDate > now) {
            upcomingElectionsData.push({
              id: club._id,
              clubName: club.clubName,
              pollingStatus: 'not_started',
              pollingOpenDate: startDate.toLocaleDateString(),
              closingDate: endDate.toLocaleDateString(),
              voteStatus: false // Set to false since the election hasn't started
            });
          }

          // Past elections (already closed)
          if (endDate < now) {
            pastElectionsData.push({
              id: club._id,
              clubName: club.clubName,
              pollingStatus: 'closed',
              closingDate: endDate.toLocaleDateString(),
              voteStatus: true // For closed elections, assume the user has voted
            });
          }
        });

        setElections(ongoingElectionsData);
        setUpcomingElections(upcomingElectionsData);
        setPastElections(pastElectionsData);
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
      {/* Ongoing Elections */}
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
      {/* Upcoming Elections */}
      {upcomingElections.map((election) => (
        <ElectionDetail
          key={election.id}
          clubName={election.clubName}
          pollingStatus={election.pollingStatus}
          pollingOpenDate={election.pollingOpenDate}
          closingDate={election.closingDate}
          voteStatus={election.voteStatus}
        />
      ))}
      {/* Past Elections */}
      {pastElections.map((election) => (
        <ElectionDetail
          key={election.id}
          clubName={election.clubName}
          pollingStatus={election.pollingStatus}
          closingDate={election.closingDate}
          voteStatus={election.voteStatus}
          onViewResults={() => handleViewResults(election.id)}
        />
      ))}
    </div>
  );
};

export default ClubElections;
