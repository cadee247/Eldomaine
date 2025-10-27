import React, { useEffect, useState, useMemo, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaCalendarAlt, 
  FaSchool, 
  FaUsers, 
  FaChalkboardTeacher, 
  FaTrophy 
} from 'react-icons/fa';
import { MdHolidayVillage } from 'react-icons/md';
import '../css/Homepage.css';
import FloatingButton from './FloatingButton';
import pic7 from '../assets/Homepage/pic7.jpg';

// === Lazy Load Heavy Dependencies ===
const Motion = lazy(() => import('framer-motion').then(mod => ({ default: mod.motion })));
const BigCalendar = lazy(() =>
  import('react-big-calendar').then(mod => ({ default: mod.Calendar }))
);
const { dateFnsLocalizer } = require('react-big-calendar');
const { format, parse, startOfWeek, getDay } = require('date-fns');
const enUS = require('date-fns/locale/en-US');

const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

function Homepage({ onBook }) {
  const [nextHolidayCountdown, setNextHolidayCountdown] = useState('');
  const [schoolCloseCountdown, setSchoolCloseCountdown] = useState('');

  // === Static Calendar Data Memoized ===
  const schoolCalendar = useMemo(() => ({
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
  }), []);

  const events = useMemo(() => [
    { title: 'Term Start', start: schoolCalendar.termStart, end: schoolCalendar.termStart, allDay: true },
    { title: 'Term End', start: schoolCalendar.termEnd, end: schoolCalendar.termEnd, allDay: true },
    ...schoolCalendar.holidays.map(h => ({ title: h.name, start: h.date, end: h.date, allDay: true })),
  ], [schoolCalendar]);

  // === Countdown Updater ===
  useEffect(() => {
    const updateCountdowns = () => {
      const now = new Date();
      const upcomingHoliday = schoolCalendar.holidays.filter(h => h.date > now).sort((a, b) => a.date - b.date)[0];
      if (upcomingHoliday) {
        const diff = upcomingHoliday.date - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        setNextHolidayCountdown(`${upcomingHoliday.name} in ${days}d ${hours}h ${minutes}m`);
      } else setNextHolidayCountdown('No upcoming holidays');

      const diffClose = schoolCalendar.termEnd - now;
      if (diffClose > 0) {
        const days = Math.floor(diffClose / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffClose / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diffClose / (1000 * 60)) % 60);
        setSchoolCloseCountdown(`${days}d ${hours}h ${minutes}m until school closes`);
      } else setSchoolCloseCountdown('School term has ended');
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 60000);
    return () => clearInterval(interval);
  }, [schoolCalendar]);

  // === Stat Count Animation (Efficient) ===
  useEffect(() => {
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = +entry.target.dataset.target;
          let count = 0;
          const step = Math.ceil(target / 120);
          const update = () => {
            count += step;
            entry.target.textContent = count < target ? count : target;
            if (count < target) requestAnimationFrame(update);
          };
          update();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* === HERO SECTION === */}
      <main className="homepage">
        <img src={pic7} loading="lazy" alt="Eldomaine High School" className="hero-image" />
        <FloatingButton onClick={onBook} />
      </main>

      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Motion.div
          className="hero-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <h1>Ignite Your Future at Eldomaine Secondary High School</h1>
          <p>Where Ambition Meets Community in Eldorado Park, Johannesburg</p>
          <div>
            <Link to="/contact"><button>Contact Us</button></Link>
            <Link to="/admissions" style={{ marginLeft: '10px' }}><button>Admissions</button></Link>
          </div>
        </Motion.div>

        {/* === WELCOME SECTION === */}
        <Motion.section
          className="welcome-text"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h1><FaSchool className="icon" /> Our Story Unfolds</h1>
          <p><strong>Your Journey to Excellence Starts Here.</strong></p>
          <p>Located in Eldorado Park, Johannesburg, our school is more than a place of learning — it’s a vibrant community where ambition meets opportunity.</p>

          <div className="story-panels">
            {['Our Roots', 'Vibrant Community', 'Your Future'].map((title, i) => (
              <Motion.div key={i} className="panel" whileHover={{ scale: 1.05 }}>
                <h3>{title}</h3>
                <p>{
                  i === 0 ? 'Founded in the spirit of unity, Eldomaine has grown alongside Johannesburg’s dynamic history.' :
                  i === 1 ? 'Diverse students and dedicated educators create a nurturing space for growth.' :
                  'Join us to unlock your potential and achieve academic excellence.'
                }</p>
              </Motion.div>
            ))}
          </div>
        </Motion.section>

        {/* === CALENDAR SECTION === */}
        <Motion.section
          className="school-calendar"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2><FaCalendarAlt className="icon" /> School Calendar & Holidays</h2>

          <div className="calendar-container">
            <BigCalendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              toolbar={false}
              popup={false}
              views={['month']}
              style={{ height: 600, width: '100%', backgroundColor: '#fff', borderRadius: '10px', padding: '10px' }}
            />
          </div>

          <div className="calendar-grid">
            <div className="calendar-card"><h3><FaSchool className="icon" /> School Terms</h3>
              <div className="term-grid">
                <div><strong>Term 1:</strong> 15 Jan – 28 Mar</div>
                <div><strong>Term 2:</strong> 8 Apr – 27 Jun</div>
                <div><strong>Term 3:</strong> 22 Jul – 3 Oct</div>
                <div><strong>Term 4:</strong> 13 Oct – 12 Dec</div>
              </div>
            </div>

            <div className="calendar-card"><h3><MdHolidayVillage className="icon" /> Public Holidays</h3>
              <div className="holiday-grid">
                <div>Human Rights Day – 21 Mar</div>
                <div>Freedom Day – 27 Apr</div>
                <div>Workers Day – 1 May</div>
                <div>Youth Day – 16 Jun</div>
                <div>Women's Day – 9 Aug</div>
                <div>Heritage Day – 24 Sep</div>
              </div>
            </div>

            <div className="calendar-card"><h3><MdHolidayVillage className="icon" /> Next Holiday</h3>
              <p className="pulse">{nextHolidayCountdown}</p>
            </div>

            <div className="calendar-card"><h3>School Closing</h3>
              <p className="pulse">{schoolCloseCountdown}</p>
            </div>
          </div>
        </Motion.section>

        {/* === STATS SECTION === */}
        <Motion.section
          className="stats-section"
          id="stats"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2><FaTrophy className="icon" /> School Highlights</h2>
          <div className="stats-grid">
            <div className="stat-box"><FaUsers className="stat-icon" /><span className="stat-number" data-target="1308">0</span><p>Learners Enrolled</p></div>
            <div className="stat-box"><FaChalkboardTeacher className="stat-icon" /><span className="stat-number" data-target="60">0</span><p>Dedicated Educators</p></div>
            <div className="stat-box"><FaTrophy className="stat-icon" /><span className="stat-number" data-target="86">0</span><p>Matric Pass Rate (%)</p></div>
          </div>
        </Motion.section>
      </Suspense>
    </>
  );
}

export default Homepage;
