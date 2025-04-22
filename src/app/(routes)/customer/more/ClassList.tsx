// @/components/CoursesList.tsx
'use client';

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
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5AD3AF]"></div>
            </div>
        );
    }

    if (classesItems.length === 0) {
        return (
            <Card className="bg-white dark:bg-gray-800 shadow-xl border border-[#EEF1EF] dark:border-[#657ED4]/30 rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-[#657ED4] dark:text-[#5AD3AF]">
                        No courses available
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                        Check back later for new courses!
                    </CardDescription>
                </CardHeader>
            </Card>
        );
    }

    return (
        <div className="relative">
            <h2 className="text-xl text-center sm:text-2xl font-semibold text-[#657ED4] dark:text-[#5AD3AF] mb-6">
                Available Class
            </h2>
            <Carousel className="w-full">
                <CarouselContent className="-ml-4">
                    {classesItems.map((course) => (
                        <CarouselItem
                            key={course._id}
                            className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                        >
                            <CourseCard course={course} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#657ED4] dark:text-[#5AD3AF] hover:bg-[#EEF1EF] dark:hover:bg-gray-700 rounded-full transition-colors" />
                <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#657ED4] dark:text-[#5AD3AF] hover:bg-[#EEF1EF] dark:hover:bg-gray-700 rounded-full transition-colors" />
            </Carousel>

            {totalPages > 1 && (
                <div className="mt-8 flex justify-center space-x-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            currentPage === 1
                                ? 'opacity-50 cursor-not-allowed'
                                : 'text-[#657ED4] dark:text-[#5AD3AF] hover:bg-[#EEF1EF] dark:hover:bg-gray-700'
                        }`}
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2 text-gray-600 dark:text-gray-400">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            currentPage === totalPages
                                ? 'opacity-50 cursor-not-allowed'
                                : 'text-[#657ED4] dark:text-[#5AD3AF] hover:bg-[#EEF1EF] dark:hover:bg-gray-700'
                        }`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
