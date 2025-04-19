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
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Auth } from '@/lib/components/context/AuthContext';
import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';

export default function MentorHeader() {
    const router = useRouter();
    const userAuth = useContext(Auth);

    // Kiểm tra trạng thái đăng nhập từ localStorage
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            // Nếu không có user, chuyển hướng đến trang đăng nhập
            router.push('/login');
        }
    }, [router]);

    const handleLogout = () => {
        if (userAuth) {
            userAuth.logoutUser(); // Gọi hàm logout từ AuthContext
            console.log('User logged out');
            router.push('/'); // Chuyển hướng đến trang đăng nhập
        }
    };

    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center transition-colors duration-300">
            {/* Logo */}
            <div className="text-xl font-bold text-gray-900 dark:text-white">
                <h1>Mentor Dashboard</h1>
            </div>

            {/* Right Side: Icons, Avatar, and Mode Toggle */}
            <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon">
                    <Plus className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </Button>
                <Button variant="ghost" size="icon">
                    <LayoutGrid className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </Button>

                {/* Avatar with Dropdown */}
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarImage src="https://randomuser.me/api/portraits/women/10.jpg" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg w-64 border border-gray-200 dark:border-gray-700">
                        <p className="font-semibold text-gray-800 dark:text-gray-100">User Name</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">user@example.com</p>
                        <div className="mt-4">
                            <DropdownMenuItem className="w-full text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                                <Link href="/mentor/profilementor" className="w-full">
                                    Profile Settings
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="w-full text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                                <Link href="/mentor/changepassword" className="w-full">
                                    Change Password
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={handleLogout}
                                className="w-full text-sm mt-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                            >
                                Logout
                            </DropdownMenuItem>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Mode Toggle */}
                <ModeToggle />
            </div>
        </header>
    );
}
