import { Link } from 'react-router-dom';

const MarketTeaser = () => {
    const [market, setMarket] = useState([]);

    useEffect(() => {
        axios.get('/api/market')
            .then(res => setMarket(res.data.slice(0, 4))) // Show top 4 to include Maize
            .catch(err => console.error(err));
    }, []);
    // ...
    return (
        <div className="card h-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-gray-800">Market Prices</h3>
                <Link to="/market" className="text-primary text-sm font-semibold hover:underline">See All</Link>
            </div>

            <div className="space-y-4">
                {market.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-lg shadow-sm">
                                {item.item.includes("Rice") ? "🌾" : item.item.includes("Wheat") ? "🌿" : item.item.includes("Maize") ? "🌽" : "🥗"}
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">{item.item}</p>
                                <p className="text-xs text-gray-500">per {item.unit}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-gray-800">Rs {item.price}</p>
                            <div className="flex items-center justify-end gap-1 text-xs">
                                {getTrendIcon(item.trend)}
                                <span className={item.trend === 'up' ? 'text-emerald-500' : item.trend === 'down' ? 'text-red-500' : 'text-gray-400'}>
                                    {item.trend === 'stable' ? 'Stable' : item.trend === 'up' ? '+2%' : '-1%'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MarketTeaser;
