import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaNewspaper,
  FaCalendarAlt,
  FaSearch,
  FaThumbsUp,
  FaHeart,
  FaSmile,
} from 'react-icons/fa';
import '../css/News.css';
import newsImage from '../assets/News/pic1.jpg';

function News() {
  const [searchTerm, setSearchTerm] = useState('');
  const [reactions, setReactions] = useState({});

  const newsArticles = [
    {
      title: 'Annual Science Fair Winners Announced',
      date: '2025-03-12',
      summary:
        'Our bright learners showcased amazing science projects. Congratulations to all winners!',
    },
    {
      title: 'Sports Day Highlights',
      date: '2025-05-05',
      summary:
        'A fun-filled day of teamwork and competition across all grades. Check out the highlights!',
    },
    {
      title: 'Matric Dance Success',
      date: '2025-09-20',
      summary:
        'An elegant evening celebrating the achievements of Grade 12 learners before graduation.',
    },
  ];

  const upcomingEvents = [
    { title: 'Parent-Teacher Meeting', date: '2025-11-10' },
    { title: 'School Holiday', date: '2025-12-15' },
    { title: 'First Day of New Term', date: '2026-01-12' },
  ];

  const filteredArticles = newsArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

const handleReaction = (index, type) => {
  const prev = reactions[index];

  // If the same reaction is clicked again, do nothing
  if (prev && prev[type] === 1) return;

  // Reset all reactions to 0, then set the new one to 1
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
      {/* Hero Image Section */}
  <section
  className="news-hero"
  style={{
    position: 'relative',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
  }}
>
  <img
    src="/src/assets/cover.png"
    alt="News Banner"
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
      <section className="news-intro">
        <h1>Eldomaine Secondary School News</h1>
        <p>Stay updated with school events and announcements</p>
      </section>

      {/* Search Bar */}
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
                  <FaNewspaper
                    style={{ marginRight: '8px', color: '#007c5e' }}
                  />
                  {article.title}
                </h3>
                <p className="news-date">
                  {new Date(article.date).toDateString()}
                </p>
                <p>{article.summary}</p>

                {/* Reactions */}
                <div className="news-reactions">
                  <button
                    onClick={() => handleReaction(index, 'like')}
                    className="reaction-btn"
                  >
                    <FaThumbsUp /> {reactions[index]?.like || 0}
                  </button>
                  <button
                    onClick={() => handleReaction(index, 'love')}
                    className="reaction-btn"
                  >
                    <FaHeart style={{ color: 'crimson' }} />{' '}
                    {reactions[index]?.love || 0}
                  </button>
                  <button
                    onClick={() => handleReaction(index, 'wow')}
                    className="reaction-btn"
                  >
                    <FaSmile style={{ color: 'gold' }} />{' '}
                    {reactions[index]?.wow || 0}
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="no-results">No news articles found.</p>
          )}
        </div>
      </section>

      {/* School Calendar */}
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
              <FaCalendarAlt
                style={{ marginRight: '6px', color: '#007c5e' }}
              />
              <strong>{event.title}</strong> –{' '}
              {new Date(event.date).toDateString()}
            </motion.li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default News;