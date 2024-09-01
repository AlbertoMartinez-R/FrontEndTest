import {apiURL} from "./api.js";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const savedToken = localStorage.getItem('authToken');
        const savedUser = JSON.parse(localStorage.getItem('userData'));

        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(savedUser);
            setIsAuthenticated(true);
            setIsAdmin(savedUser.admin);
        }
    }, []);

    const login = async ({ username, password }) => {
        try {
            const response = await fetch(`${apiURL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setToken(data.token);
                setUser({ username, admin: data.admin });
                setIsAuthenticated(true);
                setIsAdmin(data.admin);

                // Save token and user data in localStorage
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('userData', JSON.stringify({ username, admin: data.admin }));

                navigate('/account'); // Redirect after login
            } else {
                throw new Error(data.message || 'Login failed');
            }
        } catch (error) {
            alert(error.message); // Handle errors
        }
    };

    const register = async ({ username, password }) => {
        try {
            const response = await fetch(`${apiURL}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Automatically log in the user after successful registration
                setToken(data.token);
                setUser({ username, admin: data.admin });
                setIsAuthenticated(true);
                setIsAdmin(data.admin);

                // Save token and user data in localStorage
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('userData', JSON.stringify({ username, admin: data.admin }));

                navigate('/'); // Redirect after registration
            } else {
                throw new Error(data.message || 'Registration failed');
            }
        } catch (error) {
            alert(error.message); // Handle errors
        }
    };

    const logout = () => {
        setToken(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
        setUser(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        navigate('/authenticate');
    };

    return {
        isAuthenticated,
        isAdmin,
        user,
        token,
        login,
        register,
        logout,
    };
};