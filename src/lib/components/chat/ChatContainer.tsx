'use client';

import React, { useContext, useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader';
import { Auth } from '../context/AuthContext';

import { formatMessageTime } from '@/lib/utils';
import MessageInput from './MessageInput';
import Image from 'next/image';

// Using Message from AuthContext
const ChatContainer = () => {
    const authContext = useContext(Auth);
    const messageEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!authContext?.selectedUser?._id) return;

        authContext.getMessages(authContext.selectedUser._id);

        const unsubscribe = authContext.subscribeToMessages?.() as (() => void) | undefined;
        return () => {
            if (typeof unsubscribe === 'function') {
                unsubscribe();
            }
        };
    }, [authContext?.selectedUser?._id]);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [authContext?.messages]);

    if (!authContext) {
        return <div>Loading chat...</div>;
    }

    const { userAuth, messages, selectedUser } = authContext;

    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />

            <div
                className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-gray-800"
                id="scrollContainer"
            >
                {messages.length > 0 ? (
                    messages.map((message) => (
                        <div
                            key={message.id} // Using id from Message interface
                            className={`flex ${
                                message.senderId === userAuth?._id ? 'justify-end' : 'justify-start'
                            }`}
                        >
                            <div className="flex items-end gap-2 max-w-[70%]">
                                {message.senderId !== userAuth?._id && selectedUser?.avatar && (
                                    <img
                                        className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600"
                                        src={selectedUser.avatar || '/user_ava.png'}
                                        alt="receiver"
                                    />
                                )}
                                <div>
                                    <div className="text-xs text-gray-500 dark:text-gray-300 mb-1">
                                        {formatMessageTime(message.timestamp)}{' '}
                                        {/* Using timestamp */}
                                    </div>
                                    <div
                                        className={`p-2 rounded-xl ${
                                            message.senderId === userAuth?._id
                                                ? 'bg-[#657ED4] dark:bg-[#5AD3AF] text-white'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                        }`}
                                    >
                                        {message.image && message.image instanceof File && (
                                            <Image
                                                src={URL.createObjectURL(message.image)} // Handling File object
                                                alt="Attachment"
                                                width={200}
                                                height={200}
                                                className="max-w-[200px] rounded-md mb-2 object-contain"
                                            />
                                        )}
                                        {message.content && <p>{message.content}</p>}{' '}
                                        {/* Using content */}
                                    </div>
                                </div>
                                {message.senderId === userAuth?._id && userAuth?.avatar && (
                                    <img
                                        className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600"
                                        src={userAuth.avatar || '/user_ava.png'}
                                        alt="sender"
                                    />
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-10">
                        No messages yet.
                    </div>
                )}
                <div ref={messageEndRef} />
            </div>

            <MessageInput />
        </div>
    );
};

export default ChatContainer;
