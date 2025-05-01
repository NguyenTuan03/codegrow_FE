'use client';

import { useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { getUserDetail } from '@/lib/services/admin/getuserdetail';
import { GetServicesTicketMine } from '@/lib/services/services/getservicemine';
import { SendSupportService } from '@/lib/services/services/sendsupportservice';
import { Button } from '@/components/ui/button';
import { RefreshCw, Book, MessageSquare, Send } from 'lucide-react';
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { GetClass } from '@/lib/services/class/getclass';

interface Course {
    _id: string;
    title: string;
}
interface Class {
    _id: string;
    title: string;
}
interface ReplyBy {
    _id: string;
    fullName: string;
    role: string;
    email: string;
}

interface ServiceTicket {
    _id: string;
    title: string;
    message: string;
    course: Course;
    replyBy?: ReplyBy;
    qaqcReply?: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

const supportSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    message: z.string().min(1, 'Message is required'),
    courseId: z.string().optional(), // Make courseId truly optional without validation
    classId: z.string().optional(), // Make classId truly optional without validation
});

export default function SupportPage() {
    const [tickets, setTickets] = useState<ServiceTicket[]>([]);
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState<Course[]>([]);
    const [classes, setClasses] = useState<Class[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof supportSchema>>({
        resolver: zodResolver(supportSchema),
        defaultValues: {
            title: '',
            message: '',
            courseId: '', // Default to empty string
            classId: '', // Default to empty string
        },
    });

    const fetchUserCourses = async () => {
        try {
            const userId = localStorage.getItem('user');
            if (!userId) {
                toast({
                    title: 'Lỗi',
                    description: 'Bạn cần đăng nhập để xem thông tin chi tiết',
                    variant: 'destructive',
                });
                router.push('/login');
                return;
            }
            const user = JSON.parse(userId);
            const id = user.id;
            const userDetail = await getUserDetail(id);
            setCourses(userDetail.metadata?.enrolledCourses || []);
            console.log('User enrolled courses:', userDetail.metadata?.enrolledCourses);
            console.log(`User detail for ID ${id}:`, userDetail);
        } catch (error) {
            console.error('Failed to fetch user courses:', error);
            toast({
                title: 'Error',
                description: 'Failed to fetch enrolled courses.',
                variant: 'destructive',
            });
        }
    };

    const fetchTickets = async () => {
        try {
            setLoading(true);
            const response = await GetServicesTicketMine();
            console.log('API Response:', response);
            if (response?.metadata && Array.isArray(response.metadata)) {
                const normalizedTickets = response.metadata.map((ticket: ServiceTicket) => ({
                    ...ticket,
                    description: ticket.message,
                    status: ticket.status.toLowerCase(),
                }));
                setTickets(normalizedTickets);
            } else {
                throw new Error('Invalid response from API');
            }
        } catch (error) {
            console.error('Failed to fetch service tickets:', error);
            toast({
                title: 'Error',
                description: 'Failed to fetch your service tickets.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };
    const handleGetAllClass = async () => {
        try {
            const response = await GetClass();
            console.log('API Response  class:', response);
            setClasses(response.metadata.classes || []);
        } catch (error) {
            console.error('Failed to fetch service tickets:', error);
            toast({
                title: 'Error',
                description: 'Failed to fetch your service tickets.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (values: z.infer<typeof supportSchema>) => {
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Authentication token not found');
            }

            await SendSupportService({
                token,
                title: values.title,
                message: values.message,
                courseId: values.courseId || '', // If courseId is undefined, send an empty string
                classId: values.classId || '',
            });
            toast({
                title: 'Success',
                description: 'Support request submitted successfully',
            });
            form.reset();
            fetchTickets();
        } catch (error) {
            console.error('Failed to submit support request:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        fetchUserCourses();
        fetchTickets();
        handleGetAllClass();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Support Request Form */}
                <div className="space-y-8">
                    <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400">
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
                                            <FormLabel className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-200">
                                                <Book className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
                                                Title
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter the title of your issue"
                                                    className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                                                    disabled={isSubmitting}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500 dark:text-red-400" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="courseId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-200">
                                                <Book className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
                                                Course (Optional)
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value || ''} // Ensure value is controlled
                                                disabled={isSubmitting || courses.length === 0}
                                            >
                                                <FormControl>
                                                    <SelectTrigger
                                                        className={`
                                                            border border-gray-300 dark:border-gray-600
                                                            bg-gray-50 dark:bg-gray-700
                                                            text-gray-900 dark:text-gray-100
                                                            rounded-lg
                                                            focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                                                            focus:border-transparent
                                                            transition-all duration-200
                                                            ${courses.length === 0 ? 'text-gray-400' : ''}
                                                            ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
                                                        `}
                                                    >
                                                        <SelectValue
                                                            placeholder={
                                                                courses.length === 0
                                                                    ? 'No courses enrolled'
                                                                    : 'Select a course (optional)'
                                                            }
                                                        />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent
                                                    className="
                                                        bg-white dark:bg-gray-800
                                                        border border-gray-300 dark:border-gray-600
                                                        rounded-lg shadow-lg
                                                        max-h-60 overflow-y-auto
                                                    "
                                                >
                                                    {courses.map((course) => (
                                                        <SelectItem
                                                            key={course._id}
                                                            value={course._id}
                                                            className="
                                                                hover:bg-gray-100 dark:hover:bg-gray-700
                                                                focus:bg-gray-100 dark:focus:bg-gray-700
                                                                text-gray-900 dark:text-gray-100
                                                                transition-colors duration-200
                                                                py-2 px-4
                                                            "
                                                        >
                                                            {course.title}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className="text-red-500 dark:text-red-400" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="classId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-200">
                                                <Book className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
                                                Class (Optional)
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value || ''} // Ensure value is controlled
                                                disabled={isSubmitting || classes.length === 0}
                                            >
                                                <FormControl>
                                                    <SelectTrigger
                                                        className={`
                                                            border border-gray-300 dark:border-gray-600
                                                            bg-gray-50 dark:bg-gray-700
                                                            text-gray-900 dark:text-gray-100
                                                            rounded-lg
                                                            focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                                                            focus:border-transparent
                                                            transition-all duration-200
                                                            ${classes.length === 0 ? 'text-gray-400' : ''}
                                                            ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
                                                        `}
                                                    >
                                                        <SelectValue
                                                            placeholder={
                                                                classes.length === 0
                                                                    ? 'No class enrolled'
                                                                    : 'Select a class (optional)'
                                                            }
                                                        />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent
                                                    className="
                                                        bg-white dark:bg-gray-800
                                                        border border-gray-300 dark:border-gray-600
                                                        rounded-lg shadow-lg
                                                        max-h-60 overflow-y-auto
                                                    "
                                                >
                                                    {classes.map((course) => (
                                                        <SelectItem
                                                            key={course._id}
                                                            value={course._id}
                                                            className="
                                                                hover:bg-gray-100 dark:hover:bg-gray-700
                                                                focus:bg-gray-100 dark:focus:bg-gray-700
                                                                text-gray-900 dark:text-gray-100
                                                                transition-colors duration-200
                                                                py-2 px-4
                                                            "
                                                        >
                                                            {course.title}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className="text-red-500 dark:text-red-400" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-200">
                                                <MessageSquare className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
                                                Message
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Describe your issue..."
                                                    className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 resize-none h-32"
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
                                        className="
                                            bg-gradient-to-r from-blue-500 to-purple-500
                                            dark:from-blue-600 dark:to-purple-600
                                            text-white
                                            rounded-lg
                                            px-6 py-2
                                            hover:from-blue-600 hover:to-purple-600
                                            dark:hover:from-blue-700 dark:hover:to-purple-700
                                            focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                                            focus:outline-none
                                            transition-all duration-200
                                            flex items-center
                                        "
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
                    <div className="flex justify-between items-center">
                        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400">
                            📜 My Service Tickets
                        </h2>
                        <Button
                            onClick={fetchTickets}
                            className="
                                bg-gradient-to-r from-blue-500 to-purple-500
                                dark:from-blue-600 dark:to-purple-600
                                text-white
                                rounded-lg
                                px-6 py-2
                                hover:from-blue-600 hover:to-purple-600
                                dark:hover:from-blue-700 dark:hover:to-purple-700
                                focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                                focus:outline-none
                                transition-all duration-200
                                flex items-center
                            "
                            aria-label="Refresh tickets"
                        >
                            <RefreshCw className="h-5 w-5 mr-2 animate-spin-slow" />
                            Refresh
                        </Button>
                    </div>
                    {tickets.length === 0 ? (
                        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                No service tickets found.
                            </p>
                        </div>
                    ) : (
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
                                    {tickets.map((ticket, index) => (
                                        <TableRow
                                            key={ticket._id}
                                            className={`
                                                ${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-750'}
                                                hover:bg-gray-100 dark:hover:bg-gray-700
                                                transition-colors duration-200
                                            `}
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
                                                {ticket.replyBy?.fullName || 'N/A'}
                                            </TableCell>
                                            <TableCell className="text-gray-800 dark:text-gray-200 py-4">
                                                {ticket.qaqcReply || 'No reply yet'}
                                            </TableCell>
                                            <TableCell className="text-gray-800 dark:text-gray-200 py-4">
                                                <span
                                                    className={`
                                                        inline-block px-3 py-1 rounded-full text-sm font-medium
                                                        ${
                                                            ticket.status === 'open'
                                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                                : ticket.status === 'resolved'
                                                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                                                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                        }
                                                    `}
                                                >
                                                    {ticket.status}
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
                    )}
                </div>
            </div>
        </div>
    );
}
