const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import routes
const carsRoutes = require('./routes/cars');
const uploadRoutes = require('./routes/upload');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors()); // Allow frontend to make requests
app.use(express.json()); // Parse JSON request bodies

// Serve static files from uploads folder
// This makes images accessible via http://localhost:5000/uploads/image.jpg
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/cars', carsRoutes);
app.use('/api/upload', uploadRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    message: 'LOOP AUTOCAT Motors API is running!',
    endpoints: ['/api/health', '/api/cars', '/api/upload']
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'LOOP AUTOCAT Motors API is running!'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 LOOP AUTOCAT Server running on http://localhost:${PORT}`);
  console.log(`📁 Uploads folder: http://localhost:${PORT}/uploads`);
  console.log(`🚗 Cars API: http://localhost:${PORT}/api/cars`);
  console.log(`📤 Upload API: http://localhost:${PORT}/api/upload`);
});