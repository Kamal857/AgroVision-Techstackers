const Profile = () => {
    return (
        <div className="p-4 pb-20">
            <h1 className="text-xl font-bold mb-4">Profile</h1>
            <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-3xl">👨‍🌾</div>
                <div>
                    <h2 className="font-semibold text-lg">Kamal Bohara</h2>
                    <p className="text-gray-500 text-sm">Dhangadhi, Nepal</p>
                </div>
            </div>

            <div className="space-y-2">
                <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex justify-between">
                    <span>Language (भाषा)</span>
                    <span className="text-primary font-medium">Nepali</span>
                </div>
            </div>
        </div>
    );
};
export default Profile;
