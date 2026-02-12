import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaNewspaper, FaCalendarAlt, FaThumbsUp, FaHeart, FaSmile } from 'react-icons/fa';
import '../css/News.css';
import coverImg from '../assets/cover.png';
import Hero from '../Components/Hero'; // Reusable hero component

function News() {
  const [searchTerm, setSearchTerm] = useState('');
  const [reactions, setReactions] = useState({});

  const newsArticles = [
    {
      title: 'Matric Results 2025 Released',
      date: '2026-01-13',
      summary: 'We are proud to announce the release of the 2025 matric results. Congratulations to our learners for their hard work and dedication. Eldomaine achieved an overall pass rate of 89%.',
    },
    {
      title: 'This section is quiet for now, but exciting updates are on the way. Keep an eye out!👀😄 ',
      date: '2026-00-00',
      summary: '',
    },
    {
      title: 'This section is quiet for now, but exciting updates are on the way. Keep an eye out!👀😄',
      date: '2026-00-00',
      summary: '',
    },
  ];

  const upcomingEvents = [
    { title: 'No upcoming events scheduled at the moment. Please check back soon for updates.', date: 'N/A' },
    { title: 'No upcoming events scheduled at the moment. Please check back soon for updates.', date: 'N/A' },
    { title: 'No upcoming events scheduled at the moment. Please check back soon for updates.', date: 'N/A' },
  ];

  const filteredArticles = newsArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReaction = (index, type) => {
    const prev = reactions[index];
    if (prev && prev[type] === 1) return;

    setReactions((prevState) => ({
      ...prevState,
      [index]: {
        like: type === 'like' ? 1 : 0,
        love: type === 'love' ? 1 : 0,
        wow: type === 'wow' ? 1 : 0,
      },
    }));
  };

  return (
    <div className="news-page">
      {/* HERO SECTION */}
      <Hero image={coverImg} title="Latest News from Eldomaine Secondary School." type="news" />

      {/* Intro Text */}
      <section className="news-intro">
        <h1>Eldomaine Secondary School News</h1>
        <p>Stay updated with school events and announcements</p>
      </section>

      {/* Search */}
      <div className="news-search">
        <input
          type="text"
          placeholder="Search news..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* News Articles */}
      <section className="news-articles-section">
        <h2>Latest News</h2>
        <div className="news-grid">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article, index) => (
              <motion.div
                key={index}
                className="news-card"
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <h3>
                  <FaNewspaper style={{ marginRight: '8px', color: '#007c5e' }} />
                  {article.title}
                </h3>
                <p className="news-date">{new Date(article.date).toDateString()}</p>
                <p>{article.summary}</p>

                <div className="news-reactions">
                  <button onClick={() => handleReaction(index, 'like')} className="reaction-btn">
                    <FaThumbsUp /> {reactions[index]?.like || 0}
                  </button>
                  <button onClick={() => handleReaction(index, 'love')} className="reaction-btn">
                    <FaHeart style={{ color: 'crimson' }} /> {reactions[index]?.love || 0}
                  </button>
                  <button onClick={() => handleReaction(index, 'wow')} className="reaction-btn">
                    <FaSmile style={{ color: 'gold' }} /> {reactions[index]?.wow || 0}
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="no-results">No news articles found.</p>
          )}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="school-calendar-section">
        <h2>Upcoming Events</h2>
        <ul className="calendar-list">
          {upcomingEvents.map((event, index) => (
            <motion.li
              key={index}
              className="calendar-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <FaCalendarAlt style={{ marginRight: '6px', color: '#007c5e' }} />
              <strong>{event.title}</strong> – {new Date(event.date).toDateString()}
            </motion.li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default News;
