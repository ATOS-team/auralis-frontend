import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Lock, Mail, User, ArrowRight, ShieldCheck } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await register(name, email, password);
        } catch (err) {
            console.error("Registration failed:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
            {/* Left Panel - Branding & Visuals */}
            <div className="hidden lg:flex w-7/12 bg-indigo-950 relative items-center justify-center overflow-hidden">
                {/* High-quality surgical/lab background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2080"
                        alt="Join Auralis"
                        className="w-full h-full object-cover mix-blend-overlay opacity-30 scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-bl from-indigo-900/95 via-purple-950/90 to-slate-950/100"></div>
                </div>

                {/* Animated Decorative Elements */}
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-500 opacity-5 rounded-full blur-[120px] z-1"
                />

                <div className="relative z-10 p-16 text-white max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-4 mb-10"
                    >
                        <div className="p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
                            <Activity className="h-10 w-10 text-white" />
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter uppercase italic">Join Auralis Health</h1>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-6xl font-extrabold mb-8 leading-[1.1] tracking-tight"
                    >
                        The Future of <br />
                        <span className="text-blue-400">Clinical Decisions.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-blue-100/70 text-xl leading-relaxed font-medium mb-12 max-w-lg"
                    >
                        Onboard your clinical staff to the most advanced telemetry visualization platform. Secure, intuitive, and data-driven.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col gap-4"
                    >
                        <div className="flex items-center gap-3 text-blue-200">
                            <ShieldCheck className="h-6 w-6 text-blue-400" />
                            <span className="text-lg font-medium tracking-wide font-sans">Enterprise-grade Security (MongoDB Atlas)</span>
                        </div>
                        <div className="flex items-center gap-3 text-blue-200">
                            <Activity className="h-6 w-6 text-emerald-400" />
                            <span className="text-lg font-medium tracking-wide">Dynamic Clinical Telemetry Visualization</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Right Panel - Register Form */}
            <div className="w-full lg:w-5/12 flex items-center justify-center p-12 relative bg-card">
                <div className="absolute top-0 left-0 p-10">
                    <Link to="/login" className="text-sm font-bold text-primary hover:text-blue-700 transition-all flex items-center gap-2 group">
                        <ArrowRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" /> Back to Clinical Login
                    </Link>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md space-y-10"
                >
                    <div className="text-center lg:text-left">
                        <h2 className="text-4xl font-extrabold tracking-tighter text-foreground mb-4">Request Access</h2>
                        <p className="text-lg text-muted-foreground font-medium">
                            Create your clinical credentials to begin.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-10 space-y-7">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-foreground/70 uppercase tracking-widest mb-3">
                                    Full Professional Name
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                                        <User className="h-6 w-6" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="block w-full pl-14 pr-4 py-4.5 border-2 border-border rounded-2xl bg-secondary/20 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none text-lg font-medium"
                                        placeholder="Dr. Naomi Carter"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-foreground/70 uppercase tracking-widest mb-3">
                                    Clinical Email
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-14 pr-4 py-4.5 border-2 border-border rounded-2xl bg-secondary/20 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none text-lg font-medium"
                                        placeholder="doctor@auralis.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-foreground/70 uppercase tracking-widest mb-3">
                                    Security Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                                        <Lock className="h-6 w-6" />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-14 pr-4 py-4.5 border-2 border-border rounded-2xl bg-secondary/20 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none text-lg font-medium"
                                        placeholder="Min. 8 characters"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="group relative w-full flex justify-center py-5 px-6 border border-transparent text-lg font-black uppercase tracking-tighter rounded-2xl text-white bg-primary hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all shadow-2xl hover:shadow-primary/40 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden mt-4"
                        >
                            {isSubmitting ? (
                                <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-white"></div>
                            ) : (
                                <span className="flex items-center gap-3">
                                    Register Account <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
                                </span>
                            )}
                        </button>
                    </form>

                    <div className="text-center">
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
                            Auralis Systems Access Protocol v2.4
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;
