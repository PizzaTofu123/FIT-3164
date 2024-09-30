import React, { useState, useEffect } from "react";
import ElectionList from '../components/ElectionList';
import UpcomingElectionList from "../components/UpcomingElectionList";
import './index.css';

const Home = ({ user }) => {
  const [elections, setElections] = useState([]);
  const [upcomingElections, setUpcomingElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the election data for clubs the user represents
  useEffect(() => {
    const fetchClubElections = async () => {
      if (!user || !user.clubs || user.clubs.length === 0) {
        console.log("No clubs found for user:", user);
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching elections for user clubs:", user.clubs);
        setLoading(true);

        const clubResponses = await Promise.all(
          user.clubs.map(clubId => {
            console.log(`Fetching data for club ID: ${clubId}`);
            return fetch(`http://localhost:5000/api/clubs/${clubId}`);
          })
        );

        const clubData = await Promise.all(clubResponses.map(res => res.json()));
        console.log("Fetched club data:", clubData);

        // Extract elections from each club
        const allOngoingElections = [];
        const allUpcomingElections = [];

        clubData.forEach(club => {
          console.log(`Processing club: ${club.clubName}`);

          const ongoingElections = club.elections.filter(election => 
            election.electionOngoingFlag && 
            election.electionStartDate && 
            election.electionEndDate
          );
          
          const upcomingElections = club.elections.filter(election => 
            new Date(election.electionStartDate) > new Date()
          );

          console.log("Ongoing elections:", ongoingElections);
          conso
