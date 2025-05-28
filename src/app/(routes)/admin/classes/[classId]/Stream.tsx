'use client';

import React from 'react';
import { Paperclip } from 'lucide-react';

// Interface for a post
interface Post {
    id: string;
    content: string;
    author: string;
    timestamp: string;
    attachment?: string;
    isDraft: boolean;
}

// Mock posts data (replace with API call in production)
const mockPosts: Post[] = [
    {
        id: '1',
        content: 'Welcome to the class! Please review the syllabus.',
        author: 'Teacher Name',
        timestamp: 'May 20, 2025, 10:00 AM',
        attachment: 'syllabus.pdf',
        isDraft: false,
    },
    {
        id: '2',
        content: 'Reminder: Assignment 1 is due this Friday.',
        author: 'Teacher Name',
        timestamp: 'May 21, 2025, 3:00 PM',
        isDraft: false,
    },
];

// Stream component to display posts (read-only)
const Stream: React.FC = () => {
    const posts = mockPosts.filter((post) => !post.isDraft);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
                <Paperclip className="w-6 h-6 text-[#657ED4] dark:text-[#5AD3AF]" />
                Class Stream
            </h2>
            <div className="space-y-6">
                {posts.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-12 text-base">
                        No posts yet.
                    </p>
                ) : (
                    posts.map((post, index) => (
                        <div
                            key={post.id}
                            className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md animate-fade-in"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="font-semibold text-base text-gray-900 dark:text-gray-100">
                                        {post.author}
                                    </p>
                                    <p className="text-base text-gray-500 dark:text-gray-400">
                                        {post.timestamp}
                                    </p>
                                </div>
                                {post.isDraft && (
                                    <span className="text-base text-blue-500 dark:text-blue-400 font-medium">
                                        Draft
                                    </span>
                                )}
                            </div>
                            <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                                {post.content}
                            </p>
                            {post.attachment && (
                                <div className="mt-4 flex items-center">
                                    <Paperclip className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
                                    {post.attachment.startsWith('http') ? (
                                        <a
                                            href={post.attachment}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 dark:text-blue-400 hover:underline text-sm"
                                        >
                                            View Attachment
                                        </a>
                                    ) : (
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                                            Attached: {post.attachment}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Stream;
