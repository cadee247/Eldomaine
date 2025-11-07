import React, { useEffect } from 'react';
import { FaBullseye, FaEye, FaHandsHelping, FaSchool, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/About.css';
import coverImg from '../assets/cover.png'; // ✅ Hero image
import Hero from '../components/Hero'; // Your reusable Hero component

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
    { quote: 'Start where you are. Use what you have. Do what you can.', author: 'Arthur Ashe' },
    { quote: 'Education is the most powerful weapon which you can use to change the world.', author: 'Nelson Mandela' },
    { quote: 'Success is not final, failure is not fatal: It is the courage to continue that counts.', author: 'Winston Churchill' },
    { quote: 'Don’t let what you cannot do interfere with what you can do.', author: 'John Wooden' },
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

  // Stats counter animation
  useEffect(() => {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
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
      {/* === HERO SECTION (REUSABLE) === */}
      <Hero image={coverImg} title="About Page" type="about" />

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
              date="1985–1999"
              iconStyle={{ background: '#1c3d2a', color: '#fff' }}
              icon={<FaSchool />}
            >
              <h3>Founded in Eldorado Park</h3>
              <p>
                Eldomaine High School emerged as a beacon of hope for a community long underserved by the
                education system.
              </p>
              <ul>
                <li>Built a foundation for excellence and discipline.</li>
                <li>Served as a hub for family and community growth.</li>
                <li>Expanded facilities and curriculum despite challenges.</li>
              </ul>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              date="2000–2020"
              iconStyle={{ background: '#1c3d2a', color: '#fff' }}
              icon={<FaStar />}
            >
              <h3>Growth and Development</h3>
              <ul>
                <li>Expanded curriculum: STEM, Arts, Life Orientation.</li>
                <li>60+ staff supporting 1,200 learners.</li>
                <li>Matric pass rate above 80%.</li>
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
                <li>Continuing legacy of excellence and unity.</li>
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
          With a consistent matric pass rate over 90%, we foster leadership, sports, and service.
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
            <p>
              To be an outstanding and peaceful institution providing lifelong learning while embracing
              change with integrity and unity.
            </p>
          </motion.div>

          <motion.div className="about-card" whileHover={{ scale: 1.05 }}>
            <FaEye className="about-icon" />
            <h3>Our Vision</h3>
            <p>
              An institution built on discipline, excellence, and character — shaping future leaders
              through service and learning.
            </p>
          </motion.div>

          <motion.div className="about-card" whileHover={{ scale: 1.05 }}>
            <FaHandsHelping className="about-icon" />
            <h3>Core Values</h3>
            <ul className="values-list">
              <li><FaStar /> Respect</li>
              <li><FaStar /> Integrity</li>
              <li><FaStar /> Excellence</li>
              <li><FaStar /> Inclusivity</li>
              <li><FaStar /> Community Service</li>
            </ul>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default About;
