const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

// POST - Upload multiple images
// The field name 'images' must match what the frontend sends
router.post('/', upload.array('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }
    
    // Extract just the filenames/paths from the uploaded files
    const imagePaths = req.files.map(file => `/uploads/${file.filename}`);
    
    res.json({
      message: 'Files uploaded successfully',
      images: imagePaths
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

module.exports = router;