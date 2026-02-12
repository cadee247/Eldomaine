import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaUser,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaClipboardList,
  FaEnvelope,
  FaCheckCircle
} from 'react-icons/fa';
import '../css/AppointmentBooking.css';
import coverImage from '../assets/cover.png'; // Hero image
import Hero from '../Components/Hero'; // Reusable Hero component

function AppointmentRequest() {
  const [formData, setFormData] = useState({
    parentName: '',
    parentSurname: '',
    parentEmail: '',
    studentName: '',
    studentSurname: '',
    grade: '',
    reason: '',
    date: '',
    teacher: 'Select Teacher',
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const teachers = [
    'Select Teacher',
    'Mr Pienaar',
    'Mr Fernades',
    'Ms Titus',
    'Ms Ngwenya',
    'Ms Richards',
    'Ms Wright',
    'Ms Symallon',
    'Ms Sitole',
  ];

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { parentName, parentSurname, parentEmail, studentName, studentSurname, grade, teacher, date, reason } = formData;

    if (teacher === 'Select Teacher') {
      alert('Please select a teacher before sending your request.');
      return;
    }

    const subject = encodeURIComponent(`Appointment Request for ${studentName} ${studentSurname}`);
    const body = encodeURIComponent(
      `Parent: ${parentName} ${parentSurname}\n` +
      `Parent Email: ${parentEmail}\n` +
      `Student: ${studentName} ${studentSurname}\n` +
      `Grade: ${grade}\n` +
      `Teacher: ${teacher}\n` +
      `Preferred Date: ${date}\n` +
      `Reason: ${reason}`
    );

    // Open default email client with prefilled email
    window.location.href = `mailto:eldomainehighschool@telkomsa.net?subject=${subject}&body=${body}`;

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

    // Reset form
    setFormData({
      parentName: '',
      parentSurname: '',
      parentEmail: '',
      studentName: '',
      studentSurname: '',
      grade: '',
      reason: '',
      date: '',
      teacher: 'Select Teacher',
    });
  }

  return (
    <>

      <Hero image={coverImage} title="Book your appointment with Eldomaine Secondary School today." type="appointments" />


      <motion.section
        className="appointment-request"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2 initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>
          Request a Meeting with a Teacher
        </motion.h2>

        <div className="appointment-note">
          <strong>NB:</strong> Meetings are available Monday to Thursday.
          Weekends and public holidays are unavailable. Each meeting lasts one hour and must be booked in advance.
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="appointment-form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="form-grid">
            <div className="form-group">
              <label><FaUser /> Parent Name</label>
              <input
                name="parentName"
                placeholder="Parent First Name"
                value={formData.parentName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label><FaUser /> Parent Surname</label>
              <input
                name="parentSurname"
                placeholder="Parent Surname"
                value={formData.parentSurname}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label><FaEnvelope /> Parent Email</label>
              <input
                name="parentEmail"
                type="email"
                placeholder="example@email.com"
                value={formData.parentEmail}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label><FaUser /> Student Name</label>
              <input
                name="studentName"
                placeholder="Student First Name"
                value={formData.studentName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label><FaUser /> Student Surname</label>
              <input
                name="studentSurname"
                placeholder="Student Surname"
                value={formData.studentSurname}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label><FaClipboardList /> Student Grade</label>
              <select name="grade" value={formData.grade} onChange={handleChange} required>
                <option value="">Select Grade</option>
                {[8, 9, 10, 11, 12].map((grade) => (
                  <option key={grade} value={grade}>Grade {grade}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label><FaChalkboardTeacher /> Teacher</label>
              <select name="teacher" value={formData.teacher} onChange={handleChange} required>
                {teachers.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label><FaCalendarAlt /> Preferred Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="form-group form-textarea">
              <label><FaEnvelope /> Reason for Appointment</label>
              <textarea
                name="reason"
                placeholder="Brief description of the meeting"
                value={formData.reason}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <motion.button
            type="submit"
            className="submit-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEnvelope style={{ marginRight: '6px' }} /> Send Request
          </motion.button>
        </motion.form>

        {showSuccess && (
          <motion.div
            className="success-popup"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <FaCheckCircle size={40} color="#007c5e" />
            <p>Your appointment request has been prepared in your email client!</p>
          </motion.div>
        )}
      </motion.section>
    </>
  );
}

export default AppointmentRequest;
