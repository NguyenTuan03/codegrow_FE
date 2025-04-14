'use client';

import React, { createContext, ReactNode, useEffect, useState } from 'react';

type Props = {
    children: ReactNode;
};

interface User {
    id: string;
    role: string;
    fullname: string;
    email:string;
}

interface AuthContextType {
    userAuth: User | null;
    setUserAuth: (user: User | null) => void;
    loginUser: (user: User) => void;
    logoutUser: () => void;
}

export const Auth = createContext<AuthContextType | undefined>(undefined);

const AuthContext = ({ children }: Props) => {
    const [userAuth, setUserAuth] = useState<User | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    setUserAuth(JSON.parse(storedUser));
                } catch (e) {
                    console.error('Failed to parse user from localStorage', e);
                }
            }
        }
    }, []);

    const loginUser = (user: User) => {
        setUserAuth(user);
        if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(user));
        }
    };

    const logoutUser = () => {
        setUserAuth(null);
        if (typeof window !== 'undefined') {
            localStorage.removeItem('user');
        }
    };

    const value: AuthContextType = {
        userAuth,
        setUserAuth,
        loginUser,
        logoutUser,
    };

    return <Auth.Provider value={value}>{children}</Auth.Provider>;
};

export default AuthContext;
