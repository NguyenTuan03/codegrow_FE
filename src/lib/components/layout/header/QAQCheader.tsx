import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Menu, Plus, Settings, User } from 'lucide-react';
import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Auth } from '@/lib/components/context/AuthContext';
import { ModeToggle } from '@/components/mode-toggle';

const QAQCheader = () => {
    const userAuth = useContext(Auth);
    const router = useRouter();
    const handleLogout = () => {
        if (userAuth) {
            userAuth.logoutUser();
            router.push('/');
        }
    };

    return (
        <div className="h-[60px] px-4 flex flex-row items-center justify-between bg-white dark:bg-gray-900 transition-colors duration-300">
            <div></div>
            <div className="flex items-center gap-5">
                <Plus className="text-gray-800 dark:text-gray-200" />
                <Menu className="text-gray-800 dark:text-gray-200" />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="cursor-pointer">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                        <DropdownMenuItem
                            onClick={() => router.push('/qaqc/profileqaqc')}
                            className="hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <User className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => router.push('/qaqc/changepassword')}
                            className="hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <Settings className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                            Change Password
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout}>
                            <div className="flex items-center gap-2">
                                <LogOut className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                                Logout
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <ModeToggle />
            </div>
        </div>
    );
};

export default QAQCheader;
