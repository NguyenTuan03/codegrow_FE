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

const Customerheader = () => {
    const { resolvedTheme } = useTheme();
    const userAuth = useContext(Auth);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

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
            className={`flex w-full h-[80px] px-4  items-center border-b shadow-sm fixed top-0 left-0 right-0 z-50 ${
                resolvedTheme === 'dark' ? 'bg-gray-800 text-white' : 'bg-[#EEF1EF] text-black'
            }`} // Switch to fixed positioning
        >
            {/* Logo */}
            <Image src="/Logo.png" alt="Logo" width={60} height={60} />

            {/* Navigation Links */}
            <div className="flex flex-1 gap-6 ml-6">
                {CUSTOMER_HEADER.map((item, index) => (
                    <Link href={item.href} key={index}>
                        <div
                            className={`font-medium hover:underline cursor-pointer text-xl transition-colors ${
                                isActiveLink(item.href)
                                    ? 'text-[#657ED4] underline underline-offset-4 font-semibold'
                                    : 'text-gray-800 dark:text-gray-200'
                            }`}
                        >
                            {item.name}
                        </div>
                    </Link>
                ))}
            </div>

            <div className="flex items-center gap-3">
                {isLoggedIn ? (
                    <>
                        {/* <Button
                            className="bg-[#5AD3AF] hover:bg-[#6bbea6] text-white px-4 py-2 text-xs rounded-lg"
                            onClick={() => router.push('/customer/upgrade')}
                        >
                            Upgrade
                        </Button> */}
                        <div className="flex items-center gap-3">
                            <DropdownMenu modal={false}>
                                <DropdownMenuTrigger asChild>
                                    <div className="relative">
                                        <Bell className="w-5 h-5 cursor-pointer text-[#657ED4] dark:text-[#5AD3AF]" />
                                        {notifications.length > 0 && (
                                            <span className="absolute -top-1 -right-1 bg-[#657ED4] text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                                                {notifications.length}
                                            </span>
                                        )}
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-[#EEF1EF] dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg p-2 w-64">
                                    {notifications.length > 0 ? (
                                        notifications.map((notification) => (
                                            <DropdownMenuItem
                                                key={notification.id}
                                                className="px-4 py-2 hover:bg-[#657ED4] hover:text-white dark:hover:bg-gray-700 dark:hover:text-white rounded-md transition-colors"
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
                                        <div className="px-4 py-2 text-gray-500 dark:text-gray-400 text-sm">
                                            No new notifications.
                                        </div>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="w-8 h-8 bg-gradient-to-br from-[#657ED4] to-[#5AD3AF] text-white shadow-md hover:shadow-lg transition-shadow">
                                    <AvatarImage
                                        src="https://github.com/shadcn.png"
                                        alt="@shadcn"
                                    />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="w-56 rounded-lg bg-[#EEF1EF] dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg p-1"
                            >
                                {/* <DropdownMenuItem
                                    onClick={() => router.push('/customer/history')}
                                    className="flex items-center gap-2 px-3 py-2 hover:bg-[#5AD3AF] hover:text-black dark:hover:bg-gray-700 dark:hover:text-white rounded-md transition-colors"
                                >
                                    <History className="w-4 h-4 text-[#657ED4] dark:text-[#5AD3AF]" />
                                    <span className="text-sm font-medium">History Transaction</span>
                                </DropdownMenuItem> */}
                                <DropdownMenuItem
                                    onClick={() => router.push('/customer/profilecustomer')}
                                    className="flex items-center gap-2 px-3 py-2 hover:bg-[#657ED4] hover:text-black dark:hover:bg-gray-700 dark:hover:text-black rounded-md transition-colors"
                                >
                                    <User2 className="w-4 h-4 text-black hover:text-black dark:text-black" />
                                    <span className="text-sm font-medium">Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => router.push('/customer/changepassword')}
                                    className="flex items-center gap-2 px-3 py-2 hover:bg-[#657ED4] hover:text-black dark:hover:bg-gray-700 dark:hover:text-black rounded-md transition-colors"
                                >
                                    <Settings className="w-4 h-4 text-black hover:text-white dark:text-black" />
                                    <span className="text-sm font-medium">Change Password</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => router.push('/customer/support')}
                                    className="flex items-center gap-2 px-3 py-2 hover:bg-[#657ED4] hover:text-black dark:hover:bg-gray-700 dark:hover:text-white rounded-md transition-colors"
                                >
                                    <HelpCircle className="w-4 h-4 text-black dark:text-[#657ED4]" />
                                    <span className="text-sm font-medium">Help Support</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-3 py-2 hover:bg-[#657ED4] hover:text-black dark:hover:bg-gray-700 dark:hover:text-white rounded-md transition-colors"
                                >
                                    <LogOut className="w-4 h-4 text-black dark:text-[#657ED4]" />
                                    <span className="text-sm font-medium">Logout</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                ) : (
                    <>
                        <Button
                            className=" bg-[#657ED4] dark:bg-[#5AD3AF] text-xl hover:bg-[#5A6BBE] dark:hover:bg-[#4ac2a0] text-white font-semibold px-6 py-3  md:text-base"
                            variant="outline"
                        >
                            <Link href="/login">Log in</Link>
                        </Button>
                        <Button className=" bg-[#657ED4] dark:bg-[#5AD3AF] text-xl hover:bg-[#5A6BBE] dark:hover:bg-[#4ac2a0] text-white font-semibold px-6 py-3  md:text-base">
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
