import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ResultItem from '../components/ResultItem';
import {
  Chart,
  Tooltip,
  Legend,
  PolarAreaController,
  RadialLinearScale,
  ArcElement
} from 'chart.js';

const Results = () => {
  const location = useLocation(); 
  const chartRef = useRef(null);
  const canvasRef = useRef(null); // Reference to the canvas element
  const [facultyData, setFacultyData] = useState({ labels: [], data: [] });
  const [club, setClub] = useState(null); // Store the full club object
  const [sampleCandidates, setSampleCandidates] = useState([]); 

  // Extract the club name from the URL 
  const clubName = decodeURIComponent(location.pathname.split("/").pop());

  // Fetch club by name and retrieve its elections
  const fetchClubByName = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/clubs/');
      const clubs = await response.json();
      const club = clubs.find(club => club.clubName === "Super cool club"); // use super cool club temporarily
      if (club) {
        setClub(club); 
        fetchElections(club.elections); 
      }
    } catch (error) {
      console.error('Error fetching clubs:', error);
    }
  };

  // Fetch elections and their candidates
  const fetchElections = async (electionIds) => {
    
    const updatedCandidates = [];
    for (const electionId of electionIds) {
      try {
        const electionResponse = await fetch(`http://localhost:5000/api/elections/${electionId}`);
        const election = await electionResponse.json();
        console.log(election);
        const candidates = await fetchCandidates(election.candidates);
        const winner = findWinner(candidates);
        
        // Add the winner 
        updatedCandidates.push({
          name: winner.name,
          position: election.electionName,
          votes: winner.voteCount, 
          image: null, // For now image is null since idk where to get it from
        });
      } catch (error) {
        console.error(`Error fetching election ${electionId}:`, error);
      }
    }
    setSampleCandidates(updatedCandidates); // Update the state with winners
  };

  // Fetch candidates and their vote counts
  const fetchCandidates = async (candidateIds) => {
    const candidates = [];
    for (const candidateId of candidateIds) {
      try {
        const candidateResponse = await fetch(`http://localhost:5000/api/candidates/${candidateId}`);
        const candidate = await candidateResponse.json();
        candidates.push(candidate);
      } catch (error) {
        console.error(`Error fetching candidate ${candidateId}:`, error);
      }
    }
    return candidates;
  };

  // Find winner
  const findWinner = (candidates) => {
    return candidates.reduce((winner, candidate) => {
      return candidate.voteCount > (winner?.voteCount || 0) ? candidate : winner;
    }, null);
  };

  // will need to change this later 
  // Fetch users and process faculty data
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/');
      const users = await response.json();
      const facultyCounts = users.reduce((acc, user) => {
        const faculty = user.faculty;
        acc[faculty] = (acc[faculty] || 0) + 1;
        return acc;
      }, {});
      setFacultyData({
        labels: Object.keys(facultyCounts),
        data: Object.values(facultyCounts)
      });
      
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    Chart.register(PolarAreaController, Tooltip, Legend, RadialLinearScale, ArcElement);
    fetchUsers();
    fetchClubByName(); // Fetch the full club object and its elections
  }, [clubName]);

  useEffect(() => {
    if (facultyData.labels.length > 0 && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (chartRef.current) chartRef.current.destroy(); 
      chartRef.current = new Chart(ctx, {
        type: 'polarArea',
        data: {
          labels: facultyData.labels,
          datasets: [{
            label: 'Users by Faculty',
            data: facultyData.data,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(75, 192, 192)',
              'rgb(255, 205, 86)',
              'rgb(201, 203, 207)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(255, 159, 64)',
              'rgb(255, 99, 71)',
              'rgb(60, 179, 113)',
              'rgb(106, 90, 205)'
            ],
          }]
        },
        options: {
          maintainAspectRatio: false,
          aspectRatio: 1,
          plugins: {
            legend: {
              position: 'right'
            }
          }
        }
      });

      return () => {
        if (chartRef.current) chartRef.current.destroy();
      };
    }
  }, [facultyData]);

  return (
    <div>
      <h1 className='main-heading'>
        Elections Results for {clubName} {club && `(Club ID: ${club._id.$oid})`}
      </h1>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
      }}>
        <div style={{ width: '700px' }}>
          <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }}></canvas>
        </div>
      </div>

      <ResultItem candidates={sampleCandidates} />
    </div>
  );
};

export default Results;
