import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './EducationDetails.css';

function EducationDetails() {
  const [educationData, setEducationData] = useState({
    level: '',
    faculty: '',
    course: '',
    year: '',
  });

  const navigate = useNavigate();

  // Arrays for Undergraduate and Postgraduate courses
  const undergraduateCourses = [
    "Accounting",
    "Actuarial Science",
    "Actuarial Science and Actuarial Studies",
    "Applied Data Science",
    "Applied Data Science Advanced (Honours)",
    "Architectural Design",
    "Architectural Design and Architecture",
    "Arts",
    "Arts (Honours)",
    "Arts and Criminology",
    "Arts and Fine Art",
    "Arts and Global Studies",
    "Arts and Health Sciences",
    "Arts and Media Communication",
    "Arts and Music",
    "Banking and Finance",
    "Biomedical Science",
    "Biomedical Science (Honours)",
    "Business",
    "Business Administration",
    "Business and Accounting",
    "Business and Arts",
    "Business and Banking and Finance",
    "Business and Information Technology",
    "Business and Marketing",
    "Business and Media Communication",
    "Commerce",
    "Commerce (Honours)",
    "Commerce and Actuarial Science",
    "Commerce and Arts",
    "Commerce and Biomedical Science",
    "Commerce and Computer Science",
    "Commerce and Economics",
    "Commerce and Finance",
    "Commerce and Global Studies",
    "Commerce and Information Technology",
    "Commerce and Music",
    "Commerce and Politics, Philosophy and Economics",
    "Commerce and Science",
    "Computer Science",
    "Computer Science (Honours)",
    "Computer Science Advanced (Honours)",
    "Criminology",
    "Criminology and Information Technology",
    "Design",
    "Design and Arts",
    "Design and Business",
    "Design and Information Technology",
    "Design and Media Communication",
    "Digital Business",
    "Digital Business and Business",
    "Digital Business and Information Technology",
    "Economics",
    "Education (Honours)",
    "Education (Honours) and Arts",
    "Education (Honours) and Business",
    "Education (Honours) and Fine Art",
    "Education (Honours) and Music",
    "Education (Honours) and Science",
    "Engineering (Honours)",
    "Engineering (Honours) and Architectural Design",
    "Engineering (Honours) and Arts",
    "Engineering (Honours) and Biomedical Science",
    "Engineering (Honours) and Commerce",
    "Engineering (Honours) and Computer Science",
    "Engineering (Honours) and Design",
    "Engineering (Honours) and Engineering",
    "Engineering (Honours) and Information Technology",
    "Engineering (Honours) and Pharmaceutical Science",
    "Engineering (Honours) and Science",
    "Finance",
    "Fine Art",
    "Fine Art (Honours)",
    "Fine Art and Business",
    "Fine Art and Information Technology",
    "Fine Art and Media Communication",
    "Global Business",
    "Global Studies",
    "Global Studies and Information Technology",
    "Health Sciences",
    "Health Sciences (Honours)",
    "Information Technology",
    "Information Technology and Arts",
    "Information Technology and Science",
    "International Relations",
    "Laws (Honours)",
    "Laws (Honours) and Arts",
    "Laws (Honours) and Biomedical Science",
    "Laws (Honours) and Commerce",
    "Laws (Honours) and Computer Science",
    "Laws (Honours) and Criminology",
    "Laws (Honours) and Engineering",
    "Laws (Honours) and Global Studies",
    "Laws (Honours) and Information Technology",
    "Laws (Honours) and International Relations",
    "Laws (Honours) and Music",
    "Laws (Honours) and Politics, Philosophy and Economics",
    "Laws (Honours) and Psychology",
    "Laws (Honours) and Science",
    "Learning Design and Technology",
    "Marketing",
    "Marketing and Arts",
    "Marketing and Media Communication",
    "Media Communication",
    "Medical Science (Honours)",
    "Medical Science and Medicine",
    "Music",
    "Music (Honours)",
    "Nursing",
    "Nursing (Honours)",
    "Nursing and Midwifery (Honours)",
    "Nutrition Science",
    "Occupational Therapy (Honours)",
    "Paramedicine",
    "Paramedicine (Honours)",
    "Pharmaceutical Science",
    "Pharmaceutical Science (Honours)",
    "Pharmaceutical Science Advanced (Honours)",
    "Pharmacy (Honours)",
    "Pharmacy",
    "Physiotherapy (Honours)",
    "Politics, Philosophy and Economics",
    "Politics, Philosophy and Economics and Arts",
    "Psychology",
    "Psychology (Honours)",
    "Psychology and Arts",
    "Psychology and Commerce",
    "Psychology and Science",
    "Public Health",
    "Radiation Sciences",
    "Radiography and Medical Imaging (Honours)",
    "Science",
    "Science (Honours)",
    "Science Advanced - Global Challenges (Honours)",
    "Science Advanced - Research (Honours)",
    "Science and Arts",
    "Science and Biomedical Science",
    "Science and Computer Science",
    "Science and Global Studies",
    "Science and Music",
  ];

  const postgraduateCourses = [
    "Accounting",
    "Actuarial Studies",
    "Addictive Behaviours",
    "Advanced Engineering",
    "Advanced Finance",
    "Advanced Health Care Practice",
    "Advanced Nursing",
    "Aeromedical Retrieval",
    "Analytics",
    "Applied Behaviour Analysis",
    "Applied Data Science",
    "Applied Econometrics",
    "Applied Econometrics and Advanced Finance",
    "Applied Linguistics",
    "Applied Marketing",
    "Architecture",
    "Art, Design and Architecture",
    "Artificial Intelligence",
    "Arts",
    "Arts Research Training",
    "Australian Law",
    "Banking and Finance",
    "Behaviour and Systemic Change",
    "Bioethics",
    "Biomedical and Health Science",
    "Biomedical Science",
    "Biostatistics",
    "Biotechnology",
    "Business",
    "Business Administration (Digital)",
    "Business Analytics",
    "Business and Economics",
    "Business and Information Systems",
    "Business Management",
    "Clinical Embryology",
    "Clinical Neuropsychology",
    "Clinical Pharmacy (Aged Care)",
    "Clinical Pharmacy",
    "Clinical Research",
    "Clinical Simulation",
    "Commerce",
    "Communications and Media Studies",
    "Computer Science",
    "Corporate and Financial Regulation",
    "Counselling",
    "Creative Writing",
    "Critical Care Paramedicine",
    "Cultural and Creative Industries",
    "Cybersecurity",
    "Data Science",
    "Design (by Research)",
    "Design",
    "Economic Analytics",
    "Economics",
    "Education",
    "Education Studies",
    "Educational and Developmental Psychology",
    "Educational Leadership",
    "Educational Research",
    "Employment Regulation",
    "Engineering",
    "Engineering Science (Research)",
    "Environment and Sustainability",
    "Epidemiology",
    "Financial Mathematics",
    "Fine Art",
    "Food Science and Agribusiness",
    "Forensic Medicine",
    "Forensic Nursing and Midwifery",
    "Genome Analytics",
    "Geographical Information Science and Technology",
    "Global Business",
    "Global Business and Accounting",
    "Global Business and Advanced Finance",
    "Global Business and Applied Econometrics",
    "Global Business and Applied Marketing",
    "Global Business and Behaviour and Systemic Change",
    "Global Business and Management",
    "Global Business and Regulation and Compliance",
    "Global Executive Business Administration",
    "Global Executive Business Administration and Business",
    "Green Chemistry and Sustainable Technologies",
    "Health Administration",
    "Health Data Analytics",
    "Health Management",
    "Health Profession Education",
    "Health Promotion",
    "Human Resource Management",
    "Human Rights",
    "Information Technology",
    "International Development Practice",
    "International Relations",
    "International Relations and Journalism",
    "International Sustainable Tourism Management",
    "Interpreting and Translation Studies",
    "Journalism",
    "Juris Doctor",
    "Doctor of Philosophy (Law)",
    "Laws",
    "Legal Studies",
    "Magnetic Resonance Imaging",
    "Management",
    "Management and Accounting",
    "Management and Advanced Finance",
    "Management and Applied Marketing",
    "Management and Behaviour and Systemic Change",
    "Management and Regulation and Compliance",
    "Marketing and Digital Communications",
    "Mathematics",
    "Medical Ultrasound",
    "Medicine, Nursing and Health Sciences",
    "Mental Health Sciences",
    "Monash Sustainable Development Institute",
    "Monash University Accident Research Centre",
    "Music",
    "Nursing Practice",
    "Nutrition and Dietetics",
    "Occupational and Environmental Health",
    "Occupational Therapy Practice",
    "Paramedic Practitioner",
    "Perioperative Medicine",
    "Pharmaceutical Science",
    "Pharmacy and Pharmaceutical Sciences",
    "Pharmacy Practice",
    "Science",
    "Philosophy",
    "Education",
    "Physiotherapy",
    "Podiatric Medicine",
    "Professional Accounting",
    "Professional Accounting and Business Law",
    "Professional Certificate of Clinical Simulation",
    "Professional Certificate of Epidemiology",
    "Professional Certificate of Health Professions Education",
    "Professional Certificate of Public Health",
    "Professional Engineering",
    "Professional Psychology",
    "Project Management",
    "Public Health",
    "Public Policy",
    "Radiation Therapy",
    "Regulation and Compliance",
    "Reproductive Sciences",
    "Road Safety",
    "Science",
    "Social Work",
    "Strategic Communications Management",
    "Surgery",
    "Teaching",
    "Technology and Regulation",
    "TESOL",
    "Theatre Performance",
    "Translation Studies",
    "Transport and Mobility Planning",
    "Urban Planning and Design",
    "Wound Care",
    "X-ray Image Interpretation",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Store education info in localStorage
    localStorage.setItem('educationInfo', JSON.stringify(educationData));

    // Navigate to the ClubSignUp page after collecting education info
    navigate('/club-details');
  };

  // Updates the course options based on the selected level
  const getCourses = () => {
    if (educationData.level === 'Undergraduate') {
      return undergraduateCourses;
    } else if (educationData.level === 'Postgraduate') {
      return postgraduateCourses;
    }
    return [];
  };

  return (
    <div className="education-wrapper">
      <div className="education-header">
        <img src="/images/monash_logo_login.png" alt="Monash University Logo" className="education-logo" />
      </div>
      <div className="education-container">
        {/* Back button */}
        <button className="education-back-button" onClick={() => navigate('/signup')}>
          &#8592;
        </button>
        
        <div className="education-image">
          <img src="/images/sign_up_illustration.png" alt="Sign Up Illustration" className="education-illustration" />
        </div>
        <div className="education-form-container">
          <h2 className="education-heading">Education Details</h2>
          <p className="education-description">Please fill in your education details.</p>
          <form onSubmit={handleSubmit} className="education-form">
            <div className="education-form-group">
              <label className="education-label">Level</label>
              <select
                name="level"
                value={educationData.level}
                onChange={handleChange}
                className="education-input"
                required
              >
                <option value="">Select Level</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Postgraduate">Postgraduate</option>
              </select>
            </div>

            <div className="education-form-group">
              <label className="education-label">Faculty</label>
              <select
                name="faculty"
                value={educationData.faculty}
                onChange={handleChange}
                className="education-input"
                required
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

            <div className="education-form-group">
              <label className="education-label">Course</label>
              <select
                name="course"
                value={educationData.course}
                onChange={handleChange}
                className="education-input"
                required
              >
                <option value="">Select Course</option>
                {getCourses().map((course, index) => (
                  <option key={index} value={course}>{course}</option>
                ))}
              </select>
            </div>

            <div className="education-form-group">
              <label className="education-label">Year</label>
              <input 
                type="number" 
                name="year" 
                value={educationData.year} 
                onChange={handleChange} 
                className="education-input" 
                required 
                min="1"
              />
            </div>

            <button type="submit" className="education-button">Next ➜</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EducationDetails;
