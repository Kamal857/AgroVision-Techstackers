import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Droplets, CloudRain, Sun,
    Thermometer, AlertTriangle, CheckCircle2,
    Info, Waves, Zap, Leaf
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api';
import AgronomistChat from '../components/AgronomistChat';

const IrrigationTips = () => {
    const navigate = useNavigate();
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('schedule');

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const res = await api.get('/weather');
                setWeather(res.data);
            } catch (err) {
                console.error("Error fetching weather for irrigation:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchWeather();
    }, []);

    const getWateringAdvice = () => {
        if (!weather) return { status: 'Retrieving Data', color: 'bg-slate-100 text-slate-400', text: 'Connecting to local weather station...' };

        const isRaining = weather.current.condition.toLowerCase().includes('rain');
        const temp = weather.current.temp;

        if (isRaining) {
            return {
                status: 'Suspended',
                color: 'bg-rose-600',
                icon: <CloudRain size={32} />,
                text: "Natural precipitation detected. Irrigation is currently unnecessary to prevent waterlogging."
            };
        }
        if (temp > 30) {
            return {
                status: 'High Demand',
                color: 'bg-amber-600',
                icon: <Sun size={32} />,
                text: `Elevated temperature (${temp}°C) detected. Evaporation rates are high; water during off-peak hours.`
            };
        }
        return {
            status: 'Optimal',
            color: 'bg-emerald-600',
            icon: <Droplets size={32} />,
            text: "Environmental conditions are stable. Follow your standard scientific irrigation protocols."
        };
    };

    const advice = getWateringAdvice();

    return (
        <div className="min-h-screen bg-[#f8fafc] pb-32">
            {/* Header */}
            <header className="bg-white px-6 py-6 border-b border-slate-100 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md bg-white/90">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 active:scale-90 transition-transform border border-slate-100">
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-lg font-bold text-slate-900 uppercase tracking-tight leading-none">Irrigation Intelligence</h1>
                        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-1">Smart Water Management</p>
                    </div>
                </div>
                <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-sky-100/50">
                    <Droplets size={20} />
                </div>
            </header>

            <main className="px-5 mt-6 space-y-8 max-w-2xl mx-auto">
                {/* Smart Status Card */}
                <section className={`${advice.color} rounded-3xl p-7 text-white shadow-xl shadow-slate-200/50 relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 mb-2">Current Protocol</p>
                            <h2 className="text-3xl font-bold leading-tight">{advice.status}</h2>
                        </div>
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10 shadow-lg">
                            {advice.icon}
                        </div>
                    </div>
                    <p className="text-sm font-medium leading-relaxed text-white/90 italic">
                        "{advice.text}"
                    </p>
                </section>

                {/* Tabs */}
                <div className="flex bg-slate-100/50 p-1 rounded-2xl border border-slate-200/60 font-sans">
                    {['schedule', 'methods', 'science'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === tab
                                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50'
                                : 'text-slate-400 font-semibold'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {activeTab === 'schedule' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Waves size={20} className="text-sky-500" /> Atmospheric Water Loss (ET)
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Relative Humidity</p>
                                    <p className="text-2xl font-bold text-slate-900">{weather?.current?.humidity || '--'}%</p>
                                </div>
                                <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Evaporation Index</p>
                                    <p className="text-2xl font-bold text-slate-900">{weather?.current?.temp > 25 ? 'High' : 'Moderate'}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'methods' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                        {[
                            { name: 'Drip Irrigation', desc: '90% Efficiency Rating. Optimized for direct-to-root delivery.', icon: <Zap size={18} />, color: 'text-emerald-500' },
                            { name: 'Sprinkler System', desc: '75% Efficiency Rating. Suitable for foliage-intensive crops.', icon: <CheckCircle2 size={18} />, color: 'text-sky-500' },
                            { name: 'Furrow Irrigation', desc: '50% Efficiency Rating. Resource-intensive classic method.', icon: <AlertTriangle size={18} />, color: 'text-amber-500' },
                        ].map((method, i) => (
                            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5">
                                <div className={`w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 ${method.color}`}>
                                    {method.icon}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 uppercase tracking-tight text-xs">{method.name}</h4>
                                    <p className="text-xs font-medium text-slate-400 mt-1">{method.desc}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}

                {activeTab === 'science' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        <div className="bg-slate-900 rounded-3xl p-7 text-white shadow-xl shadow-slate-200/50">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <Leaf size={20} className="text-emerald-500" /> Biological Demand Stages
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { stage: 'Germination', need: 'Critical' },
                                    { stage: 'Flowering', need: 'Ultra-Critical' },
                                    { stage: 'Fruit Setting', need: 'Critical' },
                                    { stage: 'Maturity', need: 'Secondary' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                                        <span className="text-xs font-semibold">{item.stage}</span>
                                        <span className={`px-3 py-1 rounded text-[8px] font-bold uppercase tracking-widest ${item.need === 'Ultra-Critical' ? 'bg-rose-500/80' :
                                            item.need === 'Critical' ? 'bg-amber-500/80' : 'bg-emerald-500/80'
                                            }`}>
                                            {item.need}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </main>

            {/* AI Chat Integration */}
            <AgronomistChat />
        </div>
    );
};

export default IrrigationTips;
