import React, { useState, useEffect } from "react";
import ElectionListCR from '../components/ElectionListCR';
import UpcomingElectionListCR from "../components/UpcomingElectionListCR";
import PastElectionList from "../components/PastElectionList";
import './clubrepresentative.css';
import { Link } from "react-router-dom";

const ClubRepresentative = ({ user }) => {
    const [elections, setElections] = useState([]);
    const [upcomingElections, setUpcomingElections] = useState([]);
    const [pastElections, setPastElections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClubRepresentingElections = async () => {
            if (!user || !user.representingClubs || user.representingClubs.length === 0) {
                console.log("No representing clubs found for user:", user);
                setLoading(false);
                return;
            }

            try {
                console.log("Calling checkElection route to update flags...");
                await fetch('http://localhost:5000/api/clubs/checkElection'); // Call to checkElection route
                
                console.log("Fetching elections for representing clubs:", user.representingClubs);
                setLoading(true);

                const clubResponses = await Promise.all(
                    user.representingClubs.map(clubId => {
                        console.log(`Fetching data for representing club ID: ${clubId}`);
                        return fetch(`http://localhost:5000/api/clubs/${clubId}`);
                    })
                );

                const clubData = await Promise.all(clubResponses.map(res => res.json()));
                console.log("Fetched club data:", clubData);

                // Filter and process the elections for ongoing, upcoming, and past
                const allOngoingElections = [];
                const allUpcomingElections = [];
                const allPastElections = [];

                clubData.forEach(club => {
                    console.log(`Processing club: ${club.clubName}`);

                    // Ongoing elections
                    if (club.electionOngoingFlag && club.electionStartDate && club.electionEndDate) {
                        allOngoingElections.push({
                            id: club._id,
                            clubName: club.clubName,
                            closingDate: new Date(club.electionEndDate).toLocaleDateString(),
                            clubLogo: 'https://cdn-icons-png.flaticon.com/128/6062/6062646.png'
                        });
                    }

                    // Upcoming elections
                    if (new Date(club.electionStartDate && club.electionStartDate && club.electionEndDate) > new Date()) {
                        allUpcomingElections.push({
                            id: club._id,
                            clubName: club.clubName,
                            openingDate: new Date(club.electionStartDate).toLocaleDateString(),
                            clubLogo: 'https://cdn-icons-png.flaticon.com/128/3171/3171927.png'
                        });
                    }

                    // Past elections
                    if (new Date(club.electionEndDate) < new Date()) {
                        allPastElections.push({
                            id: club._id,
                            clubName: club.clubName,
                            closingDate: new Date(club.electionEndDate).toLocaleDateString(),
                            clubLogo: 'https://cdn-icons-png.flaticon.com/128/6062/6062646.png'
                        });
                    }
                });

                console.log("All ongoing elections:", allOngoingElections);
                console.log("All upcoming elections:", allUpcomingElections);
                console.log("All past elections:", allPastElections);

                setElections(allOngoingElections);
                setUpcomingElections(allUpcomingElections);
                setPastElections(allPastElections);
            } catch (err) {
                console.error("Error fetching election data:", err);
                setError("Error fetching election data");
            } finally {
                setLoading(false);
            }
        };

        fetchClubRepresentingElections();
    }, [user]);

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
