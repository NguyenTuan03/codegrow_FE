'use client';

import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bell, History, User2, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CUSTOMER_HEADER } from '@/lib/enum/CustomerHeader';
import { ModeToggle } from '@/components/mode-toggle';
import { useRouter } from 'next/navigation';
import { Auth } from '@/lib/components/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Customerheader = () => {
    const userAuth = useContext(Auth);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            const parsedUser = JSON.parse(user);
            setIsLoggedIn(!!parsedUser._id);
            console.log('User:', parsedUser._id);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        if (userAuth) {
            userAuth.logoutUser(); // Gọi hàm logout từ AuthContext
            console.log('User logged out');
            router.push('/'); // Chuyển hướng đến trang đăng nhập
        }
    };
    const [notifications, setNotifications] = useState([
        { id: 1, message: 'You have a new message!', link: '/messages' },
        { id: 2, message: 'Your subscription is about to expire.', link: '/subscription' },
        {
            id: 3,
            message: 'New course available: React Advanced.',
            link: '/courses/react-advanced',
        },
    ]);

    return (
        <div className="flex w-full h-[80px] px-4 items-center border-b shadow-sm bg-white">
            {/* Logo */}
            <Image src="/Logo.png" alt="Logo" width={60} height={60} />

            {/* Navigation Links */}
            <div className="flex flex-1 gap-6 ml-6">
                {CUSTOMER_HEADER.map((item, index) => (
                    <Link href={item.href} key={index}>
                        <div className="font-medium hover:underline cursor-pointer text-sm">
                            {item.name}
                        </div>
                    </Link>
                ))}
            </div>

            <div className="flex items-center gap-3">
                {isLoggedIn ? (
                    <>
                        <Button
                            className="bg-pink-400 hover:bg-pink-500 text-white px-4 py-2 text-xs"
                            onClick={() => router.push('/customer/upgrade')}
                        >
                            Upgrade
                        </Button>
                        <div className="flex items-center gap-3">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="relative">
                                        <Bell className="w-5 h-5 cursor-pointer" />
                                        {notifications.length > 0 && (
                                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                                                {notifications.length}
                                            </span>
                                        )}
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg rounded-lg p-2 w-64">
                                    {notifications.length > 0 ? (
                                        notifications.map((notification) => (
                                            <DropdownMenuItem
                                                key={notification.id}
                                                className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-800 rounded-md"
                                                onClick={() => {
                                                    // Optional: Handle notification click
                                                }}
                                            >
                                                <a
                                                    href={notification.link}
                                                    className="block w-full"
                                                >
                                                    {notification.message}
                                                </a>
                                            </DropdownMenuItem>
                                        ))
                                    ) : (
                                        <div className="px-4 py-2 text-gray-500 text-sm">
                                            No new notifications.
                                        </div>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="w-8 h-8 bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-md hover:shadow-lg transition-shadow">
                                    <AvatarImage src="/path-to-user-image.jpg" alt="User Avatar" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="w-56 rounded-lg bg-white border border-gray-200 shadow-lg p-1"
                            >
                                <DropdownMenuItem
                                    onClick={() => router.push('/customer/history')}
                                    className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                                >
                                    <History className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm font-medium">History Transaction</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => router.push('/customer/profilecustomer')}
                                    className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                                >
                                    <User2 className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm font-medium">Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                                >
                                    <LogOut className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm font-medium">Logout</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                ) : (
                    <>
                        <Button
                            className="me-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                            variant="outline"
                        >
                            <Link href="/login">LogIn</Link>
                        </Button>
                        <Button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md">
                            <Link href="/register">Register</Link>
                        </Button>
                    </>
                )}
                <ModeToggle />
            </div>
        </div>
    );
};

export default Customerheader;
