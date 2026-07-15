import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="navbar-logo">
          <Link to="/" onClick={closeMenu}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0', fontSize: '1.1rem', lineHeight: '1.1', color: 'var(--text-primary)' }}>
              LOOP AUTOCAT 
              <span style={{ color: '#DAA428', fontSize: '0.85rem', fontWeight: '600' }}>motors</span>
            </div>
          </Link>
        </div>

        {/* Hamburger Menu Button (Mobile Only) */}
        <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle navigation">
          <span className={isMenuOpen ? 'bar open' : 'bar'}></span>
          <span className={isMenuOpen ? 'bar open' : 'bar'}></span>
          <span className={isMenuOpen ? 'bar open' : 'bar'}></span>
        </button>

        {/* Navigation Links */}
        <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/inventory" onClick={closeMenu}>Inventory</Link></li>
          <li><Link to="/about" onClick={closeMenu}>About Us</Link></li>
          <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
          
          {isAdmin && (
            <li><Link to="/admin" onClick={closeMenu}>Admin</Link></li>
          )}

          {/* Mobile Action Button */}
          <li className="mobile-action">
            {!isAdmin ? (
              <Link to="/inventory" className="nav-btn" onClick={closeMenu}>Browse Cars</Link>
            ) : (
              <button onClick={handleLogout} className="nav-btn logout-btn">LogOut</button>
            )}
          </li>
        </ul>

        {/* Desktop Action Button */}
        <div className="desktop-action">
          {!isAdmin ? (
            <Link to="/inventory" className="nav-btn">Browse Cars</Link>
          ) : (
            <button onClick={handleLogout} className="nav-btn logout-btn">LogOut</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;