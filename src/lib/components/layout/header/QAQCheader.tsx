'use client';
import { Search, User, Settings, Bell, LogOut } from 'lucide-react';
import { useState, useEffect, useContext } from 'react';
import { Button } from '@/components/ui/button';

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

    if (!isClient) {
        return null;
    }

    return (
        <header className="fixed w-full top-0 left-0 right-0 z-50 shadow-sm border-b bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-xl mx-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-300" />
                        <input
                            type="text"
                            placeholder="Search in font"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] focus:border-[#657ED4] dark:focus:border-[#5AD3AF] bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-200"
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

                {/* Right Section: Avatar, Notifications, Mode Toggle */}
                <div className="flex items-center gap-4">
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <button
                                aria-label="User menu"
                                className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
                            >
                                {loading ? (
                                    <div className="animate-pulse">
                                        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                                    </div>
                                ) : (
                                    <Avatar className="w-10 h-10 cursor-pointer border-2 border-gray-200 dark:border-gray-700">
                                        <AvatarImage
                                            src={
                                                profileData?.avatar ||
                                                'https://github.com/shadcn.png'
                                            }
                                            alt={profileData?.fullName || 'User avatar'}
                                        />
                                        <AvatarFallback className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200">
                                            {profileData?.fullName?.charAt(0) || 'A'}
                                        </AvatarFallback>
                                    </Avatar>
                                )}
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-48 mt-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-[60]"
                            align="end"
                        >
                            <DropdownMenuItem
                                onClick={() => router.push('/admin/profileadmin')}
                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                            >
                                <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => router.push('/admin/changepassword')}
                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                            >
                                <Settings className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                                <span>Change Password</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                            >
                                <LogOut className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                                <span>Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
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
                            <DropdownMenuItem className="px-4 py-2 font-medium">
                                <div className="flex flex-col gap-1 text-sm">
                                    <span className="text-gray-800 dark:text-gray-200">
                                        New user registered
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                        2 minutes ago
                                    </span>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="px-4 py-2 font-medium">
                                <div className="flex flex-col gap-1 text-sm">
                                    <span className="text-gray-800 dark:text-gray-200">
                                        System update completed
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                        10 minutes ago
                                    </span>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="px-4 py-2 font-medium">
                                <div className="flex flex-col gap-1 text-sm">
                                    <span className="text-gray-800 dark:text-gray-200">
                                        You have 3 unread messages
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                        30 minutes ago
                                    </span>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="justify-center text-[#657ED4] dark:text-[#5AD3AF] hover:text-[#4a5da0] dark:hover:text-[#4ac2a0] font-medium">
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
