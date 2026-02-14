import React, { useState, useEffect } from 'react';
import {
  FaRegCalendarAlt,
  FaHourglassHalf,
  FaGraduationCap,
  FaFilePdf,
  FaInfoCircle,
  FaFileAlt,   
} from 'react-icons/fa';

import '../css/Events.css';
import { motion } from 'framer-motion';

const ssipdocx = new URL('../assets/Events/ssip timetable.docx', import.meta.url).href;
import coverImg from '../assets/cover.png';
import Hero from '../Components/Hero';

function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const eventsData = [
    {
      title: "Eldomaine High School's Art Competition",
      date: new Date("2026-02-13T08:00:00"),
      description:
        "Eldomaine High School invites learners to showcase their creativity in painting, drawing, and sculpting at the 2026 Art Competition.",
      moreInfo: (
        <>
          <strong>🎨 Calling All Artists!</strong>
          <p>
            Eldomaine High School proudly presents its annual Art Competition —
            an opportunity for learners to showcase their creativity through
            painting, drawing, and sculpting.
          </p>
          <p>
            Entries close on <strong>13 February 2026</strong>, with final
            submissions due by <strong>27 February 2026</strong>. Selected works
            will be featured in a public exhibition on{" "}
            <strong>6 March 2026</strong>, celebrating the talent and imagination
            of our students.
          </p>
          <p>
            Whether you’re an aspiring painter, a passionate sketch artist, or a
            sculptor in the making, this is your chance to shine!
          </p>
        </>
      ),
    },
    {
      title: "🏆Eldorado Park Interhigh Sports Event",
      date: new Date("2026-02-13T08:00:00"),
      description:
        "Eldorado Park Stadium will bring schools together for a thrilling multi-sport competition celebrating talent, teamwork, and community spirit.",
      moreInfo: (
        <>
          <p>
           It is with great enthusiasm that we inform you that Eldomaine High School will be participating in the Annual Inter-High Athletics Meet to be held on Friday, 13 February 2026 at the Eldorado Park Stadium.

This is an important event on our school calendar and forms part of our official academic and extracurricular programme. Please note that this is an official school day. There will be no formal classroom teaching on this day as all learners are expected to report directly to the Eldorado Park Stadium to support the athletes representing our school.

Attendance and Dress Code

Learners are expected to:
• Arrive at the stadium on time.
• Conduct themselves in a disciplined and respectful manner.
• Support their peers positively and proudly.

Entrance fees are as follows:
<strong><li>• R10.00 – Learners wearing full school uniform</li></strong>
<strong><li>• R20.00 – Learners wearing civvies (if parents grant permission)</li></strong>

We strongly encourage learners to wear full school uniform to promote unity, discipline, and pride in our institution.

Importance of Sport

Sport plays a vital role in holistic education. It builds discipline, teamwork, leadership, resilience, and school spirit. Eldomaine High School has established a strong reputation not only for academic excellence but also for excellence in sport and extracurricular activities. Our consistent performance and the manner in which our learners conduct themselves contribute greatly to the positive image of our school in the Eldorado Park community.

Your child’s presence and positive support strengthen our athletes’ morale and uphold the proud reputation of Eldomaine High School.

          </p>
          <p>
            <strong>Location: Eldorado Park Stadium</strong>
          </p>
        </>
      ),
    },
    {
      title:
        "No upcoming events scheduled at the moment. Please check back soon for updates.",
      date: new Date("2025-12-08T18:00:00"),
      description: "",
      moreInfo: "",
    },
    {
      title:
        "No upcoming events scheduled at the moment. Please check back soon for updates.",
      date: new Date("2025-10-21T09:00:00"),
      description: "",
      moreInfo: "",
    },
    {
      title:
        "No upcoming events scheduled at the moment. Please check back soon for updates.",
      date: new Date("2025-10-29T09:00:00"),
      description: "",
      moreInfo: "",
    },
    {
      title:
        "No upcoming events scheduled at the moment. Please check back soon for updates.",
      date: new Date("2025-10-31T09:00:00"),
      description: "",
      moreInfo: "",
    },
    {
      title:
        "No upcoming events scheduled at the moment. Please check back soon for updates.",
      date: new Date("2025-11-27T09:00:00"),
      description: "",
      moreInfo: "",
    },
  ];

  const [timers, setTimers] = useState(eventsData.map(() => "Loading..."));

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimers = eventsData.map((event) => {
        const now = new Date().getTime();
        const eventTime = new Date(event.date).getTime();
        const distance = eventTime - now;

        if (distance <= 0) return "Event Started!";

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (distance % (1000 * 60 * 60)) / (1000 * 60)
        );
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
      <Hero
        image={coverImg}
        title="From competitions to celebrations, explore what’s happening at Eldomaine."
        type="events"
      />

      <section className="events-intro">
        <h1>School Events</h1>
        <p>Celebrating milestones and building memories together</p>
      </section>

      <section className="events-list-section">
        <h2>Upcoming & Recent Events</h2>

        <motion.div
          className="matric-timetable-link"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <a href={ssipdocx} target="_blank" rel="noopener noreferrer">
  <FaFileAlt style={{ marginRight: "0.5rem", color: "blue" }} />
  Download 2026 Grade 12 SSIP Timetable (DOCX)
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
              className={`event-card ${
                timers[index] === "Event Started!" ? "started" : ""
              }`}
              key={index}
              variants={itemVariants}
              whileHover="hover"
              onClick={() => setSelectedEvent(event)}
            >
              <div className="event-info">
                <h3>
                  <FaGraduationCap
                    style={{ marginRight: "0.5rem", color: "#9e7bdc" }}
                  />
                  {event.title}
                </h3>
                <p className="event-date">
                  <FaRegCalendarAlt
                    style={{ marginRight: "0.5rem", color: "#2980b9" }}
                  />
                  {new Date(event.date).toDateString()}
                </p>
                <p>{event.description}</p>
                <p
                  className={`event-timer ${
                    timers[index] !== "Event Started!"
                      ? "countdown-pulse"
                      : ""
                  }`}
                >
                  <FaHourglassHalf
                    style={{ marginRight: "0.5rem", color: "#27ae60" }}
                  />
                  {timers[index] || "Loading..."}
                </p>
                <button
                  className="more-info-btn"
                  onClick={() => setSelectedEvent(event)}
                >
                  <FaInfoCircle /> More Info
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

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
            <p className="event-date">
              {new Date(selectedEvent.date).toDateString()}
            </p>
            <div className="event-description">
              {selectedEvent.description}
            </div>
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
