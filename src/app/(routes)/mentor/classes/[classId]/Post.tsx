'use client';

import PostForm from '@/components/PostForm';
import ViewPosts from '@/components/ViewPosts';
import React from 'react';

interface PostProps {
    classId: string; // Add classId prop
}

const Post: React.FC<PostProps> = ({ classId }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300">
            <PostForm /> {/* Pass classId to PostForm */}
            <ViewPosts classId={classId} /> {/* Pass classId to ViewPosts */}
        </div>
    );
};

export default Post;
