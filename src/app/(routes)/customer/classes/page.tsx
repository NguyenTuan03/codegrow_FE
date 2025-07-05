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
    PaginationEllipsis,
} from '@/components/ui/pagination';
import { debounce } from 'lodash';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

// Animation variants (unchanged)
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const popupVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
};

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
    const [filteredClasses, setFilteredClasses] = useState<ClassItem[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isJoinModalOpen, setIsJoinModalOpen] = useState(false); // New state for join modal
    const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
    const limit = 6;

    // Fetch user ID (unchanged)
    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (!userData) {
            return;
        }

        const user = JSON.parse(userData);
        const id = user._id;

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

    // Fetch classes (unchanged)
    const fetchClasses = async (page: number = 1) => {
        try {
            setLoading(true);
            const data = await GetClass(page, limit);
            if (data?.metadata?.classes) {
                setClassesItems(data.metadata.classes);
                setFilteredClasses(data.metadata.classes);
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
            setFilteredClasses([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClasses(currentPage);
    }, [currentPage]);

    // Pagination (unchanged)
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            setCurrentPage(page);
            setSearchQuery('');
        }
    };

    const getPaginationRange = () => {
        const delta = 2;
        const range: (number | string)[] = [];
        const start = Math.max(1, currentPage - delta);
        const end = Math.min(totalPages, currentPage + delta);

        if (start > 1) {
            range.push(1);
            if (start > 2) range.push('...');
        }

        for (let i = start; i <= end; i++) {
            range.push(i);
        }

        if (end < totalPages) {
            if (end < totalPages - 1) range.push('...');
            range.push(totalPages);
        }

        return range;
    };

    // Modal controls
    const openModal = (classItem: ClassItem) => {
        setSelectedClass(classItem);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedClass(null);
    };

    const openJoinModal = (classItem: ClassItem) => {
        setSelectedClass(classItem);
        setIsJoinModalOpen(true);
    };

    const closeJoinModal = () => {
        setIsJoinModalOpen(false);
        setSelectedClass(null);
    };

    // Handle class action (updated)
    const handleClassAction = (classId: string, isEnrolled: boolean, classItem: ClassItem) => {
        if (isEnrolled) {
            router.push(`/customer/classes/${classId}`);
        } else {
            openJoinModal(classItem); // Open join modal instead of navigating
        }
    };

    // Handle join class navigation
    const handleJoinClass = () => {
        router.push('/customer/more');
        closeJoinModal();
    };

    // Search (unchanged)
    const debouncedSearch = useCallback(
        debounce((searchTerm: string) => {
            if (!searchTerm) {
                setFilteredClasses(classesItems);
                return;
            }
            const filtered = classesItems.filter((classItem) =>
                classItem.title.toLowerCase().includes(searchTerm.toLowerCase()),
            );
            setFilteredClasses(filtered);
        }, 300),
        [classesItems],
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value;
        setSearchQuery(value);
        debouncedSearch(value);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-6 sm:p-6 mx-auto py-6 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen transition-colors duration-300"
        >
            <div className="max-w-8xl mx-auto">
                {/* Header and Search */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-6 gap-4 p-6"
                >
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                        Available Classes
                    </h1>
                    <div className="relative w-full sm:w-1/2 lg:w-1/3 p-6">
                        <Input
                            type="text"
                            placeholder="Search by class name"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="pl-10 pr-4 py-3 rounded-full border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] transition-all duration-300 shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 cursor-pointer"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                </motion.div>

                {loading ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-center items-center h-64 p-6"
                    >
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5AD3AF]"></div>
                    </motion.div>
                ) : filteredClasses.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="p-6"
                    >
                        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
                            <CardHeader className="p-6">
                                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                    No Classes Found
                                </CardTitle>
                                <CardDescription className="text-gray-600 dark:text-gray-400 text-base font-medium">
                                    It looks like there are no classes available at the moment.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </motion.div>
                ) : (
                    <>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
                        >
                            {filteredClasses.map((course) => {
                                const isEnrolled = currentUserId
                                    ? course.students.includes(currentUserId)
                                    : false;

                                return (
                                    <motion.div
                                        key={course._id}
                                        variants={itemVariants}
                                        whileHover={{
                                            scale: 1.03,
                                            boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.1)',
                                            transition: { duration: 0.3, ease: [0.42, 0, 0.58, 1] },
                                        }}
                                        className="cursor-pointer"
                                    >
                                        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md transition-all duration-300">
                                            <div
                                                className="h-70 relative overflow-hidden rounded-t-xl"
                                                style={{
                                                    backgroundImage: course.imgUrl
                                                        ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${course.imgUrl})`
                                                        : course.bgColor
                                                          ? course.bgColor
                                                          : 'linear-gradient(to bottom, #5AD3AF, #4ac2a0)', // Fallback gradient
                                                    backgroundColor: course.imgUrl
                                                        ? 'transparent'
                                                        : course.bgColor
                                                          ? course.bgColor
                                                          : '#5AD3AF', // Fallback solid color
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                    top: '-24px',
                                                }}
                                            />
                                            <CardHeader className="p-6">
                                                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100 line-clamp-1">
                                                    {course.title}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-6 space-y-3">
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
                                            <CardFooter className="p-6">
                                                <motion.div
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <Button
                                                        onClick={() =>
                                                            isEnrolled
                                                                ? openModal(course)
                                                                : openJoinModal(course)
                                                        }
                                                        className={`text-base ${
                                                            isEnrolled
                                                                ? 'bg-white dark:bg-gray-800 border-2 border-[#657ED4] dark:border-[#5AD3AF] text-[#657ED4] dark:text-[#5AD3AF] hover:bg-[#424c70] dark:hover:bg-[#4ac2a0] hover:text-white dark:hover:text-white'
                                                                : 'bg-[#657ED4] dark:bg-[#5AD3AF] border-2 border-[#657ED4] dark:border-[#5AD3AF] text-white hover:bg-[#424c70] dark:hover:bg-[#4ac2a0]'
                                                        } rounded-lg px-4 py-2 transition-colors duration-200 font-medium shadow-md cursor-pointer`}
                                                    >
                                                        {isEnrolled ? 'View Details' : 'Join Class'}
                                                    </Button>
                                                </motion.div>
                                            </CardFooter>
                                        </Card>
                                    </motion.div>
                                );
                            })}
                        </motion.div>

                        {/* Class Details Modal */}
                        <AnimatePresence>
                            {isModalOpen && selectedClass && (
                                <motion.div
                                    className="fixed inset-0 z-50 flex items-center justify-center p-6"
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    variants={backdropVariants}
                                >
                                    <motion.div
                                        className="fixed inset-0 bg-gray-200 bg-opacity-50 backdrop-blur-sm z-40"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    />
                                    <motion.div
                                        className="relative z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-6xl mx-auto p-6 max-h-[90vh] overflow-y-auto"
                                        variants={popupVariants}
                                    >
                                        <motion.button
                                            onClick={closeModal}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="absolute top-6 right-6 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 transition-colors cursor-pointer"
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
                                        </motion.button>
                                        <div className="flex flex-col items-center space-y-6 p-6">
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.1 }}
                                                className="relative h-70 w-full overflow-hidden rounded-t-xl mb-6"
                                                style={{
                                                    backgroundImage: selectedClass.imgUrl
                                                        ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${selectedClass.imgUrl})`
                                                        : selectedClass.bgColor
                                                          ? selectedClass.bgColor
                                                          : 'linear-gradient(to bottom, #5AD3AF, #4ac2a0)', // Fallback gradient
                                                    backgroundColor: selectedClass.imgUrl
                                                        ? 'transparent'
                                                        : selectedClass.bgColor
                                                          ? selectedClass.bgColor
                                                          : '#5AD3AF', // Fallback solid color
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                }}
                                            />
                                            <motion.h3
                                                initial={{ y: -10, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.2 }}
                                                className="text-4xl font-semibold text-gray-900 dark:text-gray-100 mb-6"
                                            >
                                                {selectedClass.title}
                                            </motion.h3>
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.3 }}
                                                className="text-xl text-gray-600 dark:text-gray-300 font-medium leading-relaxed text-center mb-6"
                                            >
                                                {selectedClass.description}
                                            </motion.p>
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.4 }}
                                                className="flex flex-wrap items-center gap-6 text-xl text-gray-600 dark:text-gray-300"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Users className="w-5 h-5 text-[#657ED4] dark:text-[#5AD3AF]" />
                                                    <span>
                                                        {selectedClass.students.length} students
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <User className="w-5 h-5 text-[#657ED4] dark:text-[#5AD3AF]" />
                                                    <span>
                                                        Mentor:{' '}
                                                        {selectedClass.mentor?.fullName ||
                                                            'Unknown'}
                                                    </span>
                                                </div>
                                            </motion.div>
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.5 }}
                                                className="flex flex-wrap gap-2 mb-6"
                                            >
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
                                            </motion.div>
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.6 }}
                                                className="flex flex-col sm:flex-row gap-6 w-full"
                                            >
                                                {currentUserId &&
                                                selectedClass.students.includes(currentUserId) ? (
                                                    <motion.div
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                    >
                                                        <Button
                                                            onClick={() =>
                                                                handleClassAction(
                                                                    selectedClass._id,
                                                                    true,
                                                                    selectedClass,
                                                                )
                                                            }
                                                            className="w-full text-base bg-[#657ED4] dark:bg-[#5AD3AF] hover:bg-[#5A6BBE] dark:hover:bg-[#4ac2a0] text-white font-semibold py-3 rounded-full transition-all duration-200 shadow-md cursor-pointer"
                                                        >
                                                            View Details
                                                        </Button>
                                                    </motion.div>
                                                ) : (
                                                    <motion.div
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                    >
                                                        <Button
                                                            onClick={() =>
                                                                handleClassAction(
                                                                    selectedClass._id,
                                                                    false,
                                                                    selectedClass,
                                                                )
                                                            }
                                                            className="w-full text-base bg-[#657ED4] dark:bg-[#5AD3AF] hover:bg-[#5A6BBE] dark:hover:bg-[#4ac2a0] text-white font-semibold py-3 rounded-full transition-all duration-200 shadow-md cursor-pointer"
                                                        >
                                                            Join Class
                                                        </Button>
                                                    </motion.div>
                                                )}
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Join Class Modal */}
                        <AnimatePresence>
                            {isJoinModalOpen && selectedClass && (
                                <motion.div
                                    className="fixed inset-0 z-50 flex items-center justify-center p-6"
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    variants={backdropVariants}
                                >
                                    <motion.div
                                        className="fixed inset-0 bg-gray-200 bg-opacity-50 backdrop-blur-sm z-40"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    />
                                    <motion.div
                                        className="relative z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-auto p-6 max-h-[90vh] overflow-y-auto"
                                        variants={popupVariants}
                                    >
                                        <motion.button
                                            onClick={closeJoinModal}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="absolute top-6 right-6 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 transition-colors cursor-pointer"
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
                                        </motion.button>
                                        <div className="flex flex-col items-center space-y-6 p-6">
                                            <motion.h3
                                                initial={{ y: -10, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.2 }}
                                                className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6"
                                            >
                                                Join {selectedClass.title}
                                            </motion.h3>
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.1 }}
                                                className="relative h-40 w-full overflow-hidden rounded-xl mb-6"
                                                style={{
                                                    backgroundImage: selectedClass.imgUrl
                                                        ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${selectedClass.imgUrl})`
                                                        : selectedClass.bgColor
                                                          ? selectedClass.bgColor
                                                          : 'linear-gradient(to bottom, #5AD3AF, #4ac2a0)', // Fallback gradient
                                                    backgroundColor: selectedClass.imgUrl
                                                        ? 'transparent'
                                                        : selectedClass.bgColor
                                                          ? selectedClass.bgColor
                                                          : '#5AD3AF', // Fallback solid color
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                }}
                                            />
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.3 }}
                                                className="text-lg text-gray-600 dark:text-gray-300 font-medium leading-relaxed text-center mb-6"
                                            >
                                                {selectedClass.description}
                                            </motion.p>
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.4 }}
                                                className="flex flex-wrap items-center gap-6 text-lg text-gray-600 dark:text-gray-300"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Users className="w-5 h-5 text-[#657ED4] dark:text-[#5AD3AF]" />
                                                    <span>
                                                        {selectedClass.students.length} students
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <User className="w-5 h-5 text-[#657ED4] dark:text-[#5AD3AF]" />
                                                    <span>
                                                        Mentor:{' '}
                                                        {selectedClass.mentor?.fullName ||
                                                            'Unknown'}
                                                    </span>
                                                </div>
                                            </motion.div>
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.5 }}
                                                className="flex flex-wrap gap-2 mb-6"
                                            >
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
                                            </motion.div>
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.6 }}
                                                className="text-center text-gray-600 dark:text-gray-300"
                                            >
                                                <p className="text-lg font-medium mb-6">
                                                    To join this class, please complete the contact
                                                    form with your details. Follow these steps:
                                                </p>
                                                <ul className="list-disc text-left pl-6 mb-6">
                                                    <li>Go to the "Classroom" page.</li>
                                                    <li>
                                                        Fill out the contact form with your
                                                        information.
                                                    </li>
                                                    <li>
                                                        Submit the form to apply for this class.
                                                    </li>
                                                </ul>
                                            </motion.div>
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.7 }}
                                                className="flex flex-col sm:flex-row gap-6 w-full"
                                            >
                                                <motion.div
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="flex-1"
                                                >
                                                    <Button
                                                        onClick={closeJoinModal}
                                                        variant="outline"
                                                        className="w-full text-base border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium py-3 rounded-full transition-all duration-200 shadow-md cursor-pointer"
                                                    >
                                                        Cancel
                                                    </Button>
                                                </motion.div>
                                                <motion.div
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="flex-1"
                                                >
                                                    <Button
                                                        onClick={handleJoinClass}
                                                        className="w-full text-base bg-[#657ED4] dark:bg-[#5AD3AF] hover:bg-[#5A6BBE] dark:hover:bg-[#4ac2a0] text-white font-semibold py-3 rounded-full transition-all duration-200 shadow-md cursor-pointer"
                                                    >
                                                        Go to Contact Form
                                                    </Button>
                                                </motion.div>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Pagination (unchanged) */}
                        {totalPages > 1 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mt-6 flex justify-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mx-auto"
                            >
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                className={`cursor-pointer text-gray-600 dark:text-gray-400 hover:text-[#657ED4] dark:hover:text-[#5AD3AF] ${
                                                    currentPage === 1
                                                        ? 'pointer-events-none opacity-50 cursor-not-allowed'
                                                        : ''
                                                }`}
                                            />
                                        </PaginationItem>
                                        {getPaginationRange().map((page, index) =>
                                            page === '...' ? (
                                                <PaginationItem key={`ellipsis-${index}`}>
                                                    <PaginationEllipsis />
                                                </PaginationItem>
                                            ) : (
                                                <PaginationItem key={page}>
                                                    <PaginationLink
                                                        onClick={() =>
                                                            handlePageChange(page as number)
                                                        }
                                                        isActive={currentPage === page}
                                                        className={`cursor-pointer ${
                                                            currentPage === page
                                                                ? 'bg-[#657ED4] text-white dark:bg-[#5AD3AF] dark:text-black font-medium rounded-lg'
                                                                : 'text-gray-600 dark:text-gray-400 hover:text-[#657ED4] dark:hover:text-[#5AD3AF]'
                                                        }`}
                                                    >
                                                        {page}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            ),
                                        )}
                                        <PaginationItem>
                                            <PaginationNext
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                className={`cursor-pointer text-gray-600 dark:text-gray-400 hover:text-[#657ED4] dark:hover:text-[#5AD3AF] ${
                                                    currentPage === totalPages
                                                        ? 'pointer-events-none opacity-50 cursor-not-allowed'
                                                        : ''
                                                }`}
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </motion.div>
                        )}
                    </>
                )}
            </div>
        </motion.div>
    );
}
