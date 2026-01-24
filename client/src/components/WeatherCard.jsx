import { useState, useEffect } from 'react';
import { CloudRain, Sun, Cloud, Wind, Droplets, Thermometer, Loader2, MapPin } from 'lucide-react';
import axios from 'axios';

const WeatherCard = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const res = await axios.get('/api/weather');
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
            <div className="card-premium h-full flex items-center justify-center p-8 bg-white">
                <Loader2 className="animate-spin text-emerald-600" size={24} />
            </div>
        );
    }

    if (!weather) return null;

    const getWeatherIcon = (condition) => {
        const c = condition?.toLowerCase();
        if (c?.includes('rain')) return <CloudRain size={20} className="text-blue-500" />;
        if (c?.includes('cloud')) return <Cloud size={20} className="text-slate-400" />;
        return <Sun size={20} className="text-amber-500" />;
    };

    return (
        <div className="card-premium bg-white flex flex-col">
            {/* Top Bar - More Compact */}
            <div className="p-4 pb-2 flex justify-between items-start">
                <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-slate-400">
                        <MapPin size={10} className="text-emerald-600" />
                        <span className="text-[9px] font-black uppercase tracking-widest">{weather.location}</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h4 className="text-xl font-black text-slate-900 tracking-tighter leading-none">
                            {weather.current.temp}°{weather.current.unit}
                        </h4>
                        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">{weather.current.condition}</p>
                    </div>
                </div>
                <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center shadow-sm">
                    {getWeatherIcon(weather.current.condition)}
                </div>
            </div>

            {/* Metrics Grid - More Compact */}
            <div className="px-4 py-3 grid grid-cols-3 gap-2">
                <div className="bg-slate-50/50 p-2 rounded-xl border border-slate-100/50 flex flex-col items-center">
                    <span className="text-[7px] font-black uppercase tracking-wider text-slate-400">Feels</span>
                    <p className="text-xs font-black text-slate-800">{weather.current.temp}°</p>
                </div>
                <div className="bg-slate-50/50 p-2 rounded-xl border border-slate-100/50 flex flex-col items-center">
                    <span className="text-[7px] font-black uppercase tracking-wider text-slate-400">Humid</span>
                    <p className="text-xs font-black text-slate-800">{weather.current.humidity}%</p>
                </div>
                <div className="bg-slate-50/50 p-2 rounded-xl border border-slate-100/50 flex flex-col items-center">
                    <span className="text-[7px] font-black uppercase tracking-wider text-slate-400">Wind</span>
                    <p className="text-xs font-black text-slate-800">{weather.current.windSpeed} <span className="text-[7px]">km/h</span></p>
                </div>
            </div>

            {/* Forecast - Slimmer */}
            <div className="mt-auto border-t border-slate-50 p-3 bg-slate-50/30">
                <div className="flex justify-between items-center px-1">
                    {weather.forecast.map((day, i) => (
                        <div key={i} className="flex flex-col items-center gap-0.5">
                            <span className="text-[8px] font-bold text-slate-400 uppercase">{day.day}</span>
                            <div className="scale-75 opacity-80">
                                {getWeatherIcon(day.condition)}
                            </div>
                            <span className="text-[10px] font-black text-slate-700">{day.temp}°</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
