import { Home, Briefcase, Bell, User } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const BottomNav = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const navItems = [
        { icon: Home, label: 'Home', path: '/' },
        { icon: Briefcase, label: 'Results', path: '/jobs' },
        { icon: Bell, label: 'Alerts', path: '/notifications' },
        { icon: User, label: 'Profile', path: '/profile' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] pb-safe-area z-50">
            <div className="flex justify-between items-center px-6 py-3 max-w-lg mx-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`touch-target flex flex-col items-center gap-1 transition-all active:scale-95 ${active ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
                                }`}
                            aria-label={item.label}
                        >
                            <div className={`p-2 rounded-2xl ${active ? 'bg-primary/10' : ''}`}>
                                <Icon size={active ? 28 : 24} strokeWidth={active ? 2.5 : 2} />
                            </div>
                            <span className={`text-xs font-bold ${active ? 'block' : 'hidden sm:block'}`}>
                                {item.label === 'Results' ? 'My Jobs' : item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default BottomNav;
