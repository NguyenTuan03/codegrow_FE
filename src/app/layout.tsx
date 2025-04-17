import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import AuthContext from '@/lib/components/context/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ThemeProvider } from '@/components/theme-provider';
import { Suspense } from 'react';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light" // Hoặc 'dark' nếu bạn muốn mặc định
                    enableSystem
                    disableTransitionOnChange
                >
                    <Toaster />
                    <AuthContext>
                        <SidebarProvider>
                            {/* ThemeProvider nên chỉ nên hydrate trên client */}
                            <Suspense>{children}</Suspense>
                        </SidebarProvider>
                    </AuthContext>
                </ThemeProvider>
            </body>
        </html>
    );
}
