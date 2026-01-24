import { useState } from 'react';
import { CloudRain, Sun, Cloud, Wind, Droplets, Thermometer, ChevronDown } from 'lucide-react';

const WeatherCard = () => {
    // Demo Data
    const weather = {
        location: "Dhangadhi",
        current: {
            temp: 17,
            condition: "Rainy",
            humidity: 98,
            windSpeed: 14
        },
        forecast: [
            { day: "Sat", temp: 23, condition: "Rainy" },
            { day: "Sun", temp: 25, condition: "Sunny" },
            { day: "Mon", temp: 22, condition: "Cloudy" },
            { day: "Tue", temp: 23, condition: "Rainy" },
            { day: "Wed", temp: 20, condition: "Rainy" }
        ]
    };

    return (
        <div className="bg-[#38BDF8] rounded-[32px] p-6 text-white shadow-xl relative overflow-hidden h-full">
            <div className="flex justify-between items-start z-10 relative mb-8">
                <div>
                    <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full inline-flex items-center gap-2 mb-4 cursor-pointer hover:bg-white/30 transition-colors">
                        <span className="text-sm font-semibold">📍 {weather.location}</span>
                        <ChevronDown size={14} />
                    </div>
                    <h3 className="text-blue-100 font-medium">Today's Weather</h3>
                    <div className="flex items-center gap-4">
                        <span className="text-7xl font-bold tracking-tighter">{weather.current.temp}°C</span>
                    </div>
                    <p className="text-xl font-medium text-blue-50 mt-1">{weather.current.condition}</p>
                </div>
                <CloudRain className="w-32 h-32 text-white/30 absolute -right-6 top-8" />
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-2">
                    <Thermometer size={18} className="text-blue-200" />
                    <div>
                        <p className="text-xs text-blue-100">Feels like</p>
                        <p className="font-bold">{weather.current.temp}°C</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Droplets size={18} className="text-blue-200" />
                    <div>
                        <p className="text-xs text-blue-100">Rain</p>
                        <p className="font-bold">{weather.current.humidity}%</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Wind size={18} className="text-blue-200" />
                    <div>
                        <p className="text-xs text-blue-100">Wind</p>
                        <p className="font-bold">{weather.current.windSpeed} km/h</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-between gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {weather.forecast.map((day, i) => (
                    <div key={i} className={`flex flex-col items-center justify-between p-3 rounded-2xl min-w-[60px] ${i === 1 ? 'bg-white/20 border border-white/30' : 'bg-white/10'}`}>
                        <span className="text-sm font-medium">{day.day}</span>
                        {day.condition === "Rainy" ? <CloudRain size={20} className="my-2" /> : <Sun size={20} className="my-2" />}
                        <span className="text-lg font-bold">{day.temp}°</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherCard;
