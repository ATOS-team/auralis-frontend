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
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Schedule</h2>
                    <p className="text-muted-foreground">Manage appointments and doctor availability.</p>
                </div>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors shadow-lg shadow-primary/20 flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    New Appointment
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 h-full overflow-hidden">
                {/* Calendar Section */}
                <div className="lg:w-2/3 flex flex-col bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                    <div className="p-6 flex items-center justify-between border-b border-border">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <CalendarIcon className="h-5 w-5 text-primary" />
                            October 2026
                        </h3>
                        <div className="flex gap-2">
                            <button className="p-2 hover:bg-secondary rounded-lg text-muted-foreground"><ChevronLeft className="h-5 w-5" /></button>
                            <button className="p-2 hover:bg-secondary rounded-lg text-muted-foreground"><ChevronRight className="h-5 w-5" /></button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 border-b border-border bg-secondary/20">
                        {days.map(day => (
                            <div key={day} className="py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
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
                                className={`border-b border-r border-border/50 p-2 min-h-[80px] cursor-pointer hover:bg-secondary/30 transition-colors relative group ${day === selectedDate ? 'bg-primary/5' : ''}`}
                            >
                                <span className={`text-sm font-medium h-7 w-7 flex items-center justify-center rounded-full ${day === selectedDate ? 'bg-primary text-primary-foreground' : 'text-foreground group-hover:bg-secondary'}`}>
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
                <div className="lg:w-1/3 bg-card rounded-2xl border border-border shadow-sm flex flex-col overflow-hidden">
                    <div className="p-6 border-b border-border">
                        <h3 className="text-lg font-bold">Upcoming ({appointments.length})</h3>
                        <p className="text-sm text-muted-foreground">For Oct {selectedDate}, 2026</p>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {appointments.map((apt, index) => (
                            <motion.div
                                key={apt.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-4 rounded-xl bg-secondary/30 border border-border hover:border-primary/50 transition-colors group cursor-pointer"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                                            {apt.avatar}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm">{apt.patient}</h4>
                                            <p className="text-xs text-muted-foreground">{apt.type}</p>
                                        </div>
                                    </div>
                                    <button className="text-muted-foreground hover:text-foreground">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="h-3.5 w-3.5" />
                                        {apt.time} ({apt.duration})
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <MapPin className="h-3.5 w-3.5" />
                                        {apt.room}
                                    </div>
                                </div>

                                <div className="mt-3 flex items-center justify-between">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide
                                ${apt.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                                            apt.status === 'Checked In' ? 'bg-blue-100 text-blue-700' :
                                                apt.status === 'In Progress' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'}
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
