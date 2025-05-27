/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React, { ReactNode, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Auth } from '@/lib/components/context/AuthContext';
import MentorSidebar from '@/lib/components/layout/sidebar/MentorSidebar';
import QAQCSidebar from '@/lib/components/layout/sidebar/QAQCSidebar';
import Mentorheader from '@/lib/components/layout/header/Mentorheader';
import QAQCheader from '@/lib/components/layout/header/QAQCheader';
import { AdminSidebar } from '@/lib/components/layout/sidebar/AdminSidebar';
import { AdminHeader } from '@/lib/components/layout/header/Adminheader';
import Footer from '@/lib/components/layout/footer/Page';

type Props = {
    children: ReactNode;
};

const Layout = ({ children }: Props) => {
    const router = useRouter();
    const authContext = useContext(Auth);

    if (!authContext) {
        console.log('not authentication');
        router.push('/login');
        return null;
    }

    const { userAuth } = authContext;
    const role = userAuth?.role;

    const renderSidebar = () => {
        switch (role) {
            case 'admin':
                return <AdminSidebar />;
            case 'mentor':
                return <MentorSidebar />;
            case 'qaqc':
                return <QAQCSidebar />;
            default:
                return null;
        }
    };

    const renderHeader = () => {
        switch (role) {
            case 'admin':
                return <AdminHeader />;
            case 'mentor':
                return <Mentorheader />;
            case 'qaqc':
                return <QAQCheader />;
            default:
                return null;
        }
    };

    // Determine if the role requires a sidebar and header
    const hasSidebarAndHeader = ['admin', 'mentor', 'qaqc'].includes(role ?? '');

    // Correct header height based on role (h-16 = 64px for Admin and Mentor, h-[60px] = 60px for QAQC)
    const headerHeight = role === 'qaqc' ? 60 : 64; // Match actual header heights

    return (
        <div className="flex min-h-screen w-full">
            {/* Render Sidebar only for roles that need it */}
            {hasSidebarAndHeader && (
                <div className="fixed top-0 left-0 h-full w-64 z-50">{renderSidebar()}</div>
            )}
            {/* Main Content Area */}
            <div
                className={`flex-1 flex flex-col w-full ${hasSidebarAndHeader ? 'ml-64' : ''}`} // Conditionally apply ml-64 for roles with a sidebar
            >
                {/* Render Header only for roles that need it */}
                {hasSidebarAndHeader && <header className="w-full">{renderHeader()}</header>}
                <main
                    className={`flex-1 w-full overflow-auto flex justify-center ${
                        hasSidebarAndHeader ? 'px-4' : ''
                    }`} // Center content and add padding for roles with a sidebar
                    style={{
                        paddingTop: hasSidebarAndHeader ? `${headerHeight}px` : 0, // Apply padding only for roles with a header
                    }}
                >
                    <div className="w-full max-w-8xl">{children}</div>{' '}
                    {/* Constrain content width for centering */}
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
