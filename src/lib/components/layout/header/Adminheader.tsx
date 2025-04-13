'use client';

import { Search, User, Settings, BookOpen, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
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

export const AdminHeader = () => {
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

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
                    {/* <div className="text-xl font-bold mr-4">CODEGROW</div> */}

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

                {/* Right Side - User, Settings, Book */}
                <div className="flex items-center gap-4">
                    {/* User Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <User className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-48" align="end">
                            <DropdownMenuItem>
                                <a href="#" className="w-full">
                                    Profile
                                </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <a href="#" className="w-full">
                                    Logout
                                </a>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Settings Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Settings className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-48" align="end">
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

                    {/* Book Icon */}
                    <Button variant="ghost" size="icon">
                        <BookOpen className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </header>
    );
};
