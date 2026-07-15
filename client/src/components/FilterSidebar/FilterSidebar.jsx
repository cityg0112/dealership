import './FilterSidebar.css';

const FilterSidebar = ({ filters, onFilterChange, onClearFilters, uniqueOptions }) => {
  return (
    <aside className="filter-sidebar-luxury">
      <div className="filter-header">
        <h3>Refine Search</h3>
        <button className="clear-filters-btn" onClick={onClearFilters}>
          Clear All
        </button>
      </div>
      
      <div className="filter-section">
        <label className="filter-label">Manufacturer</label>
        <select 
          value={filters.company} 
          onChange={(e) => onFilterChange('company', e.target.value)}
          className="luxury-select"
        >
          <option value="">All Manufacturers</option>
          {uniqueOptions.companies.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <label className="filter-label">Body Type</label>
        <select 
          value={filters.bodyType} 
          onChange={(e) => onFilterChange('bodyType', e.target.value)}
          className="luxury-select"
        >
          <option value="">All Body Types</option>
          {uniqueOptions.bodyTypes.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <label className="filter-label">Fuel Type</label>
        <select 
          value={filters.fuelType} 
          onChange={(e) => onFilterChange('fuelType', e.target.value)}
          className="luxury-select"
        >
          <option value="">All Fuel Types</option>
          {uniqueOptions.fuelTypes.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <label className="filter-label">Transmission</label>
        <select 
          value={filters.transmission} 
          onChange={(e) => onFilterChange('transmission', e.target.value)}
          className="luxury-select"
        >
          <option value="">All Transmissions</option>
          {uniqueOptions.transmissions.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <label className="filter-label">Engine Type</label>
        <select 
          value={filters.engineType} 
          onChange={(e) => onFilterChange('engineType', e.target.value)}
          className="luxury-select"
        >
          <option value="">All Engines</option>
          {uniqueOptions.engineTypes.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <label className="filter-label">Max Mileage</label>
        <input 
          type="number"
          value={filters.maxMileage}
          onChange={(e) => onFilterChange('maxMileage', e.target.value)}
          placeholder="Any mileage"
          className="luxury-input"
        />
      </div>
    </aside>
  );
};

export default FilterSidebar;