import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('userData'));
        if (savedUser) {
            setUser(savedUser);
            setIsAuthenticated(true);
            setIsAdmin(savedUser.isAdmin);
        }
    }, []);

    const login = (credentials) => {
        // Perform login logic
        setUser({ ...credentials, isAdmin: true });
        setIsAuthenticated(true);
        setIsAdmin(true);
        localStorage.setItem('userData', JSON.stringify({ ...credentials, isAdmin: true }));
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
        localStorage.removeItem('userData');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isAdmin, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
