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

// Reuse the GetReviewsByMentorId function and Review type
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

export default function CoursesList() {
    const userData = localStorage.getItem('user');
    if (!userData) {
        throw new Error('User data is missing');
    }

    const user = JSON.parse(userData);

    const mentorId = user.id; // Assuming this is the mentor ID you want to use
    const [allReviews, setAllReviews] = useState<Review[]>([]);
    const [displayReviews, setDisplayReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchReviews = async () => {
            if (!mentorId) {
                setError('Mentor ID not found in local storage');
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const token = localStorage.getItem('token') || '';
                const reviews = await GetReviewsByMentorId(mentorId, token);
                console.log('Fetched reviews:', reviews);
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
        <div className="max-w-4xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Review</h1>
            {loading && (
                <p className="text-center text-gray-500 dark:text-gray-400">Loading reviews...</p>
            )}
            {error && <p className="text-center text-red-500 dark:text-red-400">{error}</p>}
            {!loading && !error && allReviews.length > 0 ? (
                <>
                    <div className="grid gap-6">
                        {displayReviews.map((review) => (
                            <div
                                key={review._id}
                                className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                            >
                                <p className="text-gray-800 dark:text-gray-200">
                                    <strong className="text-gray-900 dark:text-white">
                                        Comment:
                                    </strong>{' '}
                                    {review.comment}
                                </p>
                                <p className="text-gray-800 dark:text-gray-200">
                                    <strong className="text-gray-900 dark:text-white">
                                        Rating:
                                    </strong>{' '}
                                    {review.rating}/5
                                </p>
                                <p className="text-gray-800 dark:text-gray-200">
                                    <strong className="text-gray-900 dark:text-white">
                                        Reviewed by:
                                    </strong>{' '}
                                    {review.qaqc.fullName} ({review.qaqc.email})
                                </p>
                                <p className="text-gray-800 dark:text-gray-200">
                                    <strong className="text-gray-900 dark:text-white">
                                        Created At:
                                    </strong>{' '}
                                    {new Date(review.createdAt).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                Items per page:
                            </span>
                            <Select
                                value={pageSize.toString()}
                                onValueChange={handlePageSizeChange}
                            >
                                <SelectTrigger className="w-[100px] bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                                    <SelectItem
                                        value="5"
                                        className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        5
                                    </SelectItem>
                                    <SelectItem
                                        value="10"
                                        className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        10
                                    </SelectItem>
                                    <SelectItem
                                        value="20"
                                        className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        20
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        className={`${
                                            currentPage === 1
                                                ? 'pointer-events-none opacity-50'
                                                : ''
                                        } text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600`}
                                    />
                                </PaginationItem>

                                {getPageNumbers().map((page) => (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            onClick={() => handlePageChange(page)}
                                            isActive={currentPage === page}
                                            className={`${
                                                currentPage === page
                                                    ? 'bg-blue-500 text-white dark:bg-blue-600'
                                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                            } border-gray-300 dark:border-gray-600`}
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        className={`${
                                            currentPage === totalPages
                                                ? 'pointer-events-none opacity-50'
                                                : ''
                                        } text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600`}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </>
            ) : (
                !loading &&
                !error && (
                    <p className="text-center text-gray-500 dark:text-gray-400">
                        No reviews found for this mentor.
                    </p>
                )
            )}
        </div>
    );
}
