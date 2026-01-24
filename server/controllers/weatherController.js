exports.getWeather = (req, res) => {
    // Mock data for Dhangadhi, Nepal
    const weatherData = {
        location: "Dhangadhi, Nepal",
        current: {
            temp: 17,
            condition: "Rainy",
            humidity: 98,
            windSpeed: 14,
            unit: "C"
        },
        forecast: [
            { day: "Sat", temp: 23, condition: "Rainy" },
            { day: "Sun", temp: 23, condition: "Sunny" },
            { day: "Mon", temp: 23, condition: "Cloudy" },
            { day: "Tue", temp: 23, condition: "Rainy" },
            { day: "Wed", temp: 20, condition: "Rainy" },
            { day: "Thu", temp: 22, condition: "Sunny" }
        ]
    };
    res.status(200).json(weatherData);
};
