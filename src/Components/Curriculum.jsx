import React, { useState } from 'react';
import {
  FaBookOpen,
  FaLaptopCode,
  FaFlask,
  FaUsers,
  FaFootballBall,
  FaMusic,
  FaRobot
} from 'react-icons/fa';
import curriculumImage from '../assets/Curriculum/pic2.jpg';
import coverImg from '../assets/cover.png'; // ✅ import hero image
import '../css/Curriculum.css';

const FlipCard = ({ icon, name, description }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`curriculum-card-flip ${isFlipped ? 'flipped' : ''}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="curriculum-card-inner">
        <div className="curriculum-card-front">
          {icon}
          <span>{name}</span>
          <p className="tap-hint">Tap for more info</p>
        </div>
        <div className="curriculum-card-back">
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

function Curriculum() {
  const [selectedGrade, setSelectedGrade] = useState('8-9');

  const curriculumData = {
    '8-9': [
      { icon: <FaBookOpen />, name: 'Mathematics', description: 'Builds foundational skills in algebra, geometry, and data handling.' },
      { icon: <FaFlask />, name: 'Natural Science', description: 'Introduces concepts in physics and chemistry through experiments.' },
      { icon: <FaBookOpen />, name: 'Life Science', description: 'Explores biology, ecosystems, and human anatomy.' },
      { icon: <FaBookOpen />, name: 'Economic Management Science', description: 'Basic economic principles and financial literacy.' },
      { icon: <FaBookOpen />, name: 'Technology', description: 'Design thinking, systems, and basic engineering concepts.' },
      { icon: <FaBookOpen />, name: 'Social Science', description: 'History and geography foundations.' },
      { icon: <FaBookOpen />, name: 'English Home Language', description: 'Enhances reading, writing, and comprehension skills.' },
      { icon: <FaBookOpen />, name: 'Creative Arts', description: 'Drama, music, visual arts, and dance.' },
      { icon: <FaBookOpen />, name: 'Afrikaans First Additional Language', description: 'Develops proficiency in Afrikaans for communication.' },
      { icon: <FaUsers />, name: 'Life Orientation', description: 'Focuses on personal development, health, and social issues.' },
    ],
    '10-12': {
      'Science Stream': [
        { icon: <FaBookOpen />, name: 'Mathematics', description: 'Advanced algebra, calculus, and problem-solving.' },
        { icon: <FaFlask />, name: 'Physical Science', description: 'Physics and chemistry principles and experiments.' },
        { icon: <FaBookOpen />, name: 'Life Science', description: 'Genetics, evolution, and environmental science.' },
        { icon: <FaBookOpen />, name: 'English Home Language', description: 'Literature analysis, essay writing, and language mastery.' },
        { icon: <FaBookOpen />, name: 'Afrikaans FAL', description: 'Intermediate Afrikaans with emphasis on practical usage.' },
        { icon: <FaBookOpen />, name: 'History', description: 'South African and global historical events and analysis.' },
        { icon: <FaUsers />, name: 'Life Orientation', description: 'Career guidance, ethics, and community involvement.' },
      ],
      'Technical Stream': [
        { icon: <FaLaptopCode />, name: 'English Home Language', description: 'Communication skills tailored for technical fields.' },
        { icon: <FaBookOpen />, name: 'Mathematics Literacy', description: 'Practical math for everyday and workplace applications.' },
        { icon: <FaBookOpen />, name: 'CAT', description: 'Computer Applications Technology: software, databases, and web.' },
        { icon: <FaBookOpen />, name: 'Engineering Graphics & Design', description: 'Technical drawing and design principles.' },
        { icon: <FaUsers />, name: 'Life Orientation', description: 'Personal growth and vocational preparation.' },
      ],
      'Business Stream': [
        { icon: <FaBookOpen />, name: 'Business Studies', description: 'Entrepreneurship, management, and economics basics.' },
        { icon: <FaBookOpen />, name: 'Tourism', description: 'Industry knowledge, hospitality, and sustainable practices.' },
        { icon: <FaBookOpen />, name: 'History', description: 'South African and global historical events and analysis.' },
        { icon: <FaBookOpen />, name: 'Mathematics Literacy', description: 'Financial math and data interpretation.' },
        { icon: <FaUsers />, name: 'Life Orientation', description: 'Leadership, diversity, and civic responsibility.' },
      ],
    },
  };

  const extracurriculars = [
    { icon: <FaFootballBall />, name: 'Soccer', description: 'Team building through competitive matches and training.' },
    { icon: <FaFootballBall />, name: 'Rugby', description: 'Physical fitness and strategy in a dynamic sport.' },
    { icon: <FaFootballBall />, name: 'Netball', description: 'Agility and teamwork in fast-paced games.' },
    { icon: <FaRobot />, name: 'Robotics Club', description: 'Hands-on engineering and programming challenges.' },
    { icon: <FaMusic />, name: 'Creative Arts & Music', description: 'Expression through visual arts, drama, and music.' },
    { icon: <FaBookOpen />, name: 'Academic Tutoring (Maths & Science)', description: 'Peer-led sessions for academic support.' },
  ];

  return (
    <>
      {/* HERO IMAGE — FULL SCREEN, ABSOLUTE */}
      <section className="curriculum-hero" style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
        <img
          src={coverImg} // ✅ use imported image
          alt="Eldomaine High School"
          className="curriculum-hero-img"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </section>

      {/* Text Section Below Image */}
      <section className="curriculum-intro">
        <h1>Eldomaine Secondary School</h1>
        <p>Explore our academic curriculum and extracurricular programs</p>
      </section>

      {/* Main Section */}
      <section className="curriculum-section">
        <h2>Choose Grade</h2>
        <select value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value)} className="grade-selector">
          <option value="8-9">Grades 8–9</option>
          <option value="10-12">Grades 10–12</option>
        </select>

        <div className="curriculum-list-container">
          {selectedGrade === '8-9' &&
            curriculumData['8-9'].map((subject, index) => (
              <FlipCard key={index} {...subject} />
            ))}

          {selectedGrade === '10-12' &&
            Object.entries(curriculumData['10-12']).map(([stream, subjects]) => (
              <div key={stream} className="stream-section">
                <h3>{stream}</h3>
                <div className="stream-cards">
                  {subjects.map((subject, index) => (
                    <FlipCard key={index} {...subject} />
                  ))}
                </div>
              </div>
            ))}
        </div>

        {/* Extracurricular Activities */}
        <div className="extracurriculars-section">
          <h2>Extracurricular Activities</h2>
          <div className="extracurriculars-cards">
            {extracurriculars.map((activity, index) => (
              <FlipCard key={index} {...activity} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Curriculum;
