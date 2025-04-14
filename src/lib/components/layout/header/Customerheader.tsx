'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bell, Camera, User, History, User2, LogOut } from 'lucide-react';
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

const Customerheader = () => {
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
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        router.push('/login');
    };

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
                        <Bell className="w-5 h-5 cursor-pointer" />
                        <Camera className="w-5 h-5 cursor-pointer" />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="p-0 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <User className="w-8 h-8 p-1.5 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-md hover:shadow-lg transition-shadow" />
                                </Button>
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
                                    onClick={() => router.push('/customer/profile')}
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
                        <Button className="me-2" variant="outline">
                            <Link href="/login">LogIn</Link>
                        </Button>
                        <Button>
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
