import { useState } from 'react';
import './Contact.css'; // <-- MAKE SURE THIS IS HERE

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in your Name, Email, and Message.');
      return;
    }
    
    const subject = encodeURIComponent(`New Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone || 'Not provided'}\n\n` +
      `Message:\n${formData.message}`
    );
    
    window.location.href = `mailto:cityg0112@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) {
      alert('Please fill in your Name and Message.');
      return;
    }
    
    const text = encodeURIComponent(
      `Hello LOOP AUTOCAT MOTORS,\n\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email || 'Not provided'}\n` +
      `Phone: ${formData.phone}\n\n` +
      `Message:\n${formData.message}`
    );
    
    window.open(`https://wa.me/254750869201?text=${text}`, '_blank');
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-overlay">
          <h1>Get In Touch</h1>
          <p>We're here to help you find your perfect vehicle.</p>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-container">
          <div className="contact-info">
            <h2>Contact Information</h2>
            <p>Have questions about a vehicle or need assistance with financing? Reach out to our team.</p>
            
            <div className="info-cards">
              <div className="info-card">
                <div className="info-icon">📍</div>
                <div>
                  <h4>Visit Us</h4>
                  <p>Nairobi, Kenya<br/>(Exact location details)</p>
                </div>
              </div>
              <div className="info-card">
                <div className="info-icon">📞</div>
                <div>
                  <h4>Call Us</h4>
                  <p><a href="tel:+254799668000">+254 799 668 000</a></p>
                </div>
              </div>
              <div className="info-card">
                <div className="info-icon">✉️</div>
                <div>
                  <h4>Email Us</h4>
                  <p><a href="mailto:cityg0112@gmail.com">cityg0112@gmail.com</a></p>
                </div>
              </div>
              <div className="info-card">
                <div className="info-icon">⏰</div>
                <div>
                  <h4>Working Hours</h4>
                  <p>Mon - Sat: 8:00 AM - 6:00 PM<br/>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <h2>Send Us a Message</h2>
            <p className="form-subtitle">Fill out the form below and choose how you'd like to send it.</p>
            <form className="contact-form">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+254 7XX XXX XXX" />
                </div>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea name="message" rows="5" value={formData.message} onChange={handleChange} placeholder="How can we help you today?" required></textarea>
              </div>
              
              {/* THE TWO NEW BUTTONS */}
              <div className="form-actions">
                <button type="button" className="submit-btn email-btn" onClick={handleSendEmail}>
                  ✉️ Send via Email
                </button>
                <button type="button" className="submit-btn whatsapp-btn" onClick={handleSendWhatsApp}>
                  💬 Send via WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;