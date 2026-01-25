import { useState, useEffect } from 'react';
import {
    ChevronLeft, Calculator, Search, ChevronRight,
    ArrowLeft, Save, Trash2, Plus, TrendingUp, TrendingDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccountability } from '../context/AccountabilityContext';

const CalculatorPage = () => {
    const navigate = useNavigate();
    const { addTransaction } = useAccountability();
    const [cropName, setCropName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [pricePerUnit, setPricePerUnit] = useState('');
    const [total, setTotal] = useState(0);
    const [showSaveOptions, setShowSaveOptions] = useState(false);
    const [saveStatus, setSaveStatus] = useState(null); // 'success' or null

    const crops = [
        'Rice', 'Wheat', 'Maize', 'Potato', 'Tomato', 'Onion',
        'Ginger (अदुवा)', 'Garlic', 'Cabbage', 'Cauliflower'
    ];

    useEffect(() => {
        const qty = parseFloat(quantity) || 0;
        const price = parseFloat(pricePerUnit) || 0;
        setTotal(qty * price);
    }, [quantity, pricePerUnit]);

    const handleSave = (type) => {
        if (!cropName || total <= 0) return;

        addTransaction({
            name: cropName,
            total: total,
            quantity: quantity,
            price: pricePerUnit,
            type: type // 'income' or 'expense'
        });

        setSaveStatus('success');
        setShowSaveOptions(false);
        setTimeout(() => setSaveStatus(null), 3000);
    };

    const clearFields = () => {
        setCropName('');
        setQuantity('');
        setPricePerUnit('');
        setTotal(0);
        setShowSaveOptions(false);
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] pb-24">
            {/* Header */}
            <header className="bg-white px-6 py-8 border-b border-slate-100 flex items-center gap-4 sticky top-0 z-30">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 active:scale-90 transition-transform"
                >
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-xl font-bold text-slate-900">Yield Calculator</h1>
            </header>

            <main className="px-6 py-8 max-w-lg mx-auto space-y-8">
                {/* Hero Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#0f172a] p-10 rounded-[48px] shadow-2xl relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Estimated Total Value</p>
                        <div className="flex items-center gap-4">
                            <span className="text-emerald-400 text-3xl font-bold">रु</span>
                            <h2 className="text-6xl font-bold text-white tracking-tight">
                                {total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </h2>
                        </div>
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute top-[-40px] right-[-40px] w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px]"></div>
                    <div className="absolute bottom-[-20px] left-[-20px] w-32 h-32 bg-blue-500/10 rounded-full blur-[60px]"></div>
                </motion.div>

                {/* Form Section */}
                <div className="space-y-6">
                    {/* Crop Name */}
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-2">Crop / Vegetable Name</label>
                        <div className="relative">
                            <input
                                list="crops-list"
                                type="text"
                                value={cropName}
                                onChange={(e) => setCropName(e.target.value)}
                                placeholder="Type or select a crop..."
                                className="w-full p-5 bg-white border border-slate-100 rounded-[32px] focus:outline-none focus:border-emerald-500 shadow-sm text-base font-bold text-slate-800 placeholder:text-slate-200"
                            />
                            <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-200" size={20} />
                            <datalist id="crops-list">
                                {crops.map((crop, idx) => (
                                    <option key={idx} value={crop} />
                                ))}
                            </datalist>
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-2">Quantity</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                placeholder="0.00"
                                className="w-full p-5 bg-white border border-slate-100 rounded-[32px] focus:outline-none focus:border-emerald-500 shadow-sm text-base font-bold text-slate-800 placeholder:text-slate-200"
                            />
                            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-300 uppercase">KG / LTR</span>
                        </div>
                    </div>

                    {/* Price Per Unit */}
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-2">Price per KG/Litre</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={pricePerUnit}
                                onChange={(e) => setPricePerUnit(e.target.value)}
                                placeholder="0.00"
                                className="w-full p-5 bg-white border border-slate-100 rounded-[32px] focus:outline-none focus:border-emerald-500 shadow-sm text-base font-bold text-slate-800 placeholder:text-slate-200"
                            />
                            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-300 uppercase">NPR / UNIT</span>
                        </div>
                    </div>
                </div>

                {/* Additional Actions */}
                <div className="relative">
                    <AnimatePresence>
                        {showSaveOptions && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                className="absolute bottom-full left-0 right-0 mb-6 p-6 bg-white rounded-[40px] shadow-2xl border border-slate-100 z-50 overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-500 to-rose-500 opacity-20"></div>
                                <h4 className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Choose Account Type</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => handleSave('income')}
                                        className="flex flex-col items-center gap-3 p-6 bg-emerald-50 text-emerald-600 rounded-[32px] font-bold hover:bg-emerald-100 transition-all active:scale-95"
                                    >
                                        <TrendingUp size={24} />
                                        <span className="text-[10px] uppercase tracking-widest">As Income</span>
                                    </button>
                                    <button
                                        onClick={() => handleSave('expense')}
                                        className="flex flex-col items-center gap-3 p-6 bg-rose-50 text-rose-600 rounded-[32px] font-bold hover:bg-rose-100 transition-all active:scale-95"
                                    >
                                        <TrendingDown size={24} />
                                        <span className="text-[10px] uppercase tracking-widest">As Expense</span>
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={clearFields}
                            className="flex items-center justify-center gap-3 p-5 bg-white border border-slate-100 rounded-[32px] text-slate-400 font-bold hover:bg-slate-50 transition-colors"
                        >
                            <Trash2 size={20} />
                            Clear
                        </button>
                        <button
                            onClick={() => setShowSaveOptions(!showSaveOptions)}
                            className={`flex items-center justify-center gap-3 p-5 rounded-[32px] font-bold transition-all active:scale-95 shadow-lg ${saveStatus === 'success'
                                ? 'bg-emerald-100 text-emerald-600 shadow-emerald-50'
                                : 'bg-emerald-500 text-white shadow-emerald-100'
                                }`}
                        >
                            {saveStatus === 'success' ? <Save size={20} /> : <Plus size={24} />}
                            {saveStatus === 'success' ? 'Saved!' : 'Save Entry'}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CalculatorPage;
