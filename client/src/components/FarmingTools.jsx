const FarmingTools = () => {
    const tools = [
        { name: 'Planting Guide', desc: 'How to prepare soil', icon: '🧺', color: 'bg-orange-50' },
        { name: 'Irrigation Tips', desc: 'Water management', icon: '💧', color: 'bg-blue-50' },
        { name: 'Pest Control', desc: 'Protect your crops', icon: '🕸️', color: 'bg-rose-50' },
        { name: 'Crop Calendar', desc: 'Best planting seasons', icon: '📅', color: 'bg-emerald-50' },
    ];

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900 px-2 uppercase tracking-tight">Farming Tools</h3>
            <div className="grid grid-cols-2 gap-4">
                {tools.map((tool, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-[32px] border border-slate-50 shadow-sm flex flex-col gap-4">
                        <div className={`w-12 h-12 ${tool.color} rounded-2xl flex items-center justify-center text-2xl`}>
                            {tool.icon}
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-sm leading-tight mb-1">{tool.name}</h4>
                            <p className="text-[10px] text-slate-400 font-bold leading-tight">{tool.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FarmingTools;
