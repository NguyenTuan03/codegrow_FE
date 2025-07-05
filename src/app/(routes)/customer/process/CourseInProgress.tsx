'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from '@/components/ui/use-toast';
import { GetProgress } from '@/lib/services/api/progress';
import { Progress } from '@/components/ui/progress';
import { BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
} from '@/components/ui/pagination';

interface Course {
    _id: string;
    title: string;
    description: string;
    price: number;
    author: {
        fullName: string;
    };
    category?: Category[] | Category | null;
    createdAt: string;
    enrolledCount: number;
    totalLessons?: number;
    totalQuizzes?: number;
}

interface Category {
    _id: string;
    name: string;
}

interface CourseProgress {
    [key: string]: {
        progress: number;
        completedLessons: { [key: string]: boolean };
        completedQuizzes: { [key: string]: boolean };
        lastLesson?: string | null;
    };
}

interface CourseInProgressProps {
    enrollCourse: Course[];
}

export default function CourseInProgress({ enrollCourse }: CourseInProgressProps) {
    const [progressData, setProgressData] = useState<CourseProgress>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);
    const router = useRouter();

    const fetchProgress = async (courseId: string) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast({
                    title: 'Lỗi',
                    description: 'Token không tồn tại. Vui lòng đăng nhập lại.',
                    variant: 'destructive',
                    className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
                });
                router.push('/login');
                return null;
            }
            const tokenuser = JSON.parse(token);

            const userId = localStorage.getItem('user');
            if (!userId) {
                toast({
                    title: 'Lỗi',
                    description: 'Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.',
                    variant: 'destructive',
                    className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
                });
                router.push('/login');
                return null;
            }
            const user = JSON.parse(userId);
            const id = user.id;

            const response = await GetProgress(tokenuser, id, courseId);

            if (response?.status === 200 && response.metadata) {
                const completedLessons =
                    response.metadata.completedLessons?.reduce(
                        (acc: { [key: string]: boolean }, lessonId: string) => ({
                            ...acc,
                            [lessonId]: true,
                        }),
                        {},
                    ) || {};

                const completedQuizzes =
                    response.metadata.completedQuizzes?.reduce(
                        (acc: { [key: string]: boolean }, quizId: string) => ({
                            ...acc,
                            [quizId]: true,
                        }),
                        {},
                    ) || {};

                return {
                    progress: response.metadata.progress || 0,
                    completedLessons,
                    completedQuizzes,
                    lastLesson: response.metadata.lastLesson || null,
                };
            }
            return {
                progress: 0,
                completedLessons: {},
                completedQuizzes: {},
                lastLesson: null,
            };
        } catch (error) {
            console.error(`Error fetching progress for course ${courseId}:`, error);
            if (error instanceof Error && error.message.includes('Phiên đăng nhập hết hạn')) {
                toast({
                    title: 'Lỗi',
                    description: 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.',
                    variant: 'destructive',
                    className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
                });
                router.push('/login');
            } else {
                toast({
                    title: 'Error',
                    description: 'Failed to load course progress. Please try again later.',
                    variant: 'destructive',
                    className: 'bg-[#F76F8E] text-white dark:text-black',
                });
            }
            return null;
        }
    };

    useEffect(() => {
        const loadProgress = async () => {
            setLoading(true);
            const progressMap: CourseProgress = {};

            for (const course of enrollCourse) {
                const progress = await fetchProgress(course._id);
                if (progress) {
                    progressMap[course._id] = progress;
                }
            }

            setProgressData(progressMap);
            setLoading(false);
        };

        if (enrollCourse.length > 0) {
            loadProgress();
        } else {
            setLoading(false);
        }
    }, [enrollCourse]);

    const renderCategories = (category: Course['category']) => {
        if (!category) return null;

        if (!Array.isArray(category)) {
            return (
                <Badge
                    variant="outline"
                    className="text-xs text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 rounded-full px-2 py-0.5"
                >
                    {category.name}
                </Badge>
            );
        }

        return category.map((cat) => (
            <Badge
                key={cat._id}
                variant="outline"
                className="text-xs text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 rounded-full px-2 py-0.5"
            >
                {cat.name}
            </Badge>
        ));
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCourses = enrollCourse.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(enrollCourse.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-[#657ED4] dark:text-[#5AD3AF]" />
                Course in Progress
            </h2>

            <div className="space-y-4">
                {loading ? (
                    <div className="text-gray-600 dark:text-gray-400 text-sm text-center py-4">
                        Loading course progress...
                    </div>
                ) : currentCourses.length > 0 ? (
                    currentCourses.map((course) => {
                        const courseProgress = progressData[course._id] || {
                            progress: 0,
                            completedLessons: {},
                            completedQuizzes: {},
                            lastLesson: null,
                        };
                        const progress = courseProgress.progress ?? 0;
                        const statusText =
                            progress === 0 ? 'Not Started' : `${Math.round(progress)}% Complete`;

                        return (
                            <Card
                                key={course._id}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-xl hover:border-[#657ED4] dark:hover:border-[#5AD3AF]"
                            >
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 line-clamp-1">
                                                {course.title}
                                            </h3>
                                            {renderCategories(course.category)}
                                        </div>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {statusText}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 mb-3">
                                        <Progress
                                            value={progress}
                                            className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full [&_.progress-indicator]:bg-[#657ED4] dark:[&_.progress-indicator]:bg-[#5AD3AF]"
                                        />
                                        <span className="text-xs text-gray-600 dark:text-gray-300">
                                            {Math.round(progress)}%
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Badge
                                                variant="outline"
                                                className="text-xs text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 rounded-full px-2 py-0.5"
                                            >
                                                PRACTICE
                                            </Badge>
                                            <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                                                {course.description}
                                            </div>
                                        </div>
                                        <Link href={`/customer/courses/${course._id}`}>
                                            <Button className="bg-[#657ED4] cursor-pointer dark:bg-[#5AD3AF] hover:bg-[#4a5da0] dark:hover:bg-[#4ac2a0] text-white rounded-full px-4 py-2 text-xs transition-all duration-200 shadow-sm">
                                                {progress === 0
                                                    ? 'Start Course'
                                                    : courseProgress.lastLesson
                                                      ? 'Continue Course'
                                                      : 'View Course'}
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })
                ) : (
                    <div className="text-gray-600 dark:text-gray-400 text-sm text-center py-4 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                        No courses enrolled yet.
                    </div>
                )}
            </div>

            {/* Pagination */}
            {enrollCourse.length > itemsPerPage && (
                <div className="mt-6 flex justify-center">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    className={
                                        currentPage === 1
                                            ? 'pointer-events-none opacity-50 cursor-not-allowed'
                                            : 'cursor-pointer text-[#657ED4] dark:text-[#5AD3AF] hover:text-[#4a5da0] dark:hover:text-[#4ac2a0] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all'
                                    }
                                />
                            </PaginationItem>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <PaginationItem key={page}>
                                    <PaginationLink
                                        onClick={() => handlePageChange(page)}
                                        isActive={currentPage === page}
                                        className={
                                            currentPage === page
                                                ? 'bg-[#657ED4] dark:bg-[#5AD3AF] text-white hover:bg-[#4a5da0] dark:hover:bg-[#4ac2a0] rounded-lg font-medium'
                                                : 'cursor-pointer text-[#657ED4] dark:text-[#5AD3AF] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all'
                                        }
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    className={
                                        currentPage === totalPages
                                            ? 'pointer-events-none opacity-50 cursor-not-allowed'
                                            : 'cursor-pointer text-[#657ED4] dark:text-[#5AD3AF] hover:text-[#4a5da0] dark:hover:text-[#4ac2a0] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all'
                                    }
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </section>
    );
}
