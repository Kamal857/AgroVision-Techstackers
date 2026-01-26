import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, X, MessageSquare } from 'lucide-react';
import api from '../api';
import { motion, AnimatePresence } from 'framer-motion';

const AgronomistChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleSend = async () => {
        if (!message.trim()) return;

        const userMsg = { role: 'user', parts: [{ text: message }] };
        setChatHistory(prev => [...prev, userMsg]);
        setLoading(true);
        const currentMsg = message;
        setMessage('');

        try {
            const res = await api.post('/agronomist/ask', {
                message: currentMsg,
                history: chatHistory
            });

            const aiMsg = { role: 'model', parts: [{ text: res.data.reply }] };
            setChatHistory(prev => [...prev, aiMsg]);
        } catch (err) {
            console.error("Agronomist Chat Error:", err);
            const errorMsg = { role: 'model', parts: [{ text: "Error: Could not connect to the agronomist service. Please try again." }] };
            setChatHistory(prev => [...prev, errorMsg]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="font-sans">
            {/* Chat Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-28 right-6 w-14 h-14 bg-emerald-700 text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-200 z-50 active:scale-90 transition-transform border border-emerald-600/20"
                >
                    <MessageSquare size={24} />
                    <div className="absolute top-0 right-0 w-3 h-3 bg-rose-500 rounded-full border-2 border-white"></div>
                </button>
            )}

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="fixed bottom-28 right-6 left-6 max-w-sm ml-auto h-[540px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col border border-slate-200 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-5 bg-slate-900 text-white flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/20">
                                    <Bot size={22} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm leading-none">AI Agronomist</h3>
                                    <div className="flex items-center gap-1.5 mt-1.5">
                                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                                        <p className="text-[9px] font-semibold text-emerald-400 uppercase tracking-widest leading-none">Expert Online</p>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
                            {chatHistory.length === 0 && (
                                <div className="text-center py-12 px-4">
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm border border-slate-100 text-emerald-600">
                                        <Bot size={32} />
                                    </div>
                                    <h4 className="text-sm font-bold text-slate-800 tracking-tight">Technical Assistance</h4>
                                    <p className="text-xs font-medium text-slate-400 mt-2 leading-relaxed">
                                        Submit your agricultural queries regarding crop health, soil composition, or irrigation intervals.
                                    </p>
                                </div>
                            )}

                            {chatHistory.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[90%] p-4 rounded-xl text-[13px] leading-relaxed font-medium ${msg.role === 'user'
                                        ? 'bg-emerald-700 text-white rounded-tr-none shadow-md shadow-emerald-100/20'
                                        : 'bg-white text-slate-700 shadow-sm border border-slate-200 rounded-tl-none'
                                        }`}>
                                        {msg.parts[0].text}
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="bg-white p-4 rounded-xl rounded-tl-none shadow-sm border border-slate-200">
                                        <Loader2 className="animate-spin text-emerald-600" size={16} />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-slate-100">
                            <div className="flex gap-2 items-center bg-slate-100 rounded-xl p-1 shadow-inner border border-slate-200/50">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Enter your query..."
                                    className="flex-1 bg-transparent border-none px-4 py-2 text-sm focus:ring-0 font-medium text-slate-700 placeholder:text-slate-400"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={loading || !message.trim()}
                                    className="w-10 h-10 bg-emerald-700 text-white rounded-lg flex items-center justify-center disabled:opacity-30 active:scale-95 transition-all shadow-md shadow-emerald-200"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AgronomistChat;
