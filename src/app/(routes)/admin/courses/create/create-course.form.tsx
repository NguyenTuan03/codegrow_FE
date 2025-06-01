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
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { z } from 'zod';
import { CreateCourse } from '@/lib/services/course/createcourse';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { GetAllCategory } from '@/lib/services/category/getallcategory';
import { ImagePlus } from 'lucide-react';

interface Category {
    _id: string;
    name: string;
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
    author: z.string().min(1, { message: 'Author name is required' }),
    imgUrl: z // Reverted to imgUrl to match backend expectation
        .instanceof(File)
        .optional()
        .refine(
            (file) => {
                if (!file) return true; // Allow empty file (optional)
                return ['image/jpeg', 'image/png', 'image/gif'].includes(file.type);
            },
            { message: 'Please upload an image file (JPEG, PNG, or GIF)' },
        )
        .refine(
            (file) => {
                if (!file) return true; // Allow empty file (optional)
                return file.size <= 5 * 1024 * 1024; // 5MB limit
            },
            { message: 'Please upload an image smaller than 5MB' },
        ),
});

type CreateCourseFormData = z.infer<typeof CourseSchema>;

export default function CreateCourseForm() {
    const [loading, setLoading] = useState(false);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [imgUrl, setImgUrl] = useState<File | undefined>(undefined); // Reverted to imgUrl

    const form = useForm<CreateCourseFormData>({
        resolver: zodResolver(CourseSchema),
        defaultValues: {
            title: '',
            description: '',
            price: 0,
            category: '',
            author: '',
            imgUrl: undefined, // Reverted to imgUrl
        },
    });

    const fetchCategories = async () => {
        try {
            setCategoriesLoading(true);
            const data = await GetAllCategory();
            console.log('Fetched categories:', data.metadata.categories);
            setCategories(data.metadata.categories);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to load categories',
                variant: 'destructive',
            });
        } finally {
            setCategoriesLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
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
                return;
            }

            const response = await CreateCourse({
                token,
                title: data.title,
                description: data.description || '',
                price: data.price,
                author: data.author,
                category: data.category,
                imgUrl, // Reverted to imgUrl
            });
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

            setImgUrl(file); // Reverted to imgUrl
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImgUrl(undefined); // Reverted to imgUrl
            setPreviewImage(null);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                {/* Background Header Section */}
                <div
                    className="relative rounded-2xl p-6 text-white mb-8 shadow-lg overflow-hidden"
                    style={{
                        backgroundImage: previewImage
                            ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${previewImage})`
                            : 'linear-gradient(to right, #657ED4, #4a5da0)',
                        backgroundColor: previewImage ? 'transparent' : '#657ED4',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        minHeight: '150px',
                    }}
                >
                    <div className="relative z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-white rounded-full" />
                            <div>
                                <h2 className="text-4xl font-bold">Create New Course</h2>
                                <p className="text-base opacity-90 mt-1">
                                    Fill in the details below to create a new course
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
                    <CardContent className="p-6">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Title */}
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-300">
                                                    Course Title{' '}
                                                    <span className="text-red-500">*</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="e.g., Advanced Web Development"
                                                        className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-[#657ED4] rounded-lg"
                                                        required
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-500 text-xs mt-1" />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Price */}
                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-300">
                                                    Price <span className="text-red-500">*</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        {...field}
                                                        onChange={(e) =>
                                                            field.onChange(Number(e.target.value))
                                                        }
                                                        placeholder="e.g., 99"
                                                        className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-[#657ED4] rounded-lg"
                                                        min="0"
                                                        required
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-500 text-xs mt-1" />
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
                                            <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-300">
                                                Category <span className="text-red-500">*</span>
                                            </FormLabel>
                                            {categoriesLoading ? (
                                                <Skeleton className="h-10 w-full rounded-lg" />
                                            ) : (
                                                <Select
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-[#657ED4] rounded-lg">
                                                            <SelectValue placeholder="Select a category" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700">
                                                        {categories.map((category) => (
                                                            <SelectItem
                                                                key={category._id}
                                                                value={category._id}
                                                            >
                                                                {category.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                            <FormMessage className="text-red-500 text-xs mt-1" />
                                        </FormItem>
                                    )}
                                />

                                {/* Author */}
                                <FormField
                                    control={form.control}
                                    name="author"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-300">
                                                Author <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    {...field}
                                                    placeholder="Enter the author's name (e.g., John Doe)"
                                                    rows={2}
                                                    className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-[#657ED4] rounded-lg"
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500 text-xs mt-1" />
                                        </FormItem>
                                    )}
                                />

                                {/* Description */}
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-300">
                                                Description
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    {...field}
                                                    placeholder="Describe the course content and objectives (optional)"
                                                    rows={4}
                                                    className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-[#657ED4] rounded-lg"
                                                />
                                            </FormControl>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                                Maximum 500 characters
                                            </p>
                                            <FormMessage className="text-red-500 text-xs mt-1" />
                                        </FormItem>
                                    )}
                                />

                                {/* Image Upload */}
                                <FormField
                                    control={form.control}
                                    name="imgUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-300">
                                                Course Image
                                            </FormLabel>
                                            <div className="flex items-center gap-4">
                                                <label
                                                    htmlFor="img-upload"
                                                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                                                >
                                                    <ImagePlus className="h-5 w-5 cursor-pointer text-[#657ED4] dark:text-[#5AD3AF]" />
                                                    <span className="text-gray-700  dark:text-gray-300">
                                                        Upload Image
                                                    </span>
                                                    <input
                                                        id="img-upload"
                                                        type="file"
                                                        accept="image/jpeg,image/png,image/gif"
                                                        onChange={(e) => {
                                                            handleImageUpload(e);
                                                            field.onChange(e.target.files?.[0]);
                                                        }}
                                                        className="hidden"
                                                    />
                                                </label>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                                Optional: Upload an image (JPEG, PNG, GIF, max 5MB)
                                            </p>
                                            <FormMessage className="text-red-500 text-xs mt-1" />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex justify-end gap-4 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => router.back()}
                                        className="text-gray-700 cursor-pointer dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg px-6"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="bg-[#657ED4] cursor-pointer dark:bg-[#5AD3AF] hover:bg-[#4a5da0] dark:hover:bg-[#4ac2a0] text-white rounded-lg px-6"
                                        disabled={loading || categoriesLoading}
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
        </div>
    );
}
