'use client'
import React, { createContext, ReactNode, useEffect, useState } from 'react'

type Props = {
    children: ReactNode
}
interface User {
    id: string,
    role: string,
    fullname: string
}
interface AuthContextType {
    userAuth : User | null,
    setUserAuth: (user:User | null) => void;
    loginUser: (user: User) => void;
    logoutUser: () => void;
}
export const Auth = createContext<AuthContextType | undefined>(undefined);

const AuthContext = ({children}: Props) => {
    const [userAuth, setUserAuth] = useState<User | null>(null);
  
    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUserAuth(JSON.parse(storedUser));
        } catch (e) {
          console.error('Failed to parse user from localStorage', e);
        }
      } else {        
        const fakeUser: User = {
          id: '1',
          role: 'customer',
          fullname: 'Fake Customer',
        };
        setUserAuth(fakeUser);
        localStorage.setItem('user', JSON.stringify(fakeUser));
      }
    }, []);
    const loginUser = (user:User) => {
        setUserAuth(user);
        localStorage.setItem("user", JSON.stringify(user));
    }
    const logoutUser = () => {
        setUserAuth(null);
        localStorage.removeItem("user");
    }
    const value:AuthContextType = {
        userAuth,
        setUserAuth,
        loginUser,
        logoutUser
    }
  return (
    <Auth.Provider value={value}>
        {children}
    </Auth.Provider>
  )
}

export default AuthContext