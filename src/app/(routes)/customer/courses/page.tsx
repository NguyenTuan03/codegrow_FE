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
import { Users, Star } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { GetCourses } from '@/lib/services/course/getcourse';
import Image from 'next/image';

export default function CoursesPage() {
    interface Course {
        _id: string;
        title: string;
        description: string;
        price: number;
        enrolledCount: number;
        author: { _id: string; fullName: string; email: string; role: string };
        category: { _id: string; name: string };
        createdAt: string;
        thumbnail?: string; // Added thumbnail for course image
        rating?: number; // Added rating for course
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
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 8; // Number of courses per page
    const router = useRouter();

    const fetchCourses = async (page: number = 1) => {
        try {
            setLoading(true);
            const data: ApiResponse = await GetCourses(page, limit);
            console.log('API Data:', data);

            if (data?.metadata?.courses && data.metadata.courses.length > 0) {
                const parsedCourses = data.metadata.courses.map((course: Course) => ({
                    ...course,
                    author:
                        typeof course.author === 'string'
                            ? JSON.parse(course.author)
                            : course.author,
                    category:
                        typeof course.category === 'string'
                            ? JSON.parse(course.category)
                            : course.category,
                }));

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
        fetchCourses(currentPage);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">
                    Discover Your Next Course
                </h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                    Explore a wide range of courses taught by industry experts to boost your skills.
                </p>
            </div>

            {/* Courses Grid */}
            <div className=" mx-auto">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {courses.length === 0 ? (
                                <div className="col-span-full text-center text-gray-600 dark:text-gray-400">
                                    No courses available at the moment.
                                </div>
                            ) : (
                                courses.map((course) => (
                                    <Link
                                        key={course._id}
                                        href={`/admin/courses/${course._id}`}
                                        passHref
                                    >
                                        <Card className="group relative overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                                            {/* Course Thumbnail */}
                                            <div className="relative h-48">
                                                <Image
                                                    src={
                                                        course.thumbnail ||
                                                        '/placeholder-course.jpg'
                                                    }
                                                    alt={course.title}
                                                    fill
                                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                                <Badge className="absolute top-2 right-2 bg-blue-600 text-white">
                                                    {course.category?.name || 'Uncategorized'}
                                                </Badge>
                                            </div>

                                            <CardContent className="p-5">
                                                {/* Course Title */}
                                                <h3 className="text-xl font-semibold text-[#5AD3AF] dark:text-green-400 mb-2 line-clamp-1">
                                                    {course.title}
                                                </h3>
                                                {/* Course Description */}
                                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                                                    {course.description}
                                                </p>
                                                {/* Instructor */}
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                                    By{' '}
                                                    {course.author?.fullName ||
                                                        'Unknown Instructor'}
                                                </p>
                                                {/* Price and Rating */}
                                                <div className="flex items-center justify-between mb-3">
                                                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                                        ${course.price.toFixed(2)}
                                                    </span>
                                                    <div className="flex items-center">
                                                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                                        <span className="text-sm text-gray-600 dark:text-gray-300">
                                                            {course.rating?.toFixed(1) || '4.5'}
                                                        </span>
                                                    </div>
                                                </div>
                                                {/* Enrolled Students */}
                                                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                                    <Users className="h-4 w-4 mr-1" />
                                                    <span>
                                                        {course.enrolledCount} students enrolled
                                                    </span>
                                                </div>
                                            </CardContent>

                                            <CardFooter className="p-5 pt-0">
                                                <Button
                                                    variant="default"
                                                    size="sm"
                                                    className="w-full bg-[#5AD3AF] hover:bg-[#4ac2a0] text-white"
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
                                    </Link>
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
                                                                ? 'bg-blue-600 text-white'
                                                                : 'cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700'
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
        </div>
    );
}
