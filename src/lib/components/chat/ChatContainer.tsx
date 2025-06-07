import React, { useContext, useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader';
import { Auth } from '../context/AuthContext';
import { formatMessageTime } from '@/lib/utils';
import MessageInput from './MessageInput';

const ChatContainer = () => {
    const {
        userAuth,
        messages,
        getMessages,
        subscribeToMessages,
        selectedUser,
        unsubscribeFromMessages,
    } = useContext(Auth);    
    
    const messageEndRef = useRef(null);
    console.log('messages ', messages);

    useEffect(() => {
        if (!selectedUser?._id) return;

        getMessages(selectedUser._id);
        const unsubscribe = subscribeToMessages();

        return () => {
            unsubscribe?.();
        };
    }, [selectedUser?._id, getMessages, subscribeToMessages]);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);
    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />

            <div className="flex-1 overflow-y-auto p-4 space-y-4" id="scrollContainer">
                {messages.map((message) => (
                    <div
                        key={message?._id}
                        className={`flex ${message.senderId === userAuth?.id ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className="flex items-end gap-2 max-w-[70%]">                            
                            {message.senderId !== userAuth?._id && (
                                <img
                                    className="w-10 h-10 rounded-full border"
                                    src={selectedUser.avatar || '/user_ava.png'}
                                    alt="receiver"
                                />
                            )}                            
                            <div>
                                <div className="text-xs text-gray-500 mb-1">
                                    {formatMessageTime(message.createAt)}
                                </div>
                                <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-xl">
                                    {message.image && (
                                        <img
                                            src={message.image}
                                            alt="Attachment"
                                            className="sm:max-w-[200px] rounded-md mb-2"
                                        />
                                    )}
                                    {message.text && <p>{message.text}</p>}
                                </div>
                            </div>                            
                            {message.senderId === userAuth?._id && (
                                <img
                                    className="w-10 h-10 rounded-full border"
                                    src={userAuth.avatar || '/user_ava.png'}
                                    alt="sender"
                                />
                            )}
                        </div>
                    </div>
                ))}
                <div ref={messageEndRef} />
            </div>

            <MessageInput />
        </div>
    );
};

export default ChatContainer;
