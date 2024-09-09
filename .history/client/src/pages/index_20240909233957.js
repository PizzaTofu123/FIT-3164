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

    // Fetch ongoing elections from the backend API
    useEffect(() => {
        const fetchElections = async () => {
            try {
                setLoading(true); // Set loading to true while data is being fetched
                const response = await fetch('http://localhost:5000/api/clubs'); // Fetching data from backend
                const data = await response.json();

                // Filter only ongoing elections based on the `electionOngoingFlag`
                const ongoingElections = data.filter(election => election.electionOngoingFlag);

                // Map the data into the format expected by ElectionList and set state
                const formattedElections = ongoingElections.map(election => ({
                    id: election._id,
                    clubName: election.clubName,
                    closingDate: new Date(election.electionEndDate).toLocaleDateString(),
                    clubLogo: 'https://cdn-icons-png.flaticon.com/128/6062/6062646.png' // Use a placeholder or dynamic image if available
                }));

                setElections(formattedElections); // Update the state with the formatted data
            } catch (err) {
                setError("Error fetching election data");
            } finally {
                setLoading(false); // Set loading to false once the data is fetched
            }
        };

        fetchElections(); // Call the function to fetch data when the component mounts
    }, []);

    // Fetch upcoming elections
    //             // const responseUpcomingElections = await fetch('https://your-backend-api.com/upcoming-elections');
    //             // const dataUpcomingElections = await responseUpcomingElections.json();
    //             // setUpcomingElections(dataUpcomingElections); // Update the state with the fetched upcoming elections data
      
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