// Load environment variables from .env
require('dotenv').config({ path: __dirname + '/.env' });

// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // enable cross-origin requests
const workoutRoutes = require('./routes/workout'); // your workout routes

// Create Express app
const app = express();

// Middleware
app.use(cors()); // allow requests from React frontend
app.use(express.json()); // parse JSON bodies

// Root route
app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to your Workout API!' });
});

// Use workout routes for /api/workouts
app.use('/api/workouts', workoutRoutes);

// MongoDB Atlas connection
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error('❌ MONGO_URI is not defined in .env');
  process.exit(1); // stop server if URI missing
}

// Connect to MongoDB and start server
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log('🚀 Ready to handle requests!');
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect MongoDB:', err);
  });
