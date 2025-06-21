'use client';

import React, { useEffect, useState } from 'react';
import { Paperclip, ArrowLeft } from 'lucide-react';
import { GetPosts } from '@/lib/services/blog/getPosts';
import { getUserDetail } from '@/lib/services/admin/getuserdetail';
import { UpdatePost } from '@/lib/services/blog/updatePost';
import { toast } from '@/components/ui/use-toast';
import { useRouter, useParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
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

// Schema for form validation
const updatePostSchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters long'),
    content: z.string().min(10, 'Content must be at least 10 characters long'),
    tags: z.string().optional(),
});

type UpdatePostFormType = z.infer<typeof updatePostSchema>;

interface ClassItem {
    _id: string;
    title: string;
    description: string;
    students: string[];
    schedule: {
        startDate: string;
        endDate: string;
        daysOfWeek: string[];
        time: string;
    };
    imgUrl?: string;
    bgColor?: string;
    mentor?: {
        _id: string;
        fullName: string;
        email: string;
    } | null;
}

// Interface for a post (based on API response)
interface Post {
    _id: string;
    title: string;
    content: string;
    class: ClassItem | null;
    author: string;
    tags?: string[];
    attachments?: Array<{
        fileName: string;
        fileUrl: string;
        fileType: string;
    }>;
    createdAt: string;
}

// Interface for the enriched post with author and detailed class details
interface EnrichedPost {
    _id: string;
    title: string;
    content: string;
    class: ClassItem | null;
    author: {
        _id: string;
        fullName: string;
        avatar?: string;
    };
    tags?: string[];
    attachments?: Array<{
        fileName: string;
        fileUrl: string;
        fileType: string;
    }>;
    createdAt: string;
}

interface ViewPostsProps {
    classId: string;
}

