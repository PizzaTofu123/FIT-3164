import React, { useState, useEffect } from "react";
import ElectionList from '../components/ElectionList';
import UpcomingElectionList from "../components/UpcomingElectionList";
import './index.css';

const Home = ({ user }) => {
  const [elections, setElections] = useState([]);
  const [upcomingElections, setUpcomingElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the election data for clubs the user is a member of
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
          user.clubs.map(clubId => {
            console.log(`Fetching data for club ID: ${clubId}`);
            return fetch(`http://localhost:5000/api/clubs/${clubId}`);
          })
        );

        const clubData = await Promise.all(clubResponses.map(res => res.json()));
        console.log("Fetched club data:", clubData);

        // Process and sort the club elections by start date
        const sortedClubData = clubData.sort((a, b) => new Date(a.electionStartDate) - new Date(b.electionStartDate));

        // Loop through each club and handle its elections
        const allOngoingElections = [];
        const allUpcomingElections = [];

        for (const club of sortedClubData) {
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
            allOngoingElections.push({
              id: club._id,
              clubName: club.clubName,
              closingDate: club.electionEndDate,
              clubLogo: 'https://cdn-icons-png.flaticon.com/128/6062/6062646.png',
              voteStatus: hasVoted,  // Update vote status based on flag
            });
          }

          // Upcoming elections (future start date)
          if (new Date(club.electionStartDate) > new Date() && club.electionStartDate && club.electionEndDate) {
            allUpcomingElections.push({
              id: club._id,
              clubName: club.clubName,
              openingDate: club.electionStartDate,
              clubLogo: 'https://cdn-icons-png.flaticon.com/128/3171/3171927.png',
              voteStatus: false, // Election hasn't started, so no vote status
            });
          }
        }

        console.log("All ongoing elections:", allOngoingElections);
        console.log("All upcoming elections:", allUpcomingElections);

        setElections(allOngoingElections);
        setUpcomingElections(allUpcomingElections);
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
    <div>
      <h1 className='main-heading'>DASHBOARD</h1>
      <div className="app-container">
        <div className="election-container">
          <ElectionList elections={elections} />
        </div>
        <div className="election-container">
          <UpcomingElectionList upcomingElections={upcomingElections} />
        </div>
      </div>
    </div>
  );
};

export default Home;
