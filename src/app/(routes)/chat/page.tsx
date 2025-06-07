'use client';
import ChatContainer from '@/lib/components/chat/ChatContainer';
import NoChatSelected from '@/lib/components/chat/NoChatSelected';
import Sidebar from '@/lib/components/chat/Sidebar';
import { Auth } from '@/lib/components/context/AuthContext';
import { getUsersMessage } from '@/lib/services/chat/getUsers';
import React, { useContext, useEffect, useState } from 'react';
interface IUserRef {
    current?: any;
}
const ChatPage = () => {
    const { selectedUser } = useContext(Auth);
    console.log(selectedUser);
    
    const [users, setUsers] = useState([]);
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
        <>
            <div className="bg-blend-color">
                <div className="flex items-center justify-center">
                    <div className="bg-amber-100 rounded-lg shadow-2xl w-full h-[calc(100vh-64px)]">
                        <div className="flex h-full rounded-lg overflow-hidden w-full">
                            <Sidebar users={users} setUsers={setUsers} />
                            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatPage;
