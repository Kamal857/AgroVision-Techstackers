import { useState } from 'react';
import { Mail, Lock, User, ArrowLeft, Leaf } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSignup = (e) => {
        e.preventDefault();
        // Mock signup
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center px-6 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-emerald-200 mx-auto mb-6">
                        <Leaf size={40} />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900">Join AgroVision</h1>
                    <p className="text-slate-400 mt-2 font-medium">Start your smart farming journey</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                placeholder="Kamal Bohara"
                                className="w-full p-4 bg-white border border-slate-100 rounded-[28px] focus:outline-none focus:border-emerald-500 shadow-sm text-base font-bold text-slate-800 placeholder:text-slate-200"
                                required
                            />
                            <User className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-200" size={20} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                        <div className="relative">
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="farmer@agrovision.com"
                                className="w-full p-4 bg-white border border-slate-100 rounded-[28px] focus:outline-none focus:border-emerald-500 shadow-sm text-base font-bold text-slate-800 placeholder:text-slate-200"
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
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="••••••••"
                                className="w-full p-4 bg-white border border-slate-100 rounded-[28px] focus:outline-none focus:border-emerald-500 shadow-sm text-base font-bold text-slate-800 placeholder:text-slate-200"
                                required
                            />
                            <Lock className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-200" size={20} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Confirm Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                placeholder="••••••••"
                                className="w-full p-4 bg-white border border-slate-100 rounded-[28px] focus:outline-none focus:border-emerald-500 shadow-sm text-base font-bold text-slate-800 placeholder:text-slate-200"
                                required
                            />
                            <Lock className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-200" size={20} />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full btn-premium-primary !py-5 mt-4"
                    >
                        Create Account
                    </button>
                </form>

                <p className="text-center mt-10 text-slate-400 font-medium">
                    Already have an account? {' '}
                    <Link to="/login" className="text-emerald-600 font-bold hover:underline">Log In</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Signup;
