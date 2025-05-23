// src/components/ChatRealtime.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { socket } from '@/lib/socketClient';

// Define the Message type for TypeScript
export type Message = {
    id: string;
    username: string;
    avatar?: string;
    body: string;
    likes: number;
    createdAt: string;
};

// Message component to display individual messages
const Message = ({ message, isCurrentUser }: { message: Message; isCurrentUser: boolean }) => {
    return (
        <div
            className={`flex items-start space-x-3 py-2 px-3 rounded-lg transition-all duration-200 ${
                isCurrentUser ? 'flex-row-reverse space-x-reverse ml-auto' : 'flex-row mr-auto'
            } max-w-[80%] md:max-w-[70%]`}
        >
            {message?.avatar && (
                <div className="w-10 h-10 overflow-hidden flex-shrink-0 rounded-full border border-gray-200 dark:border-gray-600 shadow-sm">
                    <Image
                        width={40}
                        height={40}
                        src={message.avatar}
                        alt={message.username}
                        className="object-cover"
                    />
                </div>
            )}
            <div
                className={`flex flex-col p-3 rounded-2xl shadow-md ${
                    isCurrentUser
                        ? 'bg-gradient-to-r from-[#5AD3AF] to-[#4ac2a0] text-white'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100'
                }`}
            >
                {!isCurrentUser && (
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
                        {message.username}
                    </span>
                )}
                <span className="text-sm break-words">{message.body}</span>
                <span className="text-xs text-gray-400 dark:text-gray-400 mt-1 self-end">
                    {new Date(message.createdAt).toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </span>
            </div>
        </div>
    );
};

const ChatRealtime = () => {
    const [room, setRoom] = useState('');
    const [username, setUsername] = useState('');
    const [joined, setJoined] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');

    // Connect to socket when joining a room, disconnect when leaving
    useEffect(() => {
        if (joined) {
            socket.connect();
            console.log('Socket.IO: Connecting to room', room);
        }

        return () => {
            if (joined) {
                socket.disconnect();
                console.log('Socket.IO: Disconnected from room', room);
            }
        };
    }, [joined, room]);

    // Socket.IO event listeners
    useEffect(() => {
        socket.on('message', (data: { sender: string; message: string }) => {
            const newMessage: Message = {
                id: Date.now().toString(),
                username: data.sender,
                avatar: data.sender === 'Mentor' ? '/mentor.png' : undefined,
                body: data.message,
                likes: 0,
                createdAt: new Date().toISOString(),
            };
            setMessages((prev) => [...prev, newMessage]);
        });

        socket.on('user_joined', (message: string) => {
            const newMessage: Message = {
                id: Date.now().toString(),
                username: 'system',
                body: message,
                likes: 0,
                createdAt: new Date().toISOString(),
            };
            setMessages((prev) => [...prev, newMessage]);
        });

        return () => {
            socket.off('user_joined');
            socket.off('message');
        };
    }, []);

    // Handle joining a room
    const handleJoinRoom = () => {
        if (room && username) {
            socket.emit('join-room', { room, username });
            setJoined(true);
        }
    };

    // Handle sending a message
    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            const data = { room, message: input, sender: username };
            const newMessage: Message = {
                id: Date.now().toString(),
                username,
                body: input,
                likes: 0,
                createdAt: new Date().toISOString(),
            };
            setMessages((prev) => [...prev, newMessage]);
            socket.emit('message', data);
            setInput('');
        }
    };

    return (
        <div className="flex flex-col h-96 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            {!joined ? (
                <div className="flex flex-col items-center justify-center h-full p-4">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                        Join the Chat
                    </h3>
                    <Input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-64 px-4 py-2 mb-4 border-2 rounded-lg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#5AD3AF] focus:border-transparent"
                    />
                    <Input
                        type="text"
                        placeholder="Enter room name"
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                        className="w-64 px-4 py-2 mb-4 border-2 rounded-lg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#5AD3AF] focus:border-transparent"
                    />
                    <Button
                        onClick={handleJoinRoom}
                        disabled={!room || !username}
                        className="bg-[#5AD3AF] hover:bg-[#4ac2a0] text-white px-6 py-2 rounded-lg transition-all duration-300"
                    >
                        Join Room
                    </Button>
                </div>
            ) : (
                <>
                    {/* Chat Header */}
                    <div className="bg-gradient-to-r from-[#5AD3AF] to-[#4ac2a0] p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-gray-700">
                                <Image
                                    src="/mentor.png"
                                    alt="Mentor"
                                    width={40}
                                    height={40}
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white">
                                    Chat với Mentor
                                </h3>
                                <p className="text-xs text-white/80">Đang hoạt động</p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button className="text-white hover:text-gray-200 transition-colors">
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Message List */}
                    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900 space-y-3">
                        {messages.length === 0 ? (
                            <p className="text-gray-500 dark:text-gray-400 text-center text-sm mt-4">
                                Bắt đầu trò chuyện với mentor của bạn!
                            </p>
                        ) : (
                            messages.map((message) => (
                                <Message
                                    key={message.id}
                                    message={message}
                                    isCurrentUser={message.username === username}
                                />
                            ))
                        )}
                    </div>

                    {/* New Message Form */}
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Nhập tin nhắn..."
                                className="flex-1 rounded-full border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#5AD3AF] focus:border-transparent transition-all"
                            />
                            <Button
                                type="submit"
                                className="rounded-full bg-[#5AD3AF] hover:bg-[#4ac2a0] text-white p-3 transition-all duration-300 shadow-md"
                            >
                                <svg
                                    className="w-5 h-5 transform rotate-45"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                    />
                                </svg>
                            </Button>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};

export default ChatRealtime;
