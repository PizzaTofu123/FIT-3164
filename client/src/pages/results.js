import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ResultItem from '../components/ResultItem';
import {
  Chart,
  Tooltip,
  Legend,
  PolarAreaController,
  RadialLinearScale,
  ArcElement,
  LinearScale,
  CategoryScale,
  BarController,
  BarElement,
  
} from 'chart.js';


const Results = () => {
  const location = useLocation(); 
  const chartRef = useRef(null);
  const canvasRef = useRef(null); // polar canvas
  const barChartRef = useRef(null);
  const barCanvasRef = useRef(null);
  const [votesData, setVotesData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('level'); // default to level of education
  const [facultyData, setFacultyData] = useState({ labels: [], data: [] });
  const [club, setClub] = useState(null); 
  const [sampleCandidates, setSampleCandidates] = useState([]); 


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
        fetchVotes(club.elections);
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
        const candidates = await fetchCandidates(election.candidates);
        const winner = findWinner(candidates);
        
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

  // Fetch votes and aggregate them by faculty and position for Sankey chart
  const fetchVotes = async (electionIds) => {
    const facultyVotes = {};
    const levelCounts = {};
    const courseCounts = {};
    const yearCounts = {};
    
    for (const electionId of electionIds) {
      try {
        const votesResponse = await fetch(`http://localhost:5000/api/votes/election/${electionId}`);
        const votes = await votesResponse.json();
        
        // total votes by faculty and prepare Sankey data
        for (const vote of votes) {
          const faculty = vote.faculty || 'Unknown Faculty';
          const level = vote.level || 'Unknown Level';
          const course = vote.course || 'Unknown Course';
          const year = vote.year || 'Unknown Year';

          if (!facultyVotes[faculty]) {
            facultyVotes[faculty] = 0;
          }


          levelCounts[level] = (levelCounts[level] || 0) + 1;
          courseCounts[course] = (courseCounts[course] || 0) + 1;
          yearCounts[year] = (yearCounts[year] || 0) + 1;
          facultyVotes[faculty] += 1; 
        }
      } catch (error) {
        console.error(`Error fetching votes for election ${electionId}:`, error);
      }
    }

    // set polar data
    setFacultyData({
      labels: Object.keys(facultyVotes),
      data: Object.values(facultyVotes),
    });

    setVotesData({
      level: levelCounts,
      course: Object.fromEntries(Object.entries(courseCounts).filter(([key, value]) => value > 8)),// filter less than 8 cuz theres too much
      year: yearCounts
    });
  };

  const renderChart = () => {
    if (!votesData || !votesData[selectedCategory] || !barCanvasRef.current) return;
  
    const ctx = barCanvasRef.current.getContext('2d');
    if (barChartRef.current) barChartRef.current.destroy();
  
    const data = votesData[selectedCategory];
    const sortedData = Object.entries(data).sort(([, a], [, b]) => b - a); // Sort by descending
    const labels = sortedData.map(([label]) => label);
    const voteCounts = sortedData.map(([, count]) => count);
  
    // Rainbow colours
    const backgroundColors = labels.map((_, index) => `hsl(${index * 40}, 70%, 50%)`); 
  
    barChartRef.current = new Chart(ctx, {
      type: 'bar',  
      data: {
        labels: labels,
        datasets: [{
          label: `Votes by ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`,
          data: voteCounts,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors,
          borderWidth: 1,
        }],
      },
      options: {
        indexAxis: 'y',  // This makes the chart horizontal
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              autoSkip: false,
            }
          },
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: true, // Show the legend
            position: 'top',
            onClick: () => {},
            labels: {
              generateLabels: function (chart) {
                return chart.data.labels.map((label, index) => ({
                  text: label, 
                  fillStyle: chart.data.datasets[0].backgroundColor[index], 
                  strokeStyle: chart.data.datasets[0].backgroundColor[index],
                  lineWidth: 1,
                }));
              }
            },
          },
          tooltip: {
            enabled: true, 
          },
        }
      }
    });
  };
  
  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    renderChart();
  }, [votesData, selectedCategory]);

  useEffect(() => {
    Chart.register(PolarAreaController, Tooltip, Legend, RadialLinearScale, ArcElement, LinearScale
      ,CategoryScale,
      BarController,
      BarElement
    );
    fetchClubByName(); 
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
        Elections Results for {clubName} 
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

      <div style={{
        display: 'flex',
        justifyContent: 'center', 
        gap: '10px',  
        marginBottom: '20px'  
      }}>
        <button onClick={() => handleCategoryChange('level')}>Level of Education</button>
        <button onClick={() => handleCategoryChange('course')}>University Course</button>
        <button onClick={() => handleCategoryChange('year')}>Year of Study</button>
      </div>

    
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: '100px',
      }}>
        <div style={{ width: '95%' }}>  
          <canvas ref={barCanvasRef} style={{ width: '100%', height: '500px' }}></canvas>  
        </div>
      </div>
    </div>
  );
};

export default Results;
