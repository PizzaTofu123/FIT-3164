import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ClubSignUp.css';

const pageVariants = {
  initial: {
    x: '-100vw', // Start off the screen to the right
    opacity: 0,
  },
  in: {
    x: 0, // Slide in to the normal position
    opacity: 1,
  },
  out: {
    x: '100vw', // Slide out to the left when leaving the page
    opacity: 0,
  },
};

const pageTransition = {
  duration: 0.5,
  type: 'tween',
};

function ClubSignUp({ userData }) {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState(['']);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  // Function to handle input changes for club fields
  const handleClubChange = (index, value) => {
    const newClubs = [...clubs];
    newClubs[index] = value;
    setClubs(newClubs);
  };

  // Function to add a new club input field
  const addClubField = () => {
    setClubs([...clubs, '']); // Add an empty string to represent the new club
  };

  // Function to remove a club input field
  const removeClubField = (index) => {
    setClubs(clubs.filter((_, i) => i !== index));
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Clubs submitted:', clubs);

    // Save user data with clubs to local storage
    localStorage.setItem('user', JSON.stringify({ ...userData, clubs }));

    // Show success message
    setSignUpSuccess(true);

    // Redirect to Sign In page after a few seconds
    setTimeout(() => {
      navigate('/signin');
    }, 3000); // Adjust the time as needed (3000ms = 3 seconds)
  };

  return (
    <motion.div
      className="signup-page"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="monash-logo-container">
        <img src="/images/monash_logo_login.png" alt="Monash University" className="monash-logo" />
      </div>
      <div className="signup-content">
        <div className="signup-left">
          <img
            src="/images/sign_up_clubs_illustration.png"
            alt="Sign Up Illustration"
            className="signup-illustration"
          />
        </div>
        <div className="signup-right">
          <button className="back-button" onClick={() => navigate('/member-signup')}>
            ←
          </button>
          <h2>Enter club memberships</h2>

          {/* Display success message if sign up is successful */}
          {signUpSuccess ? (
            <div className="success-message">Sign Up has been successful! Redirecting to Sign In...</div>
          ) : (
            <form onSubmit={handleSubmit} className="signup-form">
              {clubs.map((club, index) => (
                <div className="form-group" key={index}>
                  <label>Club {index + 1}</label>
                  <div className="input-group">
                    <input
                      type="text"
                      value={club}
                      onChange={(e) => handleClubChange(index, e.target.value)}
                    />
                    {index > 0 && ( // Only show the delete button if the index is greater than 0
                      <button
                        type="button"
                        className="remove-club-button"
                        onClick={() => removeClubField(index)}
                      >
                        &times; {/* Use a multiplication sign (×) to indicate deletion */}
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button type="button" className="add-club-button" onClick={addClubField}>
                +
              </button>
              <button type="submit" className="submit-button">Sign Up</button>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ClubSignUp;
