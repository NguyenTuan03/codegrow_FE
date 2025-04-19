'use client';

import { useState, useEffect } from 'react';
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
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { z } from 'zod';
import { CreateCourse } from '@/lib/services/course/createcourse';
import { getUser } from '@/lib/services/admin/getuser';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

// Interface for mentor data
interface Mentor {
    _id: string;
    fullName: string;
    email: string;
    role: string;
}

// Course Schema
const CourseSchema = z.object({
    title: z
        .string()
        .min(1, { message: 'Course title is required' })
        .max(100, { message: 'Title cannot exceed 100 characters' }),
    description: z
        .string()
        .max(500, { message: 'Description cannot exceed 500 characters' })
        .optional(),
    price: z
        .number()
        .min(0, { message: 'Price cannot be negative' })
        .refine((val) => !isNaN(val), { message: 'Price must be a number' }),
    category: z.string().min(1, { message: 'Category is required' }),
    author: z.string().min(1, { message: 'Author is required' }),
});

type CreateCourseFormData = z.infer<typeof CourseSchema>;

export default function CreateCourseForm() {
    const [loading, setLoading] = useState(false);
    const [mentorsLoading, setMentorsLoading] = useState(true);
    const [author, setAuthors] = useState<Mentor[]>([]);
    const router = useRouter();

    const form = useForm<CreateCourseFormData>({
        resolver: zodResolver(CourseSchema),
        defaultValues: {
            title: '',
            description: '',
            price: 0,
            category: '',
            author: '',
        },
    });

    // Fetch author from API
    const fetchAuthor = async () => {
        try {
            setMentorsLoading(true);
            const response = await getUser();

            if (!response?.metadata?.users || !Array.isArray(response.metadata.users)) {
                throw new Error('Invalid or missing users data');
            }

            const author = response.metadata.users;

            setAuthors(author);
        } catch (error) {
            console.error('Failed to fetch authors:', error);
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to load author list',
                variant: 'destructive',
            });
        } finally {
            setMentorsLoading(false);
        }
    };

    useEffect(() => {
        fetchAuthor();
    }, []);

    const handleSubmit = async (data: CreateCourseFormData) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                toast({
                    title: 'Authentication Error',
                    description: 'Authentication token is missing. Please log in.',
                    variant: 'destructive',
                });
                setLoading(false);
                return; // Exit the function early if the token is missing
            }

            const payload = {
                token,
                title: data.title,
                description: data.description ?? '',
                price: data.price,
                category: data.category,
                author: data.author,
            };

            const response = await CreateCourse(payload);
            console.log('Response from CreateCourse:', response);

            toast({
                description: 'Course created successfully!',
                className: 'bg-[#5AD3AF] text-black',
                duration: 1000,
            });

            router.push('/admin/courses');
            router.refresh();
        } catch (error: unknown) {
            console.error('Error creating course:', error);
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
                        Create New Course
                    </CardTitle>
                    <p className="text-gray-600">
                        Fill in the details below to create a new course
                    </p>
                </CardHeader>

                <CardContent className="p-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Title */}
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 font-medium">
                                                Course Title*
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

                                {/* Price */}
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 font-medium">
                                                Price*
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                    onChange={(e) =>
                                                        field.onChange(Number(e.target.value))
                                                    }
                                                    className="focus-visible:ring-2 focus-visible:ring-primary"
                                                    min="0"
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Category */}
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 font-medium">
                                            Category*
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Web Development"
                                                className="focus-visible:ring-2 focus-visible:ring-primary"
                                                required
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Author - Now a Select dropdown */}
                            <FormField
                                control={form.control}
                                name="author"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 font-medium">
                                            Author (Mentor)*
                                        </FormLabel>
                                        {mentorsLoading ? (
                                            <Skeleton className="h-10 w-full" />
                                        ) : (
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="focus-visible:ring-2 focus-visible:ring-primary">
                                                        <SelectValue placeholder="Select a mentor" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {author.map((mentor) => (
                                                        <SelectItem
                                                            key={mentor._id}
                                                            value={mentor._id}
                                                        >
                                                            <div className="flex flex-col">
                                                                <span>{mentor.fullName}</span>
                                                                <span className="text-xs text-gray-500">
                                                                    {mentor.email}
                                                                </span>
                                                            </div>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

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
                                                placeholder="Describe the course content and objectives"
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
                                    disabled={loading || mentorsLoading}
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
                                        'Create Course'
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
