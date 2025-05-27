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
import { getUser } from '@/lib/services/admin/getuser';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { GetAllCategory } from '@/lib/services/category/getallcategory';

// Interface for mentor data
interface Mentor {
    _id: string;
    fullName: string;
    email: string;
    role: string;
}

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
    author: z.string().min(1, { message: 'Author is required' }),
});

type CreateCourseFormData = z.infer<typeof CourseSchema>;

export default function CreateCourseForm() {
    const [loading, setLoading] = useState(false);
    const [mentorsLoading, setMentorsLoading] = useState(true);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [author, setAuthors] = useState<Mentor[]>([]);
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);

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
        fetchAuthor();
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
        <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-600">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-[#5AD3AF] rounded-full" />
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                    Create New Course
                                </h2>
                                <p className="text-base text-gray-600 dark:text-gray-400 mt-1">
                                    Fill in the details below to create a new course
                                </p>
                            </div>
                        </div>
                    </div>

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
                                                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Course Title{' '}
                                                    <span className="text-red-500">*</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="e.g., Advanced Web Development"
                                                        className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-[#5AD3AF] rounded-lg"
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
                                                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
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
                                                        className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-[#5AD3AF] rounded-lg"
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
                                            <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
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
                                                        <SelectTrigger className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-[#5AD3AF] rounded-lg">
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
                                            <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Author (Mentor){' '}
                                                <span className="text-red-500">*</span>
                                            </FormLabel>
                                            {mentorsLoading ? (
                                                <Skeleton className="h-10 w-full rounded-lg" />
                                            ) : (
                                                <Select
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-[#5AD3AF] rounded-lg">
                                                            <SelectValue placeholder="Select a mentor" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700">
                                                        {author.map((mentor) => (
                                                            <SelectItem
                                                                key={mentor._id}
                                                                value={mentor._id}
                                                            >
                                                                <div className="flex flex-col">
                                                                    <span className="text-gray-900 dark:text-gray-100">
                                                                        {mentor.fullName}
                                                                    </span>
                                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                                        {mentor.email}
                                                                    </span>
                                                                </div>
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
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
                                            <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Description
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    {...field}
                                                    placeholder="Describe the course content and objectives (optional)"
                                                    rows={4}
                                                    className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-[#5AD3AF] rounded-lg"
                                                />
                                            </FormControl>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                                Maximum 500 characters
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
                                        className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg px-6"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="bg-[#5AD3AF] hover:bg-[#4ac2a0] text-white rounded-lg px-6"
                                        disabled={loading || mentorsLoading || categoriesLoading}
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

// 'use client';

// import { useState, useEffect } from 'react';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { useRouter } from 'next/navigation';
// import { toast } from '@/components/ui/use-toast';
// import { Textarea } from '@/components/ui/textarea';
// import { z } from 'zod';
// import { CreateCourse } from '@/lib/services/course/createcourse';
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from '@/components/ui/select';
// import { Skeleton } from '@/components/ui/skeleton';
// import { GetAllCategory } from '@/lib/services/category/getallcategory';

// interface Category {
//     _id: string;
//     name: string;
// }

// // Course Schema
// const CourseSchema = z.object({
//     title: z
//         .string()
//         .min(1, { message: 'Course title is required' })
//         .max(100, { message: 'Title cannot exceed 100 characters' }),
//     description: z
//         .string()
//         .max(500, { message: 'Description cannot exceed 500 characters' })
//         .optional(),
//     price: z
//         .number()
//         .min(0, { message: 'Price cannot be negative' })
//         .refine((val) => !isNaN(val), { message: 'Price must be a number' }),
//     category: z.string().min(1, { message: 'Category is required' }),
//     author: z.string().min(1, { message: 'Author name is required' }),
// });

// type CreateCourseFormData = z.infer<typeof CourseSchema>;

// export default function CreateCourseForm() {
//     const [loading, setLoading] = useState(false);
//     const [categoriesLoading, setCategoriesLoading] = useState(true);
//     const router = useRouter();
//     const [categories, setCategories] = useState<Category[]>([]);

//     const form = useForm<CreateCourseFormData>({
//         resolver: zodResolver(CourseSchema),
//         defaultValues: {
//             title: '',
//             description: '',
//             price: 0,
//             category: '',
//             author: '',
//         },
//     });

//     const fetchCategories = async () => {
//         try {
//             setCategoriesLoading(true);
//             const data = await GetAllCategory();
//             console.log('Fetched categories:', data.metadata.categories);
//             setCategories(data.metadata.categories);
//         } catch (error) {
//             console.error('Failed to fetch categories:', error);
//             toast({
//                 title: 'Error',
//                 description: error instanceof Error ? error.message : 'Failed to load categories',
//                 variant: 'destructive',
//             });
//         } finally {
//             setCategoriesLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchCategories();
//     }, []);

//     const handleSubmit = async (data: CreateCourseFormData) => {
//         setLoading(true);
//         try {
//             const token = localStorage.getItem('token');

//             if (!token) {
//                 toast({
//                     title: 'Authentication Error',
//                     description: 'Authentication token is missing. Please log in.',
//                     variant: 'destructive',
//                 });
//                 setLoading(false);
//                 return;
//             }

//             const payload = {
//                 token,
//                 title: data.title,
//                 description: data.description ?? '',
//                 price: data.price,
//                 category: data.category,
//                 author: data.author, // Now a string directly input by the user
//             };

//             const response = await CreateCourse(payload);
//             console.log('Response from CreateCourse:', response);

//             toast({
//                 description: 'Course created successfully!',
//                 className: 'bg-[#5AD3AF] text-black',
//                 duration: 1000,
//             });

//             router.push('/admin/courses');
//             router.refresh();
//         } catch (error: unknown) {
//             console.error('Error creating course:', error);
//             toast({
//                 title: 'Error',
//                 className: 'bg-[#F76F8E] text-black',
//                 description: error instanceof Error ? error.message : 'An unknown error occurred',
//                 variant: 'destructive',
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
//             <div className="max-w-4xl mx-auto">
//                 <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
//                     <div className="p-6 border-b border-gray-200 dark:border-gray-600">
//                         <div className="flex items-center gap-3">
//                             <div className="w-1.5 h-6 bg-[#5AD3AF] rounded-full" />
//                             <div>
//                                 <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
//                                     Create New Course
//                                 </h2>
//                                 <p className="text-base text-gray-600 dark:text-gray-400 mt-1">
//                                     Fill in the details below to create a new course
//                                 </p>
//                             </div>
//                         </div>
//                     </div>

//                     <CardContent className="p-6">
//                         <Form {...form}>
//                             <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                     {/* Title */}
//                                     <FormField
//                                         control={form.control}
//                                         name="title"
//                                         render={({ field }) => (
//                                             <FormItem>
//                                                 <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                                                     Course Title{' '}
//                                                     <span className="text-red-500">*</span>
//                                                 </FormLabel>
//                                                 <FormControl>
//                                                     <Input
//                                                         {...field}
//                                                         placeholder="e.g., Advanced Web Development"
//                                                         className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-[#5AD3AF] rounded-lg"
//                                                         required
//                                                     />
//                                                 </FormControl>
//                                                 <FormMessage className="text-red-500 text-xs mt-1" />
//                                             </FormItem>
//                                         )}
//                                     />

//                                     {/* Price */}
//                                     <FormField
//                                         control={form.control}
//                                         name="price"
//                                         render={({ field }) => (
//                                             <FormItem>
//                                                 <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                                                     Price <span className="text-red-500">*</span>
//                                                 </FormLabel>
//                                                 <FormControl>
//                                                     <Input
//                                                         type="number"
//                                                         {...field}
//                                                         onChange={(e) =>
//                                                             field.onChange(Number(e.target.value))
//                                                         }
//                                                         placeholder="e.g., 99"
//                                                         className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-[#5AD3AF] rounded-lg"
//                                                         min="0"
//                                                         required
//                                                     />
//                                                 </FormControl>
//                                                 <FormMessage className="text-red-500 text-xs mt-1" />
//                                             </FormItem>
//                                         )}
//                                     />
//                                 </div>

//                                 {/* Category */}
//                                 <FormField
//                                     control={form.control}
//                                     name="category"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                                                 Category <span className="text-red-500">*</span>
//                                             </FormLabel>
//                                             {categoriesLoading ? (
//                                                 <Skeleton className="h-10 w-full rounded-lg" />
//                                             ) : (
//                                                 <Select
//                                                     onValueChange={field.onChange}
//                                                     value={field.value}
//                                                 >
//                                                     <FormControl>
//                                                         <SelectTrigger className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-[#5AD3AF] rounded-lg">
//                                                             <SelectValue placeholder="Select a category" />
//                                                         </SelectTrigger>
//                                                     </FormControl>
//                                                     <SelectContent className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700">
//                                                         {categories.map((category) => (
//                                                             <SelectItem
//                                                                 key={category._id}
//                                                                 value={category._id}
//                                                             >
//                                                                 {category.name}
//                                                             </SelectItem>
//                                                         ))}
//                                                     </SelectContent>
//                                                 </Select>
//                                             )}
//                                             <FormMessage className="text-red-500 text-xs mt-1" />
//                                         </FormItem>
//                                     )}
//                                 />

//                                 {/* Author (Now a Textarea) */}
//                                 <FormField
//                                     control={form.control}
//                                     name="author"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                                                 Author <span className="text-red-500">*</span>
//                                             </FormLabel>
//                                             <FormControl>
//                                                 <Textarea
//                                                     {...field}
//                                                     placeholder="Enter the author's name (e.g., John Doe)"
//                                                     rows={2}
//                                                     className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-[#5AD3AF] rounded-lg"
//                                                     required
//                                                 />
//                                             </FormControl>
//                                             <FormMessage className="text-red-500 text-xs mt-1" />
//                                         </FormItem>
//                                     )}
//                                 />

//                                 {/* Description */}
//                                 <FormField
//                                     control={form.control}
//                                     name="description"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                                                 Description
//                                             </FormLabel>
//                                             <FormControl>
//                                                 <Textarea
//                                                     {...field}
//                                                     placeholder="Describe the course content and objectives (optional)"
//                                                     rows={4}
//                                                     className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-[#5AD3AF] rounded-lg"
//                                                 />
//                                             </FormControl>
//                                             <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
//                                                 Maximum 500 characters
//                                             </p>
//                                             <FormMessage className="text-red-500 text-xs mt-1" />
//                                         </FormItem>
//                                     )}
//                                 />

//                                 <div className="flex justify-end gap-4 pt-4">
//                                     <Button
//                                         type="button"
//                                         variant="outline"
//                                         onClick={() => router.back()}
//                                         className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg px-6"
//                                     >
//                                         Cancel
//                                     </Button>
//                                     <Button
//                                         type="submit"
//                                         className="bg-[#5AD3AF] hover:bg-[#4ac2a0] text-white rounded-lg px-6"
//                                         disabled={loading || categoriesLoading}
//                                     >
//                                         {loading ? (
//                                             <span className="flex items-center">
//                                                 <svg
//                                                     className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                                                     xmlns="http://www.w3.org/2000/svg"
//                                                     fill="none"
//                                                     viewBox="0 0 24 24"
//                                                 >
//                                                     <circle
//                                                         className="opacity-25"
//                                                         cx="12"
//                                                         cy="12"
//                                                         r="10"
//                                                         stroke="currentColor"
//                                                         strokeWidth="4"
//                                                     ></circle>
//                                                     <path
//                                                         className="opacity-75"
//                                                         fill="currentColor"
//                                                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                                                     ></path>
//                                                 </svg>
//                                                 Creating...
//                                             </span>
//                                         ) : (
//                                             'Create Course'
//                                         )}
//                                     </Button>
//                                 </div>
//                             </form>
//                         </Form>
//                     </CardContent>
//                 </Card>
//             </div>
//         </div>
//     );
// }
