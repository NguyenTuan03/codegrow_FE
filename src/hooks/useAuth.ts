import { Auth } from '@/lib/components/context/AuthContext';
import { useContext } from 'react';

export const useAuth = () => {
    const context = useContext(Auth);
    if (!context) {
        throw new Error('❌ useAuth must be used within an AuthContext provider');
    }
    return context;
};
