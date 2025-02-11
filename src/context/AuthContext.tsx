'use client'

import { createContext, useContext, useState, useEffect } from 'react';
import { IUser } from '@interface';

interface AuthContextProps {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
    isLoading: boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const logout = () => {
        localStorage.removeItem('user');
        document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        setUser(null);
    };

    useEffect(() => {
        const checkAuth = () => {
            try {
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    const userData = JSON.parse(storedUser);
                    setUser(userData.data);
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
                setUser(null);
                localStorage.removeItem('user');
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, isLoading, logout }}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
}

export default AuthProvider