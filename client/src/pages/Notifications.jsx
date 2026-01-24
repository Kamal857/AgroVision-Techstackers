const Notifications = () => {
    return (
        <div className="p-4 pb-20">
            <h1 className="text-xl font-bold mb-4">Notifications</h1>
            <div className="space-y-3">
                <div className="bg-red-50 p-3 rounded-xl border border-red-100">
                    <h3 className="font-semibold text-red-600">Weather Alert</h3>
                    <p className="text-sm text-gray-600">Heavy rain expected tomorrow.</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                    <h3 className="font-semibold text-blue-600">Market Update</h3>
                    <p className="text-sm text-gray-600">Wheat price up by 5%.</p>
                </div>
            </div>
        </div>
    );
};
export default Notifications;
