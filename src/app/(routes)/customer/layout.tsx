'use client';

import { ThemeProvider } from '@/components/theme-provider';
import ChatBox from '@/lib/components/ChatBox';
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
                <div className=" min-h-screen mt-[100px] ml-[100px] mr-[100px]    ">
                    <main>{children}</main>
                    <ChatBox />
                </div>
            </ThemeProvider>
        </div>
    );
};

export default Layout;
