'use client';

import { useEffect, useState } from 'react';
import { GetClass } from '@/lib/services/class/getclass';
import { format } from 'date-fns';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

export default function Classes() {
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
        imgUrl?: string;
    }

    const [classesItems, setClassesItems] = useState<ClassItem[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 6;

    const fetchClasses = async (page: number = 1) => {
        try {
            const data = await GetClass(page, limit);
            console.log('Fetched classes data:', JSON.stringify(data, null, 2));
            if (data?.metadata?.classes) {
                setClassesItems(data.metadata.classes);
                setCurrentPage(data.metadata.page);
                setTotalPages(data.metadata.totalPages);
            } else {
                throw new Error('No classes found in the response.');
            }
        } catch (error) {
            console.error('Failed to fetch classes:', error);
            toast({
                title: 'Error',
                description: 'Failed to fetch classes',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
            setClassesItems([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClasses(currentPage);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        console.log(
            `Navigating to page ${page}, currentPage: ${currentPage}, totalPages: ${totalPages}`,
        );
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="container mx-auto py-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Class Management
                </h1>
                <div className="flex items-center gap-2">
                    <Button
                        onClick={() => router.push('/admin/classes/create')}
                        className="bg-[#657ED4] hover:bg-[#4a5da0] dark:bg-[#5AD3AF] dark:hover:bg-[#4ac2a0] text-white font-medium shadow-md rounded-lg px-4 py-2 transition-colors duration-200 cursor-pointer"
                    >
                        Create New Class
                    </Button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#657ED4] dark:border-[#5AD3AF]"></div>
                </div>
            ) : classesItems.length === 0 ? (
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-gray-900 dark:text-gray-100 font-bold">
                            No classes found
                        </CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400 font-medium">
                            Create your first class to get started
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button
                            onClick={() => router.push('/admin/classes/create')}
                            className="bg-[#657ED4] hover:bg-[#4a5da0] dark:bg-[#5AD3AF] dark:hover:bg-[#4ac2a0] text-white font-medium shadow-md rounded-lg px-4 py-2 transition-colors duration-200 cursor-pointer"
                        >
                            Create Class
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {classesItems.map((course) => (
                            <Card
                                key={course._id}
                                className="hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl"
                            >
                                <div
                                    className="h-40 relative overflow-hidden rounded-t-xl"
                                    style={{
                                        backgroundImage: course.imgUrl
                                            ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${course.imgUrl})`
                                            : 'linear-gradient(to bottom, #657ED4, #4a5da0)',
                                        backgroundColor: course.imgUrl ? 'transparent' : '#657ED4',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                />
                                <CardHeader>
                                    <CardTitle className="text-xl text-gray-900 dark:text-gray-100 font-bold">
                                        {course.title}
                                    </CardTitle>
                                    <CardDescription className="line-clamp-2 text-gray-600 dark:text-gray-400 font-medium">
                                        {course.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                            {course.students.length} students
                                        </span>
                                        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                            {course.mentor?.fullName || 'Unknown'}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {course.schedule.daysOfWeek.map((day) => (
                                            <Badge
                                                key={day}
                                                variant="outline"
                                                className="text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 font-medium"
                                            >
                                                {day}
                                            </Badge>
                                        ))}
                                        <Badge
                                            variant="outline"
                                            className="text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 font-medium"
                                        >
                                            <Clock className="h-3 w-3 mr-1 inline" />
                                            {course.schedule.time}
                                        </Badge>
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                        {format(
                                            new Date(course.schedule.startDate),
                                            'MMM dd, yyyy',
                                        )}{' '}
                                        -{' '}
                                        {format(new Date(course.schedule.endDate), 'MMM dd, yyyy')}
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#657ED4] dark:hover:text-[#5AD3AF] rounded-lg transition-colors duration-200 cursor-pointer"
                                        onClick={() => router.push(`/admin/classes/${course._id}`)}
                                    >
                                        View Details
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="mt-12 flex justify-center">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            className={
                                                currentPage === 1
                                                    ? 'pointer-events-none opacity-50 cursor-not-allowed'
                                                    : 'cursor-pointer text-gray-600 dark:text-gray-400 hover:text-[#657ED4] dark:hover:text-[#5AD3AF]'
                                            }
                                        />
                                    </PaginationItem>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                        (page) => (
                                            <PaginationItem key={page}>
                                                <PaginationLink
                                                    onClick={() => handlePageChange(page)}
                                                    isActive={currentPage === page}
                                                    className={
                                                        currentPage === page
                                                            ? 'bg-[#657ED4] text-white dark:bg-[#5AD3AF] dark:text-black font-medium rounded-lg cursor-pointer'
                                                            : 'cursor-pointer text-gray-600 dark:text-gray-400 hover:text-[#657ED4] dark:hover:text-[#5AD3AF]'
                                                    }
                                                >
                                                    {page}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ),
                                    )}
                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            className={
                                                currentPage === totalPages
                                                    ? 'pointer-events-none opacity-50 cursor-not-allowed'
                                                    : 'cursor-pointer text-gray-600 dark:text-gray-400 hover:text-[#657ED4] dark:hover:text-[#5AD3AF]'
                                            }
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
