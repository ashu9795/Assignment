// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state to manage loading

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false); // Set loading to false after checking local storage
    }, []);

    const login = async (credentials) => {
        try {
            const response = await axios.post('http://localhost:7000/api/auth/v1/login', credentials);
            // Assuming response.data contains the user information
            setUser(response.data); // Update user state
            localStorage.setItem('user', JSON.stringify(response.data)); // Save user data to local storage
        } catch (error) {
            console.error('Login failed:', error); // Handle login errors
            throw new Error(error.response?.data?.message || 'Login failed'); // Throw specific error message if available
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const isAuthenticated = () => {
        return user !== null; // Check if user is logged in
    };

    if (loading) {
        return <div>Loading...</div>; // Optionally render a loading state
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
