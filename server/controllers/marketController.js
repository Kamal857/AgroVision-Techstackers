const MarketPrice = require('../models/MarketPrice');

exports.getMarketPrices = async (req, res) => {
    try {
        const prices = await MarketPrice.find().sort({ item: 1 });

        // If DB is empty, return initial mock data but suggest a sync
        if (prices.length === 0) {
            return res.status(200).json([
                { item: "Rice (Paddy)", price: 40, unit: "kg", trend: "stable", location: "Dhangadhi (Sync Required)" },
                { item: "Wheat", price: 35, unit: "kg", trend: "up", location: "Dhangadhi" },
                { item: "Vegetables (Mix)", price: 65, unit: "kg", trend: "up", location: "Sync to Update" }
            ]);
        }

        res.status(200).json(prices);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch market prices" });
    }
};
