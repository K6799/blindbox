import React, { createContext, useState, useEffect, useContext } from 'react';
import { getProfile } from '../api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getProfile()
                .then(res => {
                    setUser(res.data);
                })
                .catch(() => {
                    localStorage.removeItem('token');
                    setUser(null);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const login = (userData, token) => {
        localStorage.setItem('token', token);
        setUser(userData);
        toast.success(`欢迎回来, ${userData.username}!`);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        toast.success('已成功退出登录');
    };

    const updateUserBalance = (newBalance) => {
        if (user) {
            setUser({ ...user, balance: newBalance });
        }
    };

    const value = {
        user,
        setUser,
        login,
        logout,
        updateUserBalance,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

