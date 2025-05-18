'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
} from '@/components/ui/pagination';
import { Users } from 'lucide-react';

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

    // Fetch all categories once
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

    // Fetch courses and map category ID to category object
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
        <div className="p-10 py-8 min-h-screen bg-gradient-to-b from-[#e6fcf6] to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-extrabold text-[#5AD3AF] dark:text-[#5AD3AF] tracking-tight">
                    Courses
                </h1>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5AD3AF]"></div>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {courses.length === 0 ? (
                            <div className="text-center text-[#657ED4] dark:text-blue-300 col-span-full">
                                No courses available at the moment.
                            </div>
                        ) : (
                            courses.map((course) => (
                                <Card
                                    key={course._id}
                                    className="hover:shadow-xl transition-shadow overflow-hidden bg-white dark:bg-gray-800 border-2 border-[#5AD3AF] dark:border-blue-300 rounded-2xl flex flex-col"
                                >
                                    <div className="h-36 bg-[#e6fcf6] dark:bg-gray-700 flex items-center justify-center">
                                        <Badge className="bg-[#657ED4] text-white dark:bg-blue-300 dark:text-gray-900 px-4 py-2 text-base rounded-full shadow">
                                            {typeof course.category === 'object'
                                                ? course.category.name
                                                : 'Uncategorized'}
                                        </Badge>
                                    </div>
                                    <CardContent className="p-5 flex-1 flex flex-col">
                                        <h4 className="font-bold mb-2 text-[#5AD3AF] dark:text-[#5AD3AF] text-lg line-clamp-1">
                                            {course.title}
                                        </h4>
                                        <p className="text-sm text-[#657ED4] dark:text-blue-300 mb-4 line-clamp-2">
                                            {course.description}
                                        </p>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="font-bold text-[#657ED4] dark:text-blue-300 text-lg">
                                                ${course.price}
                                            </span>
                                            <Badge className="bg-[#5AD3AF] text-white dark:bg-blue-300 dark:text-gray-900 px-3 py-1 rounded">
                                                {new Date(course.createdAt).toLocaleDateString()}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-auto">
                                            <Users className="h-4 w-4 mr-1 text-[#5AD3AF]" />
                                            <span>{course.enrolledCount} students enrolled</span>
                                            <span className="mx-2">|</span>
                                            <span>{course.lessons} lessons</span>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full border-[#657ED4] text-[#657ED4] dark:text-blue-300 dark:border-blue-300 px-6 hover:bg-[#EEF1EF] dark:hover:bg-gray-600 font-semibold transition-colors"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                router.push(`/customer/courses/${course._id}`);
                                            }}
                                        >
                                            View Details
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-12 flex justify-center">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            className={
                                                currentPage === 1
                                                    ? 'pointer-events-none opacity-50'
                                                    : 'cursor-pointer'
                                            }
                                        />
                                    </PaginationItem>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                        (page) => (
                                            <PaginationItem key={page}>
                                                <PaginationLink
                                                    onClick={() => handlePageChange(page)}
                                                    isActive={currentPage === page}
                                                    className={
                                                        currentPage === page
                                                            ? 'bg-[#5AD3AF] text-white'
                                                            : 'cursor-pointer text-[#657ED4] dark:text-blue-300'
                                                    }
                                                >
                                                    {page}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ),
                                    )}
                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            className={
                                                currentPage === totalPages
                                                    ? 'pointer-events-none opacity-50'
                                                    : 'cursor-pointer'
                                            }
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
