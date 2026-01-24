const MyJobs = () => {
    return (
        <div className="p-4 pb-20">
            <h1 className="text-xl font-bold mb-4">My Jobs Today</h1>
            <div className="space-y-3">
                {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                        <input type="checkbox" className="w-6 h-6 text-primary rounded-lg" />
                        <span className="flex-1 font-medium">Water the rice field</span>
                        <span className="text-sm text-gray-500">6:00 AM</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default MyJobs;
