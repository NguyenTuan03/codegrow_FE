'use client';

import { useState } from 'react';
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

import { CreateClass } from '@/lib/services/mentor/createclass';
import { CreateClassBody, CreateClassBodyType } from '@/schemaValidations/class.schema';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';

export default function CreateClassForm() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Initialize form with react-hook-form and zod
    const form = useForm<CreateClassBodyType>({
        resolver: zodResolver(CreateClassBody),
        defaultValues: {
            title: '',
            courseId: '',
            description: '',
            maxStudents: 0,
            schedule: {
                startDate: '',
                endDate: '',
                daysOfWeek: [],
                time: '',
            },
        },
    });

    // // Handle image preview
    // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0];
    //     if (file) {
    //         setCoverImage(file);
    //         setImagePreview(URL.createObjectURL(file));
    //     }
    // };

    // // Upload image to the server
    // const uploadImage = async (file: File): Promise<string> => {
    //     const formData = new FormData();
    //     formData.append('image', file);

    //     const response = await fetch('http://localhost:5000/upload', {
    //         method: 'POST',
    //         body: formData,
    //     });

    //     if (!response.ok) {
    //         throw new Error('Failed to upload image');
    //     }

    //     const data = await response.json();
    //     return data.imageUrl; // URL of the uploaded image
    // };

    // Handle form submission
    const handleSubmit = async (data: CreateClassBodyType) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token') || '';
            if (!token) {
                throw new Error('Token is required');
            }
            const response = await CreateClass({
                token,
                title: data.title,
                courseId: data.courseId,
                description: data.description,
                maxStudents: data.maxStudents,
                schedule: data.schedule,
            });

            console.log('API Response:', response);
            toast({
                title: 'Class Created Successfully',
                description: 'The class has been created successfully!',
                action: (
                    <button
                        onClick={() => router.push('/admin/classes')}
                        className="text-blue-500 hover:underline"
                    >
                        View Classes
                    </button>
                ),
            });

            router.refresh();
        } catch (error) {
            console.error('Error creating class:', error);
            toast({
                title: 'Error',
                description: 'An error occurred while creating the class. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Form to create a class */}
            <Card className="w-full shadow-md bg-white dark:bg-gray-800">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        Create New Class
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                            {/* Title */}
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel
                                            htmlFor="title"
                                            className="text-gray-700 dark:text-gray-300"
                                        >
                                            Class Title
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="title"
                                                {...field}
                                                placeholder="Enter class title"
                                                className="bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm" />
                                    </FormItem>
                                )}
                            />

                            {/* Course ID */}
                            <FormField
                                control={form.control}
                                name="courseId"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel
                                            htmlFor="courseId"
                                            className="text-gray-700 dark:text-gray-300"
                                        >
                                            Course ID
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="courseId"
                                                {...field}
                                                placeholder="Enter course ID"
                                                className="bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm" />
                                    </FormItem>
                                )}
                            />

                            {/* Description */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel
                                            htmlFor="description"
                                            className="text-gray-700 dark:text-gray-300"
                                        >
                                            Description
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="description"
                                                {...field}
                                                placeholder="Enter class description"
                                                className="bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm" />
                                    </FormItem>
                                )}
                            />

                            {/* Max Students */}
                            <FormField
                                control={form.control}
                                name="maxStudents"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel
                                            htmlFor="maxStudents"
                                            className="text-gray-700 dark:text-gray-300"
                                        >
                                            Max Students
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="maxStudents"
                                                type="number"
                                                {...field}
                                                placeholder="Enter maximum number of students"
                                                className="bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm" />
                                    </FormItem>
                                )}
                            />

                            {/* Schedule */}
                            <FormItem className="space-y-4">
                                <FormLabel className="text-gray-700 dark:text-gray-300">
                                    Schedule
                                </FormLabel>
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="schedule.startDate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 dark:text-gray-300">
                                                    Start Date
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="date"
                                                        {...field}
                                                        placeholder="Start Date"
                                                        className="bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="schedule.endDate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 dark:text-gray-300">
                                                    End Date
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="date"
                                                        {...field}
                                                        placeholder="End Date"
                                                        className="bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="schedule.daysOfWeek"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 dark:text-gray-300">
                                                Days of Week
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="e.g., Mon, Wed, Fri"
                                                    className="bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="schedule.time"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 dark:text-gray-300">
                                                Time
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="e.g., 19:00 - 21:00"
                                                    className="bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </FormItem>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
                                disabled={loading}
                            >
                                {loading ? 'Creating Class...' : 'Create Class'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
