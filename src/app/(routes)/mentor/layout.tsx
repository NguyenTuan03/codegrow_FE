import Footer from '@/lib/components/layout/footer/Page';
import Mentorheader from '@/lib/components/layout/header/Mentorheader';
import MentorSidebar from '@/lib/components/layout/sidebar/MentorSidebar';
import React, { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <MentorSidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <Mentorheader />

                {/* Page Content */}
                <main className="flex-1 p-6 bg-gray-50 overflow-auto">{children}</main>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
