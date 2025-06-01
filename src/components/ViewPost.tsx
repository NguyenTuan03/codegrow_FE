'use client';

import React, { useState, useEffect } from 'react';
import { MoreHorizontal, Paperclip, Tag, Eye } from 'lucide-react';
import { GetPosts } from '@/lib/services/blog/getPosts';
import { getUserDetail } from '@/lib/services/admin/getuserdetail';
import { viewDetailCourses } from '@/lib/services/course/viewdetailcourses';
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
    const [selectedPost, setSelectedPost] = useState<EnrichedPost | null>(null);

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
                            console.log(
                                '[Saturday, May 31, 2025, 12:18 PM +07] Check author:',
                                authorResponse,
                            );

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
                            console.error(
                                `[Saturday, May 31, 2025, 12:18 PM +07] Failed to fetch details for post ${post._id}:`,
                                error,
                            );
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
                console.log(
                    `[Saturday, May 31, 2025, 12:18 PM +07] Fetched posts with author and course details:`,
                    enrichedPosts,
                );
            } else {
                setPosts([]);
            }
        } catch (error) {
            console.error(`[Saturday, May 31, 2025, 12:18 PM +07] Failed to fetch posts:`, error);
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

    // Handle view detail (open modal)
    const handleViewDetail = (post: EnrichedPost) => {
        setSelectedPost(post);
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
                            <div className="flex items-start justify-between">
                                <div className="flex items-center space-x-3">
                                    <Avatar className="w-10 h-10 border-2 border-white dark:border-gray-700 shadow-md">
                                        <AvatarImage
                                            src={post.author.avatar}
                                            className="cursor-default"
                                        />
                                        <AvatarFallback className="text-base font-semibold text-gray-800 dark:text-gray-100 cursor-default">
                                            {post.author.fullName?.charAt(0)?.toUpperCase() || 'A'}
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
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <DropdownMenuItem
                                                        onSelect={(e) => e.preventDefault()}
                                                        onClick={() => handleViewDetail(post)}
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
                                                                            selectedPost.author
                                                                                .avatar
                                                                        }
                                                                        className="cursor-default"
                                                                    />
                                                                    <AvatarFallback className="text-base font-semibold text-gray-800 dark:text-gray-100 cursor-default">
                                                                        {selectedPost.author.fullName
                                                                            ?.charAt(0)
                                                                            ?.toUpperCase() || 'A'}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 cursor-default">
                                                                        TITLE: {selectedPost.title}
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
                                                                            selectedPost.course
                                                                                .imgUrl
                                                                                ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${selectedPost.course.imgUrl})`
                                                                                : 'linear-gradient(to right, #657ED4, #4a5da0)',
                                                                        backgroundColor:
                                                                            selectedPost.course
                                                                                .imgUrl
                                                                                ? 'transparent'
                                                                                : '#657ED4',
                                                                        backgroundSize: 'cover',
                                                                        backgroundPosition:
                                                                            'center',
                                                                        minHeight: '150px',
                                                                    }}
                                                                ></div>
                                                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium cursor-default">
                                                                    COURSE:{' '}
                                                                    {selectedPost.course.title ||
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
                                                                {selectedPost.course.category && (
                                                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium cursor-default">
                                                                        CATEGORY:{' '}
                                                                        {
                                                                            selectedPost.course
                                                                                .category.name
                                                                        }
                                                                    </p>
                                                                )}
                                                            </div>
                                                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base cursor-default">
                                                                CONTENT: {selectedPost.content}
                                                            </p>
                                                            {selectedPost.tags &&
                                                                selectedPost.tags.length > 0 && (
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
                                                                selectedPost.attachments.length >
                                                                    0 && (
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
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewPosts;
