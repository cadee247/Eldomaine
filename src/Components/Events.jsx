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
import coverImg from '../assets/cover.png'; // ✅ import hero image
import Hero from '../components/Hero'; // Reusable hero component

function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const eventsData = [
    // ... same events data as your original file
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
