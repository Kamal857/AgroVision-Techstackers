import { Bell, CloudRain, AlertTriangle, TrendingUp, Package, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Notifications = () => {
    const { t } = useLanguage();

    const alerts = [
        {
            id: 1,
            title: t('heavyRainTitle'),
            message: t('heavyRainMsg'),
            time: `2 ${t('hours')} ${t('ago')}`,
            type: "weather",
            isNew: true,
            icon: CloudRain,
            color: "bg-sky-500",
            textColor: "text-green-600"
        },
        {
            id: 2,
            title: t('pestTitle'),
            message: t('pestMsg'),
            time: `5 ${t('hours')} ${t('ago')}`,
            type: "warning",
            isNew: true,
            icon: AlertTriangle,
            color: "bg-amber-500",
            textColor: "text-green-600"
        },
        {
            id: 3,
            title: t('priceTitle'),
            message: t('priceMsg'),
            time: t('yesterday'),
            type: "market",
            isNew: false,
            icon: TrendingUp,
            color: "bg-green-500",
            textColor: "text-gray-900"
        },
        {
            id: 4,
            title: t('stockTitle'),
            message: t('stockMsg'),
            time: t('yesterday'),
            type: "stock",
            isNew: false,
            icon: Package,
            color: "bg-emerald-700",
            textColor: "text-gray-900"
        },
        {
            id: 5,
            title: t('taskReminder'),
            message: t('taskMsg'),
            time: t('tomorrowMorning'),
            type: "remidner",
            isNew: false,
            icon: Clock,
            color: "bg-stone-500",
            textColor: "text-gray-900"
        }
    ];

    return (
        <div className="pb-32 bg-[#FDFBF7] min-h-screen p-6">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{t('notifications')}</h1>
                    <p className="text-gray-500 text-sm">2 {t('newAlerts')}</p>
                </div>
                <div className="p-2 bg-green-100 rounded-full relative">
                    <Bell className="text-[#22C55E]" size={24} />
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#FDFBF7]">
                        2
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {alerts.map((alert) => {
                    const Icon = alert.icon;
                    return (
                        <div
                            key={alert.id}
                            className={`bg-white rounded-[32px] p-5 shadow-sm flex gap-4 relative overflow-hidden ${alert.isNew ? 'border-l-4 border-[#22C55E]' : ''}`}
                        >
                            <div className={`w-12 h-12 ${alert.color} rounded-full flex items-center justify-center flex-shrink-0 text-white shadow-sm`}>
                                <Icon size={24} />
                            </div>

                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className={`font-bold ${alert.textColor} text-base mb-1`}>{alert.title}</h3>
                                    {alert.isNew && <div className="w-2.5 h-2.5 bg-[#22C55E] rounded-full mt-1.5"></div>}
                                </div>
                                <p className="text-gray-500 text-sm leading-snug mb-2">{alert.message}</p>
                                <p className="text-gray-400 text-xs">{alert.time}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Notifications;
