import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, FileUp, Leaf, RefreshCw, Menu } from 'lucide-react';
import WeatherCard from '../components/WeatherCard';
import MarketTeaser from '../components/MarketTeaser';
import Sidebar from '../components/Sidebar';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { t } = useLanguage();

    return (
        <div className="pb-32 bg-[#FDFBF7] min-h-screen">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Hero Header */}
            <header className="relative h-64 w-full overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                <img
                    src="https://images.unsplash.com/photo-1518260844510-9cb5f36e4f16?q=80&w=2070&auto=format&fit=crop"
                    alt="Rice Fields"
                    className="w-full h-full object-cover"
                />

                {/* Menu Button - Top Right */}
                <div className="absolute top-4 right-4 z-20">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="w-10 h-10 bg-[#22C55E] rounded-full flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform"
                    >
                        <Menu size={20} />
                    </button>
                </div>

                <div className="absolute bottom-6 left-6 z-20 text-white">
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 bg-[#22C55E] rounded-full flex items-center justify-center">
                            <Leaf size={20} className="text-white" />
                        </div>
                        <h1 className="text-3xl font-bold">AgroVision</h1>
                    </div>
                    <p className="text-gray-100 text-sm font-medium">{t('welcome')}, backupkamal857! 🙏</p>
                </div>
            </header>

            <div className="p-6 -mt-6 relative z-30 space-y-6">
                {/* Weather Card */}
                <WeatherCard />

                {/* AI Crop Doctor Section */}
                <div className="bg-white rounded-[32px] p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-[#22C55E] rounded-full flex items-center justify-center text-white">
                                <Leaf size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-900">{t('aiCropDoctor')}</h3>
                                <p className="text-gray-500 text-sm">{t('scanAdvice')}</p>
                            </div>
                        </div>
                        <span className="bg-green-50 text-[#22C55E] text-xs font-bold px-3 py-1 rounded-full border border-green-200">
                            ✨ AI
                        </span>
                    </div>

                    <div className="border-2 border-dashed border-green-200 rounded-[32px] p-8 text-center bg-green-50/30">
                        <div className="flex justify-center gap-4 mb-6">
                            <Link to="/crop-doctor" className="bg-[#22C55E] text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-lg shadow-green-200 active:scale-95 transition-transform">
                                <Camera size={20} /> {t('camera')}
                            </Link>
                            <Link to="/crop-doctor" className="bg-[#FFA500] text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-lg shadow-orange-200 active:scale-95 transition-transform">
                                <FileUp size={20} /> {t('file')}
                            </Link>
                        </div>
                        <h4 className="font-bold text-gray-800 text-lg">{t('takePhoto')}</h4>
                        <p className="text-gray-400 text-sm">{t('cropLeaf')}</p>
                    </div>
                </div>

                {/* Market Prices Section - Matching Image 2 */}
                <div className="bg-white rounded-[32px] p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="font-bold text-lg text-gray-900">{t('marketPrices')}</h3>
                            <div className="flex items-center gap-2 text-gray-500 text-xs mt-1">
                                <span>Dhangadhi - Dhangadhi {t('marketRates')}</span>
                                <RefreshCw size={12} />
                            </div>
                        </div>
                        <Link to="/market" className="text-[#22C55E] font-bold text-sm">
                            {t('seeAll')}
                        </Link>
                    </div>

                    {/* Using MarketTeaser logic but ensuring style match */}
                    <MarketTeaser />
                </div>
            </div>
        </div>
    );
};
export default Home;
