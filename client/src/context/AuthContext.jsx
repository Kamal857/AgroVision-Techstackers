import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('agroUser');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            const response = await api.post('/auth/login', credentials);
            if (response.data.success) {
                const userData = response.data.user;
                setUser(userData);
                localStorage.setItem('agroUser', JSON.stringify(userData));
                if (response.data.token) {
                    localStorage.setItem('agroToken', response.data.token);
                }
                return { success: true };
            }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.error || 'Login failed. Please try again.'
            };
        }
    };

    const signup = async (userData) => {
        try {
            const response = await api.post('/auth/register', userData);
            if (response.data.success) {
                const newUser = response.data.user;
                setUser(newUser);
                localStorage.setItem('agroUser', JSON.stringify(newUser));
                if (response.data.token) {
                    localStorage.setItem('agroToken', response.data.token);
                }
                return { success: true };
            }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.error || 'Registration failed.'
            };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('agroUser');
        localStorage.removeItem('agroToken');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
