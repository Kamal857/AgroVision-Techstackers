import { useState, useEffect } from 'react';
import api from '../api';
import { ArrowUpRight, ArrowDownRight, Minus, Search, Filter, RefreshCw, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const Market = () => {
    const [market, setMarket] = useState([]);
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);
    const [syncMessage, setSyncMessage] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await api.get('/market');
            setMarket(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSync = async () => {
        setSyncing(true);
        setSyncMessage(null);
        try {
            const res = await api.post('/market/sync');
            setSyncMessage({ type: 'success', text: `Synced ${res.data.count} items!` });
            fetchData(); // Refresh list
        } catch (err) {
            setSyncMessage({ type: 'error', text: 'Failed to sync live prices.' });
        } finally {
            setSyncing(false);
            // Hide message after 3 seconds
            setTimeout(() => setSyncMessage(null), 3000);
        }
    };

    const getTrendIcon = (trend) => {
        if (trend === 'up') return <ArrowUpRight size={16} className="text-emerald-500" />;
        if (trend === 'down') return <ArrowDownRight size={16} className="text-red-500" />;
        return <Minus size={16} className="text-gray-400" />;
    };

    const getIcon = (itemName) => {
        const name = itemName.toLowerCase();
        if (name.includes('tomato')) return "🍅";
        if (name.includes('potato')) return "🥔";
        if (name.includes('onion')) return "🧅";
        if (name.includes('cabbage')) return "🥬";
        if (name.includes('cauliflower')) return "🥦";
        if (name.includes('rice')) return "🌾";
        if (name.includes('wheat')) return "🌿";
        if (name.includes('chilli')) return "🌶️";
        if (name.includes('ginger') || name.includes('garlic')) return "🧄";
        if (name.includes('apple') || name.includes('banana')) return "🍎";
        return "🥗";
    };

    return (
        <div className="p-5 pb-24 bg-[#F8FAFC] min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Market Prices</h1>
                <button
                    onClick={handleSync}
                    disabled={syncing}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${syncing
                        ? 'bg-gray-100 text-gray-400'
                        : 'bg-[#22C55E] text-white shadow-lg shadow-green-200 active:scale-95'
                        }`}
                >
                    {syncing ? <RefreshCw size={16} className="animate-spin" /> : <RefreshCw size={16} />}
                    {syncing ? 'Syncing...' : 'Sync Live Prices'}
                </button>
            </div>

            {syncMessage && (
                <div className={`mb-4 p-3 rounded-xl flex items-center gap-2 animate-in slide-in-from-top duration-300 ${syncMessage.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
                    }`}>
                    {syncMessage.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                    <span className="text-sm font-medium">{syncMessage.text}</span>
                </div>
            )}

            <div className="flex gap-2 mb-6">
                <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                    <Search size={20} className="text-gray-400" />
                    <input type="text" placeholder="Search vegetables..." className="bg-transparent outline-none w-full text-sm" />
                </div>
            </div>

            <div className="space-y-4">
                {loading && !syncing ? (
                    <div className="flex flex-col items-center justify-center py-20 grayscale opacity-20">
                        <Loader2 className="animate-spin mb-4" size={40} />
                        <p className="font-medium">Fetching price board...</p>
                    </div>
                ) : market.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                        <p className="text-gray-400">No prices found. Click Sync to fetch live data!</p>
                    </div>
                ) : (
                    market.map((item, idx) => (
                        <div key={idx} className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-100 flex justify-between items-center transition-all hover:border-green-200">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl">
                                    {getIcon(item.item)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 leading-tight">{item.item}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                                            {item.location || 'Local'}
                                        </span>
                                        {item.lastUpdated && (
                                            <span className="text-[10px] text-gray-300 italic">
                                                {new Date(item.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-black text-[#22C55E]">Rs {item.price}</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">per {item.unit}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Market;
