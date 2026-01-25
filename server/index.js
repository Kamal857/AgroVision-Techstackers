const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/weather', require('./routes/weatherRoutes'));
app.use('/api/market', require('./routes/marketRoutes'));
app.use('/api/fertilizer', require('./routes/fertilizerRoutes'));
app.use('/api/crop', require('./routes/cropRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Basic Route
app.get('/', (req, res) => {
    res.send('AgroVision API is running');
});

// Database Connection
const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/agrovision';

mongoose.connect(dbUri)
    .then(() => {
        console.log('✅ MongoDB connected successfully');
    })
    .catch(err => {
        console.error('❌ MongoDB connection error:');
        console.error(err.message);
        if (err.message.includes('buffering timed out')) {
            console.error('Tip: Check if your IP is whitelisted in MongoDB Atlas or if you have a stable internet connection.');
        }
    });

// Handle connection events
mongoose.connection.on('error', err => {
    console.error(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
