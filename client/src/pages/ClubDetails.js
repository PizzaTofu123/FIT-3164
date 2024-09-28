import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ClubDetails.css';
import { CSSTransition } from 'react-transition-group';

function ClubDetails() {
  const [clubs, setClubs] = useState([]); // State to store clubs from the backend
  const [selectedClubs, setSelectedClubs] = useState([{ clubId: '', representative: false }]);
  const [inProp, setInProp] = useState(true); // fade-out effect
  const [errorMessage, setErrorMessage] = useState(''); // Store error message if any
  const navigate = useNavigate();

  // Fetch clubs from the backend
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/clubs');
        const data = await response.json();
        setClubs(data);
      } catch (error) {
        console.error('Error fetching clubs:', error);
      }
    };

    fetchClubs();
  }, []);

  // Clear the error message when user interacts with the form
  const handleClubChange = (index, event) => {
    const { name, value, checked, type } = event.target;
    const newClubs = [...selectedClubs];

    // Reset error message when the user selects a club or toggles the representative checkbox
    setErrorMessage('');

    if (type === 'checkbox') {
      newClubs[index][name] = checked;
    } else {
      const selectedClub = clubs.find((club) => club.clubName === value); // Find the club by its name
      if (selectedClub) {
        newClubs[index].clubId = selectedClub._id; // Store the club's _id (ObjectId)
        newClubs[index].clubName = selectedClub.clubName; // Store club name (optional, for display purposes)
      }
    }

    setSelectedClubs(newClubs);
  };

  const addClubField = () => {
    setSelectedClubs([...selectedClubs, { clubId: '', representative: false }]);
    setErrorMessage(''); // Clear error when adding a new club field
  };

  const deleteClubField = (index) => {
    const newClubs = selectedClubs.filter((_, i) => i !== index);
    setSelectedClubs(newClubs);
    setErrorMessage(''); // Clear error when deleting a club field
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Retrieve personal info and education info from localStorage
    const personalInfo = JSON.parse(localStorage.getItem('personalInfo'));
    const educationInfo = JSON.parse(localStorage.getItem('educationInfo'));
    
    const userData = {
      firstName: personalInfo.firstName,
      lastName: personalInfo.lastName,
      studentId: personalInfo.monashID,
      email: personalInfo.monashEmail,
      passwordHash: personalInfo.password,
      dob: personalInfo.dob,
      age: personalInfo.age,
      clubs: selectedClubs.map(club => club.clubId), // Only send club IDs
      representingClubs: selectedClubs.filter(club => club.representative).map(club => club.clubId),
      level: educationInfo.level,
      faculty: educationInfo.faculty,
      secondFaculty: educationInfo.secondFaculty || null, // Ensure null if not provided
      course: educationInfo.course,
      year: educationInfo.year,
    };
    
    console.log('Submitting User Data to Backend:', JSON.stringify(userData));
    
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
    
      const data = await response.json();
      console.log('Backend Response:', data);
  
      // Check if the backend returned an error regarding clubs/representation
      if (response.ok && !data.message) {
        // Clear form and localStorage
        setSelectedClubs([{ clubId: '', representative: false }]); // Reset selected clubs to initial state
        localStorage.removeItem('personalInfo'); // Clear saved personal details from localStorage
        localStorage.removeItem('educationInfo'); // Clear saved education info from localStorage
  
        setInProp(false); // Trigger fade-out animation before navigating
        setTimeout(() => {
          navigate('/signup-confirmation'); // Redirect to confirmation page
        }, 300); // Match animation duration
      } else {
        // Show error message instead of redirecting
        const errorMessage = data.message || 'An unknown error occurred';
        setErrorMessage(errorMessage); // Display error message in the UI
      }
    } catch (error) {
      console.error('Error during request:', error);
      setErrorMessage('An error occurred while registering. Please try again.');
    }
  };  

  return (
    <CSSTransition in={inProp} timeout={300} classNames="fade">
      <div className="club-wrapper">
        <div className="club-header">
          <img src="/images/monash_logo_login.png" alt="Monash University Logo" className="club-logo" />
        </div>
        <div className="club-container">
          <button className="club-back-button" onClick={() => window.history.back()}>
            &#8592;
          </button>

          <div className="club-image">
            <img src="/images/sign_up_clubs_illustration.png" alt="Membership Illustration" className="club-illustration" />
          </div>

          <div className="club-form-container">
            <h2 className="club-heading">Club Membership Details</h2>
            <p className="club-description">Enter the clubs that you are a member of.</p>

            {/* Display error message */}
            {errorMessage && (
              <div className="error-message">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {selectedClubs.map((club, index) => (
                <div key={index} className="club-form-group">
                  <div className="club-input-container">
                    <label className="club-label">Club {index + 1}</label>

                    <select
                      name="clubName"
                      value={club.clubName || ''}
                      onChange={(e) => handleClubChange(index, e)}
                      className="club-input"
                      required
                    >
                      <option value="">Select a club</option>
                      {clubs.map((clubOption, i) => (
                        <option key={i} value={clubOption.clubName}>
                          {clubOption.clubName}
                        </option>
                      ))}
                    </select>

                    {index !== 0 && (
                      <button type="button" className="club-delete-button" onClick={() => deleteClubField(index)}>
                        ❌
                      </button>
                    )}
                  </div>

                  <label className="club-representative-label">
                    Are you a representative of this club?
                    <span className="club-yes-label">Yes</span>
                    <input
                      type="checkbox"
                      name="representative"
                      checked={club.representative}
                      onChange={(e) => handleClubChange(index, e)}
                      className="club-checkbox"
                    />
                  </label>
                </div>
              ))}

              <div className="club-button-container">
                <button type="button" className="club-add-button" onClick={addClubField}>
                  +
                </button>
                <button type="submit" className="club-submit-button">Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}

export default ClubDetails;
