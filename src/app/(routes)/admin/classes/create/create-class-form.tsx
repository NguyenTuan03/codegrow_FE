'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CreateClassBody } from '@/schemaValidations/class.schema';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { CalendarIcon, Link2Icon, UsersIcon, ImageIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { CreateClass } from '@/lib/services/class/createclass';
import { GetCourses } from '@/lib/services/course/getcourse';
import { Skeleton } from '@/components/ui/skeleton';
import { z } from 'zod';

interface Course {
    _id: string;
    title: string;
    description: string;
}

const daysOfWeekOptions = [
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
    { value: 'Saturday', label: 'Saturday' },
    { value: 'Sunday', label: 'Sunday' },
];

const CreateClassFormBody = CreateClassBody.omit({ token: true, imgUrl: true });
type CreateClassFormBodyType = z.infer<typeof CreateClassFormBody>;

export default function CreateClassForm() {
    const [loading, setLoading] = useState(false);
    const [courseLoading, setCourseLoading] = useState(true);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [imgUrl, setImgUrl] = useState<File | undefined>(undefined);
    const router = useRouter();
    const [courses, setCourses] = useState<Course[]>([]);
    const [isCourseOpen, setIsCourseOpen] = useState(false); // State for Course ID Popover
    const [isTimeOpen, setIsTimeOpen] = useState(false); // State for Time Popover

    const form = useForm<CreateClassFormBodyType>({
        resolver: zodResolver(CreateClassFormBody),
        defaultValues: {
            title: '',
            courseId: '',
            description: '',
            maxStudents: 10,
            schedule: {
                startDate: '',
                endDate: '',
                daysOfWeek: [],
                time: '19:00-21:00',
            },
            linkMeet: '',
        },
    });

    const fetchCourse = async () => {
        try {
            setCourseLoading(true);
            const data = await GetCourses();

            if (data?.metadata?.courses && data.metadata.courses.length > 0) {
                setCourses(data.metadata.courses);
            } else {
                throw new Error(
                    'No courses found. Please check your connection or try again later.',
                );
            }
        } catch (error: unknown) {
            console.error('Failed to fetch courses:', error);
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to fetch courses',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
            setCourses([]);
        } finally {
            setCourseLoading(false);
        }
    };

    useEffect(() => {
        fetchCourse();
    }, []);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validTypes.includes(file.type)) {
                toast({
                    title: '❌ Invalid File Type',
                    description: 'Please upload an image file (JPEG, PNG, or GIF).',
                    variant: 'destructive',
                    className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
                });
                return;
            }

            const maxSize = 5 * 1024 * 1024; // 5MB in bytes
            if (file.size > maxSize) {
                toast({
                    title: '❌ File Too Large',
                    description: 'Please upload an image smaller than 5MB.',
                    variant: 'destructive',
                    className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
                });
                return;
            }

            setImgUrl(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImgUrl(undefined);
            setPreviewImage(null);
        }
    };

    const handleSubmit = async (data: CreateClassFormBodyType) => {
        if (!data.schedule.daysOfWeek || data.schedule.daysOfWeek.length === 0) {
            toast({
                title: 'Error',
                description: 'Please select at least one day of the week for the class schedule.',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
            return;
        }

        setLoading(true);
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
            console.log('Token user:', tokenuser);

            if (data.maxStudents < 1 || data.maxStudents > 30) {
                throw new Error('Max students must be between 1 and 30.');
            }

            const formattedSchedule = {
                ...data.schedule,
                startDate: data.schedule.startDate
                    ? new Date(data.schedule.startDate).toISOString()
                    : '',
                endDate: data.schedule.endDate ? new Date(data.schedule.endDate).toISOString() : '',
            };

            const result = await CreateClass(
                tokenuser,
                data.title,
                data.courseId,
                data.description || '',
                data.maxStudents,
                formattedSchedule,
                data.linkMeet,
                imgUrl,
            );

            console.log('CreateClass Response:', result);
            toast({
                description: 'Class created successfully!',
                className:
                    'bg-[#657ED4] dark:bg-[#5AD3AF] text-white dark:text-black font-semibold',
                duration: 1000,
            });

            router.push('/admin/classes');
            router.refresh();
        } catch (error) {
            console.error('Detailed error creating class:', {
                error,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 p-6">
            {loading || courseLoading ? (
                <div className="flex flex-col items-center justify-center min-h-[50vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#657ED4] dark:border-[#5AD3AF] border-solid"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">
                        Loading form data...
                    </p>
                </div>
            ) : (
                <div className="max-w-4xl mx-auto">
                    <Card className="border-0 shadow-lg bg-white dark:bg-gray-800 rounded-2xl transform transition-all duration-300 hover:shadow-xl">
                        <CardHeader
                            className="border-b border-gray-200 dark:border-gray-700 p-6 relative overflow-hidden"
                            style={{
                                backgroundImage: previewImage
                                    ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${previewImage})`
                                    : 'linear-gradient(to bottom, #657ED4, #4a5da0)',
                                backgroundColor: previewImage ? 'transparent' : '#657ED4',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                color: 'white',
                                minHeight: '150px',
                            }}
                        >
                            <div className="relative z-10">
                                <CardTitle className="text-2xl font-bold text-white">
                                    Create New Class
                                </CardTitle>
                                <p className="text-white mt-2 font-medium">
                                    Fill in the details below to create a new class
                                </p>
                            </div>
                        </CardHeader>

                        <CardContent className="p-6">
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(handleSubmit, (errors) => {
                                        console.log(
                                            'Form validation errors:',
                                            JSON.stringify(errors, null, 2),
                                        );
                                    })}
                                    className="space-y-6"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Title */}
                                        <FormField
                                            control={form.control}
                                            name="title"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-700 dark:text-gray-200 text-base font-semibold">
                                                        Class Title*
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            placeholder="Advanced Web Development"
                                                            className="focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200"
                                                            required
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-red-500 font-medium" />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Course ID */}
                                        <FormField
                                            control={form.control}
                                            name="courseId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-700 dark:text-gray-200 text-base font-semibold">
                                                        Course*
                                                    </FormLabel>
                                                    {courseLoading ? (
                                                        <Skeleton className="h-10 w-full rounded-lg" />
                                                    ) : (
                                                        <Popover
                                                            open={isCourseOpen}
                                                            onOpenChange={setIsCourseOpen}
                                                        >
                                                            <PopoverTrigger asChild>
                                                                <Button
                                                                    type="button"
                                                                    className="w-full justify-between bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 px-4 py-2 hover:border-[#657ED4] dark:hover:border-[#5AD3AF]"
                                                                >
                                                                    {courses.find(
                                                                        (course) =>
                                                                            course._id ===
                                                                            field.value,
                                                                    )?.title || 'Select a course'}
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-full max-w-xs bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-0">
                                                                <div className="max-h-60 overflow-y-auto">
                                                                    {courses.map((course) => (
                                                                        <Button
                                                                            key={course._id}
                                                                            variant={
                                                                                field.value ===
                                                                                course._id
                                                                                    ? 'default'
                                                                                    : 'ghost'
                                                                            }
                                                                            className={`w-full justify-start rounded-none text-gray-900 dark:text-gray-100 hover:border-[#657ED4] dark:hover:border-[#5AD3AF] ${
                                                                                field.value ===
                                                                                course._id
                                                                                    ? 'bg-[#657ED4] dark:bg-[#5AD3AF] text-white dark:text-black'
                                                                                    : ''
                                                                            }`}
                                                                            onClick={() => {
                                                                                field.onChange(
                                                                                    course._id,
                                                                                );
                                                                                setIsCourseOpen(
                                                                                    false,
                                                                                ); // Close Popover after selection
                                                                            }}
                                                                        >
                                                                            {course.title}
                                                                        </Button>
                                                                    ))}
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover>
                                                    )}
                                                    <FormMessage className="text-red-500 font-medium" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    {/* Description */}
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 dark:text-gray-200 text-base font-semibold">
                                                    Description
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        {...field}
                                                        placeholder="Describe the class content and objectives"
                                                        rows={3}
                                                        className="focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200"
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-500 font-medium" />
                                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                                    Maximum 500 characters
                                                </p>
                                            </FormItem>
                                        )}
                                    />

                                    {/* Image Upload */}
                                    <FormItem>
                                        <FormLabel className="text-gray-700 dark:text-gray-200 text-base font-semibold">
                                            Header Background Image
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <ImageIcon className="absolute left-3 top-1/2 cursor-pointer transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <Input
                                                    type="file"
                                                    accept="image/jpeg,image/png,image/gif"
                                                    onChange={handleImageUpload}
                                                    className="pl-10 focus:ring-2 cursor-pointer focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200"
                                                    disabled={loading}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-red-500 font-medium" />
                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                            Upload an image to use as the header background (JPEG,
                                            PNG, or GIF, max 5MB).
                                        </p>
                                    </FormItem>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Max Students */}
                                        <FormField
                                            control={form.control}
                                            name="maxStudents"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-700 dark:text-gray-200 text-base font-semibold">
                                                        Maximum Students*
                                                    </FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <UsersIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                            <Input
                                                                type="number"
                                                                {...field}
                                                                onChange={(e) => {
                                                                    const value = parseInt(
                                                                        e.target.value,
                                                                    );
                                                                    field.onChange(
                                                                        isNaN(value) || value < 1
                                                                            ? 1
                                                                            : value > 30
                                                                              ? 30
                                                                              : value,
                                                                    );
                                                                }}
                                                                className="pl-10 focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200"
                                                                min="1"
                                                                max="30"
                                                                required
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage className="text-red-500 font-medium" />
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                                        Must be between 1 and 30
                                                    </p>
                                                </FormItem>
                                            )}
                                        />

                                        {/* Time */}
                                        <FormField
                                            control={form.control}
                                            name="schedule.time"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-700 mt--5 dark:text-gray-200 text-base font-semibold">
                                                        Class Time*
                                                    </FormLabel>
                                                    {courseLoading ? (
                                                        <Skeleton className="h-10 w-full rounded-lg" />
                                                    ) : (
                                                        <Popover
                                                            open={isTimeOpen}
                                                            onOpenChange={setIsTimeOpen}
                                                        >
                                                            <PopoverTrigger asChild>
                                                                <Button
                                                                    type="button"
                                                                    className="w-full justify-between bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 px-4 py-2 hover:border-[#657ED4] dark:hover:border-[#5AD3AF]"
                                                                >
                                                                    {field.value ||
                                                                        'Select a time slot'}
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-full max-w-xs bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-0">
                                                                <div className="max-h-60 overflow-y-auto">
                                                                    {[
                                                                        {
                                                                            value: '07:00-09:00',
                                                                            label: '7:00 - 9:00',
                                                                        },
                                                                        {
                                                                            value: '09:00-11:00',
                                                                            label: '9:00 - 11:00',
                                                                        },
                                                                        {
                                                                            value: '11:00-13:00',
                                                                            label: '11:00 - 13:00',
                                                                        },
                                                                        {
                                                                            value: '13:00-15:00',
                                                                            label: '13:00 - 15:00',
                                                                        },
                                                                        {
                                                                            value: '15:00-17:00',
                                                                            label: '15:00 - 17:00',
                                                                        },
                                                                        {
                                                                            value: '17:00-19:00',
                                                                            label: '17:00 - 19:00',
                                                                        },
                                                                        {
                                                                            value: '19:00-21:00',
                                                                            label: '19:00 - 21:00',
                                                                        },
                                                                    ].map((timeSlot) => (
                                                                        <Button
                                                                            key={timeSlot.value}
                                                                            variant={
                                                                                field.value ===
                                                                                timeSlot.value
                                                                                    ? 'default'
                                                                                    : 'ghost'
                                                                            }
                                                                            className={`w-full justify-start rounded-none text-gray-900 dark:text-gray-100 hover:border-[#657ED4] dark:hover:border-[#5AD3AF] ${
                                                                                field.value ===
                                                                                timeSlot.value
                                                                                    ? 'bg-[#657ED4] dark:bg-[#5AD3AF] text-white dark:text-black'
                                                                                    : ''
                                                                            }`}
                                                                            onClick={() => {
                                                                                field.onChange(
                                                                                    timeSlot.value,
                                                                                );
                                                                                setIsTimeOpen(
                                                                                    false,
                                                                                ); // Close Popover after selection
                                                                            }}
                                                                        >
                                                                            {timeSlot.label}
                                                                        </Button>
                                                                    ))}
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover>
                                                    )}
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                                        Must be between 7:00 and 21:00
                                                    </p>
                                                    <FormMessage className="text-red-500 font-medium" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    {/* Schedule Dates */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField
                                            control={form.control}
                                            name="schedule.startDate"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-700 dark:text-gray-200 text-base font-semibold">
                                                        Start Date*
                                                    </FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                            <Input
                                                                type="date"
                                                                {...field}
                                                                className="pl-10 focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200"
                                                                required
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage className="text-red-500 font-medium" />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="schedule.endDate"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-700 dark:text-gray-200 text-base font-semibold">
                                                        End Date*
                                                    </FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                            <Input
                                                                type="date"
                                                                {...field}
                                                                className="pl-10 focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200"
                                                                required
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage className="text-red-500 font-medium" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    {/* Days of Week */}
                                    <FormField
                                        control={form.control}
                                        name="schedule.daysOfWeek"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 dark:text-gray-200 text-base font-semibold">
                                                    Class Days*
                                                </FormLabel>
                                                <div className="flex flex-wrap gap-2">
                                                    {daysOfWeekOptions.map((day) => (
                                                        <Button
                                                            key={day.value}
                                                            type="button"
                                                            variant={
                                                                field.value?.includes(day.value)
                                                                    ? 'default'
                                                                    : 'outline'
                                                            }
                                                            className={`rounded-full cursor-pointer px-4 py-2 transition-all duration-200 font-medium ${
                                                                field.value?.includes(day.value)
                                                                    ? 'bg-[#657ED4] dark:bg-[#5AD3AF] hover:bg-[#4a5da0] dark:hover:bg-[#4ac2a0] text-white border-[#657ED4] dark:border-[#5AD3AF] hover:border-[#4a5da0] dark:hover:border-[#4ac2a0]'
                                                                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                                                            }`}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                const currentDays =
                                                                    field.value || [];
                                                                const newDays =
                                                                    currentDays.includes(day.value)
                                                                        ? currentDays.filter(
                                                                              (d) =>
                                                                                  d !== day.value,
                                                                          )
                                                                        : [
                                                                              ...currentDays,
                                                                              day.value,
                                                                          ];
                                                                field.onChange(newDays);
                                                            }}
                                                        >
                                                            {day.label}
                                                        </Button>
                                                    ))}
                                                </div>
                                                <FormMessage className="text-red-500 font-medium" />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Link Meet */}
                                    <FormField
                                        control={form.control}
                                        name="linkMeet"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 dark:text-gray-200 text-base font-semibold">
                                                    Meeting Link*
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Link2Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                        <Input
                                                            {...field}
                                                            placeholder="https://meet.google.com/abc-xyz"
                                                            className="pl-10 focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200"
                                                            required
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage className="text-red-500 font-medium" />
                                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                                    Enter a valid meeting link (e.g., Google Meet,
                                                    Zoom)
                                                </p>
                                            </FormItem>
                                        )}
                                    />

                                    <div className="flex justify-end gap-4 pt-4">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => router.back()}
                                            className="px-6 cursor-pointer rounded-lg border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 font-medium shadow-md"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            className="px-6 cursor-pointer bg-[#657ED4] dark:bg-[#5AD3AF] hover:bg-[#4a5da0] dark:hover:bg-[#4ac2a0] text-white rounded-lg shadow-md transition-all duration-200 font-medium"
                                            disabled={loading || courseLoading}
                                        >
                                            {loading ? (
                                                <span className="flex items-center">
                                                    <svg
                                                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                        ></path>
                                                    </svg>
                                                    Creating...
                                                </span>
                                            ) : (
                                                'Create Class'
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
