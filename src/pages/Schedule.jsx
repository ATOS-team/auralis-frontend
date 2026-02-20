import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, User, ChevronLeft, ChevronRight, MoreHorizontal, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const appointments = [
    { id: 1, patient: 'Sarah Connor', time: '09:00 AM', type: 'Checkup', duration: '30m', room: 'Room 304', status: 'Confirmed', avatar: 'SC' },
    { id: 2, patient: 'Michael Brown', time: '10:30 AM', type: 'Surgery Follow-up', duration: '45m', room: 'Room 201', status: 'Checked In', avatar: 'MB' },
    { id: 3, patient: 'Emily Davis', time: '01:00 PM', type: 'Consultation', duration: '30m', room: 'Room 305', status: 'Pending', avatar: 'ED' },
    { id: 4, patient: 'David Lee', time: '02:30 PM', type: 'Lab Review', duration: '15m', room: 'Lab 2', status: 'Confirmed', avatar: 'DL' },
    { id: 5, patient: 'Jessica Wilson', time: '04:00 PM', type: 'Emergency', duration: '1h', room: 'ER-1', status: 'In Progress', avatar: 'JW' },
];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const currentMonthDays = Array.from({ length: 31 }, (_, i) => i + 1); // Mock 31 days

const Schedule = () => {
    const [selectedDate, setSelectedDate] = useState(14); // Mock selected date

    return (
        <div className="space-y-8 h-[calc(100vh-8rem)] flex flex-col">
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-foreground mb-2">Clinical Timeline</h1>
                    <p className="text-lg text-muted-foreground font-medium italic">Orchestrating surgical and consultative workflows.</p>
                </div>
                <button className="clinical-gradient text-white px-8 py-3.5 rounded-2xl text-lg font-black shadow-2xl clinical-shadow flex items-center gap-3 active:scale-95 transition-all">
                    <Plus className="h-6 w-6" />
                    Secure Appointment
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 h-full overflow-hidden">
                {/* Calendar Section */}
                <div className="lg:w-2/3 flex flex-col glass-card rounded-[2.5rem] clinical-shadow overflow-hidden border-white/40">
                    <div className="p-8 flex items-center justify-between border-b border-white/20">
                        <h3 className="text-2xl font-black flex items-center gap-3 tracking-tight">
                            <CalendarIcon className="h-7 w-7 text-primary" />
                            October 2026
                        </h3>
                        <div className="flex gap-3">
                            <button className="p-3 bg-white/50 hover:bg-white rounded-xl text-muted-foreground shadow-sm transition-all"><ChevronLeft className="h-6 w-6" /></button>
                            <button className="p-3 bg-white/50 hover:bg-white rounded-xl text-muted-foreground shadow-sm transition-all"><ChevronRight className="h-6 w-6" /></button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 border-b border-white/20 bg-primary/5">
                        {days.map(day => (
                            <div key={day} className="py-4 text-center text-xs font-black text-muted-foreground uppercase tracking-[0.2em]">
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 flex-1 auto-rows-fr">
                        {/* Empty slots for offset */}
                        {[...Array(4)].map((_, i) => <div key={`empty-${i}`} className="border-b border-r border-border/50 min-h-[80px]" />)}

                        {currentMonthDays.map(day => (
                            <div
                                key={day}
                                onClick={() => setSelectedDate(day)}
                                className={`border-b border-r border-white/20 p-4 min-h-[100px] cursor-pointer hover:bg-white transition-all relative group ${day === selectedDate ? 'bg-white/80' : ''}`}
                            >
                                <span className={`text-base font-black h-10 w-10 flex items-center justify-center rounded-2xl transition-all ${day === selectedDate ? 'clinical-gradient text-white shadow-xl' : 'text-slate-600 group-hover:bg-slate-100'}`}>
                                    {day}
                                </span>
                                {/* Mock events dots */}
                                {day === 14 && (
                                    <div className="mt-2 text-xs bg-blue-100 text-blue-700 rounded px-1.5 py-0.5 truncate border border-blue-200">
                                        3 Appts
                                    </div>
                                )}
                                {day === 15 && (
                                    <div className="mt-2 text-xs bg-purple-100 text-purple-700 rounded px-1.5 py-0.5 truncate border border-purple-200">
                                        Surgery
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Appointments List */}
                <div className="lg:w-1/3 glass-card rounded-[2.5rem] clinical-shadow flex flex-col overflow-hidden border-white/40">
                    <div className="p-8 border-b border-white/20">
                        <h3 className="text-2xl font-black tracking-tight">Queue Analysis ({appointments.length})</h3>
                        <p className="text-base text-muted-foreground font-medium italic">Snapshot: Oct {selectedDate}, 2026</p>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {appointments.map((apt, index) => (
                            <motion.div
                                key={apt.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-[2rem] bg-white shadow-sm border border-slate-100 hover:scale-[1.02] hover:shadow-xl transition-all group cursor-pointer relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <MoreHorizontal className="h-6 w-6 text-slate-300" />
                                </div>
                                <div className="flex items-center gap-5 mb-5">
                                    <div className="h-14 w-14 rounded-2xl clinical-gradient flex items-center justify-center text-white font-black text-xl shadow-lg ring-4 ring-white/50">
                                        {apt.avatar}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-lg text-slate-800 tracking-tight">{apt.patient}</h4>
                                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{apt.type}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-3 text-sm font-bold text-slate-600 mb-5">
                                    <div className="flex items-center gap-3">
                                        <Clock className="h-5 w-5 text-primary" />
                                        {apt.time} <span className="text-slate-300 mx-1">•</span> {apt.duration}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MapPin className="h-5 w-5 text-emerald-500" />
                                        {apt.room}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className={`text-[11px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border
                                ${apt.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-200/50' :
                                            apt.status === 'Checked In' ? 'bg-primary/10 text-primary border-primary/20' :
                                                apt.status === 'In Progress' ? 'bg-amber-500/10 text-amber-600 border-amber-200/50' : 'bg-slate-100 text-slate-600 border-slate-200'}
                            `}>
                                        {apt.status}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Schedule;
