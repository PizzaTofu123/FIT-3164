import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CandidateProfile.css';

function CandidateProfile() {
  const { candidateId, clubName } = useParams();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [level, setLevel] = useState('');
  const [course, setCourse] = useState('');
  const [faculty, setFaculty] = useState('');
  const [secondFaculty, setSecondFaculty] = useState('');
  const [yearLevel, setYearLevel] = useState('');
  const [campaignDetails, setCampaignDetails] = useState('');
  const [error, setError] = useState(null);

  const capitalizeFirstLetter = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  useEffect(() => {
    const fetchCandidateDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/candidates/${candidateId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch candidate details');
        }
        const candidate = await response.json();
        setFirstName(candidate.firstName);
        setLastName(candidate.lastName);
        setLevel(candidate.level);
        setCourse(candidate.course);
        setFaculty(candidate.faculty);
        setSecondFaculty(candidate.secondFaculty);
        setYearLevel(candidate.year);
        setCampaignDetails(candidate.description);
      } catch (error) {
        console.error('Error fetching candidate details:', error);
        setError('Failed to fetch candidate details.');
      }
    };

    fetchCandidateDetails();
  }, [candidateId]);

  // Validation logic
  const validateForm = () => {
    if (!firstName || !lastName || !level || !course || !faculty || !yearLevel || !campaignDetails) {
      setError('Incomplete Input.');
      return false;
    }
    if (yearLevel < 1) {
      setError('Year level cannot be less than 1.');
      return false;
    }
    return true;
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setError(null); // Clear the error on input change
  };
  
  // Arrays for Undergraduate and Postgraduate courses
  const undergraduateCourses = [
    "Bachelor of Accounting",
    "Bachelor of Actuarial Science",
    "Bachelor of Actuarial Science and Actuarial Studies",
    "Bachelor of Applied Data Science",
    "Bachelor of Applied Data Science Advanced (Honours)",
    "Bachelor of Architectural Design",
    "Bachelor of Architectural Design and Architecture",
    "Bachelor of Arts",
    "Bachelor of Arts (Honours)",
    "Bachelor of Arts and Criminology",
    "Bachelor of Arts and Fine Art",
    "Bachelor of Arts and Global Studies",
    "Bachelor of Arts and Health Sciences",
    "Bachelor of Arts and Media Communication",
    "Bachelor of Arts and Music",
    "Bachelor of Banking and Finance",
    "Bachelor of Biomedical Science",
    "Bachelor of Biomedical Science (Honours)",
    "Bachelor of Business",
    "Bachelor of Business Administration",
    "Bachelor of Business and Accounting",
    "Bachelor of Business and Arts",
    "Bachelor of Business and Banking and Finance",
    "Bachelor of Business and Information Technology",
    "Bachelor of Business and Marketing",
    "Bachelor of Business and Media Communication",
    "Bachelor of Commerce",
    "Bachelor of Commerce (Honours)",
    "Bachelor of Commerce and Actuarial Science",
    "Bachelor of Commerce and Arts",
    "Bachelor of Commerce and Biomedical Science",
    "Bachelor of Commerce and Computer Science",
    "Bachelor of Commerce and Economics",
    "Bachelor of Commerce and Finance",
    "Bachelor of Commerce and Global Studies",
    "Bachelor of Commerce and Information Technology",
    "Bachelor of Commerce and Music",
    "Bachelor of Commerce and Politics, Philosophy and Economics",
    "Bachelor of Commerce and Science",
    "Bachelor of Computer Science",
    "Bachelor of Computer Science (Honours)",
    "Bachelor of Computer Science Advanced (Honours)",
    "Bachelor of Criminology",
    "Bachelor of Criminology and Information Technology",
    "Bachelor of Design",
    "Bachelor of Design and Arts",
    "Bachelor of Design and Business",
    "Bachelor of Design and Information Technology",
    "Bachelor of Design and Media Communication",
    "Bachelor of Digital Business",
    "Bachelor of Digital Business and Business",
    "Bachelor of Digital Business and Information Technology",
    "Bachelor of Economics",
    "Bachelor of Education (Honours)",
    "Bachelor of Education (Honours) and Arts",
    "Bachelor of Education (Honours) and Business",
    "Bachelor of Education (Honours) and Fine Art",
    "Bachelor of Education (Honours) and Music",
    "Bachelor of Education (Honours) and Science",
    "Bachelor of Engineering (Honours)",
    "Bachelor of Engineering (Honours) and Architectural Design",
    "Bachelor of Engineering (Honours) and Arts",
    "Bachelor of Engineering (Honours) and Biomedical Science",
    "Bachelor of Engineering (Honours) and Commerce",
    "Bachelor of Engineering (Honours) and Computer Science",
    "Bachelor of Engineering (Honours) and Design",
    "Bachelor of Engineering (Honours) and Engineering",
    "Bachelor of Engineering (Honours) and Information Technology",
    "Bachelor of Engineering (Honours) and Pharmaceutical Science",
    "Bachelor of Engineering (Honours) and Science",
    "Bachelor of Finance",
    "Bachelor of Fine Art",
    "Bachelor of Fine Art (Honours)",
    "Bachelor of Fine Art and Business",
    "Bachelor of Fine Art and Information Technology",
    "Bachelor of Fine Art and Media Communication",
    "Bachelor of Global Business",
    "Bachelor of Global Studies",
    "Bachelor of Global Studies and Information Technology",
    "Bachelor of Health Sciences",
    "Bachelor of Health Sciences (Honours)",
    "Bachelor of Information Technology",
    "Bachelor of Information Technology and Arts",
    "Bachelor of Information Technology and Science",
    "Bachelor of International Relations",
    "Bachelor of Laws (Honours)",
    "Bachelor of Laws (Honours) and Arts",
    "Bachelor of Laws (Honours) and Biomedical Science",
    "Bachelor of Laws (Honours) and Commerce",
    "Bachelor of Laws (Honours) and Computer Science",
    "Bachelor of Laws (Honours) and Criminology",
    "Bachelor of Laws (Honours) and Engineering",
    "Bachelor of Laws (Honours) and Global Studies",
    "Bachelor of Laws (Honours) and Information Technology",
    "Bachelor of Laws (Honours) and International Relations",
    "Bachelor of Laws (Honours) and Music",
    "Bachelor of Laws (Honours) and Politics, Philosophy and Economics",
    "Bachelor of Laws (Honours) and Psychology",
    "Bachelor of Laws (Honours) and Science",
    "Bachelor of Learning Design and Technology",
    "Bachelor of Marketing",
    "Bachelor of Marketing and Arts",
    "Bachelor of Marketing and Media Communication",
    "Bachelor of Media Communication",
    "Bachelor of Medical Science (Honours)",
    "Bachelor of Medical Science and Medicine",
    "Bachelor of Music",
    "Bachelor of Music (Honours)",
    "Bachelor of Nursing",
    "Bachelor of Nursing (Honours)",
    "Bachelor of Nursing and Midwifery (Honours)",
    "Bachelor of Nutrition Science",
    "Bachelor of Occupational Therapy (Honours)",
    "Bachelor of Paramedicine",
    "Bachelor of Paramedicine (Honours)",
    "Bachelor of Pharmaceutical Science",
    "Bachelor of Pharmaceutical Science (Honours)",
    "Bachelor of Pharmaceutical Science Advanced (Honours)",
    "Bachelor of Pharmacy (Honours)",
    "Bachelor of Pharmacy",
    "Bachelor of Physiotherapy (Honours)",
    "Bachelor of Politics, Philosophy and Economics",
    "Bachelor of Politics, Philosophy and Economics and Arts",
    "Bachelor of Psychology",
    "Bachelor of Psychology (Honours)",
    "Bachelor of Psychology and Arts",
    "Bachelor of Psychology and Commerce",
    "Bachelor of Psychology and Science",
    "Bachelor of Public Health",
    "Bachelor of Radiation Sciences",
    "Bachelor of Radiography and Medical Imaging (Honours)",
    "Bachelor of Science",
    "Bachelor of Science (Honours)",
    "Bachelor of Science Advanced - Global Challenges (Honours)",
    "Bachelor of Science Advanced - Research (Honours)",
    "Bachelor of Science and Arts",
    "Bachelor of Science and Biomedical Science",
    "Bachelor of Science and Computer Science",
    "Bachelor of Science and Global Studies",
    "Bachelor of Science and Music"
  ];  
  
  const postgraduateCourses = [
    "Master of Accounting",
    "Master of Actuarial Studies",
    "Master of Addictive Behaviours",
    "Master of Advanced Engineering",
    "Master of Advanced Finance",
    "Master of Advanced Health Care Practice",
    "Master of Advanced Nursing",
    "Master of Aeromedical Retrieval",
    "Master of Analytics",
    "Master of Applied Behaviour Analysis",
    "Master of Applied Data Science",
    "Master of Applied Econometrics",
    "Master of Applied Econometrics and Advanced Finance",
    "Master of Applied Linguistics",
    "Master of Applied Marketing",
    "Master of Architecture",
    "Master of Art, Design and Architecture",
    "Master of Artificial Intelligence",
    "Master of Arts",
    "Master of Arts Research Training",
    "Master of Australian Law",
    "Master of Banking and Finance",
    "Master of Behaviour and Systemic Change",
    "Master of Bioethics",
    "Master of Biomedical and Health Science",
    "Master of Biomedical Science",
    "Master of Biostatistics",
    "Master of Biotechnology",
    "Master of Business",
    "Master of Business Administration (Digital)",
    "Master of Business Analytics",
    "Master of Business and Economics",
    "Master of Business and Information Systems",
    "Master of Business Management",
    "Master of Clinical Embryology",
    "Master of Clinical Neuropsychology",
    "Master of Clinical Pharmacy (Aged Care)",
    "Master of Clinical Pharmacy",
    "Master of Clinical Research",
    "Master of Clinical Simulation",
    "Master of Commerce",
    "Master of Communications and Media Studies",
    "Master of Computer Science",
    "Master of Corporate and Financial Regulation",
    "Master of Counselling",
    "Master of Creative Writing",
    "Master of Critical Care Paramedicine",
    "Master of Cultural and Creative Industries",
    "Master of Cybersecurity",
    "Master of Data Science",
    "Master of Design (by Research)",
    "Master of Design",
    "Master of Economic Analytics",
    "Master of Economics",
    "Master of Education",
    "Master of Education Studies",
    "Master of Educational and Developmental Psychology",
    "Master of Educational Leadership",
    "Master of Educational Research",
    "Master of Employment Regulation",
    "Master of Engineering",
    "Master of Engineering Science (Research)",
    "Master of Environment and Sustainability",
    "Master of Epidemiology",
    "Master of Financial Mathematics",
    "Master of Fine Art",
    "Master of Food Science and Agribusiness",
    "Master of Forensic Medicine",
    "Master of Forensic Nursing and Midwifery",
    "Master of Genome Analytics",
    "Master of Geographical Information Science and Technology",
    "Master of Global Business",
    "Master of Global Business and Accounting",
    "Master of Global Business and Advanced Finance",
    "Master of Global Business and Applied Econometrics",
    "Master of Global Business and Applied Marketing",
    "Master of Global Business and Behaviour and Systemic Change",
    "Master of Global Business and Management",
    "Master of Global Business and Regulation and Compliance",
    "Master of Global Executive Business Administration",
    "Master of Global Executive Business Administration and Business",
    "Master of Green Chemistry and Sustainable Technologies",
    "Master of Health Administration",
    "Master of Health Data Analytics",
    "Master of Health Management",
    "Master of Health Profession Education",
    "Master of Health Promotion",
    "Master of Human Resource Management",
    "Master of Human Rights",
    "Master of Information Technology",
    "Master of International Development Practice",
    "Master of International Relations",
    "Master of International Relations and Journalism",
    "Master of International Sustainable Tourism Management",
    "Master of Interpreting and Translation Studies",
    "Master of Journalism",
    "Master of Juris Doctor",
    "Doctor of Philosophy (Law)",
    "Master of Laws",
    "Master of Legal Studies",
    "Master of Magnetic Resonance Imaging",
    "Master of Management",
    "Master of Management and Accounting",
    "Master of Management and Advanced Finance",
    "Master of Management and Applied Marketing",
    "Master of Management and Behaviour and Systemic Change",
    "Master of Management and Regulation and Compliance",
    "Master of Marketing and Digital Communications",
    "Master of Mathematics",
    "Master of Medical Ultrasound",
    "Master of Medicine, Nursing and Health Sciences",
    "Master of Mental Health Sciences",
    "Master of Monash Sustainable Development Institute",
    "Master of Monash University Accident Research Centre",
    "Master of Music",
    "Master of Nursing Practice",
    "Master of Nutrition and Dietetics",
    "Master of Occupational and Environmental Health",
    "Master of Occupational Therapy Practice",
    "Master of Paramedic Practitioner",
    "Master of Perioperative Medicine",
    "Master of Pharmaceutical Science",
    "Master of Pharmacy and Pharmaceutical Sciences",
    "Master of Pharmacy Practice",
    "Master of Science",
    "Master of Philosophy",
    "Master of Education",
    "Master of Physiotherapy",
    "Master of Podiatric Medicine",
    "Master of Professional Accounting",
    "Master of Professional Accounting and Business Law",
    "Professional Certificate of Clinical Simulation",
    "Professional Certificate of Epidemiology",
    "Professional Certificate of Health Professions Education",
    "Professional Certificate of Public Health",
    "Master of Professional Engineering",
    "Master of Professional Psychology",
    "Master of Project Management",
    "Master of Public Health",
    "Master of Public Policy",
    "Master of Radiation Therapy",
    "Master of Regulation and Compliance",
    "Master of Reproductive Sciences",
    "Master of Road Safety",
    "Master of Science",
    "Master of Social Work",
    "Master of Strategic Communications Management",
    "Master of Surgery",
    "Master of Teaching",
    "Master of Technology and Regulation",
    "Master of TESOL",
    "Master of Theatre Performance",
    "Master of Translation Studies",
    "Master of Transport and Mobility Planning",
    "Master of Urban Planning and Design",
    "Master of Wound Care",
    "Graduate Certificate of X-ray Image Interpretation"
  ];
  

  // Function to return relevant courses based on the selected level
  const getCourses = () => {
    if (level === 'Undergraduate') {
      return undergraduateCourses;
    } else if (level === 'Postgraduate') {
      return postgraduateCourses;
    }
    return [];
  };

  // Handle Save (sending data to backend)
  const handleSave = async () => {
    if (!validateForm()) return;

    const candidateData = {
      firstName: capitalizeFirstLetter(firstName),
      lastName: capitalizeFirstLetter(lastName),
      description: campaignDetails,
      level,
      faculty,
      secondFaculty,
      course,
      year: parseInt(yearLevel, 10),
    };

    try {
      const response = await fetch(`http://localhost:5000/api/candidates/${candidateId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(candidateData),
      });

      if (!response.ok) {
        throw new Error('Failed to update candidate details');
      }

      const result = await response.json();
      console.log('Candidate updated successfully:', result);
      navigate(`/edit-candidates/${clubName}`);
    } catch (err) {
      console.error(err);
      setError('Failed to update candidate details. Please try again.');
    }
  };

  const handleBackClick = () => {
    navigate(`/edit-candidates/${clubName}`);
  };

  return (
    <div className="candidate-profile-page">
      <div className="candidate-profile-header">
        <button className="candidate-profile-back-button" onClick={handleBackClick}>
          ←
        </button>
        Edit Candidate
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
              onChange={handleInputChange(setFirstName)}
            />
          </div>
          <div className="candidate-profile-row">
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={handleInputChange(setLastName)}
            />
          </div>
          <div className="candidate-profile-row">
            <label>Level</label>
            <select
              value={level}
              onChange={handleInputChange(setLevel)}
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
              onChange={handleInputChange(setCourse)}
            >
              <option value="">Select Course</option>
              {getCourses().map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>
          <div className="candidate-profile-row">
            <label>Faculty</label>
            <select
              value={faculty}
              onChange={handleInputChange(setFaculty)}
            >
              <option value="">Select Faculty</option>
              <option value="Faculty of Art, Design and Architecture">Faculty of Art, Design and Architecture</option>
              <option value="Faculty of Arts">Faculty of Arts</option>
              <option value="Faculty of Business and Economics">Faculty of Business and Economics</option>
              <option value="Faculty of Education">Faculty of Education</option>
              <option value="Faculty of Engineering">Faculty of Engineering</option>
              <option value="Faculty of Information Technology">Faculty of Information Technology</option>
              <option value="Faculty of Law">Faculty of Law</option>
              <option value="Faculty of Medicine, Nursing and Health Sciences">Faculty of Medicine, Nursing and Health Sciences</option>
              <option value="Faculty of Pharmacy and Pharmaceutical Sciences">Faculty of Pharmacy and Pharmaceutical Sciences</option>
              <option value="Faculty of Science">Faculty of Science</option>
            </select>
          </div>
          <div className="candidate-profile-row">
            <label>Second Faculty</label>
            <select
              value={secondFaculty}
              onChange={handleInputChange(setSecondFaculty)}
            >
              <option value="">Select Second Faculty</option>
              <option value="Faculty of Art, Design and Architecture">Faculty of Art, Design and Architecture</option>
              <option value="Faculty of Arts">Faculty of Arts</option>
              <option value="Faculty of Business and Economics">Faculty of Business and Economics</option>
              <option value="Faculty of Education">Faculty of Education</option>
              <option value="Faculty of Engineering">Faculty of Engineering</option>
              <option value="Faculty of Information Technology">Faculty of Information Technology</option>
              <option value="Faculty of Law">Faculty of Law</option>
              <option value="Faculty of Medicine, Nursing and Health Sciences">Faculty of Medicine, Nursing and Health Sciences</option>
              <option value="Faculty of Pharmacy and Pharmaceutical Sciences">Faculty of Pharmacy and Pharmaceutical Sciences</option>
              <option value="Faculty of Science">Faculty of Science</option>
            </select>
          </div>
          <div className="candidate-profile-row">
            <label>Year Level</label>
            <input
              type="number"
              value={yearLevel}
              onChange={handleInputChange(setYearLevel)}
              min="1"
            />
          </div>
          <div className="candidate-profile-row">
            <label>Campaign Details</label>
            <textarea
              value={campaignDetails}
              onChange={handleInputChange(setCampaignDetails)}
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
