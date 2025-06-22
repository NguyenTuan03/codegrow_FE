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
} from '@/components/ui/pagination'; // Import pagination components

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
    totalLessons?: number; // Hypothetical total lessons
    totalQuizzes?: number; // Hypothetical total quizzes
}

interface Category {
    _id: string;
    name: string;
}

interface ProgressResponse {
    message: string;
    status: number;
    metadata: {
        progress?: number;
        completedLessons: string[]; // Array of completed lesson IDs
        completedQuizzes: string[]; // Array of completed quiz IDs
    };
}

interface CourseInProgressProps {
    enrollCourse: Course[];
}

export default function CourseInProgress({ enrollCourse }: CourseInProgressProps) {
    const [progressData, setProgressData] = useState<{ [key: string]: number }>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState(1); // State for current page
    const [itemsPerPage] = useState(3); // Number of items per page
    const router = useRouter();

    const fetchProgress = async (courseId: string, course: Course) => {
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
                return { courseId, progress: 0 };
            }
            const tokenuser = JSON.parse(token);

            console.log('[04:12 PM +07, 22/06/2025] Token:', tokenuser);
            const userId = localStorage.getItem('user');
            if (!userId) {
                throw new Error('User ID not found in localStorage');
            }
            const user = JSON.parse(userId);
            const id = user.id;
            const response: ProgressResponse = await GetProgress(tokenuser, courseId, id);
            console.log('[04:12 PM +07, 22/06/2025] Progress response:', response);

            const { completedLessons = [], completedQuizzes = [] } = response.metadata || {};
            const totalLessons = course.totalLessons || 0;
            const totalQuizzes = course.totalQuizzes || 0;
            const totalItems = totalLessons + totalQuizzes;
            const completedItems = completedLessons.length + completedQuizzes.length;
            const calculatedProgress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

            return { courseId, progress: calculatedProgress };
        } catch (error) {
            console.error(
                `[04:12 PM +07, 22/06/2025] Error fetching progress for course ${courseId}:`,
                error,
            );
            toast({
                title: 'Error',
                description: 'Failed to load course progress. Please try again later.',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black',
            });
            return { courseId, progress: 0 };
        }
    };

    useEffect(() => {
        const loadProgress = async () => {
            setLoading(true);
            const progressPromises = enrollCourse.map((course) =>
                fetchProgress(course._id, course),
            );
            const results = await Promise.all(progressPromises);
            const progressMap = results.reduce(
                (acc, { courseId, progress }) => {
                    acc[courseId] = progress;
                    return acc;
                },
                {} as { [key: string]: number },
            );
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
                        const progress = progressData[course._id] ?? 0;
                        const statusText = progress === 0 ? 'Not Started' : `${progress}% Complete`;

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
                                            {progress}%
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
                                                    : 'Continue Course'}
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
