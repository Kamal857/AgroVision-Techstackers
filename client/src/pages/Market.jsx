import { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowUpRight, ArrowDownRight, Minus, Search, Filter } from 'lucide-react';

const Market = () => {
    const [market, setMarket] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/market')
            .then(res => setMarket(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const getTrendIcon = (trend) => {
        if (trend === 'up') return <ArrowUpRight size={16} className="text-emerald-500" />;
        if (trend === 'down') return <ArrowDownRight size={16} className="text-red-500" />;
        return <Minus size={16} className="text-gray-400" />;
    };

    return (
        <div className="p-5 pb-24">
            <h1 className="text-2xl font-bold mb-6">Market Prices</h1>

            <div className="flex gap-2 mb-6">
                <div className="flex-1 bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex items-center gap-2">
                    <Search size={20} className="text-gray-400" />
                    <input type="text" placeholder="Search crops..." className="bg-transparent outline-none w-full" />
                </div>
                <button className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 text-gray-600">
                    <Filter size={20} />
                </button>
            </div>

            <div className="space-y-3">
                {loading ? (
                    <p className="text-center text-gray-500">Loading prices...</p>
                ) : (
                    market.map((item, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-xl">
                                    {item.item.includes("Rice") ? "🌾" : item.item.includes("Wheat") ? "🌿" : item.item.includes("Milk") ? "🥛" : item.item.includes("Ghee") ? "🧈" : "🥗"}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800">{item.item}</h3>
                                    <p className="text-xs text-gray-500">{item.location}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-primary">Rs {item.price}</p>
                                <p className="text-xs text-gray-400">per {item.unit}</p>
                                <div className="flex items-center justify-end gap-1 text-xs mt-1">
                                    {getTrendIcon(item.trend)}
                                    <span className={item.trend === 'up' ? 'text-emerald-500' : item.trend === 'down' ? 'text-red-500' : 'text-gray-400'}>
                                        {item.trend === 'stable' ? 'Stable' : item.trend === 'up' ? '+2%' : '-1%'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
export default Market;
