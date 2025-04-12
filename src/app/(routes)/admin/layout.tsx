import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import Footer from '@/lib/components/layout/footer/Page';
import { AdminHeader } from '@/lib/components/layout/header/Adminheader';
import { AdminSidebar } from '@/lib/components/layout/sidebar/AdminSidebar';

import React, { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <div className="flex flex-col h-screen">
            {/* Header Section */}
            <AdminHeader />

            {/* Main Content Area */}
            <SidebarProvider>
                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar */}
                    <div className="hidden lg:block w-64">
                        <AdminSidebar />
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 p-4 overflow-auto bg-gray-50">{children}</div>

                    {/* Sidebar Trigger for mobile */}
                    <div className="lg:hidden">
                        <SidebarTrigger />
                    </div>
                </div>
            </SidebarProvider>

            {/* Footer Section */}
            <Footer />
        </div>
    );
};

export default Layout;
