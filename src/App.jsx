// src/App.jsx
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Homepage from './Components/Homepage';
import About from './Components/About';
import Admissions from './Components/Admissions';
import Donations from './Components/Donation';
import Curriculum from './Components/Curriculum';
import Events from './Components/Events';
import FAQ from './Components/FAQ';
import News from './Components/News';
import Contact from './Components/Contact';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import AppointmentBooking from './Components/AppointmentBooking';
import SplashScreen from './Components/SplashScreen'; // import splash screen
import Gallery from './Components/Gallery';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      {!showSplash && (
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<About />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/curriculum" element={<Curriculum />} />
            <Route path="/events" element={<Events />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/news" element={<News />} />
            <Route path="/appointmentbooking" element={<AppointmentBooking />} />
            <Route path="/donations" element={<Donations />} />
            <Route path="/contact" element={<Contact />} />
           <Route path="/gallery" element={<Gallery />} />

          </Routes>
          <Footer />
        </Router>
      )}
    </>
  );
}

export default App;
