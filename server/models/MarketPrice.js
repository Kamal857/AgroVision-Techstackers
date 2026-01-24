const mongoose = require('mongoose');

const MarketPriceSchema = new mongoose.Schema({
    item: { type: String, required: true },
    price: { type: Number, required: true },
    unit: { type: String, default: 'kg' },
    trend: { type: String, enum: ['up', 'down', 'stable'], default: 'stable' },
    location: { type: String, default: 'Dhangadhi' },
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MarketPrice', MarketPriceSchema);
