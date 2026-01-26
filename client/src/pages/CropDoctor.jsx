import { useState } from 'react';
import api from '../api';
import { Camera, Upload, CheckCircle, AlertTriangle, Loader2, ScanLine, ShieldCheck, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CropDoctor = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setResult(null);
        }
    };

    const handleAnalyze = async () => {
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await api.post('/crop/detect', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setResult(res.data);
        } catch (err) {
            console.error("Error analyzing crop", err);
            alert("Analysis failed. Please ensure the image is clear and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] pb-32">
            {/* Header */}
            <header className="bg-white px-6 py-6 border-b border-slate-100 flex items-center gap-4 sticky top-0 z-40 backdrop-blur-md bg-white/90">
                <button onClick={() => navigate(-1)} className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 active:scale-90 transition-transform border border-slate-100">
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">AI Crop Doctor</h1>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-1">Diagnostic Laboratory</p>
                </div>
            </header>

            <main className="px-5 mt-8 max-w-2xl mx-auto">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
                    {!preview ? (
                        <div className="py-10 space-y-6">
                            <div className="w-24 h-24 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center mx-auto text-slate-300 shadow-inner">
                                <Camera size={48} />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-lg font-bold text-slate-800">Ready for Diagnosis</h2>
                                <p className="text-sm font-medium text-slate-400 max-w-[240px] mx-auto">Upload a clear photo of an affected leaf for scientific analysis.</p>
                            </div>

                            <div className="flex gap-3 justify-center">
                                <label className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-100/50 active:scale-95 transition-all">
                                    <Camera size={18} /> Camera
                                    <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileChange} />
                                </label>
                                <label className="bg-white text-slate-700 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 cursor-pointer border border-slate-200 shadow-sm active:scale-95 transition-all">
                                    <Upload size={18} /> Gallery
                                    <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                                </label>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
                                <img src={preview} alt="Crop" className="w-full h-80 object-cover" />
                                <button
                                    onClick={() => { setFile(null); setPreview(null); setResult(null); }}
                                    className="absolute top-4 right-4 bg-slate-900/60 p-2 text-white rounded-full backdrop-blur-md border border-white/20"
                                >
                                    <ArrowLeft size={20} />
                                </button>
                            </div>

                            {!result && (
                                <button
                                    onClick={handleAnalyze}
                                    disabled={loading}
                                    className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-slate-200 disabled:opacity-50 transition-all active:scale-[0.98]"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="animate-spin" size={20} />
                                            <span>Analyzing Sample...</span>
                                        </>
                                    ) : 'Initiate Analysis'}
                                </button>
                            )}
                        </div>
                    )}
                </div>

                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-10 space-y-8 pb-20"
                        >
                            {/* Main Result Card */}
                            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden font-sans">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 blur-2xl border border-emerald-100/50"></div>

                                <div className="flex justify-between items-start mb-10 relative z-10">
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{result.crop}</h2>
                                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest mt-4 ${result.health === 'Healthy'
                                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200'
                                            : 'bg-rose-500 text-white shadow-lg shadow-rose-200'
                                            }`}>
                                            {result.health === 'Healthy' ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
                                            {result.health}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">AI Confidence</p>
                                        <p className="text-2xl font-bold text-emerald-600">{result.confidence}</p>
                                    </div>
                                </div>

                                {/* Symptoms Section */}
                                {result.symptoms && result.symptoms.length > 0 && (
                                    <div className="mb-10">
                                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2 border-b border-slate-100 pb-2">
                                            <ScanLine size={16} className="text-emerald-500" /> Observations
                                        </h3>
                                        <div className="grid grid-cols-1 gap-3">
                                            {result.symptoms.map((symptom, idx) => (
                                                <div key={idx} className="flex items-center gap-3 bg-slate-50/50 p-4 rounded-xl border border-slate-100 transition-all hover:bg-slate-100">
                                                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                                                    <p className="text-sm font-semibold text-slate-700">{symptom}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Treatment & Prevention Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                                    {result.treatment && result.treatment.length > 0 && (
                                        <div className="bg-emerald-50/30 p-6 rounded-2xl border border-emerald-100 relative overflow-hidden backdrop-blur-sm">
                                            <h3 className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-5 flex items-center gap-2">
                                                <CheckCircle size={14} /> Treatment Protocol
                                            </h3>
                                            <ul className="space-y-4">
                                                {result.treatment.map((step, idx) => (
                                                    <li key={idx} className="text-xs font-semibold text-emerald-900 flex gap-3">
                                                        <span className="shrink-0 text-emerald-400 font-bold">{idx + 1}.</span>
                                                        <span className="leading-relaxed">{step}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {result.prevention && result.prevention.length > 0 && (
                                        <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-200 relative overflow-hidden">
                                            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-5 flex items-center gap-2">
                                                <ShieldCheck size={14} /> Prevention Plan
                                            </h3>
                                            <ul className="space-y-4">
                                                {result.prevention.map((step, idx) => (
                                                    <li key={idx} className="text-xs font-semibold text-slate-700 flex gap-3 leading-relaxed">
                                                        <div className="w-1 h-1 bg-slate-300 rounded-full mt-2 shrink-0"></div>
                                                        {step}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={() => { setFile(null); setPreview(null); setResult(null); }}
                                    className="w-full mt-4 py-4 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-slate-200 active:scale-[0.98] transition-all hover:bg-slate-800"
                                >
                                    Dismiss & Analyze New Sample
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default CropDoctor;
