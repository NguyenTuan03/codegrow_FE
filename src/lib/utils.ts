import { toast } from '@/components/ui/use-toast';
import { EntityError, HttpError } from '@/lib/services/http';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import jwt from 'jsonwebtoken';
import { FieldValues, Path, UseFormSetError } from 'react-hook-form';

/**
 * Utility function to merge TailwindCSS classes.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Checks if the token is expired.
 */
export const isTokenExpired = (token: string): boolean => {
    const decoded = decodeJWT<{ exp?: number }>(token);
    if (!decoded || !decoded.exp) {
        return true; // Consider token expired if it cannot be decoded or has no expiration
    }
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decoded.exp < currentTime;
};

/**
 * Handles API errors and displays appropriate messages.
 */
export const handleErrorApi = <TFieldValues extends FieldValues>({
    error,
    setError,
    duration,
}: {
    error: unknown;
    setError?: UseFormSetError<TFieldValues>;
    duration?: number;
}) => {
    const token = localStorage.getItem('token');
    if (token && isTokenExpired(token)) {
        // Token expired, perform logout
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.href = '/login'; // Redirect to login page
        return;
    }

    if (error instanceof EntityError && setError) {
        error.payload.errors.forEach((item) => {
            setError(item.field as Path<TFieldValues>, {
                type: 'server',
                message: item.message,
            });
        });
    } else if (error instanceof HttpError) {
        toast({
            title: 'Error',
            description: error.payload.message ?? 'An unknown error occurred',
            variant: 'destructive',
            duration: duration ?? 5000,
            className: 'bg-red-500 text-white font-semibold p-4 rounded-lg shadow-lg',
        });
    } else if (error instanceof Error) {
        toast({
            title: 'Error',
            description: error.message ?? 'An unknown error occurred',
            variant: 'destructive',
            duration: duration ?? 5000,
            className: 'bg-red-500 text-white font-semibold p-4 rounded-lg shadow-lg',
        });
    } else {
        toast({
            title: 'Error',
            description: 'An unknown error occurred',
            variant: 'destructive',
            duration: duration ?? 5000,
            className: 'bg-red-500 text-white font-semibold p-4 rounded-lg shadow-lg',
        });
    }
};

/**
 * Decodes a JWT token and returns its payload.
 */
export const decodeJWT = <Payload = unknown>(token: string): Payload | null => {
    try {
        return jwt.decode(token) as Payload;
    } catch {
        return null; // Return null if decoding fails
    }
};

/**
 * Removes the leading `/` from a path.
 */
export const normalizePath = (path: string) => {
    return path.startsWith('/') ? path.slice(1) : path;
};
