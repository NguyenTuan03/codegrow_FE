'use client';

import React, { useState, useRef } from 'react';
import { Paperclip, Send, Save } from 'lucide-react';

// Interface for a post
interface Post {
    id: string;
    content: string;
    author: string;
    timestamp: string;
    attachment?: string;
    isDraft: boolean;
}

// Stream component to display posts
const Stream: React.FC<{ posts: Post[] }> = ({ posts }) => {
    return (
        <div className="space-y-6">
            {posts.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-12 text-lg font-medium cursor-default">
                    No posts yet. Start the conversation!
                </p>
            ) : (
                posts.map((post, index) => (
                    <div
                        key={post.id}
                        className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg animate-fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="font-semibold text-lg text-gray-900 dark:text-gray-100 cursor-default">
                                    {post.author}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium cursor-default">
                                    {post.timestamp}
                                </p>
                            </div>
                            {post.isDraft && (
                                <span className="text-sm text-[#657ED4] dark:text-[#5AD3AF] font-medium cursor-default">
                                    Draft
                                </span>
                            )}
                        </div>
                        <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed text-base cursor-default">
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
                                        className="text-[#657ED4] dark:text-[#5AD3AF] hover:underline text-sm font-medium cursor-pointer"
                                    >
                                        View Attachment
                                    </a>
                                ) : (
                                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium cursor-default">
                                        Attached: {post.attachment}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

// Main Post component
const Post: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [content, setContent] = useState('');
    const [attachment, setAttachment] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Mock user (replace with auth in production)
    const currentUser = { fullName: 'Teacher Name' };

    // Handle post submission
    const handlePost = (isDraft: boolean) => {
        if (!content.trim() && !attachment) return;

        const newPost: Post = {
            id: crypto.randomUUID(),
            content: content.trim(),
            author: currentUser.fullName,
            timestamp: new Date().toLocaleString(),
            attachment: attachment ? attachment.name : undefined,
            isDraft,
        };

        setPosts((prev) => [newPost, ...prev]);
        setContent('');
        setAttachment(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    // Handle file attachment
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setAttachment(file || null);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3 cursor-default">
                <Paperclip className="w-6 h-6 text-[#657ED4] dark:text-[#5AD3AF]" />
                Class Stream
            </h2>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8 transition-all duration-300">
                <textarea
                    className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-y text-base cursor-text"
                    rows={5}
                    placeholder="Share something with your class..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <div className="mt-4 flex items-center justify-between">
                    <label className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 cursor-pointer hover:text-[#657ED4] dark:hover:text-[#5AD3AF] transition-colors duration-200">
                        <Paperclip className="w-5 h-5" />
                        <span className="text-sm font-medium">Attach file</span>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden cursor-pointer"
                            onChange={handleFileChange}
                        />
                    </label>
                    {attachment && (
                        <span className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs cursor-default">
                            {attachment.name}
                        </span>
                    )}
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        className={`px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg flex items-center space-x-2 transition-colors duration-200 text-base font-medium cursor-pointer ${
                            !content.trim() && !attachment
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                        onClick={() => handlePost(true)}
                        disabled={!content.trim() && !attachment}
                    >
                        <Save className="w-4 h-4" />
                        <span>Save as Draft</span>
                    </button>
                    <button
                        className={`px-4 py-2 bg-[#657ED4] dark:bg-[#5AD3AF] text-white rounded-lg flex items-center space-x-2 transition-colors duration-200 text-base font-medium cursor-pointer ${
                            !content.trim() && !attachment
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:bg-[#424c70] dark:hover:bg-[#4ac2a0]'
                        }`}
                        onClick={() => handlePost(false)}
                        disabled={!content.trim() && !attachment}
                    >
                        <Send className="w-4 h-4" />
                        <span>Post</span>
                    </button>
                </div>
            </div>

            <Stream posts={posts.filter((post) => !post.isDraft)} />
        </div>
    );
};

export default Post;
