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

    return (
        <div className="flex min-h-screen w-full">
            <div className="fixed h-screen z-50">{renderSidebar()}</div>

            <div className="flex-1 flex flex-col">
                <header className="w-full sticky top-0 z-40">{renderHeader()}</header>

                <main className="flex-1 w-full overflow-auto">{children}</main>

                <footer className="w-full">
                    <Footer />
                </footer>
            </div>
        </div>
    );
};

export default Layout;
