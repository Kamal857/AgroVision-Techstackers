import { useState } from 'react';
import { Mail, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await api.post('/auth/forgotpassword', { email });
            if (response.data.success) {
                setSuccess(true);
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to send reset link');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <button
                    onClick={() => navigate('/login')}
                    className="mb-8 flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-slate-900 transition-colors"
                >
                    <ArrowLeft size={16} /> Back to login
                </button>

                {!success ? (
                    <>
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-bold text-slate-900">Forgot Password?</h1>
                            <p className="text-slate-400 mt-2 font-medium">Enter your email to receive a reset link</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="bg-rose-50 text-rose-600 p-4 rounded-2xl border border-rose-100 text-xs font-bold uppercase tracking-widest text-center">
                                    {error}
                                </div>
                            )}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="farmer@agrovision.com"
                                        className="w-full p-5 bg-white border border-slate-100 rounded-3xl focus:outline-none focus:border-emerald-500 shadow-sm text-base font-bold text-slate-800 placeholder:text-slate-200"
                                        required
                                    />
                                    <Mail className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-200" size={20} />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-5 bg-slate-900 text-white rounded-3xl font-bold text-sm uppercase tracking-widest shadow-xl shadow-slate-200 flex items-center justify-center gap-3 transition-all active:scale-[0.98] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? (
                                    'Sending Link...'
                                ) : (
                                    <>
                                        Send Reset Link <Send size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-10">
                        <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-emerald-100">
                            <CheckCircle2 size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Verification Sent</h2>
                        <p className="text-slate-500 mt-4 leading-relaxed">
                            We've sent a password reset link to <span className="font-bold text-slate-900">{email}</span>.
                            Please check your inbox (and spam folder).
                        </p>
                        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-8 italic">
                            Simulation: Check server console for the link
                        </p>
                        <Link
                            to="/login"
                            className="mt-10 inline-block w-full py-5 bg-slate-900 text-white rounded-3xl font-bold text-sm uppercase tracking-widest shadow-xl shadow-slate-200 transition-all active:scale-[0.98]"
                        >
                            Return to Login
                        </Link>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
