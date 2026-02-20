import React, { useState, useEffect } from 'react';
import { Activity, TrendingUp, AlertTriangle, Clock, ArrowRight, User as UserIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import VitalsChart from '../components/VitalsChart';
import Timeline from '../components/Timeline';
import { fetchPatients, fetchPatientVitals } from '../lib/api';

const StatCard = ({ title, value, label, icon: Icon, trend, color, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: delay }}
        className="glass-card p-8 rounded-[2rem] clinical-shadow relative overflow-hidden group hover:scale-105 transition-all duration-500"
    >
        <div className={`absolute -top-10 -right-10 p-24 opacity-5 ${color} rounded-full group-hover:scale-150 transition-transform duration-700`}></div>
        <div className="flex justify-between items-start mb-6 relative z-10">
            <div className={`p-4 rounded-2xl ${color} bg-opacity-10 shadow-sm border border-white/20`}>
                <Icon className={`h-8 w-8 ${color.replace('bg-', 'text-')}`} />
            </div>
            {trend !== undefined && (
                <span className={`text-sm font-black px-3 py-1.5 rounded-xl ${trend > 0 ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-200/50' : 'bg-rose-500/10 text-rose-600 border border-rose-200/50'}`}>
                    {trend > 0 ? '+' : ''}{trend}%
                </span>
            )}
        </div>
        <div className="relative z-10">
            <h3 className="text-4xl font-black text-foreground tracking-tighter mb-2">{value}</h3>
            <p className="text-base font-bold text-muted-foreground uppercase tracking-wider">{title}</p>
            {label && <p className="text-xs font-bold text-muted-foreground mt-3 opacity-60 uppercase tracking-widest">{label}</p>}
        </div>
    </motion.div>
);

const Dashboard = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatientId, setSelectedPatientId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const data = await fetchPatients();
                setPatients(data);
                if (data.length > 0) setSelectedPatientId(data[0].id);
            } catch (err) {
                console.error("Error loading dashboard data:", err);
            } finally {
                setLoading(false);
            }
        };
        loadInitialData();
    }, []);

    const criticalCount = patients.filter(p => p.status === 'Critical').length;
    const selectedPatient = patients.find(p => p.id === selectedPatientId);

    if (loading) return (
        <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="space-y-8 pb-10">
            <div className="flex items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-foreground mb-2">Clinical Intel</h1>
                    <p className="text-lg text-muted-foreground font-medium italic">High-fidelity decision support powered by Auralis AI Engine.</p>
                </div>
                <div className="flex gap-4">
                    <select
                        className="bg-white/50 backdrop-blur-xl border-2 border-white/50 rounded-2xl px-6 py-3.5 text-base font-bold outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
                        value={selectedPatientId || ''}
                        onChange={(e) => setSelectedPatientId(e.target.value)}
                    >
                        {patients.map(p => (
                            <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Active Admissions"
                    value={patients.length}
                    label="Current ward occupancy"
                    icon={Activity}
                    trend={5}
                    color="bg-blue-500"
                    delay={0}
                />
                <StatCard
                    title="Critical Alerts"
                    value={criticalCount}
                    label="Requires immediate attention"
                    icon={AlertTriangle}
                    trend={criticalCount > 2 ? 20 : -10}
                    color="bg-red-500"
                    delay={0.1}
                />
                <StatCard
                    title="Latest Age Avg"
                    value={`${Math.round(patients.reduce((acc, p) => acc + p.age, 0) / patients.length)}y`}
                    label="Patient population average"
                    icon={UserIcon}
                    color="bg-purple-500"
                    delay={0.2}
                />
                <StatCard
                    title="Data Check"
                    value="Real"
                    label="Live FastAPI Integration"
                    icon={TrendingUp}
                    color="bg-emerald-500"
                    delay={0.3}
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - 2/3 width */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Immersive Vitals Chart */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="glass-card rounded-[2.5rem] p-10 clinical-shadow border-white/40"
                    >
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h3 className="text-2xl font-black tracking-tight">Vitals Stream: {selectedPatient?.name}</h3>
                                <p className="text-base text-muted-foreground font-medium">Real-time time-series synthesis.</p>
                            </div>
                            <div className="flex gap-3">
                                <span className={`px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest border-2 ${selectedPatient?.status === 'Critical' ? 'bg-rose-500/10 text-rose-600 border-rose-200/50' : 'bg-emerald-500/10 text-emerald-600 border-emerald-200/50'}`}>
                                    {selectedPatient?.status}
                                </span>
                            </div>
                        </div>
                        <div className="h-[400px] w-full">
                            <VitalsChart patientId={selectedPatientId} />
                        </div>
                    </motion.div>

                    {/* Immersive Alerts Zone */}
                    {selectedPatient?.status === 'Critical' && (
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="clinical-gradient rounded-[2rem] p-8 text-white shadow-2xl clinical-shadow relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform">
                                <AlertTriangle className="h-24 w-24" />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-3 w-3 rounded-full bg-white animate-ping" />
                                    <h3 className="text-xl font-black italic tracking-tighter">THRESHOLD BREACH DETECTED</h3>
                                </div>
                                <p className="text-lg font-bold text-white/90 leading-relaxed mb-6">
                                    Patient <span className="underline underline-offset-4 decoration-rose-300 font-black">{selectedPatient.id}</span> vitals reached critical levels. Immediate clinical intervention recommended.
                                </p>
                                <button className="bg-white text-rose-600 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2 shadow-xl">
                                    Activate Rapid Response <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Right Column - 1/3 width */}
                <div className="space-y-8">
                    {/* Immersive Timeline Widget */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="glass-card rounded-[2.5rem] p-8 clinical-shadow h-full border-white/40"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <Clock className="h-6 w-6 text-primary" />
                            <h3 className="text-xl font-black tracking-tight">Clinical Path</h3>
                        </div>
                        <Timeline patientId={selectedPatientId} />
                        <button className="w-full mt-10 py-5 text-base font-black text-primary bg-primary/10 hover:bg-primary hover:text-white rounded-2xl transition-all shadow-inner uppercase tracking-widest">
                            Export Care Plan
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
