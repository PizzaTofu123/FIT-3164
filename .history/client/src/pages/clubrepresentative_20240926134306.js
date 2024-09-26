import React, { useState, useEffect } from "react";
import ElectionListCR from '../components/ElectionListCR';
import UpcomingElectionListCR from "../components/UpcomingElectionListCR";
import PastElectionList from "../components/PastElectionList";
import './clubrepresentative.css';
import { Link } from "react-router-dom";

const ClubRepresentative = () => {
    // const [elections] = useState([
    //     { id: 1, clubLogo: 'https://cdn-icons-png.flaticon.com/128/6062/6062646.png', clubName: 'Monash Association of Coding (MAC)', closingDate: '28/08/2024' },
    //     { id: 2, clubLogo: 'https://cdn-icons-png.flaticon.com/128/9305/9305711.png', clubName: 'Monash Cyber Security Club (MONSEC)', closingDate: '15/09/2024' },
    //   ]);
    
    //   const [upcomingElections] = useState([
    //     { id: 3, clubLogo: 'https://cdn-icons-png.flaticon.com/128/3171/3171927.png', clubName: 'Monash Film Society', openingDate: '25/10/2024' },
    // ]);

    const [elections, setElections] = useState([]);
    const [upcomingElections, setUpcomingElections] = useState([]);
    const [pastElections, setPastElections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchElections = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:5000/api/clubs');
                const data = await response.json();

                // Filter only ongoing elections based on the `electionOngoingFlag`
                const ongoingElections = data.filter(election => election.electionStartDate &&
                  election.electionEndDate && election.electionOngoingFlag);

                // Filter upcoming elections based on start date
                const upcomingElections = data.filter(election => election.electionStartDate &&
                  election.electionEndDate && new Date(election.electionStartDate) > new Date());

                // Filter for past elections based on end date
                const pastElections = data.filter(election => election.electionStartDate &&
                  election.electionEndDate && new Date(election.electionEndDate) < new Date());

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

                const formattedPastElections = pastElections.map(election => ({
                  id: election._id,
                  clubName: election.clubName,
                  closingDate: new Date(election.electionEndDate).toLocaleDateString(),
                  clubLogo: 'https://cdn-icons-png.flaticon.com/128/6062/6062646.png' // Modify after logo is added in the database
              }));

                setElections(formattedElections);
                setUpcomingElections(formattedUpcomingElections);
                setPastElections(formattedPastElections);
            } catch (err) {
                setError("Error fetching election data");
            } finally {
                setLoading(false);
            }
        };

        fetchElections();
    }, []);

    if (loading) {
      return <div>Loading elections...</div>;
  }

  if (error) {
      return <div>{error}</div>;
  }

    return (
        <div>
          <h1 className='main-heading'>CLUB REPRESENTATIVE DASHBOARD</h1>
          <div className="add-button-container">
            <Link to="/add-election">
              <button className="add-button"><i className="fa-solid fa-plus"></i></button>
            </Link>
          </div>
          <div className="app-container">
            <div className="election-container">
              <ElectionListCR elections={elections} />
            </div>
            <div className="election-container">
              <UpcomingElectionListCR upcomingElections={upcomingElections} />
            </div>
            <div className="election-container">
              <PastElectionList pastElections={pastElections} />
            </div>
          </div>
        </div>
    );
};
 
export default ClubRepresentative;