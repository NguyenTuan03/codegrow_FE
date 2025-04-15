'use client';

import {
    Home,
    Calendar,
    BookOpen,
    BarChart2,
    Settings,
    Mail,
    HelpCircle,
    ClipboardList,
    Plus,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuBadge,
    SidebarMenuAction,
} from '@/components/ui/sidebar';

export default function MentorSidebar() {
    const pathname = usePathname();

    const navItems = [
        { href: '/mentor', icon: Home, label: 'Home' },
        { href: '/mentor/calendar', icon: Calendar, label: 'Calendar' },
        { href: '/mentor/toreview', icon: ClipboardList, label: 'To Review' },
    ];

    const classesItems = [
        { id: 'java', icon: BookOpen, label: 'Java' },
        { id: 'react', icon: BookOpen, label: 'ReactJS' },
        { id: 'python', icon: BookOpen, label: 'Python' },
    ];

    const otherItems = [
        { href: '/mentor/analytics', icon: BarChart2, label: 'Analytics' },
        { href: '/mentor/settings', icon: Settings, label: 'Settings' },
        { href: '/mentor/messages', icon: Mail, label: 'Messages', badge: 3 },
        { href: '/mentor/help', icon: HelpCircle, label: 'Help Center' },
    ];

    return (
        <Sidebar className="w-64 bg-gray-50 border-r shadow-md">
            <SidebarContent>
                {/* Logo Section */}
                <div className="flex items-center gap-x-3 px-6 py-4  text-black">
                    <h1 className="text-2xl font-bold">CODEGROW</h1>
                </div>

                {/* Main Navigation */}
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.href}
                                        className="hover:bg-indigo-100"
                                    >
                                        <Link href={item.href}>
                                            <item.icon className="h-5 w-5 mr-3 text-indigo-600" />
                                            <span className="text-gray-800">{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Classes Section */}
                <SidebarGroup>
                    <SidebarGroupLabel className="px-6 py-2 text-sm font-semibold text-gray-500 uppercase flex items-center justify-between">
                        <span>Classes</span>
                        <SidebarMenuAction className="ml-2 mt-2 mr-2">
                            <Link href="/mentor/classes/create">
                                <Plus className="h-4 w-4 text-gray-500 hover:text-indigo-600" />
                            </Link>
                        </SidebarMenuAction>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {classesItems.map((item) => {
                                const href = `/mentor/classes/${item.id}`;
                                const isActive = pathname?.startsWith(href);
                                return (
                                    <SidebarMenuItem key={item.id}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                            className="hover:bg-indigo-100"
                                        >
                                            <Link href={href}>
                                                <item.icon className="h-5 w-5 mr-3 text-indigo-600" />
                                                <span className="text-gray-800">{item.label}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Other Navigation */}
                <SidebarGroup>
                    <SidebarGroupLabel className="px-6 py-2 text-sm font-semibold text-gray-500 uppercase">
                        Other
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {otherItems.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.href}
                                        className="hover:bg-indigo-100"
                                    >
                                        <Link href={item.href}>
                                            <item.icon className="h-5 w-5 mr-3 text-indigo-600" />
                                            <span className="text-gray-800">{item.label}</span>
                                            {item.badge && (
                                                <SidebarMenuBadge className="ml-auto bg-indigo-100 text-indigo-800">
                                                    {item.badge}
                                                </SidebarMenuBadge>
                                            )}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
