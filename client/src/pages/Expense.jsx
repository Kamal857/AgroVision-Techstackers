import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, TrendingDown, Calendar, Clock,
    Search, Filter, Trash2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAccountability } from '../context/AccountabilityContext';

const Expense = () => {
    const navigate = useNavigate();
    const { transactions, deleteTransaction } = useAccountability();

    const expenseTransactions = transactions.filter(t => t.type === 'expense');

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] pb-24">
            {/* Header */}
            <header className="bg-white px-6 py-8 border-b border-slate-100 sticky top-0 z-30">
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 active:scale-90 transition-transform"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-xl font-bold text-slate-900">Expense Ledger</h1>
                </div>

                <div className="flex gap-4">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Search expenses..."
                            className="w-full p-4 pl-12 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-rose-500/20"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    </div>
                    <button className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                        <Filter size={20} />
                    </button>
                </div>
            </header>

            <main className="px-6 py-8 max-w-lg mx-auto">
                <div className="space-y-4">
                    {expenseTransactions.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 mx-auto mb-6 opacity-50">
                                <TrendingDown size={40} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-400">No expense reports yet</h3>
                            <p className="text-sm text-slate-300 mt-2">Save a calculation as expense to see it here.</p>
                        </div>
                    ) : (
                        expenseTransactions.map((item, idx) => (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={item.id}
                                className="bg-white p-5 rounded-[32px] border border-slate-100 shadow-sm flex items-center justify-between group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center">
                                        <TrendingDown size={22} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                                        <div className="flex items-center gap-3 mt-1 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                                            <div className="flex items-center gap-1">
                                                <Calendar size={12} />
                                                {formatDate(item.timestamp)}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock size={12} />
                                                {formatTime(item.timestamp)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-bold text-rose-600">रु {item.total.toLocaleString()}</div>
                                    <button
                                        onClick={() => deleteTransaction(item.id)}
                                        className="mt-1 text-slate-200 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
};

export default Expense;
