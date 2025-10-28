import React, { useEffect, useState } from 'react';
import { FaBullseye, FaEye, FaHandsHelping, FaSchool, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/About.css';
import pic5 from '../assets/About/pic5.jpg';

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
    console.error("Timeline error:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return <p>Timeline failed to load.</p>;
    }
    return this.props.children;
  }
}

function About() {
  const [loaded, setLoaded] = useState(false);

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

  // ✅ Preload hero image before component renders
  useEffect(() => {
    const img = new Image();
    img.src = pic5;
    img.onload = () => setLoaded(true);
  }, []);

  // Animate stats numbers with IntersectionObserver
  useEffect(() => {
    const counters = document.querySelectorAll(".stat-number");
    const options = { threshold: 0.5 };

    const animateCount = (entry) => {
      if (!entry.isIntersecting) return;
      counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        const speed = 200;
        let count = +counter.innerText;
        const inc = target / speed;
        const update = () => {
          count = Math.ceil(count + inc);
          if (count < target) {
            counter.innerText = count;
            requestAnimationFrame(update);
          } else {
            counter.innerText = target;
          }
        };
        update();
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(animateCount);
    }, options);

    counters.forEach(counter => observer.observe(counter));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section
        className="about-hero"
        style={{
          position: 'relative',
          overflow: 'hidden',
          height: '80vh',
          backgroundColor: '#f4f4f4', // fallback while loading
        }}
      >
        {loaded && (
          <img
            src={pic5}
            alt="Eldomaine High School"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}
      </section>

      {/* TIMELINE SECTION */}
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
            <VerticalTimelineElement date="1985-1999" iconStyle={{ background: '#1c3d2a', color: '#fff' }} icon={<FaSchool />}>
              <h3>Founded in Eldorado Park</h3>
              <p>
                Eldomaine High School emerged in Eldorado Park as a beacon of hope for a community long underserved by the education system. In its early years, the school focused on creating access to quality learning for all, especially during a time of social transition in South Africa.
              </p>
              <ul>
                <li>Academic Commitment: Teachers and learners worked together to build a culture of discipline and achievement.</li>
                <li>Community Engagement: The school became a hub for local families, promoting unity and empowerment.</li>
                <li>Resilience and Progress: Despite limited resources, Eldomaine expanded its curriculum and facilities.</li>
              </ul>
            </VerticalTimelineElement>

            <VerticalTimelineElement date="2000–2020" iconStyle={{ background: '#1c3d2a', color: '#fff' }} icon={<FaStar />}>
              <h3>Growth and Development</h3>
              <p>
                From the early 2000s through 2020, Eldomaine High School solidified its reputation as a center of academic excellence and community leadership in Eldorado Park.
              </p>
              <ul>
                <li>Curriculum Expansion: STEM, Arts, and Life Orientation were added.</li>
                <li>Staff Growth: By 2020, over 60 educators supported 1,200+ learners.</li>
                <li>Matric Success: Consistently above 80% pass rate; 2020: 74/82 passed.</li>
                <li>Community Impact: Trusted institution known for discipline, inclusivity, and learner support.</li>
              </ul>
            </VerticalTimelineElement>

            <VerticalTimelineElement date="Today" iconStyle={{ background: '#1c3d2a', color: '#fff' }} icon={<FaBullseye />}>
              <h3>Current Achievements</h3>
              <ul>
                <li>1,300 Learners Strong: Inclusive school community serving Eldorado Park families.</li>
                <li>60+ Dedicated Educators: Committed to excellence, mentorship, and lifelong learning.</li>
                <li>Quintile 4, No-Fee School: Quality education without financial barriers.</li>
                <li>Legacy of Discipline & Unity: Respectful culture, strong values, peaceful coexistence.</li>
                <li>Community Impact: A cornerstone of hope, growth, and transformation in Johannesburg.</li>
              </ul>
            </VerticalTimelineElement>
          </VerticalTimeline>
        </TimelineErrorBoundary>
      </section>

      {/* ACHIEVEMENTS SECTION */}
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
            <span className="stat-number" data-target="20000">0</span>
            <p>Alumni Empowered Worldwide</p>
          </motion.div>

          <motion.div className="stat-box" whileHover={{ scale: 1.1 }}>
            <span className="stat-number" data-target="40">0</span>
            <p>Years of Excellence</p>
          </motion.div>

          <motion.div className="stat-box" whileHover={{ scale: 1.1 }}>
            <span className="stat-number" data-target="15">0</span>
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

      {/* MISSION, VISION & VALUES */}
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
              Our mission is to be an outstanding and peaceful institution, providing learning for life and addressing changes in the educational system effectively. In attempting to realize the above, we pledge to:
            </p>
            <ul>
              <li>Equip ourselves as teachers with the skills required to meet curriculum demands.</li>
              <li>Create an environment for positive learning and maintain educational excellence.</li>
              <li>Respect the individual needs of all learners, parents, and educators.</li>
              <li>Utilize the capacity of parents and Governing Body extensively for the school's benefit.</li>
              <li>Uphold the Constitution of South Africa to enhance peaceful co-existence.</li>
              <li>Seek the grace of our Creator at all times in our school and community.</li>
            </ul>
          </motion.div>

          <motion.div className="about-card" whileHover={{ scale: 1.05 }}>
            <FaEye className="about-icon" />
            <h3>Our Vision</h3>
            <p>Our vision is to have an educational institution built on discipline, excellence, and character building.</p>
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
