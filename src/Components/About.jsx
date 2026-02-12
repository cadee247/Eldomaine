import React, { useEffect } from 'react';
import { FaBullseye, FaEye, FaHandsHelping, FaSchool, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/About.css';
import coverImg from '../assets/cover.png'; // Hero image

// Error boundary for timeline
class TimelineErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error('Timeline error:', error, info);
  }
  render() {
    if (this.state.hasError) return <p>Timeline failed to load.</p>;
    return this.props.children;
  }
}

function About() {
  const testimonials = [
    { quote: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
    { quote: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
    { quote: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
    { quote: "Don’t let what you cannot do interfere with what you can do.", author: "John Wooden" },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  // Animate stats numbers
  useEffect(() => {
    const counters = document.querySelectorAll(".stat-number");
    const speed = 200;
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const inc = target / speed;
        if (count < target) {
          counter.innerText = Math.ceil(count + inc);
          setTimeout(updateCount, 20);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  }, []);

  return (
    <>
      {/* === HERO SECTION (MATCHING HOMEPAGE) === */}
      <main className="about-hero" style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <img
          src={coverImg}
          alt="Eldomaine High School"
          className="hero-image"
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
        />

        <motion.div
          className="hero-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            padding: '2rem 1rem',
            backgroundColor: 'rgba(0,0,0,0.3)',
            color: '#fff'
          }}
        >
          <motion.h1 initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
            About Eldomaine Secondary High School
          </motion.h1>
         
          </motion.div>
        

        <div
          className="scroll-down"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          style={{
            zIndex: 5,
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '3rem',
            color: '#00a87e',
            textShadow: '0 0 15px rgba(0,0,0,0.7)',
            cursor: 'pointer'
          }}
        >
          &#x2193;
        </div>
      </main>

      {/* === TIMELINE SECTION === */}
      <section className="about-section history-section">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Our Roots: A Timeline of Excellence
        </motion.h2>

        <TimelineErrorBoundary>
          <VerticalTimeline>
            <VerticalTimelineElement
              date="1985-1999"
              iconStyle={{ background: '#1c3d2a', color: '#fff' }}
              icon={<FaSchool />}
            >
              <h3>Founded in Eldorado Park</h3>
              <p>
                Eldomaine High School emerged as a beacon of hope for a community long underserved by the education system.
              </p>
              <ul>
                <li>Academic Commitment: Teachers and learners built a culture of discipline and achievement.</li>
                <li>Community Engagement: The school became a hub for local families.</li>
                <li>Resilience and Progress: Expanded curriculum and facilities despite limited resources.</li>
              </ul>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              date="2000–2020"
              iconStyle={{ background: '#1c3d2a', color: '#fff' }}
              icon={<FaStar />}
            >
              <h3>Growth and Development</h3>
              <ul>
                <li>Curriculum Expansion: STEM, Arts, Life Orientation added.</li>
                <li>Staff Growth: Over 60 educators supporting 1,200+ learners.</li>
                <li>Matric Success: Consistently above 80% pass rate.</li>
                <li>Community Impact: Trusted institution known for discipline and inclusivity.</li>
              </ul>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              date="Today"
              iconStyle={{ background: '#1c3d2a', color: '#fff' }}
              icon={<FaBullseye />}
            >
              <h3>Current Achievements</h3>
              <ul>
                <li>1,300 learners strong with 60+ educators.</li>
                <li>Quintile 4, no-fee school ensuring inclusivity.</li>
                <li>Legacy of excellence, discipline & unity.</li>
                <li>Community cornerstone for growth and transformation.</li>
              </ul>
            </VerticalTimelineElement>
          </VerticalTimeline>
        </TimelineErrorBoundary>
      </section>

      {/* === ACHIEVEMENTS SECTION === */}
      <section className="about-section achievements-section">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Excellence in Numbers & Voices
        </motion.h2>

        <p>
          Eldomaine offers a robust curriculum from Grade 8 to 12, emphasizing STEM, Arts, and Life Skills.
          With a consistent matric pass rate over 80%, we foster leadership, sports, and service.
        </p>

        <div className="stats-grid">
          <motion.div className="stat-box" whileHover={{ scale: 1.1 }}>
            <span className="stat-number" data-target="20000">20000</span>
            <p>Alumni Empowered Worldwide</p>
          </motion.div>

          <motion.div className="stat-box" whileHover={{ scale: 1.1 }}>
            <span className="stat-number" data-target="40">40</span>
            <p>Years of Excellence</p>
          </motion.div>

          <motion.div className="stat-box" whileHover={{ scale: 1.1 }}>
            <span className="stat-number" data-target="15">15</span>
            <p>Extracurricular Programs</p>
          </motion.div>
        </div>

        <Slider {...sliderSettings}>
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-slide">
              <p>"{t.quote}"</p>
              {t.author && <p>- {t.author}</p>}
            </div>
          ))}
        </Slider>
      </section>

      {/* === VALUES SECTION === */}
      <section className="about-section values-section">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Our Guiding Principles
        </motion.h2>

        <div className="about-highlights">
          <motion.div className="about-card" whileHover={{ scale: 1.05 }}>
            <FaBullseye className="about-icon" />
            <h3>Our Mission</h3>
            <p>Our mission is to be an outstanding and peaceful institution, which provides learning for life and addresses the changes in the educational system effectively. We pledge to equip teachers, create a positive learning environment, respect individual needs, and uphold our Constitution-based values.</p>
          </motion.div>

          <motion.div className="about-card" whileHover={{ scale: 1.05 }}>
            <FaEye className="about-icon" />
            <h3>Our Vision</h3>
            <p>Our vision is to have an educational institution built on discipline, educational excellence, and character building, giving our best in service to the school and community.</p>
          </motion.div>

          <motion.div className="about-card" whileHover={{ scale: 1.05 }}>
            <FaHandsHelping className="about-icon" />
            <h3>Core Values</h3>
            <ul className="values-list">
              <li><span className="icon"><FaStar /></span><span>Respect</span></li>
              <li><span className="icon"><FaStar /></span><span>Integrity</span></li>
              <li><span className="icon"><FaStar /></span><span>Excellence</span></li>
              <li><span className="icon"><FaStar /></span><span>Inclusivity</span></li>
              <li><span className="icon"><FaStar /></span><span>Community Service</span></li>
            </ul>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default About;
