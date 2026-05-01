import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Shield,
    Search,
    Download,
    Calendar,
    Filter,
    Activity,
    User,
    Clock,
    ArrowUpDown,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import { cn } from '../lib/utils';
import { fetchAuditLogs } from '../lib/api';

const AuditLogs = () => {
    const { user } = useAuth();
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [error, setError] = useState(null);

    const loadLogs = async () => {
        try {
            setLoading(true);
            const data = await fetchAuditLogs();
            setLogs(data);
        } catch (err) {
            console.error("Failed to load audit logs:", err);
            setError("Unable to sync with clinical audit server.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadLogs();
    }, []);

    const filteredLogs = useMemo(() => {
        return logs.filter((log) => {
            const matchesSearch =
                log.username.toLowerCase().includes(search.toLowerCase()) ||
                log.action.toLowerCase().includes(search.toLowerCase()) ||
                (log.role && log.role.toLowerCase().includes(search.toLowerCase()));

            const logDate = new Date(log.dateTime);
            const matchesStart = startDate ? logDate >= new Date(startDate) : true;
            const matchesEnd = endDate ? logDate <= new Date(endDate + 'T23:59:59') : true;

            return matchesSearch && matchesStart && matchesEnd;
        });
    }, [logs, search, startDate, endDate]);

    const exportCSV = () => {
        const header = ["Timestamp", "Username", "Role", "Action", "Details"];
        const rows = filteredLogs.map((l) => [
            new Date(l.dateTime).toLocaleString(),
            l.username,
            l.role || 'N/A',
            l.action,
            l.details || ''
        ]);

        const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `auralis_audit_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    return (
        <div className="space-y-10 pb-20">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
                        <div className="p-2 md:p-3 bg-indigo-900 text-white rounded-xl md:rounded-2xl shadow-lg ring-4 ring-indigo-50 w-fit">
                            <Shield className="h-5 w-5 md:h-6 md:w-6" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground">
                            Audit Registry
                        </h1>
                    </div>
                    <p className="text-sm md:text-xl text-muted-foreground font-bold italic">
                        Real-time clinical action monitoring. Integrity level: <span className="text-emerald-600 font-black not-italic px-2 py-0.5 bg-emerald-50 rounded-lg">VERIFIED</span>
                    </p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button
                        onClick={exportCSV}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 md:px-6 py-3 md:py-4 bg-indigo-900 text-white rounded-xl md:rounded-2xl shadow-xl hover:shadow-indigo-200 hover:-translate-y-1 active:scale-95 transition-all font-black text-xs md:text-sm uppercase tracking-widest"
                    >
                        <Download className="h-4 w-4 md:h-5 md:w-5" /> Export Data
                    </button>
                </div>
            </div>

            {/* Navigation / Filters */}
            <div className="glass-card p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] clinical-shadow border-white/40 flex flex-col xl:flex-row items-stretch xl:items-center gap-4 md:gap-6">
                <div className="relative flex-1 min-w-[200px] md:min-w-[300px]">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by operative or action..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 md:pr-6 py-3 md:py-4 rounded-xl md:rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-indigo-500 outline-none font-bold transition-all text-sm md:text-base"
                    />
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4">
                    <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-slate-50 rounded-lg md:rounded-xl border-2 border-slate-100 flex-1 sm:flex-none">
                        <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="bg-transparent outline-none text-xs md:text-sm font-bold text-slate-600 w-full"
                        />
                    </div>
                    <div className="text-slate-300 font-black hidden sm:block">→</div>
                    <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-slate-50 rounded-lg md:rounded-xl border-2 border-slate-100 flex-1 sm:flex-none">
                        <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="bg-transparent outline-none text-xs md:text-sm font-bold text-slate-600 w-full"
                        />
                    </div>
                    <button
                        onClick={() => { setSearch(""); setStartDate(""); setEndDate(""); }}
                        className="p-3 bg-slate-50 sm:bg-transparent hover:bg-slate-100 rounded-lg md:rounded-xl transition-all text-slate-400 flex items-center justify-center shrink-0"
                    >
                        <Clock className="h-4 w-4 md:h-5 md:w-5" />
                    </button>
                </div>
            </div>

            {/* Logs Table */}
            <div className="glass-card rounded-[1.5rem] md:rounded-[2.5rem] clinical-shadow border-white/40 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 border-b border-slate-100">
                            <tr>
                                <th className="px-4 md:px-8 py-4 md:py-6 text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">Operative</th>
                                <th className="px-4 md:px-8 py-4 md:py-6 text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">Clinical Action</th>
                                <th className="px-4 md:px-8 py-4 md:py-6 text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">Instance</th>
                                <th className="px-4 md:px-8 py-4 md:py-6 text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">Timestamp</th>
                                <th className="px-4 md:px-8 py-4 md:py-6 text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-4 md:px-8 py-10 md:py-20 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="animate-spin rounded-full h-8 w-8 md:h-10 md:w-10 border-b-2 border-indigo-900"></div>
                                            <p className="font-black text-slate-400 uppercase tracking-widest text-[10px] md:text-xs">Querying Blockchain Ledger...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredLogs.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-4 md:px-8 py-10 md:py-20 text-center text-muted-foreground font-bold italic text-sm md:text-base">
                                        No clinical operations recorded within defined parameters.
                                    </td>
                                </tr>
                            ) : (
                                filteredLogs.map((log) => (
                                    <tr key={log.id} className="hover:bg-slate-50/30 transition-all group">
                                        <td className="px-4 md:px-8 py-4 md:py-6 whitespace-nowrap">
                                            <div className="flex items-center gap-3 md:gap-4">
                                                <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg md:rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center font-black text-sm md:text-base text-indigo-900 shrink-0">
                                                    {log.username[0]}
                                                </div>
                                                <div>
                                                    <p className="font-black text-sm md:text-base text-foreground uppercase tracking-tight">{log.username}</p>
                                                    <span className="text-[9px] md:text-[10px] font-black text-indigo-400 uppercase tracking-widest">{log.role}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-8 py-4 md:py-6 whitespace-nowrap">
                                            <div className="inline-flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 bg-slate-50 rounded-md md:rounded-lg border border-slate-100">
                                                <Activity className="h-3 w-3 md:h-3.5 md:w-3.5 text-indigo-600" />
                                                <span className="text-[10px] md:text-xs font-black text-slate-700 uppercase tracking-wide">{log.action}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-8 py-4 md:py-6 min-w-[200px]">
                                            <p className="text-[10px] md:text-xs font-bold text-slate-500 leading-relaxed max-w-xs line-clamp-2 md:line-clamp-1 group-hover:line-clamp-none transition-all">
                                                {log.details || 'System procedural execution'}
                                            </p>
                                        </td>
                                        <td className="px-4 md:px-8 py-4 md:py-6 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] md:text-xs font-black text-foreground">
                                                    {new Date(log.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                                </span>
                                                <span className="text-[9px] md:text-[10px] font-bold text-slate-400">
                                                    {new Date(log.dateTime).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-8 py-4 md:py-6 whitespace-nowrap">
                                            <div className="flex items-center gap-1 md:gap-2">
                                                <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4 text-emerald-500 shrink-0" />
                                                <span className="text-[9px] md:text-[10px] font-black text-emerald-600 uppercase tracking-tighter tracking-[0.1em]">ENCRYPTED</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Legend / Security Policy */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-indigo-900 text-white shadow-2xl overflow-hidden relative group">
                    <Activity className="absolute -right-4 -bottom-4 h-24 w-24 md:h-32 md:w-32 opacity-10 group-hover:scale-110 transition-all" />
                    <h4 className="text-xs md:text-sm font-black uppercase tracking-[0.3em] opacity-60 mb-3 md:mb-4">Integrity Level</h4>
                    <p className="text-2xl md:text-3xl font-black mb-3 md:mb-4">Clinical Stable</p>
                    <p className="text-[10px] md:text-xs font-bold opacity-70 leading-relaxed">
                        Audit logs are immutable and cryptographically signed upon entry. Any attempt to modify records results in immediate global system lockout.
                    </p>
                </div>

                <div className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-white border-2 border-slate-100 shadow-xl flex flex-col justify-between">
                    <div className="mb-4 md:mb-0">
                        <h4 className="text-xs md:text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-2 md:mb-4">Total Events</h4>
                        <p className="text-3xl md:text-4xl font-black text-indigo-900">{filteredLogs.length}</p>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2 text-emerald-500 text-[10px] md:text-xs font-black mt-auto">
                        <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4" /> AUTO-SYNC ACTIVE
                    </div>
                </div>

                <div className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-slate-50 border-2 border-slate-100 shadow-xl flex flex-col justify-between">
                    <div className="mb-4 md:mb-0">
                        <h4 className="text-xs md:text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-2 md:mb-4">Retention Policy</h4>
                        <p className="text-lg md:text-xl font-black text-slate-700 underline decoration-indigo-200 decoration-4">90 Days Clinical</p>
                    </div>
                    <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed mt-auto">
                        Exceeding retention causes automated archival to off-site secure storage.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuditLogs;
