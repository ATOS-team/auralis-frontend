import React from 'react';
import { Pill, Stethoscope, FileText, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const events = [
    {
        id: 1,
        time: '14:30',
        type: 'alert',
        title: 'Abnormal Heart Rate Spike',
        description: 'HR elevated to 85 bpm while resting.',
        icon: AlertTriangle,
        color: 'text-red-500 bg-red-500/10',
        date: 'Today'
    },
    {
        id: 2,
        time: '12:00',
        type: 'medication',
        title: 'Medication Administered',
        description: 'Amoxicillin 500mg IV.',
        icon: Pill,
        color: 'text-blue-500 bg-blue-500/10',
        date: 'Today'
    },
    {
        id: 3,
        time: '09:15',
        type: 'checkup',
        title: 'Morning Rounds',
        description: 'Dr. Carter checked vitals. Patient reported sleeping well.',
        icon: Stethoscope,
        color: 'text-green-500 bg-green-500/10',
        date: 'Today'
    },
    {
        id: 4,
        time: '18:00',
        type: 'report',
        title: 'Lab Results Available',
        description: 'Blood work complete. Cholesterol levels within normal range.',
        icon: FileText,
        color: 'text-purple-500 bg-purple-500/10',
        date: 'Yesterday'
    },
];

const TimelineItem = ({ event, index }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className="relative pl-8 pb-8 last:pb-0 group"
    >
        {/* Connector Line */}
        <div className="absolute left-[11px] top-8 bottom-0 w-0.5 bg-border group-last:hidden" />

        {/* Dot */}
        <div className={`absolute left-0 top-1 h-6 w-6 rounded-full flex items-center justify-center border-2 border-background ${event.color} ring-4 ring-background`}>
            <event.icon className="h-3 w-3" />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-1">
            <h4 className="text-sm font-semibold text-foreground">{event.title}</h4>
            <span className="text-xs text-muted-foreground">{event.date}, {event.time}</span>
        </div>
        <p className="text-sm text-muted-foreground bg-secondary/30 p-3 rounded-lg border border-border/50">
            {event.description}
        </p>
    </motion.div>
);

const Timeline = () => {
    return (
        <div className="space-y-2">
            {events.map((event, index) => (
                <TimelineItem key={event.id} event={event} index={index} />
            ))}
        </div>
    );
};

export default Timeline;
