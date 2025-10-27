import React, { useEffect } from 'react';
import {
  FaUserGraduate,
  FaClipboardList,
  FaFileAlt,
  FaChalkboardTeacher,
  FaCheckCircle,
  FaSchool
} from 'react-icons/fa';
import admissionImage from '../assets/Admission/pic3.jpg';
// import admissionImageWebpSmall from '../assets/Admission/pic3-small.webp'; // Add optimized WebP variants
// import admissionImageWebpMedium from '../assets/Admission/pic3-medium.webp';
// import admissionImageWebpLarge from '../assets/Admission/pic3-large.webp';
import '../css/Admissions.css';
import { motion, useAnimation } from 'framer-motion';

function Admissions() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.02, transition: { duration: 0.3 } }
  };

  const stepControls = useAnimation();

  useEffect(() => {
    stepControls.start('visible');
  }, [stepControls]);

  const stepVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: i * 0.3 }
    })
  };

  return (
    <>
      {/* HERO IMAGE — FULL SCREEN, NO TEXT OVERLAY */}
      <section className="admission-hero">
        <img
          src={admissionImage}
          // srcSet={`${admissionImageWebpSmall} 480w, ${admissionImageWebpMedium} 768w, ${admissionImageWebpLarge} 1200w`} // Uncomment and add imports for WebP
          // sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, 1200px"
          alt="Admission Banner"
          className="admission-hero-img"
          loading="eager"  // Eager loading for above-the-fold hero image
          style={{
            filter: 'blur(10px)', // Initial blur for placeholder effect
            transition: 'filter 0.5s ease', // Smooth reveal
          }}
          onLoad={(e) => e.target.style.filter = 'blur(0px)'}
        />
      </section>

      {/* TEXT SECTION BELOW IMAGE */}
      <section className="admission-intro">
        <h1><FaSchool className="icon" /> Admission Enquiry</h1>
        <p>Start your journey with Eldomaine Secondary School</p>
      </section>

      {/* MAIN CONTENT */}
      <motion.section
        className="admission-form-section"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Eligibility */}
        <motion.div className="admission-card" variants={itemVariants} whileHover="hover">
          <FaUserGraduate className="admission-icon" />
          <h2>Admission Eligibility</h2>
          <ul>
            <li>Completed Grade 7 at a recognized primary school.</li>
            <li>Priority for Eldorado Park and nearby communities.</li>
            <li>Submit proof of residence, birth certificate, and latest report.</li>
          </ul>
        </motion.div>

        {/* Application Process */}
        <motion.div className="admission-card" variants={itemVariants} whileHover="hover">
          <FaClipboardList className="admission-icon" />
          <h2>Application Process</h2>

          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="admission-step"
              custom={i}
              initial="hidden"
              animate={stepControls}
              variants={stepVariants}
            >
              {i === 0 && (
                <>
                  <h3><FaFileAlt /> 1. Collect Application Forms</h3>
                  <p>Available at the school office (Mon–Fri, 08:00–15:00).</p>
                </>
              )}
              {i === 1 && (
                <>
                  <h3><FaFileAlt /> 2. Submit Required Documents</h3>
                  <ul>
                    <li>Completed form</li>
                    <li>Certified birth certificate</li>
                    <li>Latest school report</li>
                    <li>Proof of residence</li>
                    <li>Parent/guardian ID copy</li>
                  </ul>
                </>
              )}
              {i === 2 && (
                <>
                  <h3><FaChalkboardTeacher /> 3. Interview & Placement Review</h3>
                  <p>Selected applicants may be invited for an interview.</p>
                </>
              )}
              {i === 3 && (
                <>
                  <h3><FaCheckCircle /> 4. Acceptance Notification</h3>
                  <p>Final decisions via SMS or phone call.</p>
                </>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* What We Offer */}
        <motion.div className="admission-card" variants={itemVariants} whileHover="hover">
          <FaSchool className="admission-icon" />
          <h2>What We Offer</h2>
          <ul>
            <li>CAPS-aligned curriculum (Grade 8–12)</li>
            <li>Focus on Maths, Sciences, Technology, Languages</li>
            <li>Life Orientation & Creative Arts</li>
            <li>Support programs & dedicated educators</li>
            <li>Safe, inclusive learning environment</li>
          </ul>
        </motion.div>
      </motion.section>
    </>
  );
}

export default Admissions;
