import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await login(email, password);
        } catch (err) {
            console.error("Login failed:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
            {/* Left Panel - Visuals & Branding */}
            <div className="hidden lg:flex w-7/12 bg-primary relative items-center justify-center overflow-hidden">
                {/* High-quality medical background overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1576091160550-217359f4ecf8?auto=format&fit=crop&q=80&w=2070"
                        alt="Medical Professionals"
                        className="w-full h-full object-cover mix-blend-overlay opacity-40 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-blue-900/95 to-indigo-950/100"></div>
                </div>

                {/* Animated Decorative Elements */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-24 -left-24 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl z-1"
                />

                <div className="relative z-10 p-16 text-white max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 mb-10"
                    >
                        <div className="p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
                            <Activity className="h-10 w-10 text-white" />
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter uppercase italic">Auralis Health Systems</h1>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-6xl font-extrabold mb-8 leading-[1.1] tracking-tight"
                    >
                        Precision Insight <br />
                        <span className="text-blue-400">At Every Moment.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-blue-100/80 text-xl leading-relaxed font-medium mb-12 max-w-lg"
                    >
                        The intelligent clinical cockpit for modern healthcare. Access high-fidelity patient telemetry and predictive risk scoring in one unified interface.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="grid grid-cols-2 gap-6"
                    >
                        <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                            <div className="flex items-center gap-2 mb-1">
                                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                                <span className="text-sm font-bold uppercase tracking-widest text-emerald-400">Secure</span>
                            </div>
                            <p className="text-xs text-blue-200">HIPAA Compliant Data Layer</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                            <div className="flex items-center gap-2 mb-1">
                                <Activity className="h-4 w-4 text-blue-400" />
                                <span className="text-sm font-bold uppercase tracking-widest text-blue-400">Real-Time</span>
                            </div>
                            <p className="text-xs text-blue-200">Kaggle Dataset Telemetry</p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Right Panel - Login Form */}
            <div className="w-full lg:w-5/12 flex items-center justify-center p-12 relative bg-card">
                <div className="absolute top-0 right-0 p-10">
                    <Link to="/register" className="text-sm font-bold text-primary hover:text-blue-700 transition-all flex items-center gap-2 group">
                        Sign up for access <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md space-y-10"
                >
                    <div className="text-center lg:text-left">
                        <div className="lg:hidden flex items-center gap-2 justify-center mb-6">
                            <Activity className="h-8 w-8 text-primary" />
                            <h1 className="text-2xl font-black italic tracking-tighter uppercase">AURALIS</h1>
                        </div>
                        <h2 className="text-4xl font-extrabold tracking-tighter text-foreground mb-4">Clinical Login</h2>
                        <p className="text-lg text-muted-foreground font-medium">
                            Authorized personnel only. Access hospital cockpit.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-10 space-y-8">
                        <div className="space-y-6">
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
                                    Password
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
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div className="flex justify-end mt-3">
                                    <a href="#" className="text-sm font-bold text-primary hover:text-blue-700 transition-colors">Recover Credentials</a>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="group relative w-full flex justify-center py-5 px-6 border border-transparent text-lg font-black uppercase tracking-tighter rounded-2xl text-white bg-primary hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all shadow-2xl hover:shadow-primary/40 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden shadow-primary/20"
                        >
                            {isSubmitting ? (
                                <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-white"></div>
                            ) : (
                                <span className="flex items-center gap-3">
                                    Enter Dashboard <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
                                </span>
                            )}
                        </button>
                    </form>

                    <div className="pt-8 border-t border-border">
                        <p className="text-center text-sm text-muted-foreground font-medium">
                            Powered by <span className="font-bold text-foreground italic">Auralis Intelligence</span> Engine
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
