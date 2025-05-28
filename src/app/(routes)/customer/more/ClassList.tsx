'use client';

import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from '@/components/ui/carousel';
import CourseCard from '@/app/(routes)/customer/more/ClassCard';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

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

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#657ED4] dark:border-[#5AD3AF]"></div>
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
            <h2 className="md:text-4xl font-bold text-[#657ED4] dark:text-[#5AD3AF] mb-8 text-center">
                Available Classes
            </h2>
            <div className="relative">
                <Carousel className="w-full">
                    <CarouselContent className="px-12 gap-4">
                        {classesItems.map((course) => (
                            <CarouselItem
                                key={course._id}
                                className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex flex-col h-full"
                            >
                                <CourseCard course={course} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-100 dark:bg-gray-800 text-[#657ED4] dark:text-[#5AD3AF] hover:bg-[#657ED4] dark:hover:bg-[#5AD3AF] hover:text-white dark:hover:text-white rounded-full shadow-md transition-all duration-300 hover:scale-110 border border-gray-100 dark:border-gray-700 w-10 h-10" />
                    <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-100 dark:bg-gray-800 text-[#657ED4] dark:text-[#5AD3AF] hover:bg-[#657ED4] dark:hover:bg-[#5AD3AF] hover:text-white dark:hover:text-white rounded-full shadow-md transition-all duration-300 hover:scale-110 border border-gray-100 dark:border-gray-700 w-10 h-10" />
                </Carousel>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-10 flex justify-center">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    className={
                                        currentPage === 1
                                            ? 'pointer-events-none opacity-50'
                                            : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full'
                                    }
                                />
                            </PaginationItem>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <PaginationItem key={page}>
                                    <PaginationLink
                                        onClick={() => handlePageChange(page)}
                                        isActive={currentPage === page}
                                        className={
                                            currentPage === page
                                                ? 'bg-[#657ED4] dark:bg-[#5AD3AF] text-white hover:bg-[#5A6BBE] dark:hover:bg-[#4ac2a0] rounded-full underline underline-offset-4'
                                                : 'cursor-pointer text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-full'
                                        }
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    className={
                                        currentPage === totalPages
                                            ? 'pointer-events-none opacity-50'
                                            : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full'
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
                    className="px-6 py-3 bg-[#657ED4] dark:bg-[#5AD3AF] text-white rounded-full font-semibold hover:bg-[#5A6BBE] dark:hover:bg-[#4ac2a0] transition-all duration-300 shadow-md text-base md:text-base hover:scale-105"
                >
                    Explore More Classes
                </button>
            </div>
        </div>
    );
}
