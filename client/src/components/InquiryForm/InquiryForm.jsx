import './InquiryForm.css';

const InquiryForm = ({ carName }) => {
  // Contact details
  const whatsappNumber = "254799668000"; // No '+' or '00' for wa.me links
  const emailAddress = "cityg0112@gmail.com";
  
  // Pre-fill messages with the car's name
  const whatsappMessage = encodeURIComponent(`Hello, I am interested in the ${carName}. Please provide more details and availability.`);
  const emailSubject = encodeURIComponent(`Inquiry about ${carName}`);
  const emailBody = encodeURIComponent(`Hello LOOP AUTOCAT MOTORS,\n\nI am interested in the ${carName}.\n\nPlease provide more details, availability, and any next steps.\n\nThank you.`);

  // Generate the links
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  const emailLink = `mailto:${emailAddress}?subject=${emailSubject}&body=${emailBody}`;

  return (
    <div className="inquiry-section">
      <h3>Inquire About This Vehicle</h3>
      <p>Ready to make this yours? Contact us directly for a quick response!</p>
      
      <div className="inquiry-buttons">
        <a 
          href={whatsappLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inquiry-btn whatsapp-btn"
        >
          <span className="icon">💬</span> Chat on WhatsApp
        </a>
        
        <a 
          href={emailLink} 
          className="inquiry-btn email-btn"
        >
          <span className="icon">✉️</span> Send an Email
        </a>
      </div>
    </div>
  );
};

export default InquiryForm;