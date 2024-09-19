import React, { useEffect, useRef, useState } from 'react';
import ResultItem from '../components/ResultItem';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  ChartOptions, PolarAreaController, RadialLinearScale, ArcElement
  } from 'chart.js';

const sampleCandidates = [
  { image: 'https://cdn-icons-png.flaticon.com/128/3884/3884864.png', name: 'Brian Bells', position: 'President', votes: 70 },
  { image: 'https://cdn-icons-png.flaticon.com/128/4892/4892710.png', name: 'Peeta Malarkey', position: 'Vice President', votes: 46 },
  { image: 'https://cdn-icons-png.flaticon.com/128/4329/4329449.png', name: 'Wonyoung Jang', position: 'Secretary', votes: 56 },
  { image: 'https://cdn-icons-png.flaticon.com/128/4829/4829575.png', name: 'Karina Yu', position: 'Treasurer', votes: 50 },
  { image: 'https://cdn-icons-png.flaticon.com/128/3667/3667832.png', name: 'Yoji Daphne', position: 'Events Director', votes: 61 },
];

const Results = () => {
  const chartRef = useRef(null);
  const [facultyData, setFacultyData] = useState({ labels: [], data: [] });

  // Function to fetch users and process faculty data
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/');
      const users = await response.json();

      // Process the faculty data
      const facultyCounts = users.reduce((acc, user) => {
        const faculty = user.faculty;
        acc[faculty] = (acc[faculty] || 0) + 1;
        return acc;
      }, {});

      const labels = Object.keys(facultyCounts);
      const data = Object.values(facultyCounts);

      setFacultyData({ labels, data });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {

    Chart.register(PolarAreaController, Tooltip, Legend,RadialLinearScale, ArcElement);

    fetchUsers();
  }, []);

  useEffect(() => {
    if (facultyData.labels.length > 0) {
      const ctx = document.getElementById('polar');

      if (chartRef.current) {
        chartRef.current.destroy();
      }

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
              position: 'right', // Position the legend to the right
            }
          }
        }
      });

      return () => {
        if (chartRef.current) {
          chartRef.current.destroy();
        }
      };
    }
  }, [facultyData]);

  return (
    <div>
      <h1 className='main-heading'>Elections Results</h1>

      {/* Flexbox container to center the chart with the legend on the right */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',  // Center the chart and legend container
        alignItems: 'center',      // Vertically center if needed
        height: '50vh',           // Full viewport height for centering
      }}>
        <div style={{ width: '700px' }}>  {/* Adjust the width of the chart container */}
          <canvas id="polar" style={{ width: '100%', height: '100%' }}></canvas>
        </div>
      </div>

      {/* Render the sample candidates */}
      <ResultItem candidates={sampleCandidates} />


    </div>
  );
};

export default Results;
