'use client';

import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import CourseCard from '@/app/(routes)/customer/more/ClassCard';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { debounce } from 'lodash';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';

interface ClassItem {
    _id: string;
    title: string;
    description: string;
    students: string[];
    mentor: {
        _id: string;
        fullName: string;
        email: string;
        phone: string;
        image?: string;
    };
    schedule: {
        startDate: string;
        endDate: string;
        daysOfWeek: string[];
        time: string;
    };
    image?: string;
    bgColor?: string;
}

interface CoursesListProps {
    classesItems: ClassItem[];
    loading: boolean;
    currentPage: number;
    totalPages: number;
    handlePageChange: (page: number) => void;
}

export default function CoursesList({
    classesItems,
    loading,
    currentPage,
    totalPages,
    handlePageChange,
}: CoursesListProps) {
    const router = useRouter();

    // Local state to track pagination activity
    const [isPaginating, setIsPaginating] = useState(false);

    // Debounced handlePageChange to prevent rapid clicks and respect isPaginating
    const debouncedHandlePageChange = debounce((page: number) => {
        if (!isPaginating && !loading) {
            setIsPaginating(true);
            handlePageChange(page);
            // Reset isPaginating after a short delay (should ideally sync with parent's loading)
            setTimeout(() => setIsPaginating(false), 500); // Adjust delay as needed
        }
    }, 300); // 300ms delay to debounce rapid clicks

    if (loading || isPaginating) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="flex flex-col h-full">
                        <Skeleton className="h-48 w-full rounded-xl" />
                        <div className="p-4 space-y-3">
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (classesItems.length === 0) {
        return (
            <Card className="bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 rounded-xl p-6">
                <CardHeader>
                    <CardTitle className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100">
                        No Courses Available
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                        Check back later for new courses, or contact us to request a new class!
                    </CardDescription>
                </CardHeader>
            </Card>
        );
    }

    return (
        <div className="relative py-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h2 className="md:text-4xl font-bold text-[#657ED4] dark:text-[#5AD3AF] text-center mx-auto">
                    Available Classes
                </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {classesItems.map((course) => (
                    <div key={course._id} className="flex flex-col h-full">
                        <CourseCard course={course} />
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-10 flex justify-center">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => debouncedHandlePageChange(currentPage - 1)}
                                    className={
                                        currentPage === 1 || loading || isPaginating
                                            ? 'pointer-events-none opacity-50 cursor-not-allowed'
                                            : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-[#657ED4] dark:hover:text-[#5AD3AF] rounded-full'
                                    }
                                />
                            </PaginationItem>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <PaginationItem key={page}>
                                    <PaginationLink
                                        onClick={() => debouncedHandlePageChange(page)}
                                        isActive={currentPage === page}
                                        className={
                                            currentPage === page || loading || isPaginating
                                                ? 'bg-[#657ED4] dark:bg-[#5AD3AF] text-white hover:bg-[#5A6BBE] dark:hover:bg-[#4ac2a0] rounded-full underline underline-offset-4 cursor-pointer'
                                                : 'cursor-pointer text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#657ED4] dark:hover:text-[#5AD3AF] rounded-full'
                                        }
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => debouncedHandlePageChange(currentPage + 1)}
                                    className={
                                        currentPage === totalPages || loading || isPaginating
                                            ? 'pointer-events-none opacity-50 cursor-not-allowed'
                                            : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-[#657ED4] dark:hover:text-[#5AD3AF] rounded-full'
                                    }
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}

            {/* Explore More Classes Button */}
            <div className="mt-10 flex justify-center">
                <button
                    onClick={() => router.push('/customer/classes')}
                    className="px-6 py-3 bg-[#657ED4] dark:bg-[#5AD3AF] text-white rounded-full font-semibold hover:bg-[#5A6BBE] dark:hover:bg-[#4ac2a0] transition-all duration-300 shadow-md text-base md:text-base hover:scale-105 cursor-pointer"
                >
                    Explore More Classes
                </button>
            </div>
        </div>
    );
}
