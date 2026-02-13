import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate checking for a logged-in user
        const storedUser = localStorage.getItem('auralis_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        // Mock login logic
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockUser = {
                    id: '1',
                    name: 'Dr. Naomi Carter',
                    email: email,
                    role: 'doctor',
                    avatar: 'https://ui-avatars.com/api/?name=Naomi+Carter&background=0D8ABC&color=fff'
                };
                setUser(mockUser);
                localStorage.setItem('auralis_user', JSON.stringify(mockUser));
                navigate('/dashboard');
                resolve({ success: true });
            }, 1000);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('auralis_user');
        navigate('/login');
    };

    const register = async (name, email, password) => {
        // Mock register logic
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockUser = {
                    id: '2',
                    name: name,
                    email: email,
                    role: 'doctor', // Default role
                    avatar: `https://ui-avatars.com/api/?name=${name}&background=0D8ABC&color=fff`
                };
                setUser(mockUser);
                localStorage.setItem('auralis_user', JSON.stringify(mockUser));
                navigate('/dashboard');
                resolve({ success: true });
            }, 1000);
        });
    };

    const value = {
        user,
        login,
        logout,
        register,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
