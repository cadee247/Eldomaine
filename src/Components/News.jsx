import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaNewspaper, FaCalendarAlt, FaThumbsUp, FaHeart, FaSmile } from 'react-icons/fa';
import '../css/News.css';
import coverImg from '../assets/cover.png';
import Hero from '../Components/Hero';

function News() {
  const [searchTerm, setSearchTerm] = useState('');
  const [reactions, setReactions] = useState(() => {
    // Load saved reactions from localStorage when component mounts
    const saved = localStorage.getItem('reactions');
    return saved ? JSON.parse(saved) : {};
  });

  // Save reactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('reactions', JSON.stringify(reactions));
  }, [reactions]);

  const newsArticles = [
    {
      title: 'Matric Results 2025 Released',
      date: '2026-01-13',
      summary:
        'We are proud to announce the release of the 2025 matric results. Congratulations to our learners for their hard work and dedication. Eldomaine achieved an overall pass rate of 89%.',
    },
    {
      title: 'Eldomain Secondary School Launches Its First Official Website',
      date: '2026-02-16',
      summary:
        "We are proud to announce the launch of Eldomain Secondary School’s very first official website. This marks a new chapter in our school’s journey, providing learners, parents, and the community with a digital hub for news, events, achievements, and resources. The website reflects our commitment to excellence in academics, sport, and community spirit. Scan the QR code below to explore the site and stay connected with everything happening at Eldomain Secondary School.",
    },
    {
      title: 'Class of 2026 Theme ',
      date: '2026-02-16',
      summary:
        " Eldomaine Secondary High School proudly announces the Class of 2026 theme: <strong>Dragon</strong>. Representing strength, wisdom, and ambition, the Dragon will guide this year’s spirit and celebrations. Congratulations to the Class of 2026 on embracing a theme that truly ignites the future.",
    },
  ];

  const upcomingAnnouncements = [
    { title: 'Matric Jackets Coming Soon.', date: 'Coming Soon' },
    { title: 'Our calendar is taking a short break. Upcoming events will be posted here as soon as they’re confirmed.😊', date: 'Date TBA' },
    { title: 'Our calendar is taking a short break. Upcoming events will be posted here as soon as they’re confirmed.😊', date: 'Date TBA' },
  ];

  const filteredArticles = newsArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReaction = (index, type) => {
    // If already reacted, block further clicks
    if (reactions[index]) return;

    setReactions((prevState) => {
      const updated = {
        ...prevState,
        [index]: {
          like: type === 'like' ? 1 : 0,
          love: type === 'love' ? 1 : 0,
          wow: type === 'wow' ? 1 : 0,
        },
      };
      return updated;
    });
  };

  const formatDate = (date) => {
    if (!date) return '';
    const parsed = Date.parse(date);
    return isNaN(parsed) ? date : new Date(date).toDateString();
  };

  return (
    <div className="news-page">
      {/* HERO SECTION */}
      <Hero
        image={coverImg}
        title="Latest News from Eldomaine Secondary School"
        type="news"
      />

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

                {article.date && (
                  <p className="news-date">{formatDate(article.date)}</p>
                )}

                {article.summary && <p>{article.summary}</p>}

                <div className="news-reactions">
                  <button
                    onClick={() => handleReaction(index, 'like')}
                    className="reaction-btn"
                    disabled={!!reactions[index]} // disable after first click
                  >
                    <FaThumbsUp /> {reactions[index]?.like || 0}
                  </button>

                  <button
                    onClick={() => handleReaction(index, 'love')}
                    className="reaction-btn"
                    disabled={!!reactions[index]}
                  >
                    <FaHeart style={{ color: 'crimson' }} />{' '}
                    {reactions[index]?.love || 0}
                  </button>

                  <button
                    onClick={() => handleReaction(index, 'wow')}
                    className="reaction-btn"
                    disabled={!!reactions[index]}
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

      {/* Upcoming Announcements */}
      <section className="school-calendar-section">
        <h2>Upcoming Announcements</h2>
        <ul className="calendar-list">
          {upcomingAnnouncements.map((event, index) => (
            <motion.li
              key={index}
              className="calendar-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <FaCalendarAlt style={{ marginRight: '6px', color: '#007c5e' }} />
              <strong>{event.title}</strong> – {formatDate(event.date)}
            </motion.li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default News;
