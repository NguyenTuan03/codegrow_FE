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
        <div>
            <AdminHeader />
            <SidebarProvider>
                <AdminSidebar />
                <SidebarTrigger />
                <div className="bg-[#EEF1EF]">{children}</div>
            </SidebarProvider>
            <Footer />
        </div>
    );
};

export default Layout;
