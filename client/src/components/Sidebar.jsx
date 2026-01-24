import { useState, useEffect } from 'react';
import { X, Calculator, Settings, User, LogOut, Info, ShieldCheck, ChevronRight, LayoutDashboard } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const Sidebar = ({ isOpen, onClose }) => {
    const { t } = useLanguage();
    const [selectedCrop, setSelectedCrop] = useState('');
    const [quantity, setQuantity] = useState('');
    const [total, setTotal] = useState(0);
    const [marketData, setMarketData] = useState([]);

    useEffect(() => {
        if (isOpen) {
            axios.get('/api/market')
                .then(res => {
                    setMarketData(res.data);
                    if (res.data.length > 0 && !selectedCrop) {
                        setSelectedCrop(res.data[0].item);
                    }
                })
                .catch(err => console.error("Failed to fetch market data", err));
        }
    }, [isOpen]);

    useEffect(() => {
        const item = marketData.find(m => m.item === selectedCrop);
        const price = item ? item.price : 0;
        const qty = parseFloat(quantity) || 0;
        setTotal(price * qty);
    }, [selectedCrop, quantity, marketData]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Minimalist Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/40 z-40 backdrop-blur-sm transition-opacity"
                    ></motion.div>

                    {/* Pro Sidebar Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-85 bg-white z-50 shadow-2xl flex flex-col border-l border-slate-100"
                    >

                        {/* Top Header */}
                        <div className="flex justify-between items-center p-6 border-b border-slate-50">
                            <h2 className="font-black text-xs uppercase tracking-widest text-slate-400">{t('menu')}</h2>
                            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Professional Profile Section */}
                        <div className="p-6 bg-slate-50/50">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <img
                                        src="https://img.freepik.com/premium-vector/farmer-avatar-vector-illustration-flat-style_603823-533.jpg"
                                        alt="Profile"
                                        className="w-14 h-14 rounded-2xl border-2 border-white shadow-sm object-cover"
                                    />
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center">
                                        <ShieldCheck size={10} className="text-white" />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-black text-slate-900 text-base truncate">backupkamal857</h3>
                                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wide truncate">Verified Merchant</p>
                                </div>
                            </div>
                        </div>

                        {/* Calculator Component - Integrated */}
                        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                            <div className="space-y-8">
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-black text-[10px] uppercase tracking-widest text-emerald-600 flex items-center gap-2">
                                            <Calculator size={14} />
                                            Yield Estimator
                                        </h3>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Asset</label>
                                            <select
                                                value={selectedCrop}
                                                onChange={(e) => setSelectedCrop(e.target.value)}
                                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 appearance-none text-sm font-bold text-slate-700"
                                            >
                                                {marketData.length === 0 ? (
                                                    <option>Connecting to Index...</option>
                                                ) : (
                                                    marketData.map((m, idx) => (
                                                        <option key={idx} value={m.item}>
                                                            {m.item} (NPR {m.price})
                                                        </option>
                                                    ))
                                                )}
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Quantity (Units)</label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    value={quantity}
                                                    onChange={(e) => setQuantity(e.target.value)}
                                                    placeholder="0.00"
                                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-sm font-bold text-slate-700"
                                                />
                                                <span className="absolute right-4 top-3 text-[10px] font-black text-slate-400 uppercase">KG/LTR</span>
                                            </div>
                                        </div>

                                        <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-xl shadow-slate-200">
                                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Estimated Value</p>
                                            <h4 className="text-2xl font-black tracking-tight">
                                                <span className="text-emerald-400 mr-2">NPR</span>
                                                {total.toLocaleString()}
                                            </h4>
                                        </div>
                                    </div>
                                </div>

                                {/* Secondary Navigation */}
                                <div className="space-y-2">
                                    <h3 className="font-black text-[10px] uppercase tracking-widest text-slate-400 mb-4">Operations</h3>
                                    {[
                                        { icon: LayoutDashboard, label: 'Control Center' },
                                        { icon: Settings, label: 'Core Settings' },
                                        { icon: Info, label: 'Documentation' }
                                    ].map((item, idx) => (
                                        <button key={idx} className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors group">
                                            <div className="flex items-center gap-3">
                                                <item.icon size={18} className="text-slate-400 group-hover:text-emerald-600 transition-colors" />
                                                <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">{item.label}</span>
                                            </div>
                                            <ChevronRight size={14} className="text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Pro Footer */}
                        <div className="p-6 border-t border-slate-50 bg-slate-50/30 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Systems Active</span>
                            </div>
                            <button className="text-rose-500 p-2 hover:bg-rose-50 rounded-lg transition-colors">
                                <LogOut size={18} />
                            </button>
                        </div>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Sidebar;
