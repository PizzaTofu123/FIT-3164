import React, { useState, useEffect } from "react";
import ElectionListCR from '../components/ElectionListCR';
import UpcomingElectionList from "../components/UpcomingElectionList";
import './index.css';
import { Link } from "react-router-dom";

const ClubRepresentative = () => {
    const [elections] = useState([
        { id: 1, clubLogo: 'https://cdn-icons-png.flaticon.com/128/6062/6062646.png', clubName: 'Monash Association of Coding (MAC)', closingDate: '28/08/2024' },
        { id: 2, clubLogo: 'https://cdn-icons-png.flaticon.com/128/9305/9305711.png', clubName: 'Monash Cyber Security Club (MONSEC)', closingDate: '15/09/2024' },
      ]);
    
      const [upcomingElections] = useState([
        { id: 3, clubLogo: 'https://cdn-icons-png.flaticon.com/128/3171/3171927.png', clubName: 'Monash Film Society', openingDate: '25/10/2024' },
    ]);
      
      const handleVote = (electionId) => {
        console.log('Vote button clicked for election:', electionId); 
      };

      const handleAlert = (electionId) => {
        console.log('Alert me button clicked for upcoming election:', electionId);
    };

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
          <UpcomingElectionList upcomingElections={upcomingElections} handleAlert={handleAlert} />
      </div>
      {/* <div className="election-container">
        <PastElectionList/>
      </div> */}
    </div>
        </div>
    );
};
 
export default ClubRepresentative;