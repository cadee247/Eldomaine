import React, { useState, useEffect } from 'react';
import {
  FaRegCalendarAlt,
  FaHourglassHalf,
  FaGraduationCap,
  FaFilePdf,
  FaInfoCircle,
} from 'react-icons/fa';
import '../css/Events.css';
import { motion } from 'framer-motion';
import MatricPDF from '../assets/Events/Matric Timetable 2025 – Full NSC Exam Dates & Times (South Africa).pdf';
import coverImg from '../assets/cover.png';



import Hero from '../Components/Hero'; // Reusable hero component

function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const eventsData = [
    {
      title: "Entrepreneur's Day",
      date: new Date("2025-10-24T08:00:00"),
      description: (
        <p>
          <strong>Grade 9 EMS learners</strong> and <strong>Grade 10–11 Business Studies learners</strong> will showcase and sell products and services they’ve developed as part of their curriculum.
        </p>
      ),
      moreInfo: (
        <>
          <p><strong>This event is compulsory for all Grade 9 learners</strong> as it forms a vital part of the EMS curriculum focused on entrepreneurial development.</p>
          <p>On the day, learners will:</p>
          <ul>
            <li>Plan and manage their own mini-businesses</li>
            <li>Learn budgeting, profit & loss</li>
            <li>Practice customer service and teamwork</li>
            <li>Explore marketing and sales strategies</li>
            <li>Develop leadership and decision-making skills</li>
          </ul>
          <p>IMPORTANT:</p>
          <ul>
            <li>Stalls will cost R250 (shared among team members)</li>
            <li>Each learner must contribute to the business venture</li>
            <li>This is a team effort and ALL educators will be involved</li>
          </ul>
        </>
      ),
    },
    {
      title: "Civies Day (FOR THE WHOLE SCHOOL)",
      date: new Date("2025-10-24T08:00:00"),
      description: "Theme for dress-up: Spring.",
      moreInfo: "All funds raised on the day will be used for school maintenance and repairs.",
    },
    {
      title: "Matric Dance",
      date: new Date("2025-09-20T18:00:00"),
      description: "An elegant evening celebrating the journey and achievements of our Grade 12 learners before they graduate.",
      moreInfo: "Theme: 'Enchanted Evening'. Dress code: Formal. Includes dinner, dancing, and photo booths. Tickets available from the school office.",
    },
    {
      title: "Matric Final Exams Start - Computer Applications Tech P1",
      date: new Date("2025-10-21T09:00:00"),
      description: "The official start of the Grade 12 final exams with Computer Applications Tech P1 Practical.",
      moreInfo: "First exam of the NSC timetable. Ensure all devices are prepared. Revision sessions available prior.",
    },
    {
      title: "English HL P1 Exam",
      date: new Date("2025-10-29T09:00:00"),
      description: "Key language exam for Matric students.",
      moreInfo: "Focus on comprehension and language skills. Duration: 2hrs. Study tips: Practice past papers and vocabulary.",
    },
    {
      title: "Mathematics P1 Exam",
      date: new Date("2025-10-31T09:00:00"),
      description: "Core Mathematics exam for Grade 12.",
      moreInfo: "Covers algebra, geometry, etc. Duration: 3hrs. Extra tutoring sessions scheduled.",
    },
    {
      title: "End of Matric Exams",
      date: new Date("2025-11-27T09:00:00"),
      description: "Final day of NSC examinations with CAT/IT rewrites.",
      moreInfo: "Celebrate the end with a school assembly. Results expected in January 2026.",
    },
  ];

  const [timers, setTimers] = useState(eventsData.map(() => 'Loading...'));

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimers = eventsData.map(event => {
        const now = new Date().getTime();
        const eventTime = new Date(event.date).getTime();
        const distance = eventTime - now;

        if (distance <= 0) return "Event Started!";

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
      });

      setTimers(updatedTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="events-page">
      {/* HERO SECTION */}
      <Hero image={coverImg} title="School Events" type="events" />

      {/* Text Section */}
      <section className="events-intro">
        <h1>School Events</h1>
        <p>Celebrating milestones and building memories together</p>
      </section>

      {/* Events List Section */}
      <section className="events-list-section">
        <h2>Upcoming & Recent Events</h2>

        <motion.div
          className="matric-timetable-link"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <a href={MatricPDF} target="_blank" rel="noopener noreferrer">
            <FaFilePdf style={{ marginRight: '0.5rem', color: '#e74c3c' }} />
            Download Matric Timetable 2025 (Full NSC Exam Dates & Times)
          </a>
        </motion.div>

        <motion.div
          className="events-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {eventsData.map((event, index) => (
            <motion.div
              className={`event-card ${timers[index] === "Event Started!" ? 'started' : ''}`}
              key={index}
              variants={itemVariants}
              whileHover="hover"
              onClick={() => setSelectedEvent(event)}
            >
              <div className="event-info">
                <h3>
                  <FaGraduationCap style={{ marginRight: '0.5rem', color: '#9e7bdc' }} />
                  {event.title}
                </h3>
                <p className="event-date">
                  <FaRegCalendarAlt style={{ marginRight: '0.5rem', color: '#2980b9' }} />
                  {new Date(event.date).toDateString()}
                </p>
                <p>{event.description}</p>
                <p className={`event-timer ${timers[index] !== "Event Started!" ? 'countdown-pulse' : ''}`}>
                  <FaHourglassHalf style={{ marginRight: '0.5rem', color: '#27ae60' }} />
                  {timers[index] || 'Loading...'}
                </p>
                <button className="more-info-btn" onClick={() => setSelectedEvent(event)}>
                  <FaInfoCircle /> More Info
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Modal Section */}
      {selectedEvent && (
        <motion.div
          className="event-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedEvent(null)}
        >
          <motion.div
            className="event-modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{selectedEvent.title}</h3>
            <p className="event-date">{new Date(selectedEvent.date).toDateString()}</p>
            <div className="event-description">{selectedEvent.description}</div>
            <div className="event-more-info">
              <strong>More Info:</strong> {selectedEvent.moreInfo}
            </div>
            <button onClick={() => setSelectedEvent(null)}>Close</button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default Events;
