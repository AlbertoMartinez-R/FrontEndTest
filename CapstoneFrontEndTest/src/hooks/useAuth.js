import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if there is a token in localStorage
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
            const response = await fetch('http://localhost:3032/api/users/login', {
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

                // Save token and user data in localStorage for a week
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('userData', JSON.stringify({ username, admin: data.admin }));

                navigate('/');

            } else {
                throw new Error(data.message || 'Login failed');
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
        navigate('/login'); // Redirect to login page
    };

    return {
        isAuthenticated,
        isAdmin,
        user,
        token,
        login,
        logout,
    };
};