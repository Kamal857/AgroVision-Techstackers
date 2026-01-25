import { MapPin, Phone, AlertCircle } from 'lucide-react';

const FertilizerStock = () => {
    const stocks = [
        { name: 'Urea', amount: '500', unit: 'kg', location: 'Dhanari Depot', phone: '023-420124', status: 'In Stock', color: 'emerald' },
        { name: 'DAP', amount: '120', unit: 'kg', location: 'Bahari Center', phone: '023-580468', status: 'Low Stock', color: 'amber' },
        { name: 'Potash', amount: '0', unit: 'kg', location: 'Khalnagar Depot', phone: '023-440789', status: 'Out of Stock', color: 'rose' },
    ];

    return (
        <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-50">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 leading-tight">Fertilizer Stock</h3>
                    <p className="text-slate-400 text-xs font-bold mt-1">Check availability nearby</p>
                </div>
            </div>

            <div className="space-y-4">
                {stocks.map((item, idx) => (
                    <div key={idx} className={`p-6 rounded-[32px] border ${item.color === 'emerald' ? 'bg-emerald-50/30 border-emerald-100' :
                        item.color === 'amber' ? 'bg-amber-50/30 border-amber-100' :
                            'bg-rose-50/30 border-rose-100'
                        }`}>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="text-slate-500 font-bold text-sm">{item.name}</h4>
                                <div className="flex items-baseline gap-1 mt-1">
                                    <span className="text-2xl font-bold text-slate-900">{item.amount}</span>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.unit}</span>
                                </div>
                            </div>
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${item.color === 'emerald' ? 'bg-emerald-500 text-white' :
                                item.color === 'amber' ? 'bg-emerald-500 text-white' : // matching reference image (Reserve button is green even for low stock)
                                    'bg-rose-100 text-rose-500' // Out of stock
                                }`}>
                                {item.status === 'Out of Stock' ? 'Out of Stock' : 'Reserve'}
                            </span>
                        </div>
                        <div className="flex flex-col gap-2 opacity-60">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                                <MapPin size={12} />
                                {item.location}
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                                <Phone size={12} />
                                {item.phone}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 p-5 bg-blue-50/50 rounded-[24px] border border-blue-100 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-500 shrink-0 shadow-sm">
                    <AlertCircle size={16} />
                </div>
                <p className="text-xs font-bold text-blue-600 leading-relaxed">
                    New Stock Alert: DAP arriving next week at Dhanari Depot
                </p>
            </div>
        </div>
    );
};

export default FertilizerStock;
