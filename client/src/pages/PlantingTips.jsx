import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Sprout, Calendar, Ruler, Users,
    Droplet, Thermometer, ChevronRight, CheckCircle2,
    Info, Search, Flower2, Leaf
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AgronomistChat from '../components/AgronomistChat';

const PlantingTips = () => {
    const navigate = useNavigate();
    const [selectedCrop, setSelectedCrop] = useState(null);
    const [activeTab, setActiveTab] = useState('spacing');

    const crops = [
        { id: 1, name: 'Maize', depth: '5-7 cm', spacing: '25-30 cm', companion: 'Beans, Squash', bad: 'Tomatoes', icon: <Flower2 size={20} /> },
        { id: 2, name: 'Tomato', depth: '1-2 cm', spacing: '45-60 cm', companion: 'Basil, Onion', bad: 'Potatoes', icon: <Flower2 size={20} /> },
        { id: 3, name: 'Potato', depth: '10-15 cm', spacing: '30-40 cm', companion: 'Beans, Corn', bad: 'Tomatoes', icon: <Sprout size={20} /> },
        { id: 4, name: 'Carrot', depth: '0.5-1 cm', spacing: '5-10 cm', companion: 'Onion, Leek', bad: 'Dill', icon: <Leaf size={20} /> },
    ];

    return (
        <div className="min-h-screen bg-[#f8fafc] pb-32">
            {/* Header */}
            <header className="bg-white px-6 py-6 border-b border-slate-100 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md bg-white/90">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 active:scale-90 transition-transform border border-slate-100">
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-lg font-bold text-slate-900 uppercase tracking-tight leading-none">Planting Intelligence</h1>
                        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-1">Scientific Farming Guide</p>
                    </div>
                </div>
                <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-100/50">
                    <Sprout size={20} />
                </div>
            </header>

            <main className="px-5 mt-6 space-y-8 max-w-2xl mx-auto">
                {/* Tabs */}
                <div className="flex bg-slate-100/50 p-1 rounded-2xl border border-slate-200/60">
                    {['spacing', 'calendar', 'companions'].map((tab) => (
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

                {activeTab === 'spacing' && (
                    <motion.section
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Ruler size={20} className="text-emerald-500" /> Depth & Spacing
                            </h3>

                            <div className="grid grid-cols-2 gap-3 mb-8">
                                {crops.map((crop) => (
                                    <button
                                        key={crop.id}
                                        onClick={() => setSelectedCrop(crop)}
                                        className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${selectedCrop?.id === crop.id
                                            ? 'border-emerald-500 bg-emerald-50/30'
                                            : 'border-slate-100 bg-slate-50/50 hover:bg-slate-100'
                                            }`}
                                    >
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedCrop?.id === crop.id ? 'bg-emerald-600 text-white' : 'bg-white text-slate-400 border border-slate-100 shadow-sm'
                                            }`}>
                                            {crop.icon}
                                        </div>
                                        <span className="text-xs font-bold text-slate-900">{crop.name}</span>
                                    </button>
                                ))}
                            </div>

                            <AnimatePresence mode="wait">
                                {selectedCrop ? (
                                    <motion.div
                                        key={selectedCrop.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="space-y-4"
                                    >
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-slate-900 rounded-2xl p-5 text-white">
                                                <p className="text-[10px] font-semibold text-white/50 uppercase tracking-widest mb-1">Planting Depth</p>
                                                <p className="text-xl font-bold">{selectedCrop.depth}</p>
                                            </div>
                                            <div className="bg-emerald-600 rounded-2xl p-5 text-white shadow-lg shadow-emerald-100/20">
                                                <p className="text-[10px] font-semibold text-white/50 uppercase tracking-widest mb-1">Recommended Spacing</p>
                                                <p className="text-xl font-bold">{selectedCrop.spacing}</p>
                                            </div>
                                        </div>
                                        <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
                                            <div className="flex gap-4 items-start">
                                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-500 shrink-0 shadow-sm border border-blue-100">
                                                    <Info size={20} />
                                                </div>
                                                <p className="text-xs font-medium text-blue-800 leading-relaxed pt-1">
                                                    Proper spacing ensures each plant gets enough nutrients and air circulation, preventing disease spread.
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl p-8 text-center">
                                        <p className="text-sm font-medium text-slate-400">Select a crop to see scientific spacing details</p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.section>
                )}

                {activeTab === 'calendar' && (
                    <motion.section
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Calendar size={20} className="text-indigo-500" /> Optimal Planting
                            </h3>
                            <div className="space-y-4">
                                <div className="p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100 flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-500 shadow-sm border border-indigo-100">
                                        <Thermometer size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Scientific Tip</p>
                                        <p className="text-xs font-semibold text-indigo-900 mt-1">Sow warm-season crops when soil temp is consistently 15°C+.</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-2">
                                    {['Prepare soil for high nitrogen crops', 'Start tomato seedlings indoors', 'Transplant mature cabbage'].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-100/50">
                                            <span className="text-xs font-semibold text-slate-700">{item}</span>
                                            <CheckCircle2 size={16} className="text-emerald-500" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.section>
                )}

                {activeTab === 'companions' && (
                    <motion.section
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Users size={20} className="text-rose-500" /> Companion Planting
                            </h3>
                            <div className="space-y-3">
                                {crops.map((crop) => (
                                    <div key={crop.id} className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-slate-900 shadow-sm border border-slate-200/50">
                                                {crop.icon}
                                            </div>
                                            <h4 className="font-bold text-slate-900 text-sm">{crop.name}</h4>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Good Friends</p>
                                                <p className="text-xs font-semibold text-slate-600">{crop.companion}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest mb-1">Keep Away</p>
                                                <p className="text-xs font-semibold text-slate-600">{crop.bad}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.section>
                )}

                {/* Soil Preparation Card */}
                <section className="bg-slate-900 rounded-3xl p-7 text-white relative overflow-hidden shadow-xl shadow-slate-200/50">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                    <h3 className="text-lg font-bold mb-6 relative z-10">Soil Preparation Checklist</h3>
                    <div className="space-y-3 relative z-10">
                        {['Clear land of large rocks', 'Add 2 inches of compost', 'Test soil pH balance', 'Loosen soil to 12 inches'].map((step, i) => (
                            <div key={i} className="flex gap-4 items-center bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                                <div className="w-6 h-6 rounded-lg bg-emerald-500 flex items-center justify-center text-[10px] font-bold shadow-lg shadow-emerald-500/20">
                                    {i + 1}
                                </div>
                                <p className="text-xs font-semibold">{step}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* AI Chat Integration */}
            <AgronomistChat />
        </div>
    );
};

export default PlantingTips;
