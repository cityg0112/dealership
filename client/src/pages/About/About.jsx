import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-overlay">
          <h1>About LOOP AUTOCAT</h1>
          <p>East Africa's Premier Destination for Luxury & Reliable Vehicles</p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-text">
            <h2>Our Story</h2>
            <p>
              Founded with a passion for automobiles and a commitment to excellence, 
              <strong> LOOP AUTOCAT MOTORS</strong> has grown to become a trusted name in the automotive industry. 
              We specialize in sourcing, inspecting, and delivering premium Japanese used cars and luxury vehicles 
              to discerning customers across East Africa and beyond.
            </p>
            <p>
              Every vehicle in our inventory undergoes a rigorous multi-point inspection to ensure it meets our 
              high standards of quality, safety, and performance. We don't just sell cars; we build lasting 
              relationships based on transparency and trust.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <h3>500+</h3>
            <p>Vehicles Sold</p>
          </div>
          <div className="stat-item">
            <h3>10+</h3>
            <p>Years of Experience</p>
          </div>
          <div className="stat-item">
            <h3>100%</h3>
            <p>Customer Satisfaction</p>
          </div>
          <div className="stat-item">
            <h3>24/7</h3>
            <p>Support Available</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="about-section dark-bg">
        <div className="about-container">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>Certified Quality</h3>
              <p>Every vehicle undergoes a rigorous 150-point inspection before it hits our lot.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Transparent Pricing</h3>
              <p>No hidden fees. What you see is what you pay, with flexible financing options.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌍</div>
              <h3>Global Sourcing</h3>
              <p>Direct access to premium auctions and dealerships in Japan and Europe.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Find Your Dream Car?</h2>
        <p>Explore our premium inventory or contact our team for personalized assistance.</p>
        <div className="cta-buttons">
          <Link to="/inventory" className="cta-btn primary">View Inventory</Link>
          <Link to="/contact" className="cta-btn secondary">Contact Us</Link>
        </div>
      </section>
    </div>
  );
};

export default About;