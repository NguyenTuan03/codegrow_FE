'use client';

import PostForm from '@/components/PostForm';
import ViewPosts from '@/components/ViewPosts';
import React from 'react';

const Post: React.FC = () => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300">
            <PostForm />
            <ViewPosts />
        </div>
    );
};

export default Post;
