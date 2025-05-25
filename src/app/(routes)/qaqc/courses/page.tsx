'use client';

import { useEffect, useState, useCallback } from 'react';
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
import { Users, Star } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { GetCourses } from '@/lib/services/course/getcourse';
import { GetAllCategory } from '@/lib/services/category/getallcategory';

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
    category: Category;
    createdAt: string;
    lessons: number;
    status?: 'published' | 'draft' | 'archived';
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

export default function CoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<Category[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 8; // Number of courses per page
    const router = useRouter();

    const fetchCategories = useCallback(async () => {
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
    }, []);

    const fetchCourses = useCallback(
        async (page: number = 1) => {
            try {
                setLoading(true);
                const data: ApiResponse = await GetCourses(page, limit);

                if (!data?.metadata?.courses) {
                    throw new Error('No courses found in response');
                }

                const parsedCourses = data.metadata.courses.map((course: Course) => {
                    let categoryObj: Category;
                    if (typeof course.category === 'string') {
                        categoryObj = categories.find(
                            (cat) => cat._id === (course.category as unknown as string),
                        ) || {
                            _id: course.category as string,
                            name: 'Uncategorized',
                        };
                    } else {
                        categoryObj = course.category || { _id: '', name: 'Uncategorized' };
                    }

                    return {
                        ...course,
                        category: categoryObj,
                    };
                });

                setCourses(parsedCourses);
                setCurrentPage(data.metadata.page || 1);
                setTotalPages(data.metadata.totalPages || 1);
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
        },
        [categories],
    );

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    useEffect(() => {
        fetchCourses(currentPage);
    }, [currentPage, fetchCourses]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Explore Courses
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Discover our range of courses tailored for your learning journey.
                </p>
            </header>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.from({ length: limit }).map((_, index) => (
                        <Card
                            key={index}
                            className="animate-pulse bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-[380px]"
                        >
                            <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-t-lg" />
                            <CardContent className="p-4 space-y-3">
                                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {courses.length === 0 ? (
                            <div className="col-span-full text-center py-12">
                                <p className="text-lg text-gray-600 dark:text-gray-400">
                                    No courses available at the moment.
                                </p>
                            </div>
                        ) : (
                            courses.map((course) => (
                                <Link
                                    key={course._id}
                                    href={`/qaqc/courses/${course._id}`}
                                    passHref
                                >
                                    <Card className="flex flex-col h-[380px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105 hover:shadow-xl">
                                        <div className="h-40 bg-gradient-to-r from-[#5AD3AF] to-[#657ED4] flex items-center justify-center relative">
                                            <Badge className="absolute top-3 left-3 bg-white text-[#657ED4] hover:bg-white dark:bg-gray-800 dark:text-[#5AD3AF] px-2 py-1 text-xs font-medium rounded-full">
                                                {course.category.name}
                                            </Badge>
                                        </div>
                                        <CardHeader className="p-4 flex-grow">
                                            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
                                                {course.title}
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-3">
                                                {course.description.slice(0, 100) +
                                                    (course.description.length > 100 ? '...' : '')}
                                            </p>
                                        </CardHeader>
                                        <CardContent className="p-4 pt-0">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-base font-medium text-gray-900 dark:text-gray-100">
                                                    ${course.price.toFixed(2)}
                                                </span>
                                                <Badge variant="secondary" className="text-xs">
                                                    {new Date(
                                                        course.createdAt,
                                                    ).toLocaleDateString()}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-4">
                                                <div className="flex items-center">
                                                    <Users className="h-4 w-4 mr-1" />
                                                    <span>{course.enrolledCount} students</span>
                                                </div>
                                                {course.rating && (
                                                    <div className="flex items-center">
                                                        <Star className="h-4 w-4 mr-1 text-yellow-400" />
                                                        <span>{course.rating.toFixed(1)}/5</span>
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                        <CardFooter className="p-4 pt-0">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-full text-[#5AD3AF] border-[#5AD3AF] hover:bg-[#5AD3AF] hover:text-white dark:text-[#5AD3AF] dark:border-[#5AD3AF] dark:hover:bg-[#5AD3AF] dark:hover:text-white"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    router.push(`/qaqc/courses/${course._id}`);
                                                }}
                                            >
                                                View Details
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </Link>
                            ))
                        )}
                    </div>

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
                                                    : 'cursor-pointer text-[#5AD3AF] hover:text-[#4ac2a0]'
                                            }
                                            aria-disabled={currentPage === 1}
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
                                                            ? 'bg-[#5AD3AF] text-white hover:bg-[#4ac2a0]'
                                                            : 'cursor-pointer text-[#5AD3AF] hover:text-[#4ac2a0]'
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
                                                    : 'cursor-pointer text-[#5AD3AF] hover:text-[#4ac2a0]'
                                            }
                                            aria-disabled={currentPage === totalPages}
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
