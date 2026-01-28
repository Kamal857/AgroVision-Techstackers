import { useState } from 'react';
import { Lock, ArrowRight, ShieldCheck, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api';

const ResetPassword = () => {
    const navigate = useNavigate();
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await api.put(`/auth/resetpassword/${token}`, { password });
            if (response.data.success) {
                setSuccess(true);
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to reset password. Link may be expired.');
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
                {!success ? (
                    <>
                        <div className="text-center mb-10">
                            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-emerald-100 shadow-sm">
                                <ShieldCheck size={32} />
                            </div>
                            <h1 className="text-3xl font-bold text-slate-900">Set New Password</h1>
                            <p className="text-slate-400 mt-2 font-medium">Choose a strong password you haven't used before</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="bg-rose-50 text-rose-600 p-4 rounded-2xl border border-rose-100 text-xs font-bold uppercase tracking-widest text-center">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">New Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full p-5 bg-white border border-slate-100 rounded-3xl focus:outline-none focus:border-emerald-500 shadow-sm text-base font-bold text-slate-800 placeholder:text-slate-200"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-200 hover:text-slate-400 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Confirm New Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full p-5 bg-white border border-slate-100 rounded-3xl focus:outline-none focus:border-emerald-500 shadow-sm text-base font-bold text-slate-800 placeholder:text-slate-200"
                                        required
                                    />
                                    <Lock className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-200" size={20} />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-5 bg-slate-900 text-white rounded-3xl font-bold text-sm uppercase tracking-widest shadow-xl shadow-slate-200 flex items-center justify-center gap-3 transition-all active:scale-[0.98] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? 'Updating Password...' : 'Reset Password'}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-10">
                        <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-emerald-100 shadow-lg shadow-emerald-50">
                            <CheckCircle2 size={40} />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900">Success!</h2>
                        <p className="text-slate-500 mt-4 leading-relaxed font-medium">
                            Your password has been updated successfully.
                            You can now log in with your new credentials.
                        </p>
                        <Link
                            to="/login"
                            className="mt-10 inline-block w-full py-5 bg-emerald-600 text-white rounded-3xl font-bold text-sm uppercase tracking-widest shadow-xl shadow-emerald-100 transition-all active:scale-[0.98]"
                        >
                            Sign In Now
                        </Link>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default ResetPassword;
