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

// IMPORT dateFnsLocalizer DIRECTLY
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';

const locales = { 'en-US': enUS };

// Lazy-load only the Calendar component wrapper
const LazyCalendar = lazy(() => import('react-big-calendar').then(module => ({ default: module.Calendar })));

function Homepage({ onBook }) {
  const [nextHolidayCountdown, setNextHolidayCountdown] = useState('');
  const [schoolCloseCountdown, setSchoolCloseCountdown] = useState('');
  const [imgLoaded, setImgLoaded] = useState(false);

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
    ...schoolCalendar.holidays.map(h => ({ title: h.name, start: h.date, end: h.date, allDay: true }))
  ], [schoolCalendar]);

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
  }, [schoolCalendar]);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = pic7;
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = +counter.getAttribute('data-target');
          let count = 0;
          const increment = Math.ceil(target / 120);
          const update = () => {
            count += increment;
            counter.textContent = count < target ? count : target;
            if (count < target) requestAnimationFrame(update);
          };
          update();
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(counter => observer.observe(counter));
    return () => observer.disconnect();
  }, []);

  // CREATE LOCALIZER ONCE
  const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

  return (
    <>
      {/* HERO */}
      <main className="homepage" style={{ position: 'relative', height: '100vh', overflow: 'hidden', width: '100%' }}>
        <picture>
          <source srcSet={pic7} type="image/webp" />
          <img
            src={pic7}
            alt="Eldomaine High School"
            className="hero-image"
            loading="eager"
            fetchpriority="high"
            decoding="async"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
              filter: imgLoaded ? 'blur(0px)' : 'blur(10px)',
              transition: 'filter 0.5s ease',
            }}
            onLoad={() => setImgLoaded(true)}
          />
        </picture>
        {/* <FloatingButton onClick={onBook} /> */}
      </main>

      {/* HERO TEXT */}
      <motion.div className="hero-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} style={{ textAlign: 'center', padding: '2rem 1rem', backgroundColor: '#f9f9f9' }}>
        <motion.h1 initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
          Ignite Your Future at Eldomaine Secondary High School
        </motion.h1>
        <motion.p initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}>
          Where Ambition Meets Community in Eldorado Park, Johannesburg
        </motion.p>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 1 }}>
          <Link to="/contact"><button>Contact Us</button></Link>
          <Link to="/admissions" style={{ marginLeft: '10px' }}><button>Admissions</button></Link>
        </motion.div>
      </motion.div>

      {/* CALENDAR */}
      <motion.section className="school-calendar" initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }}>
        <h2><FaCalendarAlt className="icon" /> School Calendar & Holidays</h2>
        <div className="calendar-container">
          <Suspense fallback={<div>Loading Calendar...</div>}>
            <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" toolbar={false} views={['month']} style={{ height: 600, width: '100%', backgroundColor: '#fff', borderRadius: '10px', padding: '10px' }} />
          </Suspense>
        </div>
      </motion.section>
    </>
  );
}

export default Homepage;
