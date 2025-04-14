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
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function MentorHeader() {
    const router = useRouter();
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            // Nếu không có user, chuyển hướng đến trang đăng nhập
            router.push('/login');
        }
    }, [router]);
    const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/login');
    };
    return (
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
            {/* Logo */}
            <div className="text-xl font-bold text-gray-900">
                <h1></h1>
            </div>

            {/* Right Side: Icons and Avatar */}
            <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon">
                    <Plus className="h-5 w-5 text-gray-600" />
                </Button>
                <Button variant="ghost" size="icon">
                    <LayoutGrid className="h-5 w-5 text-gray-600" />
                </Button>

                {/* Avatar with Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarImage src="https://randomuser.me/api/portraits/women/10.jpg" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="p-4 bg-white shadow-lg rounded-lg w-64">
                        <p className="font-semibold text-gray-800">User Name</p>
                        <p className="text-sm text-gray-500">user@example.com</p>
                        <div className="mt-4">
                            <DropdownMenuItem className="w-full text-sm">
                                Profile Settings
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={handleLogout}
                                className="w-full text-sm mt-2"
                            >
                                Logout
                            </DropdownMenuItem>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
