// @/components/UserProfileCard.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { User } from 'lucide-react';
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
        <Card className="shadow-sm border border-gray-200">
            <CardContent className="p-6">
                <div className="flex items-center justify-center mb-2">
                    <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
                        <User className="h-8 w-8" />
                    </div>
                </div>
                <div className="text-center mb-4">
                    <h3 className="font-medium text-lg">Hey, {user?.fullName || 'User'}!</h3>
                    <p className="text-sm text-gray-500">Profile % complete</p>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Daily Streak</span>
                        <span className="font-medium">{user?.dailyStreak || 0} days</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>Total XP</span>
                        <span className="font-medium">{user?.totalXP || 0} XP</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
