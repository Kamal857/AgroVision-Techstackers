exports.getFertilizerStock = (req, res) => {
    // Mock data for fertilizer stock
    const stockData = [
        { name: "Urea", quantity: "500 kg", organization: "Salt Trading Corp", available: true },
        { name: "DAP", quantity: "200 kg", organization: "Krishi Samagri Kendra", available: true },
        { name: "Potash", quantity: "0 kg", organization: "Salt Trading Corp", available: false },
        { name: "Zinc", quantity: "50 kg", organization: "Local Agro Vet", available: true }
    ];
    res.status(200).json(stockData);
};
