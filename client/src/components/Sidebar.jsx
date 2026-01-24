import { useState, useEffect } from 'react';
import { X, Calculator, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Sidebar = ({ isOpen, onClose }) => {
    const { t } = useLanguage();
    const [selectedCrop, setSelectedCrop] = useState('Rice');
    const [quantity, setQuantity] = useState('');
    const [total, setTotal] = useState(0);

    const prices = {
        'Rice': 40,
        'Wheat': 35,
        'Maize': 30,
        'Vegetables': 60,
        'Milk': 90
    };

    useEffect(() => {
        const price = prices[selectedCrop] || 0;
        const qty = parseFloat(quantity) || 0;
        setTotal(price * qty);
    }, [selectedCrop, quantity]);

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                ></div>
            )}

            {/* Sidebar Panel */}
            <div className={`fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                {/* Header / Close */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="font-bold text-xl text-gray-800">{t('menu')}</h2>
                    <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Profile Section */}
                <div className="p-6 bg-[#FDFBF7] border-b border-gray-100">
                    <div className="flex items-center gap-4 mb-2">
                        <img
                            src="https://img.freepik.com/premium-vector/farmer-avatar-vector-illustration-flat-style_603823-533.jpg"
                            alt="Profile"
                            className="w-16 h-16 rounded-full border-4 border-white shadow-sm"
                        />
                        <div>
                            <h3 className="font-bold text-lg text-gray-900 leading-tight">backupkamal857</h3>
                            <p className="text-gray-500 text-xs">Dhangadhi, Nepal</p>
                        </div>
                    </div>
                </div>

                {/* Calculator Section */}
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-6 text-[#22C55E]">
                        <Calculator size={24} />
                        <h3 className="font-bold text-lg">{t('cropCalculator')}</h3>
                    </div>

                    <div className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">{t('selectCrop')}</label>
                            <select
                                value={selectedCrop}
                                onChange={(e) => setSelectedCrop(e.target.value)}
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] transition-all"
                            >
                                {Object.keys(prices).map(crop => (
                                    <option key={crop} value={crop}>{t(crop.toLowerCase()) || crop} (Rs {prices[crop]})</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">{t('quantity')}</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    placeholder="Enter quantity"
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] transition-all"
                                />
                                <span className="absolute right-4 top-3 text-gray-400 text-sm font-medium">kg/ltr</span>
                            </div>
                        </div>

                        {/* Result Card */}
                        <div className="bg-[#22C55E] text-white p-5 rounded-2xl shadow-lg mt-4">
                            <p className="text-green-100 text-sm mb-1">{t('totalPrice')}</p>
                            <h4 className="text-3xl font-bold">Rs {total.toLocaleString()}</h4>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="absolute bottom-6 left-0 right-0 text-center text-gray-400 text-xs">
                    AgroVision v1.0
                </div>

            </div>
        </>
    );
};

export default Sidebar;
