'use client';

import { useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { getUserDetail } from '@/lib/services/admin/getuserdetail';
import { GetServicesTicketMine } from '@/lib/services/services/getservicemine';
import { SendSupportService } from '@/lib/services/services/sendsupportservice';
import { Button } from '@/components/ui/button';
import { RefreshCw, Book, MessageSquare, Send, Calendar } from 'lucide-react';
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

interface Class {
    _id: string;
    title: string;
}

const supportSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    message: z.string().min(1, 'Message is required'),
    courseId: z.string().optional(),
    classId: z.string().optional(),
});

export default function SupportPage() {
    const [tickets, setTickets] = useState<ServiceTicket[]>([]);
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState<Course[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const [classes, setClasses] = useState<Class[]>([]);
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
            console.log('API Response class:', response);
            setClasses(response.metadata.classes || []);
        } catch (error) {
            console.error('Failed to fetch classes:', error);
            toast({
                title: 'Error',
                description: 'Failed to fetch your classes.',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchUserCourses = async () => {
        try {
            const userId = localStorage.getItem('user');
            if (!userId) {
                toast({
                    title: 'Error',
                    description: 'You need to log in to view detailed information',
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
            console.log('User enrolled courses:', userDetail.metadata?.enrolledCourses);
            console.log(`User detail for ID ${id}:`, userDetail);
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
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
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
            console.log('Token user:', tokenuser);

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
            fetchTickets();
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

    useEffect(() => {
        fetchUserCourses();
        fetchTickets();
        handleGetAllClass();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#657ED4] dark:border-[#5AD3AF]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header Section with Current Date and Time */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                        <h1 className="text-4xl font-extrabold text-[#657ED4] dark:text-[#5AD3AF]">
                            Support Center
                        </h1>
                    </div>
                    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow-md border border-gray-200 dark:border-gray-700">
                        <Calendar className="h-5 w-5 text-[#657ED4] dark:text-[#5AD3AF]" />
                        <span className="text-gray-800 dark:text-gray-200 font-medium">
                            {new Date('2025-05-28T15:27:00+07:00').toLocaleString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true,
                                timeZone: 'Asia/Bangkok',
                            })}
                        </span>
                    </div>
                </div>

                {/* Support Request Form Section */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3 mb-6">
                            <MessageSquare className="h-6 w-6 text-[#657ED4] dark:text-[#5AD3AF]" />
                            <h2 className="text-3xl font-bold text-[#657ED4] dark:text-[#5AD3AF]">
                                Request Support
                            </h2>
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-200">
                                                    <Book className="h-5 w-5 mr-2 text-[#657ED4] dark:text-[#5AD3AF]" />
                                                    Title
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter the title of your issue"
                                                        className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] focus:border-transparent transition-all duration-200"
                                                        disabled={isSubmitting}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-[#F76F8E] font-medium" />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="courseId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-200">
                                                    <Book className="h-5 w-5 mr-2 text-[#657ED4] dark:text-[#5AD3AF]" />
                                                    Course (Optional)
                                                </FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    value={field.value || ''}
                                                    disabled={isSubmitting || courses.length === 0}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger
                                                            className={`
                                                                border-gray-300 dark:border-gray-600
                                                                bg-gray-50 dark:bg-gray-700
                                                                text-gray-900 dark:text-gray-100
                                                                rounded-lg
                                                                focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF]
                                                                focus:border-transparent
                                                                transition-all duration-200
                                                                ${courses.length === 0 ? 'text-gray-400 dark:text-gray-500' : ''}
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
                                                            border-gray-300 dark:border-gray-600
                                                            rounded-lg shadow-lg
                                                            max-h-60 overflow-y-auto
                                                            text-gray-900 dark:text-gray-100
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
                                                                    font-medium
                                                                "
                                                            >
                                                                {course.title}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage className="text-[#F76F8E] font-medium" />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="classId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-200">
                                                    <Book className="h-5 w-5 mr-2 text-[#657ED4] dark:text-[#5AD3AF]" />
                                                    Class (Optional)
                                                </FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    value={field.value || ''}
                                                    disabled={isSubmitting || classes.length === 0}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger
                                                            className={`
                                                                border-gray-300 dark:border-gray-600
                                                                bg-gray-50 dark:bg-gray-700
                                                                text-gray-900 dark:text-gray-100
                                                                rounded-lg
                                                                focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF]
                                                                focus:border-transparent
                                                                transition-all duration-200
                                                                ${classes.length === 0 ? 'text-gray-400 dark:text-gray-500' : ''}
                                                                ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
                                                            `}
                                                        >
                                                            <SelectValue
                                                                placeholder={
                                                                    classes.length === 0
                                                                        ? 'No classes enrolled'
                                                                        : 'Select a class (optional)'
                                                                }
                                                            />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent
                                                        className="
                                                            bg-white dark:bg-gray-800
                                                            border-gray-300 dark:border-gray-600
                                                            rounded-lg shadow-lg
                                                            max-h-60 overflow-y-auto
                                                            text-gray-900 dark:text-gray-100
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
                                                                    font-medium
                                                                "
                                                            >
                                                                {course.title}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage className="text-[#F76F8E] font-medium" />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-200">
                                                <MessageSquare className="h-5 w-5 mr-2 text-[#657ED4] dark:text-[#5AD3AF]" />
                                                Message
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Describe your issue..."
                                                    className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] focus:border-transparent transition-all duration-200 resize-none h-32"
                                                    disabled={isSubmitting}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-[#F76F8E] font-medium" />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex justify-end">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="
                                        cursor-pointer
                                            bg-[#657ED4] dark:bg-[#5AD3AF]
                                            hover:bg-[#4a5da0] dark:hover:bg-[#4ac2a0]
                                            text-white
                                            rounded-lg
                                            px-6 py-2
                                            focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF]
                                            focus:outline-none
                                            transition-all duration-200
                                            flex items-center
                                            font-medium
                                            shadow-md
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

                {/* Service Tickets Table Section */}
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-3xl font-bold text-[#657ED4] dark:text-[#5AD3AF] flex items-center gap-2">
                            📜 My Service Tickets
                        </h2>
                        <Button
                            onClick={fetchTickets}
                            className="
                            cursor-pointer
                                bg-[#657ED4] dark:bg-[#5AD3AF]
                                hover:bg-[#4a5da0] dark:hover:bg-[#4ac2a0]
                                text-white
                                rounded-full
                                px-6 py-2
                                focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF]
                                focus:outline-none
                                transition-all duration-200
                                flex items-center
                                font-medium
                                shadow-md
                            "
                            aria-label="Refresh tickets"
                        >
                            <RefreshCw className="h-5 w-5 mr-2 cursor-pointer animate-spin-slow" />
                            Refresh
                        </Button>
                    </div>
                    {tickets.length === 0 ? (
                        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                            <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">
                                No service tickets found.
                            </p>
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-x-auto border border-gray-200 dark:border-gray-700">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-100 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
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
                                                ${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800/30'}
                                                hover:bg-gray-100 dark:hover:bg-gray-700
                                                transition-colors duration-200
                                                border-b border-gray-200 dark:border-gray-700
                                            `}
                                        >
                                            <TableCell className="text-gray-800 dark:text-gray-200 py-4 font-medium">
                                                {ticket.title}
                                            </TableCell>
                                            <TableCell className="text-gray-800 dark:text-gray-200 py-4 truncate max-w-xs font-medium">
                                                {ticket.message}
                                            </TableCell>
                                            <TableCell className="text-gray-800 dark:text-gray-200 py-4 font-medium">
                                                {ticket.course?.title || 'N/A'}
                                            </TableCell>
                                            <TableCell className="text-gray-800 dark:text-gray-200 py-4 font-medium">
                                                {ticket.replyBy?.fullName || 'N/A'}
                                            </TableCell>
                                            <TableCell className="text-gray-800 dark:text-gray-200 py-4 font-medium">
                                                {ticket.qaqcReply || 'No reply yet'}
                                            </TableCell>
                                            <TableCell className="text-gray-800 dark:text-gray-200 py-4">
                                                <span
                                                    className={`
                                                        inline-block px-3 py-1 rounded-full text-sm font-medium
                                                        ${
                                                            ticket.status === 'open'
                                                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                                                : ticket.status === 'resolved'
                                                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                                                  : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
                                                        }
                                                    `}
                                                >
                                                    {ticket.status.charAt(0).toUpperCase() +
                                                        ticket.status.slice(1)}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-gray-800 dark:text-gray-200 py-4 font-medium">
                                                {new Date(ticket.createdAt).toLocaleString(
                                                    'en-US',
                                                    {
                                                        weekday: 'short',
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        hour12: true,
                                                    },
                                                )}
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
