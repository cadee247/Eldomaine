import { useEffect, useState, lazy, Suspense, useMemo } from 'react';
import { 
  FaCalendarAlt, 
  FaSchool, 
  FaUsers, 
  FaChalkboardTeacher, 
  FaTrophy 
} from 'react-icons/fa';
import { MdHolidayVillage } from 'react-icons/md';
import { motion } from 'framer-motion';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import FloatingButton from './FloatingButton';
import { Link } from 'react-router-dom';
import '../css/Homepage.css';
import pic7 from '../assets/Homepage/pic7.jpg';


const locales = {
  'en-US': enUS,
};

// Lazy-load the BigCalendar component to reduce initial bundle size
const LazyBigCalendar = lazy(() => import('react-big-calendar').then(module => ({
  default: ({ events, style }) => {
    const localizer = module.dateFnsLocalizer({
      format,
      parse,
      startOfWeek,
      getDay,
      locales,
    });
    return (
      <module.Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        toolbar={false}
        popup={false}
        views={['month']}
        style={style}
      />
    );
  }
})));

function Homepage({ onBook }) {
  const [nextHolidayCountdown, setNextHolidayCountdown] = useState('');
  const [schoolCloseCountdown, setSchoolCloseCountdown] = useState('');

  // === SCHOOL CALENDAR DATA ===
  const schoolCalendar = {
    termStart: new Date('2025-01-15'),
    termEnd: new Date('2025-12-05'),
    holidays: [
      { name: 'Human Rights Day', date: new Date('2025-03-21') },
      { name: 'Freedom Day', date: new Date('2025-04-27') },
      { name: 'Workers Day', date: new Date('2025-05-01') },
      { name: 'Youth Day', date: new Date('2025-06-16') },
      { name: "National Women's Day", date: new Date('2025-08-09') },
      { name: 'Heritage Day', date: new Date('2025-09-24') },
      { name: 'Day of Reconciliation', date: new Date('2025-12-16') },
    ],
  };

  const events = useMemo(() => [
    {
      title: 'Term Start',
      start: schoolCalendar.termStart,
      end: schoolCalendar.termStart,
      allDay: true,
    },
    {
      title: 'Term End',
      start: schoolCalendar.termEnd,
      end: schoolCalendar.termEnd,
      allDay: true,
    },
    ...schoolCalendar.holidays.map(h => ({
      title: h.name,
      start: h.date,
      end: h.date,
      allDay: true,
    })),
  ], []);

  // === COUNTDOWN UPDATES ===
  const updateCountdowns = () => {
    const now = new Date();

    const upcomingHolidays = schoolCalendar.holidays.filter(h => h.date > now);
    const upcomingHoliday = upcomingHolidays.sort((a, b) => a.date - b.date)[0];
    if (upcomingHoliday) {
      const diff = upcomingHoliday.date - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      setNextHolidayCountdown(`${upcomingHoliday.name} in ${days}d ${hours}h ${minutes}m`);
    } else {
      setNextHolidayCountdown('No upcoming holidays');
    }

    const diffClose = schoolCalendar.termEnd - now;
    if (diffClose > 0) {
      const days = Math.floor(diffClose / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffClose / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diffClose / (1000 * 60)) % 60);
      setSchoolCloseCountdown(`${days}d ${hours}h ${minutes}m until school closes`);
    } else {
      setSchoolCloseCountdown('School term has ended');
    }
  };

  useEffect(() => {
    updateCountdowns();
    const interval = setInterval(updateCountdowns, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Preload hero image for maximum priority (above-the-fold critical resource)
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = pic7;
    link.imageSrcSet = pic7; // Optional: hint WebP if supported
    document.head.appendChild(link);
  }, []);

  // === COUNTUP ANIMATION FOR STATS (per-counter, once per view) ===
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = +counter.getAttribute('data-target');
          let count = 0;
          const increment = Math.ceil(target / 120); // Smooth ~2s animation
          const update = () => {
            count += increment;
            if (count < target) {
              counter.textContent = count;
              requestAnimationFrame(update);
            } else {
              counter.textContent = target;
            }
          };
          update();
          observer.unobserve(counter); // Animate only once
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(counter => observer.observe(counter));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* === HERO SECTION === */}
      <main
        className="homepage"
        style={{
          position: 'relative',
          height: '100vh',
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <picture>
          <source srcSet={pic7Webp} type="image/webp" />
          <img
            src={pic7}
            alt="Eldomaine High School"
            className="hero-image"
            loading="eager"
            fetchpriority="high"  // Highest fetch priority for critical above-the-fold image
            decoding="async"      // Non-blocking decode
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
              filter: 'blur(10px)', // LQIP-style placeholder (reveals sharply on load)
              transition: 'filter 0.5s ease',
            }}
            onLoad={(e) => e.target.style.filter = 'blur(0px)'}
          />
        </picture>
        <FloatingButton onClick={onBook} />
      </main>

      {/* === HERO TEXT SECTION === */}
      <motion.div
        className="hero-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{
          textAlign: 'center',
          padding: '2rem 1rem',
          backgroundColor: '#f9f9f9',
        }}
      >
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Ignite Your Future at Eldomaine Secondary High School
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Where Ambition Meets Community in Eldorado Park, Johannesburg
        </motion.p>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Link to="/contact">
            <button>Contact Us</button>
          </Link>
          <Link to="/admissions" style={{ marginLeft: '10px' }}>
            <button>Admissions</button>
          </Link>
        </motion.div>
      </motion.div>

      {/* === WELCOME SECTION === */}
      <motion.section
        className="welcome-text"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h1><FaSchool className="icon" /> Our Story Unfolds</h1>
        <p><strong>Your Journey to Excellence Starts Here.</strong></p>
        <p>
          Located in Eldorado Park, Johannesburg, our school is more than a place of learning — it’s a vibrant community where ambition meets opportunity.
        </p>

        <div className="story-panels">
          <motion.div className="panel" whileHover={{ scale: 1.05 }}>
            <h3>Our Roots</h3>
            <p>Founded in the spirit of unity, Eldomaine has grown alongside Johannesburg’s dynamic history.</p>
          </motion.div>
          <motion.div className="panel" whileHover={{ scale: 1.05 }}>
            <h3>Vibrant Community</h3>
            <p>Diverse students and dedicated educators create a nurturing space for growth.</p>
          </motion.div>
          <motion.div className="panel" whileHover={{ scale: 1.05 }}>
            <h3>Your Future</h3>
            <p>Join us to unlock your potential and achieve academic excellence.</p>
          </motion.div>
        </div>
      </motion.section>

      {/* === CALENDAR SECTION === */}
      <motion.section
        className="school-calendar"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2><FaCalendarAlt className="icon" /> School Calendar & Holidays</h2>

        <div className="calendar-container">
          <Suspense fallback={<div>Loading Calendar...</div>}>
            <LazyBigCalendar
              events={events}
              style={{
                height: 600,
                width: '100%',
                backgroundColor: '#fff',
                borderRadius: '10px',
                padding: '10px',
              }}
            />
          </Suspense>
        </div>

        <div className="calendar-grid">
          <motion.div className="calendar-card" whileHover={{ scale: 1.02 }}>
            <h3><FaSchool className="icon" /> School Terms</h3>
            <div className="term-grid">
              <div><strong>Term 1:</strong> 15 Jan – 28 Mar</div>
              <div><strong>Term 2:</strong> 8 Apr – 27 Jun</div>
              <div><strong>Term 3:</strong> 22 Jul – 3 Oct</div>
              <div><strong>Term 4:</strong> 13 Oct – 12 Dec</div>
            </div>
          </motion.div>

          <motion.div className="calendar-card" whileHover={{ scale: 1.02 }}>
            <h3><MdHolidayVillage className="icon" /> Public Holidays</h3>
            <div className="holiday-grid">
              <div>Human Rights Day – 21 Mar</div>
              <div>Freedom Day – 27 Apr</div>
              <div>Workers Day – 1 May</div>
              <div>Youth Day – 16 Jun</div>
              <div>Women's Day – 9 Aug</div>
              <div>Heritage Day – 24 Sep</div>
              <div>Day of Reconciliation – 16 Dec</div> {/* Added missing holiday for completeness */}
            </div>
          </motion.div>

          <motion.div className="calendar-card" whileHover={{ scale: 1.02 }}>
            <h3><MdHolidayVillage className="icon" /> Next Holiday</h3>
            <motion.p animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
              {nextHolidayCountdown}
            </motion.p>
          </motion.div>

          <motion.div className="calendar-card" whileHover={{ scale: 1.02 }}>
            <h3>School Closing</h3>
            <motion.p animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
              {schoolCloseCountdown}
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* === STATS SECTION === */}
      <motion.section
        className="stats-section"
        id="stats"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2><FaTrophy className="icon" /> School Highlights</h2>
        <div className="stats-grid">
          <motion.div className="stat-box" whileHover={{ scale: 1.1 }}>
            <FaUsers className="stat-icon" />
            <span className="stat-number" data-target="1308">0</span>
            <p>Learners Enrolled</p>
          </motion.div>
          <motion.div className="stat-box" whileHover={{ scale: 1.1 }}>
            <FaChalkboardTeacher className="stat-icon" />
            <span className="stat-number" data-target="60">0</span>
            <p>Dedicated Educators</p>
          </motion.div>
          <motion.div className="stat-box" whileHover={{ scale: 1.1 }}>
            <FaTrophy className="stat-icon" />
            <span className="stat-number" data-target="86">0</span>
            <p>Matric Pass Rate (%)</p>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}

export default Homepage;
