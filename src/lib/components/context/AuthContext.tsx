'use client';

import { getMessageById } from '@/lib/services/chat/getMessages';
import { getUsersMessage } from '@/lib/services/chat/getUsers';
import { sendUserMessage } from '@/lib/services/chat/sendMessage';
import React, { createContext, ReactNode, useCallback, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type Props = {
    children: ReactNode;
};

interface User {
    _id: string;
    role: string;
    avatar: string;
    fullName: string;
    email: string;
}

interface Message {
    id: string;
    content: string;
    senderId: string;
    receiverId: string;
    timestamp: string;
    createAt: string;
    image: File | null;
    text: string;
}

interface SendMessage {
    text: string;
    image?: File | null;
}

interface AuthContextType {
    userAuth: User | null;
    setUserAuth: (user: User | null) => void;
    loginUser: (user: User) => void;
    logoutUser: () => void;
    onlineUsers: string[];
    socket: Socket | null;
    selectedUser: User | null;
    setSelectedUser: (user: User | null) => void;
    subscribeToMessages: () => void;
    unsubscribeFromMessages: () => void;
    messages: Message[];
    getMessages: (userId: string) => Promise<void>;
    getUsers: () => void;
    isMessagesLoading: boolean;
    sendMessage: (messageData: SendMessage) => Promise<void>;
}

export const Auth = createContext<AuthContextType | undefined>(undefined);

const AuthContext = ({ children }: Props) => {
    const [userAuth, setUserAuth] = useState<User | null>(null);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);

    // Load user from localStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    console.log('check userAuth', parsedUser);

                    if (JSON.stringify(parsedUser) !== JSON.stringify(userAuth)) {
                        setUserAuth(parsedUser);
                    }
                } catch (e) {
                    console.error('❌ Failed to parse user from localStorage', e);
                }
            }
        }
    }, [userAuth]);

    // Connect socket when userAuth changes
    useEffect(() => {
        if (userAuth) {
            console.log('🔄 Connecting socket for user:', userAuth._id);
            connectSocket(userAuth._id);
        } else if (!userAuth && socket) {
            disconnectSocket();
        }
        return () => {
            disconnectSocket();
        };
    }, [userAuth]);

    const connectSocket = (userId: string) => {
        if (socket || !userId) return;

        const newSocket = io(process.env.NEXT_PUBLIC_API_URL, { query: { userId } });
        newSocket.on('connect', () => console.log('Socket connected:', newSocket.id));
        newSocket.on('getOnlineUsers', (userIds: string[]) => {
            console.log('Online users updated:', userIds);
            setOnlineUsers(userIds);
        });
        newSocket.on('disconnect', () => {
            console.log('Socket disconnected');
            setOnlineUsers([]);
        });
        newSocket.on('error', (error) => console.error('Socket error:', error));
        setSocket(newSocket);
    };

    const disconnectSocket = () => {
        if (socket) {
            socket.disconnect();
            setSocket(null);
            setOnlineUsers([]);
        }
    };

    const getUsers = async () => {
        setIsMessagesLoading(true);
        try {
            const res = await getUsersMessage();
            if (res && res.status === 200) {
                setMessages(res.data.metadata || []);
            }
        } catch (error) {
            console.error('getUsers error:', error);
        } finally {
            setIsMessagesLoading(false);
        }
    };

    const getMessages = useCallback(async (userId: string) => {
        setIsMessagesLoading(true);
        try {
            const res = await getMessageById(userId);
            if (res && res.status === 200) {
                setMessages(res.data.metadata || []);
            }
        } catch (error) {
            console.error('getMessages error:', error);
        } finally {
            setIsMessagesLoading(false);
        }
    }, []);

    const sendMessage = async (messageData: SendMessage) => {
        if (!selectedUser) return;

        try {
            const { text, image } = messageData;
            const res = await sendUserMessage(selectedUser._id, {
                text,
                image: image ?? undefined,
            });
            if (res?.status === 201) {
                setMessages((prev) => [...prev, res.data.metadata || {}]);
            }
        } catch (error) {
            console.error('sendMessage error:', error);
        }
    };

    const loginUser = (user: User) => {
        if (userAuth && userAuth._id === user._id) {
            console.log('User already logged in, skipping update');
            return;
        }
        setUserAuth(user);
        if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(user));
        }
        connectSocket(user._id);
    };

    const logoutUser = () => {
        setUserAuth(null);
        if (typeof window !== 'undefined') {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
        disconnectSocket();
    };

    const subscribeToMessages = useCallback(() => {
        if (!selectedUser || !socket) return;

        const handler = (newMessage: Message) => {
            const isMessageFromSelectedUser =
                newMessage.senderId?.toString() === selectedUser._id?.toString();
            if (!isMessageFromSelectedUser) return;
            setMessages((prev) => [...prev, newMessage]);
        };

        socket.on('newMessage', handler);
        return () => socket.off('newMessage', handler);
    }, [selectedUser, socket]);

    const unsubscribeFromMessages = useCallback(() => {
        if (!socket) return;
        socket.off('newMessage');
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
