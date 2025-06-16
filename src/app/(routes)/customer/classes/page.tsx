'use client';

import { useEffect, useState, useCallback } from 'react';
import { GetClass } from '@/lib/services/class/getclass';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Clock, User, Search } from 'lucide-react';
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
import { debounce } from 'lodash';
import { Input } from '@/components/ui/input';

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
    bgColor?: string;
}

export default function Classes() {
    const [classesItems, setClassesItems] = useState<ClassItem[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
    const limit = 6;

    // Fetch the current user's ID from localStorage
    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (!userData) {
            toast({
                title: 'Error',
                description: 'User data is missing. Please log in.',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
            return;
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
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
        }
    }, []);

    const fetchClasses = async (page: number = 1) => {
        try {
            const data = await GetClass(page, limit);
            console.log('GetClass Response:', JSON.stringify(data, null, 2));
            if (data?.metadata?.classes) {
                setClassesItems(data.metadata.classes); // Lưu danh sách gốc
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

    const openModal = (classItem: ClassItem) => {
        setSelectedClass(classItem);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedClass(null);
    };

    const handleClassAction = (classId: string, isEnrolled: boolean) => {
        console.log('Handling action for class ID:', classId, 'Is Enrolled:', isEnrolled);
        if (isEnrolled) {
            router.push(`/customer/classes/${classId}`);
        } else {
            router.push('/customer/more');
        }
    };

    // Sử dụng useCallback để tối ưu hóa debounce
    const debouncedSearch = useCallback(
        debounce((searchTerm) => {
            if (!searchTerm) {
                fetchClasses(currentPage); // Lấy lại danh sách gốc nếu không có từ khóa
                return;
            }
            const filteredClasses = classesItems.filter((classItem) =>
                classItem.title.toLowerCase().includes(searchTerm.toLowerCase()),
            );
            setClassesItems(filteredClasses); // Cập nhật danh sách với kết quả lọc
        }, 300), // Độ trễ 300ms
        [classesItems, currentPage], // Phụ thuộc vào classesItems và currentPage
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value;
        setSearchQuery(value); // Cập nhật trạng thái tìm kiếm
        debouncedSearch(value); // Gọi hàm debounce với giá trị mới
    };

    return (
        <div className="p-6 sm:p-10 mx-auto py-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen transition-colors duration-300">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                    Available Classes
                </h1>
                <div className="relative w-full sm:w-1/2 lg:w-1/3">
                    <Input
                        type="text"
                        placeholder="Search by class name"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="pl-10 pr-4 py-3 rounded-full border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] transition-all duration-300 shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5AD3AF]"></div>
                </div>
            ) : classesItems.length === 0 ? (
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            No Classes Found
                        </CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400 text-base font-medium">
                            It looks like there are no classes available at the moment.
                        </CardDescription>
                    </CardHeader>
                </Card>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {classesItems.map((course) => {
                            const isEnrolled = currentUserId
                                ? course.students.includes(currentUserId)
                                : false;

                            return (
                                <Card
                                    key={course._id}
                                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl"
                                >
                                    <div
                                        className="h-70 relative overflow-hidden rounded-t-xl"
                                        style={{
                                            backgroundImage: course.imgUrl
                                                ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${course.imgUrl})`
                                                : course.bgColor
                                                  ? course.bgColor
                                                  : 'linear-gradient(to bottom, #5AD3AF, #4ac2a0)',
                                            backgroundColor: course.imgUrl
                                                ? 'transparent'
                                                : '#5AD3AF',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                    />
                                    <CardHeader className="pt-4">
                                        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100 line-clamp-1">
                                            {course.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-[#657ED4] dark:text-[#5AD3AF]" />
                                            <span className="text-xl text-gray-600 dark:text-gray-400 font-medium">
                                                {course.mentor?.fullName || 'Unknown'}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {course.schedule.daysOfWeek.map((day) => (
                                                <Badge
                                                    key={day}
                                                    variant="outline"
                                                    className="text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 text-base font-medium"
                                                >
                                                    {day}
                                                </Badge>
                                            ))}
                                            <Badge
                                                variant="outline"
                                                className="text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 text-base font-medium"
                                            >
                                                <Clock className="h-3 w-3 mr-1 inline" />
                                                {course.schedule.time}
                                            </Badge>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                        <Button
                                            onClick={() => openModal(course)}
                                            className={`${
                                                isEnrolled
                                                    ? 'bg-white dark:bg-gray-800 border-2 border-[#657ED4] dark:border-[#5AD3AF] text-[#657ED4] dark:text-[#5AD3AF] hover:bg-[#424c70] dark:hover:bg-[#4ac2a0] hover:text-white dark:hover:text-white'
                                                    : 'bg-[#657ED4] dark:bg-[#5AD3AF] border-2 border-[#657ED4] dark:border-[#5AD3AF] text-white hover:bg-[#424c70] dark:hover:bg-[#4ac2a0]'
                                            } rounded-lg px-4 py-2 transition-colors text-base duration-200 font-medium shadow-md cursor-pointer`}
                                        >
                                            {isEnrolled ? 'View Details' : 'Join Class'}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            );
                        })}
                    </div>

                    {/* Modal for Class Details */}
                    {isModalOpen && selectedClass && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-transparent">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-6xl mx-4 p-8 relative">
                                <button
                                    onClick={closeModal}
                                    className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 transition-colors"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                                <div className="flex flex-col items-center space-y-6">
                                    <div
                                        className="relative h-70 w-full overflow-hidden rounded-t-xl mb-4"
                                        style={{
                                            backgroundImage: selectedClass.imgUrl
                                                ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${selectedClass.imgUrl})`
                                                : selectedClass.bgColor
                                                  ? selectedClass.bgColor
                                                  : 'linear-gradient(to bottom, #5AD3AF, #4ac2a0)',
                                            backgroundColor: selectedClass.imgUrl
                                                ? 'transparent'
                                                : '#5AD3AF',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                    />
                                    <h3 className="text-4xl font-semibold text-gray-900 dark:text-gray-100 mb-2 cursor-default">
                                        {selectedClass.title}
                                    </h3>
                                    <p className="text-xl text-gray-600 dark:text-gray-300 font-medium leading-relaxed text-center mb-4 cursor-default">
                                        {selectedClass.description}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xl text-gray-600 dark:text-gray-300">
                                        <div className="flex items-center gap-2">
                                            <Users className="w-5 h-5 text-[#657ED4] dark:text-[#5AD3AF]" />
                                            <span>{selectedClass.students.length} students</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <User className="w-5 h-5 text-[#657ED4] dark:text-[#5AD3AF]" />
                                            <span>
                                                Mentor:{' '}
                                                {selectedClass.mentor?.fullName || 'Unknown'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {selectedClass.schedule.daysOfWeek.map((day) => (
                                            <Badge
                                                key={day}
                                                variant="outline"
                                                className="text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 text-base font-medium"
                                            >
                                                {day}
                                            </Badge>
                                        ))}
                                        <Badge
                                            variant="outline"
                                            className="text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 text-base font-medium"
                                        >
                                            <Clock className="h-4 w-4 mr-1 inline" />
                                            {selectedClass.schedule.time}
                                        </Badge>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                                        {currentUserId &&
                                        selectedClass.students.includes(currentUserId) ? (
                                            <Button
                                                onClick={() =>
                                                    handleClassAction(selectedClass._id, true)
                                                }
                                                className="w-full text-base bg-[#657ED4] dark:bg-[#5AD3AF] hover:bg-[#5A6BBE] dark:hover:bg-[#4ac2a0] text-white font-semibold py-3 rounded-full transition-all duration-200 shadow-md cursor-pointer"
                                            >
                                                View Details
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={() =>
                                                    handleClassAction(selectedClass._id, false)
                                                }
                                                className="w-full text-base bg-[#657ED4] dark:bg-[#5AD3AF] hover:bg-[#5A6BBE] dark:hover:bg-[#4ac2a0] text-white font-semibold py-3 rounded-full transition-all duration-200 shadow-md cursor-pointer"
                                            >
                                                Join Class
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

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
