import { useState, useEffect } from 'react';
import { getImageUrl } from '../../utils/helpers'; // Import the helper
import './ImageCarousel.css';

const ImageCarousel = ({ images, carName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextImage();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  if (!images || images.length === 0) return null;

  return (
    <div className="image-carousel">
      <div className="carousel-container">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="carousel-slide">
              {/* USE THE HELPER HERE */}
              <img src={getImageUrl(image)} alt={`${carName} - Image ${index + 1}`} />
            </div>
          ))}
        </div>
        
        {images.length > 1 && (
          <>
            <button className="carousel-btn prev" onClick={prevImage}>‹</button>
            <button className="carousel-btn next" onClick={nextImage}>›</button>
            <div className="carousel-dots">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
            <div className="image-counter">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageCarousel;