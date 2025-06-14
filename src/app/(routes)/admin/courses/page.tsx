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
import { Users, BookOpen, Star, Edit } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { GetCourses } from '@/lib/services/course/getcourse';
import { GetAllCategory } from '@/lib/services/category/getallcategory';
import { GetComment } from '@/lib/services/course/getComment';

interface Category {
    _id: string;
    name: string;
}

interface User {
    fullName: string;
    email: string;
    role: string;
    id: string;
}

interface Message {
    id: string;
    content: string;
    rating?: number;
    createdAt: string;
    parentComment?: string | null;
    user: User;
    replies?: Message[];
}

interface Course {
    _id: string;
    title: string;
    description: string;
    price: number;
    enrolledCount: number;
    author: string;
    category: string | Category;
    createdAt: string;
    lessons: number;
    imgUrl?: string;
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

interface CommentResponse {
    message: string;
    status: number;
    metadata: Message[];
}

export default function AdminCoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 8; // Matches the backend limit
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
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
        }
    };

    const fetchCommentsAndCalculateRatings = async (courseId: string): Promise<number> => {
        try {
            const response: CommentResponse = await GetComment(courseId);
            if (!response || !response.metadata) {
                throw new Error('Failed to fetch comments');
            }

            const comments = response.metadata;
            const ratings = comments
                .filter((comment) => comment.rating !== undefined)
                .map((comment) => comment.rating as number);

            if (ratings.length === 0) return 0;

            const avgRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
            return Number(avgRating.toFixed(1));
        } catch (error) {
            console.error(`Error fetching comments for course ${courseId}:`, error);
            return 0;
        }
    };

    const fetchCourses = async (page: number = 1) => {
        try {
            setLoading(true);
            const data: ApiResponse = await GetCourses(page, itemsPerPage);
            console.log('Fetched courses:', JSON.stringify(data, null, 2));
            if (data?.metadata?.courses && data.metadata.courses.length > 0) {
                const parsedCourses = await Promise.all(
                    data.metadata.courses.map(async (course: Course) => {
                        let categoryObj = categories.find((cat) => cat._id === course.category);
                        if (!categoryObj && typeof course.category === 'object') {
                            categoryObj = course.category as Category;
                        }

                        const avgRating = await fetchCommentsAndCalculateRatings(course._id);
                        console.log(`Average rating for course ${course._id}:`, avgRating);

                        return {
                            ...course,
                            category: categoryObj || { _id: '', name: 'Uncategorized' },
                            rating: avgRating || 5,
                        };
                    }),
                );

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
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
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
    }, [currentPage, categories]);

    const handlePageChange = (page: number) => {
        console.log(
            `Navigating to page ${page}, currentPage: ${currentPage}, totalPages: ${totalPages}`,
        );
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="p-6 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                {/* Header with Date and Time */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-[#657ED4] dark:text-[#5AD3AF] cursor-default">
                            Course Management
                        </h1>
                        <p className="text-gray-600 text-xl dark:text-gray-400 mt-2 font-medium cursor-default">
                            Manage and organize all courses in your platform
                        </p>
                    </div>
                </div>

                {/* Create New Course Button */}
                <div className="flex justify-end mb-6">
                    <Button
                        onClick={() => router.push('/admin/courses/create')}
                        className="bg-[#657ED4] dark:bg-[#5AD3AF] hover:bg-[#4a5da0] dark:hover:bg-[#4ac2a0] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-md cursor-pointer"
                    >
                        Create New Course
                    </Button>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <Card
                                key={i}
                                className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg"
                            >
                                <Skeleton className="h-40 w-full rounded-t-lg" />
                                <CardContent className="p-4 space-y-3">
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-1/2" />
                                    <Skeleton className="h-4 w-1/2" />
                                </CardContent>
                                <CardFooter className="p-4 space-x-2">
                                    <Skeleton className="h-10 w-1/2 rounded-lg" />
                                    <Skeleton className="h-10 w-1/2 rounded-lg" />
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <>
                        {courses.length === 0 ? (
                            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                                <div className="mx-auto w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                                    <BookOpen className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2 cursor-default">
                                    No courses available
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6 font-medium cursor-default">
                                    Create your first course to get started
                                </p>
                                <Button
                                    onClick={() => router.push('/admin/courses/create')}
                                    className="bg-[#657ED4] dark:bg-[#5AD3AF] hover:bg-[#4a5da0] dark:hover:bg-[#4ac2a0] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-md cursor-pointer"
                                >
                                    Create Course
                                </Button>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {courses.map((course) => (
                                        <Card
                                            key={course._id}
                                            className="hover:shadow-lg transition-all duration-300 overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg flex flex-col h-full"
                                        >
                                            <div
                                                className="h-40 relative overflow-hidden"
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
                                            >
                                                <Badge className="absolute top-3 left-3 bg-white-200 text-white dark:bg-[#657ED4] border-gray-300 px-3 py-1 text-base rounded-full shadow-sm cursor-default">
                                                    {typeof course.category === 'object'
                                                        ? course.category.name
                                                        : 'Uncategorized'}
                                                </Badge>
                                            </div>
                                            <CardHeader className="p-4 pb-2">
                                                <h4 className="font-semibold text-xl line-clamp-2 text-[#657ED4] dark:text-[#5AD3AF] cursor-default">
                                                    {course.title}
                                                </h4>
                                                <p className="text-base text-gray-600 dark:text-gray-400 font-medium cursor-default">
                                                    by{' '}
                                                    {typeof course.author === 'object'
                                                        ? course.author
                                                        : course.author || 'Unknown Author'}
                                                </p>
                                            </CardHeader>
                                            <CardContent className="p-4 pt-0 flex-1">
                                                <p className="text-base text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 font-medium cursor-default">
                                                    {course.description}
                                                </p>
                                                <div className="flex items-center justify-between mb-3">
                                                    <span className="font-bold text-base cursor-default">
                                                        ${course.price.toFixed(2)}
                                                    </span>
                                                    <div className="flex items-center space-x-1">
                                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                                        <span className="text-base font-medium text-gray-700 dark:text-gray-300 cursor-default">
                                                            {course.rating?.toFixed(1) || 'N/A'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 font-medium">
                                                    <div className="flex items-center">
                                                        <Users className="h-4 w-4 mr-1 text-[#657ED4] dark:text-[#5AD3AF]" />
                                                        <span className="cursor-default">
                                                            {course.enrolledCount} enrolled
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <BookOpen className="h-4 w-4 mr-1 text-[#657ED4] dark:text-[#5AD3AF]" />
                                                        <span className="cursor-default">
                                                            {course.lessons} lessons
                                                        </span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                            <CardFooter className="p-4 pt-0 flex space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="flex-1 border-[#657ED4] dark:border-[#5AD3AF] text-[#657ED4] dark:text-[#5AD3AF] hover:bg-[#657ED4] hover:text-white dark:hover:bg-[#5AD3AF] dark:hover:text-black rounded-lg font-medium transition-all duration-200 cursor-pointer"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        router.push(`/admin/courses/${course._id}`);
                                                    }}
                                                >
                                                    <Edit className="w-4 h-4 mr-2" />
                                                    Edit
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
                                                                ? 'pointer-events-none opacity-50 cursor-not-allowed'
                                                                : 'cursor-pointer text-[#657ED4] dark:text-[#5AD3AF] hover:text-[#424c70] dark:hover:text-[#4ac2a0] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full'
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
                                                                    ? 'bg-[#657ED4] dark:bg-[#5AD3AF] text-white hover:bg-[#424c70] dark:hover:bg-[#4ac2a0] rounded-full cursor-pointer'
                                                                    : 'cursor-pointer text-[#657ED4] dark:text-[#5AD3AF] hover:text-[#424c70] dark:hover:text-[#4ac2a0] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full'
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
                                                                ? 'pointer-events-none opacity-50 cursor-not-allowed'
                                                                : 'cursor-pointer text-[#657ED4] dark:text-[#5AD3AF] hover:text-[#424c70] dark:hover:text-[#4ac2a0] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full'
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
