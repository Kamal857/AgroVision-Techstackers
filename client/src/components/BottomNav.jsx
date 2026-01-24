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
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe-area z-50">
            <div className="flex justify-between items-center px-6 py-2 max-w-lg mx-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex flex-col items-center justify-center gap-1 transition-all w-16 h-16 rounded-2xl ${active ? 'bg-[#22C55E] text-white shadow-lg -translate-y-4 border-4 border-gray-50' : 'text-gray-400 hover:text-gray-600'
                                }`}
                            aria-label={item.label}
                        >
                            <Icon size={active ? 24 : 24} strokeWidth={2.5} />
                            <span className={`text-[10px] font-bold ${active ? 'block' : 'block'}`}>
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
