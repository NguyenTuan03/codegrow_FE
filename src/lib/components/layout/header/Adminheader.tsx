'use client';

import { Search, User, Settings, BookOpen, Bell, LayoutDashboard, LogOut } from 'lucide-react';
import { useState, useEffect, useContext } from 'react';
import { Button } from '@/components/ui/button';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Auth } from '@/lib/components/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const AdminHeader = () => {
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const userAuth = useContext(Auth);
    // Kiểm tra trạng thái đăng nhập từ localStorage
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            // Nếu không có user, chuyển hướng đến trang đăng nhập
            router.push('/login');
        }
    }, [router]);

    const handleLogout = () => {
        if (userAuth) {
            userAuth.logoutUser(); // Gọi hàm logout từ AuthContext
            console.log('User logged out');
            router.push('/'); // Chuyển hướng đến trang đăng nhập
        }
    };

    const searchResults = [
        { id: 1, title: 'User Management', icon: <User className="h-4 w-4" />, category: 'Users' },
        {
            id: 2,
            title: 'System Settings',
            icon: <Settings className="h-4 w-4" />,
            category: 'Settings',
        },
    ];

    const reportItems = [
        { name: 'Courses', icon: <BookOpen className="h-4 w-4 mr-2" /> },
        { name: 'Mentors', icon: <User className="h-4 w-4 mr-2" /> },
    ];

    const menuItems = [
        { name: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4 mr-2" /> },
        { name: 'Settings', icon: <Settings className="h-4 w-4 mr-2" /> },
    ];

    return (
        <header className="sticky w-full top-0 z-50 bg-white shadow-sm border-b">
            <div className="container flex h-16 items-center justify-between px-4">
                {/* Left side - Logo and Dropdowns */}
                <div className="flex items-center gap-6">
                    {/* Report và Menu ngang hàng */}
                    <div className="flex items-center gap-4">
                        {/* Report Dropdown */}
                        <Accordion type="single" collapsible className="w-auto">
                            <AccordionItem value="report" className="border-b-0">
                                <AccordionTrigger className="[&[data-state=open]>svg]:rotate-180 px-0">
                                    <div className="flex items-center gap-1 text-base font-normal">
                                        Report{' '}
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                                    <div className="py-1">
                                        {reportItems.map((item) => (
                                            <a
                                                key={item.name}
                                                href={`/admin/report/${item.name.toLowerCase()}`}
                                                className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                                            >
                                                {item.icon}
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        {/* Menu Dropdown */}
                        <Accordion type="single" collapsible className="w-auto">
                            <AccordionItem value="menu" className="border-b-0">
                                <AccordionTrigger className="[&[data-state=open]>svg]:rotate-180 px-0">
                                    <div className="flex items-center gap-1 text-base font-normal">
                                        Menu{' '}
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                                    <div className="py-1">
                                        {menuItems.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={`/admin/report/${item.name.toLowerCase()}`}
                                                className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                                            >
                                                {item.icon}
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative flex-1 max-w-xl mx-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search in font"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Search Results */}
                    {isSearchFocused && (
                        <div className="absolute mt-1 w-full bg-white rounded-md shadow-lg z-50 border border-gray-200">
                            {searchResults
                                .filter(
                                    (item) =>
                                        item.title
                                            .toLowerCase()
                                            .includes(searchQuery.toLowerCase()) ||
                                        item.category
                                            .toLowerCase()
                                            .includes(searchQuery.toLowerCase()),
                                )
                                .map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        <div className="text-gray-500">{item.icon}</div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">
                                                {item.title}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="w-8 h-8 bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-md hover:shadow-lg transition-shadow">
                                <AvatarImage src="/path-to-user-image.jpg" alt="User Avatar" />
                                <AvatarFallback>A</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-48 bg-gray-100 border border-gray-300 rounded-md shadow-lg"
                            align="end"
                        >
                            <DropdownMenuItem>
                                <a href="/admin/profileadmin" className="w-full">
                                    Profile
                                </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleLogout}>
                                <div className="flex items-center gap-2">
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Bell className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-72 bg-white border border-gray-300 rounded-md shadow-lg"
                            align="end"
                        >
                            <div className="px-4 py-2 text-sm font-semibold text-gray-700">
                                Notifications
                            </div>
                            <DropdownMenuItem>
                                <div className="flex flex-col gap-1 text-sm">
                                    <span className="font-medium">New user registered</span>
                                    <span className="text-xs text-gray-500">2 minutes ago</span>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <div className="flex flex-col gap-1 text-sm">
                                    <span className="font-medium">System update completed</span>
                                    <span className="text-xs text-gray-500">10 minutes ago</span>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <div className="flex flex-col gap-1 text-sm">
                                    <span className="font-medium">You have 3 unread messages</span>
                                    <span className="text-xs text-gray-500">30 minutes ago</span>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="justify-center text-blue-600 hover:text-blue-800">
                                <a href="#">View all</a>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Settings className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-48 bg-gray-100 border border-gray-300 rounded-md shadow-lg"
                            align="end"
                        >
                            <DropdownMenuItem>
                                <a href="#" className="w-full">
                                    System Settings
                                </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <a href="#" className="w-full">
                                    Preferences
                                </a>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
};
