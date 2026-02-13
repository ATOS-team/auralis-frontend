import React, { useState, useEffect } from 'react';
import { User, Bell, Shield, Moon, Sun, LogOut, ChevronRight, Smartphone, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Toggle = ({ enabled, setEnabled }) => (
    <button
        onClick={() => setEnabled(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${enabled ? 'bg-primary' : 'bg-input'}`}
    >
        <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`}
        />
    </button>
);

const SettingsSection = ({ title, icon: Icon, children }) => (
    <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden mb-6">
        <div className="p-6 border-b border-border flex items-center gap-3">
            <div className="p-2 bg-secondary rounded-lg">
                <Icon className="h-5 w-5 text-foreground" />
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <div className="p-6">
            {children}
        </div>
    </div>
);

const Settings = () => {
    const { user, logout } = useAuth();
    const [darkMode, setDarkMode] = useState(false);
    const [emailNotifs, setEmailNotifs] = useState(true);
    const [pushNotifs, setPushNotifs] = useState(false);

    // Initialize toggle state from document class
    useEffect(() => {
        if (document.documentElement.classList.contains('dark')) {
            setDarkMode(true);
        }
    }, []);

    // Handle Dark Mode Toggle
    const toggleTheme = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-10">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">Manage your account preferences and application settings.</p>
            </div>

            {/* Profile Section */}
            <SettingsSection title="Profile Information" icon={User}>
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <img
                        src={user?.avatar || "https://ui-avatars.com/api/?name=User"}
                        alt="Profile"
                        className="h-24 w-24 rounded-full border-4 border-secondary"
                    />
                    <div className="flex-1 space-y-4 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1">Full Name</label>
                                <input
                                    type="text"
                                    defaultValue={user?.name || "Dr. Naomi Carter"}
                                    className="w-full px-4 py-2 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1">Email Address</label>
                                <input
                                    type="email"
                                    defaultValue={user?.email || "doctor@auralis.com"}
                                    className="w-full px-4 py-2 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 outline-none"
                                />
                            </div>
                        </div>
                    </div>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-blue-600 transition-colors">
                        Save Changes
                    </button>
                </div>
            </SettingsSection>

            {/* Preferences Section */}
            <SettingsSection title="Appearance & Notifications" icon={Bell}>
                <div className="space-y-6 divide-y divide-border">
                    <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-secondary/50 rounded-full">
                                {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                            </div>
                            <div>
                                <p className="font-medium text-foreground">Dark Mode</p>
                                <p className="text-sm text-muted-foreground">Adjust the appearance of the application.</p>
                            </div>
                        </div>
                        <Toggle enabled={darkMode} setEnabled={toggleTheme} />
                    </div>

                    <div className="flex items-center justify-between pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-secondary/50 rounded-full">
                                <Mail className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="font-medium text-foreground">Email Notifications</p>
                                <p className="text-sm text-muted-foreground">Receive daily summaries and critical alerts via email.</p>
                            </div>
                        </div>
                        <Toggle enabled={emailNotifs} setEnabled={setEmailNotifs} />
                    </div>

                    <div className="flex items-center justify-between pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-secondary/50 rounded-full">
                                <Smartphone className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="font-medium text-foreground">Mobile Push Notifications</p>
                                <p className="text-sm text-muted-foreground">Receive real-time alerts on your mobile device.</p>
                            </div>
                        </div>
                        <Toggle enabled={pushNotifs} setEnabled={setPushNotifs} />
                    </div>
                </div>
            </SettingsSection>

            {/* Security Section */}
            <SettingsSection title="Security" icon={Shield}>
                <div className="space-y-4">
                    <button className="flex items-center justify-between w-full p-4 rounded-xl border border-input hover:bg-secondary/30 transition-colors text-left group">
                        <div>
                            <p className="font-medium text-foreground">Change Password</p>
                            <p className="text-sm text-muted-foreground">Update your password regularly to keep your account secure.</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="flex items-center justify-between w-full p-4 rounded-xl border border-input hover:bg-secondary/30 transition-colors text-left group">
                        <div>
                            <p className="font-medium text-foreground">Two-Factor Authentication</p>
                            <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </SettingsSection>

            <div className="flex justify-end">
                <button
                    onClick={logout}
                    className="flex items-center gap-2 px-6 py-3 text-destructive font-medium bg-destructive/10 hover:bg-destructive/20 rounded-xl transition-colors"
                >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default Settings;
