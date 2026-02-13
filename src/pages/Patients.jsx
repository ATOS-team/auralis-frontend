import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, User, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const patientsData = [
    { id: 1, name: 'Sarah Connor', age: 45, gender: 'F', condition: 'Arrhythmia', status: 'Critical', ward: 'Ward A', lastVisit: '2 hours ago', risk: 'High' },
    { id: 2, name: 'John Smith', age: 32, gender: 'M', condition: 'Post-op Recovery', status: 'Stable', ward: 'Ward B', lastVisit: '1 day ago', risk: 'Low' },
    { id: 3, name: 'Emily Davis', age: 28, gender: 'F', condition: 'Hypertension', status: 'Observation', ward: 'Ward C', lastVisit: '10 mins ago', risk: 'Moderate' },
    { id: 4, name: 'Michael Brown', age: 58, gender: 'M', condition: 'Diabetes T2', status: 'Stable', ward: 'Outpatient', lastVisit: '3 days ago', risk: 'Low' },
    { id: 5, name: 'Jessica Wilson', age: 35, gender: 'F', condition: 'Asthma', status: 'Discharged', ward: '-', lastVisit: '1 week ago', risk: 'Low' },
    { id: 6, name: 'David Lee', age: 62, gender: 'M', condition: 'Cardiac Arrest (Recovering)', status: 'Critical', ward: 'ICU', lastVisit: '1 hour ago', risk: 'High' },
];

const StatusBadge = ({ status }) => {
    const styles = {
        Critical: 'bg-red-100 text-red-700',
        Stable: 'bg-green-100 text-green-700',
        Observation: 'bg-amber-100 text-amber-700',
        Discharged: 'bg-slate-100 text-slate-700',
    };

    const icons = {
        Critical: AlertCircle,
        Stable: CheckCircle2,
        Observation: Clock,
        Discharged: User
    };

    const Icon = icons[status] || User;

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit ${styles[status] || 'bg-gray-100 text-gray-700'}`}>
            <Icon className="h-3 w-3" />
            {status}
        </span>
    );
};

const Patients = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All');

    const filteredPatients = patientsData.filter(patient => {
        const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'All' || patient.status === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Patients</h2>
                    <p className="text-muted-foreground">Manage patient records and statuses.</p>
                </div>
                <Link to="/register" className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors shadow-lg shadow-primary/20">
                    + Admit Patient
                </Link>
            </div>

            <div className="bg-card rounded-2xl border border-border shadow-sm p-4">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by name, condition..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2.5 w-full rounded-xl border border-input bg-secondary/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </div>
                    <div className="flex gap-2 bg-secondary/30 p-1 rounded-xl">
                        {['All', 'Critical', 'Stable', 'Observation'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === f ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Patient</th>
                                <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Condition</th>
                                <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                                <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Ward</th>
                                <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Last Visit</th>
                                <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPatients.map((patient, index) => (
                                <motion.tr
                                    key={patient.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="border-b border-border/50 hover:bg-secondary/30 transition-colors group"
                                >
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                {patient.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-foreground">{patient.name}</p>
                                                <p className="text-xs text-muted-foreground">{patient.age} yrs • {patient.gender}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm font-medium">{patient.condition}</td>
                                    <td className="p-4">
                                        <StatusBadge status={patient.status} />
                                    </td>
                                    <td className="p-4 text-sm text-muted-foreground">{patient.ward}</td>
                                    <td className="p-4 text-sm text-muted-foreground">{patient.lastVisit}</td>
                                    <td className="p-4">
                                        <button className="p-2 hover:bg-secondary rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                                            <MoreHorizontal className="h-5 w-5" />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredPatients.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                            <User className="h-12 w-12 mx-auto mb-3 opacity-20" />
                            <p>No patients found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Patients;
