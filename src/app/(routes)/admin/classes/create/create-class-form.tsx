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
import { CalendarIcon, ClockIcon, UsersIcon } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CreateClass } from '@/lib/services/class/createclass';
import { GetCourses } from '@/lib/services/course/getcourse';
import { Skeleton } from '@/components/ui/skeleton';
import { z } from 'zod';

// Define a schema for the form that excludes the token field
const CreateClassFormBody = CreateClassBody.omit({ token: true });
type CreateClassFormBodyType = z.infer<typeof CreateClassFormBody>;

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

export default function CreateClassForm() {
    const [loading, setLoading] = useState(false);
    const [courseLoading, setCourseLoading] = useState(true);
    const router = useRouter();
    const [courses, setCourses] = useState<Course[]>([]);

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
            });
            setCourses([]);
        } finally {
            setCourseLoading(false);
        }
    };

    useEffect(() => {
        fetchCourse();
    }, []);

    const handleSubmit = async (data: CreateClassFormBodyType) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error('Authentication token is missing. Please log in.');
            }

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

            const payload = {
                token,
                title: data.title,
                courseId: data.courseId,
                description: data.description || '',
                maxStudents: data.maxStudents,
                schedule: formattedSchedule,
            };

            console.log('Payload being sent to CreateClass:', payload);

            const response = await CreateClass(payload);
            console.log('Response from CreateClass:', response);
            toast({
                description: 'Create Classes successful!',
                className: 'bg-[#5AD3AF] text-black',
                duration: 1000,
            });

            router.push('/admin/classes');
            router.refresh();
        } catch (error: unknown) {
            console.error('Detailed error creating class:', {
                error,
                message: error instanceof Error ? error.message : 'Unknown error',
                stack: error instanceof Error ? error.stack : undefined,
            });

            toast({
                title: 'Error',
                className: 'bg-[#F76F8E] text-black',
                description: error instanceof Error ? error.message : 'An unknown error occurred',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="max-w-4xl mx-auto p-6">
            <Card className="border-0 shadow-lg">
                <CardHeader className="border-b p-6">
                    <CardTitle className="text-2xl font-bold text-gray-800">
                        Create New Class
                    </CardTitle>
                    <p className="text-gray-600">Fill in the details below to create a new class</p>
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
                                            <FormLabel className="text-gray-700 font-medium">
                                                Class Title*
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Advanced Web Development"
                                                    className="focus-visible:ring-2 focus-visible:ring-primary"
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Course ID */}
                                <FormField
                                    control={form.control}
                                    name="courseId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 font-medium">
                                                Course*
                                            </FormLabel>
                                            {courseLoading ? (
                                                <Skeleton className="h-10 w-full" />
                                            ) : (
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    value={field.value}
                                                    required
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="focus-visible:ring-2 focus-visible:ring-primary">
                                                            <SelectValue placeholder="Select a course" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="bg-white dark:bg-gray-800">
                                                        {courses.map((course) => (
                                                            <SelectItem
                                                                key={course._id}
                                                                value={course._id}
                                                            >
                                                                {course.title}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                            <FormMessage />
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
                                        <FormLabel className="text-gray-700 font-medium">
                                            Description
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Describe the class content and objectives"
                                                rows={3}
                                                className="focus-visible:ring-2 focus-visible:ring-primary"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        <p className="text-sm text-gray-500">
                                            Maximum 500 characters
                                        </p>
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Max Students */}
                                <FormField
                                    control={form.control}
                                    name="maxStudents"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 font-medium">
                                                Maximum Students*
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <UsersIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                    <Input
                                                        type="number"
                                                        {...field}
                                                        onChange={(e) => {
                                                            const value = parseInt(e.target.value);
                                                            field.onChange(
                                                                isNaN(value) || value < 1
                                                                    ? 1
                                                                    : value > 30
                                                                      ? 30
                                                                      : value,
                                                            );
                                                        }}
                                                        className="pl-10 focus-visible:ring-2 focus-visible:ring-primary"
                                                        min="1"
                                                        max="30"
                                                        required
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                            <p className="text-sm text-gray-500">
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
                                            <FormLabel className="text-gray-700 font-medium">
                                                Class Time*
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                value={field.value}
                                                required
                                            >
                                                <FormControl>
                                                    <div className="relative">
                                                        <ClockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                        <SelectTrigger className="pl-10 focus-visible:ring-2 focus-visible:ring-primary">
                                                            <SelectValue placeholder="Select a time slot" />
                                                        </SelectTrigger>
                                                    </div>
                                                </FormControl>
                                                <SelectContent className="bg-white dark:bg-gray-800">
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
                                                        <SelectItem
                                                            key={timeSlot.value}
                                                            value={timeSlot.value}
                                                        >
                                                            <span className="font-medium">
                                                                {timeSlot.label}
                                                            </span>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
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
                                            <FormLabel className="text-gray-700 font-medium">
                                                Start Date*
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                    <Input
                                                        type="date"
                                                        {...field}
                                                        className="pl-10 focus-visible:ring-2 focus-visible:ring-primary"
                                                        required
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="schedule.endDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 font-medium">
                                                End Date*
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                    <Input
                                                        type="date"
                                                        {...field}
                                                        className="pl-10 focus-visible:ring-2 focus-visible:ring-primary"
                                                        required
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
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
                                        <FormLabel className="text-gray-700 font-medium">
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
                                                    className={`rounded-full px-4 py-2 transition-all duration-200 ${
                                                        field.value?.includes(day.value)
                                                            ? 'bg-amber-200 hover:bg-gray-50 text-gray-700 border-amber-300 hover:border-primary/50'
                                                            : 'bg-primary hover:bg-primary/90 text-gray-700 shadow-md'
                                                    }`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        const currentDays = field.value || [];
                                                        const newDays = currentDays.includes(
                                                            day.value,
                                                        )
                                                            ? currentDays.filter(
                                                                  (d) => d !== day.value,
                                                              )
                                                            : [...currentDays, day.value];
                                                        field.onChange(newDays);
                                                    }}
                                                >
                                                    {day.label}
                                                </Button>
                                            ))}
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end gap-4 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.back()}
                                    className="px-6"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="px-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
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
    );
}
