import React, { useState, useEffect } from "react";
import ElectionList from '../components/ElectionList';
import UpcomingElectionList from "../components/UpcomingElectionList";
import './index.css';
 
const Home = () => {
    // const [elections] = useState([
    //     { id: 1, clubLogo: 'https://cdn-icons-png.flaticon.com/128/6062/6062646.png', clubName: 'Monash Association of Coding (MAC)', closingDate: '28/08/2024' },
    //     { id: 2, clubLogo: 'https://cdn-icons-png.flaticon.com/128/9305/9305711.png', clubName: 'Monash Cyber Security Club (MONSEC)', closingDate: '15/09/2024' },
    //   ]);
    
      const [upcomingElections] = useState([
        { id: 3, clubLogo: 'https://cdn-icons-png.flaticon.com/128/3171/3171927.png', clubName: 'Monash Film Society', openingDate: '25/10/2024' },
    ]);

    const [elections, setElections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchElections = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:5000/api/clubs');
                const data = await response.json();

                // Filter only ongoing elections based on the `electionOngoingFlag`
                const ongoingElections = data.filter(election => election.electionOngoingFlag);

                const formattedElections = ongoingElections.map(election => ({
                    id: election._id,
                    clubName: election.clubName,
                    closingDate: new Date(election.electionEndDate).toLocaleDateString(),
                    clubLogo: 'https://cdn-icons-png.flaticon.com/128/6062/6062646.png' // modify after logo added in database
                }));

                setElections(formattedElections);
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