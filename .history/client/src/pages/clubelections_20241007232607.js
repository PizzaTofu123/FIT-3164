import React, { useState, useEffect } from 'react';
import ElectionDetail from '../components/ElectionDetail';

const ClubElections = ({ user }) => {
  const [elections, setElections] = useState([]);
  const [upcomingElections, setUpcomingElections] = useState([]);
  const [pastElections, setPastElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to format dates in dd/mm/yyyy format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB').format(date);
  };

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

        // Process and sort the club elections by start date
        const sortedClubData = clubData.sort((a, b) => new Date(a.electionStartDate) - new Date(b.electionStartDate));

        // Process election data for the clubs
        const ongoingElectionsData = [];
        const upcomingElectionsData = [];
        const pastElectionsData = [];

        for (const club of sortedClubData) {
          const endDate = new Date(club.electionEndDate);
          const startDate = new Date(club.electionStartDate);
          const now = new Date();

        // Check if the club has any elections
        let hasVoted = false;  // Default to false if no elections

        if (club.elections && club.elections.length > 0) {
          const firstElectionId = club.elections[0]._id;
          console.log(`Fetching flag for user ${user._id} and election ${firstElectionId}`);

          // Fetch the flag to check if the user has voted
          const flagResponse = await fetch(
            `http://localhost:5000/api/flags/${firstElectionId}/${user._id}`, 
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              }
            }
          );

          hasVoted = await flagResponse.json();
          console.log(`Vote status for user ${user._id} in election ${firstElectionId}:`, hasVoted);
        } else {
          console.log(`No elections found for club ${club.clubName}, setting hasVoted to false`);
        }

          // Ongoing elections (currently active)
          if (club.electionOngoingFlag && club.electionStartDate && club.electionEndDate) {
            ongoingElectionsData.push({
              id: club._id,
              clubName: club.clubName,
              pollingStatus: 'open',
              closingDate: formatDate(endDate),
              voteStatus: hasVoted,  // Update voteStatus based on flag
            });
          }

          // Upcoming elections (future start date)
          if (startDate > now && club.electionStartDate && club.electionEndDate) {
            upcomingElectionsData.push({
              id: club._id,
              clubName: club.clubName,
              pollingStatus: 'not_started',
              pollingOpenDate: formatDate(startDate),
              closingDate: formatDate(endDate),
              voteStatus: false, // Election hasn't started, so no vote status
            });
          }

          // Past elections (already closed)
          if (endDate < now ) {
            pastElectionsData.push({
              id: club._id,
              clubName: club.clubName,
              pollingStatus: 'closed',
              closingDate: formatDate(endDate),
              voteStatus: hasVoted,  // Update voteStatus based on flag
            });
          }
        }

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
        />
      ))}
    </div>
  );
};

export default ClubElections;
