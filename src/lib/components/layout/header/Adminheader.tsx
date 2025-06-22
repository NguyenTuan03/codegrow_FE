'use client';

import { User, Settings, Bell, LogOut } from 'lucide-react';
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

                        {/* Menu Dropdown */}
                    </div>
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
                    </DropdownMenu>
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
