import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CandidateProfile.css';

function CandidateProfile() {
  const { position, clubName } = useParams(); // Extract clubName and position from URL
  const navigate = useNavigate(); // Use navigate for back button functionality

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [level, setLevel] = useState('');
  const [course, setCourse] = useState('');
  const [faculty, setFaculty] = useState('');
  const [secondFaculty, setSecondFaculty] = useState('');
  const [yearLevel, setYearLevel] = useState('');
  const [campaignDetails, setCampaignDetails] = useState('');
  const [electionId, setElectionId] = useState('');
  const [error, setError] = useState(null); // State to handle errors

  // Fetch club and election details by club name (like in results.js)
  useEffect(() => {
    const fetchClubByName = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/clubs/');
        const clubs = await response.json();
        const club = clubs.find(club => club.clubName === clubName);
        if (club) {
          const election = club.elections.find(election => election.electionName === position);
          if (election) {
            setElectionId(election._id); // Store election ID
          } else {
            throw new Error('Election not found for the club');
          }
        } else {
          throw new Error('Club not found');
        }
      } catch (error) {
        console.error('Error fetching club and election details:', error);
        setError('Failed to fetch club and election details.');
      }
    };

    fetchClubByName();
  }, [clubName, position]);

  // Handle Save (sending data to backend)
  const handleSave = async () => {
    const candidateData = {
      firstName,
      lastName,
      description: campaignDetails,
      electionId, // Use the retrieved election ID
      votes: [], // Initially empty
      voteCount: 0, // Initially 0
      level,
      faculty,
      secondFaculty,
      course,
      year: parseInt(yearLevel, 10), // Year level as integer
    };

    try {
      const response = await fetch('http://localhost:5000/api/candidates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(candidateData),
      });

      if (!response.ok) {
        throw new Error('Failed to save candidate details');
      }

      const result = await response.json();
      console.log('Candidate saved successfully:', result);
      navigate(`/edit-candidates/${clubName}`); // Redirect back to edit candidates
    } catch (err) {
      console.error(err);
      setError('Failed to save candidate details. Please try again.');
    }
  };

  const handleBackClick = () => {
    navigate(`/edit-candidates/${clubName}`); // Navigate back to the specific club's EditCandidates page
  };

  return (
    <div className="candidate-profile-page">
      <div className="candidate-profile-header">
        <button className="candidate-profile-back-button" onClick={handleBackClick}>
          ←
        </button>
        {position} Candidate
      </div>
      <div className="candidate-profile-container">
        <div className="candidate-profile-picture">
          <img src="/images/default_profile.png" alt="Candidate Profile" />
          <div className="pencil-icon" onClick={() => console.log('Edit profile picture clicked')}>
            <img src="/images/pencil-icon.png" alt="Edit" />
          </div>
        </div>
        <div className="candidate-profile-details">
          <div className="candidate-profile-row">
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="candidate-profile-row">
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="candidate-profile-row">
            <label>Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="">Select Level</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Postgraduate">Postgraduate</option>
            </select>
          </div>
          <div className="candidate-profile-row">
            <label>Course</label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            >
              <option value="">Select Course</option>
              {level === 'Undergraduate' ? (
                <>
                  <option value="Bachelor of Science">Bachelor of Science</option>
                  <option value="Bachelor of Arts">Bachelor of Arts</option>
                  <option value="Bachelor of Commerce">Bachelor of Commerce</option>
                </>
              ) : (
                <>
                  <option value="Master of Science">Master of Science</option>
                  <option value="Master of Arts">Master of Arts</option>
                  <option value="Master of Commerce">Master of Commerce</option>
                </>
              )}
            </select>
          </div>
          <div className="candidate-profile-row">
            <label>Faculty</label>
            <select
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
            >
              <option value="">Select a Faculty</option>
              <option value="Faculty of Science">Faculty of Science</option>
              <option value="Faculty of Arts">Faculty of Arts</option>
              <option value="Faculty of Business">Faculty of Business</option>
            </select>
          </div>
          <div className="candidate-profile-row">
            <label>Second Faculty</label>
            <select
              value={secondFaculty}
              onChange={(e) => setSecondFaculty(e.target.value)}
            >
              <option value="">Select a Second Faculty</option>
              <option value="Faculty of Science">Faculty of Science</option>
              <option value="Faculty of Arts">Faculty of Arts</option>
              <option value="Faculty of Business">Faculty of Business</option>
            </select>
          </div>
          <div className="candidate-profile-row">
            <label>Year Level</label>
            <input
              type="number"
              value={yearLevel}
              onChange={(e) => setYearLevel(e.target.value)}
              min="1"
            />
          </div>
          <div className="candidate-profile-row">
            <label>Campaign Details</label>
            <textarea
              value={campaignDetails}
              onChange={(e) => setCampaignDetails(e.target.value)}
            />
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
        <button className="candidate-profile-save-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}

export default CandidateProfile;
