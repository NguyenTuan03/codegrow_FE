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
import { Users, Calendar, Clock, User } from 'lucide-react';
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

export default function Classes() {
    const [classesItems, setClassesItems] = useState<ClassItem[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 6;
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    // Fetch the current user's ID from localStorage (or your auth system)
    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (!userData) {
            throw new Error('User data is missing');
        }

        const user = JSON.parse(userData);
        const id = user.id;

        if (id) {
            setCurrentUserId(id);
        } else {
            console.warn('No user ID found. User might not be logged in.');
            toast({
                title: 'Warning',
                description: 'Please log in to access class features.',
                variant: 'destructive',
            });
        }
    }, []);

    const fetchClasses = async (page: number = 1) => {
        try {
            const data = await GetClass(page, limit);
            console.log('GetClass Response:', JSON.stringify(data, null, 2));
            setClassesItems(data.metadata.classes);
            setCurrentPage(data.metadata.page);
            setTotalPages(data.metadata.totalPages);
        } catch (error) {
            console.error('Failed to fetch classes:', error);
            toast({
                title: 'Error',
                description: 'Failed to fetch classes',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClasses(currentPage);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            setCurrentPage(page);
        }
    };

    const handleClassAction = (classId: string, isEnrolled: boolean) => {
        console.log('Handling action for class ID:', classId, 'Is Enrolled:', isEnrolled);
        if (isEnrolled) {
            router.push(`/customer/classes/${classId}`);
        } else {
            router.push('/customer/more');
        }
    };

    return (
        <div className="p-6 sm:p-10 mx-auto py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                    Available Classes
                </h1>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5AD3AF]"></div>
                </div>
            ) : classesItems.length === 0 ? (
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                            No Classes Found
                        </CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400 text-base">
                            It looks like there are no classes available at the moment.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button
                            onClick={() => router.push('/admin/classes/create')}
                            className="bg-[#5AD3AF] hover:bg-[#4ac2a0] text-white rounded-lg px-6 py-2 transition-colors duration-200"
                        >
                            Create a Class
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {classesItems.map((course) => {
                            // Check if the current user's ID is in the class's students array
                            const isEnrolled = currentUserId
                                ? course.students.includes(currentUserId)
                                : false;

                            return (
                                <Card
                                    key={course._id}
                                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl"
                                >
                                    <div
                                        className={`h-40 ${course.bgColor || 'bg-gradient-to-r from-[#5AD3AF] to-[#4ac2a0]'} relative overflow-hidden rounded-t-xl`}
                                    >
                                        {course.image && (
                                            <img
                                                src={course.image}
                                                alt={course.title}
                                                className="w-full h-full object-cover opacity-80"
                                            />
                                        )}
                                    </div>
                                    <CardHeader className="pt-4">
                                        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
                                            {course.title}
                                        </CardTitle>
                                        <CardDescription className="text-gray-600 dark:text-gray-400 line-clamp-2 text-sm">
                                            {course.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <Users className="h-4 w-4 text-[#5AD3AF]" />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                {course.students.length} students
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-[#5AD3AF]" />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                {course.mentor?.fullName || 'Unknown'}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {course.schedule.daysOfWeek.map((day) => (
                                                <Badge
                                                    key={day}
                                                    variant="outline"
                                                    className="text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 text-xs"
                                                >
                                                    {day}
                                                </Badge>
                                            ))}
                                            <Badge
                                                variant="outline"
                                                className="text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 text-xs"
                                            >
                                                <Clock className="h-3 w-3 mr-1 inline" />
                                                {course.schedule.time}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <Calendar className="h-4 w-4 text-[#5AD3AF]" />
                                            <span>
                                                {format(
                                                    new Date(course.schedule.startDate),
                                                    'MMM dd, yyyy',
                                                )}{' '}
                                                -{' '}
                                                {format(
                                                    new Date(course.schedule.endDate),
                                                    'MMM dd, yyyy',
                                                )}
                                            </span>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                        <Button
                                            onClick={() =>
                                                handleClassAction(course._id, isEnrolled)
                                            }
                                            className={`${
                                                isEnrolled
                                                    ? 'bg-[#5AD3AF] hover:bg-[#4ac2a0]'
                                                    : 'bg-blue-600 hover:bg-blue-700'
                                            } text-white rounded-lg px-4 py-2 transition-colors duration-200`}
                                        >
                                            {isEnrolled ? 'View Details' : 'Enroll'}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            );
                        })}
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
                                                    ? 'pointer-events-none opacity-50'
                                                    : 'cursor-pointer text-gray-600 dark:text-gray-400 hover:text-[#5AD3AF] dark:hover:text-[#5AD3AF]'
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
                                                            ? 'bg-[#5AD3AF] text-white rounded-lg'
                                                            : 'cursor-pointer text-gray-600 dark:text-gray-400 hover:text-[#5AD3AF] dark:hover:text-[#5AD3AF]'
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
                                                    ? 'pointer-events-none opacity-50'
                                                    : 'cursor-pointer text-gray-600 dark:text-gray-400 hover:text-[#5AD3AF] dark:hover:text-[#5AD3AF]'
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
