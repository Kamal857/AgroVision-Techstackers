import { useState } from 'react';
import axios from 'axios';
import { Camera, Upload, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';

const CropDoctor = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setResult(null);
        }
    };

    const handleAnalyze = async () => {
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await axios.post('/api/crop/detect', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setResult(res.data);
        } catch (err) {
            console.error("Error analyzing crop", err);
            alert("Failed to analyze crop. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5 pb-24">
            <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Camera className="text-primary" /> Crop Doctor
            </h1>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                {!preview ? (
                    <div className="space-y-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
                            <Camera size={40} />
                        </div>
                        <p className="text-gray-500">Take a photo of your affected crop</p>

                        <div className="grid grid-cols-2 gap-4">
                            <label className="bg-primary text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-transform">
                                <Camera size={20} /> Camera
                                <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileChange} />
                            </label>
                            <label className="bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-transform">
                                <Upload size={20} /> Upload
                                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                            </label>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <img src={preview} alt="Crop" className="w-full h-64 object-cover rounded-xl" />

                        {!result && (
                            <div className="flex gap-2">
                                <button
                                    onClick={() => { setFile(null); setPreview(null); }}
                                    className="flex-1 py-3 text-gray-600 font-semibold"
                                >
                                    Retake
                                </button>
                                <button
                                    onClick={handleAnalyze}
                                    disabled={loading}
                                    className="flex-1 bg-primary text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : 'Analyze Crop'}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {result && (
                <div className="mt-6 bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animation-fade-in">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{result.crop}</h2>
                            <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold mt-2 ${result.health === 'Healthy' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {result.health === 'Healthy' ? <CheckCircle size={12} /> : <AlertTriangle size={12} />}
                                {result.health}
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-gray-500">Confidence</p>
                            <p className="font-bold text-primary">{result.confidence}</p>
                        </div>
                    </div>

                    {result.disease && result.disease !== 'None' && (
                        <div className="mb-4">
                            <p className="text-sm font-semibold text-gray-500">Disease Detected</p>
                            <p className="font-medium text-red-600">{result.disease}</p>
                        </div>
                    )}

                    <div>
                        <p className="font-semibold mb-2">Care Tips & Cure:</p>
                        <ul className="space-y-2">
                            {result.careTips?.map((tip, idx) => (
                                <li key={idx} className="flex gap-2 text-sm text-gray-700 bg-gray-50 p-2 rounded-lg">
                                    <span>🌱</span> {tip}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CropDoctor;
