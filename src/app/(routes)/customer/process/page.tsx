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
import { motion } from 'framer-motion';

interface Category {
    _id: string;
    name: string;
}

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

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Process() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [enrollCourse, setEnrollCourse] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUserDetail = async () => {
        try {
            setIsLoading(true);
            const userId = localStorage.getItem('user');
            if (!userId) {
                toast({
                    title: 'Lỗi',
                    description: 'Bạn cần đăng nhập để xem thông tin chi tiết',
                    variant: 'destructive',
                    className: 'bg-[#F76F8E] text-white dark:text-black',
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
                className: 'bg-[#F76F8E] text-white dark:text-black',
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserDetail();
    }, []);

    if (isLoading) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
            >
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Loading your learning dashboard...
                    </p>
                </motion.div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 sm:px-6 md:px-12 lg:px-24 py-12 transition-colors duration-300"
        >
            <div className="max-w-8xl mx-auto">
                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-3xl md:text-4xl font-bold text-[#657ED4] dark:text-[#5AD3AF] mb-8 flex items-center gap-2"
                >
                    Learning Dashboard
                </motion.h1>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    <motion.div variants={itemVariants} className="md:col-span-2 space-y-8">
                        <motion.div variants={itemVariants}>
                            <CourseInProgress enrollCourse={enrollCourse} />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <UpcomingAssignment />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <ContinueWatching />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <YourMentor />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <CertificationSection />
                        </motion.div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-6">
                        <motion.div variants={itemVariants}>
                            <UserProfileCard user={user} />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <LeaderboardCard />
                        </motion.div>

                        {user && (
                            <motion.div variants={itemVariants}>
                                <MyAssignmentCard user={user} />
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
}
