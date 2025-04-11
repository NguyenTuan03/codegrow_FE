'use client';

import React, { createContext, ReactNode, useEffect, useState } from 'react';

type Props = {
    children: ReactNode;
};

interface User {
    id: string;
    role: string;
    fullname: string;
}

interface AuthContextType {
    userAuth: User | null;
    setUserAuth: (user: User | null) => void;
    loginUser: (user: User) => void;
    logoutUser: () => void;
}

// Create a context for the authentication state
export const Auth = createContext<AuthContextType | undefined>(undefined);

const AuthContext = ({ children }: Props) => {
    const [userAuth, setUserAuth] = useState<User | null>(null);

    // Use effect to check localStorage and set user if available (client-side only)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Ensures this runs on the client side only
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    setUserAuth(JSON.parse(storedUser));
                } catch (e) {
                    console.error('Failed to parse user from localStorage', e);
                }
            } else {
                // If no user in localStorage, set a fake user for demo
                const fakeUser: User = {
                    id: '1',
                    role: 'customer',
                    fullname: 'Fake Customer',
                };
                setUserAuth(fakeUser);
                localStorage.setItem('user', JSON.stringify(fakeUser));
            }
        }
    }, []);

    // Function to log in the user (sets user and saves to localStorage)
    const loginUser = (user: User) => {
        setUserAuth(user);
        if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(user)); // Save to localStorage
        }
    };

    // Function to log out the user (clears user from state and localStorage)
    const logoutUser = () => {
        setUserAuth(null);
        if (typeof window !== 'undefined') {
            localStorage.removeItem('user'); // Remove from localStorage
        }
    };

    // Value provided by the context
    const value: AuthContextType = {
        userAuth,
        setUserAuth,
        loginUser,
        logoutUser,
    };

    return <Auth.Provider value={value}>{children}</Auth.Provider>;
};

export default AuthContext;
