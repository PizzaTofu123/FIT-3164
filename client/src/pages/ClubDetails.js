import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ClubDetails.css';
import { CSSTransition } from 'react-transition-group';

function ClubDetails() {
  const [clubs, setClubs] = useState([]); // State to store clubs from the backend
  const [selectedClubs, setSelectedClubs] = useState([{ clubName: '', representative: false }]); 
  const [inProp, setInProp] = useState(true); // fade-out effect
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

  const handleClubChange = (index, event) => {
    const { name, value, checked, type } = event.target;
    const newClubs = [...selectedClubs];
    if (type === 'checkbox') {
      newClubs[index][name] = checked;
    } else {
      newClubs[index][name] = value;
    }
    setSelectedClubs(newClubs);
  };

  const addClubField = () => {
    setSelectedClubs([...selectedClubs, { clubName: '', representative: false }]);
  };

  const deleteClubField = (index) => {
    const newClubs = selectedClubs.filter((_, i) => i !== index);
    setSelectedClubs(newClubs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Retrieve personal info and education info from localStorage
    const personalInfo = JSON.parse(localStorage.getItem('personalInfo'));
    const educationInfo = JSON.parse(localStorage.getItem('educationInfo'));
  
    // Combine all the data
    const userData = {
      ...personalInfo,
      education: educationInfo,
      clubs: selectedClubs
    };
  
    // Send the combined data to the backend
    fetch('http://localhost:5000/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Trigger fade-out animation before navigating
      setInProp(false);
      setTimeout(() => {
        navigate('/signup-confirmation'); // Redirect to confirmation page
      }, 300); // Match animation duration
    })
    .catch((error) => {
      console.error('Error:', error);
    });
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

            <form onSubmit={handleSubmit}>
              {selectedClubs.map((club, index) => (
                <div key={index} className="club-form-group">
                  <div className="club-input-container">
                    <label className="club-label">Club {index + 1}</label>

                    <select
                      name="clubName"
                      value={club.clubName}
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
                      <button
                        type="button"
                        className="club-delete-button"
                        onClick={() => deleteClubField(index)}
                      >
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
