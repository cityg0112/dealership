import { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import dummyCars from '../data/dummyCars';

const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. FETCH cars from backend on initial load, with fallback to dummy data
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get('/cars');
        if (Array.isArray(response.data) && response.data.length > 0) {
          setCars(response.data);
        } else {
          setCars(dummyCars);
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
        setCars(dummyCars);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  // 2. ADD a new car to backend
  const addCar = async (newCar) => {
    try {
      const response = await api.post('/cars', newCar);
      setCars([response.data, ...cars]); // Add to top of list
      return response.data;
    } catch (error) {
      console.error('Error adding car:', error);
      throw error;
    }
  };

  // 3. UPDATE an existing car on backend
  const updateCar = async (id, updatedCar) => {
    try {
      const response = await api.put(`/cars/${id}`, updatedCar);
      setCars(cars.map(car => (car.id === id ? response.data : car)));
      return response.data;
    } catch (error) {
      console.error('Error updating car:', error);
      throw error;
    }
  };

  // 4. DELETE a car from backend
  const deleteCar = async (id) => {
    try {
      await api.delete(`/cars/${id}`);
      setCars(cars.filter(car => car.id !== id));
    } catch (error) {
      console.error('Error deleting car:', error);
      throw error;
    }
  };

  return (
    <CarContext.Provider value={{ cars, loading, addCar, updateCar, deleteCar }}>
      {children}
    </CarContext.Provider>
  );
};

export const useCars = () => useContext(CarContext);