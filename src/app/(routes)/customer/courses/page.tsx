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
import { Users, BookOpen, Star, Search } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { GetCourses } from '@/lib/services/course/getcourse';
import { GetAllCategory } from '@/lib/services/category/getallcategory';
import { GetComment } from '@/lib/services/course/getComment';
import { GetLessons } from '@/lib/services/lessons/getAllLessons';
import { Input } from '@/components/ui/input';
import { getUserDetail } from '@/lib/services/admin/getuserdetail';
import { debounce } from 'lodash';
import { motion, AnimatePresence } from 'framer-motion';
import { createPaymentLink } from '@/lib/services/api/payOsApi';

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

interface Lesson {
    _id: string;
    title: string;
    status?: string; // e.g., 'done', 'in-progress'
    // Add other lesson fields as needed
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
    lessons: number; // Initial lessons count from GetCourses
    rating?: number;
    imgUrl?: string;
    lessonsCount?: number; // Number of completed lessons (optional)
    totalLessons?: number; // Total number of lessons (optional)
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

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [enrolledCourses, setEnrolledCourses] = useState<{ _id: string }[]>([]);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const limit = 6;
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

    const fetchEnrolledCourses = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('User is not authenticated');
            return;
        }

        try {
            const userId = localStorage.getItem('user');
            if (!userId) {
                console.log('User ID not found in localStorage');
                return;
            }
            const user = JSON.parse(userId);
            const res = await getUserDetail(user.id);

            if (res.status === 200) {
                const updatedEnrolledCourses = res.metadata.enrolledCourses || [];
                console.log('Updated enrolledCourses:', updatedEnrolledCourses); // Debug log
                setEnrolledCourses(updatedEnrolledCourses);
            }
        } catch (error) {
            console.error('Error fetching enrolled courses:', error);
        }
    };

    const fetchCourses = async (page: number = 1) => {
        try {
            setLoading(true);
            const data: ApiResponse = await GetCourses(page, limit);
            console.log('API Response:', data); // Debug logging

            if (data?.metadata?.courses && data.metadata.courses.length > 0) {
                const parsedCourses = await Promise.all(
                    data.metadata.courses.map(async (course: Course) => {
                        let categoryObj = categories.find((cat) => cat._id === course.category);
                        if (!categoryObj && typeof course.category === 'object') {
                            categoryObj = course.category as Category;
                        }

                        const avgRating = await fetchCommentsAndCalculateRatings(course._id);

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
                console.log('Total Pages:', data.metadata.totalPages); // Debug logging
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
        fetchEnrolledCourses();
    }, []);

    useEffect(() => {
        if (categories.length > 0) {
            fetchCourses(currentPage); // Fetch courses when currentPage changes
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
            filtered.sort((a, b) => b.price - a.price); // Fixed to sort high to low
        } else if (sortOption === 'rating-desc') {
            filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        } else if (sortOption === 'enrolled-desc') {
            filtered.sort((a, b) => b.enrolledCount - a.enrolledCount);
        }

        setFilteredCourses(filtered);
    }, [searchQuery, selectedCategory, sortOption, courses]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            setCurrentPage(page);
            fetchCourses(page); // Fetch new page data
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const openModal = async (course: Course) => {
        try {
            setLoading(true);
            const response = await GetLessons(course._id);
            if (response.status === 200 && Array.isArray(response.metadata)) {
                const totalLessons = response.metadata.length;
                const completedLessonsCount = response.metadata.filter(
                    (lesson: Lesson) => lesson.status === 'done',
                ).length;
                setSelectedCourse({
                    ...course,
                    lessonsCount: completedLessonsCount,
                    totalLessons: totalLessons,
                });
                setIsModalOpen(true);
            } else {
                throw new Error('Không thể tải danh sách bài học');
            }
        } catch (error) {
            console.error('Lỗi khi tải danh sách bài học:', error);
            toast({
                title: 'Error',
                description:
                    error instanceof Error ? error.message : 'Không thể tải danh sách bài học.',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCourse(null);
    };

    const createPaymentLinkHandle = async (courseId: string) => {
        try {
            setPaymentLoading(true);
            const token = localStorage.getItem('token');

            if (!token) {
                toast({
                    title: 'Lỗi',
                    description: 'Token không tồn tại. Vui lòng đăng nhập lại.',
                    variant: 'destructive',
                    className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
                });
                router.push('/login');
                return;
            }
            const tokenuser = JSON.parse(token);

            if (!selectedCourse) {
                throw new Error('No course selected for payment.');
            }

            const res = await createPaymentLink({
                token: tokenuser,
                courseId: courseId,
            });

            if (res.status === 201 && selectedCourse.price === 0) {
                toast({
                    title: 'Success',
                    description: 'Successfully enrolled in the free course!',
                    className:
                        'bg-[#5AD3AF] dark:bg-[#5AD3AF] text-white dark:text-black font-semibold',
                });
                setEnrolledCourses([...enrolledCourses, { _id: courseId }]);
                closeModal();
                await fetchEnrolledCourses();
                router.push(`/customer/courses/${courseId}`); // Direct redirect to course detail
            } else {
                const { payUrl } = res.data.metadata;

                if (payUrl) {
                    window.location.href = payUrl; // Chuyển hướng trực tiếp bằng payUrl
                } else {
                    console.error('Không lấy được đường link thanh toán.');
                    toast({
                        title: 'Error',
                        description: 'Không lấy được đường link thanh toán.',
                        variant: 'destructive',
                    });
                }
            }
        } catch (error) {
            console.error('Payment error:', error);
            toast({
                title: 'Error',
                description: 'Failed to process payment. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setPaymentLoading(false);
        }
    };

    const debouncedSearch = useCallback(
        debounce((searchTerm) => {
            if (!searchTerm) {
                setFilteredCourses(courses);
                return;
            }
            const filtered = courses.filter(
                (course) =>
                    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    course.description.toLowerCase().includes(searchTerm.toLowerCase()),
            );
            setFilteredCourses(filtered);
        }, 300),
        [courses],
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchQuery(value);
        debouncedSearch(value);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-4 md:p-8 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300"
        >
            <div className="max-w-8xl mx-auto px-4">
                {/* Header Section */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                    <div>
                        <h1 className="text-4xl mb-5 font-bold tracking-tight text-[#657ED4] dark:text-[#5AD3AF]">
                            Discover Amazing Courses
                        </h1>
                        <p className="mt-3 text-xl text-gray-600 dark:text-gray-300">
                            Learn from the best instructors and enhance your skills with our curated
                            courses.
                        </p>
                    </div>
                </motion.div>

                {/* Search and Filter Section */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8"
                >
                    {/* Search Input */}
                    <div className="relative w-full sm:w-1/2 lg:w-1/3">
                        <Input
                            type="text"
                            placeholder="Search courses..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="pl-10 pr-4 py-3 rounded-full border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] transition-all duration-300 shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 cursor-pointer"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>

                    {/* Filter and Sort Dropdowns */}
                    <div className="flex items-center gap-4">
                        {/* Category Filter */}
                        <motion.div whileHover={{ scale: 1.02 }} className="relative w-[200px]">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="appearance-none w-full rounded-full border border-gray-100 dark:border-gray-700 text-black dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] transition-all text-base shadow-sm py-2 px-4 pr-10 cursor-pointer"
                                aria-label="Filter by Category"
                            >
                                <option value="all">Filter by Category</option>
                                {categories.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {/* Custom Arrow */}
                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-300">
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </div>
                        </motion.div>

                        {/* Sort Options */}
                        <motion.div whileHover={{ scale: 1.02 }} className="relative w-[200px]">
                            <select
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                                className="appearance-none w-full rounded-full border border-gray-100 dark:border-gray-700 text-black dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] transition-all text-base shadow-sm py-2 px-4 pr-10 cursor-pointer"
                                aria-label="Sort By"
                            >
                                <option value="default">Sort By</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="rating-desc">Rating: High to Low</option>
                                <option value="enrolled-desc">Popularity</option>
                            </select>
                            {/* Custom Arrow */}
                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-300">
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Courses Grid */}
                {loading ? (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
                    >
                        {[...Array(8)].map((_, i) => (
                            <motion.div key={i} variants={itemVariants}>
                                <Card className="overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
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
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <>
                        {filteredCourses.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
                            >
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
                            </motion.div>
                        ) : (
                            <>
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="show"
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
                                >
                                    {filteredCourses.map((course) => (
                                        <motion.div
                                            key={course._id}
                                            variants={itemVariants}
                                            whileHover={{
                                                scale: 1.03,
                                                boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.1)',
                                                transition: {
                                                    duration: 0.3,
                                                    ease: [0.42, 0, 0.58, 1],
                                                },
                                            }}
                                            className="cursor-pointer"
                                        >
                                            <Card className="group overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl flex flex-col h-full">
                                                <div
                                                    className="relative h-70 w-full overflow-hidden"
                                                    style={{
                                                        backgroundImage: course.imgUrl
                                                            ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${course.imgUrl})`
                                                            : 'linear-gradient(to bottom, #657ED4, #4a5da0)', // Fallback gradient
                                                        backgroundColor: course.imgUrl
                                                            ? 'transparent'
                                                            : '#657ED4', // Fallback solid color
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center',
                                                        minHeight: '200px',
                                                        position: 'relative',
                                                        top: '-20px',
                                                    }}
                                                >
                                                    <Badge className="absolute top-3 left-3 bg-white-200 text-white dark:bg-[#657ED4] border-gray-300 px-3 py-1 text-base rounded-full shadow-sm">
                                                        {typeof course.category === 'object'
                                                            ? course.category.name
                                                            : 'Uncategorized'}
                                                    </Badge>
                                                </div>
                                                <CardHeader className="p-4 pb-2">
                                                    <h4 className="font-semibold text-2xl line-clamp-5 text-[#657ED4] dark:text-[#5AD3AF] h-10">
                                                        {course.title}
                                                    </h4>
                                                    <p className="text-xl text-gray-500 dark:text-gray-400">
                                                        by {course.author}
                                                    </p>
                                                </CardHeader>
                                                <CardContent className="p-4 pt-0 flex-1 flex flex-col gap-3 min-h-[50px]">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <span className="font-bold text-xl">
                                                            {course.price.toFixed(2)} VNĐ
                                                        </span>
                                                        <div className="flex items-center space-x-1">
                                                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                                            <span className="text-xl md:text-xl font-medium text-gray-700 dark:text-gray-300">
                                                                {course.rating?.toFixed(1) || 'N/A'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                                <CardFooter className="p-4 pt-0">
                                                    <motion.div
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                    >
                                                        {enrolledCourses.some(
                                                            (enrolledCourse) =>
                                                                enrolledCourse._id === course._id,
                                                        ) ? (
                                                            <Button
                                                                variant="default"
                                                                size="lg"
                                                                className="w-full bg-[#657ED4] dark:bg-[#5AD3AF] hover:bg-[#5A6BBE] dark:hover:bg-[#4ac2a0] text-white text-sm md:text-base font-semibold py-5 rounded-full shadow-md cursor-pointer"
                                                                onClick={() =>
                                                                    router.push(
                                                                        `/customer/courses/${course._id}`,
                                                                    )
                                                                }
                                                            >
                                                                View Details
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                variant="default"
                                                                size="lg"
                                                                className="w-full bg-[#657ED4] dark:bg-[#5AD3AF] hover:bg-[#5A6BBE] dark:hover:bg-[#4ac2a0] text-white text-sm md:text-base font-semibold py-5 rounded-full shadow-md cursor-pointer"
                                                                onClick={() => openModal(course)}
                                                            >
                                                                Enroll Now
                                                            </Button>
                                                        )}
                                                    </motion.div>
                                                </CardFooter>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </motion.div>

                                {/* Modal for Course Details */}
                                <AnimatePresence>
                                    {isModalOpen && selectedCourse && (
                                        <motion.div
                                            className="fixed inset-0 z-50 flex items-center justify-center p-4"
                                            initial="hidden"
                                            animate="visible"
                                            exit="hidden"
                                            variants={backdropVariants}
                                        >
                                            {/* Backdrop */}
                                            <motion.div
                                                className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-40"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                            />
                                            {/* Modal Content */}
                                            <motion.div
                                                className="relative z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-6xl mx-4 p-8 max-h-[90vh] overflow-y-auto"
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                            >
                                                <motion.button
                                                    onClick={closeModal}
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 transition-colors cursor-pointer"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M6 18L18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                </motion.button>
                                                <div className="flex flex-col items-center space-y-6">
                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: 0.1 }}
                                                        className="relative h-100 w-full overflow-hidden rounded-t-xl mb-4"
                                                        style={{
                                                            backgroundImage: selectedCourse.imgUrl
                                                                ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${selectedCourse.imgUrl})`
                                                                : 'linear-gradient(to bottom, #657ED4, #4a5da0)', // Fallback gradient
                                                            backgroundColor: selectedCourse.imgUrl
                                                                ? 'transparent'
                                                                : '#657ED4', // Fallback solid color
                                                            backgroundSize: 'cover',
                                                            backgroundPosition: 'center',
                                                            top: '-2px',
                                                        }}
                                                    />
                                                    <motion.h3
                                                        initial={{ y: -10, opacity: 0 }}
                                                        animate={{ y: 0, opacity: 1 }}
                                                        transition={{ delay: 0.2 }}
                                                        className="text-4xl font-semibold text-gray-900 dark:text-gray-100 mb-2 cursor-default"
                                                    >
                                                        {selectedCourse.title}
                                                    </motion.h3>
                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: 0.3 }}
                                                        className="flex flex-wrap items-center gap-4 sm:gap-6 text-xl text-gray-600 dark:text-gray-300"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <Users className="w-5 h-5 text-[#657ED4] dark:text-[#5AD3AF]" />
                                                            <span>
                                                                {selectedCourse.enrolledCount}{' '}
                                                                students enrolled
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <BookOpen className="w-5 h-5 text-[#657ED4] dark:text-[#5AD3AF]" />
                                                            <span>
                                                                Author:{' '}
                                                                {selectedCourse.author || 'Unknown'}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span>
                                                                Category:{' '}
                                                                {typeof selectedCourse.category ===
                                                                'object'
                                                                    ? selectedCourse.category.name
                                                                    : 'Uncategorized'}
                                                            </span>
                                                        </div>
                                                    </motion.div>
                                                    <motion.p
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: 0.4 }}
                                                        className="text-xl text-gray-600 dark:text-gray-300 font-medium leading-relaxed mb-4 cursor-default"
                                                    >
                                                        {selectedCourse.description}
                                                    </motion.p>
                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: 0.5 }}
                                                        className="flex items-center justify-between w-full mb-4"
                                                    >
                                                        <span className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                                            ${selectedCourse.price.toFixed(2)}
                                                        </span>
                                                        <div className="flex items-center space-x-1">
                                                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                                            <span className="text-base font-medium text-gray-700 dark:text-gray-300">
                                                                {selectedCourse.rating?.toFixed(
                                                                    1,
                                                                ) || 'N/A'}
                                                            </span>
                                                        </div>
                                                    </motion.div>
                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: 0.6 }}
                                                        className="flex items-center justify-between w-full mb-4 text-gray-500 dark:text-gray-400"
                                                    >
                                                        <div className="flex items-center">
                                                            <Users className="h-5 w-5 mr-1" />
                                                            <span>
                                                                {selectedCourse.enrolledCount}{' '}
                                                                learners
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <BookOpen className="h-5 w-5 mr-1" />
                                                            <span>
                                                                {selectedCourse.lessonsCount || 0}{' '}
                                                                of{' '}
                                                                {selectedCourse.totalLessons || 0}{' '}
                                                                lessons
                                                            </span>
                                                        </div>
                                                    </motion.div>

                                                    <motion.div
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.7 }}
                                                        className="flex flex-col sm:flex-row gap-3 w-full"
                                                    >
                                                        {selectedCourse.price === 0 ? (
                                                            <motion.div
                                                                whileHover={{ scale: 1.02 }}
                                                                whileTap={{ scale: 0.98 }}
                                                            >
                                                                <Button
                                                                    variant="default"
                                                                    className="w-full bg-[#657ED4] dark:bg-[#5AD3AF] hover:bg-[#5A6BBE] dark:hover:bg-[#4ac2a0] text-white font-semibold py-3 rounded-full shadow-md cursor-pointer disabled:cursor-not-allowed"
                                                                    onClick={() =>
                                                                        createPaymentLinkHandle(
                                                                            selectedCourse._id,
                                                                        )
                                                                    }
                                                                    disabled={paymentLoading}
                                                                >
                                                                    {paymentLoading
                                                                        ? 'Đang xử lý...'
                                                                        : 'Enroll Course'}
                                                                </Button>
                                                            </motion.div>
                                                        ) : (
                                                            <motion.div
                                                                whileHover={{ scale: 1.02 }}
                                                                whileTap={{ scale: 0.98 }}
                                                            >
                                                                <Button
                                                                    onClick={() =>
                                                                        createPaymentLinkHandle(
                                                                            selectedCourse._id,
                                                                        )
                                                                    }
                                                                    disabled={paymentLoading}
                                                                    className={`flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-full shadow-md cursor-pointer disabled:cursor-not-allowed ${
                                                                        paymentLoading
                                                                            ? 'opacity-50'
                                                                            : ''
                                                                    }`}
                                                                >
                                                                    <img
                                                                        src="/payOs.svg"
                                                                        alt="PayOs"
                                                                        className="h-6 w-6"
                                                                    />
                                                                    {paymentLoading
                                                                        ? 'Đang xử lý...'
                                                                        : 'Thanh toán PayOs'}
                                                                </Button>
                                                            </motion.div>
                                                        )}
                                                    </motion.div>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="mt-16 flex justify-center p-4"
                                    >
                                        <Pagination>
                                            <PaginationContent>
                                                <PaginationItem>
                                                    <PaginationPrevious
                                                        onClick={() =>
                                                            handlePageChange(currentPage - 1)
                                                        }
                                                        className={`cursor-pointer text-gray-600 dark:text-gray-400 hover:text-[#657ED4] dark:hover:text-[#5AD3AF] ${
                                                            currentPage === 1
                                                                ? 'pointer-events-none opacity-50 cursor-not-allowed'
                                                                : ''
                                                        }`}
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
                                                            className={`cursor-pointer ${
                                                                currentPage === page
                                                                    ? 'bg-[#657ED4] text-white dark:bg-[#5AD3AF] dark:text-black font-bold rounded-lg' // Added font-bold for active page
                                                                    : 'text-gray-600 dark:text-gray-400 hover:text-[#657ED4] dark:hover:text-[#5AD3AF]'
                                                            }`}
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
                                                        className={`cursor-pointer text-gray-600 dark:text-gray-400 hover:text-[#657ED4] dark:hover:text-[#5AD3AF] ${
                                                            currentPage === totalPages
                                                                ? 'pointer-events-none opacity-50 cursor-not-allowed'
                                                                : ''
                                                        }`}
                                                    />
                                                </PaginationItem>
                                            </PaginationContent>
                                        </Pagination>
                                    </motion.div>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </motion.div>
    );
}
