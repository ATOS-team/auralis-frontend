import React, { useState, useEffect } from 'react';
import { Activity, TrendingUp, AlertTriangle, Clock, ArrowRight, User as UserIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import VitalsChart from '../components/VitalsChart';
import Timeline from '../components/Timeline';
import { fetchPatients, fetchPatientVitals } from '../lib/api';

const StatCard = ({ title, value, label, icon: Icon, trend, color, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay }}
        className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
    >
        <div className={`absolute top-0 right-0 p-24 opacity-5 ${color}`}></div>
        <div className="flex justify-between items-start mb-4 relative z-10">
            <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
                <Icon className={`h-6 w-6 ${color.replace('bg-', 'text-')}`} />
            </div>
            {trend !== undefined && (
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${trend > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100/50 text-red-700'}`}>
                    {trend > 0 ? '+' : ''}{trend}%
                </span>
            )}
        </div>
        <div className="relative z-10">
            <h3 className="text-3xl font-bold text-foreground mb-1">{value}</h3>
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            {label && <p className="text-xs text-muted-foreground mt-2 opacity-80">{label}</p>}
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
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Clinical Decision Support</h2>
                    <p className="text-muted-foreground">High-fidelity monitoring powered by Kaggle Medical Dataset.</p>
                </div>
                <div className="flex gap-4">
                    <select
                        className="bg-card border border-border rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
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
                    {/* Vitals Chart */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-card rounded-2xl border border-border p-6 shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold">Vitals Trends: {selectedPatient?.name}</h3>
                                <p className="text-sm text-muted-foreground">Time-series data from `dummy_obs.csv`</p>
                            </div>
                            <div className="flex gap-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${selectedPatient?.status === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                    {selectedPatient?.status}
                                </span>
                            </div>
                        </div>
                        <VitalsChart patientId={selectedPatientId} />
                    </motion.div>

                    {/* Recent Risks Section */}
                    {selectedPatient?.status === 'Critical' && (
                        <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-red-100 dark:border-red-900/50">
                            <div className="flex items-center gap-2 mb-4">
                                <AlertTriangle className="h-5 w-5 text-red-600" />
                                <h3 className="font-bold text-red-900 dark:text-red-100">Critical Observation</h3>
                            </div>
                            <p className="text-sm text-red-800/80 dark:text-red-200/80 mb-4">
                                Patient <span className="font-semibold">{selectedPatient.id}</span> vitals reached threshold levels at {new Date(selectedPatient.lastCheck).toLocaleTimeString()}. Anomaly detected in SBP/SPO2.
                            </p>
                            <button className="text-xs font-bold text-red-700 hover:text-red-800 flex items-center gap-1">
                                Open Clinical Review <ArrowRight className="h-3 w-3" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Right Column - 1/3 width */}
                <div className="space-y-8">
                    {/* Timeline */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="bg-card rounded-2xl border border-border p-6 shadow-sm h-full"
                    >
                        <h3 className="text-lg font-bold mb-6">Patient Timeline</h3>
                        <Timeline patientId={selectedPatientId} />
                        <button className="w-full mt-6 py-2.5 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-xl transition-colors">
                            Export Logs
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
