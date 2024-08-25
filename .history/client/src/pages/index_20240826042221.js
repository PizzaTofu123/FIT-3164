import React, { useState } from "react";
// import DashboardCalendar from '../components/Calendar';
import ElectionList from '../components/ElectionList';
import Calendar from 'react-calendar';
import '../components/Calendar.css'
import 'react-calendar/dist/Calendar.css';
import './index.css';
 
const Home = () => {
    const [elections] = useState([
        { id: 1, clubLogo: 'https://cdn-icons-png.flaticon.com/128/6062/6062646.png', clubName: 'Monash Association of Coding (MAC)', closingDate: '30/08/2024' },
        { id: 2, clubLogo: 'https://cdn-icons-png.flaticon.com/128/9305/9305711.png', clubName: 'Monash Cyber Security Club (MONSEC)', closingDate: '15/09/2024' },
      ]);
    
      const handleVote = (electionId) => {
        console.log('Vote button clicked for election:', electionId); 
      };
    return (
        <div>
            <h1 className='main-heading'>DASHBOARD</h1>
      <div className="app-container">
      {/* <div className="left-column"> */}
      <div className="election-container">
        <ElectionList elections={elections} handleVote={handleVote} />
      </div>
      {/* <div className="right-column">
      </div> */}
    </div>
        </div>
    );
};
 
export default Home;