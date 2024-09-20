import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for redirection
import './ClubDetails.css'; // Importing ClubDetails specific CSS

function ClubDetails() {
  // const clubOptions = [
  //   "Accounting Students' Association, Monash (MASA)",
  //   "Actuarial Students Society, Monash (MASS)",
  //   "Advanced Science & Science Scholar Society, Monash (MASS3)",
  //   "Adventist Students on Campus (ASOC)",
  //   "Aerospace & Mechanical Engineering Club, Monash (MAMEC)",
  //   "African Society, Monash (MAfS)",
  //   "AIESEC Monash",
  //   "ALP (Labor) Club, Monash (ALP)",
  //   "Amnesty International Monash (Amnesty)",
  //   "Anime & Manga Appreciation, Society for (SAMA)",
  //   "Arab Society, Monash (MARS)",
  //   "Arts Students, Society of (SAS)",
  //   "Australia-China Youth Association Monash (ACYA)",
  //   "Baha'i Society, Monash",
  //   "Bangladesh Students Association of Monash University (BSAMU)",
  //   "Big Band, Monash University",
  //   "Biological Society, Monash",
  //   "Biomedical Engineering Students' Society, Monash (MBESS)",
  //   "Biomedical Society, Monash University (Biomed)",
  //   "Boardgames Society, Monash (MBS)",
  //   "Business & Commerce Students Society (BCSS)",
  //   "Cambodian Association, Monash (MCA)",
  //   "Card Collective, Monash (MCC)",
  //   "Catholics, Monash",
  //   "Chemical Engineers, Society for Monash University (SMUCE)",
  //   "Chemistry Students, Society of (SoCS)",
  //   "Chess Club, Monash University",
  //   "Choral Society, Monash University (MonUCS)",
  //   "Christian Union, Monash (CU)",
  //   "Civil Engineering Students, Association of (ACES)",
  //   "Coding, Monash Association of (MAC)",
  //   "Computing & Commerce Association (CCA)",
  //   "Creative Writers, Monash",
  //   "Crochet and Knitting Society, Monash University (MUCKS)",
  //   "Cyber Security Club, Monash (MonSec)",
  //   "Debaters Inc., Monash Association of (MAD)",
  //   "Disney Society, Monash",
  //   "Economics Students' Society of Australia Monash University (ESSA)",
  //   "Education and Teachers' Association, Monash",
  //   "Effective Altruism Monash University",
  //   "Electrical Engineers, Society of Monash (SMEE)",
  //   "Electronic Gaming Association, Monash (MEGA)",
  //   "Embrace Education Inc.",
  //   "Energy Club, Monash",
  //   "Engineering & Pharmaceutical Science Society, Monash (MEPSS)",
  //   "Engineering Students Society, Monash (MESS)",
  //   "Engineers Without Borders Australia, Monash University Chapter (EWB)",
  //   "Environmental Engineering Society, Monash University (MEES)",
  //   "Faculty of IT Society (WIRED)",
  //   "Fantasy and Sci-Fi Association (FASA)",
  //   "Film Society, Monash (Film)",
  //   "Financial Management Association of Australia, Monash University Branch (FMAA)",
  //   "French Society, Monash (MFS)",
  //   "German Liechtensteiner Austrian & Swiss Society, Monash University (GLASS)",
  //   "GLEAM - Queers in STEM",
  //   "Greens Society, Monash University (MUGS)",
  //   "Hellenic Students Society Inc., Monash (MHSS)",
  //   "Humanities and Social Sciences Club (HASS)",
  //   "Indian Cultural Society, Monash (MICS)",
  //   "Indonesian Club, Monash",
  //   "International Affairs Society, Monash (MIAS)",
  //   "Investing & Trading Monash, University Network for (UNIT)",
  //   "Islamic Society, Monash University (MUIS)",
  //   "Italian Club, Monash University",
  //   "Japanese Club, Monash (MJC)",
  //   "Jewish Students Society, Monash (MonJSS)",
  //   "Juggling and Firetwirling, Monash Club of (MCJAF)",
  //   "Korean Appreciation Student Association (KASA)",
  //   "Labor Unity Club",
  //   "Law Students' Society Inc., Monash (LSS)",
  //   "Liberal Club, Monash University (MULC)",
  //   "Linguistics Society (LingSoc)",
  //   "Mahjong Club, Monash (MM)",
  //   "Malaysian Students Union, Monash University (MUMSU)",
  //   "Mannix College Student Society Inc. (MCSS)",
  //   "Marketing Students Society, Monash (MMSS)",
  //   "Materials Engineering and Science Society (MatES)",
  //   "Mechatronics Engineering Clayton Club (MECC)",
  //   "Medical Students Society, Monash University (MUMUS)",
  //   "Medieval Club, Monash (SCA - College of St Monica)",
  //   "Monash Hong Kong Student Association Clayton",
  //   "Muggles, Monash",
  //   "Music and Theatre Society (MATS)",
  //   "Neuroscience & Psychology Society, Students (SNAPS)",
  //   "Nursing Students Society, Clayton (NSS)",
  //   "Nutrition and Dietetics Society, Monash (MND)",
  //   "Overseas Christian Fellowship, Monash University (OCF)",
  //   "Oxfam at Monash",
  //   "Pakistani Association at Monash (PAM)",
  //   "Philharmonic Society, Monash University (MUPS)",
  //   "Philosophy Society, Monash",
  //   "Physics, Astro & Maths, Society for (SPAM)",
  //   "Power to Change, Monash (PTC)",
  //   "Progressive Law Network, Melbourne East Branch (PLN)",
  //   "Radiation Students' Society Monash (MRSS)",
  //   "Role Players, Monash University (MURP)",
  //   "Science Society, Monash (MSS)",
  //   "Singapore Association of Monash (SAM)",
  //   "Socio-Economic Engagement & Development, Monash (SEED)",
  //   "Spanish and Latin American Club (SLAC)",
  //   "Sri Lankan Cultural Club of Monash University (MUSLCC)",
  //   "Team MED",
  //   "Thai Open Community (TOC)",
  //   "Transport Engineers at Monash (TEM)",
  //   "Vegan Society, Monash",
  //   "Vietnamese Students Association (VSA)",
  //   "Wildfire, Monash University Rural Health Club",
  //   "Women in Engineering at Monash (WEM)",
  // ];

  const [clubs, setClubs] = useState([]); // State to store clubs from the backend
  const [selectedClubs, setSelectedClubs] = useState([{ clubName: '', representative: false }]); 
  const navigate = useNavigate(); 

  // Fetch clubs from the backend
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/clubs');
        const data = await response.json();
        setClubs(data); // Assuming 'data' is an array of clubs with clubName
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
      navigate('/signup-confirmation'); // Redirect to confirmation page
    })
    .catch((error) => {
      console.error('Error:', error);
    });
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
            {selectedClubs.map((club, index) => (
              <div key={index} className="club-form-group">
                <div className="club-input-container">
                  <label className="club-label">Club {index + 1}</label>

                  {/* Replace the text input with a dropdown menu */}
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
  );
}

export default ClubDetails;