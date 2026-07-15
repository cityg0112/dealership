import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCars } from '../../context/CarContext';
import CarCard from '../../components/CarCard/CarCard';
import './Home.css';

const Home = () => {
  const { cars } = useCars();
  const navigate = useNavigate();
  
  // Get up to 8 featured vehicles
  const featuredCars = cars.slice(0, 8);

  // Dynamic options for search (same logic as Inventory)
  const uniqueOptions = useMemo(() => {
    const companies = [...new Set(cars.map(car => car.company).filter(Boolean))];
    const bodyTypes = [...new Set(cars.map(car => car.bodyType).filter(Boolean))];
    return { companies, bodyTypes };
  }, [cars]);

  // Search state
  const [searchCompany, setSearchCompany] = useState('');
  const [searchBodyType, setSearchBodyType] = useState('');
  const [searchMaxPrice, setSearchMaxPrice] = useState('');

  // Handle Search Button Click
  const handleSearch = (e) => {
    e.preventDefault();
    
    // Build query string from non-empty values
    const params = new URLSearchParams();
    if (searchCompany) params.append('company', searchCompany);
    if (searchBodyType) params.append('bodyType', searchBodyType);
    if (searchMaxPrice) params.append('maxPrice', searchMaxPrice);
    
    // Navigate to inventory with the query parameters
    navigate(`/inventory?${params.toString()}`);
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <div className='heroDiv'>East Africa's Premier Dealership</div>
            <h1 style={{ display: 'flex', flexDirection: "column", width: 'fit-content', gap: '10px' }}>
              Drive the extraordinary.
              <span style={{ color: '#DAA428' }}>Own it today.</span>
            </h1>
            <p>
              Handpicked luxury and Japanese used cars, delivered worldwide. <br />
              Every vehicle inspected, certified, and ready to be yours.
            </p>
            <Link to="/inventory" className="hero-btn">Explore Inventory</Link>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <div className="hero" style={{ background: '#0b0b0b', paddingBlock: '3rem', borderBlock: '1px solid #444' }}>
        <form onSubmit={handleSearch} className="search-section" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: '1248px', gap: '15px', padding: '0 20px' }}>
          
          <select 
            value={searchCompany} 
            onChange={(e) => setSearchCompany(e.target.value)}
            className="hero-search search-input"
            style={{ flex: '1', minWidth: '200px', padding: '14px', borderRadius: '8px', border: '1px solid #444', background: '#1a1a1a', color: '#fff', fontSize: '1rem', cursor: 'pointer' }}
          >
            <option value="">All Manufacturers</option>
            {uniqueOptions.companies.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          
          <select 
            value={searchBodyType} 
            onChange={(e) => setSearchBodyType(e.target.value)}
            className="hero-search search-input"
            style={{ flex: '1', minWidth: '200px', padding: '14px', borderRadius: '8px', border: '1px solid #444', background: '#1a1a1a', color: '#fff', fontSize: '1rem', cursor: 'pointer' }}
          >
            <option value="">All Body Types</option>
            {uniqueOptions.bodyTypes.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          
          <input 
            type="number" 
            placeholder="Max Price (KES)" 
            value={searchMaxPrice}
            onChange={(e) => setSearchMaxPrice(e.target.value)}
            className="hero-search search-input"
            style={{ flex: '1', minWidth: '200px', padding: '14px', borderRadius: '8px', border: '1px solid #444', background: '#1a1a1a', color: '#fff', fontSize: '1rem' }}
          />
          
          <button type="submit" className="hero-search search-btn" style={{ padding: '14px 40px', borderRadius: '8px', border: 'none', background: '#DAA428', color: '#000', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', transition: 'all 0.3s ease' ,display:"flex",justifyContent:"center",alignItems:"center"}}>
            Search
          </button> 
        </form>
      </div>

      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Vehicles</h2>
          <p>Explore our handpicked selection of premium automobiles</p>
        </div>
        
        <div className="featured-grid">
          {featuredCars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
        
        <div className="featured-cta">
          <Link to="/inventory" className="view-all-btn">View All Inventory</Link>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose LOOP AUTOCAT?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🏆 Certified Quality</h3>
            <p>Every vehicle undergoes a rigorous multi-point inspection before it hits our lot.</p>
          </div>
          <div className="feature-card">
            <h3>💰 Best Prices</h3>
            <p>We guarantee competitive pricing and transparent deals with no hidden fees.</p>
          </div>
          <div className="feature-card">
            <h3>🤝 Customer First</h3>
            <p>Our dedicated team is here to help you find the exact car that fits your lifestyle.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;