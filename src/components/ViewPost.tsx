'use client';

import React, { useState, useEffect } from 'react';
import { Paperclip, Tag } from 'lucide-react'; // Loại bỏ Eye
import { GetPosts } from '@/lib/services/blog/getPosts';
import { getUserDetail } from '@/lib/services/admin/getuserdetail';
import { toast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ClassRoomItem {
    _id: string;
    title: string;
    description: string;
}

// Interface for a post (based on API response)
interface Post {
    _id: string;
    title: string;
    content: string;
    classroom: ClassRoomItem | string; // Assuming this is the classId or class object
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
    classroom: ClassRoomItem | string;
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

const ViewPosts: React.FC<ViewPostsProps> = ({ classId }) => {
    const [posts, setPosts] = useState<EnrichedPost[]>([]);
    const [loading, setLoading] = useState(false);

    // Fetch posts when component mounts
    const fetchPosts = async () => {
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
            const tokenuser = JSON.parse(token);
            console.log('Token user:', tokenuser);

            const response = await GetPosts(tokenuser, classId);
            console.log('API Response:', response); // Log full response for debugging

            if (response?.metadata?.posts && Array.isArray(response.metadata.posts)) {
                const enrichedPosts = await Promise.all(
                    response.metadata.posts.map(async (post: Post) => {
                        try {
                            // Check if post.class is defined
                            if (!post.classroom) {
                                console.warn(`Post ${post._id} has no class data, using fallback`);
                                post.classroom = {
                                    _id: classId, // Gán classId hiện tại
                                    title: 'Unknown Class',
                                    description: '',
                                };
                            }

                            // Fetch author details
                            const authorResponse = await getUserDetail(post.author);
                            console.log('Check author response:', authorResponse);

                            if (!authorResponse.metadata) {
                                throw new Error('Invalid author data');
                            }

                            return {
                                ...post,
                                author: {
                                    _id: authorResponse.metadata._id,
                                    fullName: authorResponse.metadata.fullName || 'Unknown Author',
                                    avatar: authorResponse.metadata.avatar,
                                },
                                class: post.classroom, // Use the class data, even if fallback
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
                                class: post.classroom || {
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
                setPosts(enrichedPosts);
                console.log(`Fetched posts with author and class details:`, enrichedPosts);
            } else {
                console.warn('No posts found or invalid metadata structure:', response.metadata);
                setPosts([]);
            }
        } catch (error) {
            console.error(`Failed to fetch posts for classId ${classId}:`, error);
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

    useEffect(() => {
        fetchPosts();
    }, [classId]);

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
                            <div className="flex items-start">
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
                                            CLASS:{' '}
                                            {typeof post.classroom === 'object' &&
                                            post.classroom &&
                                            'title' in post.classroom
                                                ? (post.classroom as { title?: string }).title ||
                                                  'Unknown Class'
                                                : 'Unknown Class'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed text-base cursor-default">
                                DESCRIPTION OF CLASS:{' '}
                                {typeof post.classroom === 'object' &&
                                post.classroom &&
                                'description' in post.classroom
                                    ? (post.classroom as { description?: string }).description ||
                                      'No description available'
                                    : 'No description available'}
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
