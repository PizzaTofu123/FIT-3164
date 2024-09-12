import React, { useState } from 'react';
import './ClubDetails.css'; // Importing ClubDetails specific CSS

function ClubDetails() {
  const [clubs, setClubs] = useState([{ clubName: '', representative: false }]);

  const handleClubChange = (index, event) => {
    const { name, value, checked, type } = event.target;
    const newClubs = [...clubs];
    if (type === 'checkbox') {
      newClubs[index][name] = checked;
    } else {
      newClubs[index][name] = value;
    }
    setClubs(newClubs);
  };

  const addClubField = () => {
    setClubs([...clubs, { clubName: '', representative: false }]);
  };

  const deleteClubField = (index) => {
    const newClubs = clubs.filter((_, i) => i !== index);
    setClubs(newClubs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Clubs Data:', clubs);
  };

  return (
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
            {clubs.map((club, index) => (
              <div key={index} className="club-form-group">
                <div className="club-input-container">
                  <label className="club-label">Club {index + 1}</label>
                  <input
                    type="text"
                    name="clubName"
                    value={club.clubName}
                    onChange={(e) => handleClubChange(index, e)}
                    className="club-input"
                    required
                  />
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
  );
}

export default ClubDetails;
