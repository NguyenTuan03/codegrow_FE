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
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { GetCourses } from '@/lib/services/course/getcourse';

export default function CoursesPage() {
    interface Course {
        _id: string;
        title: string;
        description: string;
        price: number;
        enrolledCount: number;
        author: string;
        category: string;
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

    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 8; // Số khóa học mỗi trang
    const router = useRouter();

    const fetchCourses = async (page: number = 1) => {
        try {
            setLoading(true);
            const data: ApiResponse = await GetCourses(page, limit); // Gửi page và limit
            console.log('Dữ liệu API:', data);

            if (data?.metadata?.courses && data.metadata.courses.length > 0) {
                setCourses(data.metadata.courses);
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
        <div className="container mx-auto py-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Courses</h1>
                <Button
                    variant="default"
                    onClick={() => router.push('/admin/courses/create')}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                >
                    Create Course
                </Button>
            </div>

            {loading ? (
                <div className="text-center text-gray-600 dark:text-gray-400">Loading...</div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {courses.length === 0 ? (
                            <div className="text-center text-gray-600 dark:text-gray-400 col-span-full">
                                No courses available at the moment.
                            </div>
                        ) : (
                            courses.map((course) => (
                                <Link
                                    key={course._id}
                                    href={`/admin/courses/${course._id}`}
                                    passHref
                                >
                                    <Card className="hover:shadow-lg transition-shadow overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                        <div className="h-36 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                            <span className="text-gray-700 dark:text-gray-300">
                                                {course.category}
                                            </span>
                                        </div>
                                        <CardContent className="p-4">
                                            <h4 className="font-medium mb-1 text-gray-900 dark:text-gray-100">
                                                {course.title}
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                {course.description}
                                            </p>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-medium text-gray-900 dark:text-gray-100">
                                                    ${course.price}
                                                </span>
                                                <Badge variant="secondary">
                                                    {new Date(
                                                        course.createdAt,
                                                    ).toLocaleDateString()}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                                <Users className="h-3 w-3 mr-1" />
                                                <span>{course.enrolledCount} students</span>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="flex justify-between">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                                                onClick={() =>
                                                    router.push(`/admin/courses/${course._id}`)
                                                }
                                            >
                                                View Details
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

                                    {/* Hiển thị số trang */}
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                        (page) => (
                                            <PaginationItem key={page}>
                                                <PaginationLink
                                                    onClick={() => handlePageChange(page)}
                                                    isActive={currentPage === page}
                                                    className={
                                                        currentPage === page
                                                            ? 'bg-blue-600 text-white'
                                                            : 'cursor-pointer'
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
