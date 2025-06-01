'use client';

import { useTheme } from 'next-themes';
import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bell, User2, LogOut, Settings, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CUSTOMER_HEADER } from '@/lib/enum/CustomerHeader';
import { ModeToggle } from '@/components/mode-toggle';
import { useRouter, usePathname } from 'next/navigation';
import { Auth } from '@/lib/components/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getUserDetail } from '@/lib/services/admin/getuserdetail';

import * as React from 'react';

interface ProfileData {
    email: string;
    _id: string;
    fullName: string;
    role?: string;
    avatar: string;
    wallet?: string;
    enrolledCourses?: {
        _id: string;
        title: string;
        description: string;
        price: string;
        author: [];
        category: { _id: string; name: string } | null;
    }[];
}

const Customerheader = () => {
    const { resolvedTheme } = useTheme();
    const userAuth = useContext(Auth);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = React.useState(true);
    const [profileData, setProfileData] = useState<ProfileData | null>(null);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const userData = localStorage.getItem('user');
                if (!userData) {
                    throw new Error('User data is missing');
                }

                const user = JSON.parse(userData);
                const id = user.id;

                const userDetail = await getUserDetail(id);
                console.log(`User detail for ID ${id}:`, userDetail);
                setProfileData(userDetail.metadata);
            } catch (error) {
                console.error('❌ Error fetching user details:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchProfile();
    }, []);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            try {
                const parsedUser = JSON.parse(user);
                if (parsedUser.id) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                setIsLoggedIn(false);
                console.log('Error parsing user data from localStorage:', error);
            }
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        if (userAuth) {
            userAuth.logoutUser();
            router.push('/');
        }
    };

    const [notifications] = useState([
        { id: 1, message: 'You have a new message!', link: '/messages' },
        { id: 2, message: 'Your subscription is about to expire.', link: '/subscription' },
        {
            id: 3,
            message: 'New course available: React Advanced.',
            link: '/courses/react-advanced',
        },
    ]);

    const isActiveLink = (href: string) => {
        const normalizedHref = href.endsWith('/') ? href.slice(0, -1) : href;
        const normalizedPathname = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

        return (
            normalizedPathname === normalizedHref ||
            (normalizedHref !== '' && normalizedPathname.startsWith(normalizedHref + '/'))
        );
    };

    return (
        <div
            className={`flex w-full h-[80px] px-6 items-center border-b shadow-sm fixed top-0 left-0 right-0 z-50 ${
                resolvedTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
            }`}
        >
            {/* Logo */}
            <Image src="/Logo.png" alt="Logo" width={60} height={60} />

            {/* Navigation Links */}
            <div className="flex flex-1 gap-6 ml-6">
                {CUSTOMER_HEADER.map((item, index) => (
                    <Link href={item.href} key={index}>
                        <div
                            className={`font-medium hover:underline cursor-pointer text-lg transition-colors ${
                                isActiveLink(item.href)
                                    ? 'text-[#657ED4] dark:text-[#5AD3AF] underline underline-offset-4 font-semibold'
                                    : 'text-gray-800 dark:text-gray-200'
                            }`}
                        >
                            {item.name}
                        </div>
                    </Link>
                ))}
            </div>

            <div className="flex items-center gap-4">
                {loading ? (
                    <div className="animate-pulse">
                        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    </div>
                ) : isLoggedIn && profileData ? (
                    <>
                        <div className="flex items-center gap-3">
                            <DropdownMenu modal={false}>
                                <DropdownMenuTrigger asChild>
                                    <div className="relative">
                                        <Bell className="w-5 h-5 cursor-pointer text-[#657ED4] dark:text-[#5AD3AF]" />
                                        {notifications.length > 0 && (
                                            <span className="absolute -top-1 -right-1 bg-[#657ED4] dark:bg-[#5AD3AF] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium">
                                                {notifications.length}
                                            </span>
                                        )}
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg p-2 w-64">
                                    {notifications.length > 0 ? (
                                        notifications.map((notification) => (
                                            <DropdownMenuItem
                                                key={notification.id}
                                                className="px-4 py-2 hover:bg-[#657ED4] dark:hover:bg-[#5AD3AF] hover:text-white dark:hover:text-black rounded-md transition-colors font-medium"
                                            >
                                                <a
                                                    href={notification.link}
                                                    className="text-gray-800 dark:text-gray-200"
                                                >
                                                    {notification.message}
                                                </a>
                                            </DropdownMenuItem>
                                        ))
                                    ) : (
                                        <div className="px-4 py-2 text-gray-500 dark:text-gray-400 text-sm font-medium">
                                            No new notifications.
                                        </div>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="w-8 h-8 border-2 border-[#657ED4] dark:border-[#5AD3AF] shadow-md hover:shadow-lg transition-shadow">
                                    <AvatarImage
                                        src={profileData.avatar || '/default-avatar.png'}
                                        alt={profileData.fullName}
                                    />
                                    <AvatarFallback className="text-[#657ED4] dark:text-[#5AD3AF] font-semibold">
                                        {profileData.fullName?.charAt(0) || 'U'}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="w-56 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg p-1"
                            >
                                <DropdownMenuItem
                                    onClick={() => router.push('/customer/profilecustomer')}
                                    className="flex cursor-pointer items-center gap-2 px-3 py-2 hover:bg-[#657ED4] dark:hover:bg-[#5AD3AF] hover:text-white dark:hover:text-black rounded-md transition-colors font-medium"
                                >
                                    <User2 className="w-4 h-4" />
                                    <span className="text-sm">Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => router.push('/customer/changepassword')}
                                    className="flex cursor-pointer items-center gap-2 px-3 py-2 hover:bg-[#657ED4] dark:hover:bg-[#5AD3AF] hover:text-white dark:hover:text-black rounded-md transition-colors font-medium"
                                >
                                    <Settings className="w-4 h-4" />
                                    <span className="text-sm">Change Password</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => router.push('/customer/support')}
                                    className="flex cursor-pointer items-center gap-2 px-3 py-2 hover:bg-[#657ED4] dark:hover:bg-[#5AD3AF] hover:text-white dark:hover:text-black rounded-md transition-colors font-medium"
                                >
                                    <HelpCircle className="w-4 h-4" />
                                    <span className="text-sm">Help Support</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={handleLogout}
                                    className="flex cursor-pointer items-center gap-2 px-3 py-2 hover:bg-[#657ED4] dark:hover:bg-[#5AD3AF] hover:text-white dark:hover:text-black rounded-md transition-colors font-medium"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span className="text-sm">Logout</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                ) : (
                    <>
                        <Button
                            className="bg-[#657ED4] dark:bg-[#5AD3AF] hover:bg-[#4a5da0] dark:hover:bg-[#4ac2a0] text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200 shadow-md"
                            variant="outline"
                        >
                            <Link href="/login">Log in</Link>
                        </Button>
                        <Button className="bg-[#657ED4] dark:bg-[#5AD3AF] hover:bg-[#4a5da0] dark:hover:bg-[#4ac2a0] text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200 shadow-md">
                            <Link href="/register">Sign up</Link>
                        </Button>
                    </>
                )}
                <ModeToggle />
            </div>
        </div>
    );
};

export default Customerheader;
