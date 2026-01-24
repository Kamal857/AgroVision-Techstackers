const axios = require('axios');

exports.getWeather = async (req, res) => {
    try {
        const apiKey = process.env.OPENWEATHER_API_KEY;
        // Default location Dhangadhi if not provided
        const city = req.query.city || "Dhangadhi";
        const country = req.query.country || "NP";

        // If no key is present, throw specific error to trigger fallback
        if (!apiKey || apiKey === 'your_openweather_api_key_here') {
            throw new Error("NO_API_KEY");
        }

        // 1. Get Current Weather
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${apiKey}`;
        const weatherResponse = await axios.get(weatherUrl);
        const current = weatherResponse.data;

        // 2. Get Forecast (using 5 day / 3 hour forecast endpoint)
        // Note: Daily forecast requires paid subscription on One Call API 3.0, 
        // so we use standard 5 day forecast and approximate daily
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=metric&appid=${apiKey}`;
        const forecastResponse = await axios.get(forecastUrl);

        // Process forecast to get daily noon values (approximate)
        const dailyForecast = [];
        const seenDays = new Set();

        for (const item of forecastResponse.data.list) {
            const date = new Date(item.dt * 1000);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

            // simple logic to pick one entry per day
            if (!seenDays.has(dayName) && dailyForecast.length < 5) {
                seenDays.add(dayName);
                dailyForecast.push({
                    day: dayName,
                    temp: Math.round(item.main.temp),
                    condition: item.weather[0].main // Rain, Clouds, Clear
                });
            }
            if (dailyForecast.length >= 5) break;
        }

        const weatherData = {
            location: `${current.name}, ${current.sys.country}`,
            current: {
                temp: Math.round(current.main.temp),
                condition: current.weather[0].main,
                humidity: current.main.humidity,
                windSpeed: Math.round(current.wind.speed * 3.6), // m/s to km/h
                unit: "C"
            },
            forecast: dailyForecast
        };

        res.status(200).json(weatherData);

    } catch (error) {
        console.error("Weather API Error Details:", error.response ? error.response.data : error.message);
        console.log("Weather API Error or Key missing, using mock data:", error.message);

        // Fallback Mock Data
        const mockWeather = {
            location: "Dhangadhi, Nepal",
            current: {
                temp: 22,
                condition: "Sunny",
                humidity: 45,
                windSpeed: 12,
                unit: "C"
            },
            forecast: [
                { day: "Sat", temp: 23, condition: "Sunny" },
                { day: "Sun", temp: 24, condition: "Cloudy" },
                { day: "Mon", temp: 22, condition: "Rain" },
                { day: "Tue", temp: 21, condition: "Rain" },
                { day: "Wed", temp: 23, condition: "Clouds" }
            ],
            isMock: true
        };

        res.status(200).json(mockWeather);
    }
};
