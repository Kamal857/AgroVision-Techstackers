import { Home, Briefcase, Bell, User } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const BottomNav = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    const { t } = useLanguage();

    const navItems = [
        { icon: Home, label: t('home'), path: '/' },
        { icon: Briefcase, label: t('jobs'), path: '/jobs' },
        { icon: Bell, label: t('alerts'), path: '/notifications' },
        { icon: User, label: t('profile'), path: '/profile' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 glass-effect border-t border-slate-100 pb-safe-area z-50">
            <div className="flex justify-between items-center px-8 py-3 max-w-lg mx-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex flex-col items-center justify-center gap-1.5 transition-all duration-300 ${active ? 'text-emerald-600 scale-110' : 'text-slate-400 opacity-60 hover:opacity-100'
                                }`}
                            aria-label={item.label}
                        >
                            <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                            <span className={`text-[9px] font-black uppercase tracking-widest ${active ? 'block' : 'block opacity-0'}`}>
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
