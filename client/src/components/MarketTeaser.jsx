import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

const MarketTeaser = () => {
    // Demo Data
    const market = [
        { item: "Rice (Paddy)", price: 40, unit: "kg", trend: "stable" },
        { item: "Wheat", price: 35, unit: "kg", trend: "up" },
        { item: "Maize", price: 30, unit: "kg", trend: "down" },
        { item: "Vegetables", price: 60, unit: "kg", trend: "up" }
    ];

    return (
        <div className="space-y-4">
            {market.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center bg-[#F9FAFB] p-4 rounded-[24px]">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 flex items-center justify-center text-2xl">
                            {item.item?.includes("Rice") ? "🌾" : item.item?.includes("Wheat") ? "🌿" : item.item?.includes("Maize") ? "🌽" : "🥗"}
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-lg">{item.item}</h4>
                            <p className="text-gray-400 text-sm">per {item.unit}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-gray-900 text-lg">Rs {item.price}</p>
                        <div className="flex items-center justify-end gap-1 text-sm">
                            {item.trend === 'stable' && <Minus size={14} className="text-gray-400" />}
                            {item.trend === 'up' && <ArrowUpRight size={14} className="text-[#22C55E]" />}
                            {item.trend === 'down' && <ArrowDownRight size={14} className="text-red-500" />}

                            <span className={item.trend === 'up' ? 'text-[#22C55E]' : item.trend === 'down' ? 'text-red-500' : 'text-gray-400'}>
                                {item.trend === 'stable' ? 'Stable' : item.trend === 'up' ? '+1%' : '-2%'}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default MarketTeaser;
