import { Link } from 'react-router-dom';
import { Camera } from 'lucide-react';
// import WeatherCard from '../components/WeatherCard';
import MarketTeaser from '../components/MarketTeaser';

const Home = () => {
    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
            <header className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <p className="text-gray-500 text-sm font-medium">Welcome back,</p>
                    <h1 className="text-2xl font-bold text-gray-900">Farmer John 👋</h1>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">
                    J
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* <WeatherCard /> */}

                <Link to="/crop-doctor" className="block bg-emerald-900 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden group hover:shadow-xl transition-all">
                    <div className="z-10 relative">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                                <Camera size={24} />
                            </div>
                            <h3 className="text-xl font-bold">AI Crop Doctor</h3>
                        </div>
                        <p className="text-emerald-100 text-base leading-relaxed max-w-[80%]">
                            Take a photo of your crop to instantly detect diseases and get care tips.
                        </p>
                        <div className="mt-4 inline-flex items-center gap-2 bg-white text-emerald-900 px-4 py-2 rounded-xl font-bold text-sm">
                            dectect now 📸
                        </div>
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-emerald-800 rounded-full opacity-50 blur-2xl group-active:scale-150 transition-transform duration-500"></div>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MarketTeaser />

                <div className="card">
                    <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
                        <span>🛠️</span> Tools & Techniques
                    </h3>
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                        <div className="min-w-[240px] bg-gray-50 p-4 rounded-2xl border border-gray-100 flex-shrink-0 snap-center">
                            <div className="w-full h-32 bg-white rounded-xl mb-3 flex items-center justify-center text-6xl shadow-inner">🚜</div>
                            <h4 className="font-bold text-lg">Modern Plows</h4>
                            <p className="text-sm text-gray-600 mt-1">Increase specific efficiency by 30% with new blade designs.</p>
                        </div>
                        <div className="min-w-[240px] bg-gray-50 p-4 rounded-2xl border border-gray-100 flex-shrink-0 snap-center">
                            <div className="w-full h-32 bg-blue-50 rounded-xl mb-3 flex items-center justify-center text-6xl shadow-inner">💧</div>
                            <h4 className="font-bold text-lg">Drip Irrigation</h4>
                            <p className="text-sm text-gray-600 mt-1">Save up to 60% water while maintaining crop yield.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Home;
