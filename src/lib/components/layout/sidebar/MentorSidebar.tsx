'use client';
import {
    Home,
    Calendar,
    BookOpen,
    BarChart2,
    Settings,
    Mail,
    HelpCircle,
    ChevronRight,
    Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MentorSidebar() {
    const pathname = usePathname();

    const navItems = [
        {
            href: '/mentor',
            icon: Home,
            label: 'Home',
        },
        {
            href: '/mentor/calendar',
            icon: Calendar,
            label: 'Calendar',
        },
    ];

    // Danh sách lớp học với ID tương ứng
    const classesItems = [
        {
            id: 'review',
            icon: BookOpen,
            label: 'To review',
        },
        {
            id: 'java',
            icon: BookOpen,
            label: 'Java',
        },
        {
            id: 'react',
            icon: BookOpen,
            label: 'ReactJS',
        },
        {
            id: 'python',
            icon: BookOpen,
            label: 'Python',
        },
    ];

    const otherItems = [
        {
            href: '/mentor/analytics',
            icon: BarChart2,
            label: 'Analytics',
        },
        {
            href: '/mentor/settings',
            icon: Settings,
            label: 'Settings',
        },
        {
            href: '/mentor/messages',
            icon: Mail,
            label: 'Messages',
            badge: 3,
        },
        {
            href: '/mentor/help',
            icon: HelpCircle,
            label: 'Help Center',
        },
    ];

    return (
        <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-60 lg:overflow-y-auto lg:bg-white lg:border-r">
            <div className="flex h-full flex-col gap-y-8 px-6 py-4">
                {/* Logo Section */}
                <div className="flex items-center gap-x-3">
                    <h1 className="text-xl items-center font-bold text-gray-900">CODEGROW</h1>
                </div>

                {/* Main Navigation */}
                <nav className="flex flex-1 flex-col">
                    <ul className="flex flex-1 flex-col gap-y-4">
                        {/* Primary Navigation */}
                        <li className="space-y-1">
                            {navItems.map((item) => (
                                <Button
                                    key={item.href}
                                    asChild
                                    variant="ghost"
                                    className={cn(
                                        'w-full justify-start hover:bg-gray-100',
                                        pathname === item.href && 'bg-gray-100 text-indigo-600',
                                    )}
                                >
                                    <Link href={item.href}>
                                        <item.icon className="h-4 w-4 mr-3" />
                                        {item.label}
                                        {pathname === item.href && (
                                            <ChevronRight className="h-4 w-4 ml-auto" />
                                        )}
                                    </Link>
                                </Button>
                            ))}
                        </li>

                        {/* Classes Section */}
                        <li className="space-y-1">
                            <div className="flex items-center justify-between px-4 py-2">
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Classes
                                </h3>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                    <Plus className="h-3 w-3" />
                                </Button>
                            </div>
                            <ul className="space-y-1">
                                {classesItems.map((item) => {
                                    const isActive = pathname?.startsWith(
                                        `/mentor/classes/${item.id}`,
                                    );
                                    return (
                                        <li key={item.id}>
                                            <Button
                                                asChild
                                                variant="ghost"
                                                className={cn(
                                                    'w-full justify-start hover:bg-gray-100',
                                                    isActive && 'bg-gray-100 text-indigo-600',
                                                )}
                                            >
                                                <Link href={`/mentor/classes/${item.id}`}>
                                                    <item.icon className="h-4 w-4 mr-3" />
                                                    {item.label}
                                                    {isActive && (
                                                        <ChevronRight className="h-4 w-4 ml-auto" />
                                                    )}
                                                </Link>
                                            </Button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>

                        <Separator className="my-2" />

                        {/* Secondary Navigation */}
                        <li className="space-y-1">
                            <ul className="space-y-1">
                                {otherItems.map((item) => (
                                    <li key={item.href}>
                                        <Button
                                            asChild
                                            variant="ghost"
                                            className={cn(
                                                'w-full justify-start hover:bg-gray-100',
                                                pathname === item.href &&
                                                    'bg-gray-100 text-indigo-600',
                                            )}
                                        >
                                            <Link href={item.href}>
                                                <item.icon className="h-4 w-4 mr-3" />
                                                {item.label}
                                                {item.badge && (
                                                    <span className="ml-auto bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded-full">
                                                        {item.badge}
                                                    </span>
                                                )}
                                                {pathname === item.href && !item.badge && (
                                                    <ChevronRight className="h-4 w-4 ml-auto" />
                                                )}
                                            </Link>
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </ul>
                </nav>

                {/* User Profile (Optional) */}
                <div className="flex items-center gap-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xs font-medium">JD</span>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium">John Doe</p>
                        <p className="text-xs text-gray-500">Mentor</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
            </div>
        </div>
    );
}
