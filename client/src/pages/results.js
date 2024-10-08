import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ResultItem from '../components/ResultItem';



const Results = () => {
  const location = useLocation(); 
  const [club, setClub] = useState(null); 
  const [sampleCandidates, setSampleCandidates] = useState([]); 


  const clubName = decodeURIComponent(location.pathname.split("/").pop());

  // Fetch club by name and retrieve its elections
  const fetchClubByName = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/clubs/');
      const clubs = await response.json();
      const club = clubs.find(club => club.clubName === clubName); // use super cool club temporarily
      if (club) {
        setClub(club); 
        fetchElections(club.elections); 
      }
    } catch (error) {
      console.error('Error fetching clubs:', error);
    }
  };

  // Fetch elections and their candidates
  const fetchElections = async (elections) => {
    
    const updatedCandidates = [];
    for (const election of elections) {
      try {
        const candidates = await fetchCandidates(election.candidates);
        const winner = findWinner(candidates);
        
        updatedCandidates.push({
          name: winner.firstName + " " + winner.lastName,
          position: election.electionName,
          votes: winner.voteCount, 
          image: "../images/default_profile.png", // For now image is null since idk where to get it from
        });
      } catch (error) {
        console.error(`Error fetching election ${election._id}:`, error);
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

  useEffect(() => {
    fetchClubByName(); 
  }, [clubName]);


  return (
    <div>
      <h1 className='main-heading'>
        Elections Results for {clubName} 
      </h1>

      <ResultItem candidates={sampleCandidates} />


    </div>
  );
};

export default Results;
