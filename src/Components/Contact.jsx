import React, { useState } from 'react';
import '../css/Contact.css';
import coverImage from '../assets/cover.png';
import Hero from '../Components/Hero';
import {
  FaUser,
  FaEnvelope,
  FaTag,
  FaRegCommentDots,
  FaPaperPlane,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaSchool,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

function Contact() {
  const [showSuccess, setShowSuccess] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // Here you could send the data via API or email service
    // For demo purposes, we just show the popup

    setShowSuccess(true);

    setTimeout(() => setShowSuccess(false), 3000); // auto-hide after 3 seconds

    // Reset form fields
    e.target.reset();
  }

  return (
    <>
 
      <Hero image={coverImage} title="Get in touch with Eldomaine Secondary School." type="contact" />



      <section className="contact-intro">
        <h1>Get In Touch</h1>
        <p>We’d love to hear from you — connect, visit, or send us a message</p>
      </section>

      <section className="contact-cards-section">
        <div className="contact-card">
          <FaMapMarkerAlt className="card-icon" />
          <h3>Address</h3>
          <p>86 Mirage Road, Eldorado Park, Johannesburg, Gauteng</p>
        </div>

        <div className="contact-card">
          <FaPhoneAlt className="card-icon" />
          <h3>Contact Us</h3>
          <p>Phone: 011 568 2280</p>
          <p>Cell: 082 552 5187</p>
          <p>Email: eldomainehighschool@telkomsa.net</p>
        </div>

        <div className="contact-card">
          <FaSchool className="card-icon" />
          <h3>Principal</h3>
          <p>Mr. Pienaar</p>
        </div>
      </section>

      <section className="map-section">
        <iframe
          title="Eldomaine Secondary School Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3571.6921445692887!2d28.031218115062033!3d-26.307883983421624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9560cf0f362557%3A0x6e4f5ec585de3f!2s86%20Mirage%20Rd%2C%20Eldorado%20Park%2C%20Johannesburg!5e0!3m2!1sen!2sza!4v1697697988256!5m2!1sen!2sza"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      <section className="contact-form-section">
        <h2>Send Us a Message</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label className="input-icon">
            <FaUser className="icon" />
            <input type="text" name="name" placeholder="Your full name" required />
          </label>

          <label className="input-icon">
            <FaEnvelope className="icon" />
            <input type="email" name="email" placeholder="Your email address" required />
          </label>

          <label className="input-icon">
            <FaTag className="icon" />
            <input type="text" name="subject" placeholder="Subject" required />
          </label>

          <label className="input-icon">
            <FaRegCommentDots className="icon" />
            <textarea name="message" placeholder="Your message" rows="5" required></textarea>
          </label>

          <button type="submit" className="submit-btn">
            <FaPaperPlane className="icon" /> Send Message
          </button>
        </form>

        {showSuccess && (
          <motion.div
            className="success-popup"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <FaCheckCircle size={40} color="#007c5e" />
            <p>Your message has been sent successfully!</p>
          </motion.div>
        )}
      </section>
    </>
  );
}

export default Contact;
