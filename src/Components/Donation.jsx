import React, { useState } from 'react';
import '../css/Donations.css';
import { FaTint, FaPencilRuler, FaBookOpen } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import bannerImg from '../assets/cover.png';
import Hero from '../components/Hero'; // Reusable Hero component

function Donation() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount) {
      alert('Please fill in all fields.');
      return;
    }
    alert(`Thank you, ${name}, for your donation of R${amount}!`);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
    setName('');
    setAmount('');
  };

  const donationItems = [
    {
      icon: <FaTint className="donation-icon" />,
      title: 'Water Supply Upgrade',
      description: 'Goal: R1,000,000 to improve water facilities for all students.',
    },
    {
      icon: <FaPencilRuler className="donation-icon" />,
      title: 'School Stationery & Uniform Donations',
      description: 'Support learners with essential stationery and uniforms.',
    },
    {
      icon: <FaBookOpen className="donation-icon" />,
      title: 'Educational Resources and Books',
      description: 'Help build libraries and provide educational materials.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <>
      {/* HERO SECTION */}
      <Hero image={bannerImg} title="Donation Page" type="donation" />

      {/* MAIN CONTENT */}
      <section className="donation-page">
        {showConfetti && <Confetti />}

        <motion.div
          className="donation-blocks"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {donationItems.map((item, index) => (
            <motion.div
              key={index}
              className="donation-block"
              variants={itemVariants}
              whileHover="hover"
            >
              {item.icon}
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="donation-form-block"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2>Make a Donation</h2>
          <form className="donation-form" onSubmit={handleSubmit}>
            <label>
              Your Name
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>

            <label>
              Donation Amount (ZAR)
              <input
                type="number"
                placeholder="e.g., 500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                min="1"
              />
            </label>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Donate Now
            </motion.button>
          </form>
        </motion.div>

        <motion.div
          className="donation-contact"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2>Contact & Queries</h2>
          <p>
            📧 Email: info@eldomaine.school.za<br />
            ☎️ Phone: +27 11 568 2280<br />
            📍 Address: 86 Mirage Road, Eldorado Park, Johannesburg
          </p>
        </motion.div>
      </section>
    </>
  );
}

export default Donation;
