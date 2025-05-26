'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Menu, Plus, Settings, User } from 'lucide-react';
import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Auth } from '@/lib/components/context/AuthContext';
import { ModeToggle } from '@/components/mode-toggle';

const QAQCheader = () => {
    const userAuth = useContext(Auth);
    const router = useRouter();

    const handleLogout = () => {
        if (userAuth) {
            userAuth.logoutUser();
            router.push('/');
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 md:px-6 bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
            {/* Logo/Title Placeholder */}
            <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">QAQC</h1>
            </div>

            {/* Right Section: Icons, Avatar, and Mode Toggle */}
            <div className="flex items-center gap-4 md:gap-6">
                {/* Action Icons */}
                <button
                    aria-label="Add new item"
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                    <Plus className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
                <button
                    aria-label="Open menu"
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                    <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>

                {/* User Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button
                            aria-label="User menu"
                            className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
                        >
                            <Avatar className="w-10 h-10 cursor-pointer border-2 border-gray-200 dark:border-gray-700">
                                <AvatarImage
                                    src="https://github.com/shadcn.png"
                                    alt="User avatar"
                                />
                                <AvatarFallback className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200">
                                    CN
                                </AvatarFallback>
                            </Avatar>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48 mt-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-[60]">
                        <DropdownMenuItem
                            onClick={() => router.push('/qaqc/profileqaqc')}
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                        >
                            <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => router.push('/qaqc/changepassword')}
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                        >
                            <Settings className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                            <span>Change Password</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                        >
                            <LogOut className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                            <span>Logout</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Mode Toggle */}
                <ModeToggle />
            </div>
        </header>
    );
};

export default QAQCheader;
