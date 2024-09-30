import React, { useState, useEffect } from "react";
import ElectionListCR from '../components/ElectionListCR';
import UpcomingElectionListCR from "../components/UpcomingElectionListCR';
import PastElectionList from "../components/PastElectionList';
import './clubrepresentative.css';
import { Link } from "react-router-dom";

const ClubRepresentative = ({ user }) => {
    const [clubs, setClubs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClubElections = async () => {
            if (!user || !user.representingClubs || user.representingClubs.length === 0) {
                console.log("No representing clubs found for user:", user);
                setLoading(false);
                return;
            }

            try {
                console.log("Calling checkElection route to update flags...");
                await fetch('http://localhost:5000/api/clubs/checkElection'); // Call to checkElection route
                
                console.log("Fetching clubs for representing clubs:", user.representingClubs);
                setLoading(true);

                const clubResponses = await Promise.all(
                    user.representingClubs.map(clubId => {
                        console.log(`Fetching data for representing club ID: ${clubId}`);
                        return fetch(`http://localhost:5000/api/clubs/${clubId}`);
                    })
                );

                const clubData = await Promise.all(clubResponses.map(res => res.json()));
                console.log("Fetched representing club data:", clubData);

                setClubs(clubData); // Store the club data directly
            } catch (err) {
                console.error("Error fetching representing club election data:", err);
                setError("Error fetching representing club election data");
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
            <h1 className='main-heading'>CLUB REPRESENTATIVE DASHBOARD</h1>
            <div className="add-button-container">
                <Link to="/add-election">
                    <button className="add-button"><i className="fa-solid fa-plus"></i></button>
                </Link>
            </div>

            <div className="app-container">
                {clubs.map(club => (
                    <div key={club._id} className="club-section">
                        <h2>{club.clubName}</h2>

                        {/* Ongoing Elections */}
                        {club.electionOngoingFlag && club.elections.length > 0 && (
                            <div className="election-container">
                                <h3>Ongoing Elections</h3>
                                <ElectionListCR elections={club.elections.filter(election => {
                                    const now = new Date();
                                    return election.electionStartDate &&
                                    election.electionEndDate && election.electionOngoingFlag;
                                })} />
                            </div>
                        )}

                        {/* Upcoming Elections */}
                        {club.elections.length > 0 && (
                            <div className="election-container">
                                <h3>Upcoming Elections</h3>
                                <UpcomingElectionListCR upcomingElections={club.elections.filter(election => {
                                    const now = new Date();
                                    return election.electionStartDate &&
                                    election.electionEndDate && new Date(club.electionStartDate) > now;
                                })} />
                            </div>
                        )}

                        {/* Past Elections */}
                        {club.elections.length > 0 && (
                            <div className="election-container">
                                <h3>Past Elections</h3>
                                <PastElectionList pastElections={club.elections.filter(election => {
                                    return election.electionStartDate &&
                                    election.electionEndDate && new Date(club.electionEndDate) < new Date();
                                })} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClubRepresentative;
