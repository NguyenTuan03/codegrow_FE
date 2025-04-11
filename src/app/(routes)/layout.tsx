/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { ReactNode, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Auth } from '@/lib/components/context/AuthContext';
import MentorSidebar from '@/lib/components/layout/sidebar/MentorSidebar';
import QAQCSidebar from '@/lib/components/layout/sidebar/QAQCSidebar';
import Adminheader from '@/lib/components/layout/header/Adminheader';
import Mentorheader from '@/lib/components/layout/header/Mentorheader';
import QAQCheader from '@/lib/components/layout/header/QAQCheader';
import AdminSidebar from '@/lib/components/layout/sidebar/AdminSidebar';

type Props = {
    children: ReactNode;
};

const layout = ({ children }: Props) => {
    const router = useRouter()
    const authContext = useContext(Auth);

    if (!authContext) {
        console.log("not authentication");
        router.push('/login')
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
                return <Adminheader />;
            case 'mentor':
                return <Mentorheader />;
            case 'qaqc':
                return <QAQCheader />;
            default:
                return null;
        }
    };
    return (
        <div className="flex">
            {renderSidebar()}
            <div className="flex-1">
                {renderHeader()}
                <main>{children}</main>
            </div>
        </div>
    );
};

export default layout;
