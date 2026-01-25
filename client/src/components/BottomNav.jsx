import { Home, ClipboardList, Bell, User } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const BottomNav = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    const { t } = useLanguage();

    const navItems = [
        { icon: Home, label: t('home'), path: '/' },
        { icon: ClipboardList, label: 'My Jobs', path: '/jobs' },
        { icon: Bell, label: t('alerts'), path: '/notifications' },
        { icon: User, label: t('profile'), path: '/profile' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 pb-safe-area z-50 rounded-t-[40px] shadow-2xl">
            <div className="flex justify-between items-center px-6 py-4 max-w-lg mx-auto">
                {navItems.map((item, idx) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);

                    return (
                        <Link
                            key={idx}
                            to={item.path}
                            className={`flex flex-col items-center justify-center gap-1 min-w-[70px] transition-all duration-300 ${active ? 'text-emerald-500' : 'text-slate-300'
                                }`}
                        >
                            <div className={`p-2 rounded-2xl transition-all duration-300 ${active ? 'bg-emerald-500 text-white scale-110 shadow-lg shadow-emerald-100' : ''}`}>
                                <Icon size={24} strokeWidth={active ? 2.5 : 2} />
                            </div>
                            <span className={`text-[9px] font-bold uppercase tracking-tight text-center ${active ? 'text-emerald-500' : 'text-slate-400'}`}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default BottomNav;
