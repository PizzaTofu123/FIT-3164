import React, { useState, useEffect } from "react";
import ElectionList from '../components/ElectionList';
import UpcomingElectionList from "../components/UpcomingElectionList";
import './index.css';
 
const Home = ({ user }) => {
    const [elections, setElections] = useState([]);
    const [upcomingElections, setUpcomingElections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user || !user.clubs || user.clubs.length === 0) {
            setLoading(false);
            return;
          }
    
          try {
            setLoading(true);
            const clubResponses = await Promise.all(
              user.clubs.map(clubId => fetch(`http://localhost:5000/api/clubs/${clubId}`))
            );
            const clubData = await Promise.all(clubResponses.map(res => res.json()));
    
            // Extract elections from each club
            const allOngoingElections = [];
            const allUpcomingElections = [];

            clubData.forEach(club => {
                const ongoingElections = club.elections.filter(election => 
                  election.electionOngoingFlag && 
                  election.electionStartDate && 
                  election.electionEndDate
                );
                
                const upcomingElections = club.elections.filter(election => 
                    election.electionStartDate && 
                    election.electionEndDate && 
                    new Date(election.electionStartDate) > new Date()
                );

                // Format ongoing elections
          ongoingElections.forEach(election => {
            allOngoingElections.push({
              id: election._id,
              clubName: club.clubName,
              closingDate: new Date(election.electionEndDate).toLocaleDateString(),
              clubLogo: 'https://cdn-icons-png.flaticon.com/128/6062/6062646.png'
            });
          });

                const formattedElections = ongoingElections.map(election => ({
                    id: election._id,
                    clubName: election.clubName,
                    closingDate: new Date(election.electionEndDate).toLocaleDateString(),
                    clubLogo: 'https://cdn-icons-png.flaticon.com/128/6062/6062646.png' // modify after logo added in database
                }));

                const formattedUpcomingElections = upcomingElections.map(election => ({
                    id: election._id,
                    clubName: election.clubName,
                    openingDate: new Date(election.electionStartDate).toLocaleDateString(),
                    clubLogo: 'https://cdn-icons-png.flaticon.com/128/3171/3171927.png' // Modify after logo is added in the database
                }));

                setElections(formattedElections);
                setUpcomingElections(formattedUpcomingElections);
            } catch (err) {
                setError("Error fetching election data");
            } finally {
                setLoading(false);
            }
        };

        fetchElections();
    }, []);
      
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