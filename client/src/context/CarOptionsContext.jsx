import { createContext, useState, useContext, useEffect } from 'react';

const CarOptionsContext = createContext();

export const CarOptionsProvider = ({ children }) => {
  // Load saved options from localStorage
  const [options, setOptions] = useState(() => {
    const saved = localStorage.getItem('loopAutocatOptions');
    return saved ? JSON.parse(saved) : {
      companies: ['Toyota', 'Ford', 'BMW', 'Mercedes-Benz', 'Audi'],
      bodyTypes: ['SUV', 'Sedan', 'Truck', 'Coupe', 'Hatchback'],
      engineTypes: ['V8', 'V6', 'V6 Twin Turbo', 'I4', 'Electric'],
      fuelTypes: ['Petrol', 'Diesel', 'Hybrid', 'Electric'],
      transmissions: ['Automatic', 'Manual', 'CVT', 'Dual-Clutch']
    };
  });

  // Save to localStorage whenever options change
  useEffect(() => {
    localStorage.setItem('loopAutocatOptions', JSON.stringify(options));
  }, [options]);

  // Function to add a new option if it doesn't exist
  const addOption = (category, value) => {
    if (!value || value.trim() === '') return;
    
    const trimmedValue = value.trim();
    const currentOptions = options[category] || [];
    
    // Check if value already exists (case-insensitive)
    const exists = currentOptions.some(
      opt => opt.toLowerCase() === trimmedValue.toLowerCase()
    );
    
    if (!exists) {
      setOptions({
        ...options,
        [category]: [...currentOptions, trimmedValue]
      });
    }
  };

  // Function to get options for a category
  const getOptions = (category) => {
    return options[category] || [];
  };

  return (
    <CarOptionsContext.Provider value={{ options, addOption, getOptions }}>
      {children}
    </CarOptionsContext.Provider>
  );
};

export const useCarOptions = () => useContext(CarOptionsContext);