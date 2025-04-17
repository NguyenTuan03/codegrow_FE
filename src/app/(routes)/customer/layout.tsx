'use client';

import { ThemeProvider } from '@/components/theme-provider';
import Customerheader from '@/lib/components/layout/header/Customerheader';
import React, { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <div
            className=" mx-auto  w-full"
            style={{
                backgroundColor: 'var(--sidebar-background)',
                color: 'var(--sidebar-foreground)',
            }}
        >
            <ThemeProvider
                attribute="class"
                defaultTheme="light" // Default to 'light' theme
                enableSystem
                disableTransitionOnChange
            >
                <Customerheader />
                <div className="bg-gradient-to-r from-blue-50 to-purple-50">
                    <main>{children}</main>
                </div>
            </ThemeProvider>
        </div>
    );
};

export default Layout;
