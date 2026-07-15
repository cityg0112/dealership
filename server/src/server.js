const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// ==========================================
// 1. CORS CONFIGURATION (Crucial for Vercel)
// ==========================================
const allowedOrigins = [
  'http://localhost:5173',
  'https://dealership-dusky.vercel.app' // Your live Vercel URL
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('Not allowed by CORS'), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

// ==========================================
// 2. STATIC FILES (Serve uploaded images)
// ==========================================
// This makes files in the 'uploads' folder accessible via URL
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use('/uploads', express.static(uploadDir));

// ==========================================
// 3. MULTER CONFIGURATION (File Uploads)
// ==========================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'car-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// ==========================================
// 4. DATA FILE PATH
// ==========================================
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
const carsFilePath = path.join(dataDir, 'cars.json');

// Initialize cars.json if it doesn't exist
if (!fs.existsSync(carsFilePath)) {
  fs.writeFileSync(carsFilePath, JSON.stringify([]));
}

// ==========================================
// 5. API ROUTES
// ==========================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'LOOP AUTOCAT Motors API is running!' });
});

// GET all cars
app.get('/api/cars', (req, res) => {
  try {
    const data = fs.readFileSync(carsFilePath, 'utf8');
    const cars = JSON.parse(data);
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read cars data' });
  }
});

// POST a new car
app.post('/api/cars', (req, res) => {
  try {
    const data = fs.readFileSync(carsFilePath, 'utf8');
    const cars = JSON.parse(data);
    const newCar = { ...req.body, id: Date.now() };
    cars.unshift(newCar); // Add to beginning of array
    fs.writeFileSync(carsFilePath, JSON.stringify(cars, null, 2));
    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save car' });
  }
});

// PUT (Update) a car
app.put('/api/cars/:id', (req, res) => {
  try {
    const data = fs.readFileSync(carsFilePath, 'utf8');
    let cars = JSON.parse(data);
    const carId = parseInt(req.params.id);
    const index = cars.findIndex(c => c.id === carId);
    
    if (index !== -1) {
      cars[index] = { ...req.body, id: carId };
      fs.writeFileSync(carsFilePath, JSON.stringify(cars, null, 2));
      res.json(cars[index]);
    } else {
      res.status(404).json({ error: 'Car not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update car' });
  }
});

// DELETE a car
app.delete('/api/cars/:id', (req, res) => {
  try {
    const data = fs.readFileSync(carsFilePath, 'utf8');
    let cars = JSON.parse(data);
    const carId = parseInt(req.params.id);
    cars = cars.filter(c => c.id !== carId);
    fs.writeFileSync(carsFilePath, JSON.stringify(cars, null, 2));
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete car' });
  }
});

// POST upload images
app.post('/api/upload', upload.array('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }
    // Return the relative paths to the uploaded images
    const imagePaths = req.files.map(file => `/uploads/${file.filename}`);
    res.json({ images: imagePaths });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload images' });
  }
});

// ==========================================
// 6. START SERVER
// ==========================================
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});