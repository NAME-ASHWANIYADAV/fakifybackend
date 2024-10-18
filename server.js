// Import required modules
const express = require('express');
const cors = require('cors');
const multer = require('multer'); // For handling file uploads
const path = require('path'); // For handling and transforming file paths
const connectDB = require('./config/db'); // Import your MongoDB connection file
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');
const videoRoutes = require('./routes/videoRoutes'); // Import video routes

// Load environment variables from .env file
require('dotenv').config();

// Initialize the express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: '*', // Allow requests from any origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json()); // Parse incoming JSON requests

// Set up static folder for serving uploaded files (optional, for accessing the files)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route handling
app.use('/api/auth', authRoutes); // Auth routes under /api/auth
app.use('/api/contact', contactRoutes); // Contact routes under /api/contact
app.use('/api/videos', videoRoutes); // Correct the path to /api/videos for video routes

// Fallback route for handling 404 errors
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware (optional but recommended for better error management)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'An internal server error occurred' });
});

// Define the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
