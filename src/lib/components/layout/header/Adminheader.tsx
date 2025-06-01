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
import { useRouter, usePathname } from 'next/navigation';
import { Auth } from '@/lib/components/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ModeToggle } from '@/components/mode-toggle';
import { getUserDetail } from '@/lib/services/admin/getuserdetail';

interface ProfileData {
    email: string;
    _id: string;
    fullName: string;
    role?: string;
    avatar: string;
    wallet?: string;
}

export const AdminHeader = () => {
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const pathname = usePathname();
    const userAuth = useContext(Auth);
    const [isClient, setIsClient] = useState(false);
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState<ProfileData | null>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            router.push('/login');
            return;
        }

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
    }, [router]);

    const handleLogout = () => {
        if (userAuth) {
            userAuth.logoutUser();
            router.push('/');
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
        {
            name: 'Courses',
            href: '/admin/report/courses',
            icon: <BookOpen className="h-4 w-4 mr-2 text-[#657ED4] dark:text-[#5AD3AF]" />,
        },
        {
            name: 'Mentors',
            href: '/admin/report/mentors',
            icon: <User className="h-4 w-4 mr-2 text-[#657ED4] dark:text-[#5AD3AF]" />,
        },
    ];

    const menuItems = [
        {
            name: 'Dashboard',
            href: '/admin/report/dashboard',
            icon: <LayoutDashboard className="h-4 w-4 mr-2 text-[#657ED4] dark:text-[#5AD3AF]" />,
        },
        {
            name: 'Settings',
            href: '/admin/report/settings',
            icon: <Settings className="h-4 w-4 mr-2 text-[#657ED4] dark:text-[#5AD3AF]" />,
        },
    ];

    const isActiveLink = (href: string) => {
        const normalizedHref = href.endsWith('/') ? href.slice(0, -1) : href;
        const normalizedPathname = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

        return (
            normalizedPathname === normalizedHref ||
            (normalizedHref !== '' && normalizedPathname.startsWith(normalizedHref + '/'))
        );
    };

    if (!isClient) {
        return null;
    }

    return (
        <header className="fixed w-full top-0 left-0 right-0 z-50 shadow-sm border-b bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
                {/* Left side - Logo and Dropdowns */}
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4">
                        {/* Report Dropdown */}
                        <Accordion type="single" collapsible className="w-auto">
                            <AccordionItem value="report" className="border-b-0">
                                <AccordionTrigger className="[&[data-state=open]>svg]:rotate-180 px-0 cursor-pointer">
                                    <div className="flex items-center gap-1 text-lg font-medium text-gray-800 dark:text-gray-200">
                                        Report
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="absolute mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                                    <div className="py-1">
                                        {reportItems.map((item) => (
                                            <Link key={item.name} href={item.href}>
                                                <div
                                                    className={`flex items-center px-4 py-2 text-sm hover:bg-[#657ED4] dark:hover:bg-[#5AD3AF] hover:text-white dark:hover:text-black transition-colors font-medium cursor-pointer ${
                                                        isActiveLink(item.href)
                                                            ? 'text-[#657ED4] dark:text-[#5AD3AF] font-semibold bg-gray-100 dark:bg-gray-700'
                                                            : 'text-gray-700 dark:text-gray-300'
                                                    }`}
                                                >
                                                    {item.icon}
                                                    {item.name}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        {/* Menu Dropdown */}
                        <Accordion type="single" collapsible className="w-auto">
                            <AccordionItem value="menu" className="border-b-0">
                                <AccordionTrigger className="[&[data-state=open]>svg]:rotate-180 px-0 cursor-pointer">
                                    <div className="flex items-center gap-1 text-lg font-medium text-gray-800 dark:text-gray-200">
                                        Menu
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="absolute mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                                    <div className="py-1">
                                        {menuItems.map((item) => (
                                            <Link key={item.name} href={item.href}>
                                                <div
                                                    className={`flex items-center px-4 py-2 text-sm hover:bg-[#657ED4] dark:hover:bg-[#5AD3AF] hover:text-white dark:hover:text-black transition-colors font-medium cursor-pointer ${
                                                        isActiveLink(item.href)
                                                            ? 'text-[#657ED4] dark:text-[#5AD3AF] font-semibold bg-gray-100 dark:bg-gray-700'
                                                            : 'text-gray-700 dark:text-gray-300'
                                                    }`}
                                                >
                                                    {item.icon}
                                                    {item.name}
                                                </div>
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
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-300" />
                        <input
                            type="text"
                            placeholder="Search in font"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] focus:border-[#657ED4] dark:focus:border-[#5AD3AF] bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-200 cursor-text"
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Search Results */}
                    {isSearchFocused && (
                        <div className="absolute mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
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
                                        className="flex items-center gap-3 px-4 py-2 hover:bg-[#657ED4] dark:hover:bg-[#5AD3AF] hover:text-white dark:hover:text-black cursor-pointer transition-colors font-medium"
                                    >
                                        <div className="text-gray-500 dark:text-gray-300">
                                            {item.icon}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm">{item.title}</span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            {loading ? (
                                <div className="animate-pulse">
                                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                                </div>
                            ) : (
                                <Avatar className="w-8 h-8 border-2 border-[#657ED4] dark:border-[#5AD3AF] shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                                    <AvatarImage
                                        src={profileData?.avatar || '/default-avatar.png'}
                                        alt={profileData?.fullName}
                                    />
                                    <AvatarFallback className="text-[#657ED4] dark:text-[#5AD3AF] font-semibold">
                                        {profileData?.fullName?.charAt(0) || 'A'}
                                    </AvatarFallback>
                                </Avatar>
                            )}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-1"
                            align="end"
                        >
                            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 hover:bg-[#657ED4] dark:hover:bg-[#5AD3AF] hover:text-white dark:hover:text-black rounded-md transition-colors font-medium cursor-pointer">
                                <User className="h-4 w-4" />
                                <Link href="/admin/profileadmin" className="w-full">
                                    Profile
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 hover:bg-[#657ED4] dark:hover:bg-[#5AD3AF] hover:text-white dark:hover:text-black rounded-md transition-colors font-medium cursor-pointer">
                                <Settings className="h-4 w-4" />
                                <Link href="/admin/changepassword" className="w-full">
                                    Change Password
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-3 py-2 hover:bg-[#657ED4] dark:hover:bg-[#5AD3AF] hover:text-white dark:hover:text-black rounded-md transition-colors font-medium cursor-pointer"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="cursor-pointer">
                                <Bell className="h-5 w-5 text-[#657ED4] dark:text-[#5AD3AF]" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
                            align="end"
                        >
                            <div className="px-4 py-2 text-sm font-semibold text-[#657ED4] dark:text-[#5AD3AF]">
                                Notifications
                            </div>
                            <DropdownMenuItem className="px-4 py-2 font-medium cursor-pointer">
                                <div className="flex flex-col gap-1 text-sm">
                                    <span className="text-gray-800 dark:text-gray-200">
                                        New user registered
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                        2 minutes ago
                                    </span>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="px-4 py-2 font-medium cursor-pointer">
                                <div className="flex flex-col gap-1 text-sm">
                                    <span className="text-gray-800 dark:text-gray-200">
                                        System update completed
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                        10 minutes ago
                                    </span>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="px-4 py-2 font-medium cursor-pointer">
                                <div className="flex flex-col gap-1 text-sm">
                                    <span className="text-gray-800 dark:text-gray-200">
                                        You have 3 unread messages
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                        30 minutes ago
                                    </span>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="justify-center text-[#657ED4] dark:text-[#5AD3AF] hover:text-[#4a5da0] dark:hover:text-[#4ac2a0] font-medium cursor-pointer">
                                <Link href="#">View all</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
