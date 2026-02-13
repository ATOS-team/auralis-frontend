import React from 'react';
import { Activity, TrendingUp, AlertTriangle, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import VitalsChart from '../components/VitalsChart';
import Timeline from '../components/Timeline';

const StatCard = ({ title, value, label, icon: Icon, trend, color, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay }}
        className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
    >
        <div className={`absolute top-0 right-0 p-24 opacity-5 ${color.replace('bg-', 'bg-')}`}></div>
        <div className="flex justify-between items-start mb-4 relative z-10">
            <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
                <Icon className={`h-6 w-6 ${color.replace('bg-', 'text-')}`} />
            </div>
            {trend && (
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
    return (
        <div className="space-y-8 pb-10">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Patient Overview</h2>
                    <p className="text-muted-foreground">Monitoring active cases and real-time alerts.</p>
                </div>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors shadow-lg shadow-primary/20 flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Generate Report
                </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Active Patients"
                    value="14"
                    label="Current ward occupancy"
                    icon={Activity}
                    trend={5}
                    color="bg-blue-500"
                    delay={0}
                />
                <StatCard
                    title="Critical Alerts"
                    value="3"
                    label="Requires immediate attention"
                    icon={AlertTriangle}
                    trend={-12}
                    color="bg-red-500"
                    delay={0.1}
                />
                <StatCard
                    title="Avg Wait Time"
                    value="18m"
                    label="-2m from yesterday"
                    icon={Clock}
                    trend={-10}
                    color="bg-amber-500"
                    delay={0.2}
                />
                <StatCard
                    title="Recovery Rate"
                    value="94%"
                    label="Post-op success"
                    icon={TrendingUp}
                    trend={2}
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
                                <h3 className="text-lg font-bold">Vitals Trends</h3>
                                <p className="text-sm text-muted-foreground">Heart Rate & Blood Pressure (Last 8 Hours)</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-3 py-1.5 text-xs font-medium bg-secondary text-foreground rounded-lg hover:bg-secondary/80">Day</button>
                                <button className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-secondary rounded-lg">Week</button>
                            </div>
                        </div>
                        <VitalsChart />
                    </motion.div>

                    {/* Recent Risks Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-red-100 dark:border-red-900/50">
                            <div className="flex items-center gap-2 mb-4">
                                <AlertTriangle className="h-5 w-5 text-red-600" />
                                <h3 className="font-bold text-red-900 dark:text-red-100">High Risk Profile</h3>
                            </div>
                            <p className="text-sm text-red-800/80 dark:text-red-200/80 mb-4">
                                Patient <span className="font-semibold">Sarah Connor</span> showing signs of arrhythmia. Immediate consultation recommended.
                            </p>
                            <button className="text-xs font-bold text-red-700 hover:text-red-800 flex items-center gap-1">
                                View Profile <ArrowRight className="h-3 w-3" />
                            </button>
                        </div>
                        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl p-6 border border-amber-100 dark:border-amber-900/50">
                            <div className="flex items-center gap-2 mb-4">
                                <Clock className="h-5 w-5 text-amber-600" />
                                <h3 className="font-bold text-amber-900 dark:text-amber-100">Missing Reports</h3>
                            </div>
                            <p className="text-sm text-amber-800/80 dark:text-amber-200/80 mb-4">
                                3 lab reports pending for Ward A. Follow up required with Pathology.
                            </p>
                            <button className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1">
                                View Pending <ArrowRight className="h-3 w-3" />
                            </button>
                        </div>
                    </div>
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
                        <h3 className="text-lg font-bold mb-6">Patient History</h3>
                        <Timeline />
                        <button className="w-full mt-6 py-2.5 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-xl transition-colors">
                            View Full History
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
