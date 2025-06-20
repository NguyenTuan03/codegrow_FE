'use client';

import { useState, useEffect } from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { GetReviewsByMentorId } from '@/lib/services/qaqc/getReviewDetail';
import { toast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

// Animation variants for review items
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

type Review = {
    _id: string;
    mentor: string;
    qaqc: {
        _id: string;
        email: string;
        role: string;
        fullName: string;
    };
    rating: number;
    comment: string;
    createdAt: string;
};

export function ViewDetailReview({ mentorId }: { mentorId: string }) {
    const [allReviews, setAllReviews] = useState<Review[]>([]);
    const [displayReviews, setDisplayReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    toast({
                        title: 'Lỗi',
                        description: 'Token không tồn tại. Vui lòng đăng nhập lại.',
                        variant: 'destructive',
                        className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
                    });
                    return;
                }
                const tokenuser = JSON.parse(token);
                const reviews = await GetReviewsByMentorId(mentorId, tokenuser);
                setAllReviews(reviews);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setError('Failed to load reviews. Please try again.');
                setAllReviews([]);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [mentorId]);

    useEffect(() => {
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        const paginatedReviews = allReviews.slice(start, end);
        setDisplayReviews(paginatedReviews);
        const total = Math.ceil(allReviews.length / pageSize);
        setTotalPages(total > 0 ? total : 1);
    }, [allReviews, currentPage, pageSize]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handlePageSizeChange = (value: string) => {
        setPageSize(Number(value));
        setCurrentPage(1);
    };

    const getPageNumbers = () => {
        const pages: number[] = [];
        const maxPagesToShow = 5;
        const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 min-h-[400px] max-h-[80vh] overflow-y-auto">
            {loading ? (
                <div className="space-y-6">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
                        >
                            <Skeleton className="h-5 w-[80%] mb-2" />
                            <Skeleton className="h-4 w-[60%] mb-2" />
                            <Skeleton className="h-4 w-[70%] mb-2" />
                            <Skeleton className="h-4 w-[50%]" />
                        </div>
                    ))}
                </div>
            ) : error ? (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg text-center text-red-500 dark:text-red-400 text-base font-medium">
                    {error}
                </div>
            ) : allReviews.length > 0 ? (
                <>
                    <motion.ul
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="space-y-6"
                    >
                        {displayReviews.map((review) => (
                            <motion.li
                                key={review._id}
                                variants={itemVariants}
                                className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                            >
                                <p className="text-gray-800 dark:text-gray-200 text-base cursor-default mb-2">
                                    <strong className="text-gray-900 dark:text-white text-lg font-semibold">
                                        Comment:
                                    </strong>{' '}
                                    {review.comment}
                                </p>
                                <p className="text-gray-800 dark:text-gray-200 text-base cursor-default mb-2">
                                    <strong className="text-gray-900 dark:text-white text-lg font-semibold">
                                        Rating:
                                    </strong>{' '}
                                    {review.rating}/5
                                </p>
                                <p className="text-gray-800 dark:text-gray-200 text-base cursor-default mb-2">
                                    <strong className="text-gray-900 dark:text-white text-lg font-semibold">
                                        Reviewed by:
                                    </strong>{' '}
                                    {review.qaqc.fullName} ({review.qaqc.email})
                                </p>
                                <p className="text-gray-800 dark:text-gray-200 text-base cursor-default">
                                    <strong className="text-gray-900 dark:text-white text-lg font-semibold">
                                        Created At:
                                    </strong>{' '}
                                    {new Date(review.createdAt).toLocaleString()}
                                </p>
                            </motion.li>
                        ))}
                    </motion.ul>

                    {/* Pagination Controls */}
                    <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
                        <div className="flex items-center gap-3">
                            <span className="text-base font-medium text-gray-700 dark:text-gray-300 cursor-default">
                                Items per page:
                            </span>
                            <Select
                                value={pageSize.toString()}
                                onValueChange={handlePageSizeChange}
                                aria-label="Select items per page"
                            >
                                <SelectTrigger className="w-[100px] bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] rounded-lg cursor-pointer">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded-lg">
                                    <SelectItem
                                        value="5"
                                        className="text-gray-900 dark:text-gray-100 hover:bg-[#657ED4] dark:hover:bg-[#5AD3AF] hover:text-white dark:hover:text-black transition-colors font-medium cursor-pointer"
                                    >
                                        5
                                    </SelectItem>
                                    <SelectItem
                                        value="10"
                                        className="text-gray-900 dark:text-gray-100 hover:bg-[#657ED4] dark:hover:bg-[#5AD3AF] hover:text-white dark:hover:text-black transition-colors font-medium cursor-pointer"
                                    >
                                        10
                                    </SelectItem>
                                    <SelectItem
                                        value="20"
                                        className="text-gray-900 dark:text-gray-100 hover:bg-[#657ED4] dark:hover:bg-[#5AD3AF] hover:text-white dark:hover:text-black transition-colors font-medium cursor-pointer"
                                    >
                                        20
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Pagination>
                            <PaginationContent className="flex items-center gap-1">
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        className={`text-[#657ED4] dark:text-[#5AD3AF] hover:text-[#424c70] dark:hover:text-[#4ac2a0] hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600 px-3 py-1 rounded-md transition-colors cursor-pointer ${
                                            currentPage === 1
                                                ? 'pointer-events-none opacity-50 cursor-not-allowed'
                                                : ''
                                        }`}
                                        aria-label="Previous page"
                                    />
                                </PaginationItem>
                                {getPageNumbers().map((page) => (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            onClick={() => handlePageChange(page)}
                                            isActive={currentPage === page}
                                            className={
                                                currentPage === page
                                                    ? 'bg-[#657ED4] dark:bg-[#5AD3AF] text-white hover:bg-[#424c70] dark:hover:bg-[#4ac2a0] px-3 py-1 rounded-md border-gray-300 dark:border-gray-600 transition-colors cursor-pointer'
                                                    : 'text-[#657ED4] dark:text-[#5AD3AF] hover:text-[#424c70] dark:hover:text-[#4ac2a0] hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1 rounded-md border-gray-300 dark:border-gray-600 transition-colors cursor-pointer'
                                            }
                                            aria-label={`Page ${page}`}
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        className={`text-[#657ED4] dark:text-[#5AD3AF] hover:text-[#424c70] dark:hover:text-[#4ac2a0] hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600 px-3 py-1 rounded-md transition-colors cursor-pointer ${
                                            currentPage === totalPages
                                                ? 'pointer-events-none opacity-50 cursor-not-allowed'
                                                : ''
                                        }`}
                                        aria-label="Next page"
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </>
            ) : (
                !loading &&
                !error && (
                    <div className="p-4 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-center text-gray-500 dark:text-gray-400 text-base font-medium">
                        No reviews found for this mentor.
                    </div>
                )
            )}
        </div>
    );
}
