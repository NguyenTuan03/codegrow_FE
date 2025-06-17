'use client';

import React from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';

const ChatHeader = () => {
    const { onlineUsers, selectedUser, setSelectedUser } = useAuth();

    if (!selectedUser) return null;

    return (
        <div className="p-2.5 border-b border-base-300">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="avatar">
                        <div className="size-10 rounded-full relative overflow-hidden">
                            <Image
                                src={selectedUser?.avatar || '/user_ava.png'}
                                alt="Avatar"
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                        </div>
                    </div>

                    {/* User Info */}
                    <div>
                        <h3 className="font-medium">{selectedUser.fullName}</h3>
                        <p className="text-sm text-base-content/70 text-black dark:text-white">
                            {onlineUsers.includes(selectedUser._id) ? 'Online' : 'Offline'}
                        </p>
                    </div>
                </div>

                {/* Close button */}
                <button onClick={() => setSelectedUser(null)}>
                    <X />
                </button>
            </div>
        </div>
    );
};

export default ChatHeader;
