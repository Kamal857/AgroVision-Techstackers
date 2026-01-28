import { useState } from 'react';
import { Mail, Lock, ArrowRight, Leaf } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const result = await login({ email, password });

        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
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
                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-emerald-200 mx-auto mb-6">
                        <Leaf size={40} />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
                    <p className="text-slate-400 mt-2 font-medium">Log in to manage your farm</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
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

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full p-5 bg-white border border-slate-100 rounded-3xl focus:outline-none focus:border-emerald-500 shadow-sm text-base font-bold text-slate-800 placeholder:text-slate-200"
                                required
                            />
                            <Lock className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-200" size={20} />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Link to="/forgot-password" title="reset password" name="reset password" id="reset_password_btn" className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Forgot Password?</Link>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full btn-premium-primary ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>


                <p className="text-center mt-10 text-slate-400 font-medium">
                    Don't have an account? {' '}
                    <Link to="/signup" className="text-emerald-600 font-bold hover:underline">Create Account</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
