'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { HOME_INTRODUCTION } from '@/lib/enum/home/Introduction';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { GetCourses } from '@/lib/services/course/getcourse';
import { GetAllCategory } from '@/lib/services/category/getallcategory';
import { toast } from '@/components/ui/use-toast';
import { GetProgress } from '@/lib/services/api/progress';
import { getUserDetail } from '@/lib/services/admin/getuserdetail';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Category {
    _id: string;
    name: string;
}

interface Course {
    _id: string;
    title: string;
    description: string;
    price: number;
    enrolledCount: number;
    author: { _id: string; fullName: string; email: string; role: string };
    category: string | Category;
    createdAt: string;
    imgUrl?: string;
}

interface ApiResponse {
    message: string;
    status: number;
    metadata: {
        courses: Course[];
        page: number;
        totalPages: number;
    };
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

interface ProgrammingSkill {
    name: string;
    icon: string;
}

const HomePage = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [showChat, setShowChat] = useState(false);
    const [courseProgress, setCourseProgress] = useState<{ [courseId: string]: number }>({});
    const [user, setUser] = useState<User | null>(null);

    const benefitsRef = useRef(null);
    const skillsRef = useRef(null);
    const achievementsRef = useRef(null);
    const benefitsInView = useInView(benefitsRef, { once: true, margin: '0px 0px -50px 0px' });
    const skillsInView = useInView(skillsRef, { once: true, margin: '0px 0px -50px 0px' });
    const achievementsInView = useInView(achievementsRef, {
        once: true,
        margin: '0px 0px -50px 0px',
    });

    const fetchProgress = async (courseId: string) => {
        try {
            const token = localStorage.getItem('token');
            console.log('Token user:', token);
            if (!token) {
                toast({
                    title: 'Lỗi',
                    description: 'Token không tồn tại. Vui lòng đăng nhập lại.',
                    variant: 'destructive',
                    className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
                });
                return 0;
            }
            const tokenuser = JSON.parse(token);

            const userId = localStorage.getItem('user');
            if (!userId) {
                throw new Error('User ID not found in localStorage');
            }
            const user = JSON.parse(userId);
            const id = user.id;
            const progressData = await GetProgress(tokenuser, courseId, id);
            console.log('progressData', progressData);

            if (progressData?.status === 200 && progressData.metadata) {
                return progressData.metadata.progress || 0;
            }
            return 0;
        } catch (error) {
            console.log(`Error fetching progress for course ${courseId}:`, error);
            return 0;
        }
    };

    const fetchCategories = async () => {
        try {
            const data = await GetAllCategory(1, 100);
            setCategories(data?.metadata?.categories || []);
        } catch (error) {
            console.log('Failed to fetch categories:', error);
        }
    };

    const fetchCourses = async () => {
        try {
            const limit = 10;
            const data: ApiResponse = await GetCourses(1, limit);
            if (data?.metadata?.courses && data.metadata.courses.length > 0) {
                const parsedCourses = data.metadata.courses.map((course: Course) => {
                    let categoryObj = categories.find((cat) => cat._id === course.category);
                    if (!categoryObj && typeof course.category === 'object') {
                        categoryObj = course.category as Category;
                    }
                    return {
                        ...course,
                        category: categoryObj || { _id: '', name: 'Uncategorized' },
                    };
                });

                const progressPromises = parsedCourses
                    .filter((course) => user?.enrolledCourses.some((ec) => ec._id === course._id))
                    .map(async (course) => {
                        const progress = await fetchProgress(course._id);
                        return { courseId: course._id, progress };
                    });

                const progressResults = await Promise.all(progressPromises);
                const progressMap = progressResults.reduce(
                    (acc, { courseId, progress }) => {
                        acc[courseId] = progress;
                        return acc;
                    },
                    {} as { [courseId: string]: number },
                );

                setCourseProgress(progressMap);
            } else {
                throw new Error(
                    'No courses found. Please check your connection or try again later.',
                );
            }
        } catch (error) {
            console.log('Error fetching courses:', error);
        }
    };

    const fetchUserDetail = async () => {
        try {
            const userId = localStorage.getItem('user');
            if (!userId) {
                setUser(null);
                return;
            }
            const user = JSON.parse(userId);
            const id = user._id;
            const userDetail = await getUserDetail(id);
            setUser(userDetail.metadata);
        } catch (error) {
            console.log('Error fetching user detail:', error);
            setUser(null);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchUserDetail();
    }, []);

    useEffect(() => {
        if (categories.length > 0 && user) {
            fetchCourses();
        }
    }, [categories, user]);

    const toggleChat = () => {
        setShowChat((prev) => !prev);
        if (!showChat) {
            toast({
                title: 'Chat Opened',
                description: 'You can now chat with a mentor to apply!',
                variant: 'default',
                className: 'bg-[#5AD3AF] text-black font-medium p-4 rounded-lg shadow-md',
            });
        }
    };

