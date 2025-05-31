'use client';

import React, { useState, useEffect } from 'react';
import { MoreHorizontal, Paperclip, Tag, Edit, Trash2, Eye } from 'lucide-react';
import { GetPosts } from '@/lib/services/blog/getPosts';
import { getUserDetail } from '@/lib/services/admin/getuserdetail';
import { viewDetailCourses } from '@/lib/services/course/viewdetailcourses';
import { DeletePost } from '@/lib/services/blog/deletePost';
import { UpdatePost } from '@/lib/services/blog/updatePost';
import { toast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
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

// Interface for a course (based on API response)
interface Course {
    _id: string;
    title: string;
    description: string;
    imgUrl?: string;
    price: number;
    enrolledCount: number;
    category?: { id: string; name: string };
}

// Interface for a post (based on API response)
interface Post {
    _id: string;
    title: string;
    content: string;
    course: {
        _id: string;
        title: string;
        description: string;
        price: number;
        enrolledCount: number;
    };
    author: string; // Author is a string ID from the API
    tags?: string[];
    attachments?: Array<{
        fileName: string;
        fileUrl: string;
        fileType: string;
    }>;
    createdAt: string;
}

// Interface for the enriched post with author and detailed course details
interface EnrichedPost {
    _id: string;
    title: string;
    content: string;
    course: Course; // Updated to include detailed course info
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

const ViewPosts: React.FC = () => {
    const [posts, setPosts] = useState<EnrichedPost[]>([]);
    const [loading, setLoading] = useState(false);
    const [editingPostId, setEditingPostId] = useState<string | null>(null);
    const [selectedPost, setSelectedPost] = useState<EnrichedPost | null>(null);

    const form = useForm<UpdatePostFormType>({
        resolver: zodResolver(updatePostSchema),
        defaultValues: {
            title: '',
            content: '',
            tags: '',
        },
    });

    // Fetch posts when component mounts
    const fetchPosts = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token') || '';
            if (!token) {
                throw new Error('Authentication token is missing. Please log in.');
            }

            const response = await GetPosts(token);
            if (response?.metadata?.posts && response.metadata.posts.length > 0) {
                const enrichedPosts = await Promise.all(
                    response.metadata.posts.map(async (post: Post) => {
                        try {
                            // Fetch author details
                            const authorResponse = await getUserDetail(post.author);
                            console.log('Check author:', authorResponse);

                            // Fetch course details
                            const courseResponse = await viewDetailCourses(post.course._id);
                            if (!courseResponse || courseResponse.status !== 200) {
                                throw new Error('Invalid course data');
                            }

                            const courseDetails: Course = {
                                ...courseResponse.metadata,
                                category:
                                    typeof courseResponse.metadata.category === 'string'
                                        ? JSON.parse(courseResponse.metadata.category)
                                        : courseResponse.metadata.category,
                            };

                            return {
                                ...post,
                                author: {
                                    _id: authorResponse.metadata._id,
                                    fullName: authorResponse.metadata.fullName || 'Unknown Author',
                                    avatar: authorResponse.metadata.avatar,
                                },
                                course: courseDetails, // Use detailed course info
                            };
                        } catch (error) {
                            console.error(`Failed to fetch details for post ${post._id}:`, error);
                            return {
                                ...post,
                                author: {
                                    _id: post.author,
                                    fullName: 'Unknown Author',
                                    avatar: undefined,
                                },
                                course: {
                                    _id: post.course._id,
                                    title: post.course.title || 'Unknown Course',
                                    description: '',
                                    price: 0,
                                    enrolledCount: 0,
                                },
                            };
                        }
                    }),
                );
                setPosts(enrichedPosts);
                console.log(` Fetched posts with author and course details:`, enrichedPosts);
            } else {
                setPosts([]);
            }
        } catch (error) {
            console.error(` Failed to fetch posts:`, error);
            toast({
                title: 'Error',
                description: 'Failed to fetch posts. Please try again.',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
            setPosts([]);
        } finally {
            setLoading(false);
        }
    };

    // Handle delete post
    const handleDelete = async (postId: string) => {
        try {
            const token = localStorage.getItem('token') || '';
            if (!token) {
                throw new Error('Authentication token is missing. Please log in.');
            }

            await DeletePost(token, postId);
            toast({
                title: 'Success',
                description: 'Post deleted successfully!',
                variant: 'default',
                className: 'bg-[#5AD3AF] text-black font-medium',
            });

            // Refresh the post list
            fetchPosts();
        } catch (error) {
            console.error(`Failed to delete post ${postId}:`, error);
            toast({
                title: 'Error',
                description: 'Failed to delete post. Please try again.',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
        }
    };

    // Handle start editing
    const handleStartEditing = (post: EnrichedPost) => {
        setEditingPostId(post._id);
        form.reset({
            title: post.title,
            content: post.content,
            tags: post.tags?.join(', ') || '',
        });
    };

    // Handle cancel editing
    const handleCancelEditing = () => {
        setEditingPostId(null);
        setAttachment(null);
    };

    // Handle update post
    const handleUpdate = async (values: UpdatePostFormType, post: EnrichedPost) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token') || '';
            if (!token) {
                throw new Error('Authentication token is missing. Please log in.');
            }

            await UpdatePost({
                token,
                postId: post._id,
                title: values.title,
                content: values.content,
                courseId: post.course._id,
                author: post.author._id,
                tags: values.tags,
                attachments: attachment || undefined,
            });

            toast({
                title: 'Success',
                description: 'Post updated successfully!',
                variant: 'default',
                className: 'bg-[#5AD3AF] text-black font-medium',
            });

            setEditingPostId(null);
            setAttachment(null);
            fetchPosts(); // Refresh the post list
        } catch (error) {
            console.error(` Failed to update post:`, error);
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

    // Handle view detail (open modal)
    const handleViewDetail = (post: EnrichedPost) => {
        setSelectedPost(post);
    };

    // Handle attachment change for inline editing
    const [attachment, setAttachment] = useState<File | null>(null);

    const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setAttachment(file);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 cursor-default">
                Recent Posts
            </h3>
            {loading ? (
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#657ED4] dark:border-[#5AD3AF] cursor-default"></div>
                </div>
            ) : posts.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-12 text-lg font-medium cursor-default">
                    No posts yet. Be the first to share something!
                </p>
            ) : (
                <div className="space-y-6">
                    {posts.map((post, index) => (
                        <div
                            key={post._id}
                            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg animate-fade-in"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {editingPostId === post._id ? (
                                // Inline Edit Form
                                <Form {...form}>
                                    <form
                                        onSubmit={form.handleSubmit((values) =>
                                            handleUpdate(values, post),
                                        )}
                                        className="space-y-4"
                                    >
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
                                                <span className="text-sm font-medium">
                                                    Attach file
                                                </span>
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
                                                onClick={handleCancelEditing}
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
                            ) : (
                                // Normal Post Display
                                <>
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center space-x-3">
                                            <Avatar className="w-10 h-10 border-2 border-white dark:border-gray-700 shadow-md">
                                                <AvatarImage
                                                    src={post.author.avatar}
                                                    className="cursor-default"
                                                />
                                                <AvatarFallback className="text-base font-semibold text-gray-800 dark:text-gray-100 cursor-default">
                                                    {post.author.fullName
                                                        ?.charAt(0)
                                                        ?.toUpperCase() || 'A'}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 cursor-default">
                                                    TITLE: {post.title}
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium cursor-default">
                                                    {post.author.fullName || 'Unknown Author'} •{' '}
                                                    {new Date(post.createdAt).toLocaleString()}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium cursor-default">
                                                    COURSE: {post.course.title || 'Unknown Course'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
                                                        <MoreHorizontal className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                                                    </button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
                                                    <DropdownMenuItem
                                                        onClick={() => handleStartEditing(post)}
                                                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                        <span>Update</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => handleDelete(post._id)}
                                                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                                    >
                                                        <Trash2 className="w-4 h-4 text-red-500" />
                                                        <span>Delete</span>
                                                    </DropdownMenuItem>
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <DropdownMenuItem
                                                                onSelect={(e) => e.preventDefault()}
                                                                onClick={() =>
                                                                    handleViewDetail(post)
                                                                }
                                                                className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                                <span>View Detail</span>
                                                            </DropdownMenuItem>
                                                        </DialogTrigger>
                                                        {selectedPost && (
                                                            <DialogContent className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full">
                                                                <DialogHeader>
                                                                    <DialogTitle className="text-gray-900 dark:text-gray-100">
                                                                        Post Details
                                                                    </DialogTitle>
                                                                </DialogHeader>
                                                                <div className="space-y-4">
                                                                    <div className="flex items-center space-x-4">
                                                                        <Avatar className="w-10 h-10 border-2 border-white dark:border-gray-700 shadow-md">
                                                                            <AvatarImage
                                                                                src={
                                                                                    selectedPost
                                                                                        .author
                                                                                        .avatar
                                                                                }
                                                                                className="cursor-default"
                                                                            />
                                                                            <AvatarFallback className="text-base font-semibold text-gray-800 dark:text-gray-100 cursor-default">
                                                                                {selectedPost.author.fullName
                                                                                    ?.charAt(0)
                                                                                    ?.toUpperCase() ||
                                                                                    'A'}
                                                                            </AvatarFallback>
                                                                        </Avatar>
                                                                        <div>
                                                                            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 cursor-default">
                                                                                TITLE:{' '}
                                                                                {selectedPost.title}
                                                                            </h3>
                                                                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium cursor-default">
                                                                                {selectedPost.author
                                                                                    .fullName ||
                                                                                    'Unknown Author'}{' '}
                                                                                •{' '}
                                                                                {new Date(
                                                                                    selectedPost.createdAt,
                                                                                ).toLocaleString()}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200 cursor-default">
                                                                            Course Information
                                                                        </h4>
                                                                        <div
                                                                            className="relative rounded-2xl p-6 text-white mb-8 shadow-lg overflow-hidden"
                                                                            style={{
                                                                                backgroundImage:
                                                                                    selectedPost
                                                                                        .course
                                                                                        .imgUrl
                                                                                        ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${
                                                                                              selectedPost
                                                                                                  .course
                                                                                                  .imgUrl
                                                                                          })`
                                                                                        : 'linear-gradient(to right, #657ED4, #4a5da0)',
                                                                                backgroundColor:
                                                                                    selectedPost
                                                                                        .course
                                                                                        .imgUrl
                                                                                        ? 'transparent'
                                                                                        : '#657ED4',
                                                                                backgroundSize:
                                                                                    'cover',
                                                                                backgroundPosition:
                                                                                    'center',
                                                                                minHeight: '150px',
                                                                            }}
                                                                        ></div>
                                                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium cursor-default">
                                                                            COURSE:{' '}
                                                                            {selectedPost.course
                                                                                .title ||
                                                                                'Unknown Course'}
                                                                        </p>
                                                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium cursor-default">
                                                                            DESCRIPTION:{' '}
                                                                            {selectedPost.course
                                                                                .description ||
                                                                                'No description available'}
                                                                        </p>

                                                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium cursor-default">
                                                                            PRICE:{' '}
                                                                            {selectedPost.course.price.toLocaleString()}{' '}
                                                                            VNĐ
                                                                        </p>
                                                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium cursor-default">
                                                                            ENROLLED:{' '}
                                                                            {
                                                                                selectedPost.course
                                                                                    .enrolledCount
                                                                            }{' '}
                                                                            students
                                                                        </p>
                                                                        {selectedPost.course
                                                                            .category && (
                                                                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium cursor-default">
                                                                                CATEGORY:{' '}
                                                                                {
                                                                                    selectedPost
                                                                                        .course
                                                                                        .category
                                                                                        .name
                                                                                }
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base cursor-default">
                                                                        CONTENT:{' '}
                                                                        {selectedPost.content}
                                                                    </p>
                                                                    {selectedPost.tags &&
                                                                        selectedPost.tags.length >
                                                                            0 && (
                                                                            <div className="flex items-center">
                                                                                <Tag className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
                                                                                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium cursor-default">
                                                                                    Tags:{' '}
                                                                                    {selectedPost.tags.join(
                                                                                        ', ',
                                                                                    )}
                                                                                </p>
                                                                            </div>
                                                                        )}
                                                                    {selectedPost.attachments &&
                                                                        selectedPost.attachments
                                                                            .length > 0 && (
                                                                            <div className="flex items-center">
                                                                                <Paperclip className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
                                                                                <a
                                                                                    href={
                                                                                        selectedPost
                                                                                            .attachments[0]
                                                                                            .fileUrl
                                                                                    }
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                    className="text-[#657ED4] dark:text-[#5AD3AF] hover:underline text-sm font-medium cursor-pointer"
                                                                                >
                                                                                    View Attachment
                                                                                </a>
                                                                            </div>
                                                                        )}
                                                                </div>
                                                            </DialogContent>
                                                        )}
                                                    </Dialog>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                    <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed text-base cursor-default">
                                        DESCRIPTION OF COURSE:{' '}
                                        {post.course.description || 'No description available'}
                                    </p>
                                    <p className="mt-2 text-gray-700 dark:text-gray-300 leading-relaxed text-base cursor-default">
                                        CONTENT: {post.content}
                                    </p>
                                    {post.tags && post.tags.length > 0 && (
                                        <div className="mt-2 flex items-center">
                                            <Tag className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
                                            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium cursor-default">
                                                Tags: {post.tags.join(', ')}
                                            </p>
                                        </div>
                                    )}
                                    {post.attachments && post.attachments.length > 0 && (
                                        <div className="mt-4 flex items-center">
                                            <Paperclip className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
                                            <a
                                                href={post.attachments[0].fileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#657ED4] dark:text-[#5AD3AF] hover:underline text-sm font-medium cursor-pointer"
                                            >
                                                View Attachment
                                            </a>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewPosts;
