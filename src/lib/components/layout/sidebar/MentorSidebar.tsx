'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    Home,
    Calendar,
    BookOpen,
    BarChart2,
    Settings,
    Mail,
    HelpCircle,
    ClipboardList,
} from 'lucide-react';
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
} from '@/components/ui/sidebar';
import { toast } from '@/components/ui/use-toast';
import { GetClass } from '@/lib/services/class/getclass';

interface ClassItem {
    _id: string;
    title: string;
    description: string;
    students: string[];
    schedule: {
        startDate: string;
        endDate: string;
        daysOfWeek: string[];
        time: string;
    };
    image?: string;
    bgColor?: string;
    mentor?: string | { _id: string; fullName: string; email: string } | null;
}

export default function MentorSidebar() {
    const pathname = usePathname();
    const [classesItems, setClassesItems] = useState<ClassItem[]>([]);
    const [filteredClasses, setFilteredClasses] = useState<ClassItem[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [showClasses, setShowClasses] = useState(false);
    const limit = 6; // Number of classes per page

    // Function to determine if a link or section is active
    const isActive = (href: string, isSection: boolean = false) => {
        const normalizedHref = href.endsWith('/') ? href.slice(0, -1) : href;
        const normalizedPathname = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

        return isSection
            ? normalizedPathname.startsWith(normalizedHref)
            : normalizedPathname === normalizedHref ||
                  (normalizedHref !== '/mentor' &&
                      normalizedPathname.startsWith(normalizedHref + '/'));
    };

    // Fetch classes and filter by mentor ID
    const fetchClasses = async (page: number = 1) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('user');
            if (!token || !user) {
                throw new Error('Authentication token or user ID is missing');
            }

            const parsedUser = JSON.parse(user);
            const mentorId = parsedUser.id;
            console.log('User ID:', mentorId);

            const data = await GetClass(page, limit);
            if (data.status === 200 && Array.isArray(data.metadata.classes)) {
                const fetchedClasses = data.metadata.classes;
                setClassesItems(fetchedClasses);
                setCurrentPage(data.metadata.page || 1);
                setTotalPages(data.metadata.totalPages || 1);

                // Filter classes by mentor ID
                const mentorClasses = fetchedClasses.filter((classItem: ClassItem) => {
                    if (!classItem.mentor) return false; // Skip classes with no mentor
                    const classMentorId =
                        typeof classItem.mentor === 'string'
                            ? classItem.mentor
                            : classItem.mentor._id;
                    return classMentorId === mentorId;
                });
                setFilteredClasses(mentorClasses);
                setShowClasses(mentorClasses.length > 0); // Show "Classes" section only if there are matching classes
            } else {
                throw new Error('Invalid class data');
            }
        } catch (error) {
            console.error('Failed to fetch classes:', error);
            toast({
                title: 'Error',
                description: 'Failed to fetch classes',
                variant: 'destructive',
            });
            setClassesItems([]);
            setFilteredClasses([]);
            setShowClasses(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClasses(currentPage);
    }, [currentPage]);

    const navItems = [
        { href: '/mentor', icon: Home, label: 'Home' },
        { href: '/mentor/calendar', icon: Calendar, label: 'Calendar' },
        { href: '/mentor/toreview', icon: ClipboardList, label: 'To Review' },
    ];

    const otherItems = [
        { href: '/mentor/analytics', icon: BarChart2, label: 'Analytics' },
        { href: '/mentor/settings', icon: Settings, label: 'Settings' },
        { href: '/mentor/messages', icon: Mail, label: 'Messages', badge: 3 },
        { href: '/mentor/help', icon: HelpCircle, label: 'Help Center' },
    ];

    // Check if any class route is active for the "Classes" section label
    const isClassesActive = filteredClasses.some((item) =>
        isActive(`/mentor/classes/${item._id}`, true),
    );

    return (
        <Sidebar className="w-64 pt-5 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-r shadow-md text-gray-900 dark:text-gray-100">
            <SidebarContent>
                {/* Logo Section */}
                <div className="flex items-center gap-x-3 px-6 mb-8">
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
                                        className={`hover:bg-[#5AD3AF]/10 dark:hover:bg-[#5AD3AF]/20 ${
                                            isActive(item.href)
                                                ? 'text-[#5AD3AF] font-semibold bg-[#5AD3AF]/10 dark:bg-[#5AD3AF]/20'
                                                : ''
                                        } rounded-lg mx-2 py-2 transition-colors duration-200`}
                                    >
                                        <Link href={item.href}>
                                            <item.icon className="h-5 w-5 mr-3 text-[#5AD3AF] dark:text-[#5AD3AF]" />
                                            <span>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Classes Section */}
                {showClasses && (
                    <SidebarGroup>
                        <SidebarGroupLabel
                            className={`px-6 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase flex items-center justify-between ${
                                isClassesActive
                                    ? 'text-[#5AD3AF] font-semibold'
                                    : 'hover:text-[#5AD3AF] dark:hover:text-[#5AD3AF]'
                            }`}
                        >
                            <Link href="/mentor/classes">
                                <span className="cursor-pointer">Classes</span>
                            </Link>
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {loading ? (
                                    <div className="px-6 py-2 text-gray-500 dark:text-gray-400">
                                        <span>Loading classes...</span>
                                    </div>
                                ) : filteredClasses.length === 0 ? (
                                    <div className="px-6 py-2 text-gray-500 dark:text-gray-400">
                                        <span>No classes found</span>
                                    </div>
                                ) : (
                                    filteredClasses.map((item) => {
                                        const href = `/mentor/classes/${item._id}`;
                                        return (
                                            <SidebarMenuItem key={item._id}>
                                                <SidebarMenuButton
                                                    asChild
                                                    className={`hover:bg-[#5AD3AF]/10 dark:hover:bg-[#5AD3AF]/20 ${
                                                        isActive(href)
                                                            ? 'text-[#5AD3AF] font-semibold bg-[#5AD3AF]/10 dark:bg-[#5AD3AF]/20'
                                                            : ''
                                                    } rounded-lg mx-2 py-2 transition-colors duration-200`}
                                                >
                                                    <Link href={href}>
                                                        <BookOpen className="h-5 w-5 mr-3 text-[#5AD3AF] dark:text-[#5AD3AF]" />
                                                        <span>{item.title}</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        );
                                    })
                                )}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                )}

                {/* Other Navigation */}
                <SidebarGroup>
                    <SidebarGroupLabel className="px-6 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">
                        Other
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {otherItems.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton
                                        asChild
                                        className={`hover:bg-[#5AD3AF]/10 dark:hover:bg-[#5AD3AF]/20 ${
                                            isActive(item.href)
                                                ? 'text-[#5AD3AF] font-semibold bg-[#5AD3AF]/10 dark:bg-[#5AD3AF]/20'
                                                : ''
                                        } rounded-lg mx-2 py-2 transition-colors duration-200`}
                                    >
                                        <Link href={item.href}>
                                            <item.icon className="h-5 w-5 mr-3 text-[#5AD3AF] dark:text-[#5AD3AF]" />
                                            <span>{item.label}</span>
                                            {item.badge && (
                                                <SidebarMenuBadge className="ml-auto bg-[#5AD3AF]/20 dark:bg-[#5AD3AF]/30 text-[#5AD3AF] dark:text-[#5AD3AF]">
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