    const programmingSkills: ProgrammingSkill[] = [
        { name: 'Python', icon: '/icons8-python-48.png' },
        { name: 'JavaScript', icon: '/icons8-javascript-96.png' },
        { name: 'Data Structures', icon: '/icons8-data-migration-48.png' },
        { name: 'React', icon: '/icons8-react-80.png' },
        { name: 'Java', icon: '/icons8-java-94.png' },
        { name: 'C++', icon: '/icons8-c-96.png' },
        { name: 'TypeScript', icon: '/icons8-typescript-24.png' },
        { name: 'Node.js', icon: '/icons8-node-js-48.png' },
        { name: 'SQL', icon: '/icons8-sql-48.png' },
    ];

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' as const } },
    };

    return (
        <div className="w-full bg-[var(--sidebar-background)] text-[var(--sidebar-foreground)] relative">
            <div className="grid grid-cols-1 md:grid-cols-12 mt-50 gap-4 mb-10">
                <div className="md:col-span-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h3 className="text-4xl mb-5 font-bold text-[#657ED4] dark:text-[#5AD3AF] cursor-default">
                                {user?.fullName
                                    ? `Welcome back, ${user.fullName}`
                                    : 'Welcome back, customer'}
                            </h3>
                            <p className="text-xl mb-2 font-medium text-gray-900 dark:text-gray-300 cursor-default inline-block break-words">
                                Solve coding exercises and get mentored to develop fluency in your
                                chosen programming languages
                            </p>
                        </div>
                    </div>
                    <div className="font-bold text-2xl mt-5 mb-3 text-gray-900 dark:text-gray-100 cursor-default">
                        Where to start...
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-8">
                        {HOME_INTRODUCTION.map((item, index) => (
                            <Card
                                key={index}
                                className="shadow-sm bg-gray-100 dark:bg-gray-700 border-gray-100 dark:border-gray-700 rounded-xl"
                            >
                                <CardHeader className="flex justify-center">
                                    <div className="relative w-[100px] h-[150px]">
                                        <Image
                                            src={item.img}
                                            alt="Courses"
                                            fill
                                            className="object-contain"
                                            priority={index < 2}
                                        />
                                    </div>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <p className="text-base font-medium text-gray-900 dark:text-gray-100 cursor-default">
                                        {item.name}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
                <div className="md:col-span-4">
                    <div className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 cursor-default">
                        Your track
                    </div>
                    {user && user.enrolledCourses.length > 0 ? (
                        user.enrolledCourses.map((course) => (
                            <div key={course._id} className="flex flex-col mb-4">
                                <div className="flex flex-row items-center">
                                    <Image
                                        src={course.imgUrl || '/C.png'}
                                        width={40}
                                        height={40}
                                        alt={course.title}
                                    />
                                    <div className="flex flex-col ml-4 text-xl w-full">
                                        <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                            {course.title}
                                        </span>
                                        <Progress
                                            value={courseProgress[course._id] || 0}
                                            className="w-[200px] bg-gray-200 dark:bg-gray-600 mt-2"
                                        />
                                        <div className="text-sm text-gray-900 dark:text-gray-300 cursor-default mt-1">
                                            {courseProgress[course._id] || 0}% completed
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-sm text-gray-600 dark:text-gray-400 cursor-default">
                            No enrolled courses yet. Start exploring courses!
                        </div>
                    )}
                    <Card className="bg-gray-100 dark:bg-gray-700 border-none text-center mt-7 p-6 w-full max-w-sm mx-auto shadow-lg">
                        <CardHeader className="flex justify-center">
                            <div className="relative w-[120px] h-[120px]">
                                <Image
                                    src="/becomementor.svg"
                                    alt="Mentor"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="bg-gray-100 dark:bg-gray-700">
                            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100 cursor-default">
                                Become a mentor
                            </h2>
                            <p className="text-base text-gray-500 dark:text-gray-300 mb-6 font-medium cursor-default">
                                Mentoring is a great way to reinforce your own learning, and help
                                students learn and discover the things they don’t know.
                            </p>
                            <div className="flex justify-center gap-4">
                                <Button
                                    className="bg-[#657ED4] dark:bg-[#5AD3AF] hover:bg-[#424c70] dark:hover:bg-[#4ac2a0] text-white font-semibold px-6 py-3 text-base cursor-pointer"
                                    onClick={toggleChat}
                                >
                                    {showChat ? 'Close Chat' : 'Apply'}
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-[#657ED4] dark:border-[#5AD3AF] text-[#657ED4] dark:text-[#5AD3AF] px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-black dark:hover:text-white font-semibold text-base cursor-pointer"
                                >
                                    Read
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <motion.div
                ref={benefitsRef}
                initial="hidden"
                animate={benefitsInView ? 'visible' : 'hidden'}
                variants={sectionVariants}
                className="mt-65 mb-15"
            >
                <h3 className="text-center font-bold text-4xl mb-6 text-[#657ED4] dark:text-[#5AD3AF] cursor-default">
                    What you get from CODEGROW
                </h3>
                <div className="grid mt-20 font-bold grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        {
                            title: 'STRUCTURED COURSES',
                            image: '/structurecourse.svg',
                            description:
                                'Our courses offer a clear, step-by-step learning path, guiding you from beginner to advanced levels with a systematic approach.',
                        },
                        {
                            title: 'PERSONALIZED MENTORSHIP',
                            image: '/undraw_professor_d7zn.svg',
                            description:
                                'Get one-on-one support from expert mentors, who customize their guidance to fit your unique learning needs and help you reach your goals.',
                        },
                        {
                            title: 'HANDS-ON EXERCISES',
                            image: '/undraw_mathematics_hc2c (1).svg',
                            description:
                                'Engage in practical coding exercises based on real-world scenarios, strengthening your skills through active, hands-on learning experiences.',
                        },
                        {
                            title: 'COMMUNITY SUPPORT',
                            image: '/undraw_conference-call_ccsp.svg',
                            description:
                                'Connect with a lively community of learners and mentors, where you can exchange ideas, seek help, and thrive with continuous support.',
                        },
                    ].map((item, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl shadow-sm p-6 hover:shadow-md transition duration-300 border-gray-100 dark:border-gray-700">
                                <div className="relative w-full h-[200px] mb-4">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <div className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100 cursor-default text-center">
                                    {item.title}
                                </div>
                                <p className="text-base text-gray-500 dark:text-gray-300 leading-relaxed font-medium cursor-default text-center">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <motion.div
                ref={skillsRef}
                initial="hidden"
                animate={skillsInView ? 'visible' : 'hidden'}
                variants={sectionVariants}
                className="mt-65 mb-6"
            >
                <h3 className="text-center font-bold mb-8 text-4xl text-[#657ED4] dark:text-[#5AD3AF] tracking-wide cursor-default">
                    RoadMap Programming Skills
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {programmingSkills.map((skill, index) => (
                        <motion.div key={`${skill.name}-${index}`} variants={itemVariants}>
                            <Link
                                href={`/customer/roadmap`}
                                className="bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4 h-16 flex items-center justify-start transition-all duration-300 hover:bg-gray-300 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-lg cursor-pointer"
                            >
                                <div className="relative w-10 h-10 mr-2 flex-shrink-0">
                                    <Image
                                        src={skill.icon || '/default-icon.svg'}
                                        alt={`${skill.name} icon`}
                                        width={40}
                                        height={40}
                                        className="object-contain"
                                        onError={(e) => (e.currentTarget.src = '/default-icon.svg')}
                                    />
                                </div>
                                <span className="dark:text-gray-100 font-medium text-base leading-tight cursor-default">
                                    {skill.name}
                                </span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
                <div className="flex justify-center mt-6 mb-8">
                    <Link href="/customer/roadmap">
                        <Button className="bg-[#657ED4] dark:bg-[#5AD3AF] hover:bg-[#424c70] dark:hover:bg-[#4ac2a0] text-white font-semibold px-6 py-3 text-base rounded-lg transition-colors duration-300 cursor-pointer">
                            Explore More
                        </Button>
                    </Link>
                </div>
            </motion.div>

            <motion.div
                ref={achievementsRef}
                initial="hidden"
                animate={achievementsInView ? 'visible' : 'hidden'}
                variants={sectionVariants}
                className="mt-65 mb-65"
            >
                <h3 className="text-center font-bold text-4xl mb-20 text-[#657ED4] dark:text-[#5AD3AF] cursor-default">
                    Our Achievements
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        {
                            title: 'Students Enrolled',
                            value: '100+',
                            image: '/undraw_graduation_u7uc (1).svg',
                        },
                        {
                            title: 'Courses Offered',
                            value: '50+',
                            image: '/undraw_teaching_58yg (1).svg',
                        },
                        {
                            title: 'Expert Mentors',
                            value: '20+',
                            image: '/undraw_experts_v2vy.svg',
                        },
                        {
                            title: 'Classes Completed',
                            value: '50+',
                            image: '/undraw_educator_6dgp.svg',
                        },
                    ].map((item, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl shadow-sm p-6 hover:shadow-md transition duration-300 border-gray-100 dark:border-gray-700">
                                <div className="relative w-full h-[140px] mb-4">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <div className="font-bold text-2xl mb-3 text-gray-900 dark:text-gray-100 cursor-default text-center">
                                    {item.value}
                                </div>
                                <p className="text-base text-gray-500 dark:text-gray-300 font-medium cursor-default text-center">
                                    {item.title}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default HomePage;
