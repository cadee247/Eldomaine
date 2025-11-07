import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaInfoCircle, FaUserGraduate, FaBook, FaEnvelope, FaFilePdf } from 'react-icons/fa';
import '../css/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* School Info */}
        <div className="footer-info">
          <h3>Eldomaine Secondary High School</h3>
          <p>Empowering learners in Eldorado Park since 1985.</p>
          <p>📍 86 Mirage Road, Eldorado Park, Johannesburg, 1813</p>
          <p>📞 011 568 2280</p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><FaInfoCircle className="footer-icon" /><Link to="/about">About Us</Link></li>
            <li><FaUserGraduate className="footer-icon" /><Link to="/admissions">Admissions</Link></li>
            <li><FaBook className="footer-icon" /><Link to="/subjects">Subjects</Link></li>
            <li><FaEnvelope className="footer-icon" /><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://www.facebook.com/share/1EL2BVXx3L/" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/eldomaine_high?igsh=YnZlM2J3c3I5MTUx" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Matric Timetable */}
        <div className="footer-timetable">
          <h4>Matric Timetable</h4>
          <a 
            href="https://www.education.gov.za/Portals/0/Documents/Publications/2025/2025%20OCT%20NOV%20TIME%20TABLE.pdf"
            target="_blank" 
            rel="noopener noreferrer"
          >
            <FaFilePdf style={{ marginRight: '0.5rem' }} />
            Download PDF
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Eldomaine Secondary High School. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
