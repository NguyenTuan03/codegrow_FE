'use client';

import { useState, useEffect, useCallback } from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { GetReviewsByMentorId } from '@/lib/services/qaqc/getReviewDetail';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, User, Calendar, Search } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { debounce } from 'lodash';

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

export default function ReviewsList() {
    const [allReviews, setAllReviews] = useState<Review[]>([]);
    const [displayReviews, setDisplayReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const userData = localStorage.getItem('user');
                if (!userData) {
                    throw new Error('User data is missing');
                }
                const user = JSON.parse(userData);
                const mentorId = user._id;
                if (!mentorId) {
                    throw new Error('Mentor ID not found in local storage');
                }

                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Authentication token is missing');
                }
                const tokenuser = JSON.parse(token);

                setLoading(true);
                const response = await GetReviewsByMentorId(mentorId, tokenuser);
                const reviews = response.metadata || response; // Handle metadata object or array
                if (!Array.isArray(reviews)) {
                    throw new Error('Invalid reviews response format');
                }
                setAllReviews(reviews);
                setError(null);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : 'Failed to load reviews. Please try again.';
                setError(errorMessage);
                setAllReviews([]);
                toast({
                    title: 'Error',
                    description: errorMessage,
                    variant: 'destructive',
                    className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    useEffect(() => {
        let filtered = [...allReviews];
        if (searchQuery) {
            filtered = filtered.filter((review) =>
                [review.qaqc.fullName || '', review.qaqc.email || '', review.comment || ''].some(
                    (field) => field.toLowerCase().includes(searchQuery.toLowerCase()),
                ),
            );
        }
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        const paginatedReviews = filtered.slice(start, end);
        setDisplayReviews(paginatedReviews);

        const total = Math.ceil(filtered.length / pageSize);
        setTotalPages(total > 0 ? total : 1);
    }, [allReviews, currentPage, pageSize, searchQuery]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePageSizeChange = (value: string) => {
        const newSize = Number(value);
        setPageSize(newSize);
        setCurrentPage(1);
    };

    const getPageNumbers = () => {
        const pages: number[] = [];
        const maxPagesToShow = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        // Adjust startPage if endPage is at the maximum
        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    const debouncedSearch = useCallback(
        debounce((searchTerm: string) => {
            setSearchQuery(searchTerm);
            setCurrentPage(1);
        }, 300),
        [],
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        debouncedSearch(value);
    };

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <Star
                    key={i}
                    className={`w-5 h-5 ${
                        i <= rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300 dark:text-gray-600'
                    }`}
                />,
            );
        }
        return stars;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#657ED4] dark:border-[#5AD3AF]"></div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 min-h-screen">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg">
                <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="text-3xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                        <span>Review Management</span>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            ({allReviews.length})
                        </span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    {/* Search Input */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                        <div className="relative w-full sm:w-64">
                            <Input
                                type="text"
                                placeholder="Search reviews..."
                                onChange={handleSearchChange}
                                className="pl-10 pr-4 py-3 rounded-full border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] transition-all duration-300 shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                    </div>

                    {error && (
                        <div className="text-center p-6 bg-red-50 dark:bg-red-900/50 rounded-lg shadow-md">
                            <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
                        </div>
                    )}
                    {!error && allReviews.length === 0 ? (
                        <div className="text-center py-12 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <p className="text-lg font-medium">
                                {searchQuery
                                    ? 'No reviews match your search.'
                                    : 'No reviews found for this mentor.'}
                            </p>
                            {!searchQuery && (
                                <p className="text-sm mt-2">
                                    Reviews will appear here once submitted.
                                </p>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className="grid gap-6">
                                {displayReviews.map((review) => (
                                    <div
                                        key={review._id}
                                        className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <User className="h-5 w-5 text-[#657ED4] dark:text-[#5AD3AF]" />
                                                    <p className="text-gray-900 dark:text-gray-100 font-semibold">
                                                        {review.qaqc.fullName} ({review.qaqc.email})
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-1 mb-3">
                                                    {renderStars(review.rating)}
                                                    <span className="ml-2 text-gray-700 dark:text-gray-300 font-medium">
                                                        {review.rating}/5
                                                    </span>
                                                </div>
                                                <p className="text-gray-800 dark:text-gray-200 mb-3">
                                                    {review.comment}
                                                </p>
                                                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>
                                                        {new Date(
                                                            review.createdAt,
                                                        ).toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination Controls */}
                            {displayReviews.length > 0 && (
                                <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                                            Items per page:
                                        </span>
                                        <div className="relative">
                                            <select
                                                value={pageSize.toString()}
                                                onChange={(e) =>
                                                    handlePageSizeChange(e.target.value)
                                                }
                                                className="w-[100px] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] rounded-lg appearance-none px-3 py-2 pr-8"
                                            >
                                                <option value="5">5</option>
                                                <option value="10">10</option>
                                                <option value="20">20</option>
                                            </select>
                                            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                                <svg
                                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>

                                    <Pagination>
                                        <PaginationContent>
                                            <PaginationItem>
                                                <PaginationPrevious
                                                    onClick={() =>
                                                        handlePageChange(currentPage - 1)
                                                    }
                                                    className={`${
                                                        currentPage === 1
                                                            ? 'pointer-events-none opacity-50 cursor-not-allowed'
                                                            : 'text-[#657ED4] dark:text-[#5AD3AF] hover:text-[#424c70] dark:hover:text-[#4ac2a0] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full'
                                                    } border-gray-300 dark:border-gray-600`}
                                                />
                                            </PaginationItem>
                                            {getPageNumbers().map((page) => (
                                                <PaginationItem key={page}>
                                                    <PaginationLink
                                                        onClick={() => handlePageChange(page)}
                                                        isActive={currentPage === page}
                                                        className={
                                                            currentPage === page
                                                                ? 'bg-[#657ED4] dark:bg-[#5AD3AF] text-white hover:bg-[#424c70] dark:hover:bg-[#4ac2a0] rounded-full'
                                                                : 'text-[#657ED4] dark:text-[#5AD3AF] hover:text-[#424c70] dark:hover:text-[#4ac2a0] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full'
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
                                                    className={`${
                                                        currentPage === totalPages
                                                            ? 'pointer-events-none opacity-50 cursor-not-allowed'
                                                            : 'text-[#657ED4] dark:text-[#5AD3AF] hover:text-[#424c70] dark:hover:text-[#4ac2a0] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full'
                                                    } border-gray-300 dark:border-gray-600`}
                                                />
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                </div>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
