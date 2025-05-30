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
    CarouselApi,
} from '@/components/ui/carousel';
import { GetProgress } from '@/lib/services/api/progress';

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

const HomePage = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [showChat, setShowChat] = useState(false);
    const [courseProgress, setCourseProgress] = useState<{ [courseId: string]: number }>({});
    const [api, setApi] = useState<CarouselApi | null>(null);

    const fetchProgress = async (courseId: string) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Authentication token is missing');
            }
            const response = await GetProgress(token, courseId);
            console.log(`Progress response for course ${courseId}:`, response);
            const progress = response.metadata?.progress ?? 0;
            return progress;
        } catch (error) {
            console.error(`Error fetching progress for course ${courseId}:`, error);
            return 0;
        }
    };

    const fetchCategories = async () => {
        try {
            const data = await GetAllCategory(1, 100);
            setCategories(data?.metadata?.categories || []);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const limit = 10;
            const data: ApiResponse = await GetCourses(1, limit);
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

                const progressPromises = parsedCourses.map(async (course) => {
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
        } catch (error: unknown) {
            console.error('Error fetching courses:', error);
            setCourses([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (categories.length > 0) {
            fetchCourses();
        }
    }, [categories]);

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

    const handleCarouselPrevious = () => {
        if (api) {
            api.scrollPrev();
        }
    };

    const handleCarouselNext = () => {
        if (api) {
            api.scrollNext();
        }
    };

    return (
        <div className="w-full bg-[var(--sidebar-background)] text-[var(--sidebar-foreground)] relative">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-10">
                <div className="md:col-span-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h3 className="text-4xl mb-5 font-bold text-[#657ED4] dark:text-[#5AD3AF] cursor-default">
                                Welcome back, customer
                            </h3>
                            <p className="text-base mb-2 font-medium text-gray-900 dark:text-gray-300 cursor-default">
                                Solve coding exercises and get mentored to develop fluency in your
                                chosen programming languages
                            </p>
                        </div>
                    </div>
                    <div className="font-bold text-xl mt-5 mb-3 text-gray-900 dark:text-gray-100 cursor-default">
                        Where to start...
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-8">
                        {HOME_INTRODUCTION.map((item, index) => (
                            <Card
                                key={index}
                                className="shadow-sm bg-gray-100 dark:bg-gray-700 border-gray-100 dark:border-gray-700 rounded-xl"
                            >
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
                                    <p className="text-base font-medium text-gray-900 dark:text-gray-100 cursor-default">
                                        {item.name}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
                <div className="md:col-span-4">
                    <div className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100 cursor-default">
                        Your track
                    </div>
                    <div className="flex flex-row items-center">
                        <Image src={'/C.png'} width={40} height={40} alt="C" />
                        <div className="flex flex-col ml-4 text-xl">
                            <Progress
                                value={courses.length > 0 ? courseProgress[courses[0]._id] || 0 : 0}
                                className="w-[60%] bg-[#657ED4] dark:bg-[#5AD3AF]"
                            />
                            <div className="text-base font-medium text-gray-900 dark:text-gray-300 cursor-default">
                                {courses.length > 0
                                    ? `${courseProgress[courses[0]._id] || 0}% completed`
                                    : 'No progress available'}
                            </div>
                        </div>
                    </div>
                    <Card className="bg-gray-100 dark:bg-gray-700 border-none text-center mt-7 p-6 w-full max-w-sm mx-auto shadow-lg">
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
                        <CardContent className="bg-gray-100 dark:bg-gray-700">
                            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100 cursor-default">
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
            <Card className="bg-white dark:bg-gray-700 border-gray-100 dark:border-gray-700 rounded-xl">
                <CardHeader>
                    <CardTitle className="text-4xl font-bold mb-2 text-center my-3 text-[#657ED4] dark:text-[#5AD3AF] cursor-default">
                        All courses in CODEGROW
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#657ED4] dark:border-[#5AD3AF] cursor-default"></div>
                        </div>
                    ) : courses.length === 0 ? (
                        <div className="text-center text-gray-600 dark:text-gray-300 p-6 text-base font-medium cursor-default">
                            No courses available at the moment.
                        </div>
                    ) : (
                        <Carousel
                            setApi={setApi}
                            opts={{
                                align: 'start',
                                loop: true,
                            }}
                            className="w-full max-w-full px-4 sm:px-6 lg:px-8"
                        >
                            <CarouselContent className="-ml-4">
                                {courses.map((course, index) => (
                                    <CarouselItem
                                        key={index}
                                        className="pl-4 basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3"
                                    >
                                        <Card className="bg-white dark:bg-gray-600 shadow-sm h-full border-gray-100 dark:border-gray-700 rounded-xl flex flex-col">
                                            <CardHeader className="p-0">
                                                <div
                                                    className="relative w-full h-[200px] overflow-hidden"
                                                    style={{
                                                        backgroundImage: course.imgUrl
                                                            ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${course.imgUrl})`
                                                            : 'linear-gradient(to bottom, #657ED4, #4a5da0)',
                                                        backgroundColor: course.imgUrl
                                                            ? 'transparent'
                                                            : '#657ED4',
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center',
                                                    }}
                                                ></div>
                                            </CardHeader>
                                            <CardContent className="p-4 flex flex-col flex-grow gap-3 min-h-[200px]">
                                                <div className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-gray-100 cursor-default">
                                                    {course.title}
                                                </div>
                                                <div className="text-base font-medium text-gray-600 dark:text-gray-300 mt-2 line-clamp-3 h-14 cursor-default">
                                                    {course.description.length > 100
                                                        ? course.description.slice(0, 100) + '...'
                                                        : course.description}
                                                </div>
                                                <div className="mt-auto">
                                                    <Progress
                                                        value={courseProgress[course._id] || 0}
                                                        className="w-full bg-[#657ED4] dark:bg-[#5AD3AF]"
                                                    />
                                                    <div className="text-base font-medium text-gray-600 dark:text-gray-300 mt-1 cursor-default">
                                                        {courseProgress[course._id] || 0}% completed
                                                    </div>
                                                </div>
                                            </CardContent>
                                            <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-2 p-4 border-t border-gray-100 dark:border-gray-700">
                                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-base font-medium cursor-default">
                                                    <Image
                                                        src="/icons8-users-30.png"
                                                        width={24}
                                                        height={24}
                                                        alt="Learners"
                                                    />
                                                    {course.enrolledCount}
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-base font-medium cursor-default">
                                                    <Image
                                                        src="/tag.png"
                                                        width={24}
                                                        height={24}
                                                        alt="Tag"
                                                    />
                                                    {typeof course.category === 'object'
                                                        ? course.category.name
                                                        : 'Uncategorized'}
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-base font-medium cursor-default">
                                                    <Image
                                                        src="/dollar.png"
                                                        width={24}
                                                        height={24}
                                                        alt="Dollar"
                                                    />
                                                    ${course.price.toFixed(2)}
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious
                                className="hidden md:flex rounded-full border-[#657ED4] dark:border-[#5AD3AF] text-[#657ED4] dark:text-[#5AD3AF] hover:bg-[#657ED4] dark:hover:bg-[#5AD3AF] hover:text-white dark:hover:text-black cursor-pointer"
                                onClick={handleCarouselPrevious}
                            />
                            <CarouselNext
                                className="hidden md:flex rounded-full border-[#657ED4] dark:border-[#5AD3AF] text-[#657ED4] dark:text-[#5AD3AF] hover:bg-[#657ED4] dark:hover:bg-[#5AD3AF] hover:text-white dark:hover:text-black cursor-pointer"
                                onClick={handleCarouselNext}
                            />
                        </Carousel>
                    )}
                </CardContent>
                <CardFooter className="flex justify-center dark:border-gray-700 py-6">
                    <Link href="/customer/courses" legacyBehavior>
                        <Button className="text-center px-6 py-3 bg-[#657ED4] dark:bg-[#5AD3AF] hover:bg-[#424c70] dark:hover:bg-[#4ac2a0] text-white text-base font-semibold transition-colors duration-300 cursor-pointer">
                            View all courses
                        </Button>
                    </Link>
                </CardFooter>
            </Card>

            <div className="mt-8">
                <h3 className="text-center font-bold text-4xl mb-6 text-[#657ED4] dark:text-[#5AD3AF] cursor-default">
                    What you get from CODEGROW
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {/* Structured Courses */}
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl shadow-sm p-6 hover:shadow-md transition duration-300 border-gray-100 dark:border-gray-700">
                        <div className="relative w-full h-[140px] mb-4">
                            <Image
                                src="/structured_courses.png" // Ensure this image exists in the public directory
                                alt="Structured Courses"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100 cursor-default">
                            STRUCTURED COURSES
                        </div>
                        <p className="text-base text-gray-500 dark:text-gray-300 leading-relaxed font-medium cursor-default">
                            Our courses are carefully designed to provide a clear and systematic
                            learning path, ensuring you build skills step-by-step from beginner to
                            advanced levels.
                        </p>
                    </div>

                    {/* Personalized Mentorship */}
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl shadow-sm p-6 hover:shadow-md transition duration-300 border-gray-100 dark:border-gray-700">
                        <div className="relative w-full h-[140px] mb-4">
                            <Image
                                src="/mentorship.png" // Ensure this image exists in the public directory
                                alt="Personalized Mentorship"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100 cursor-default">
                            PERSONALIZED MENTORSHIP
                        </div>
                        <p className="text-base text-gray-500 dark:text-gray-300 leading-relaxed font-medium cursor-default">
                            Receive one-on-one guidance from expert mentors who tailor their advice
                            to your learning needs, helping you overcome challenges and achieve your
                            goals.
                        </p>
                    </div>

                    {/* Hands-On Exercises */}
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl shadow-sm p-6 hover:shadow-md transition duration-300 border-gray-100 dark:border-gray-700">
                        <div className="relative w-full h-[140px] mb-4">
                            <Image
                                src="/exercises.png" // Ensure this image exists in the public directory
                                alt="Hands-On Exercises"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100 cursor-default">
                            HANDS-ON EXERCISES
                        </div>
                        <p className="text-base text-gray-500 dark:text-gray-300 leading-relaxed font-medium cursor-default">
                            Practice what you learn with real-world coding exercises, designed to
                            reinforce your knowledge and build practical skills through active
                            learning.
                        </p>
                    </div>

                    {/* Community Support */}
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl shadow-sm p-6 hover:shadow-md transition duration-300 border-gray-100 dark:border-gray-700">
                        <div className="relative w-full h-[140px] mb-4">
                            <Image
                                src="/community.png" // Ensure this image exists in the public directory
                                alt="Community Support"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100 cursor-default">
                            COMMUNITY SUPPORT
                        </div>
                        <p className="text-base text-gray-500 dark:text-gray-300 leading-relaxed font-medium cursor-default">
                            Join a vibrant community of learners and mentors to share knowledge, ask
                            questions, and get support, ensuring you never feel alone on your
                            learning journey.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
