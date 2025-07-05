'use client';

import { useEffect, useState, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';
import { getUserDetail } from '@/lib/services/admin/getuserdetail';
import { GetServicesTicketMine } from '@/lib/services/services/getservicemine';
import { SendSupportService } from '@/lib/services/services/sendsupportservice';
import { Button } from '@/components/ui/button';
import { Book, MessageSquare, Send, Search } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { GetClass } from '@/lib/services/class/getclass';
import { debounce } from 'lodash';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'; // Assuming Popover is available

interface Course {
    _id: string;
    title: string;
}

interface Class {
    _id: string;
    title: string;
}

interface ServiceTicket {
    _id: string;
    title: string;
    message: string;
    course?: Course; // Made optional to handle undefined course
    repliedBy?: string;
    qaqcReply?: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    replyByFullName?: string;
}

const supportSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    message: z.string().min(1, 'Message is required'),
    courseId: z.string().optional(),
    classId: z.string().optional(),
});

export default function SupportPage() {
    const [tickets, setTickets] = useState<ServiceTicket[]>([]);
    const [filteredTickets, setFilteredTickets] = useState<ServiceTicket[]>([]);
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState<Course[]>([]);
    const [classes, setClasses] = useState<Class[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [isCourseOpen, setIsCourseOpen] = useState(false); // State to control Course Popover
    const [isClassOpen, setIsClassOpen] = useState(false); // State to control Class Popover
    const limit = 6;
    const router = useRouter();

    const form = useForm<z.infer<typeof supportSchema>>({
        resolver: zodResolver(supportSchema),
        defaultValues: {
            title: '',
            message: '',
            courseId: '',
            classId: '',
        },
    });

    const handleGetAllClass = async () => {
        try {
            const response = await GetClass();
            setClasses(response.metadata.classes || []);
        } catch (error) {
            console.error('Failed to fetch classes:', error);
            toast({
                title: 'Error',
                description: 'Failed to fetch your classes.',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
        }
    };

    const fetchUserCourses = async () => {
        try {
            const userId = localStorage.getItem('user');
            if (!userId) {
                toast({
                    title: 'Lỗi',
                    description: 'Bạn cần đăng nhập để xem thông tin chi tiết',
                    variant: 'destructive',
                    className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
                });
                router.push('/login');
                return;
            }
            const user = JSON.parse(userId);
            const id = user.id;
            const userDetail = await getUserDetail(id);
            setCourses(userDetail.metadata?.enrolledCourses || []);
        } catch (error) {
            console.error('Failed to fetch user courses:', error);
            toast({
                title: 'Error',
                description: 'Failed to fetch enrolled courses.',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
        }
    };

    const fetchTickets = async (page: number = 1) => {
        try {
            setLoading(true);
            const response = await GetServicesTicketMine(page, limit);
            console.log('API Response:', response);

            if (response?.metadata && Array.isArray(response.metadata)) {
                const normalizedTickets = await Promise.all(
                    response.metadata.map(async (ticket: ServiceTicket) => {
                        let replyByFullName: string | undefined;
                        if (ticket.repliedBy) {
                            try {
                                const userDetail = await getUserDetail(ticket.repliedBy);
                                replyByFullName = userDetail.metadata?.fullName || 'Unknown';
                            } catch (error) {
                                console.error(
                                    `Failed to fetch user details for ID ${ticket.repliedBy}:`,
                                    error,
                                );
                                replyByFullName = 'Unknown';
                            }
                        }
                        return {
                            ...ticket,
                            description: ticket.message || '',
                            status: ticket.status?.toLowerCase() || 'unknown',
                            title: ticket.title || 'Untitled',
                            replyByFullName,
                        };
                    }),
                );
                setTickets(normalizedTickets);
                setFilteredTickets(normalizedTickets);
                setCurrentPage(response.metadata.page || page);
                setTotalPages(
                    response.metadata.totalPages || Math.ceil(response.metadata.length / limit),
                );
            } else {
                throw new Error('Invalid response format from API');
            }
        } catch (error) {
            console.error('Failed to fetch service tickets:', error);
            toast({
                title: 'Error',
                description: 'Failed to fetch your service tickets.',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
            setTickets([]);
            setFilteredTickets([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (values: z.infer<typeof supportSchema>) => {
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast({
                    title: 'Lỗi',
                    description: 'Token không tồn tại. Vui lòng đăng nhập lại.',
                    variant: 'destructive',
                    className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
                });
                router.push('/login');
                return;
            }
            const tokenuser = JSON.parse(token);
            await SendSupportService({
                token: tokenuser,
                title: values.title,
                message: values.message,
                courseId: values.courseId || '',
                classId: values.classId || '',
            });
            toast({
                title: 'Success',
                description: 'Support request submitted successfully',
                className:
                    'bg-[#5AD3AF] dark:bg-[#5AD3AF] text-white dark:text-black font-semibold',
            });
            form.reset();
            fetchTickets(1);
        } catch (error) {
            console.error('Failed to submit support request:', error);
            toast({
                title: 'Error',
                description: 'Failed to submit support request',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            setCurrentPage(page);
            fetchTickets(page);
        }
    };

    useEffect(() => {
        let filtered = [...tickets];
        if (searchQuery) {
            filtered = filtered.filter((ticket) =>
                [ticket.title || '', ticket.message || '', ticket.course?.title || ''].some(
                    (field) => field.toLowerCase().includes(searchQuery.toLowerCase()),
                ),
            );
        }
        setFilteredTickets(filtered);
    }, [searchQuery, tickets]);

    const debouncedSearch = useCallback(
        debounce((searchTerm) => {
            setSearchQuery(searchTerm);
            setCurrentPage(1);
        }, 300),
        [],
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        debouncedSearch(value);
    };

    useEffect(() => {
        fetchUserCourses();
        fetchTickets(currentPage);
        handleGetAllClass();
    }, [currentPage]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#657ED4] dark:border-[#5AD3AF]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Support Request Form */}
                <div className="space-y-8">
                    <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#657ED4] to-[#4a5da0] dark:from-[#5AD3AF] dark:to-[#4ac2a0]">
                        📨 Request Support
                    </h2>
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center text-xl font-semibold text-gray-800 dark:text-gray-200">
                                                <Book className="h-5 w-5 mr-2 text-[#657ED4] dark:text-[#5AD3AF]" />
                                                Title
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter the title of your issue"
                                                    className={`border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] focus:border-transparent transition-all duration-200 ${
                                                        isSubmitting
                                                            ? 'opacity-50 cursor-not-allowed'
                                                            : ''
                                                    }`}
                                                    disabled={isSubmitting}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500 dark:text-red-400" />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <FormField
                                        control={form.control}
                                        name="courseId"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel className="flex items-center text-xl font-semibold text-gray-800 dark:text-gray-200">
                                                    <Book className="h-5 w-5 mr-2 text-[#657ED4] dark:text-[#5AD3AF]" />
                                                    Course (Optional)
                                                </FormLabel>
                                                <FormControl>
                                                    <Popover
                                                        open={isCourseOpen}
                                                        onOpenChange={setIsCourseOpen}
                                                    >
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                className={`w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] focus:border-transparent transition-all duration-200 ${
                                                                    isSubmitting ||
                                                                    courses.length === 0
                                                                        ? 'opacity-50 cursor-not-allowed'
                                                                        : ''
                                                                }`}
                                                                disabled={
                                                                    isSubmitting ||
                                                                    courses.length === 0
                                                                }
                                                            >
                                                                {field.value
                                                                    ? courses.find(
                                                                          (c) =>
                                                                              c._id === field.value,
                                                                      )?.title || 'Select a course'
                                                                    : 'Select a course (optional)'}
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                                            {courses.map((course) => (
                                                                <div
                                                                    key={course._id}
                                                                    onClick={() => {
                                                                        field.onChange(course._id);
                                                                        setIsCourseOpen(false); // Close Popover after selection
                                                                    }}
                                                                    className="hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200 py-2 px-4 cursor-pointer"
                                                                >
                                                                    {course.title}
                                                                </div>
                                                            ))}
                                                            {courses.length === 0 && (
                                                                <div className="text-gray-400 text-center py-2">
                                                                    No courses enrolled
                                                                </div>
                                                            )}
                                                        </PopoverContent>
                                                    </Popover>
                                                </FormControl>
                                                <FormMessage className="text-red-500 dark:text-red-400" />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="classId"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel className="flex items-center text-xl font-semibold text-gray-800 dark:text-gray-200">
                                                    <Book className="h-5 w-5 mr-2 text-[#657ED4] dark:text-[#5AD3AF]" />
                                                    Class (Optional)
                                                </FormLabel>
                                                <FormControl>
                                                    <Popover
                                                        open={isClassOpen}
                                                        onOpenChange={setIsClassOpen}
                                                    >
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                className={`w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] focus:border-transparent transition-all duration-200 ${
                                                                    isSubmitting ||
                                                                    classes.length === 0
                                                                        ? 'opacity-50 cursor-not-allowed'
                                                                        : ''
                                                                }`}
                                                                disabled={
                                                                    isSubmitting ||
                                                                    classes.length === 0
                                                                }
                                                            >
                                                                {field.value
                                                                    ? classes.find(
                                                                          (c) =>
                                                                              c._id === field.value,
                                                                      )?.title || 'Select a class'
                                                                    : 'Select a class (optional)'}
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                                            {classes.map((course) => (
                                                                <div
                                                                    key={course._id}
                                                                    onClick={() => {
                                                                        field.onChange(course._id);
                                                                        setIsClassOpen(false); // Close Popover after selection
                                                                    }}
                                                                    className="hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200 py-2 px-4 cursor-pointer"
                                                                >
                                                                    {course.title}
                                                                </div>
                                                            ))}
                                                            {classes.length === 0 && (
                                                                <div className="text-gray-400 text-center py-2">
                                                                    No class enrolled
                                                                </div>
                                                            )}
                                                        </PopoverContent>
                                                    </Popover>
                                                </FormControl>
                                                <FormMessage className="text-red-500 dark:text-red-400" />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center text-xl font-semibold text-gray-800 dark:text-gray-200">
                                                <MessageSquare className="h-5 w-5 mr-2 text-[#657ED4] dark:text-[#5AD3AF]" />
                                                Message
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Describe your issue..."
                                                    className={`border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] focus:border-transparent transition-all duration-200 resize-none h-32 ${
                                                        isSubmitting
                                                            ? 'opacity-50 cursor-not-allowed'
                                                            : ''
                                                    }`}
                                                    disabled={isSubmitting}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500 dark:text-red-400" />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex justify-end">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`bg-gradient-to-r from-[#657ED4] to-[#4a5da0] dark:from-[#5AD3AF] dark:to-[#4ac2a0] text-white rounded-lg px-6 py-2 focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] focus:outline-none transition-all duration-200 flex items-center ${
                                            isSubmitting
                                                ? 'opacity-50 cursor-not-allowed'
                                                : 'hover:from-[#424c70] hover:to-[#3a4a80] dark:hover:from-[#4ac2a0] dark:hover:bg-[#3a9c80]'
                                        }`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg
                                                    className="animate-spin h-5 w-5 mr-2 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                                                    ></path>
                                                </svg>
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="h-5 w-5 mr-2" />
                                                Submit Request
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>

                {/* Service Tickets Table */}
                <div className="space-y-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#657ED4] to-[#4a5da0] dark:from-[#5AD3AF] dark:to-[#4ac2a0]">
                            📜 My Service Tickets
                        </h2>
                        <div className="flex items-center gap-3">
                            <div className="relative w-full sm:w-64">
                                <Input
                                    type="text"
                                    placeholder="Search tickets..."
                                    onChange={handleSearchChange}
                                    className="pl-10 pr-4 py-3 rounded-full border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] transition-all duration-300 shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                                />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    </div>
                    {filteredTickets.length === 0 ? (
                        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                            <p className="text-xl text-gray-600 dark:text-gray-300 font-medium">
                                {searchQuery
                                    ? 'No tickets match your search.'
                                    : 'No service tickets found.'}
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-gray-100 dark:bg-gray-700">
                                            <TableHead className="text-gray-800 dark:text-gray-200 font-semibold py-4">
                                                Title
                                            </TableHead>
                                            <TableHead className="text-gray-800 dark:text-gray-200 font-semibold py-4">
                                                Message
                                            </TableHead>
                                            <TableHead className="text-gray-800 dark:text-gray-200 font-semibold py-4">
                                                Course
                                            </TableHead>
                                            <TableHead className="text-gray-800 dark:text-gray-200 font-semibold py-4">
                                                Reply By
                                            </TableHead>
                                            <TableHead className="text-gray-800 dark:text-gray-200 font-semibold py-4">
                                                QAQC Reply
                                            </TableHead>
                                            <TableHead className="text-gray-800 dark:text-gray-200 font-semibold py-4">
                                                Status
                                            </TableHead>
                                            <TableHead className="text-gray-800 dark:text-gray-200 font-semibold py-4">
                                                Created At
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredTickets.map((ticket, index) => (
                                            <TableRow
                                                key={ticket._id}
                                                className={`${
                                                    index % 2 === 0
                                                        ? 'bg-white dark:bg-gray-800'
                                                        : 'bg-gray-50 dark:bg-gray-750'
                                                } hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200`}
                                            >
                                                <TableCell className="text-gray-800 dark:text-gray-200 py-4">
                                                    {ticket.title}
                                                </TableCell>
                                                <TableCell className="text-gray-800 dark:text-gray-200 py-4 truncate max-w-xs">
                                                    {ticket.message}
                                                </TableCell>
                                                <TableCell className="text-gray-800 dark:text-gray-200 py-4">
                                                    {ticket.course?.title || 'N/A'}
                                                </TableCell>
                                                <TableCell className="text-gray-800 dark:text-gray-200 py-4">
                                                    {ticket.replyByFullName || 'N/A'}
                                                </TableCell>
                                                <TableCell className="text-gray-800 dark:text-gray-200 py-4">
                                                    {ticket.qaqcReply || 'No reply yet'}
                                                </TableCell>
                                                <TableCell className="text-gray-800 dark:text-gray-200 py-4">
                                                    <span
                                                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                                            ticket.status === 'open'
                                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                                : ticket.status === 'resolved'
                                                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                                                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                        }`}
                                                    >
                                                        {ticket.status.charAt(0).toUpperCase() +
                                                            ticket.status.slice(1)}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-gray-800 dark:text-gray-200 py-4">
                                                    {new Date(ticket.createdAt).toLocaleString()}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            {totalPages > 1 && (
                                <div className="mt-8 flex justify-center">
                                    <Pagination>
                                        <PaginationContent>
                                            <PaginationItem>
                                                <PaginationPrevious
                                                    onClick={() =>
                                                        handlePageChange(currentPage - 1)
                                                    }
                                                    className={`text-[#657ED4] dark:text-[#5AD3AF] hover:text-[#424c70] dark:hover:text-[#4ac2a0] hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1 rounded-md transition-colors ${
                                                        currentPage === 1
                                                            ? 'pointer-events-none opacity-50 cursor-not-allowed'
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
                                                                isActive={currentPage === pageNum}
                                                                className={
                                                                    currentPage === pageNum
                                                                        ? 'bg-[#657ED4] dark:bg-[#5AD3AF] text-white hover:bg-[#424c70] dark:hover:bg-[#4ac2a0] px-3 py-1 rounded-md transition-colors'
                                                                        : 'text-[#657ED4] dark:text-[#5AD3AF] hover:text-[#424c70] dark:hover:text-[#4ac2a0] hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1 rounded-md transition-colors'
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
                                                    className={`text-[#657ED4] dark:text-[#5AD3AF] hover:text-[#424c70] dark:hover:text-[#4ac2a0] hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1 rounded-md transition-colors ${
                                                        currentPage === totalPages
                                                            ? 'pointer-events-none opacity-50 cursor-not-allowed'
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
                </div>
            </div>
        </div>
    );
}
