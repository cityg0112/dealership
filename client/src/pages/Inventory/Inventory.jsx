import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCars } from '../../context/CarContext';
import CarCard from '../../components/CarCard/CarCard';
import FilterSidebar from '../../components/FilterSidebar/FilterSidebar';
import './Inventory.css';

const Inventory = () => {
  const { cars } = useCars();
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Initialize filters from URL params (so Home page search works)
  const [filters, setFilters] = useState({
    company: searchParams.get('company') || '',
    bodyType: searchParams.get('bodyType') || '',
    fuelType: searchParams.get('fuelType') || '',
    transmission: searchParams.get('transmission') || '',
    engineType: searchParams.get('engineType') || '',
    maxMileage: searchParams.get('maxMileage') || '',
    maxPrice: searchParams.get('maxPrice') || '' // Added for Home page search
  });

  // Extract unique options from existing cars
  const uniqueOptions = useMemo(() => {
    const companies = [...new Set(cars.map(car => car.company).filter(Boolean))];
    const bodyTypes = [...new Set(cars.map(car => car.bodyType).filter(Boolean))];
    const engineTypes = [...new Set(cars.map(car => car.engineType).filter(Boolean))];
    const fuelTypes = [...new Set(cars.map(car => car.fuelType).filter(Boolean))];
    const transmissions = [...new Set(cars.map(car => car.transmission).filter(Boolean))];
    return { companies, bodyTypes, engineTypes, fuelTypes, transmissions };
  }, [cars]);

  // 2. Sync filters back to URL params whenever they change (makes filters shareable via link)
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.company) params.set('company', filters.company);
    if (filters.bodyType) params.set('bodyType', filters.bodyType);
    if (filters.fuelType) params.set('fuelType', filters.fuelType);
    if (filters.transmission) params.set('transmission', filters.transmission);
    if (filters.engineType) params.set('engineType', filters.engineType);
    if (filters.maxMileage) params.set('maxMileage', filters.maxMileage);
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
    
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  // 3. Clear filters AND clear the URL parameters
  const handleClearFilters = () => {
    setFilters({
      company: '',
      bodyType: '',
      fuelType: '',
      transmission: '',
      engineType: '',
      maxMileage: '',
      maxPrice: ''
    });
    setSearchParams({}, { replace: true }); // Wipes the URL query string
  };

  // 4. Filter logic (now includes maxPrice)
  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      const matchesCompany = filters.company === '' || car.company === filters.company;
      const matchesBodyType = filters.bodyType === '' || car.bodyType === filters.bodyType;
      const matchesFuelType = filters.fuelType === '' || car.fuelType === filters.fuelType;
      const matchesTransmission = filters.transmission === '' || car.transmission === filters.transmission;
      const matchesEngineType = filters.engineType === '' || car.engineType === filters.engineType;
      const matchesMaxMileage = filters.maxMileage === '' || car.mileage <= parseInt(filters.maxMileage);
      const matchesMaxPrice = filters.maxPrice === '' || car.price <= parseInt(filters.maxPrice);
      
      return matchesCompany && matchesBodyType && matchesFuelType &&
             matchesTransmission && matchesEngineType && matchesMaxMileage && matchesMaxPrice;
    });
  }, [cars, filters]);

  return (
    <div className="inventory-page-luxury">
      <div className="inventory-header-luxury">
        <h1>Premium Inventory</h1>
        <p>
          {filteredCars.length === cars.length
            ? `Explore our collection of ${cars.length} exceptional vehicles`
            : `Showing ${filteredCars.length} of ${cars.length} vehicles`}
        </p>
      </div>
      <div className="inventory-layout">
        <FilterSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          uniqueOptions={uniqueOptions}
        />
        <div className="cars-grid-luxury">
          {filteredCars.length > 0 ? (
            filteredCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))
          ) : (
            <div className="no-results-luxury">
              <div className="no-results-icon">🚗</div>
              <h3>No vehicles match your criteria</h3>
              <p>Try adjusting your filters to discover more options.</p>
              <button className="reset-btn" onClick={handleClearFilters}>
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inventory;