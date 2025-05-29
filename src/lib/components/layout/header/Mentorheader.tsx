'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Plus, LayoutGrid } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Auth } from '@/lib/components/context/AuthContext';
import Link from 'next/link';
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

export default function MentorHeader() {
    const router = useRouter();
    const userAuth = useContext(Auth);
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState<ProfileData | null>(null);

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
            console.log('User logged out');
            router.push('/');
        }
    };

    return (
        <header className="fixed w-full top-0 left-0 right-0 z-50 bg-gray-50 dark:bg-gray-900 shadow-sm border-b h-16 px-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-[#657ED4] dark:text-[#5AD3AF]">
                        Mentor Dashboard
                    </h1>
                </div>

                {/* Right Side: Icons, Avatar, and Mode Toggle */}
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-[#657ED4] cursor-pointer dark:text-[#5AD3AF] hover:bg-[#657ED4]/10 dark:hover:bg-[#5AD3AF]/20"
                    >
                        <Plus className="h-5 w-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-[#657ED4] cursor-pointer dark:text-[#5AD3AF] hover:bg-[#657ED4]/10 dark:hover:bg-[#5AD3AF]/20"
                    >
                        <LayoutGrid className="h-5 w-5" />
                    </Button>

                    {/* Avatar with Dropdown */}
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger>
                            {loading ? (
                                <div className="animate-pulse">
                                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                                </div>
                            ) : (
                                <Avatar className="w-8  cursor-pointer h-8 border-2 border-[#657ED4] dark:border-[#5AD3AF] shadow-md hover:shadow-lg transition-shadow">
                                    <AvatarImage
                                        src={profileData?.avatar || '/default-avatar.png'}
                                        alt={profileData?.fullName}
                                    />
                                    <AvatarFallback className="text-[#657ED4] dark:text-[#5AD3AF] font-semibold">
                                        {profileData?.fullName?.charAt(0) || 'JD'}
                                    </AvatarFallback>
                                </Avatar>
                            )}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg w-64 border border-gray-200 dark:border-gray-700 z-[60]">
                            <p className="font-semibold  text-[#657ED4] dark:text-[#5AD3AF]">
                                {profileData?.fullName || 'User Name'}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                {profileData?.email || 'user@example.com'}
                            </p>
                            <div className="mt-4">
                                <DropdownMenuItem className="w-full cursor-pointer text-sm hover:bg-[#657ED4] dark:hover:bg-[#5AD3AF] hover:text-white dark:hover:text-black rounded-md transition-colors font-medium">
                                    <Link href="/mentor/profilementor" className="w-full">
                                        Profile Settings
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="w-full text-sm cursor-pointer hover:bg-[#657ED4] dark:hover:bg-[#5AD3AF] hover:text-white dark:hover:text-black rounded-md transition-colors font-medium">
                                    <Link href="/mentor/changepassword" className="w-full">
                                        Change Password
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={handleLogout}
                                    className="w-full text-sm mt-2 cursor-pointer hover:bg-[#657ED4] dark:hover:bg-[#5AD3AF] hover:text-white dark:hover:text-black rounded-md transition-colors font-medium"
                                >
                                    Logout
                                </DropdownMenuItem>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Mode Toggle */}
                    <ModeToggle />
                </div>
            </div>

            {/* Date/Time Display */}
        </header>
    );
}
