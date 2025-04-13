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

const layout = ({ children }: Props) => {
    const router = useRouter();
    const authContext = useContext(Auth);

    if (!authContext) {
        console.log('not authentication');
        router.push('/login');
        return null;
    }

    const { userAuth } = authContext;
    const role = userAuth?.role;
    console.log('role =',role);    
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
        <div className="flex w-full">
            {renderSidebar()}
            <div className="flex-1">
                {renderHeader()}
                <main>{children}</main>
                <Footer />
            </div>
        </div>
    );
};

export default layout;
