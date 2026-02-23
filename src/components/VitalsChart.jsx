import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchPatientVitals } from '../lib/api';

const VitalsChart = ({ patientId }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!patientId && patientId !== 0) return;

        const loadVitals = async () => {
            setLoading(true);
            setError(null);
            try {
                const vitals = await fetchPatientVitals(patientId);
                console.log("Telemetry received for patient:", patientId, vitals);

                if (!vitals || vitals.length === 0) {
                    setData([]);
                    return;
                }

                const chartData = vitals.map((v, idx) => {
                    let timeStr = '';
                    try {
                        const ts = String(v.timestamp || '');
                        if (ts.includes('T')) {
                            timeStr = ts.split('T')[1].substring(0, 5);
                        } else if (ts.includes(' ')) {
                            timeStr = ts.split(' ')[1].substring(0, 5);
                        } else {
                            timeStr = ts.substring(0, 5) || `T-${(vitals.length - idx)}`;
                        }
                    } catch (e) {
                        timeStr = `P-${idx}`;
                    }

                    return {
                        time: timeStr,
                        heartRate: Number(v.hr || 0),
                        sbp: Number(v.sbp || 0),
                        spo2: Number(v.spo2 || 0)
                    };
                });
                setData(chartData);
            } catch (err) {
                console.error("Vitals synchronization error:", err);
                setError("Clinical telemetry stream offline");
            } finally {
                setLoading(false);
            }
        };

        loadVitals();
    }, [patientId]);

    if (!patientId && patientId !== 0) return (
        <div className="h-full flex flex-col items-center justify-center text-muted-foreground font-medium p-10 bg-slate-50/50 rounded-[2rem] border-2 border-dashed border-slate-100">
            <div className="mb-4 p-4 bg-white rounded-full shadow-sm">
                <div className="w-8 h-8 border-2 border-slate-200 rounded-lg" />
            </div>
            Select a patient to initialize clinical monitoring
        </div>
    );

    if (loading) return (
        <div className="h-full flex flex-col items-center justify-center gap-6 p-10">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
                </div>
            </div>
            <div className="text-primary font-bold tracking-tight animate-pulse uppercase text-xs">Syncing Telemetry...</div>
        </div>
    );

    if (error) return (
        <div className="h-full flex items-center justify-center text-rose-500 font-bold p-10 text-center glass-card border-rose-200">
            <div className="space-y-2">
                <div className="text-2xl">⚠️</div>
                <p>{error}</p>
                <p className="text-xs font-medium opacity-60">Check backend availability</p>
            </div>
        </div>
    );

    if (data.length === 0) return (
        <div className="h-full flex flex-col items-center justify-center text-muted-foreground italic gap-4 p-10 bg-slate-50/30 rounded-[2rem] border-2 border-dashed border-slate-100/50">
            <div className="w-12 h-1 bg-slate-200 rounded-full" />
            No clinical observations found for this patient record
        </div>
    );

    return (
        <div className="w-full h-full min-h-[300px] relative">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                    <defs>
                        <linearGradient id="colorHR" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorSBP" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorSpO2" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#cbd5e1" opacity={0.3} />
                    <XAxis
                        dataKey="time"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748b', fontSize: 12, fontWeight: 800 }}
                        dy={15}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748b', fontSize: 12, fontWeight: 800 }}
                        dx={-10}
                        domain={['auto', 'auto']}
                    />
                    <Tooltip
                        contentStyle={{
                            borderRadius: '1.5rem',
                            border: '1px solid rgba(255,255,255,0.7)',
                            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.18)',
                            backdropFilter: 'blur(16px)',
                            backgroundColor: 'rgba(255,255,255,0.85)',
                            padding: '20px'
                        }}
                        itemStyle={{ fontWeight: 900, fontSize: '15px', padding: '4px 0' }}
                        labelStyle={{ marginBottom: '12px', color: '#1e293b', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '12px' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="heartRate"
                        stroke="#3b82f6"
                        strokeWidth={5}
                        fillOpacity={1}
                        fill="url(#colorHR)"
                        name="HR (BPM)"
                        activeDot={{ r: 10, stroke: '#fff', strokeWidth: 4, fill: '#3b82f6' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="sbp"
                        stroke="#f43f5e"
                        strokeWidth={5}
                        fillOpacity={1}
                        fill="url(#colorSBP)"
                        name="BP (Systolic)"
                        activeDot={{ r: 10, stroke: '#fff', strokeWidth: 4, fill: '#f43f5e' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="spo2"
                        stroke="#10b981"
                        strokeWidth={5}
                        fillOpacity={1}
                        fill="url(#colorSpO2)"
                        name="SpO₂ (%)"
                        activeDot={{ r: 10, stroke: '#fff', strokeWidth: 4, fill: '#10b981' }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default VitalsChart;
