import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Search, Users as UsersIcon, Shield, Sprout, ArrowRight, Loader2, X, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [addLoading, setAddLoading] = useState(false);
    const [addError, setAddError] = useState('');
    const { register } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'farmer'
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            // In a real app, this would be a GET /api/users request
            // For now, we use mock data if DB is down
            const mockUsers = [
                { id: 1, name: 'Kamal Bohara', email: 'kamal@agrovision.com', role: 'expert', createdAt: new Date() },
                { id: 2, name: 'Ram Prasad', email: 'ram@farmer.com', role: 'farmer', createdAt: new Date() },
                { id: 3, name: 'Sushila Devi', email: 'sushila@expert.com', role: 'expert', createdAt: new Date() },
            ];

            // Simulating API delay
            setTimeout(() => {
                setUsers(mockUsers);
                setLoading(false);
            }, 800);
        } catch (err) {
            console.error('Failed to fetch users', err);
            setLoading(false);
        }
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        setAddLoading(true);
        setAddError('');

        const result = await register(formData);

        if (result.success) {
            const newUser = {
                id: Date.now(),
                ...formData,
                createdAt: new Date()
            };
            setUsers([newUser, ...users]);
            setShowAddModal(false);
            setFormData({ name: '', email: '', password: '', role: 'farmer' });
        } else {
            setAddError(result.error);
        }
        setAddLoading(false);
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50 p-6 pb-24 lg:p-12">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Community Management</h1>
                    <p className="text-slate-500 mt-1">Manage and add members to the AgroVision network</p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowAddModal(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl flex items-center justify-center gap-2 font-semibold shadow-lg shadow-green-200 transition-all"
                >
                    <UserPlus size={20} />
                    Add New Member
                </motion.button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Stats Cards */}
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { label: 'Total Members', value: users.length, icon: UsersIcon, color: 'text-blue-600', bg: 'bg-blue-50' },
                        { label: 'Active Farmers', value: users.filter(u => u.role === 'farmer').length, icon: Sprout, color: 'text-green-600', bg: 'bg-green-50' },
                        { label: 'Verified Experts', value: users.filter(u => u.role === 'expert').length, icon: Shield, color: 'text-purple-600', bg: 'bg-purple-50' },
                    ].map((stat, i) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            key={stat.label}
                            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
                        >
                            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4 text-2xl`}>
                                <stat.icon size={24} />
                            </div>
                            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                            <div className="text-sm font-medium text-slate-400 mt-1">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* User List Section */}
                <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden text-black">
                    <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            Recent Members
                            <span className="bg-slate-100 text-slate-500 text-xs px-2 py-1 rounded-lg">{filteredUsers.length}</span>
                        </h2>

                        <div className="relative w-full md:w-72">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-sm"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Member</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Role</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Joined</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                                            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-green-500" />
                                            Loading community members...
                                        </td>
                                    </tr>
                                ) : filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-slate-400">No members found matching your search.</td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((user) => (
                                        <motion.tr
                                            key={user.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="hover:bg-slate-50/50 transition-colors group"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-slate-900">{user.name}</div>
                                                        <div className="text-xs text-slate-500">{user.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${user.role === 'expert'
                                                    ? 'bg-purple-100 text-purple-600'
                                                    : 'bg-green-100 text-green-600'
                                                    }`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-500">
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                                    Active
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-slate-300 hover:text-slate-600 transition-colors p-2 rounded-lg hover:bg-white group-hover:border group-hover:border-slate-100 group-hover:shadow-sm">
                                                    <ArrowRight size={18} />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add User Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowAddModal(false)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative overflow-hidden"
                        >
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-2xl font-bold text-slate-900">Add Community Member</h3>
                                    <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400">
                                        <X size={20} />
                                    </button>
                                </div>

                                {addError && (
                                    <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-600">
                                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                        <p className="text-sm">{addError}</p>
                                    </div>
                                )}

                                <form onSubmit={handleAddSubmit} className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Member Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                                                placeholder="Enter full name"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                                                placeholder="email@example.com"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Initial Password</label>
                                            <input
                                                type="password"
                                                required
                                                minLength={6}
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Network Role</label>
                                            <div className="grid grid-cols-2 gap-3 text-black">
                                                {['farmer', 'expert'].map((role) => (
                                                    <button
                                                        key={role}
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, role })}
                                                        className={`py-3 text-sm font-semibold rounded-2xl border transition-all ${formData.role === role
                                                            ? 'bg-green-600 border-green-600 text-white shadow-lg shadow-green-200'
                                                            : 'bg-white border-slate-200 text-slate-600 hover:border-green-200'
                                                            }`}
                                                    >
                                                        {role.charAt(0).toUpperCase() + role.slice(1)}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={addLoading}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
                                    >
                                        {addLoading ? <Loader2 className="animate-spin" /> : 'Register Member'}
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Users;
