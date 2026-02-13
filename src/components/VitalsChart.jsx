import React from 'react';
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

const data = [
    { time: '08:00', heartRate: 72, sys: 120, dia: 80 },
    { time: '09:00', heartRate: 75, sys: 122, dia: 82 },
    { time: '10:00', heartRate: 78, sys: 125, dia: 84 },
    { time: '11:00', heartRate: 76, sys: 121, dia: 81 },
    { time: '12:00', heartRate: 74, sys: 119, dia: 79 },
    { time: '13:00', heartRate: 72, sys: 120, dia: 80 },
    { time: '14:00', heartRate: 85, sys: 135, dia: 88 }, // Spike
    { time: '15:00', heartRate: 80, sys: 130, dia: 85 },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-card border border-border p-3 rounded-lg shadow-lg">
                <p className="font-semibold text-foreground mb-1">{label}</p>
                {payload.map((p, index) => (
                    <p key={index} style={{ color: p.color }} className="text-sm font-medium">
                        {p.name}: {p.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const VitalsChart = () => {
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
                        tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--muted-foreground)', strokeWidth: 1, strokeDasharray: '4 4' }} />

                    <Area
                        type="monotone"
                        dataKey="heartRate"
                        name="Heart Rate (bpm)"
                        stroke="var(--primary)"
                        fillOpacity={1}
                        fill="url(#colorHr)"
                        strokeWidth={3}
                    />
                    <Area
                        type="monotone"
                        dataKey="sys"
                        name="Systolic BP"
                        stroke="var(--destructive)"
                        fillOpacity={1}
                        fill="url(#colorBp)"
                        strokeWidth={3}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default VitalsChart;
