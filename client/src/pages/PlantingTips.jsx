import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sprout } from 'lucide-react';

const PlantingTips = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-[#f8fafc] pb-24">
            <header className="bg-white px-6 py-8 border-b border-slate-100 flex items-center gap-4 sticky top-0 z-30">
                <button onClick={() => navigate(-1)} className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 active:scale-90 transition-transform">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Planting Tips</h1>
            </header>
            <main className="px-6 py-20 text-center">
                <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Sprout size={40} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Expert Planting Guides</h2>
                <p className="text-slate-400 mt-2 font-medium">Coming soon: Scientific advice for optimal planting.</p>
            </main>
        </div>
    );
};
export default PlantingTips;
