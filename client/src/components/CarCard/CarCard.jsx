import { Link } from 'react-router-dom';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import './CarCard.css';

const CarCard = ({ car }) => {
  return (
    <>
        <div className="car-card-luxury">
      <ImageCarousel images={car.images} carName={car.name} />
      
      <div className="car-card-content">
        <div className="car-card-header">
          <div>
            <p className="car-card-company">{car.company} • {car.bodyType} • {car.year}</p>
            <h3 className="car-card-name">{car.name}</h3>
          </div>
        </div>

        <div className="car-card-specs-grid">
          <div className="spec-badge">
            <span className="spec-icon"></span>
            <div className="spec-info">
              <span className="spec-value">{car.hp}</span>
              <span className="spec-label">HP</span>
            </div>
          </div>
          
          <div className="spec-badge">
            <span className="spec-icon">⚙️</span>
            <div className="spec-info">
              <span className="spec-value">{car.engineType}</span>
              <span className="spec-label">Engine</span>
            </div>
          </div>
          
          <div className="spec-badge">
            <span className="spec-icon">🔥</span>
            <div className="spec-info">
              <span className="spec-value">{car.cc}</span>
              <span className="spec-label">CC</span>
            </div>
          </div>
          
          <div className="spec-badge">
            <span className="spec-icon">📊</span>
            <div className="spec-info">
              <span className="spec-value">{car.mileage.toLocaleString()}</span>
              <span className="spec-label">Miles</span>
            </div>
          </div>
          
          <div className="spec-badge">
            <span className="spec-icon">⛽</span>
            <div className="spec-info">
              <span className="spec-value">{car.fuelType}</span>
              <span className="spec-label">Fuel</span>
            </div>
          </div>
          
          <div className="spec-badge">
            <span className="spec-icon"></span>
            <div className="spec-info">
              <span className="spec-value">{car.transmission}</span>
              <span className="spec-label">Trans</span>
            </div>
          </div>
        </div>

        
          <div className="car-card-price">
            <span className="price-value">${car.price.toLocaleString()}</span>

        <Link to={`/car/${car.id}`} className="car-card-cta">
          View Details
          <span className="arrow">→</span>
        </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default CarCard;