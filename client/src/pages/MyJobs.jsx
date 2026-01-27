import { useState } from 'react';
import { CheckCircle, Circle, Sun, Plus, Clock, ChevronRight, ListTodo } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const MyJobs = () => {
    const { t } = useLanguage();

    const [tasks, setTasks] = useState([
        { id: 1, title: 'waterRiceField', time: '6:00 AM', completed: true, type: 'irrigation' },
        { id: 2, title: 'checkPests', time: '8:00 AM', completed: true, type: 'monitoring' },
        { id: 3, title: 'checkCropHealth', time: '10:00 AM', completed: false, type: 'analysis' },
        { id: 4, title: 'buyFertilizer', time: '2:00 PM', completed: false, type: 'procurement' },
        { id: 5, title: 'farmMeeting', time: '4:00 PM', completed: false, type: 'admin' },
    ]);

    const completedCount = tasks.filter(t => t.completed).length;
    const progress = Math.round((completedCount / tasks.length) * 100);

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    return (
        <div className="p-6 pb-32 bg-[#F8FAFC] min-h-screen">
            {/* Header */}
            <header className="mb-8">
                <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2 mb-1">
                    <ListTodo size={20} className="text-emerald-600" />
                    {t('myJobs')}
                </h1>
                <div className="flex items-center gap-2 text-slate-400">
                    <Clock size={12} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Friday, Jan 24, 2026</span>
                </div>
            </header>

            {/* Premium Progress Card */}
            <div className="card-premium p-6 mb-8 bg-slate-900 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-emerald-500/20 transition-all duration-700"></div>

                <div className="relative z-10 flex justify-between items-center">
                    <div>
                        <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-1">{t('progress')}</p>
                        <h2 className="text-4xl font-black tracking-tighter">
                            {completedCount} <span className="text-slate-500 text-xl font-bold">/ {tasks.length}</span>
                        </h2>
                        <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-wide">
                            {tasks.length - completedCount} {t('tasksRemaining')}
                        </p>
                    </div>

                    <div className="relative w-20 h-20 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="40" cy="40" r="34" stroke="rgba(255,255,255,0.05)" strokeWidth="6" fill="transparent" />
                            <circle
                                cx="40" cy="40" r="34"
                                stroke="#10B981" strokeWidth="6"
                                fill="transparent"
                                strokeDasharray="213.6"
                                strokeDashoffset={213.6 - (213.6 * progress) / 100}
                                className="transition-all duration-1000 ease-out"
                                strokeLinecap="round"
                            />
                        </svg>
                        <span className="absolute text-sm font-black text-white">{progress}%</span>
                    </div>
                </div>
            </div>

            {/* Pro Task List */}
            <div className="space-y-3">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{t('focusOperations')}</h3>
                {tasks.map((task) => (
                    <motion.div
                        key={task.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={() => toggleTask(task.id)}
                        className={`p-4 rounded-2xl flex items-center gap-4 cursor-pointer transition-all border ${task.completed
                            ? 'bg-slate-50 border-slate-100 opacity-60'
                            : 'bg-white border-slate-100 shadow-sm hover:border-emerald-200'
                            }`}
                    >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${task.completed
                            ? 'bg-slate-200 text-slate-400'
                            : 'bg-emerald-50 text-emerald-600 shadow-sm'
                            }`}>
                            {task.completed ? <CheckCircle size={18} /> : <Sun size={18} />}
                        </div>

                        <div className="flex-1">
                            <h3 className={`font-bold text-sm tracking-tight ${task.completed ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                                {t(task.title)}
                            </h3>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className={`text-[9px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded-md ${task.completed ? 'bg-slate-100 text-slate-300' : 'bg-slate-50 text-slate-400'
                                    }`}>
                                    {t(task.type)}
                                </span>
                                <span className="text-[9px] text-slate-400 font-medium">| {task.time}</span>
                            </div>
                        </div>

                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${task.completed
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'border-slate-100 bg-slate-50'
                            }`}>
                            {task.completed && <CheckCircle size={12} />}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Action Bar */}
            <div className="fixed bottom-28 right-6 z-40">
                <button className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-slate-200 hover:bg-emerald-600 transition-all hover:scale-105 active:scale-95 group">
                    <Plus size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>
            </div>
        </div>
    );
};

export default MyJobs;
