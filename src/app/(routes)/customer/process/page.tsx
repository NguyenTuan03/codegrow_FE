// @/app/(routes)/process/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { getUserDetail } from '@/lib/services/admin/getuserdetail';
import CourseInProgress from '@/app/(routes)/customer/process/CourseInProgress';
import UpcomingAssignment from '@/app/(routes)/customer/process/UpcomingAssignment';
import ContinueWatching from '@/app/(routes)/customer/process/ContinueWatching';
import YourMentor from '@/app/(routes)/customer/process/YourMentor';
import CertificationSection from '@/app/(routes)/customer/process/CertificationSection';
import LeaderboardCard from '@/app/(routes)/customer/process/LeaderboardCard';
import UserProfileCard from '@/app/(routes)/customer/process/UserProfileCard';
import MyAssignmentCard from '@/app/(routes)/customer/process/MyAssignmentCard';

interface Course {
    _id: string;
    title: string;
    description: string;
    price: number;
    author: {
        fullName: string;
    };
    category: string;
    createdAt: string;
    enrolledCount: number;
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

export default function Process() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [enrollCourse, setEnrollCourse] = useState<Course[]>([]);

    const fetchUserDetail = async () => {
        try {
            const userId = localStorage.getItem('user');
            if (!userId) {
                toast({
                    title: 'Lỗi',
                    description: 'Bạn cần đăng nhập để xem thông tin chi tiết',
                    variant: 'destructive',
                });
                router.push('/login');
                return;
            }
            const user = JSON.parse(userId);
            const id = user.id;

            const userDetail = await getUserDetail(id);
            setEnrollCourse(userDetail.metadata?.enrolledCourses || []);
            console.log(`User detail for ID ${id}:`, userDetail);

            setUser(userDetail.metadata);
        } catch (error) {
            console.error('❌ Error fetching user details:', error);
            toast({
                title: 'Lỗi',
                description: 'Không thể lấy thông tin người dùng',
                variant: 'destructive',
            });
        }
    };

    useEffect(() => {
        fetchUserDetail();
    }, []);

    return (
        <div className="container mx-auto bg-[#EEF1EF] dark:bg-gray-900 px-4 py-8 transition-colors duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-8">
                    <CourseInProgress enrollCourse={enrollCourse} />
                    <UpcomingAssignment />
                    <ContinueWatching />
                    <YourMentor />
                    <CertificationSection />
                </div>

                <div className="space-y-6">
                    <UserProfileCard user={user} />
                    <LeaderboardCard />
                    <MyAssignmentCard />
                </div>
            </div>
        </div>
    );
}
