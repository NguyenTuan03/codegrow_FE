'use client';

import { useEffect, useState, useCallback } from 'react';
import { GetClass } from '@/lib/services/class/getclass';
import { format } from 'date-fns';
import { Card, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Calendar, Clock, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { AssignMentor } from '@/lib/services/class/assignmentor';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { debounce } from 'lodash';

interface ClassItem {
    _id: string;
    title: string;
    description: string;
    students: string[];
    schedule: {
        startDate: string;
        endDate: string;
        daysOfWeek: string[];
        time: string;
    };
    imgUrl?: string;
    bgColor?: string;
    mentor?: {
        _id: string;
        fullName: string;
        email: string;
    } | null;
}

export default function Classes() {
    const [classesItems, setClassesItems] = useState<ClassItem[]>([]);
    const [filteredClasses, setFilteredClasses] = useState<ClassItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const limit = 6;
    const router = useRouter();

    // Fetch current user ID from localStorage
    useEffect(() => {
        try {
            const user = localStorage.getItem('user');
            if (!user) {
                throw new Error('User data is missing');
            }
            const parsedUser = JSON.parse(user);
            setCurrentUserId(parsedUser.id);
        } catch (error) {
            console.error(
                'Error fetching user ID:',
                error instanceof Error ? error.message : error,
            );
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to load user data.',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
            router.push('/login');
        }
    }, [router]);

    const fetchClasses = async (page: number = 1) => {
        try {
            const data = await GetClass(page, limit);
            setClassesItems(data.metadata.classes);
            setFilteredClasses(data.metadata.classes);
            setCurrentPage(data.metadata.page);
            setTotalPages(data.metadata.totalPages);
        } catch (error) {
            console.error('Failed to fetch classes:', error);
            toast({
                title: 'Error',
                description: 'Failed to fetch classes',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleAssignMentor = async (classId: string) => {
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
            const user = localStorage.getItem('user');
            if (!tokenuser || !user) {
                throw new Error('Authentication token or user ID is missing');
            }
            const parsedUser = JSON.parse(user);
            const userId = parsedUser.id;

            await AssignMentor(tokenuser, classId, userId);
            toast({
                title: 'Success',
                description: 'Mentor assigned successfully',
                variant: 'default',
                className: 'bg-[#5AD3AF] text-white dark:text-black font-semibold',
            });
            router.push(`/mentor/classes/${classId}`);
        } catch (error) {
            console.error('Error assigning mentor:', error);
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to assign mentor',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
        }
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            setCurrentPage(page);
            setSearchQuery('');
        }
    };

    const debouncedSearch = useCallback(
        debounce((searchTerm: string) => {
            setSearchQuery(searchTerm);
        }, 300),
        [],
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        debouncedSearch(value);
    };

    useEffect(() => {
        let filtered = [...classesItems];
        if (searchQuery) {
            filtered = filtered.filter((classItem) =>
                [classItem.title || '', classItem.description || ''].some((field) =>
                    field.toLowerCase().includes(searchQuery.toLowerCase()),
                ),
            );
        }
        setFilteredClasses(filtered);
    }, [searchQuery, classesItems]);

    useEffect(() => {
        fetchClasses(currentPage);
    }, [currentPage]);

    if (!currentUserId) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <div className="relative inline-block">
                    <div className="w-16 h-16 border-4 border-[#657ED4] border-t-transparent rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 bg-[#5AD3AF] rounded-full"></div>
                    </div>
                </div>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 font-medium">
                    Loading...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            {/* Header Section */}
            <div className="container mx-auto pt-12 pb-6">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        <span className="block text-[#657ED4] dark:[#5AD3AF] bg-clip-text">
                            Manage Your Classes
                        </span>
                    </h1>
                    <p className="sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-medium">
                        Organize, assign mentors, and dive into your learning sessions with ease.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6">
                {loading ? (
                    <div className="text-center text-gray-600 dark:text-gray-400 py-12">
                        <div className="relative inline-block">
                            <div className="w-16 h-16 border-4 border-[#657ED4] border-t-transparent rounded-full animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-8 h-8 bg-[#5AD3AF] rounded-full"></div>
                            </div>
                        </div>
                        <p className="mt-4 text-lg font-medium">Loading classes...</p>
                    </div>
                ) : (
                    <>
                        {/* Search Input */}
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                            <div className="relative w-full sm:w-64">
                                <Input
                                    type="text"
                                    placeholder="Search classes..."
                                    onChange={handleSearchChange}
                                    className="pl-10 pr-4 py-3 rounded-full border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] transition-all duration-300 shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                                />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            </div>
                        </div>

                        {filteredClasses.length === 0 ? (
                            <div className="text-center text-gray-600 dark:text-gray-400 py-12">
                                <p className="text-lg font-medium">
                                    {searchQuery
                                        ? 'No classes match your search.'
                                        : 'No classes available at the moment.'}
                                </p>
                                <Button
                                    onClick={() => {
                                        setSearchQuery('');
                                        fetchClasses(1);
                                    }}
                                    className="mt-4 rounded-lg px-6 py-2 bg-[#5AD3AF] hover:bg-[#4ac2a0] text-white transition-all duration-200 shadow-md font-medium"
                                >
                                    {searchQuery ? 'Clear Search' : 'Refresh'}
                                </Button>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredClasses.map((course) => {
                                        const isAssignedMentor =
                                            course.mentor && course.mentor._id === currentUserId;

                                        return (
                                            <Card
                                                key={course._id}
                                                className="relative overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                            >
                                                <div
                                                    className="h-36 w-full relative overflow-hidden rounded-t-xl"
                                                    style={{
                                                        backgroundImage: course.imgUrl
                                                            ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${course.imgUrl})`
                                                            : course.bgColor
                                                              ? course.bgColor
                                                              : 'linear-gradient(to right, #5AD3AF, #657ED4)',
                                                        backgroundColor: course.imgUrl
                                                            ? 'transparent'
                                                            : '#5AD3AF',
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center',
                                                    }}
                                                >
                                                    <div className="absolute bottom-4 left-4 text-white">
                                                        <h3 className="text-2xl font-semibold line-clamp-1">
                                                            {course.title}
                                                        </h3>
                                                    </div>
                                                </div>
                                                <CardContent className="pt-4 px-4 space-y-3">
                                                    <CardDescription className="line-clamp-2 text-gray-600 dark:text-gray-400 text-base font-medium">
                                                        {course.description}
                                                    </CardDescription>
                                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-base">
                                                        <Users className="h-4 w-4" />
                                                        <span>
                                                            {course.students.length} students
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-base">
                                                        <Calendar className="h-4 w-4" />
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
                                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-base">
                                                        <Clock className="h-4 w-4" />
                                                        <span>{course.schedule.time}</span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-1">
                                                        {course.schedule.daysOfWeek.map((day) => (
                                                            <Badge
                                                                key={day}
                                                                variant="outline"
                                                                className="text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 text-xs font-medium"
                                                            >
                                                                {day}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </CardContent>
                                                <CardFooter className="px-4 pb-4">
                                                    {isAssignedMentor ? (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="w-full rounded-full cursor-pointer text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-[#657ED4] hover:text-white dark:hover:bg-[#5AD3AF] dark:hover:text-black transition-all duration-200 font-medium"
                                                            onClick={() =>
                                                                router.push(
                                                                    `/mentor/classes/${course._id}`,
                                                                )
                                                            }
                                                        >
                                                            View Details
                                                        </Button>
                                                    ) : course.mentor ? (
                                                        <p className="text-base text-gray-500 dark:text-gray-400 font-medium">
                                                            Assigned to {course.mentor.fullName}
                                                        </p>
                                                    ) : (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="w-full rounded-full cursor-pointer text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-[#5AD3AF] hover:text-white dark:hover:bg-[#5AD3AF] dark:hover:text-black transition-all duration-200 font-medium"
                                                            onClick={() =>
                                                                handleAssignMentor(course._id)
                                                            }
                                                        >
                                                            Assign Mentor
                                                        </Button>
                                                    )}
                                                </CardFooter>
                                            </Card>
                                        );
                                    })}
                                </div>
                                {totalPages > 1 && (
                                    <div className="mt-10  flex justify-center">
                                        <Pagination>
                                            <PaginationContent>
                                                <PaginationItem>
                                                    <PaginationPrevious
                                                        onClick={() =>
                                                            handlePageChange(currentPage - 1)
                                                        }
                                                        className={`text-[#657ED4]  cursor-pointer mb-10 dark:text-[#5AD3AF] hover:text-[#424c70] dark:hover:text-[#4ac2a0] hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1 rounded-md transition-colors ${
                                                            currentPage === 1
                                                                ? 'pointer-events-none opacity-50'
                                                                : ''
                                                        }`}
                                                    />
                                                </PaginationItem>
                                                {Array.from(
                                                    { length: Math.min(5, totalPages) },
                                                    (_, i) => {
                                                        let pageNum;
                                                        if (totalPages <= 5) {
                                                            pageNum = i + 1;
                                                        } else if (currentPage <= 3) {
                                                            pageNum = i + 1;
                                                        } else if (currentPage >= totalPages - 2) {
                                                            pageNum = totalPages - 4 + i;
                                                        } else {
                                                            pageNum = currentPage - 2 + i;
                                                        }
                                                        return (
                                                            <PaginationItem key={pageNum}>
                                                                <PaginationLink
                                                                    onClick={() =>
                                                                        handlePageChange(pageNum)
                                                                    }
                                                                    isActive={
                                                                        currentPage === pageNum
                                                                    }
                                                                    className={
                                                                        currentPage === pageNum
                                                                            ? 'bg-[#657ED4] mb-10 dark:bg-[#5AD3AF] text-white hover:bg-[#424c70] dark:hover:bg-[#4ac2a0] px-3 py-1 rounded-md transition-colors'
                                                                            : 'text-[#657ED4] mb-10 dark:text-[#5AD3AF] hover:text-[#424c70] dark:hover:text-[#4ac2a0] hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1 rounded-md transition-colors'
                                                                    }
                                                                >
                                                                    {pageNum}
                                                                </PaginationLink>
                                                            </PaginationItem>
                                                        );
                                                    },
                                                )}
                                                <PaginationItem>
                                                    <PaginationNext
                                                        onClick={() =>
                                                            handlePageChange(currentPage + 1)
                                                        }
                                                        className={`text-[#657ED4] cursor-pointer mb-10 dark:text-[#5AD3AF] hover:text-[#424c70] dark:hover:text-[#4ac2a0] hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1 rounded-md transition-colors ${
                                                            currentPage === totalPages
                                                                ? 'pointer-events-none opacity-50'
                                                                : ''
                                                        }`}
                                                    />
                                                </PaginationItem>
                                            </PaginationContent>
                                        </Pagination>
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
