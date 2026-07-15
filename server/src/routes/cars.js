const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const CARS_FILE = path.join(__dirname, '../../data/cars.json');

// Helper function to read cars from file
const readCars = async () => {
  try {
    const data = await fs.readFile(CARS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading cars file:', error);
    return [];
  }
};

// Helper function to write cars to file
const writeCars = async (cars) => {
  try {
    await fs.writeFile(CARS_FILE, JSON.stringify(cars, null, 2));
  } catch (error) {
    console.error('Error writing cars file:', error);
  }
};

// GET all cars
router.get('/', async (req, res) => {
  const cars = await readCars();
  res.json(cars);
});

// GET single car by ID
router.get('/:id', async (req, res) => {
  const cars = await readCars();
  const car = cars.find(c => c.id === parseInt(req.params.id));
  
  if (!car) {
    return res.status(404).json({ message: 'Car not found' });
  }
  
  res.json(car);
});

// POST - Add new car
router.post('/', async (req, res) => {
  const cars = await readCars();
  
  const newCar = {
    id: Date.now(), // Generate unique ID
    ...req.body
  };
  
  cars.unshift(newCar); // Add to beginning of array
  await writeCars(cars);
  
  res.status(201).json(newCar);
});

// PUT - Update car
router.put('/:id', async (req, res) => {
  const cars = await readCars();
  const index = cars.findIndex(c => c.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ message: 'Car not found' });
  }
  
  cars[index] = { ...cars[index], ...req.body, id: cars[index].id };
  await writeCars(cars);
  
  res.json(cars[index]);
});

// DELETE - Remove car
router.delete('/:id', async (req, res) => {
  const cars = await readCars();
  const filteredCars = cars.filter(c => c.id !== parseInt(req.params.id));
  
  await writeCars(filteredCars);
  
  res.json({ message: 'Car deleted successfully' });
});

module.exports = router;