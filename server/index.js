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

// Basic Route
app.get('/', (req, res) => {
    res.send('AgroVision API is running');
});

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/agrovision')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
