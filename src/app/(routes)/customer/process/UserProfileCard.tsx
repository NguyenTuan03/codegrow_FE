// @/app/(routes)/customer/process/UserProfileCard.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { User, Flame, Trophy } from 'lucide-react';

interface Course {
    _id: string;
    title: string;
    description: string;
    price: number;
    author: {
        fullName: string;
    };
    category: Category[];
    createdAt: string;
    enrolledCount: number;
}

interface Category {
    _id: string;
    name: string;
}

interface User {
    _id: string;
    fullName: string;
    role: string;
    wallet: number;
    email: string;
    enrolledCourses: Course[];
    createdAt: string;
    updatedAt: string;
    dailyStreak: number;
    totalXP: number;
}

interface UserProfileCardProps {
    user: User | null;
}

export default function UserProfileCard({ user }: UserProfileCardProps) {
    return (
        <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-4">
                    <div className="h-16 w-16 bg-[#5AD3AF]/20 dark:bg-[#5AD3AF]/10 rounded-full flex items-center justify-center text-[#5AD3AF]">
                        <User className="h-8 w-8" />
                    </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Hey, {user?.fullName || 'User'}!
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Profile 100% complete
                </p>
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
                        <span className="flex items-center gap-1">
                            <Flame className="w-4 h-4 text-[#5AD3AF]" />
                            Daily Streak
                        </span>
                        <span className="font-semibold">{user?.dailyStreak || 0} days</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
                        <span className="flex items-center gap-1">
                            <Trophy className="w-4 h-4 text-[#5AD3AF]" />
                            Total XP
                        </span>
                        <span className="font-semibold">{user?.totalXP || 0} XP</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
