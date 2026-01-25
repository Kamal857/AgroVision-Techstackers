import { useState, useEffect } from 'react';
import { ArrowUpRight, TrendingUp, RefreshCw, Minus } from 'lucide-react';
import axios from 'axios';

const MarketTeaser = () => {
    const [market, setMarket] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/market')
            .then(res => setMarket(res.data.slice(0, 10)))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
        </div>
    );

    const getIcon = (item) => {
        const name = item.toLowerCase();
        if (name.includes("धान") || name.includes("rice")) return { char: "🌾", color: "bg-amber-50" };
        if (name.includes("गहुँ") || name.includes("wheat")) return { char: "🌿", color: "bg-emerald-50" };
        if (name.includes("मकै") || name.includes("maize")) return { char: "🌽", color: "bg-yellow-50" };
        if (name.includes("आलु") || name.includes("potato")) return { char: "🥔", color: "bg-orange-50" };
        if (name.includes("गोलभेडा") || name.includes("tomato")) return { char: "🍅", color: "bg-red-50" };
        if (name.includes("प्याज") || name.includes("onion")) return { char: "🧅", color: "bg-orange-50" };
        if (name.includes("बन्दा") || name.includes("cabbage")) return { char: "🥬", color: "bg-green-50" };
        if (name.includes("काउली") || name.includes("cauliflower")) return { char: "🥦", color: "bg-teal-50" };
        if (name.includes("उखु") || name.includes("sugarcane")) return { char: "🎋", color: "bg-emerald-100" };
        if (name.includes("दूध") || name.includes("milk")) return { char: "🥛", color: "bg-blue-50" };
        return { char: "📦", color: "bg-slate-50" };
    };

    return (
        <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-50">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h3 className="text-xl font-bold text-slate-900 leading-tight">Market Prices</h3>
                    <p className="text-slate-400 text-xs font-bold mt-1">Dhangadhi - Dhangadhi market rates</p>
                </div>
                <div className="flex items-center gap-4">
                    <RefreshCw size={18} className="text-emerald-500" />
                    <button className="text-emerald-500 text-sm font-bold uppercase tracking-widest">See All</button>
                </div>
            </div>

            <div className="flex flex-col gap-6">
                {market.map((item, idx) => {
                    const icon = getIcon(item.item);
                    return (
                        <div key={idx} className="flex items-center justify-between group">
                            <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 ${icon.color} rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-black/5`}>
                                    {icon.char}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-lg">{item.item}</h4>
                                    <p className="text-xs text-slate-400 font-bold">per {item.unit}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-xl font-bold text-slate-900">रु {item.price}</div>
                                <div className={`flex items-center justify-end gap-1 text-[10px] font-bold uppercase tracking-widest mt-0.5 ${item.trend === 'up' ? 'text-emerald-500' : 'text-slate-400'}`}>
                                    {item.trend === 'up' ? <TrendingUp size={12} className="stroke-[3]" /> : <Minus size={12} className="stroke-[3]" />}
                                    <span>{item.trend === 'up' ? '+1.2%' : 'Stable'}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <p className="text-center text-[10px] text-slate-300 font-bold uppercase tracking-widest mt-10 opacity-70">
                Updated: {new Date().toLocaleDateString('en-CA')}
            </p>
        </div>
    );
};

export default MarketTeaser;
