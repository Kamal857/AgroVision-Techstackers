exports.getMarketPrices = (req, res) => {
    // Mock data for Dhangadhi market
    const marketData = [
        { item: "Rice (Paddy)", price: 40, unit: "kg", trend: "stable", location: "Dhangadhi" },
        { item: "Wheat", price: 35, unit: "kg", trend: "up", location: "Dhangadhi" },
        { item: "Maize", price: 30, unit: "kg", trend: "stable", location: "Tikapur" },
        { item: "Vegetables (Mix)", price: 60, unit: "kg", trend: "down", location: "Attariya" },
        { item: "Milk", price: 90, unit: "ltr", trend: "stable", location: "Dhangadhi" },
        { item: "Ghee", price: 1200, unit: "kg", trend: "up", location: "Local Farm" }
    ];
    res.status(200).json(marketData);
};
