import { useState } from 'react';
import {
    X, Calculator, User, LogOut, ShieldCheck,
    ChevronRight, Wallet, TrendingUp,
    TrendingDown, Package, PieChart, Settings, Bell,
    Sprout, Droplets, CalendarDays, Bug, BrainCircuit
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const { user, logout } = useAuth();


    const menuItems = [
        { icon: Calculator, label: t('calculator'), color: 'text-emerald-600', bg: 'bg-emerald-50', path: '/calculator' },
        { icon: TrendingUp, label: t('income'), color: 'text-blue-600', bg: 'bg-blue-50', path: '/income' },
        { icon: TrendingDown, label: t('expense'), color: 'text-rose-600', bg: 'bg-rose-50', path: '/expense' },
        { icon: Package, label: t('stock'), color: 'text-amber-600', bg: 'bg-amber-50', path: '/stock' },
        { icon: PieChart, label: t('marketAnalytics'), color: 'text-indigo-600', bg: 'bg-indigo-50', path: '/analytics' },
        { icon: Bell, label: t('notifications'), color: 'text-teal-600', bg: 'bg-teal-50', path: '/notifications' },
    ];

    const intelligenceItems = [
        { icon: BrainCircuit, label: t('aiDiseaseDetection'), color: 'text-emerald-400', bg: 'bg-emerald-50', path: '/crop-doctor' },
        { icon: Sprout, label: t('plantingTips'), color: 'text-emerald-500', bg: 'bg-emerald-50', path: '/planting-tips' },
        { icon: Droplets, label: t('irrigationTips'), color: 'text-sky-500', bg: 'bg-sky-50', path: '/irrigation-tips' },
        { icon: CalendarDays, label: t('cropCalendar'), color: 'text-indigo-500', bg: 'bg-indigo-50', path: '/crop-calendar' },
        { icon: Bug, label: t('pestControl'), color: 'text-rose-500', bg: 'bg-rose-50', path: '/pest-control' },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/40 z-[90] backdrop-blur-sm transition-opacity"
                    ></motion.div>

                    {/* Side Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-80 bg-white z-[100] shadow-2xl flex flex-col border-l border-slate-100"
                    >
                        {/* Professional Profile Header */}
                        <div className="p-8 pb-10 bg-gradient-to-br from-slate-50 to-white">
                            <div className="flex justify-between items-start mb-8">
                                <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-100 border border-emerald-400/20">
                                    <User size={32} />
                                </div>
                                <button onClick={onClose} className="p-3 bg-white text-slate-400 hover:text-slate-900 rounded-2xl shadow-sm border border-slate-100 transition-all active:scale-90">
                                    <X size={20} />
                                </button>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                    {user?.name || 'User'}
                                    <ShieldCheck size={18} className="text-emerald-500" />
                                </h3>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Verified Merchant ID: #857</p>
                            </div>
                        </div>

                        {/* Navigation Menu */}
                        <div className="flex-1 overflow-y-auto px-4 pb-8 scrollbar-hide">
                            <div className="space-y-1">
                                <p className="px-4 text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-3">{t('intelligence') || 'Agricultural Intelligence'}</p>
                                {intelligenceItems.map((item, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            if (item.path) navigate(item.path);
                                            onClose();
                                        }}
                                        className="w-full flex items-center justify-between p-4 hover:bg-slate-50 rounded-3xl transition-all group active:scale-[0.98]"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                                                <item.icon size={22} />
                                            </div>
                                            <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors uppercase tracking-tight">
                                                {item.label}
                                            </span>
                                        </div>
                                        <ChevronRight size={16} className="text-slate-200 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                                    </button>
                                ))}
                            </div>

                            <div className="mt-8 space-y-1">
                                <p className="px-4 text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-3">{t('management') || 'Management'}</p>
                                {menuItems.map((item, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            if (item.path) navigate(item.path);
                                            onClose();
                                        }}
                                        className="w-full flex items-center justify-between p-4 hover:bg-slate-50 rounded-3xl transition-all group active:scale-[0.98]"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                                                <item.icon size={22} />
                                            </div>
                                            <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors uppercase tracking-tight">
                                                {item.label}
                                            </span>
                                        </div>
                                        <ChevronRight size={16} className="text-slate-200 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                                    </button>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-50 space-y-1">
                                <p className="px-4 text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-3">Settings</p>
                                <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 rounded-3xl transition-all active:scale-[0.98]">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center border border-slate-100">
                                            <Settings size={22} />
                                        </div>
                                        <span className="text-sm font-bold text-slate-700 uppercase tracking-tight">{t('generalSettings')}</span>
                                    </div>
                                    <ChevronRight size={16} className="text-slate-200 transition-all" />
                                </button>
                            </div>
                        </div>

                        {/* Professional Footer */}
                        <div className="p-8 border-t border-slate-50 flex items-center justify-between bg-slate-50/30 backdrop-blur-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Server-01 Active</span>
                            </div>
                            <button
                                onClick={() => {
                                    logout();
                                    navigate('/login');
                                    onClose();
                                }}
                                className="flex items-center gap-2 px-6 py-3 bg-white text-rose-500 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-rose-50 border border-slate-100 shadow-sm transition-all active:scale-95"
                            >
                                <LogOut size={16} />
                                {t('signOut')}
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Sidebar;
