import { useParams, Link } from 'react-router-dom';
import { useCars } from '../../context/CarContext';
import ImageCarousel from '../../components/ImageCarousel/ImageCarousel';
import InquiryForm from '../../components/InquiryForm/InquiryForm';
import { getImageUrl } from '../../utils/helpers';
import './CarDetails.css';

const CarDetails = () => {
  const { id } = useParams();
  const { cars } = useCars();
  const car = cars.find(c => c.id === parseInt(id));

  if (!car) {
    return (
      <div className="not-found">
        <h2>Car Not Found</h2>
        <Link to="/inventory">Back to Inventory</Link>
      </div>
    );
  }

  return (
    <div className="car-details-page">
      <div className="car-details-header">
        <Link to="/inventory" className="back-btn">← Back to Inventory</Link>
        <h1>{car.name}</h1>
        <p className="car-subtitle">{car.company} • {car.bodyType}</p>
      </div>

      <div className="car-details-content">
        {/* LEFT SIDE: Image Carousel (replaces the single image) */}
        <div className="car-image-section">
          <ImageCarousel images={car.images} carName={car.name} />
        </div>

        {/* RIGHT SIDE: Details and Form */}
        <div className="car-info-section">
          <div className="price-tag">
            <span className="price-label">Price</span>
            <span className="price-value">${car.price.toLocaleString()}</span>
          </div>

          <div className="specs-grid">
            <div className="spec-item">
              <span className="spec-icon">🐎</span>
              <div>
                <p className="spec-label">Horsepower</p>
                <p className="spec-value">{car.hp} HP</p>
              </div>
            </div>
            <div className="spec-item">
              <span className="spec-icon">⚙️</span>
              <div>
                <p className="spec-label">Engine Type</p>
                <p className="spec-value">{car.engineType}</p>
              </div>
            </div>
            <div className="spec-item">
              <span className="spec-icon">🔥</span>
              <div>
                <p className="spec-label">Engine Capacity</p>
                <p className="spec-value">{car.cc} CC</p>
              </div>
            </div>
            <div className="spec-item">
              <span className="spec-icon">📊</span>
              <div>
                <p className="spec-label">Mileage</p>
                <p className="spec-value">{car.mileage.toLocaleString()} miles</p>
              </div>
            </div>
            <div className="spec-item">
              <span className="spec-icon">⛽</span>
              <div>
                <p className="spec-label">Fuel Type</p>
                <p className="spec-value">{car.fuelType}</p>
              </div>
            </div>
            <div className="spec-item">
              <span className="spec-icon">🔧</span>
              <div>
                <p className="spec-label">Transmission</p>
                <p className="spec-value">{car.transmission}</p>
              </div>
            </div>
          </div>

          <div className="description-section">
            <h3>Description</h3>
            <p>{car.description}</p>
          </div>

          {/* The Inquiry Form */}
          <InquiryForm carName={car.name} />
        </div>
      </div>
    </div>
  );
};

export default CarDetails;