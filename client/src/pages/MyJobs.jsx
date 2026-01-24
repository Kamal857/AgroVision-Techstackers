import { useState } from 'react';
import { CheckCircle, Circle, Sun, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const MyJobs = () => {
    const { t } = useLanguage();

    const [tasks, setTasks] = useState([
        { id: 1, title: 'waterRiceField', time: '6:00 AM', completed: true },
        { id: 2, title: 'checkPests', time: '8:00 AM', completed: true },
        { id: 3, title: 'checkCropHealth', time: '10:00 AM', completed: false },
        { id: 4, title: 'buyFertilizer', time: '2:00 PM', completed: false },
        { id: 5, title: 'farmMeeting', time: '4:00 PM', completed: false },
    ]);

    const completedCount = tasks.filter(t => t.completed).length;
    const progress = Math.round((completedCount / tasks.length) * 100);

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    return (
        <div className="p-6 pb-32 bg-[#FDFBF7] min-h-screen">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{t('myJobs')}</h1>
            <p className="text-gray-500 mb-6 font-medium">Friday, January 23</p>

            {/* Progress Card */}
            <div className="bg-white p-6 rounded-[32px] shadow-sm mb-8 flex items-center justify-between relative overflow-hidden">
                <div className="z-10">
                    <p className="text-gray-500 text-sm font-medium mb-1">{t('progress')}</p>
                    <h2 className="text-4xl font-bold text-gray-900">{completedCount}/{tasks.length}</h2>
                    <p className="text-xs text-gray-400 mt-2">{tasks.length - completedCount} {t('tasksRemaining')}</p>
                </div>

                {/* Custom Circular Progress */}
                <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle cx="48" cy="48" r="40" stroke="#F3F4F6" strokeWidth="8" fill="transparent" />
                        <circle
                            cx="48" cy="48" r="40"
                            stroke="#22C55E" strokeWidth="8"
                            fill="transparent"
                            strokeDasharray="251.2"
                            strokeDashoffset={251.2 - (251.2 * progress) / 100}
                            className="transition-all duration-1000 ease-out"
                            strokeLinecap="round"
                        />
                    </svg>
                    <span className="absolute text-xl font-bold text-[#22C55E]">{progress}%</span>
                </div>
            </div>

            {/* Task List */}
            <div className="space-y-4">
                {tasks.map((task) => (
                    <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => toggleTask(task.id)}
                        className={`p-5 rounded-[24px] flex items-center gap-4 cursor-pointer transition-all border ${task.completed
                            ? 'bg-green-50 border-green-100'
                            : 'bg-white border-gray-100 shadow-sm'
                            }`}
                    >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${task.completed ? 'bg-[#22C55E] text-white' : 'bg-gray-100 text-gray-400'
                            }`}>
                            {task.completed ? <CheckCircle size={24} /> : <Sun size={24} />}
                        </div>

                        <div className="flex-1">
                            <h3 className={`font-bold text-lg ${task.completed ? 'text-[#22C55E] line-through decoration-2' : 'text-gray-800'}`}>
                                {t(task.title)}
                            </h3>
                            <p className="text-gray-400 text-sm">{task.time}</p>
                        </div>

                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${task.completed ? 'bg-[#22C55E] border-[#22C55E] text-white' : 'border-gray-200'
                            }`}>
                            {task.completed && <CheckCircle size={16} />}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Floating Action Button */}
            <button className="fixed bottom-28 right-6 w-16 h-16 bg-[#22C55E] rounded-full flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform hover:bg-green-600 z-40">
                <Plus size={32} />
            </button>
        </div>
    );
};

export default MyJobs;
