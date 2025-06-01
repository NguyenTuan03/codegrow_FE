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
import { Users, BookOpen, Star, Search, Filter } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { GetCourses } from '@/lib/services/course/getcourse';
import { GetAllCategory } from '@/lib/services/category/getallcategory';
import { GetComment } from '@/lib/services/course/getComment';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface Category {
    _id: string;
    name: string;
}

interface User {
    fullName: string;
    email: string;
    role: string;
    _id: string;
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
    rating?: number;
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

interface CommentResponse {
    message: string;
    status: number;
    metadata: Message[];
}

export default function CoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortOption, setSortOption] = useState('default');
    const limit = 8;
    const router = useRouter();

    const fetchCategories = async () => {
        try {
            const data = await GetAllCategory(1, 100);
            console.log('Data from GetAllCategory:', data);
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
            const data: ApiResponse = await GetCourses(page, limit);
            console.log('Data from GetCourses:', JSON.stringify(data, null, 2));
            if (data?.metadata?.courses && data.metadata.courses.length > 0) {
                const parsedCourses = await Promise.all(
                    data.metadata.courses.map(async (course: Course) => {
                        let categoryObj = categories.find((cat) => cat._id === course.category);
                        if (!categoryObj && typeof course.category === 'object') {
                            categoryObj = course.category as Category;
                        }

                        const avgRating = await fetchCommentsAndCalculateRatings(course._id);
                        console.log('Average rating:', avgRating);

                        return {
                            ...course,
                            category: categoryObj || { _id: '', name: 'Uncategorized' },
                            rating: avgRating || 4.5,
                        };
                    }),
                );

                setCourses(parsedCourses);
                setFilteredCourses(parsedCourses);
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
            setFilteredCourses([]);
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

    useEffect(() => {
        let filtered = [...courses];

        if (searchQuery) {
            filtered = filtered.filter(
                (course) =>
                    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    course.description.toLowerCase().includes(searchQuery.toLowerCase()),
            );
        }

        if (selectedCategory !== 'all') {
            filtered = filtered.filter((course) =>
                typeof course.category === 'object'
                    ? course.category._id === selectedCategory
                    : course.category === selectedCategory,
            );
        }

        if (sortOption === 'price-asc') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'price-desc') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortOption === 'rating-desc') {
            filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        } else if (sortOption === 'enrolled-desc') {
            filtered.sort((a, b) => b.enrolledCount - a.enrolledCount);
        }

        setFilteredCourses(filtered);
    }, [searchQuery, selectedCategory, sortOption, courses]);

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
        <div className="p-4 md:p-8 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <div className="max-w-8xl mx-auto px-4">
                {/* Header Section */}
                <div className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-4xl mb-5 font-bold tracking-tight text-[#657ED4] dark:[#5AD3AF]">
                            Discover Amazing Courses
                        </h1>
                        <p className="mt-3 text-xl text-gray-600 dark:text-gray-300">
                            Learn from the best instructors and enhance your skills with our curated
                            courses.
                        </p>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                    <div className="relative w-full sm:w-1/2 lg:w-1/3">
                        <Input
                            type="text"
                            placeholder="Search courses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-3 rounded-full border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#657ED4] focus:border-transparent transition-all duration-300 shadow-sm"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Filter className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger
                                    className="w-[180px] rounded-full border-gray-100 dark:border-gray-700 text-black dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] transition-all text-base"
                                    aria-label="Filter by Category"
                                >
                                    <SelectValue placeholder="Filter by Category" />
                                </SelectTrigger>
                                <SelectContent className="rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white border-gray-100 dark:border-gray-700">
                                    <SelectItem
                                        value="all"
                                        className="rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
                                    >
                                        All Categories
                                    </SelectItem>
                                    {categories.map((category) => (
                                        <SelectItem
                                            key={category._id}
                                            value={category._id}
                                            className="rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
                                        >
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <Select value={sortOption} onValueChange={setSortOption}>
                            <SelectTrigger
                                className="w-[180px] rounded-full border-gray-100 dark:border-gray-700 text-black dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] transition-all text-base"
                                aria-label="Sort By"
                            >
                                <SelectValue placeholder="Sort By" />
                            </SelectTrigger>
                            <SelectContent className="rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white border-gray-100 dark:border-gray-700">
                                <SelectItem
                                    value="default"
                                    className="rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
                                >
                                    Default
                                </SelectItem>
                                <SelectItem
                                    value="price-asc"
                                    className="rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
                                >
                                    Price: Low to High
                                </SelectItem>
                                <SelectItem
                                    value="price-desc"
                                    className="rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
                                >
                                    Price: High to Low
                                </SelectItem>
                                <SelectItem
                                    value="rating-desc"
                                    className="rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
                                >
                                    Rating: High to Low
                                </SelectItem>
                                <SelectItem
                                    value="enrolled-desc"
                                    className="rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
                                >
                                    Popularity
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Courses Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <Card
                                key={i}
                                className="overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
                            >
                                <Skeleton className="h-48 w-full rounded-t-xl" />
                                <CardContent className="p-4 space-y-3">
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-1/2" />
                                </CardContent>
                                <CardFooter className="p-4">
                                    <Skeleton className="h-12 w-full rounded-full" />
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <>
                        {filteredCourses.length === 0 ? (
                            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                                <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                                    <BookOpen className="w-12 h-12 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">
                                    No Courses Found
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                                    We couldn’t find any courses matching your criteria. Try
                                    adjusting your search or filters.
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {filteredCourses.map((course) => (
                                        <Card
                                            key={course._id}
                                            className="group hover:shadow-md transition-all duration-300 overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl flex flex-col h-full transform hover:-translate-y-1"
                                        >
                                            <div
                                                className="relative h-48 overflow-hidden"
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
                                                <Badge className="absolute top-3 left-3 bg-white-200 text-white dark:bg-[#657ED4] border-gray-300 px-3 py-1 text-base rounded-full shadow-sm">
                                                    {typeof course.category === 'object'
                                                        ? course.category.name
                                                        : 'Uncategorized'}
                                                </Badge>
                                            </div>
                                            <CardHeader className="p-4 pb-2">
                                                <h4 className="font-semibold text-2xl line-clamp-5 text-[#657ED4] dark:text-[#5AD3AF] h-17">
                                                    {course.title}
                                                </h4>
                                                <p className="text-xs md:text-base text-gray-500 dark:text-gray-400">
                                                    by {course.author}
                                                </p>
                                            </CardHeader>
                                            <CardContent className="p-4 pt-0 flex-1 flex flex-col gap-3 min-h-[120px]">
                                                <p className="text-xs md:text-base font-normal text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 h-15">
                                                    {course.description.length > 50
                                                        ? course.description.slice(0, 50) + '...'
                                                        : course.description}
                                                </p>
                                                <div className="flex items-center justify-between mb-3">
                                                    <span className="font-bold text-base md:text-base">
                                                        ${course.price.toFixed(2)}
                                                    </span>
                                                    <div className="flex items-center space-x-1">
                                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                                        <span className="text-xs md:text-base font-medium text-gray-700 dark:text-gray-300">
                                                            {course.rating?.toFixed(1) || 'N/A'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="mt-auto flex items-center justify-between text-xs md:text-base text-gray-500 dark:text-gray-400">
                                                    <div className="flex items-center">
                                                        <Users className="h-4 w-4 mr-1" />
                                                        <span>{course.enrolledCount} learners</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <BookOpen className="h-4 w-4 mr-1" />
                                                        <span>{course.lessons} lessons</span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                            <CardFooter className="p-4 pt-0">
                                                <Button
                                                    variant="default"
                                                    size="lg"
                                                    className="w-full bg-[#657ED4] dark:bg-[#5AD3AF] hover:bg-[#5A6BBE] dark:hover:bg-[#4ac2a0] text-white text-sm md:text-base font-semibold py-5 rounded-full transition-all duration-200 transform hover:scale-[1.02] shadow-md cursor-pointer"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        router.push(`/qaqc/courses/${course._id}`);
                                                    }}
                                                >
                                                    View Detail
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
                                                                : 'cursor-pointer text-gray-600 dark:text-gray-400 hover:text-[#657ED4] dark:hover:text-[#5AD3AF] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full'
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
                                                                    ? 'bg-[#657ED4] dark:bg-[#5AD3AF] text-white hover:bg-[#5A6BBE] dark:hover:bg-[#4ac2a0] rounded-full underline underline-offset-4 cursor-pointer'
                                                                    : 'cursor-pointer text-gray-600 dark:text-gray-400 hover:text-[#657ED4] dark:hover:text-[#5AD3AF] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full'
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
                                                                : 'cursor-pointer text-gray-600 dark:text-gray-400 hover:text-[#657ED4] dark:hover:text-[#5AD3AF] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full'
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
