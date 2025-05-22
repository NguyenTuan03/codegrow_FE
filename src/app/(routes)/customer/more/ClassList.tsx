'use client';

import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from '@/components/ui/carousel';
import CourseCard from '@/app/(routes)/customer/more/ClassCard';

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
    const router = useRouter(); // Initialize useRouter for navigation

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5AD3AF]"></div>
            </div>
        );
    }

    if (classesItems.length === 0) {
        return (
            <Card className="bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                        No Courses Available
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400 text-base">
                        Check back later for new courses, or contact us to request a new class!
                    </CardDescription>
                </CardHeader>
            </Card>
        );
    }

    return (
        <div className="relative py-6">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-8 text-center">
                Available Classes
            </h2>
            <Carousel className="w-full px-4 sm:px-8">
                <CarouselContent className="-ml-4">
                    {classesItems.map((course) => (
                        <CarouselItem
                            key={course._id}
                            className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                        >
                            <CourseCard course={course} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 text-[#5AD3AF] hover:bg-[#5AD3AF] hover:text-white dark:hover:bg-[#5AD3AF] dark:hover:text-white rounded-full shadow-md transition-colors duration-300" />
                <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 text-[#5AD3AF] hover:bg-[#5AD3AF] hover:text-white dark:hover:bg-[#5AD3AF] dark:hover:text-white rounded-full shadow-md transition-colors duration-300" />
            </Carousel>

            {totalPages > 1 && (
                <div className="mt-10 flex justify-center items-center gap-3">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-lg transition-colors duration-300 text-sm font-medium ${
                            currentPage === 1
                                ? 'opacity-50 cursor-not-allowed text-gray-400 dark:text-gray-600'
                                : 'text-[#5AD3AF] hover:bg-[#5AD3AF] hover:text-white dark:hover:bg-[#5AD3AF] dark:hover:text-white'
                        }`}
                    >
                        Previous
                    </button>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-lg transition-colors duration-300 text-sm font-medium ${
                            currentPage === totalPages
                                ? 'opacity-50 cursor-not-allowed text-gray-400 dark:text-gray-600'
                                : 'text-[#5AD3AF] hover:bg-[#5AD3AF] hover:text-white dark:hover:bg-[#5AD3AF] dark:hover:text-white'
                        }`}
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Explore More Classes Button */}
            <div className="mt-10 flex justify-center">
                <button
                    onClick={() => router.push('/customer/classes')}
                    className="px-6 py-3 bg-[#5AD3AF] text-white rounded-lg font-semibold hover:bg-[#4ac2a0] transition-colors duration-300 shadow-md"
                >
                    Explore More Classes
                </button>
            </div>
        </div>
    );
}
