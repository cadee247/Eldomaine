import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';
import badge from '../assets/Navbar/nav.png';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header className="navbar">
        <div className="nav-left">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/donations">Donations</Link>
          <Link to="/admissions">Admissions</Link>
          <Link to="/curriculum">Curriculum</Link>
        </div>

        <div className="nav-center">
          <img src={badge} alt="School Badge" className="school-badge" />
        </div>

        <div className="nav-right">
          <Link to="/events">Events</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/news">News</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/appointmentbooking">Appointment Booking</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Hamburger */}
        <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'show' : ''}`}>
        <div className="mobile-links">
          <Link onClick={toggleMenu} to="/">Home</Link>
          <Link onClick={toggleMenu} to="/about">About</Link>
          <Link onClick={toggleMenu} to="/donations">Donations</Link>
          <Link onClick={toggleMenu} to="/admissions">Admissions</Link>
          <Link onClick={toggleMenu} to="/curriculum">Curriculum</Link>
          <Link onClick={toggleMenu} to="/events">Events</Link>
          <Link onClick={toggleMenu} to="/faq">FAQ</Link>
          <Link onClick={toggleMenu} to="/news">News</Link>
          <Link onClick={toggleMenu} to="/gallery">Gallery</Link>
          <Link onClick={toggleMenu} to="/appointmentbooking">Appointment Booking</Link>
          <Link onClick={toggleMenu} to="/contact">Contact</Link>
        </div>
      </div>
    </>
  );
}


export default Navbar;

