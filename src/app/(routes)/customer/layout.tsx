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
            className="mx-auto w-full"
            style={{
                backgroundColor: 'var(--sidebar-background)',
                color: 'var(--sidebar-foreground)',
            }}
        >
            <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
            >
                {/* Ensure the header is not affected by parent overflow */}
                <Customerheader />
                {/* Add padding-top to account for the fixed header height */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen mt-[100px] ml-[200px] mr-[200px]   ">
                    <main>{children}</main>
                </div>
            </ThemeProvider>
        </div>
    );
};

export default Layout;
