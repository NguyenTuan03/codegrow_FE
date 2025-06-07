'use client';
import React from 'react';
import { Calendar, Home, Users, ClipboardList, CircleSlash } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation'; // Import usePathname

import { ChatBubbleIcon } from '@radix-ui/react-icons';

const menuItems = [
    { label: 'Home', icon: <Home className="w-5 h-5" />, href: '/qaqc' },
    { label: 'Calendar', icon: <Calendar className="w-5 h-5" />, href: '/qaqc/calendar' },
    { label: 'Mentor Manage', icon: <ClipboardList className="w-5 h-5" />, href: '/qaqc/manage' },
    // { label: 'Feedbacks', icon: <ThumbsUp className="w-5 h-5" />, href: '/qaqc/feedbacks' },
    { label: 'Services', icon: <Users className="w-5 h-5" />, href: '/qaqc/services' },
    // { label: 'Message', icon: <MessagesSquare className="w-5 h-5" />, href: '/qaqc/message' },
    { label: 'Courses', icon: <CircleSlash className="w-5 h-5" />, href: '/qaqc/courses' },
    { label: 'Chat', icon: <ChatBubbleIcon className="w-5 h-5" />, href: '/chat' },
];

const QAQCSidebar = () => {
    const router = useRouter();
    const pathname = usePathname(); // Get the current route

    // Function to determine if a link is active
    const isActive = (href: string) => {
        const normalizedHref = href.endsWith('/') ? href.slice(0, -1) : href;
        const normalizedPathname = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

        return (
            normalizedPathname === normalizedHref ||
            (normalizedHref !== '/qaqc' && normalizedPathname.startsWith(normalizedHref + '/'))
        );
    };

    return (
        <>
            <aside className="w-64 h-full bg-white dark:bg-gray-900 border-r dark:border-gray-700 flex flex-col transition-colors duration-300">
                <div className="flex items-center justify-between px-6 py-4 border-b dark:border-gray-700">
                    <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">CODEGROW</h1>
                </div>

                <nav className="flex flex-col px-2 py-6 gap-2">
                    {menuItems.map((item) => (
                        <SidebarItem
                            key={item.label}
                            icon={item.icon}
                            label={item.label}
                            active={isActive(item.href)}
                            onClick={() => {
                                router.push(item.href);
                            }}
                        />
                    ))}
                </nav>
            </aside>
        </>
    );
};

function SidebarItem({
    icon,
    label,
    active = false,
    onClick,
}: {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    onClick?: () => void;
}) {
    return (
        <div
            onClick={onClick}
            className={`flex items-center gap-3 text-sm font-medium px-3 py-2 rounded-md cursor-pointer ${
                active
                    ? 'text-blue-600 dark:text-blue-400 font-semibold bg-gray-100 dark:bg-gray-800'
                    : 'text-black dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
        >
            {icon}
            <span>{label}</span>
        </div>
    );
}

export default QAQCSidebar;
