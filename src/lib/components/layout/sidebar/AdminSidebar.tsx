'use client';
import { useState, useEffect } from 'react';
import {
    LayoutDashboard,
    Users,
    User,
    Settings,
    Folder,
    Key,
    Plus,
    Eye,
    Calendar,
    Contact,
    Book,
} from 'lucide-react';
import Link from 'next/link';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarSeparator,
} from '@/components/ui/sidebar';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

export const AdminSidebar = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // Đảm bảo chỉ render trên client
    }, []);

    if (!isClient) {
        return null; // Tránh render trên server
    }
    return (
        <Sidebar className="h-screen pt-5 border-r bg-muted/40 dark:bg-gray-900 dark:border-gray-700">
            <SidebarContent>
                {/* Header */}
                <div className="flex items-center px-12 text-black dark:text-white">
                    <h1 className="text-xl font-bold">CODEGROW</h1>
                </div>
                <div className="flex h-[60px] items-center border-b px-4 border-gray-200 dark:border-gray-700">
                    <Link href="/admin" className="w-full">
                        <h2 className="text-base font-semibold text-foreground dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-colors hover:underline cursor-pointer">
                            Dashboard
                        </h2>
                    </Link>
                </div>
                <SidebarGroup>
                    <Accordion type="multiple" className="w-full">
                        {/* Pages Section */}
                        <AccordionItem value="pages" className="border-b-0">
                            <AccordionTrigger className="px-4 py-2 text-muted-foreground dark:text-gray-400 text-xs font-medium uppercase tracking-wide hover:no-underline [&[data-state=open]>svg]:rotate-180">
                                <div className="flex w-full items-center justify-between">
                                    Pages
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pb-0">
                                <SidebarGroupContent>
                                    <SidebarMenu className="pl-2 space-y-1">
                                        {/* Users */}
                                        <AccordionItem value="users" className="border-b-0">
                                            <AccordionTrigger className="py-1 pl-2 pr-4 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                                                <div className="flex w-full items-center justify-between">
                                                    <div className="flex items-center gap-2 text-base dark:text-gray-300">
                                                        <Users className="h-4 w-4" />
                                                        Users
                                                    </div>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="pb-0 pl-6">
                                                <SidebarMenu>
                                                    <SidebarMenuItem>
                                                        <SidebarMenuButton asChild>
                                                            <Link
                                                                href="/admin/overviewuser"
                                                                className="flex items-center gap-2 px-2 py-1 text-base hover:underline cursor-pointer dark:text-gray-300 dark:hover:text-blue-400"
                                                            >
                                                                <Eye className="h-5 w-5" />
                                                                Overview
                                                            </Link>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>

                                                    <SidebarMenuItem>
                                                        <SidebarMenuButton asChild>
                                                            <Link
                                                                href="/admin/adduser"
                                                                className="flex items-center gap-2 px-2 py-1 text-base hover:underline cursor-pointer dark:text-gray-300 dark:hover:text-blue-400"
                                                            >
                                                                <Plus className="h-5 w-5" />
                                                                Add User
                                                            </Link>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                </SidebarMenu>
                                            </AccordionContent>
                                        </AccordionItem>

                                        {/* User Profile */}
                                        <AccordionItem value="user-profile" className="border-b-0">
                                            <AccordionTrigger className="py-1 pl-2 pr-4 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                                                <div className="flex w-full items-center justify-between">
                                                    <div className="flex items-center gap-2 text-base dark:text-gray-300">
                                                        <User className="h-4 w-4" />
                                                        User Profile
                                                    </div>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="pb-0 pl-6">
                                                <SidebarMenu>
                                                    <SidebarMenuItem>
                                                        <SidebarMenuButton asChild>
                                                            <Link
                                                                href="/admin/listcustomer"
                                                                className="flex items-center gap-2 px-2 py-1 text-base hover:underline cursor-pointer dark:text-gray-300 dark:hover:text-blue-400"
                                                            >
                                                                <Eye className="h-5 w-5" />
                                                                List Customer
                                                            </Link>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                    <SidebarMenuItem>
                                                        <SidebarMenuButton asChild>
                                                            <Link
                                                                href="/admin/users"
                                                                className="flex items-center gap-2 px-2 py-1 text-base hover:underline cursor-pointer dark:text-gray-300 dark:hover:text-blue-400"
                                                            >
                                                                <Users className="h-5 w-5" />
                                                                Users
                                                            </Link>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                    <SidebarMenuItem>
                                                        <SidebarMenuButton asChild>
                                                            <Link
                                                                href="/admin/contact"
                                                                className="flex items-center gap-2 px-2 py-1 text-base hover:underline cursor-pointer dark:text-gray-300 dark:hover:text-blue-400"
                                                            >
                                                                <Contact className="h-5 w-5" />
                                                                Contact
                                                            </Link>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                </SidebarMenu>
                                            </AccordionContent>
                                        </AccordionItem>
                                        {/* Classes Section */}
                                        <AccordionItem value="classes" className="border-b-0">
                                            <AccordionTrigger className="py-1 pl-2 pr-4 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                                                <div className="flex w-full items-center justify-between">
                                                    <div className="flex items-center gap-2 text-base dark:text-gray-300 cursor-pointer hover:text-blue-500 dark:hover:text-blue-400">
                                                        <Book className="h-4 w-4" />
                                                        Classes
                                                    </div>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="pb-0 pl-6">
                                                <SidebarMenu>
                                                    <SidebarMenuItem>
                                                        <SidebarMenuButton asChild>
                                                            <Link
                                                                href="/admin/classes/create"
                                                                className="flex items-center gap-2 px-2 py-1 text-base hover:underline cursor-pointer dark:text-gray-300 dark:hover:text-blue-400"
                                                            >
                                                                <Users className="h-5 w-5" />
                                                                Add Classes
                                                            </Link>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                    <SidebarMenuItem>
                                                        <SidebarMenuButton asChild>
                                                            <Link
                                                                href="/admin/classes"
                                                                className="flex items-center gap-2 px-2 py-1 text-base hover:underline cursor-pointer dark:text-gray-300 dark:hover:text-blue-400"
                                                            >
                                                                <Book className="h-5 w-5" />
                                                                List Classes
                                                            </Link>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                </SidebarMenu>
                                            </AccordionContent>
                                        </AccordionItem>
                                        {/* Courses Section */}
                                        <AccordionItem value="Courses" className="border-b-0">
                                            <AccordionTrigger className="py-1 pl-2 pr-4 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                                                <div className="flex w-full items-center justify-between">
                                                    <div className="flex items-center gap-2 text-base dark:text-gray-300 cursor-pointer hover:text-blue-500 dark:hover:text-blue-400">
                                                        <Book className="h-4 w-4" />
                                                        Courses
                                                    </div>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="pb-0 pl-6">
                                                <SidebarMenu>
                                                    <SidebarMenuItem>
                                                        <SidebarMenuButton asChild>
                                                            <Link
                                                                href="/admin/courses/create"
                                                                className="flex items-center gap-2 px-2 py-1 text-base hover:underline cursor-pointer dark:text-gray-300 dark:hover:text-blue-400"
                                                            >
                                                                <Users className="h-5 w-5" />
                                                                Add Courses
                                                            </Link>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                    <SidebarMenuItem>
                                                        <SidebarMenuButton asChild>
                                                            <Link
                                                                href="/admin/courses"
                                                                className="flex items-center gap-2 px-2 py-1 text-base hover:underline cursor-pointer dark:text-gray-300 dark:hover:text-blue-400"
                                                            >
                                                                <Book className="h-5 w-5" />
                                                                List Courses
                                                            </Link>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                </SidebarMenu>
                                            </AccordionContent>
                                        </AccordionItem>
                                        {/* Account */}
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild>
                                                <Link
                                                    href="/admin/account"
                                                    className="flex items-center gap-2 px-2 py-1 text-base hover:underline cursor-pointer dark:text-gray-300 dark:hover:text-blue-400"
                                                >
                                                    <Settings className="h-5 w-5" />
                                                    Account
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>

                                        {/* Projects */}
                                        <AccordionItem value="projects" className="border-b-0">
                                            <AccordionTrigger className="py-1 pl-2 pr-4 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                                                <div className="flex w-full items-center justify-between">
                                                    <div className="flex items-center gap-2 text-base dark:text-gray-300">
                                                        <Folder className="h-4 w-4" />
                                                        Projects
                                                    </div>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="pb-0 pl-6">
                                                <SidebarMenu>
                                                    <SidebarMenuItem>
                                                        <SidebarMenuButton asChild>
                                                            <Link
                                                                href="/admin/overviewproject"
                                                                className="flex items-center gap-2 px-2 py-1 text-base hover:underline cursor-pointer dark:text-gray-300 dark:hover:text-blue-400"
                                                            >
                                                                <Eye className="h-5 w-5" />
                                                                Overview
                                                            </Link>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                    <SidebarMenuItem>
                                                        <SidebarMenuButton asChild>
                                                            <Link
                                                                href="/admin/calender"
                                                                className="flex items-center gap-2 px-2 py-1 text-base hover:underline cursor-pointer dark:text-gray-300 dark:hover:text-blue-400"
                                                            >
                                                                <Calendar className="h-5 w-5" />
                                                                Calendar
                                                            </Link>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                </SidebarMenu>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </AccordionContent>
                        </AccordionItem>

                        {/* Authentication */}
                        <AccordionItem value="auth" className="border-b-0">
                            <AccordionTrigger className="px-4 py-2 text-muted-foreground dark:text-gray-400 text-xs font-medium uppercase tracking-wide hover:no-underline [&[data-state=open]>svg]:rotate-180">
                                <div className="flex w-full items-center justify-between">
                                    Authentication
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pb-0">
                                <SidebarGroupContent>
                                    <SidebarMenu className="pl-2">
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild>
                                                <Link
                                                    href="#"
                                                    className="flex items-center gap-2 px-2 py-1 text-base dark:text-gray-300 dark:hover:text-blue-400"
                                                >
                                                    <Key className="h-5 w-5" />
                                                    API Keys
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </SidebarGroup>

                {/* Separator */}
                <SidebarSeparator className="my-4 border-gray-200 dark:border-gray-700" />

                {/* Layouts Section */}
                <SidebarMenu className="pl-2">
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link
                                href="#"
                                className="flex items-center gap-2 px-2 py-1 text-base dark:text-gray-300 dark:hover:text-blue-400"
                            >
                                <LayoutDashboard className="h-5 w-5" />
                                Layouts
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
};
