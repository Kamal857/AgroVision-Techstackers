import { useState, useEffect } from 'react';
import { CloudRain, Sun, Cloud, Wind, Droplets, Thermometer, Loader2, MapPin, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../api';

const WeatherCard = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const res = await api.get('/weather');
                setWeather(res.data);
            } catch (err) {
                console.error("Error fetching weather:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    if (loading) {
        return (
            <div className="bg-sky-500 rounded-3xl h-[340px] flex items-center justify-center shadow-lg">
                <Loader2 className="animate-spin text-white/50" size={32} />
            </div>
        );
    }

    if (!weather) return null;

    const getWeatherIcon = (condition, size = 24) => {
        const c = condition?.toLowerCase();
        if (c?.includes('rain')) return <CloudRain size={size} />;
        if (c?.includes('cloud')) return <Cloud size={size} />;
        return <Sun size={size} />;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-sky-600 rounded-3xl p-7 text-white shadow-xl shadow-sky-100/50 relative overflow-hidden"
        >
            {/* Main Content */}
            <div className="relative z-10">
                {/* Location Picker */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 cursor-pointer hover:bg-white/30 transition-colors">
                        <MapPin size={14} className="text-white" />
                        <span className="text-sm font-bold tracking-tight">{weather.location}</span>
                        <ChevronDown size={14} />
                    </div>
                </div>

                <div className="flex justify-between items-start mb-8">
                    <div>
                        <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-1">Meteorological Data</p>
                        <h2 className="text-6xl font-black tracking-tighter mb-1 font-sans">
                            {weather.current.temp}°{weather.current.unit}
                        </h2>
                        <p className="text-lg font-semibold opacity-90">{weather.current.condition}</p>
                    </div>
                    <div className="text-white drop-shadow-lg">
                        {getWeatherIcon(weather.current.condition, 90)}
                    </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center border border-white/10">
                            <Thermometer size={16} />
                        </div>
                        <div>
                            <p className="text-[9px] text-white/70 font-bold uppercase leading-none opacity-80">Apparent</p>
                            <p className="text-sm font-bold">{weather.current.temp}°C</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center border border-white/10">
                            <Droplets size={16} />
                        </div>
                        <div>
                            <p className="text-[9px] text-white/70 font-bold uppercase leading-none opacity-80">Humidity</p>
                            <p className="text-sm font-bold">{weather.current.humidity}%</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center border border-white/10">
                            <Wind size={16} />
                        </div>
                        <div>
                            <p className="text-[9px] text-white/70 font-bold uppercase leading-none opacity-80">Velocity</p>
                            <p className="text-sm font-bold">{weather.current.windSpeed} <span className="text-[10px]">km/h</span></p>
                        </div>
                    </div>
                </div>

                {/* Forecast List */}
                <div className="flex justify-between items-center bg-white/10 rounded-2xl p-4 border border-white/10 backdrop-blur-sm shadow-inner">
                    {weather.forecast.map((day, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 px-1">
                            <span className="text-[9px] font-bold text-white/70 uppercase">{day.day}</span>
                            <div className="opacity-100 scale-90">
                                {getWeatherIcon(day.condition, 18)}
                            </div>
                            <span className="text-xs font-bold">{day.temp}°</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Decorative circles */}
            <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
        </motion.div>
    );
};

export default WeatherCard;
