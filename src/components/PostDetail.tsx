'use client';

import React, { useEffect, useState } from 'react';
import { Paperclip, Tag, ArrowLeft } from 'lucide-react';
import { GetPosts } from '@/lib/services/blog/getPosts';
import { getUserDetail } from '@/lib/services/admin/getuserdetail';
import { viewDetailCourses } from '@/lib/services/course/viewdetailcourses';
import { toast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';

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
    course: Course;
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

const PostDetail: React.FC = () => {
    const [post, setPost] = useState<EnrichedPost | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const params = useParams();
    const postId = params.postId as string;

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token') || '';
                if (!token) {
                    throw new Error('Authentication token is missing. Please log in.');
                }

                const response = await GetPosts(token);
                if (response?.metadata?.posts && response.metadata.posts.length > 0) {
                    const postData = response.metadata.posts.find((p: Post) => p._id === postId);
                    if (!postData) {
                        throw new Error('Post not found');
                    }

                    // Fetch author details
                    const authorResponse = await getUserDetail(postData.author);
                    console.log(' Check author:', authorResponse);

                    // Fetch course details
                    const courseResponse = await viewDetailCourses(postData.course._id);
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

                    const enrichedPost: EnrichedPost = {
                        ...postData,
                        author: {
                            _id: authorResponse.metadata._id,
                            fullName: authorResponse.metadata.fullName || 'Unknown Author',
                            avatar: authorResponse.metadata.avatar,
                        },
                        course: courseDetails,
                    };

                    setPost(enrichedPost);
                } else {
                    throw new Error('No posts found');
                }
            } catch (error) {
                console.error(`Failed to fetch post details:`, error);
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
    }, [postId, router]);

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

            <div className="flex items-center space-x-4 mb-6">
                <Avatar className="w-12 h-12 border-2 border-white dark:border-gray-700 shadow-md">
                    <AvatarImage src={post.author.avatar} className="cursor-default" />
                    <AvatarFallback className="text-lg font-semibold text-gray-800 dark:text-gray-100 cursor-default">
                        {post.author.fullName?.charAt(0)?.toUpperCase() || 'A'}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 cursor-default">
                        {post.title}
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium cursor-default">
                        {post.author.fullName || 'Unknown Author'} •{' '}
                        {new Date(post.createdAt).toLocaleString()}
                    </p>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-700 dark:text-gray-200 cursor-default">
                    Course Information
                </h2>
                <div className="flex items-center space-x-4 mt-2">
                    {post.course.imgUrl && (
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                            <Image
                                src={post.course.imgUrl}
                                alt={post.course.title || 'Course Image'}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium cursor-default">
                            COURSE: {post.course.title || 'Unknown Course'}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium cursor-default">
                            DESCRIPTION: {post.course.description || 'No description available'}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium cursor-default">
                            PRICE: {post.course.price.toLocaleString()} VNĐ
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium cursor-default">
                            ENROLLED: {post.course.enrolledCount} students
                        </p>
                        {post.course.category && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium cursor-default">
                                CATEGORY: {post.course.category.name}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base cursor-default mb-6">
                CONTENT: {post.content}
            </p>

            {post.tags && post.tags.length > 0 && (
                <div className="mb-6 flex items-center">
                    <Tag className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium cursor-default">
                        Tags: {post.tags.join(', ')}
                    </p>
                </div>
            )}

            {post.attachments && post.attachments.length > 0 && (
                <div className="flex items-center">
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
    );
};

export default PostDetail;
