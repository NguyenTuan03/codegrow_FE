'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
} from '@/components/ui/pagination';
import { Users, BookOpen, Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { GetCourses } from '@/lib/services/course/getcourse';
import { GetAllCategory } from '@/lib/services/category/getallcategory';

export default function CoursesPage() {
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
        lessons: number;
        rating?: number;
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

    const [courses, setCourses] = useState<Course[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 8;
    const router = useRouter();

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

    const fetchCourses = async (page: number = 1) => {
        try {
            setLoading(true);
            const data: ApiResponse = await GetCourses(page, limit);

            if (data?.metadata?.courses && data.metadata.courses.length > 0) {
                const parsedCourses = data.metadata.courses.map((course: Course) => {
                    let categoryObj = categories.find((cat) => cat._id === course.category);
                    if (!categoryObj && typeof course.category === 'object') {
                        categoryObj = course.category as Category;
                    }
                    return {
                        ...course,
                        category: categoryObj || { _id: '', name: 'Uncategorized' },
                        rating: Math.floor(Math.random() * 2) + 3 + Math.random(), // Random rating 3-5 for demo
                    };
                });

                setCourses(parsedCourses);
                setCurrentPage(data.metadata.page);
                setTotalPages(data.metadata.totalPages);
            } else {
                throw new Error(
                    'No courses found. Please check your connection or try again later.',
                );
            }
        } catch (error: unknown) {
            console.error('Failed to fetch courses:', error);
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to fetch courses',
                variant: 'destructive',
            });
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
            fetchCourses(currentPage);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, categories]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="p-4 md:p-8 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white tracking-tight">
                            Explore Our Courses
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Learn new skills with our expert instructors
                        </p>
                    </div>
                    <div className="w-full md:w-auto">
                        {/* Search or filter can be added here */}
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <Card key={i} className="overflow-hidden">
                                <Skeleton className="h-40 w-full" />
                                <CardContent className="p-4 space-y-3">
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-1/2" />
                                </CardContent>
                                <CardFooter className="p-4">
                                    <Skeleton className="h-12 w-full rounded-lg" />
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <>
                        {courses.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="mx-auto w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                                    <BookOpen className="w-12 h-12 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">
                                    No courses available
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                                    We couldnt find any courses matching your criteria. Please check
                                    back later.
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {courses.map((course) => (
                                        <Card
                                            key={course._id}
                                            className="hover:shadow-lg transition-all duration-300 overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg flex flex-col h-full"
                                        >
                                            <div className="relative">
                                                <div className="h-40 bg-gradient-to-r from-[#e6fcf6] to-[#d0f7eb] dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                                                    <Badge className="absolute top-2 left-2 bg-[#657ED4] hover:bg-[#657ED4] text-white dark:bg-[#657ED4] dark:hover:bg-[#657ED4] px-3 py-1 text-sm rounded-md shadow-sm">
                                                        {typeof course.category === 'object'
                                                            ? course.category.name
                                                            : 'Uncategorized'}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <CardHeader className="p-4 pb-2">
                                                <h4 className="font-semibold text-lg line-clamp-2 text-gray-800 dark:text-white">
                                                    {course.title}
                                                </h4>
                                            </CardHeader>
                                            <CardContent className="p-4 pt-0 flex-1">
                                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                                                    {course.description}
                                                </p>
                                                <div className="flex items-center justify-between mb-3">
                                                    <span className="font-bold text-[#657ED4] dark:text-[#657ED4] text-lg">
                                                        ${course.price.toFixed(2)}
                                                    </span>
                                                    <div className="flex items-center space-x-1">
                                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                            {course.rating?.toFixed(1) || '4.5'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                                    <div className="flex items-center">
                                                        <Users className="h-4 w-4 mr-1 text-[#5AD3AF] dark:text-[#5AD3AF]" />
                                                        <span>{course.enrolledCount}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <BookOpen className="h-4 w-4 mr-1 text-[#5AD3AF] dark:text-[#5AD3AF]" />
                                                        <span>{course.lessons} lessons</span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                            <CardFooter className="p-4 pt-0">
                                                <Button
                                                    variant="default"
                                                    size="lg"
                                                    className="w-full bg-[#5AD3AF] hover:bg-[#4ac2a0] text-white dark:bg-[#5AD3AF] dark:hover:bg-[#4ac2a0] text-base py-5 rounded-lg transition-colors duration-200 transform hover:scale-[1.02]"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        router.push(
                                                            `/customer/courses/${course._id}`,
                                                        );
                                                    }}
                                                >
                                                    Enroll Now
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="mt-12 flex justify-center">
                                        <Pagination>
                                            <PaginationContent>
                                                <PaginationItem>
                                                    <PaginationPrevious
                                                        onClick={() =>
                                                            handlePageChange(currentPage - 1)
                                                        }
                                                        className={
                                                            currentPage === 1
                                                                ? 'pointer-events-none opacity-50'
                                                                : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700'
                                                        }
                                                    />
                                                </PaginationItem>
                                                {Array.from(
                                                    { length: totalPages },
                                                    (_, i) => i + 1,
                                                ).map((page) => (
                                                    <PaginationItem key={page}>
                                                        <PaginationLink
                                                            onClick={() => handlePageChange(page)}
                                                            isActive={currentPage === page}
                                                            className={
                                                                currentPage === page
                                                                    ? 'bg-[#5AD3AF] text-white hover:bg-[#4ac2a0]'
                                                                    : 'cursor-pointer text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                                                            }
                                                        >
                                                            {page}
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                ))}
                                                <PaginationItem>
                                                    <PaginationNext
                                                        onClick={() =>
                                                            handlePageChange(currentPage + 1)
                                                        }
                                                        className={
                                                            currentPage === totalPages
                                                                ? 'pointer-events-none opacity-50'
                                                                : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700'
                                                        }
                                                    />
                                                </PaginationItem>
                                            </PaginationContent>
                                        </Pagination>
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
