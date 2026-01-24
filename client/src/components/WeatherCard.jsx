import { useState, useEffect } from 'react';
import axios from 'axios';
import { CloudRain, Sun, Cloud, Wind, Droplets, Thermometer } from 'lucide-react';

const WeatherCard = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const res = await axios.get('/api/weather');
                setWeather(res.data);
            } catch (err) {
                console.error("Error fetching weather", err);
            } finally {
                setLoading(false);
            }
        };
        fetchWeather();
    }, []);

    if (loading) return <div className="h-48 bg-gray-200 animate-pulse rounded-2xl"></div>;
    if (!weather) return <div className="p-4 bg-red-50 text-red-500 rounded-2xl">Weather data unavailable</div>;

    return (
        <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden h-full flex flex-col justify-between">
            {/* Background decoration */}
            <CloudRain className="absolute -right-4 -top-4 w-32 h-32 text-white/10" />

            <div className="flex justify-between items-start z-10 relative">
                <div>
                    <h2 className="text-lg font-medium opacity-90 flex items-center gap-1">📍 {weather.location}</h2>
                    <div className="mt-2">
                        <span className="text-6xl font-bold tracking-tighter">{weather.current.temp}°</span>
                        <p className="text-xl font-medium mt-1">{weather.current.condition}</p>
                    </div>
                </div>
                <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl">
                    <CloudRain className="w-8 h-8 text-white" />
                </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2 border-t border-white/20 pt-4">
                <div className="flex flex-col items-center">
                    <Thermometer size={20} className="mb-1 opacity-75" />
                    <span className="text-sm font-semibold">{weather.current.temp}°C</span>
                </div>
                <div className="flex flex-col items-center">
                    <Droplets size={20} className="mb-1 opacity-75" />
                    <span className="text-sm font-semibold">{weather.current.humidity}%</span>
                </div>
                <div className="flex flex-col items-center">
                    <Wind size={20} className="mb-1 opacity-75" />
                    <span className="text-sm font-semibold">{weather.current.windSpeed} km/h</span>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
