import { MapPin, Ruler, Wheat, Phone, Mail, Settings, Bell, ChevronRight, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Profile = () => {
    const { language, setLanguage, t } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'np' : 'en');
    };

    return (
        <div className="pb-32 bg-[#FDFBF7] min-h-screen p-6">

            {/* Profile Header Card */}
            <div className="bg-white rounded-[32px] p-6 shadow-sm mb-6 flex items-center gap-5">
                <img
                    src="https://img.freepik.com/premium-vector/farmer-avatar-vector-illustration-flat-style_603823-533.jpg"
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border-4 border-yellow-100"
                />
                <div>
                    <h1 className="text-xl font-bold text-gray-900">backupkamal857</h1>
                    <p className="text-gray-500 text-sm mb-1">backupkamal857@gmail.com</p>
                    <div className="flex items-center gap-1 text-[#22C55E] text-sm font-medium">
                        <MapPin size={14} />
                        <span>Dhangadhi, Nepal</span>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#ECFDF5] p-5 rounded-[32px] relative overflow-hidden">
                    <div className="flex items-center gap-2 mb-2 text-[#22C55E]">
                        <Ruler size={18} />
                        <span className="font-semibold text-sm">Farm Size</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">5.2</h3>
                    <p className="text-gray-500 text-sm">Bigha</p>
                </div>

                <div className="bg-[#FFFBEB] p-5 rounded-[32px] relative overflow-hidden">
                    <div className="flex items-center gap-2 mb-2 text-[#F59E0B]">
                        <Wheat size={18} />
                        <span className="font-semibold text-sm">Main Crops</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1">Rice, Maize</h3>
                    <p className="text-gray-500 text-sm">This season</p>
                </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-[32px] p-6 shadow-sm mb-6">
                <h2 className="font-bold text-lg text-gray-900 mb-6">Contact Information</h2>

                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-[#22C55E]">
                            <Phone size={20} />
                        </div>
                        <div>
                            <p className="text-gray-400 text-xs mb-0.5">Phone</p>
                            <p className="font-semibold text-gray-800">+977 98XXXXXXXX</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-[#22C55E]">
                            <Mail size={20} />
                        </div>
                        <div>
                            <p className="text-gray-400 text-xs mb-0.5">Email</p>
                            <p className="font-semibold text-gray-800 break-all text-sm">backupkamal857@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Settings List */}
            <div className="bg-white rounded-[32px] shadow-sm divide-y divide-gray-50">
                <div className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors first:rounded-t-[32px]">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                            <Settings size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800">{t('settings')}</h3>
                            <p className="text-gray-400 text-xs">{t('appPref')}</p>
                        </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-300" />
                </div>

                <div
                    className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={toggleLanguage}
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                            <Globe size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800">{t('language')}</h3>
                            <p className="text-gray-400 text-xs">{t('chooseLang')}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-primary">{language === 'en' ? 'English' : 'नेपाली'}</span>
                        <ChevronRight size={20} className="text-gray-300" />
                    </div>
                </div>

                <div className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors last:rounded-b-[32px]">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                            <Bell size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800">{t('notifications')}</h3>
                            <p className="text-gray-400 text-xs">{t('manageAlerts')}</p>
                        </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-300" />
                </div>
            </div>

        </div>
    );
};

export default Profile;
