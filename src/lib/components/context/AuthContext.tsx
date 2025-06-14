'use client';

import { toast } from '@/components/ui/use-toast';
import { getMessageById } from '@/lib/services/chat/getMessages';
import { getUsersMessage } from '@/lib/services/chat/getUsers';
import { sendUserMessage } from '@/lib/services/chat/sendMessage';
import { setupAxiosInterceptor } from '@/lib/util/axiosInterceptor';
import React, { createContext, ReactNode, useCallback, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type Props = {
    children: ReactNode;
};

interface User {
    id: string;
    role: string;
    fullname: string;
    email: string;
}

interface AuthContextType {
    userAuth: User | null;
    setUserAuth: (user: User | null) => void;
    loginUser: (user: User) => void;
    logoutUser: () => void;
    onlineUsers: string[];
    socket: Socket | null;
    selectedUser: null;
    setSelectedUser: (user: User | null) => void;
    subscribeToMessages: () => void;
    unsubscribeFromMessages: () => void;
    messages: any[];
    getMessages: (userId: string) => Promise<void>;
    getUsers: () => void;
    isMessagesLoading: boolean;
    sendMessage: (messageData: any) => Promise<void>;
}

export const Auth = createContext<AuthContextType | undefined>(undefined);

const AuthContext = ({ children }: Props) => {
    const [userAuth, setUserAuth] = useState<User | null>(null);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    setUserAuth(JSON.parse(storedUser));
                } catch (e) {
                    console.error('❌ Failed to parse user from localStorage', e);
                }
            }
        }
    }, []);

    useEffect(() => {
        if (userAuth) {
            console.log('🔄 userAuth đã có, thử kết nối lại socket...');
            connectSocket(userAuth.id);
        }
    }, [userAuth]);
    const connectSocket = (userId: string) => {
        if (socket || !userId) return;

        const newSocket = io('http://localhost:8888', {
            query: { userId },
        });

        newSocket.on('connect', () => {
            console.log('Socket connected:', newSocket.id);
        });

        newSocket.on('getOnlineUsers', (userIds: string[]) => {
            setOnlineUsers(userIds);
        });

        newSocket.on('disconnect', () => {
            console.log('Socket disconnected');
            setOnlineUsers([]);
        });

        setSocket(newSocket);
    };

    const disconnectSocket = () => {
        if (socket) {
            socket.disconnect();
            setSocket(null);
            setOnlineUsers([]);
        }
    };
    // useEffect(() => {
    //     setupAxiosInterceptor();
    //   }, []);
    const getUsers = async () => {
        try {
            const res = getUsersMessage();
            if (res.status === 200) {
                setMessages(res?.data.metadata);
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'Failed to get messages');
        } finally {
            setIsMessagesLoading(false);
        }
    };
    const getMessages = useCallback(async (userId: string) => {
        setIsMessagesLoading(true);
        try {
            const res = await getMessageById(userId);
            console.log(res);
            if (res.status === 200) {
                setMessages(res.data.metadata);
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'Failed to get messages');
        } finally {
            setIsMessagesLoading(false);
        }
    }, []);
    const sendMessage = async (messageData: any) => {
        if (!selectedUser) return;

        try {
            const res = await sendUserMessage(selectedUser._id, messageData);            
            if (res?.status === 201) {
                setMessages((prev) => [...prev, res.data.metadata]);
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'Failed to send message');
        }
    };
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    setUserAuth(JSON.parse(storedUser));
                } catch (e) {
                    console.error('Failed to parse user from localStorage', e);
                }
            }
        }
    }, []);

    const loginUser = (user: User) => {
        setUserAuth(user);
        if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(user));
        }
        connectSocket(user.id);
    };

    const logoutUser = () => {
        setUserAuth(null);
        if (typeof window !== 'undefined') {
            localStorage.removeItem('user');
        }
        disconnectSocket();
    };

    const subscribeToMessages = useCallback(() => {
        if (!selectedUser || !socket) return;

        const handler = (newMessage: any) => {            
            const isMessageFromSelectedUser =
                newMessage.senderId?.toString() === selectedUser._id?.toString(); // dùng toString() để so sánh chắc chắn

            if (!isMessageFromSelectedUser) return;
            setMessages((prev) => [...prev, newMessage]);
        };

        socket.on('newMessage', handler);

        return () => {
            socket.off('newMessage', handler);
        };
    }, [selectedUser, socket]);

    const unsubscribeFromMessages = useCallback(() => {
        if (socket) {
            socket.off('newMessage');
        }
    }, [socket]);

    const value: AuthContextType = {
        userAuth,
        setUserAuth,
        loginUser,
        logoutUser,
        onlineUsers,
        socket,
        selectedUser,
        setSelectedUser,
        subscribeToMessages,
        unsubscribeFromMessages,
        messages,
        getMessages,
        getUsers,
        sendMessage,
        isMessagesLoading,
    };

    return <Auth.Provider value={value}>{children}</Auth.Provider>;
};

export default AuthContext;
