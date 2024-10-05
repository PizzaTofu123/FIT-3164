import React, { useState, useEffect } from "react";
import ElectionList from '../components/ElectionList';
import UpcomingElectionList from "../components/UpcomingElectionList";
import './index.css';

// Helper function to format dates in dd/mm/yyyy format
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB').format(date);
};

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

        // Loop through each club and handle its elections
        const allOngoingElections = [];
        const allUpcomingElections = [];

        clubData.forEach(club => {
          console.log(`Processing club: ${club.clubName}`);

          // Filter ongoing elections
          if (club.electionOngoingFlag && club.electionStartDate && club.electionEndDate) {
            allOngoingElections.push({
              id: club._id,
              clubName: club.clubName,
              closingDate: formatDate(club.electionEndDate),
              clubLogo: 'https://cdn-icons-png.flaticon.com/128/6062/6062646.png'
            });
          }

          // Filter upcoming elections (based on start date)
          if (new Date(club.electionStartDate) > new Date() && club.electionStartDate && club.electionEndDate) {
            allUpcomingElections.push({
              id: club._id,
              clubName: club.clubName,
              openingDate: formatDate(club.electionStartDate),
              clubLogo: 'https://cdn-icons-png.flaticon.com/128/3171/3171927.png'
            });
          }
        });

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

  const handleVote = (electionId) => {
    console.log('Vote button clicked for election:', electionId); 
  };

  const handleAlert = (electionId) => {
    console.log('Alert me button clicked for upcoming election:', electionId);
  };

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
          <ElectionList elections={elections} handleVote={handleVote} />
        </div>
        <div className="election-container">
          <UpcomingElectionList upcomingElections={upcomingElections} handleAlert={handleAlert} />
        </div>
      </div>
    </div>
  );
};

export default Home;
