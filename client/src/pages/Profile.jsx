import { MapPin, Phone, Mail, Settings, Bell, ChevronRight, Globe, ShieldCheck, User as UserIcon, LogOut } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { language, setLanguage, t } = useLanguage();
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'np' : 'en');
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };


    return (
        <div className="pb-32 bg-slate-50 min-h-screen text-slate-900 font-sans">
            {/* Clean Professional Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-2xl mx-auto px-6 py-12 flex flex-col items-center text-center">
                    <div className="relative mb-6">
                        <div className="w-24 h-24 rounded-3xl bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200 overflow-hidden shadow-sm">
                            <UserIcon size={48} strokeWidth={1.5} />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1.5 rounded-xl border-4 border-white shadow-sm">
                            <ShieldCheck size={16} />
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{user?.name || 'User'}</h1>
                    <p className="text-slate-500 text-sm font-medium mb-4 flex items-center gap-1.5">
                        <MapPin size={14} className="text-emerald-500" />
                        Dhangadhi, Nepal
                    </p>

                    <div className="inline-flex items-center px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-widest rounded-full border border-emerald-100">
                        Verified Account
                    </div>
                </div>
            </div>

            <div className="max-w-2xl mx-auto p-6 md:p-8 space-y-6">

                {/* Information Groups */}
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100">
                        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em]">Identity & Contact</h3>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="flex items-center justify-between group">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center border border-slate-100 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                                    <Mail size={18} />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Official Email</p>
                                    <p className="text-sm font-bold text-slate-900">{user?.email || 'N/A'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between group">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center border border-slate-100 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                                    <Phone size={18} />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Contact Number</p>
                                    <p className="text-sm font-bold text-slate-900">+977 98XXXXXXXX</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preferences */}
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden text-black">
                    <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100">
                        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] text-black">System Preferences</h3>
                    </div>
                    <div className="divide-y divide-slate-100 text-black">
                        <button
                            onClick={toggleLanguage}
                            className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors group text-black text-left"
                        >
                            <div className="flex items-center gap-4 text-black">
                                <Globe size={18} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                                <span className="text-sm font-bold text-slate-700">{t('language')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase">{language}</span>
                                <ChevronRight size={16} className="text-slate-300" />
                            </div>
                        </button>

                        <button className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors group text-left">
                            <div className="flex items-center gap-4">
                                <Bell size={18} className="text-slate-400 group-hover:text-amber-500 transition-colors" />
                                <span className="text-sm font-bold text-slate-700">{t('notifications')}</span>
                            </div>
                            <ChevronRight size={16} className="text-slate-300" />
                        </button>

                        <button className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors group text-left">
                            <div className="flex items-center gap-4">
                                <Settings size={18} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
                                <span className="text-sm font-bold text-slate-700">{t('settings')}</span>
                            </div>
                            <ChevronRight size={16} className="text-slate-300" />
                        </button>
                    </div>
                </div>

                {/* Dangerous Actions */}
                <div className="pt-4">
                    <button
                        onClick={handleLogout}
                        className="w-full py-4 bg-rose-50 text-rose-600 text-xs font-bold uppercase tracking-[0.2em] rounded-2xl border border-rose-100 hover:bg-rose-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        <LogOut size={16} />
                        Terminate Session
                    </button>
                </div>

                <p className="text-center text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] pt-4">
                    Authorized Access Only • AgroVision Registry v2.4
                </p>
            </div>
        </div>
    );
};

export default Profile;
