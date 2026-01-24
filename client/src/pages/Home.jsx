import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    Camera, Upload, Leaf, RefreshCw, Menu, X,
    Loader2, CheckCircle, AlertTriangle, ChevronRight,
    ScanLine, LayoutDashboard, Bell, Search, MapPin,
    Wind, Droplets, Thermometer, TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import WeatherCard from '../components/WeatherCard';
import MarketTeaser from '../components/MarketTeaser';
import Sidebar from '../components/Sidebar';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { t } = useLanguage();

    // Crop Doctor State
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setResult(null);
            setError(null);
            handleAnalyze(selectedFile);
        }
    };

    const handleAnalyze = async (selectedFile) => {
        setLoading(true);
        setError(null);
        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const res = await axios.post('/api/crop/detect', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setResult(res.data);
        } catch (err) {
            console.error("Error analyzing crop", err);
            setError("Failed to analyze. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const resetScan = () => {
        setFile(null);
        setPreview(null);
        setResult(null);
        setError(null);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-24">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Premium Header / Navbar */}
            <nav className="sticky top-0 z-50 px-6 py-4 flex justify-between items-center glass-effect">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-emerald-900 rounded-xl flex items-center justify-center text-white shadow-lg">
                        <Leaf size={22} className="text-emerald-400" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-none">AgroVision</h1>
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest"></span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
                        <Bell size={20} />
                    </button>
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white shadow-xl active:scale-95 transition-transform"
                    >
                        <Menu size={20} />
                    </button>
                </div>
            </nav>

            <main className="px-6 py-8 md:max-w-4xl md:mx-auto space-y-8">

                {/* Dashboard Greeting - Clean Typography */}
                <header className="flex justify-between items-end">
                    <div>
                        <p className="text-slate-400 font-semibold text-sm mb-1 uppercase tracking-wider">{t('welcome')}</p>
                        <h2 className="text-3xl font-black text-slate-900"> Kamal <span className="text-emerald-600">.</span></h2>
                    </div>
                    <div className="text-right hidden sm:block">
                        <div className="flex items-center gap-2 text-slate-500 font-medium">
                            <MapPin size={16} />
                            <span>Dhangadhi, Nepal</span>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    {/* Weather Section - Pro Dashboard Style */}
                    <div className="space-y-3 md:col-span-5">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2 uppercase text-[10px] tracking-widest">
                            <Wind size={14} className="text-emerald-600" />
                            Live Climate
                        </h3>
                        <WeatherCard />
                    </div>

                    {/* AI Diagnostics Section */}
                    <div className="space-y-3 md:col-span-7">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2 uppercase text-[10px] tracking-widest">
                            <ScanLine size={14} className="text-emerald-600" />
                            AI Diagnostics
                        </h3>

                        <div className="card-premium h-full min-h-[300px] flex flex-col">
                            {!preview ? (
                                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-white to-slate-50">
                                    <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6 border border-slate-100 shadow-inner group">
                                        <Camera className="text-slate-400 group-hover:text-emerald-600 transition-colors" size={32} />
                                    </div>
                                    <h4 className="text-lg font-bold text-slate-900 mb-2">Scan Crop Health</h4>
                                    <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                                        Identify pest damage and mineral deficiencies using computer vision.
                                    </p>

                                    <div className="flex gap-3 w-full max-w-xs">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                        />
                                        <button
                                            onClick={() => fileInputRef.current.click()}
                                            className="flex-1 btn-premium-primary"
                                        >
                                            <Camera size={18} />
                                            Capture
                                        </button>
                                        <button
                                            onClick={() => fileInputRef.current.click()}
                                            className="flex-1 btn-premium-outline"
                                        >
                                            <Upload size={18} />
                                            Upload
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-6 h-full flex flex-col">
                                    <div className="relative h-48 rounded-2xl overflow-hidden mb-6 shadow-inner">
                                        <img src={preview} alt="Crop" className="w-full h-full object-cover" />
                                        <button
                                            onClick={resetScan}
                                            className="absolute top-3 right-3 p-2 bg-white/20 hover:bg-white/40 text-white rounded-full transition-colors backdrop-blur-md border border-white/30"
                                        >
                                            <X size={16} />
                                        </button>

                                        {loading && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="absolute inset-0 bg-slate-900/80 flex flex-col items-center justify-center text-white backdrop-blur-sm"
                                            >
                                                <Loader2 size={32} className="animate-spin mb-3 text-emerald-400" />
                                                <p className="text-sm font-bold tracking-widest uppercase opacity-70">Processing Neural Data</p>
                                            </motion.div>
                                        )}
                                    </div>

                                    {result && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="space-y-6 flex-1"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h2 className="text-2xl font-black text-slate-900 mb-1">{result.crop}</h2>
                                                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${result.health === 'Healthy'
                                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                                        : 'bg-rose-50 text-rose-700 border-rose-100'
                                                        }`}>
                                                        {result.health === 'Healthy' ? <CheckCircle size={10} /> : <AlertTriangle size={10} />}
                                                        Status: {result.health}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Confidence</div>
                                                    <div className="text-2xl font-black text-emerald-600">{result.confidence}</div>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <h4 className="font-black text-slate-800 text-[10px] uppercase tracking-widest flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                                                    Technical Analysis
                                                </h4>
                                                <ul className="grid gap-2">
                                                    {result.careTips?.slice(0, 3).map((tip, idx) => (
                                                        <li key={idx} className="flex gap-3 text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100/50">
                                                            <div className="w-5 h-5 bg-white rounded-md border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-400 shrink-0">
                                                                0{idx + 1}
                                                            </div>
                                                            {tip}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <button
                                                onClick={resetScan}
                                                className="w-full btn-premium-primary mt-4"
                                            >
                                                Start New Scan
                                            </button>
                                        </motion.div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Market Intelligence Section */}
                <section className="space-y-4">
                    <div className="flex justify-between items-end">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2 uppercase text-xs tracking-widest">
                            <TrendingUp size={16} className="text-emerald-600" />
                            Market Intelligence
                        </h3>
                        <Link to="/market" className="text-emerald-600 text-xs font-black uppercase tracking-widest hover:text-emerald-800 flex items-center gap-1 group">
                            View Price Board
                            <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>

                    <div className="card-premium p-1">
                        <MarketTeaser />
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;
