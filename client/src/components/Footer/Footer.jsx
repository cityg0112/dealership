import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>LOOP AUTOCAT MOTORS</h3>
          <p>Your trusted partner in finding the perfect vehicle. Quality, reliability, and performance.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/inventory">Inventory</Link></li>
            <li><Link to="/login">Admin Login</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>📍 123 Auto Drive, Motor City</p>
          <p>📞 +1 (555) 123-4567</p>
          <p>✉️ info@loopautocat.com</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} LOOP AUTOCAT MOTORS. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;