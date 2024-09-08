import React, { useState, useEffect } from "react";
import ElectionList from '../components/ElectionList';
import UpcomingElectionList from "../components/UpcomingElectionList";
import './index.css';
 
const Home = () => {
    const [elections] = useState([
        { id: 1, clubLogo: 'https://cdn-icons-png.flaticon.com/128/6062/6062646.png', clubName: 'Monash Association of Coding (MAC)', closingDate: '28/08/2024' },
        { id: 2, clubLogo: 'https://cdn-icons-png.flaticon.com/128/9305/9305711.png', clubName: 'Monash Cyber Security Club (MONSEC)', closingDate: '15/09/2024' },
      ]);
    
      const [upcomingElections] = useState([
        { id: 3, clubLogo: 'https://cdn-icons-png.flaticon.com/128/3171/3171927.png', clubName: 'Monash Film Society', openingDate: '25/10/2024' },
    ]);

    // const [elections, setElections] = useState([]);
    // // const [upcomingElections, setUpcomingElections] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    // // Fetch elections and upcoming elections from the backend API
    // useEffect(() => {
    //     const fetchElections = async () => {
    //         try {
    //             setLoading(true); // Set loading to true while data is being fetched

    //             // Fetch ongoing elections
    //             const responseElections = await fetch('http://localhost:5000/api/clubs');
    //             const dataElections = await responseElections.json();
    //             setElections(dataElections); // Update the state with the fetched elections data

    //             // Fetch upcoming elections
    //             // const responseUpcomingElections = await fetch('https://your-backend-api.com/upcoming-elections');
    //             // const dataUpcomingElections = await responseUpcomingElections.json();
    //             // setUpcomingElections(dataUpcomingElections); // Update the state with the fetched upcoming elections data

    //         } catch (err) {
    //             setError("Error fetching election data");
    //         } finally {
    //             setLoading(false); // Set loading to false once the data is fetched
    //         }
    //     };

    //     fetchElections(); // Call the function to fetch data
    // }, []); // Empty dependency array means this will run once when the component mounts
      
      const handleVote = (electionId) => {
        console.log('Vote button clicked for election:', electionId); 
      };

      const handleAlert = (electionId) => {
        console.log('Alert me button clicked for upcoming election:', electionId);
    };

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