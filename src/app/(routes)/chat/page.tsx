'use client';

import { toast } from '@/components/ui/use-toast';
import ChatContainer from '@/lib/components/chat/ChatContainer';
import NoChatSelected from '@/lib/components/chat/NoChatSelected';
import Sidebar from '@/lib/components/chat/Sidebar';
import { Auth } from '@/lib/components/context/AuthContext';
import { getUsersMessage } from '@/lib/services/chat/getUsers';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import AdminHeader from '@/lib/components/layout/header/Adminheader';
import Customerheader from '@/lib/components/layout/header/Customerheader';
import MentorHeader from '@/lib/components/layout/header/Mentorheader';

const ChatPage = () => {
    const authContext = useContext(Auth);
    const selectedUser = authContext?.selectedUser;
    console.log(selectedUser);
    const router = useRouter();
    const [role, setRole] = useState<string | null>(null);
    const [users, setUsers] = useState([]);

    // Retrieve role from localStorage
    useEffect(() => {
        const userId = localStorage.getItem('user');
        if (!userId) {
            toast({
                title: 'Lỗi',
                description: 'Bạn cần đăng nhập để xem thông tin chi tiết',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black',
            });
            router.push('/login');
            return;
        }
        const user = JSON.parse(userId);
        const userRole = user.role;
        setRole(userRole);
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await getUsersMessage();

                if (res?.status === 200) {
                    setUsers(res.data.metadata);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="bg-gradient-to-br from-navy-900 to-navy-700 mt-18 dark:from-navy-900 dark:to-navy-700">
            {/* Conditionally render header based on role */}
            {role === 'admin' && <AdminHeader />}
            {role === 'customer' && <Customerheader />}
            {role === 'mentor' && <MentorHeader />}
            {role === 'qaqc' && <AdminHeader />}
            {(!role || !['admin', 'customer', 'mentor', 'qaqc'].includes(role)) && (
                <div className="bg-red-500 text-white p-4 text-center dark:bg-red-700">
                    Role not recognized. Please contact support.
                </div>
            )}

            <div className="flex items-center justify-center">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full h-[calc(100vh-72px)]">
                    <div className="flex h-full rounded-lg overflow-hidden w-full">
                        <Sidebar users={users} setUsers={setUsers} />
                        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