const EditPost: React.FC<ViewPostsProps> = ({ classId }) => {
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState<EnrichedPost | null>(null);
    const [attachment, setAttachment] = useState<File | null>(null);
    const router = useRouter();
    const params = useParams();
    const postId = params.postId as string;

    const form = useForm<UpdatePostFormType>({
        resolver: zodResolver(updatePostSchema),
        defaultValues: {
            title: '',
            content: '',
            tags: '',
        },
    });

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
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

                const response = await GetPosts(token, classId);
                console.log(' API Response:', response);

                if (response?.metadata?.posts && Array.isArray(response.metadata.posts)) {
                    const enrichedPosts = await Promise.all(
                        response.metadata.posts.map(async (post: Post) => {
                            try {
                                if (!post.class) {
                                    console.warn(
                                        ' Post ${post._id} has no class data, using fallback',
                                    );
                                    post.class = {
                                        _id: '',
                                        title: 'Unknown Class',
                                        description: '',
                                        students: [],
                                        schedule: {
                                            startDate: '',
                                            endDate: '',
                                            daysOfWeek: [],
                                            time: '',
                                        },
                                    };
                                }

                                const authorResponse = await getUserDetail(post.author);
                                console.log(' Check author response:', authorResponse);

                                if (!authorResponse.metadata) {
                                    throw new Error('Invalid author data');
                                }

                                return {
                                    ...post,
                                    author: {
                                        _id: authorResponse.metadata._id,
                                        fullName:
                                            authorResponse.metadata.fullName || 'Unknown Author',
                                        avatar: authorResponse.metadata.avatar,
                                    },
                                    class: post.class,
                                };
                            } catch (error) {
                                console.error(
                                    ' Failed to fetch details for post ${post._id}:',
                                    error,
                                );
                                return {
                                    ...post,
                                    author: {
                                        _id: post.author,
                                        fullName: 'Unknown Author',
                                        avatar: undefined,
                                    },
                                    class: post.class || {
                                        _id: '',
                                        title: 'Unknown Class',
                                        description: '',
                                        students: [],
                                        schedule: {
                                            startDate: '',
                                            endDate: '',
                                            daysOfWeek: [],
                                            time: '',
                                        },
                                    },
                                };
                            }
                        }),
                    );

                    const foundPost = enrichedPosts.find((p) => p._id === postId);
                    if (!foundPost) {
                        throw new Error('Post not found');
                    }
                    setPost(foundPost);
                    form.reset({
                        title: foundPost.title,
                        content: foundPost.content,
                        tags: foundPost.tags?.join(', ') || '',
                    });
                } else {
                    throw new Error('No posts found or invalid metadata structure');
                }
            } catch (error) {
                console.error(' Failed to fetch post details:', error);
                toast({
                    title: 'Error',
                    description: 'Failed to fetch post details. Please try again.',
                    variant: 'destructive',
                    className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
                });
                router.push('/posts'); // Redirect back to post list on error
            } finally {
                setLoading(false);
            }
        };

        if (postId) {
            fetchPost();
        }
    }, [postId, router, form, classId]);

    const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setAttachment(file);
    };

    const onSubmit = async (values: UpdatePostFormType) => {
        if (!post) return;

        try {
            setLoading(true);
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

            // Kiểm tra classId trước khi gọi API
            if (!post.class?._id) {
                toast({
                    title: 'Error',
                    description: 'Class ID is missing or invalid.',
                    variant: 'destructive',
                    className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
                });
                return;
            }

            console.log(' Token for update:', token);
            const response = await UpdatePost({
                token,
                postId: post._id,
                title: values.title,
                content: values.content,
                classId: post.class?._id,
                author: post.author._id,
                tags: values.tags,
                attachments: attachment || undefined,
            });
            console.log(' Post updated successfully:', response);
            toast({
                title: 'Success',
                description: 'Post updated successfully!',
                variant: 'default',
                className: 'bg-[#5AD3AF] text-black font-medium',
            });

            router.push('/posts'); // Redirect to posts list after success
        } catch (error) {
            console.error(' Failed to update post:', error);
            toast({
                title: 'Error',
                description: 'Failed to update post. Please try again.',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#657ED4] dark:border-[#5AD3AF] cursor-default"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-500 dark:text-gray-400 text-lg font-medium cursor-default">
                    Post not found.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <button
                onClick={() => router.push('/posts')}
                className="mb-6 flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-[#657ED4] dark:hover:text-[#5AD3AF] transition-colors duration-200"
            >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Posts</span>
            </button>

            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 cursor-default">
                Edit Post
            </h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-700 dark:text-gray-200 font-semibold cursor-default">
                                    Title
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        className="rounded-lg border-gray-300 dark:border-gray-600 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] transition-all duration-200 cursor-text"
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500 font-medium cursor-default" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-700 dark:text-gray-200 font-semibold cursor-default">
                                    Content
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        rows={5}
                                        className="rounded-lg border-gray-300 dark:border-gray-600 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] transition-all duration-200 resize-y cursor-text"
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500 font-medium cursor-default" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-700 dark:text-gray-200 font-semibold cursor-default">
                                    Tags (comma-separated)
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="e.g., programming, javascript"
                                        className="rounded-lg border-gray-300 dark:border-gray-600 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] transition-all duration-200 cursor-text"
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500 font-medium cursor-default" />
                            </FormItem>
                        )}
                    />

                    <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 cursor-pointer hover:text-[#657ED4] dark:hover:text-[#5AD3AF] transition-colors duration-200">
                            <Paperclip className="w-5 h-5" />
                            <span className="text-sm font-medium">Attach file</span>
                            <input
                                type="file"
                                onChange={handleAttachmentChange}
                                className="hidden cursor-pointer"
                            />
                        </label>
                        {attachment && (
                            <span className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs cursor-default">
                                {attachment.name}
                            </span>
                        )}
                    </div>

                    <div className="flex justify-end space-x-4">
                        <Button
                            type="button"
                            onClick={() => router.push('/posts')}
                            className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-md font-medium cursor-pointer"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className={`px-6 py-3 bg-[#657ED4] dark:bg-[#5AD3AF] text-white rounded-lg transition-all duration-200 shadow-md font-medium cursor-pointer ${
                                loading
                                    ? 'opacity-70 cursor-not-allowed'
                                    : 'hover:bg-[#4a5da0] dark:hover:bg-[#4ac2a0]'
                            }`}
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                                    Saving...
                                </span>
                            ) : (
                                'Save Changes'
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default EditPost;
