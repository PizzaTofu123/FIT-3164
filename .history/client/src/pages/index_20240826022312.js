import React, { useState } from "react";
// import DashboardCalendar from '../components/Calendar';
import ElectionList from '../components/ElectionList';
import Calendar from 'react-calendar';
import '../components/Calendar.css'
import 'react-calendar/dist/Calendar.css';
import './index.css'
 
const Home = () => {
    const [elections] = useState([
        { id: 1, clubName: 'Monash Association of Coding (MAC)', closingDate: '2024-08-20' },
        { id: 2, clubName: 'Monash Cyber Security Club (MONSEC)', closingDate: '2024-09-15' },
      ]);
    
      const handleVote = (electionId) => {
        console.log('Vote button clicked for election:', electionId); 
      };
    return (
        <div>
            <h1 className='main-heading'>DASHBOARD</h1>
      <div className="app-container">
      <div className="left-column">
        <ElectionList elections={elections} handleVote={handleVote} />
      </div>
      <div className="right-column">
      </div>
    </div>
        </div>
    );
};
 
export default Home;