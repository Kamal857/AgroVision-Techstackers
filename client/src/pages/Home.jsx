import { useState, useRef } from 'react';
import {
    Camera, Upload, Leaf, X, Loader2, CheckCircle,
    AlertTriangle, ChevronRight, ScanLine, Bell, Grid, Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api';
import WeatherCard from '../components/WeatherCard';
import MarketTeaser from '../components/MarketTeaser';
import FertilizerStock from '../components/FertilizerStock';
import FarmingTools from '../components/FarmingTools';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Home = ({ onOpenSidebar }) => {
    const { t } = useLanguage();
    const navigate = useNavigate();

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
            // Auto analyze after file selection
            handleAnalyze(selectedFile);
        }
    };

    const handleAnalyze = async (selectedFile) => {
        setLoading(true);
        setError(null);
        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const res = await api.post('/crop/detect', formData, {
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
        <div className="min-h-screen bg-[#f5f5f5] pb-32">

            {/* Hero Section with BG Image */}
            <header className="relative h-[240px] px-8 pt-10 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                        alt="Background"
                        className="w-full h-full object-cover brightness-[0.7] saturate-[1.2]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#f5f5f5]"></div>
                </div>

                <div className="relative z-10 flex flex-col gap-6">
                    <div className="flex justify-end items-center">
                        <button
                            onClick={onOpenSidebar}
                            className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-500/20 active:scale-95 transition-transform"
                        >
                            <Menu size={24} />
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white border-2 border-white shadow-lg">
                            <Leaf size={24} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white leading-none">AgroVision</h1>
                            <p className="text-white font-bold opacity-90 mt-1">Welcome back, boharakamal857! 🙏</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="px-5 -mt-10 relative z-20 space-y-8 max-w-2xl mx-auto">
                {/* Weather Section */}
                <WeatherCard />

                {/* AI Crop Doctor Section */}
                <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-100/50">
                                <Leaf size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-slate-900 leading-tight">AI Crop Doctor</h3>
                                <p className="text-slate-400 text-xs font-medium mt-1">Professional crop diagnosis</p>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/crop-doctor')}
                            className="bg-slate-50 text-slate-600 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-slate-200 active:scale-95 transition-transform"
                        >
                            Explore All
                        </button>
                    </div>

                    {!preview ? (
                        <div className="border border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center bg-slate-50/50">
                            <div className="flex gap-4 mb-6">
                                <button
                                    onClick={() => fileInputRef.current.click()}
                                    className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-md shadow-emerald-100 active:scale-95 transition-transform"
                                >
                                    <Camera size={20} />
                                    Camera
                                </button>
                                <button
                                    onClick={() => fileInputRef.current.click()}
                                    className="bg-white text-slate-700 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 border border-slate-200 shadow-sm active:scale-95 transition-transform"
                                >
                                    <Upload size={20} />
                                    Gallery
                                </button>
                            </div>
                            <p className="text-center text-sm font-medium text-slate-500 leading-relaxed max-w-[200px]">
                                Upload or capture a photo of your crop leaf for analysis
                            </p>
                            <input
                                type="file"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                        </div>
                    ) : (
                        <div className="relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                            <img src={preview} alt="Crop preview" className="w-full aspect-[4/3] object-cover" />
                            <button
                                onClick={resetScan}
                                className="absolute top-4 right-4 bg-slate-900/60 text-white p-2 rounded-full backdrop-blur-md"
                            >
                                <X size={20} />
                            </button>

                            {loading && (
                                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                                    <Loader2 className="w-10 h-10 animate-spin text-white mb-3" />
                                    <p className="font-semibold text-sm tracking-wide lowercase italic">Analyzing plant sample...</p>
                                </div>
                            )}

                            {result && !loading && (
                                <motion.div
                                    initial={{ y: 100 }}
                                    animate={{ y: 0 }}
                                    className="absolute inset-x-0 bottom-0 bg-white p-6 rounded-t-2xl border-t border-slate-100"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className="text-xl font-bold text-slate-900">{result.crop}</h4>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${result.health === 'Healthy' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                                                    }`}>
                                                    {result.health}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">AI Confidence</p>
                                            <p className="text-xl font-bold text-emerald-600">{result.confidence}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2 mb-6">
                                        {result.symptoms && result.symptoms.length > 0 && (
                                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Symptoms Identified</p>
                                                <p className="text-xs font-medium text-slate-600 line-clamp-2">{result.symptoms.join(', ')}</p>
                                            </div>
                                        )}
                                        {result.treatment && result.treatment.length > 0 && (
                                            <div className="bg-emerald-50/50 p-3 rounded-lg border border-emerald-100">
                                                <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest mb-1">Recommended Action</p>
                                                <div className="flex gap-2 items-center">
                                                    <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                                                    <p className="text-xs font-semibold text-emerald-800">{result.treatment[0]}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <button onClick={resetScan} className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all active:scale-[0.98]">
                                        Perform Another Scan
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    )}
                </section>

                {/* Market Intelligence */}
                <MarketTeaser />

                {/* Fertilizer Section */}
                <FertilizerStock />

                {/* Farming Tools */}
                <FarmingTools />
            </main>
        </div>
    );
};

export default Home;
