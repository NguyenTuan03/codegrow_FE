import { clsx, type ClassValue } from 'clsx';
// import { env } from 'process';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge TailwindCSS classes.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
// lib/utils.ts
export function getTableLink({ token, tableNumber }: { token: string; tableNumber: number }) {
    // Sử dụng biến môi trường NEXT_PUBLIC_HOST_CODEGROW
    const baseUrl = process.env.NEXT_PUBLIC_HOST_CODEGROW || '';
    return `${baseUrl}/table/${tableNumber}?token=${token}`;
}
interface FormatMessageTimeOptions {
    date: string | number | Date;
}

export function formatMessageTime(date: FormatMessageTimeOptions['date']): string {
    return new Date(date).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
}
