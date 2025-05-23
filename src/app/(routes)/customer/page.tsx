'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { HOME_INTRODUCTION } from '@/lib/enum/home/Introduction';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { GetCourses } from '@/lib/services/course/getcourse';
import { GetAllCategory } from '@/lib/services/category/getallcategory';
import { toast } from '@/components/ui/use-toast';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from '@/components/ui/carousel';
import { BookOpen, X } from 'lucide-react'; // Added X icon for closing chat
import ChatRealtime from './chatrealtime/page';

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

const HomePage = () => {
    const [progress, setProgress] = useState<number>(13);
    const [courses, setCourses] = useState<Course[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [showChat, setShowChat] = useState(false);

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const data = await GetAllCategory(1, 100);
            setCategories(data?.metadata?.categories || []);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            toast({
                title: 'Error',
                description: 'Failed to fetch categories',
                variant: 'destructive',
            });
        }
    };

    // Fetch courses using GetCourses API
    const fetchCourses = async () => {
        try {
            setLoading(true);
            const limit = 10; // Limit to 10 courses for the carousel
            const data: ApiResponse = await GetCourses(1, limit); // Fetch first page
            console.log('Fetched courses:', data);

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

                setCourses(parsedCourses);
            } else {
                throw new Error(
                    'No courses found. Please check your connection or try again later.',
                );
            }
        } catch (error: unknown) {
            console.error('Lỗi khi lấy khóa học:', error);
            toast({
                title: 'Lỗi',
                description:
                    error instanceof Error ? error.message : 'Không thể lấy danh sách khóa học',
                variant: 'destructive',
            });
            setCourses([]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch categories on mount
    useEffect(() => {
        fetchCategories();
    }, []);

    // Fetch courses only after categories are fetched
    useEffect(() => {
        if (categories.length > 0) {
            fetchCourses();
        }
    }, [categories]);

    // Progress effect
    useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 500);
        return () => clearTimeout(timer);
    }, []);

    // Toggle chat visibility
    const toggleChat = () => {
        setShowChat((prev) => !prev);
        if (!showChat) {
            toast({
                title: 'Chat Opened',
                description: 'You can now chat with a mentor to apply!',
                variant: 'default',
            });
        }
    };

    return (
        <div className=" w-full bg-[var(--sidebar-background)] text-[var(--sidebar-foreground)] relative">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-10">
                <div className="md:col-span-8">
                    <h3 className="text-3xl mb-3">Welcome back, customer</h3>
                    <p className="mb-2">
                        Solve coding exercises and get mentored to develop fluency in your chosen
                        programming languages.
                    </p>
                    <div className="font-bold text-[18px] mt-5 mb-3">Where to start...</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-8">
                        {HOME_INTRODUCTION.map((item, index) => (
                            <Card key={index} className="shadow-md bg-white dark:bg-gray-700">
                                <CardHeader className="flex justify-center">
                                    <div className="relative w-[100px] h-[100px]">
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
                                    <p className="text-[#657ED4] dark:text-blue-300 font-medium">
                                        {item.name}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
                <div className="md:col-span-4">
                    <div className="text-xl font-bold mb-4">Your track</div>
                    <div className="flex flex-row items-center">
                        <Image src={'/C.png'} width={40} height={40} alt="C" />
                        <div className="flex flex-col ml-4">
                            <Progress value={progress} className="w-[60%] bg-[#657ED4]" />
                            <div>{progress} exercises completed</div>
                        </div>
                    </div>
                    <Card className="bg-[#EEF1EF] dark:bg-gray-700 border-none text-center mt-7 p-6 w-full max-w-sm mx-auto shadow-lg">
                        <CardHeader className="flex justify-center">
                            <div className="relative w-[120px] h-[120px]">
                                <Image
                                    src="/mentor.png"
                                    alt="Mentor"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <h2 className="text-xl font-bold mb-2">Become a mentor</h2>
                            <p className="text-[#657ED4] dark:text-blue-300 mb-6 text-sm">
                                Mentoring is a great way to reinforce your own learning, and help
                                students learn and discover the things they don’t know.
                            </p>
                            <div className="flex justify-center gap-4">
                                <Button
                                    className="bg-[#5AD3AF] hover:bg-[#4ac2a0] text-white font-semibold px-6"
                                    onClick={toggleChat}
                                >
                                    {showChat ? 'Close Chat' : 'Apply'}
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-[#657ED4] text-[#657ED4] dark:text-blue-300 dark:border-blue-300 px-6 hover:bg-[#EEF1EF] dark:hover:bg-gray-600"
                                >
                                    Read
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Card className="dark:bg-gray-700">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold mb-2 text-center my-3">
                        All courses in CODEGROW
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : courses.length === 0 ? (
                        <div className="text-center text-gray-600 dark:text-gray-400 p-6">
                            Không có khóa học nào hiện tại.
                        </div>
                    ) : (
                        <Carousel
                            opts={{
                                align: 'start',
                                loop: true,
                            }}
                            className="w-full max-w-full"
                        >
                            <CarouselContent className="-ml-4">
                                {courses.map((course, index) => (
                                    <CarouselItem
                                        key={index}
                                        className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                                    >
                                        <Card className="bg-white dark:bg-gray-600 shadow-md h-full">
                                            <CardHeader>
                                                <div className="relative w-full h-[200px]">
                                                    <Image
                                                        src="/courses.png" // Placeholder; update with course-specific image if available
                                                        alt={course.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-[#5AD3AF] dark:text-green-400 text-2xl flex items-center gap-2">
                                                    <BookOpen className="w-6 h-6" />
                                                    {course.title}
                                                </div>
                                                <div className="text-[#657ED4] dark:text-blue-300 text-sm mt-2">
                                                    {course.description}
                                                </div>
                                            </CardContent>
                                            <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-2">
                                                <div className="flex items-center gap-2">
                                                    <Image
                                                        src="/learners.png"
                                                        width={30}
                                                        height={30}
                                                        alt="Learners"
                                                    />
                                                    {course.enrolledCount}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Image
                                                        src="/tag.png"
                                                        width={30}
                                                        height={30}
                                                        alt="Tag"
                                                    />
                                                    {typeof course.category === 'object'
                                                        ? course.category.name
                                                        : 'Uncategorized'}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Image
                                                        src="/dollar.png"
                                                        width={30}
                                                        height={30}
                                                        alt="Dollar"
                                                    />
                                                    ${course.price.toFixed(2)}
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="hidden md:flex" />
                            <CarouselNext className="hidden md:flex" />
                        </Carousel>
                    )}
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Link href="/customer/courses" legacyBehavior>
                        <Button className="text-center p-3 bg-[#5AD3AF] hover:bg-[#4ac2a0] text-white text-xl transition-colors duration-300">
                            View all courses
                        </Button>
                    </Link>
                </CardFooter>
            </Card>

            {/* Chat Realtime Overlay */}
            {showChat && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-4 relative">
                        <Button
                            variant="ghost"
                            className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
                            onClick={toggleChat}
                        >
                            <X className="w-6 h-6" />
                        </Button>
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                            Mentor Application Chat
                        </h3>
                        <ChatRealtime />
                    </div>
                </div>
            )}

            <div className="mt-8">
                <h3 className="text-center font-bold text-2xl mb-6">What you get from CODEGROW</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {['1', '2', '3', '4'].map((_, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-700 rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300"
                        >
                            <div className="relative w-full h-[140px] mb-4">
                                <Image
                                    src="/learning_path.png"
                                    alt="Learning Path"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="text-[#657ED4] dark:text-blue-300 font-bold mb-3 text-lg">
                                GOOD LEARNING PATH
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                The learning path is designed methodically, in detail, and in
                                accordance with learning goals. A good roadmap will help make
                                learning effective, not wasteful, not going down the wrong path, and
                                wherever you learn, it will be useful.
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
