import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
const API_URL = 'http://localhost:8000';

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('auralis_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Login failed');
            }

            const userData = await response.json();
            const userWithAvatar = {
                ...userData,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=0D8ABC&color=fff`
            };

            setUser(userWithAvatar);
            localStorage.setItem('auralis_user', JSON.stringify(userWithAvatar));
            navigate('/dashboard');
            return { success: true };
        } catch (err) {
            console.error("Auth Exception:", err);
            alert(err.message);
            throw err;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('auralis_user');
        navigate('/login');
    };

    const register = async (name, email, password) => {
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, role: 'Doctor' })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Registration failed');
            }

            const userData = await response.json();
            const userWithAvatar = {
                ...userData,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=0D8ABC&color=fff`
            };

            setUser(userWithAvatar);
            localStorage.setItem('auralis_user', JSON.stringify(userWithAvatar));
            navigate('/dashboard');
            return { success: true };
        } catch (err) {
            console.error("Auth Exception:", err);
            alert(err.message);
            throw err;
        }
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
