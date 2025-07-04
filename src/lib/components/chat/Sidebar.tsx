'use client';

import { Users } from 'lucide-react';

import React, { useContext, useState } from 'react';
import { Auth } from '../context/AuthContext';

type Props = {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>; // Updated prop type to match useState
};
interface User {
    _id: string;
    role: string;
    avatar: string;
    fullName: string;
    email: string;
}

const Sidebar = ({ users = [] }: Props) => {
    const context = useContext(Auth);
    const [showOnlineOnly, setShowOnlineOnly] = useState(false);
    if (!context) {
        // You can handle the error as needed, for now just return null or a fallback UI
        return null;
    }
    const { onlineUsers, selectedUser, setSelectedUser } = context;
    const filteredUsers = showOnlineOnly
        ? users.filter((user) => onlineUsers.includes(user._id))
        : users;
    return (
        <>
            <aside className="h-full w-20 lg:w-72 border-r border-amber-200 flex flex-col transition-all duration-200">
                <div className="border-b border-amber-200 w-full p-5">
                    <div className="flex items-center gap-2">
                        <Users className="size-6" />
                        <span className="font-medium hidden lg:block">Contacts</span>
                    </div>
                    <div className="mt-3 hidden lg:flex items-center gap-2">
                        <label className="cursor-pointer flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={showOnlineOnly}
                                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                                className="checkbox bg-white checkbox-sm"
                            />
                            <span className="text-sm">Show online only</span>
                        </label>
                        <span className="text-xs text-zinc-500">
                            ({onlineUsers.length - 1} online)
                        </span>
                    </div>
                </div>
                <div className="overflow-y-auto w-full py-3">
                    {filteredUsers?.map((user) => (
                        <button
                            key={user._id}
                            onClick={() => setSelectedUser(user)}
                            className={`
                                w-full p-3 flex items-center gap-3
                                hover:bg-gray-300 transition-colors
                                ${selectedUser?._id === user._id ? 'bg-blue-500 ring-1 ring-base-300' : ''}
                            `}
                        >
                            <div className="relative mx-auto lg:mx-0">
                                <img
                                    width={70}
                                    height={70}
                                    src={user.avatar || '/user_ava.png'} // Default avatar if no avatar is provided
                                    alt={user.fullName}
                                    className="size-12 object-cover rounded-full"
                                />
                                {onlineUsers.includes(user._id) && (
                                    <span
                                        className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                                    />
                                )}
                            </div>
                            <div className="hidden lg:block text-left min-w-0">
                                <div className="font-semibold truncate">{user.fullName}</div>
                                <div className="text-sm text-zinc-600">
                                    {onlineUsers.includes(user._id) ? 'Online' : 'Offline'}
                                </div>
                            </div>
                        </button>
                    ))}
                    {filteredUsers.length === 0 && (
                        <div className="text-center text-zinc-500 py-4">No online users</div>
                    )}
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
