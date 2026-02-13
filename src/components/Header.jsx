import React from 'react';
import { Menu, Search, Bell, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = ({ toggleSidebar }) => {
    const { user } = useAuth();

    return (
        <header className="px-6 py-4 bg-background/50 backdrop-blur-md border-b border-border sticky top-0 z-30 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="md:hidden p-2 text-muted-foreground hover:bg-secondary rounded-lg transition-colors"
                >
                    <Menu className="h-6 w-6" />
                </button>

                <div className="hidden md:flex flex-col">
                    <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
                    <p className="text-xs text-muted-foreground">Overview & Patient Vitals</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative hidden sm:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search patients, reports..."
                        className="pl-10 pr-4 py-2 w-64 rounded-xl border border-input bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground"
                    />
                </div>

                <button className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 h-2 w-2 bg-destructive rounded-full border-2 border-background"></span>
                </button>

                <div className="flex items-center gap-3 pl-4 border-l border-border">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-foreground">{user?.name || 'Dr. Carter'}</p>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">{user?.role || 'Cardiology'}</p>
                    </div>
                    <button className="flex items-center gap-2 hover:bg-secondary p-1 rounded-lg transition-colors">
                        <img
                            src={user?.avatar || "https://ui-avatars.com/api/?name=User&background=random"}
                            alt="Profile"
                            className="h-10 w-10 rounded-full border-2 border-background shadow-sm"
                        />
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
