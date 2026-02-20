import React, { useState, useEffect } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart
} from 'recharts';
import { fetchPatientVitals } from '../lib/api';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="glass-card border-2 border-white/50 p-5 rounded-3xl shadow-2xl clinical-shadow">
                <p className="font-black text-foreground mb-3 text-sm uppercase tracking-widest opacity-50">
                    {new Date(label).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <div className="space-y-2">
                    {payload.map((p, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: p.color }} />
                            <p className="text-base font-black text-slate-700">
                                {p.name}: <span className="text-primary">{p.value.toFixed(1)}</span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return null;
};

const VitalsChart = ({ patientId }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!patientId) return;

        const loadVitals = async () => {
            setLoading(true);
            try {
                const vitals = await fetchPatientVitals(patientId);
                // Map API data to chart data
                const chartData = vitals.map(v => ({
                    time: v.timestamp,
                    heartRate: v.hr,
                    sbp: v.sbp,
                    spo2: v.spo2
                }));
                setData(chartData);
            } catch (err) {
                console.error("Error loading vitals for chart:", err);
            } finally {
                setLoading(false);
            }
        };

        loadVitals();
    }, [patientId]);

    if (loading) return <div className="w-full h-full flex items-center justify-center font-black text-muted-foreground animate-pulse">Synthesizing Telemetry...</div>;
    if (data.length === 0) return <div className="w-full h-full flex items-center justify-center font-black text-rose-400">Endpoint Disconnected</div>;

    return (
        <div className="w-full h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorHr" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorBp" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                    <XAxis
                        dataKey="time"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'var(--muted-foreground)', fontSize: 13, fontWeight: 900 }}
                        dy={15}
                        tickFormatter={(unixTime) => new Date(unixTime).toLocaleTimeString([], { hour: '2-digit' })}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'var(--muted-foreground)', fontSize: 13, fontWeight: 900 }}
                        dx={-10}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--muted-foreground)', strokeWidth: 1, strokeDasharray: '4 4' }} />

                    <Area
                        type="monotone"
                        dataKey="heartRate"
                        name="HR (bpm)"
                        stroke="#3b82f6"
                        fillOpacity={1}
                        fill="url(#colorHr)"
                        strokeWidth={2}
                    />
                    <Area
                        type="monotone"
                        dataKey="sbp"
                        name="SBP (mmHg)"
                        stroke="#ef4444"
                        fillOpacity={1}
                        fill="url(#colorBp)"
                        strokeWidth={2}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default VitalsChart;
