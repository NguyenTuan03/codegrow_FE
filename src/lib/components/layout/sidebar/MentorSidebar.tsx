// src/components/layout/Sidebar.tsx

import {
    Home,
    Calendar,
    BookOpen,
    BarChart,
    Settings,
    MessageCircle,
    HelpCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

export default function MentorSidebar() {
    return (
        <div className="w-64 bg-white border-r p-4 flex flex-col">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">CODEGROW</h1>
                <p className="text-sm text-gray-500">Mentor Dashboard</p>
            </div>

            <nav className="flex-1 space-y-2">
                {/* Home Button */}
                <div>
                    <Button variant="ghost" className="w-full justify-start">
                        <Home className="h-4 w-4 mr-3" />
                        Home
                    </Button>
                </div>

                {/* Calendar Section */}
                <div className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start">
                        <Calendar className="h-4 w-4 mr-3" />
                        Calendar
                    </Button>
                </div>

                {/* Classes Section */}
                <div className="space-y-1">
                    <h3 className="px-4 text-sm font-medium text-gray-500">Classes</h3>
                    <Button variant="ghost" className="w-full justify-start">
                        <BookOpen className="h-4 w-4 mr-3" />
                        To review
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                        <BookOpen className="h-4 w-4 mr-3" />
                        Java
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                        <BookOpen className="h-4 w-4 mr-3" />
                        ReactJS
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                        <BookOpen className="h-4 w-4 mr-3" />
                        Python
                    </Button>
                </div>

                <Separator className="my-2" />

                {/* Analytics Section */}
                <div className="space-y-1">
                    <h3 className="px-4 text-sm font-medium text-gray-500">Analytics</h3>
                    <Button variant="ghost" className="w-full justify-start">
                        <BarChart className="h-4 w-4 mr-3" />
                        Analytics
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                        <Settings className="h-4 w-4 mr-3" />
                        Settings
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                        <MessageCircle className="h-4 w-4 mr-3" />
                        Messages
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                        <HelpCircle className="h-4 w-4 mr-3" />
                        Help Center
                    </Button>
                </div>
            </nav>

            {/* Mentor Avatar Section */}
            <div className="mt-auto pt-4 border-t">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src="/mentor-avatar.jpg" />
                        <AvatarFallback>ME</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-medium">Mentor Name</p>
                        <p className="text-xs text-gray-500">mentor@codegrow.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
