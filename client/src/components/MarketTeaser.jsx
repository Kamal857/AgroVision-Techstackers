import { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, Minus, Loader2, ChevronRight, TrendingUp, RefreshCw } from 'lucide-react';
import axios from 'axios';

const MarketTeaser = () => {
    const [market, setMarket] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/market')
            .then(res => setMarket(res.data.slice(0, 5)))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center py-20 bg-white">
            <Loader2 className="animate-spin text-emerald-600" size={32} />
        </div>
    );

    const getIcon = (item) => {
        const name = item.toLowerCase();
        if (name.includes("धान") || name.includes("rice")) return "🌾";
        if (name.includes("गहुँ") || name.includes("wheat")) return "🌿";
        if (name.includes("आलु") || name.includes("potato")) return "🥔";
        if (name.includes("गोलभेडा") || name.includes("tomato")) return "🍅";
        return "📦";
    };

    return (
        <div className="bg-white">
            {/* Header for the list */}
            <div className="grid grid-cols-12 px-6 py-3 border-b border-slate-50 bg-slate-50/50">
                <div className="col-span-1"></div>
                <div className="col-span-7 font-black text-[10px] text-slate-400 uppercase tracking-widest">Commodity</div>
                <div className="col-span-4 text-right font-black text-[10px] text-slate-400 uppercase tracking-widest">Pricing (NPR)</div>
            </div>

            <div className="divide-y divide-slate-50">
                {market.map((item, idx) => (
                    <div
                        key={idx}
                        className="grid grid-cols-12 items-center px-6 py-4 hover:bg-slate-50/50 transition-colors group cursor-pointer"
                    >
                        <div className="col-span-1 text-xl grayscale group-hover:grayscale-0 transition-all opacity-70 group-hover:opacity-100">
                            {getIcon(item.item)}
                        </div>
                        <div className="col-span-7 pl-2">
                            <h4 className="font-bold text-slate-900 text-sm tracking-tight">{item.item}</h4>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="text-[9px] font-black text-slate-300 uppercase tracking-tighter">LOC:</span>
                                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">{item.location?.split(' ')[0]}</span>
                            </div>
                        </div>
                        <div className="col-span-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                                {item.trend === 'up' && <TrendingUp size={12} className="text-emerald-500" />}
                                <span className="font-black text-slate-900">Rs {item.price}</span>
                            </div>
                            <div className="flex items-center justify-end gap-1 text-[9px] mt-0.5">
                                <span className="text-slate-400">per {item.unit}</span>
                                <div className={`w-1 h-1 rounded-full ${item.trend === 'up' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                                <span className={`font-bold ${item.trend === 'up' ? 'text-emerald-500' : 'text-slate-400'}`}>
                                    {item.trend === 'stable' ? '0.0%' : item.trend === 'up' ? '+1.2%' : '-0.5%'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer Interaction */}
            <div className="p-4 border-t border-slate-50">
                <div className="bg-emerald-50 rounded-xl p-3 flex justify-between items-center group cursor-pointer hover:bg-emerald-100 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-emerald-600 shadow-sm">
                            <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
                        </div>
                        <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Index Synced: Today</p>
                    </div>
                    <ChevronRight size={14} className="text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
            </div>
        </div>
    );
};
export default MarketTeaser;
